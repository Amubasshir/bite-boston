import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      // Here you would make an API call to subscribe the user
      toast.error('Failed to subscribe. Please try again later.');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
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
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          className="bg-primary hover:bg-accent-purple/90 text-black font-medium rounded-lg h-11 px-6"
        >
          Subscribe to Deals
        </Button>
      </div>
      <p className="text-gray-500 text-base">
        By subscribing, you agree to receive our newsletters and accept our
        privacy policy.
      </p>
    </div>
  );
};
