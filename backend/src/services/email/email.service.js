import { createTransport } from "nodemailer";
import expressHandlebars from "nodemailer-express-handlebars";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from 'dotenv';
dotenv.config(); 

// generate otp
const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit OTP
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

// Get the current directory from import.meta.url
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = dirname(__filename); // Get the current directory path

// Set up Handlebars template engine (use current directory for templates)
transporter.use(
  "compile",
  expressHandlebars({
    viewEngine: {
      extname: ".hbs", // Use .hbs extension
      defaultLayout: "", // If not using layouts, leave as empty string
    },
    viewPath: join(__dirname, ""), // Use current directory for templates
    extName: ".hbs", // Set file extension for templates
  })
);

// send otp email
const sendOTPEmail = async (to, name, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM, // Sender's email address
    to: to, // Recipient's email address
    subject: "Your Password Reset OTP", // Subject line
    template: "forgotPasswordTemplate", // Name of the Handlebars template (without .hbs extension)
    context: {
      // Dynamic content for the template
      name: name, // User's name
      otp: otp, // The generated OTP
    },
  };
   
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.response);
    return info.response
  } catch (error) {
    console.error("Error sending OTP email:", error);
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
    console.log("Subscription email sent:", info.response);
    return info.response
  } catch (error) {
    console.error("Error sending subscription email:", error);
  }
};

 
export default {
  sendOTPEmail,
  generateOTP,
  sendSubscriptionEmail
};
