import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// 1. Zod validation schema matching the FranchiseForm component payload exactly
const franchiseSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian phone number"
    ),
  preferredLocation: z
    .string()
    .min(3, "Please specify a location (minimum 3 characters)"),
});

export async function POST(req) {
  try {
    const body = await req.json();

    // 2. Schema Validation check
    const result = franchiseSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: result.error.format() },
        { status: 400 },
      );
    }

    // 3. Destructure payload fields safely
    const { fullName, phoneNumber, preferredLocation } = result.data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Professional Pixeltoonz Branded Franchise Lead Template
    const mailOptions = {
      from: `"Pixeltoonz Franchise" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER, // Academy Operations Email Target
      subject: `New Franchise Inquiry: ${preferredLocation} - ${fullName}`,
      text: `Full Name: ${fullName}\nPhone: ${phoneNumber}\nPreferred Location: ${preferredLocation}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
          
          <div style="background-color: #000000; padding: 24px; text-align: center;">
            <h1 style="color: #F09410; margin: 0; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Pixeltoonz Academy</h1>
            <p style="color: #ffffff; margin: 6px 0 0 0; font-size: 12px; opacity: 0.8; letter-spacing: 0.5px;">Franchise Partnership Application</p>
          </div>

          <div style="padding: 24px;">
            
            <h2 style="color: #BC430D; font-size: 16px; border-bottom: 2px solid #F09410; padding-bottom: 8px; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 1px;">Applicant Details</h2>

            <div style="margin-bottom: 12px; display: flex; align-items: baseline;">
              <div style="width: 150px; color: #666666; font-size: 14px; font-weight: bold; flex-shrink: 0;">Full Name:</div>
              <div style="color: #1a1a1a; font-size: 14px; font-weight: 500;">${fullName}</div>
            </div>

            <div style="margin-bottom: 12px; display: flex; align-items: baseline;">
              <div style="width: 150px; color: #666666; font-size: 14px; font-weight: bold; flex-shrink: 0;">Phone Number:</div>
              <div>
                <a href="tel:${phoneNumber}" style="color: #BC430D; text-decoration: none; font-size: 14px; font-weight: bold;">${phoneNumber}</a>
              </div>
            </div>

            <div style="margin-bottom: 12px; display: flex; align-items: baseline;">
              <div style="width: 150px; color: #666666; font-size: 14px; font-weight: bold; flex-shrink: 0;">Target Territory:</div>
              <div style="color: #1a1a1a; font-weight: bold; font-size: 14px; text-transform: uppercase;">${preferredLocation}</div>
            </div>

            <div style="margin-top: 24px; background-color: #fff9f5; padding: 16px; border-left: 4px solid #F09410; border-radius: 4px;">
              <p style="color: #BC430D; margin: 0; font-size: 13px; font-weight: 600;">
                Next Step Action Required:
              </p>
              <p style="color: #555555; margin: 4px 0 0 0; font-size: 13px; line-height: 1.5;">
                Please review geographic territory availability brackets and ensure the information presentation brochure pack is prepared before contacting the applicant.
              </p>
            </div>

          </div>

          <div style="background-color: #f8f9fa; padding: 16px; text-align: center; color: #888888; font-size: 11px; border-top: 1px solid #eeeeee;">
            <p style="margin: 0;">Sent automatically via secure web stream from the official <strong>Pixeltoonz Academy Franchise Portal</strong>.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Franchise inquiry sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Franchise System Entry Error:", error);
    return NextResponse.json(
      { message: "Failed to process partner application parameters" },
      { status: 500 },
    );
  }
}