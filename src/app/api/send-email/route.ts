import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_APP_PASS, 
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER, 
      subject: subject,
      text: `From: ${name} <${email}>\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
