import nodemailer from "nodemailer";
import { render } from "react-email";
import { VerificationEmail } from "@/components/layouts/Emails/VerificationEmail";
import environment from "@/config/environment";
import SecurityAlertEmail from "@/components/layouts/Emails/SecurityAlertEmail";

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

export async function sendMailVerif({ email, username, verifyUrl }: sendMailProps) {
  const emailHtml = await render(VerificationEmail({ username, verifyUrl, email }));

  await transporter.sendMail({
    from: environment.EMAIL_FROM,
    to: email,
    subject: "Verify Your Account",
    html: emailHtml,
  });
}

type SecurityAlertEmailProps = {
  email: string;
  username: string;
  changePasswordUrl: string;
  attemptTime: string;
};

export async function sendMailSecurity({
  email,
  username,
  changePasswordUrl,
  attemptTime,
}: SecurityAlertEmailProps) {
  const emailHtml = await render(
    SecurityAlertEmail({
      email,
      username,
      changePasswordUrl,
      attemptTime,
    }),
  );

  await transporter.sendMail({
    from: environment.EMAIL_FROM,
    to: email,
    subject: "Security Alert",
    html: emailHtml,
  });
}

