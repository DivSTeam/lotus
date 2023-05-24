import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendVerificationEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Verify your email address',
    text: `Please click on the following link to verify your email address: http://localhost:3000/api/verify-email?token=${user.verificationToken}`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendVerificationEmail;