import nodemailer from "nodemailer";
import { render } from "react-email";
import { VerificationEmail } from "@/components/layouts/Emails/VerificationEmail";
import environment from "@/config/environment";

export const transporter = nodemailer.createTransport({
  host: environment.EMAIL_SMTP_HOST,
  port: Number(environment.EMAIL_SMTP_PORT),
  auth: {
    user: environment.EMAIL_SMTP_USER,
    pass: environment.EMAIL_SMTP_PASS,
  },
});

type sendMailProps = {
  email: string;
  username: string;
  verifyUrl: string;
};

export async function sendMail({ email, username, verifyUrl }: sendMailProps) {
  const emailHtml = await render(VerificationEmail({ username, verifyUrl }));

  await transporter.sendMail({
    from: environment.EMAIL_FROM,
    to: email,
    subject: "Verify Your Account",
    html: emailHtml,
  });
}


