import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email) {
      toast.error('Please enter your email address');
      setIsSubmitting(false);
      return;
    }

    try {
      // Check if email already exists in newsletter_subscriptions
      const { data: existingSubscriber, error: checkError } = await supabase
        .from('newsletter_subscriptions')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking subscriber:', checkError);
        toast.error('An error occurred. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // If already subscribed, show error
      if (existingSubscriber) {
        toast.error('This email is already subscribed to our newsletter.');
        setIsSubmitting(false);
        return;
      }

      // Create new subscriber
      const { error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email,
          created_at: new Date().toISOString()
        });

      if (insertError) {
        console.error('Error adding subscriber:', insertError);
        toast.error('Failed to subscribe. Please try again later.');
        setIsSubmitting(false);
        return;
      }

      // Success
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 mb-16">
      <h2 className="text-[32px] font-bold mb-3">Get the Latest Deals</h2>
      <p className="text-gray-600 text-lg mb-6">
        Join our newsletter and never miss out on exclusive restaurant deals in
        Boston.
      </p>
      <div className="flex items-start gap-4 mb-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 max-w-[550px] h-11 rounded-lg border border-gray-200 px-4 text-base"
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          className="bg-primary hover:bg-accent-purple/90 text-black font-medium rounded-lg h-11 px-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe to Deals'}
        </Button>
      </div>
      <p className="text-gray-500 text-base">
        By subscribing, you agree to receive our newsletters and accept our
        privacy policy.
      </p>
    </div>
  );
};
