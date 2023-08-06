
import jwt from "jsonwebtoken";
import {add} from "date-fns"
import ip from "ip"
import Token from './../../models/Token.js';

export const createToken = async (user) => {
   try {
        const access_token = jwt.sign({...user , issuedIp: ip.address()}, process.env.JWT_PASSWORD , {
        expiresIn : 1 * 24 * 60 * 60
       });
       const refresh_token = jwt.sign({...user , issuedIp: ip.address()}, process.env.JWT_REFRESH_PASSWORD , {
         expiresIn : 3 * 24 * 60 * 60
       });

       const token = new Token({
            token : refresh_token,
            userId : user._id,
            issuedIp: ip.address(),
            expiredAt : add(new Date() , {days : 3}).toISOString()
       })
      await token.save()

      return {
        access_token,
        refresh_token
      }
   } catch (error) {
        next(error)
   }
}