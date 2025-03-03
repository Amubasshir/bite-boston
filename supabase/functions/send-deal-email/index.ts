import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const { userEmail, userName, restaurantName, dealTitle, confirmationId, expiryDate, dealDescription } = await req.json();

    const emailResponse = await resend.emails.send({
      from: "TasteTrail Boston <deals@tastetrail.me>",
      to: [userEmail],
      subject: `Your TasteTrail Deal Confirmation - ${dealTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2D3748">Deal Confirmation</h1>
          <p>Hi ${userName},</p>
          <p>Your deal at ${restaurantName} has been confirmed!</p>
          <div style="background: #F7FAFC; padding: 24px; border-radius: 8px;">
            <h2 style="color: #2D3748">${dealTitle}</h2>
            <p>${dealDescription}</p>
            <p><strong>Confirmation ID:</strong> ${confirmationId}</p>
            <p><strong>Expires:</strong> ${new Date(expiryDate).toLocaleDateString()}</p>
          </div>
          <p>Present this confirmation when visiting ${restaurantName}.</p>
          <p>Enjoy your meal!</p>
        </div>
      `,
    });

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);