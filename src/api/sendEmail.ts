import { Resend } from 'resend';
import DealClaimEmail from '@/components/emails/DealClaimEmail';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export const sendDealConfirmationEmail = async (emailData: {
  to: string;
  userName: string;
  restaurantName: string;
  dealTitle: string;
  confirmationId: string;
  expiryDate: Date;
  dealDescription: string;
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Playful Bites Boston <onboarding@resend.dev>',
      to: [emailData.to],
      subject: `Your Deal Confirmation - ${emailData.dealTitle}`,
      react: DealClaimEmail({
        userName: emailData.userName,
        restaurantName: emailData.restaurantName,
        dealTitle: emailData.dealTitle,
        confirmationId: emailData.confirmationId,
        expiryDate: emailData.expiryDate,
        dealDescription: emailData.dealDescription,
      }),
      text: `Hi ${emailData.userName}, your deal "${emailData.dealTitle}" at ${emailData.restaurantName} has been confirmed! Confirmation ID: ${emailData.confirmationId}`,
    });

    if (error) {
      console.error('Resend API Error:', error);
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
};