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
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>TasteTrail Deal Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f7f7f7; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);">
                  <!-- HEADER -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #5856D6 0%, #AF52DE 100%); padding: 32px; text-align: center;">
                      <h1 style="margin: 0; padding: 0; color: white; font-weight: 600; font-size: 26px; line-height: 32px;">Deal Confirmation</h1>
                    </td>
                  </tr>
                  
                  <!-- GREETING -->
                  <tr>
                    <td style="padding: 32px 32px 20px; text-align: center;">
                      <p style="margin: 0; color: #1D1D1F; font-size: 17px; line-height: 25px; font-weight: 400;">
                        Hello ${userName},
                      </p>
                      <p style="margin: 12px 0 0; color: #86868b; font-size: 15px; line-height: 23px;">
                        Your deal has been successfully claimed!
                      </p>
                    </td>
                  </tr>

                  <!-- SUPER PROMINENT DATE BOX -->
                  <tr>
                    <td style="padding: 0 32px 20px;">
                      <div style="background: linear-gradient(135deg, #FF2D55 0%, #FF9500 100%); border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 4px 12px rgba(255, 45, 85, 0.3);">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                          <tr>
                            <td style="text-align: center;">
                              <span style="font-size: 32px; color: white;">🗓️</span>
                              <h2 style="margin: 8px 0; color: white; font-size: 22px; line-height: 28px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                                MUST BE REDEEMED ON
                              </h2>
                              <div style="margin: 12px auto; padding: 12px; background-color: rgba(255, 255, 255, 0.2); border-radius: 8px; display: inline-block;">
                                <p style="margin: 0; color: white; font-size: 28px; line-height: 34px; font-weight: 800;">
                                  ${new Date(expiryDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                              </div>
                              <p style="margin: 8px 0 0; color: white; font-size: 16px; font-weight: 600; letter-spacing: 0.5px;">
                                VALID THIS DATE ONLY!
                              </p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>

                  <!-- DEAL INFO CARD -->
                  <tr>
                    <td style="padding: 0 32px 24px;">
                      <div style="background-color: #F5F5F7; border-radius: 12px; padding: 24px;">
                        <!-- Restaurant name -->
                        <h2 style="margin: 0; color: #1D1D1F; font-size: 20px; line-height: 24px; font-weight: 600;">
                          ${restaurantName}
                        </h2>
                        <!-- Deal title -->
                        <h3 style="margin: 8px 0 16px; color: #5856D6; font-size: 17px; line-height: 22px; font-weight: 600;">
                          ${dealTitle}
                        </h3>
                      </div>
                    </td>
                  </tr>

                  <!-- HOW TO REDEEM -->
                  <tr>
                    <td style="padding: 0 32px 32px;">
                      <h3 style="margin: 0 0 16px; color: #1D1D1F; font-size: 17px; line-height: 22px; font-weight: 600;">
                        How to Redeem Your Deal
                      </h3>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                        <!-- Step 1 -->
                        <tr>
                          <td valign="top" style="padding: 0 0 12px 0;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                              <tr>
                                <td valign="top" width="24" style="padding-right: 12px; color: #5856D6; font-weight: 600; font-size: 14px;">1.</td>
                                <td style="color: #1D1D1F; font-size: 14px; line-height: 20px;">Check-in & Inform the restaurant staff that you're claiming a TasteTrail deal</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <!-- Step 2 -->
                        <tr>
                          <td valign="top" style="padding: 0 0 12px 0;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                              <tr>
                                <td valign="top" width="24" style="padding-right: 12px; color: #5856D6; font-weight: 600; font-size: 14px;">2.</td>
                                <td style="color: #1D1D1F; font-size: 14px; line-height: 20px;">Enjoy Your Meal – dig in and savor every bite! 🍽️</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <!-- Step 3 -->
                        <tr>
                          <td valign="top" style="padding: 0 0 12px 0;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                              <tr>
                                <td valign="top" width="24" style="padding-right: 12px; color: #5856D6; font-weight: 600; font-size: 14px;">3.</td>
                                <td style="color: #1D1D1F; font-size: 14px; line-height: 20px;">Show Your Confirmation Email to the server when requesting the check</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <!-- Step 4 -->
                        <tr>
                          <td valign="top" style="padding: 0 0 12px 0;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                              <tr>
                                <td valign="top" width="24" style="padding-right: 12px; color: #5856D6; font-weight: 600; font-size: 14px;">4.</td>
                                <td style="color: #1D1D1F; font-size: 14px; line-height: 20px;">Pay Directly with the restaurant—deal will be applied, no hassle!</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- FINE PRINT -->
                  <tr>
                    <td style="padding: 0 32px 24px;">
                      <p style="margin: 0; color: #86868b; font-size: 12px; line-height: 18px;">
                        Deals are valid for a limited time only and subject to availability. Offers cannot be combined with any other promotions, discounts, or coupons. One deal per customer per transaction. Additional terms and conditions may apply. TasteTrail or the restaurant reserves the right to modify or cancel offers at any time without prior notice.
                      </p>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="background-color: #F5F5F7; padding: 24px 32px; text-align: center;">
                      <p style="margin: 0; color: #86868b; font-size: 13px; line-height: 18px;">
                        Questions? Contact us at <a href="mailto:support@tastetrail.me" style="color: #5856D6; text-decoration: none;">support@tastetrail.me</a> or call 815.404.1738
                      </p>
                      <p style="margin: 12px 0 0; color: #86868b; font-size: 13px; line-height: 18px;">
                        Bon appétit & may your tummies be full! 😋
                      </p>
                      <p style="margin: 12px 0 0; color: #86868b; font-size: 12px; line-height: 18px;">
                        © ${new Date().getFullYear()} TasteTrail. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
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