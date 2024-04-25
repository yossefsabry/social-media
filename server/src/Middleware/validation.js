/** 
 * @param {object} schema - Joi schema object
 * @return {function} Middleware for the next function
 * description: Middleware to validate the inputs
 * */
const validation = (schema) => {
    return (req,res,next)=>{
        // indestruct the inputs
        const inputs = {...req.body,...req.params,...req.query}
        console.log(inputs)
        if(req.file || req.files)
        {
            inputs.file = req.file || req.files
        }
        // abortearly false to return all the errors
        const validationResult = schema.validate(inputs,{abortEarly:false})

        // check if there is errors
        if(validationResult.error)
        {
            return res.status(409).json({status:'failed',errors:validationResult.error.details.map(err=>err.message)})
        }
        return next()
    }
}
export default validation;
