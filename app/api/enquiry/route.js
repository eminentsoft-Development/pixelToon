import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const region = request.headers.get("x-vercel-ip-country-region");

    if (region !== "KL") {
      return new Response(
        JSON.stringify({ error: "Service only available in Kerala." }),
        {
          status: 403,
        },
      );
    }

    const body = await request.json();
    const { name, phone, email, message } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. The Professional HTML Email Template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; margin: 0; padding: 40px 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
          .header { background: linear-gradient(to right, #F09410, #BC430D); padding: 30px 20px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px; }
          .content { padding: 40px 30px; }
          .greeting { font-size: 18px; color: #111827; margin-top: 0; font-weight: 600; }
          .info-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .info-table th { text-align: left; padding: 12px 0; color: #6b7280; font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #f3f4f6; width: 35%; }
          .info-table td { padding: 12px 0; color: #111827; font-size: 15px; font-weight: 500; border-bottom: 1px solid #f3f4f6; }
          .message-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-top: 20px; color: #374151; font-size: 14px; line-height: 1.6; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>PIXELTOONZ ACADEMY</h1>
          </div>
          <div class="content">
            <p class="greeting">New Course Enquiry Received! 🎉</p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">A new student is interested in joining your creative programs. Here are their details:</p>
            
            <table class="info-table">  
              <tr>
                <th>Full Name</th>
                <td>${name}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td><a href="tel:${phone}" style="color: #F09410; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td>${email ? `<a href="mailto:${email}" style="color: #F09410; text-decoration: none;">${email}</a>` : '<span style="color: #9ca3af;">Not provided</span>'}</td>
              </tr>
            </table>

            ${
              message
                ? `
              <h3 style="margin-top: 30px; margin-bottom: 10px; font-size: 14px; color: #6b7280; text-transform: uppercase;">Message / Goals:</h3>
              <div class="message-box">
                ${message.replace(/\n/g, "<br>")}
              </div>
            `
                : ""
            }
            
          </div>
          <div class="footer">
            <p>This email was automatically generated from your website's enquiry form.</p>
            <p>&copy; ${new Date().getFullYear()} Pixeltoonz Academy</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 3. Send the Email
    await transporter.sendMail({
      from: `"Pixeltoonz Website Enquiry Form" <pixeltoonzacademy@gmail.com>`,
      to: process.env.EMAIL_RECEIVER, // The email address that receives enquiries
      subject: `New Enquiry: ${name}`,
      html: htmlTemplate,
      replyTo: email || undefined, // Allows you to hit "Reply" directly to the student if they left an email
    });

    return NextResponse.json(
      { message: "Enquiry submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending enquiry email:", error);
    return NextResponse.json(
      { message: "Failed to send enquiry" },
      { status: 500 },
    );
  }
}
