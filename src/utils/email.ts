import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SendConfirmationEmailProps {
  to: string;
  name: string;
  confirmationId: string;
  dealTitle: string;
  restaurant_name: string;
  expiry_date: Date;
}

export async function sendConfirmationEmail({ 
  to, 
  name,
  confirmationId,
  dealTitle,
  restaurant_name,
  expiry_date
}: SendConfirmationEmailProps) {
  try {
    // Fetch the API key using maybeSingle() to handle the case where it might not exist
    const { data: secretData, error: secretError } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'VITE_SUPABASE_RESEND_API_KEY_LATTEST')
      .maybeSingle();

    if (secretError) {
      console.error('Error fetching Resend API key:', secretError);
      throw new Error('Failed to fetch API key');
    }

    if (!secretData) {
      throw new Error('Resend API key not found');
    }

    // Format date in a nice way
    const formattedDate = new Date(expiry_date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    // Generate a random confirmation code format
    const formattedConfirmationId = confirmationId.replace(/(\w{4})(\w{4})/, "$1-$2");

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretData.value}`,
      },
      body: JSON.stringify({
        from: 'TasteTrail <deals@tastetrail.com>',
        to: [to],
        subject: `Deal Claimed: ${dealTitle} at ${restaurant_name}`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>TasteTrail Deal Confirmation</title>
          <!--[if mso]>
          <style type="text/css">
            body, table, td {font-family: SF Pro Text, SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif !important;}
          </style>
          <![endif]-->
        </head>
        <body style="margin: 0; padding: 0; background-color: #f7f7f7; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" class="email-container" style="border-collapse: collapse; max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);">
                  <!-- HEADER -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #5856D6 0%, #AF52DE 100%); padding: 32px; text-align: center;">
                      <img src="https://i.imgur.com/KO81pLu.png" alt="TasteTrail" width="150" style="width: 150px; height: auto; display: inline-block;">
                      <h1 style="margin: 20px 0 0; padding: 0; color: white; font-family: SF Pro Display, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif; font-weight: 600; font-size: 26px; line-height: 32px;">Deal Confirmation</h1>
                    </td>
                  </tr>
                  
                  <!-- GREETING -->
                  <tr>
                    <td style="padding: 32px 32px 0; text-align: center; font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif;">
                      <p style="margin: 0; color: #1D1D1F; font-size: 17px; line-height: 25px; font-weight: 400;">
                        Hello ${name},
                      </p>
                      <p style="margin: 12px 0 0; color: #86868b; font-size: 15px; line-height: 23px;">
                        Your deal has been successfully claimed and is ready to use.
                      </p>
                    </td>
                  </tr>

                  <!-- DEAL INFO CARD -->
                  <tr>
                    <td style="padding: 24px 32px;">
                      <div style="background-color: #F5F5F7; border-radius: 12px; padding: 24px; font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif;">
                        <!-- Restaurant name -->
                        <h2 style="margin: 0; color: #1D1D1F; font-size: 20px; line-height: 24px; font-weight: 600; font-family: SF Pro Display, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif;">
                          ${restaurant_name}
                        </h2>
                        <!-- Deal title -->
                        <h3 style="margin: 8px 0 16px; color: #5856D6; font-size: 17px; line-height: 22px; font-weight: 600;">
                          ${dealTitle}
                        </h3>
                        <!-- Divider -->
                        <div style="height: 1px; background-color: #E5E5EA; margin: 16px 0;"></div>
                        <!-- PROMINENT DATE BOX -->
                        <div style="background: linear-gradient(135deg, #FF2D55 0%, #FF9500 100%); border-radius: 10px; padding: 16px; margin: 16px 0; text-align: center; box-shadow: 0 2px 12px rgba(255, 45, 85, 0.2);">
                          <div style="margin-bottom: 4px;">
                            <span style="font-size: 20px;">🗓️</span>
                          </div>
                          <p style="margin: 0; color: white; font-size: 16px; line-height: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            Must be redeemed on
                          </p>
                          <p style="margin: 4px 0 0; color: white; font-size: 20px; line-height: 24px; font-weight: 700;">
                            ${formattedDate}
                          </p>
                        </div>
                        <div style="display: flex;">
                          <div style="width: 24px; min-width: 24px; text-align: center; margin-right: 12px;">
                            <span style="font-size: 16px;">🔢</span>
                          </div>
                          <div>
                            <p style="margin: 0; color: #1D1D1F; font-size: 15px; line-height: 20px; font-weight: 500;">Confirmation Code</p>
                            <p style="margin: 2px 0 0; color: #86868b; font-size: 14px; line-height: 20px; font-family: SFMono-Regular, Menlo, Monaco, Consolas, monospace;">${formattedConfirmationId}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <!-- HOW TO REDEEM -->
                  <tr>
                    <td style="padding: 0 32px 32px; font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif;">
                      <h3 style="margin: 0 0 16px; color: #1D1D1F; font-size: 17px; line-height: 22px; font-weight: 600; font-family: SF Pro Display, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif;">
                        How to Redeem Your Deal
                      </h3>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                        <!-- Step 1 -->
                        <tr>
                          <td valign="top" style="padding: 0 0 12px 0;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                              <tr>
                                <td valign="top" width="24" style="padding-right: 12px; color: #5856D6; font-weight: 600; font-size: 14px;">1.</td>
                                <td style="color: #1D1D1F; font-size: 14px; line-height: 20px;">Show your confirmation code to the restaurant staff upon arrival</td>
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
                                <td style="color: #1D1D1F; font-size: 14px; line-height: 20px;">Enjoy your meal and the exclusive deal you've claimed</td>
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
                                <td style="color: #1D1D1F; font-size: 14px; line-height: 20px;">The discount will be applied automatically when you pay</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!-- View Details Button -->
                      <div style="margin-top: 24px; text-align: center;">
                        <a href="https://tastetrail.com/deals/${confirmationId}" style="display: inline-block; background: linear-gradient(135deg, #5856D6 0%, #AF52DE 100%); color: white; text-decoration: none; font-weight: 500; font-size: 15px; line-height: 1; padding: 12px 24px; border-radius: 20px; box-shadow: 0 2px 8px rgba(88, 86, 214, 0.3);">
                          View Deal Details
                        </a>
                      </div>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="background-color: #F5F5F7; padding: 24px 32px; text-align: center; font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif;">
                      <p style="margin: 0; color: #86868b; font-size: 12px; line-height: 18px;">
                        Questions? <a href="mailto:support@tastetrail.com" style="color: #5856D6; text-decoration: none;">Contact our support team</a>
                      </p>
                      <p style="margin: 12px 0 0; color: #86868b; font-size: 12px; line-height: 18px;">
                        © ${new Date().getFullYear()} TasteTrail. All rights reserved.
                      </p>
                      <p style="margin: 12px 0 0; color: #86868b; font-size: 12px; line-height: 18px;">
                        <a href="https://tastetrail.com/privacy" style="color: #5856D6; text-decoration: none; margin: 0 8px;">Privacy Policy</a> • 
                        <a href="https://tastetrail.com/terms" style="color: #5856D6; text-decoration: none; margin: 0 8px;">Terms of Service</a>
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
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      throw new Error(`Failed to send email: ${errorData.message || 'Unknown error'}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    toast.success("Confirmation email sent!");

  } catch (error) {
    console.error('Error sending confirmation email:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to send confirmation email');
    throw error;
  }
}