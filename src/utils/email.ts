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

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretData.value}`,
      },
      body: JSON.stringify({
        from: 'TasteTrail <deals@tastetrail.com>',
        to: [to],
        subject: '🎉 Congrats! You Just Claimed a Deal! 🎉',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
            <p>Hey ${name},</p>
            <p>Wohoo! You're all set to redeem your exclusive deal! 🎊 Here are the details:</p>
            
            <p>📍 Restaurant: ${restaurant_name}</p>
            <p>💳 Your Deal: ${dealTitle}</p>
            <p>📅 Must be redeemed on: ${new Date(expiry_date).toLocaleDateString()}</p>

            <p>How to Redeem:</p>
            <p>✅ Check-in & Inform the restaurant staff that you're claiming a TasteTrail deal.</p>
            <p>✅ Enjoy Your Meal – dig in and savor every bite! 🍽️</p>
            <p>✅ Show Your Confirmation Email to the server when requesting the check.</p>
            <p>✅ Pay Directly with the restaurant—deal will be applied, no hassle!</p>

            <p>📌 Need Help? If you have any questions, reply to this email</p>
            <p>Bon appétit & may your tummies be full! 😋</p>
            <p>- The TasteTrail Team</p>
          </div>
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