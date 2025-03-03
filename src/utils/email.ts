import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SendConfirmationEmailProps {
  to: string;
  name: string;
  confirmationId: string;
  dealTitle: string;
}

export async function sendConfirmationEmail({ 
  to, 
  name, 
  confirmationId, 
  dealTitle 
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
        subject: 'Your TasteTrail Deal Confirmation',
        html: `
          <h1>Deal Confirmation</h1>
          <p>Hi ${name},</p>
          <p>Thank you for claiming the deal: <strong>${dealTitle}</strong></p>
          <p>Your confirmation ID is: <strong>${confirmationId}</strong></p>
          <p>Please keep this ID for your records and show it at the restaurant.</p>
          <br/>
          <p>Enjoy your meal!</p>
          <p>- The TasteTrail Team</p>
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