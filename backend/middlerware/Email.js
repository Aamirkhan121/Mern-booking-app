import { transporter } from "./Email.config.js";
import { Verfication_Email_Template, Welcome_Email_Template } from "./EmailTemplate.js";

export const SendVerficationCode=async(email,verficationCode)=>{
   try {
    const response = await transporter.sendMail({
        from: '"Aamir khan 👻" <aamir73690@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Verfiy your email✔", // Subject line
        text: "Verfiy your email✔", // plain text body
        html: Verfication_Email_Template.replace("{verficationCode}",verficationCode), // html body
      });
      console.log("Email send successfully",response)
   } catch (error) {
    console.log(error)
   }
}
export const WelcomeEmail=async(email,firstName)=>{
   try {
    const response = await transporter.sendMail({
        from: '"Aamir khan 👻" <aamir73690@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "WelCome Email✔", // Subject line
        text: "WelCome Email✔", // plain text body
        html: Welcome_Email_Template.replace("{firstName}",firstName), // html body
      });
      console.log("Email send successfully",response)
   } catch (error) {
    console.log(error)
   }
}