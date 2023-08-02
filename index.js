import dotenv from 'dotenv';
import app from "./src/app.js";
import http from "http"
import {connectMongoDB} from "./src/config/db.js"
import colors from "colors"

dotenv.config();
const PORT = process.env.SERVER_PORT || 4000;
const server = http.createServer(app)

// Connect with DB and Server listening
const main = async () => {
	try {
		await connectMongoDB();
		server.listen(PORT, async () => {
			console.log('Server is listening on port 4000');
		});
	} catch (e) {
		console.log(e.message);
	}
};

main();