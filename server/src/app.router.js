import userRouter from './modules/user/user.router.js' 
import authRouter from './modules/auth/auth.router.js' 
import adminRouter from './modules/admin/admin.router.js' 
import postRouter from  './modules/post/post.router.js'
import connectDB from '../DB/connection.js' 
import cors from 'cors' 
import { globalErrorHandling } from './Utlis/ErrorHandeling.js' 

/** 
 * @param {express} express
 * @param {app} app  
 * @returns {void}
 * @description this function initializes the app and adds the routes to the app
 * */
const initApp = (express, app) => {
  app.use(async(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Private-Network','true');
    res.setHeader('Access-Control-Allow-Methods','*')
    next() // move to the next middleware
  })
  app.use(cors()) // very important for cross origin request for example from react to node ... 
  app.use(express.json({})); // parse the request body to json
  app.get('/',(req,res,next)=>{
    return res.status(200).json({status:"Success",message:"welcome to social-backend-api",docs:"https://github.com/yossfsabry/"})
})
  // the routes
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
  app.use("/admin", adminRouter);
  app.use("/post", postRouter);
  // for handle other routers
  app.all("*", (req, res) => {
    return res.status(404).json({ message: "404 request error | are you lost Baby Girl " });
  });
  // handle the errors
  app.use(globalErrorHandling)
  connectDB(); // for connect to the database
};
export default initApp;
