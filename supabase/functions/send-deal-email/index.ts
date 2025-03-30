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
      subject: "🎉 Congrats! You Just Claimed a Deal! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <p>Hey ${userName},</p>
          <p>Wohoo! You're all set to redeem your exclusive deal! 🎊 Here are the details:</p>
          
          <p>📍 Restaurant: ${restaurantName}</p>
          <p>💳 Your Deal: ${dealTitle}</p>
          <p>📅 Redeemable on this date only: ${new Date(expiryDate).toLocaleDateString()}</p>

          <p>How to Redeem:</p>
          <p>✅ Check-in & Inform the restaurant staff that you're claiming a TasteTrail deal.</p>
          <p>✅ Enjoy Your Meal – dig in and savor every bite! 🍽️</p>
          <p>✅ Show Your Confirmation Email to the server when requesting the check.</p>
          <p>✅ Pay Directly with the restaurant—deal will be applied, no hassle!</p>

          <p>Deals are valid for a limited time only and subject to availability. Offers cannot be combined with any other promotions, discounts, or coupons. One deal per customer per transaction. Additional terms and conditions may apply. TasteTrail or the restaurant reserves the right to modify or cancel offers at any time without prior notice.</p>

          <p>📌 Need Help? If you have any questions, reply to this email or call 815.404.1738</p>
          <p>Bon appétit & may your tummies be full! 😋</p>
          <p>- The TasteTrail Team</p>
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