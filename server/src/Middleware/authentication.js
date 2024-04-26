import userModel from '../../DB/models/user.model.js';
import { asyncHandler } from '../Utlis/ErrorHandeling.js';
import { verifyToken } from '../Utlis/TokenGenerator.js';

/**
 * @param { Object } for roles for the user
 * @return { Function } Middleware for the next function
 * @description Middleware to authenticate user
 * */
const auth = ({roles=['user']}={})=>{
  return asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    // check if the token is provided
    if (!authorization?.startsWith(process.env.BARER_KEY)) {
      return next(new Error("You are not Authenticated",{cause:401}));
    }
    // get the token
    const token = authorization.split(process.env.BARER_KEY)[1];
    const decoded = verifyToken({ token }); // decoded
    if (!decoded?.id) {
      return next(new Error("Invaild Token payload",{cause:406}));
    }

    // check if the user is exist
    const authUser = await userModel
      .findById(decoded.id)
      .select("name email password role isDeleted status confirmEmail isBlocked");
    if (!authUser) {
      return next(new Error("Not register account",{cause:404}));
    }
    // if(!authUser.confirmEmail) // stop confirm email
    // {
    //   return next(new Error("You need to confirm Your Email First",{cause:409}));
    // }
    
    // chekc if the user is deleted or blocked
    if (authUser.isDeleted|| authUser.isBlocked) {
      return next(new Error("Your account suspended or removed , contact support for more information",{cause:403}));
    }
    
    // check if the user is offline
    if(authUser.status == 'offline')
    {
      return next(new Error("You are not logged in",{cause:409}));
    }
    if(!roles.includes(authUser.role))
    {
        return next(new Error("You are not Authorized",{cause:403}));
    }
    req.user = authUser;
    return next();
  });
}
export default auth;
