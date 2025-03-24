import { useSuccessModal } from '@/components/SuccessModal';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';

const formSchema = z.object({
  date: z.date({
    required_error: 'Please select a date to claim your deal',
  }),
});

interface ClaimDealFormProps {
  dealTitle: string;
  onSuccess: (claimData: {
    selectedDate: Date;
    confirmationId: string;
    user_id: string;
    email: string;
    offerPerCustomerLimit:number,
    restaurant_name: string;
    restaurant_id: string;
    deal_title: string;
    deal_description: string;
    expiry_date: Date;
    claimed_at: Date;
  }) => Promise<void>;
  restaurantName: string;
  restaurantId: string;
  dealDescription: string;
  user_id: string;
  userEmail: string;
  offerPerCustomerLimit:number
}

export const ClaimDealForm: React.FC<ClaimDealFormProps> = ({
  dealTitle,
  onSuccess,
  restaurantName,
  restaurantId,
  dealDescription,
  user_id,
  userEmail,
  offerPerCustomerLimit
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const confirmationId = `${restaurantName.substring(0, 5).toUpperCase()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    const claimData = {
      selectedDate: values.date,
      confirmationId,
      user_id,
      email: userEmail,
      restaurant_name: restaurantName,
      restaurant_id: restaurantId,
      deal_title: dealTitle,
      deal_description: dealDescription,
      expiry_date: values.date,
      offerPerCustomerLimit:offerPerCustomerLimit,
      claimed_at: new Date()
    };

    try {
      // Call onSuccess with all claim data
      await onSuccess({
        ...claimData,
        offerPerCustomerLimit:offerPerCustomerLimit
      });
    } catch (error) {
      console.error('Error claiming deal:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select a date to claim your deal</FormLabel>
              <FormControl>
                <div className="border rounded-md p-3 flex justify-center items-center">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                    className="mx-auto"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-600 font-medium mt-2" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Claim Deal'
          )}
        </Button>
      </form>
    </Form>
  );
};
