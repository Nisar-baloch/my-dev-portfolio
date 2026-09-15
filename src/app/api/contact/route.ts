import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    const apiKey = process.env.EMAIL_SERVICE_API_KEY;

    if (!contactEmail || !apiKey) {
      // Return a specific status to let the frontend know it's not configured
      return NextResponse.json(
        { 
          error: "Email integration is not configured.", 
          details: "Please configure CONTACT_EMAIL and EMAIL_SERVICE_API_KEY environment variables."
        },
        { status: 501 } // 501 Not Implemented
      );
    }

    // Here you would implement your actual email sending logic.
    // For example, using Resend:
    /*
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: contactEmail,
        subject: subject || `New message from ${name}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send email");
    }
    */

    // For now, if keys ARE provided, we mock a successful send.
    // Replace the above block with your preferred email provider.
    
    return NextResponse.json(
      { message: "Your message has been sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "An error occurred while sending your message. Please try again later." },
      { status: 500 }
    );
  }
}
