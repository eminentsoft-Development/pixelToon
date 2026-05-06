import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// 1. Updated Schema to match your requirements
const contactSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(
      /^(\+91[\-\s]?)?[6-9]\d{9}$/,
      "Enter a valid Indian phone number (with or without +91)",
    ),
  course: z.string().min(1, "Please select a course."),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req) {
  try {
    const body = await req.json();

    // 2. Validate
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: result.error.format() },
        { status: 400 },
      );
    }

    // 3. Destructure corrected fields
    const { fullname, phone, course, message } = result.data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Professional Pixeltoonz Branded Template
    const mailOptions = {
      from: `"Pixeltoonz Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER, // Your Academy Email
      replyTo: process.env.EMAIL_REPLY_TO, // Optional: if you had an email field in the form
      subject: `New Inquiry: ${course} - ${fullname}`,
      text: `Name: ${fullname}\nPhone: ${phone}\nCourse: ${course}\nMessage: ${message}`,
      html: `
         <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
  
  <!-- Header: No extra margin/padding around the edges -->
  <div style="background-color: #000; padding: 20px; text-align: center;">
    <h1 style="color: #f07822; margin: 0; font-size: 18px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Pixeltoonz Academy</h1>
    <p style="color: #fff; margin: 5px 0 0 0; font-size: 11px; opacity: 0.8;">New Admission Inquiry</p>
  </div>

  <!-- Content Section -->
  <div style="padding: 20px;">
    
    <!-- Section Title -->
    <h2 style="color: #f07822; font-size: 16px; border-bottom: 2px solid #f07822; padding-bottom: 8px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">Inquiry Details</h2>

    <!-- Data Rows using Divs -->
    <div style="margin-bottom: 10px; display: flex; align-items: baseline;">
      <div style="width: 100px; color: #666; font-size: 14px; font-weight: bold; flex-shrink: 0;">Full Name:</div>
      <div style="color: #1a1a1a; font-size: 14px;">${fullname}</div>
    </div>

    <div style="margin-bottom: 10px; display: flex; align-items: baseline;">
      <div style="width: 100px; color: #666; font-size: 14px; font-weight: bold; flex-shrink: 0;">Phone:</div>
      <div>
        <a href="tel:${phone}" style="color: #f07822; text-decoration: none; font-size: 14px; font-weight: bold;">${phone}</a>
      </div>
    </div>

    <div style="margin-bottom: 20px; display: flex; align-items: baseline;">
      <div style="width: 100px; color: #666; font-size: 14px; font-weight: bold; flex-shrink: 0;">Course:</div>
      <div  style="color: #1a1a1a; text-transform: uppercase; font-weight: bold; font-size: 14px;">${course}</div>
    </div>

    <!-- Message Section -->
    <h2 style="color: #1a1a1a; font-size: 16px; border-bottom: 2px solid #f07822; padding-bottom: 8px; margin: 25px 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">Message</h2>
    <div style="color: #444; line-height: 1.6; background-color: #f9f9f9; padding: 15px; border-radius: 6px; font-size: 14px; border-left: 4px solid #f07822; font-style: italic;">
      "${message}"
    </div>

  </div>

  <!-- Footer -->
  <div style="background-color: #f4f4f4; padding: 15px; text-align: center; color: #888; font-size: 11px; border-top: 1px solid #eee;">
    <p style="margin: 0;">This email was sent from the <strong>Pixeltoonz Academy</strong> website contact form.</p>
  </div>
</div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Inquiry sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Inquiry Error:", error);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 },
    );
  }
}
