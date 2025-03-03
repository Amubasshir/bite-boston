import { supabase } from './supabase';

export const sendDealConfirmationEmail = async ({
  userEmail,
  userName,
  restaurantName,
  dealTitle,
  confirmationId,
  expiryDate,
  dealDescription,
}: {
  userEmail: string;
  userName: string;
  restaurantName: string;
  dealTitle: string;
  confirmationId: string;
  expiryDate: Date;
  dealDescription: string;
}) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-deal-email', {
      body: {
        userEmail,
        userName,
        restaurantName,
        dealTitle,
        confirmationId,
        expiryDate: expiryDate.toISOString(),
        dealDescription,
      },
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};