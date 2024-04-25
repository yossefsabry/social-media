import * as dotenv from 'dotenv'; 
// import * as dontenv from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url)) // ge tthe current directory name
dotenv.config({path:path.join(__dirname,'./config/.env')}); // add the path to the .env file
import favicon from 'express-favicon';
import express from 'express'; 
import initApp from './src/app.router.js'; 

const app = express();
const port = process.env.PORT;
app.use(favicon(__dirname + '/public/favicon.ico'));
initApp(express, app);
app.listen(port, () => console.log(`server is running on port ... ${port}!`)); // running the server on port 5000
