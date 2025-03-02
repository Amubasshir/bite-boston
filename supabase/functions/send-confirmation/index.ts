import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    console.log("API Key present:", !!apiKey);
    
    const resend = new Resend(apiKey);
    const { email }: EmailRequest = await req.json();

    console.log("Attempting to send email to:", email);

    const emailResponse = await resend.emails.send({
      from: "TasteTrail Boston <deals@tastetrail.me>",
      to: [email],
      subject: "Welcome to TasteTrail Boston Deals!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome to TasteTrail Boston! 🎉</h1>
          <p>Thank you for subscribing to our deals newsletter. You'll be the first to know about exclusive restaurant deals in Boston.</p>
          <p>Here's what you can expect:</p>
          <ul>
            <li>Weekly restaurant deals</li>
            <li>Special promotions</li>
            <li>New restaurant announcements</li>
            <li>Seasonal offers</li>
          </ul>
          <p>Stay tuned for our next update!</p>
          <p>Best regards,<br>The TasteTrail Team</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);