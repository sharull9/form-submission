import nodemailer from "nodemailer";

export async function sendMail(name: string, email: string, message: string) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: `${name} has sent you an email (${email})`,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      //@ts-ignore
      throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}
