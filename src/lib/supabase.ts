import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please check your .env file.'
  );
}

// Create Supabase client with standard configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export const sendDealConfirmationEmail = async (emailData: {
  userEmail: string;
  userName: string;
  restaurantName: string;
  dealTitle: string;
  confirmationId: string;
  expiryDate: Date;
  dealDescription: string;
}) => {
  const { data, error } = await supabase.functions.invoke('send-deal-email', {
    body: emailData,
  });

  if (error) throw error;
  return data;
};
