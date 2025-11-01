import nodemailer from 'nodemailer';
import 'dotenv/config';
import twilio from 'twilio'

export const sendEmailOtp = async (mail, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // your Gmail
        pass: process.env.MAIL_PASS, // your App Password
      },
    });

    // Mail content
    const mailConfiguration = {
      from: `"Sneekar Hub" <${process.env.MAIL_USER}>`,
      to: mail,
      subject: "SneekarHub - Email Verification OTP",
      
      html:`
         <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>🔒 Verify Your Email</h2>
          <p>Your OTP for email verification is:</p>
          <h1 style="color: #007bff;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
          <br/>
          <p>Thanks,<br/>Team SneekarHub</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailConfiguration);
    console.log(`✅ Verification email sent to ${mail}`);
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
  }
};


const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendMobileOtp = async (otp, mobileNumber) => {
  try {
    const message = await client.messages.create({
      body: `Your SneekarHub OTP is ${otp}. It will expire in 10 minutes.`,
      from: process.env.TWILIO_PHONE, // Twilio phone number
      to: `+91${mobileNumber}`, // add country code
    });

    console.log("✅ SMS sent:", message.sid);
  } catch (error) {
    console.error("❌ Error sending SMS:", error.message);
    throw new Error("Failed to send SMS OTP");
  }
};