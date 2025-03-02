import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useNewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Check if email already exists using maybeSingle()
      const { data: existingSubscription, error: checkError } = await supabase
        .from('newsletter_subscriptions')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (checkError) {
        throw new Error('Error checking subscription status');
      }

      if (existingSubscription) {
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "default",
        });
        setEmail("");
        return;
      }

      // Insert new subscription
      const { error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (insertError) {
        throw insertError;
      }

      // Send confirmation email
      const { error: functionError } = await supabase.functions.invoke(
        'send-confirmation',
        {
          body: { email },
        }
      );

      if (functionError) {
        console.error("Error sending confirmation email:", functionError);
        throw new Error("Failed to send confirmation email");
      }

      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter. Check your email for confirmation!",
      });
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    isSubmitting,
    handleSubscribe,
  };
};