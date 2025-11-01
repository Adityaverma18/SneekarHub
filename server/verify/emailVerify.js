import nodemailer from 'nodemailer';
import 'dotenv/config';

export const verifyEmail = async (token, user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // your Gmail
        pass: process.env.MAIL_PASS, // your App Password
      },
    });

    // Verification link
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    // Mail content
    const mailConfiguration = {
      from: `"Sneekar Hub" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: "Verify Your Email Address - Sneekar Hub",
      text: `Hi ${user.firstName},

Thank you for registering with Sneekar Hub!

Please verify your email address by clicking the link below:
${verificationLink}

This link will expire in 15 minutes.

If you did not sign up, please ignore this email.

Best Regards,
Sneekar Hub Team
`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="text-align: center; color: #333;">Welcome to <span style="color: #007bff;">Sneekar Hub</span> 👟</h2>
          <p>Hi <strong>${user.firstName}</strong>,</p>
          <p>Thanks for signing up! Please verify your email address by clicking the button below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" 
               style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Verify Email
            </a>
          </div>

          <p>This link will expire in <strong>15 minutes</strong>.</p>
          <p>If you didn’t create an account, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888;">&copy; ${new Date().getFullYear()} Sneekar Hub. All rights reserved.</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailConfiguration);
    console.log(`✅ Verification email sent to ${user.email}`);
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
  }
};
