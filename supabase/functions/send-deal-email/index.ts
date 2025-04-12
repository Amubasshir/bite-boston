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
          <meta name="color-scheme" content="light only">
          <meta name="supported-color-schemes" content="light only">
          <title>TasteTrail Deal Confirmation</title>
          <style>
            :root {
              color-scheme: light only;
              supported-color-schemes: light only;
            }
            body, table, td {
              color-scheme: light only;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #ffffff !important; color-scheme: light only; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: #ffffff !important;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; max-width: 600px; background-color: #ffffff !important; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(88, 86, 214, 0.1);">
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

                  <!-- PROMINENT RESTAURANT & DEAL CARD -->
                  <tr>
                    <td style="padding: 0 32px 20px;">
                      <div style="background: linear-gradient(150deg, #5856D6 0%, #7964E3 100%); border-radius: 12px; padding: 24px; text-align: center; box-shadow: 0 8px 20px rgba(88, 86, 214, 0.15);">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: transparent;">
                          <tr>
                            <td style="text-align: center; padding-bottom: 12px;">
                              <span style="font-size: 32px; color: white;">✨</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="text-align: center;">
                              <h2 style="margin: 0; color: white; font-size: 26px; line-height: 32px; font-weight: 700;">
                                ${restaurantName}
                              </h2>
                              <div style="margin: 12px auto; padding: 14px; background-color: rgba(255, 255, 255, 0.15); border-radius: 8px;">
                                <p style="margin: 0; color: white; font-size: 22px; line-height: 28px; font-weight: 700;">
                                  ${dealTitle}
                                </p>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>

                  <!-- SUPER PROMINENT DATE BOX -->
                  <tr>
                    <td style="padding: 0 32px 20px;">
                      <div style="background: linear-gradient(135deg, #6157FF 0%, #A552DE 100%); border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 4px 12px rgba(97, 87, 255, 0.3);">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: transparent;">
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

                  <!-- HOW TO REDEEM -->
                  <tr>
                    <td style="padding: 0 32px 32px;">
                      <h3 style="margin: 0 0 16px; color: #5856D6; font-size: 18px; line-height: 24px; font-weight: 600;">
                        How to Redeem Your Deal
                      </h3>
                      <div style="background-color: #F5F5FF; border-radius: 12px; padding: 20px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: transparent;">
                          <!-- Step 1 -->
                          <tr>
                            <td valign="top" style="padding: 0 0 14px 0;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: transparent;">
                                <tr>
                                  <td valign="top" width="28" style="padding-right: 14px;">
                                    <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #5856D6; color: white; text-align: center; line-height: 28px; font-weight: 600; font-size: 14px;">1</div>
                                  </td>
                                  <td style="color: #1D1D1F; font-size: 15px; line-height: 22px; font-weight: 500;">Check-in & Inform the restaurant staff that you're claiming a TasteTrail deal</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <!-- Step 2 -->
                          <tr>
                            <td valign="top" style="padding: 0 0 14px 0;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: transparent;">
                                <tr>
                                  <td valign="top" width="28" style="padding-right: 14px;">
                                    <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #5856D6; color: white; text-align: center; line-height: 28px; font-weight: 600; font-size: 14px;">2</div>
                                  </td>
                                  <td style="color: #1D1D1F; font-size: 15px; line-height: 22px; font-weight: 500;">Enjoy Your Meal – dig in and savor every bite! 🍽️</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <!-- Step 3 -->
                          <tr>
                            <td valign="top" style="padding: 0 0 14px 0;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: transparent;">
                                <tr>
                                  <td valign="top" width="28" style="padding-right: 14px;">
                                    <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #5856D6; color: white; text-align: center; line-height: 28px; font-weight: 600; font-size: 14px;">3</div>
                                  </td>
                                  <td style="color: #1D1D1F; font-size: 15px; line-height: 22px; font-weight: 500;">Show Your Confirmation Email to the server when requesting the check</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <!-- Step 4 -->
                          <tr>
                            <td valign="top" style="padding: 0 0 0 0;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: transparent;">
                                <tr>
                                  <td valign="top" width="28" style="padding-right: 14px;">
                                    <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #5856D6; color: white; text-align: center; line-height: 28px; font-weight: 600; font-size: 14px;">4</div>
                                  </td>
                                  <td style="color: #1D1D1F; font-size: 15px; line-height: 22px; font-weight: 500;">Pay Directly with the restaurant—deal will be applied, no hassle!</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>

                  <!-- FINE PRINT -->
                  <tr>
                    <td style="padding: 0 32px 24px;">
                      <p style="margin: 0; color: #86868b; font-size: 12px; line-height: 18px; font-style: italic;">
                        Deals are valid for a limited time only and subject to availability. Offers cannot be combined with any other promotions, discounts, or coupons. One deal per customer per transaction. Additional terms and conditions may apply. TasteTrail or the restaurant reserves the right to modify or cancel offers at any time without prior notice.
                      </p>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="background-color: #F0EEFF; padding: 24px 32px; text-align: center;">
                      <p style="margin: 0; color: #5856D6; font-size: 13px; line-height: 18px;">
                        Questions? Contact us at <a href="mailto:support@tastetrail.me" style="color: #5856D6; text-decoration: none; font-weight: 600;">support@tastetrail.me</a> or call 815.404.1738
                      </p>
                      <p style="margin: 12px 0 0; color: #6157FF; font-size: 13px; line-height: 18px;">
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