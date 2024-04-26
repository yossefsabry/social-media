import nodemailer from "nodemailer";
import { confirmEmail } from "./confirmEmail.template.js";
import { forgotPassword } from "./forgotPassword.template.js";
import { recoverAccount } from "./recoverAccount.template.js";
import {changePassword} from './changedPassword.template.js'


/** 
* description : the main function to call the template operations
*/
// async function sendMail({to,subject,name,confirmLink,OTP,userinfo,userInternetData,resetLink,requestNewLink,recoverLink,secretPath}={}) {
//   let confirmHtml ;
//   if(secretPath == 'recoverAccount')
//   { // Recovery Account Template
//     confirmHtml = recoverAccount({name,recoverLink})
//   }
//   if(secretPath == 'forgotPassword')
//   { // Forget & reset Password Template
//     confirmHtml = forgotPassword({name,resetLink,OTP,userinfo,userInternetData});
//   }
//   if(secretPath == 'emailConfirmation')
//   { // Confirm Email Template
//     confirmHtml = confirmEmail({name,confirmLink,requestNewLink});
//   }
//   if(secretPath == 'changePassword')
//   { // Change Password Template
//     confirmHtml = changePassword({name,userinfo,userInternetData});
//   }
    
//     const transporter = nodemailer.createTransport({
//       service:'gmail',
//       auth: {
//         user: process.env.GMAIL_EMAIL,
//         pass: process.env.GMAIL_PASSWORD,
//       },
//     });
  
//     const info = await transporter.sendMail({
//       from: `"yossef sabry " <${process.env.GMAIL_EMAIL}>`,
//       to,
//       subject,
//       html:confirmHtml
//     });
//   if(info.rejected.length)
//   {
//     return false
//   }
//   else
//   {
//     return true
//   }
//   }
//   export default sendMail
