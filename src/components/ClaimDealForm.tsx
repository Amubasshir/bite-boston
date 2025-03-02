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
}

export const ClaimDealForm: React.FC<ClaimDealFormProps> = ({
  dealTitle,
  onSuccess,
  restaurantName,
  restaurantId,
  dealDescription,
  user_id,
  userEmail,
}) => {
  const { showSuccessModal } = useSuccessModal();
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
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
      claimed_at: new Date()
    };

    try {
      // Call onSuccess with all claim data
      await onSuccess(claimData);
      // Show success modal after successful claim
      showSuccessModal(claimData);
    } catch (error) {
      console.error('Error claiming deal:', error);
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
        <Button type="submit" className="w-full">
          Claim Deal
        </Button>
      </form>
    </Form>
  );
};
