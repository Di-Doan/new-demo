import { createTransport } from "nodemailer";
import expressHandlebars from "nodemailer-express-handlebars";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import subscriptionService from "../function/subscription.service.js";
import dotenv from 'dotenv';
dotenv.config(); 

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const {
  createNewSubscription: _createNewSubscription,
  getSubscriptionByEmail: _getSubscriptionByEmail,
} = subscriptionService;

// generate otp
const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); 
  return otp;
};

// Set up Nodemailer transporter (SMTP settings for Gmail)
const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD
  },
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


transporter.use(
  "compile",
  expressHandlebars({
    viewEngine: {
      extname: ".hbs", 
      defaultLayout: "",
    },
    viewPath: join(__dirname, ""), 
    extName: ".hbs", 
  })
);

// send otp email
const sendOTPEmail = async (to, name, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to, 
    subject: "Your Password Reset OTP", 
    template: "forgotPasswordTemplate", 
    context: {
      name: name, 
      otp: otp, 
    },
  };
   
  try {
    const info = await transporter.sendMail(mailOptions);
    return info.response
  } catch (error) {
    throw error
  }
};

// Send subscription confirmation email
const sendSubscriptionEmail = async (to) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: 'Subscription Confirmation',
    template: 'subscriptionTemplate',
    context: {
      confirmSubscriptionUrl: '#',
      unsubscribeUrl: '#',
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info.response
  } catch (error) {
    throw error
  }
};

 
export default {
  sendOTPEmail,
  generateOTP,
  sendSubscriptionEmail
};
