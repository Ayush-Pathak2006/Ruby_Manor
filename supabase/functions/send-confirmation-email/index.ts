// supabase/functions/send-confirmation-email/index.ts

// REMOVED: No longer need to import 'serve' from http/server.ts

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const API_URL = "https://api.brevo.com/v3/smtp/email";
const SENDER_EMAIL = "code134h@gmail.com"; // Replace with your verified sender
const SENDER_NAME = "The Ruby Manor";

console.log("Function 'send-confirmation-email' initiated.");

// CHANGED: Use Deno.serve instead of the old 'serve' function
Deno.serve(async (req) => {
  // 1. Ensure it's a POST request
  // NEW: Added check for CORS preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' } });
  }
  if (req.method !== 'POST') {
    console.warn("Received non-POST request.");
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // 2. Get the booking details
    const { name, email, date, details, type } = await req.json();
    console.log(`Received request for: ${email}, Type: ${type}`);

    // 3. Create the dynamic subject and email body
    const subject = type === 'dining'
      ? `Your Dining Reservation at The Ruby Manor is Confirmed!`
      : `Your Room Booking at The Ruby Manor is Confirmed!`;

    const htmlContent = `
      <html><body>
        <h1>Congratulations, ${name}!</h1>
        <p>Thank you for choosing The Ruby Manor.</p>
        <p>Your ${type === 'dining' ? 'dining reservation' : 'room booking'} for ${date} is confirmed.</p>
        <p>Details: ${details}</p>
        <p>We look forward to welcoming you!</p>
        <br>
        <p>Best regards,</p>
        <p>The Ruby Manor Team</p>
        <hr>
        <p><small>This is an automated message. Please do not reply to this email.</small></p>
      </body></html>
    `;

    // 4. Prepare the data payload for the Brevo API
    const payload = {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: email, name: name }],
      subject: subject,
      htmlContent: htmlContent,
    };

    // 5. Send the request to Brevo
    console.log("Sending email via Brevo...");
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY!,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // 6. Check if Brevo accepted the request
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Brevo API Error: ${response.status} - ${errorBody}`);
      throw new Error(`Failed to send email via Brevo. Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Brevo response:", responseData);

    // 7. Send a success response back to the frontend
    // NEW: Added CORS headers to the response
    return new Response(JSON.stringify({ message: "Confirmation email sent successfully!" }), {
      headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
      status: 200,
    });

  } catch (error) {
    // 8. If anything goes wrong, send an error response back
    console.error("Error processing email request:", error);
    // NEW: Added CORS headers to the error response
    return new Response(JSON.stringify({ error: error.message || "An unknown error occurred" }), {
      headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
      status: 500,
    });
  }
}); 