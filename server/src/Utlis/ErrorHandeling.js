/** 
 * description: Middleware to handle the async function
 * @param {function} fn - function to handle the request
 * @return {function} Middleware for the next function
 */
export const asyncHandler = (fn)=>{
    return(req,res,next)=>{
      fn(req,res,next).catch(err=>{
        return next(err)
      })
    }
  }

/**
  * description: Middleware to handle the global error
  * @param {object} err - error object
  * @param {object} req - request object
  * @param {object} res - response object
  * @param {object} next - next function
  * @return {object} response object
*/
export const globalErrorHandling = (err,req,res,next)=>{
  if(err)
{
    if(process.env.MOOD == 'DEV')
  {
      return res.status(err.cause||500).json({status:'Failed',message:err.message,err,stack:err.stack})
    }
    return res.status(err.cause||500).json({status:'Failed',message:err.message})
  }
}
