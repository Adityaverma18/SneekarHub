import twilio from 'twilio'
import 'dotenv/config'

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendPhoneOtp = async (otp, mobileNumber) => {
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