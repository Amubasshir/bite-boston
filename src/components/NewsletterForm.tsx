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

  /*
  return (
    <div className="mt-16 mb-16 relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 to-accent-purple/5 rounded-xl blur-xl opacity-70 -z-10"></div>
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
          <path d="M2 6L8.91302 9.91697C11.4616 11.361 11.9964 11.5828 12.5736 11.5828C13.1508 11.5828 13.6856 11.361 16.2341 9.91697L23 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 17.5C22 18.3284 21.3284 19 20.5 19H3.5C2.67157 19 2 18.3284 2 17.5V6.5C2 5.67157 2.67157 5 3.5 5H20.5C21.3284 5 22 5.67157 22 6.5V17.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <h2 className="text-[32px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-purple">Get the Latest Deals</h2>
      </div>
      <p className="text-gray-600 text-lg mb-6 ml-9">
        Join our newsletter and never miss out on exclusive restaurant deals in
        Boston.
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-4 mb-3 ml-9">
        <div className="relative w-full max-w-[550px]">
          <div className="absolute left-3 top-3 text-gray-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
            </svg>
          </div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 w-full h-12 rounded-full border border-gray-200 pl-10 pr-4 text-base shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            disabled={isSubmitting}
          />
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full h-12 px-8 transform hover:translate-y-[-2px] transition-all duration-300 shadow-sm hover:shadow w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe to Deals'}
        </Button>
      </div>
      <p className="text-gray-500 text-sm ml-9">
        By subscribing, you agree to receive our newsletters and accept our
        privacy policy.
      </p>
      </div>
    </div>
  );
};
*/
