import { faker } from '@faker-js/faker';
import User from '../../models/User.js';
import Post from '../../models/Post.js';

// Seed numOfUser User Data to User Documents
export const userSeeder = async (numOfUser) => {
    console.log('User Creating........')
    for(let i = 0 ; i <= numOfUser ; i++){
        const user  = new User({
            username : faker.person.middleName(),
            email : faker.internet.email(),
            password: faker.internet.password()
        })

       await user.save()
    }

    // await User.deleteMany()
    console.log('User Created Successfully!')
}

// Seed Post 
export const postSeeder = async (num) => {
    console.log('Post Creating........')
    for(let i = 0 ; i <= num ; i++){
        const count = await User.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomUser = await User.findOne().skip(randomIndex);

        const post  = new Post({
            title : faker.person.fullName(),
            body  : faker.lorem.word(100),
            userId : randomUser._id,
            cover : faker.system.filePath(),
            categoryId : randomUser._id,
        })

       post.slug = post.title.toLowerCase().replace(' ' , '-')
       await post.save()
    }

    // await Post.deleteMany()
    console.log('Post Created Successfully!')
}




// export user seeder for using it as necessary
export default userSeeder;