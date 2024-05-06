import multer from "multer";

// specify what kind of files for upload
export const validationObject = {
    image:['image/png','image/jpeg'],
    file:['application/pdf']
}

/**
  * @param { object } cusntomValidation for sepecify what kind of files for upload
  * @return { multer } it's middleWare for multer
*/
export const fileUpload = ({customValidation = validationObject.image,maxSize = 3}={})=>{
    const storage = multer.diskStorage({})  // storage for the folder
    const limits = {fileSize: maxSize*1000*1000} // max size for image = 3MB
    const fileFilter = (req,file,cb)=>{
        if(customValidation.includes(file.mimetype)) // check for the types for the file extenstions
        {
            return cb(null,true)
        }
        cb(new Error(`File with extenstion (${file.originalname.slice(file.originalname.lastIndexOf("."))}) is not allowed`,{cause:415},false))
    }
    const upload = multer({fileFilter,storage,limits})
    return upload
}
