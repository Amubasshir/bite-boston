import { ClaimDealForm } from '@/components/ClaimDealForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Deal {
  dealTitle: string;
  dealDescription: string;
  potentialSavings: {
    average: string;
    upTo: string;
  };
}

interface DealSectionProps {
  deals: Deal[];
  duration: string;
  restaurant?: {
    name: string;
    id: string;
    dealText: string;
    fullDescription: string;
  };
}

export function DealSection({ deals, duration,restaurant }: DealSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentDeal = deals[currentDealIndex];
  const totalDeals = deals.length;
const data ={
      name: restaurant.name,
      id: restaurant.id,
      dealData: {
        dealTitle: restaurant.dealText,
        description: restaurant.fullDescription,
        confirmationId: `${restaurant.name.substring(0, 5).toUpperCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        expiry_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
}
 

const handleDealClaim = async (restaurantData:any) => {
  try {
    if (!user) {
      toast.error('Please login to claim deals');
      navigate('/login');
      return;
    }
    
    console.log(restaurantData,"restaurantData")
    // setDialogOpen(false)
    // return
    const { error: dbError } = await supabase.from('claimed_deals').insert({
      user_id: user.id,
      email: user.email,
      restaurant_name: restaurantData.restaurant_name,
      restaurant_id: restaurantData.restaurant_id,
      deal_title: restaurantData.deal_title,
      deal_description: restaurantData.deal_description,
      confirmation_id: restaurantData.confirmationId,
      expiry_date: restaurantData.expiry_date,
      claimed_at: restaurantData.claimed_at,
    });

    if (dbError) {
      setDialogOpen(false)
      throw dbError
    };

    // Replace the Resend email sending with API call
    try {
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-deal-email', {
        body: {
          userEmail: user.email,
          userName: user.user_metadata?.full_name || 'Valued Customer',
          restaurantName: restaurantData.restaurant_name,
          dealTitle: restaurantData.deal_title,
          confirmationId: restaurantData.confirmationId,
          expiryDate: restaurantData.expiry_date,
          dealDescription: restaurantData.deal_description
        },
      });

      if (emailError) {
        throw emailError;
      }

      toast.success(`Deal claimed! Confirmation sent to ${user.email}`);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      toast.warning('Deal claimed but email delivery failed. Please check your account.');
    }

  } catch (error) {
    console.error('Error claiming deal:', error);
    toast.error('Failed to claim deal. Please try again.');
  }finally {
    setDialogOpen(false);
  }
};


  const handleClaimButtonClick = () => {
    if (!user) {
      // User is not logged in, redirect to login page without return URL
      navigate('/login');
      return;
    }

    // User is logged in, open the dialog
    setDialogOpen(true);
  };

  const nextDeal = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentDealIndex((prev) => (prev + 1) % totalDeals);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  const prevDeal = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentDealIndex((prev) => (prev - 1 + totalDeals) % totalDeals);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  return (
    <div className="relative group flex items-center">
      {totalDeals > 1 && (
        <button
          onClick={prevDeal}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-20"
          aria-label="Previous deal"
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-6 w-6 text-primary" />
        </button>
      )}

      <div className="bg-accent-purple rounded-xl p-6 relative w-full">
        {/* Deal count badge */}
        {totalDeals > 1 && (
          <Badge className="absolute right-6 top-0 -translate-y-1/2 bg-primary text-white font-bold px-3 py-1 rounded-full shadow-md">
            {totalDeals} deals
          </Badge>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-primary">Special Deal</h2>
        </div>

        <div className="relative">
          <div
            className={`px-4 transition-opacity duration-200 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <h3 className="font-semibold mb-4">{currentDeal.dealTitle}</h3>
            <p className="text-gray-700 mb-6">{currentDeal.dealDescription}</p>

            <div className="bg-white/50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold mb-2">Potential Savings</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Average</span>
                  <span>{currentDeal.potentialSavings.average}</span>
                </div>
                <div className="flex justify-between">
                  <span>Up to</span>
                  <span>{currentDeal.potentialSavings.upTo}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleClaimButtonClick}
            >
              Claim this Deal
            </Button>
          </div>
        </div>
      </div>

      {totalDeals > 1 && (
        <button
          onClick={nextDeal}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-20"
          aria-label="Next deal"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-6 w-6 text-primary" />
        </button>
      )}

      {/* Only render the dialog if user is authenticated */}
      {user && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="z-50">
            <DialogHeader>
              <DialogTitle>Select a date for your deal</DialogTitle>
            </DialogHeader>
            <ClaimDealForm
             onSuccess={handleDealClaim}
             dealTitle={data.dealData.dealTitle}
             restaurantName={data.name}
             restaurantId={data.id}
             dealDescription={data.dealData.description}
             user_id={user.id}
             userEmail={user.email}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
