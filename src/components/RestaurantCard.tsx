import React from 'react';
import { ClaimDealForm } from '@/components/ClaimDealForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Deal {
  dealTitle: string;
  dealDescription: string;
  potentialSavings: {
    average: string;
    upTo: string;
  };
}

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  priceRange: string;
  cuisine: string;
  dealText: string;
  dealDescription: string;
  offerPerCustomerLimit: number,
  neighborhood: string;
  currentDealIndex: number,
  setCurrentDealIndex: any,
  duration: string;
  deals: Array<{
    dealTitle: string;
    currentDealIndex?: number,
    setCurrentDealIndex?: any,
    offerPerCustomerLimit: number;
    dealDescription: string;
    potentialSavings: {
      average: string;
      upTo: string;
    };
  }>;
  fullDescription: string;
  // Add the onClaimDeal prop type
  onClaimDeal: (claimData: {
    selectedDate: Date;
    confirmationId: string;
    user_id: string;
    email: string;
    offerPerCustomerLimit: number,
    restaurant_name: string;
    restaurant_id: string;
    deal_title: string;
    deal_description: string;
    expiry_date: Date;
    claimed_at: Date;
  }) => Promise<void>;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  image,
  location,
  cuisine,
  rating,
  priceRange,
  dealText,
  dealDescription,
  currentDealIndex,
  setCurrentDealIndex,
  duration,
  deals,
  offerPerCustomerLimit,
  onClaimDeal,
}: RestaurantCardProps) => {
  const dealsCount = deals?.length || 0;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get the current deal to display if deals array exists
  const currentDeal =
    deals && deals.length > 0 ? deals[Number(currentDealIndex) || 0] : null;

  // Use the current deal's title and description if available, otherwise use the props
  const displayDealTitle = currentDeal?.dealTitle || dealText;
  const displayDealDescription =
    currentDeal?.dealDescription || dealDescription;

  const nextDeal = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the slider buttons
    if (isTransitioning || !deals || deals.length <= 1) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentDealIndex((Number(currentDealIndex) + 1) % deals.length);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  const prevDeal = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the slider buttons
    if (isTransitioning || !deals || deals.length <= 1) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentDealIndex((prev) => (prev - 1 + deals.length) % deals.length);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  const handleClaimButtonClick = () => {
    // TEMPORARY: Disable deal redemption for Source restaurant
    if (name === "Source") {
      // Deal temporarily unavailable for Source
      alert("This deal will be available on Tuesday");
      return;
    }

    if (user) {
      // User is logged in, show the claim dialog
      setDialogOpen(true);
    } else {
      // User is not logged in, redirect to login page without return URL
      navigate('/login');
    }
  };

  const handleSuccess = async (claimData: any) => {
    try {
      await onClaimDeal(claimData);
      setDialogOpen(false);
    } catch (error) {
      console.error('Error in handleSuccess:', error);
    }
  };

  return (
    <div className="relative h-full">
      <div className="block h-full w-full">
        <Card className="overflow-hidden h-full transition-all duration-300 hover:scale-[1.03] hover:shadow-xl rounded-xl border-0 shadow-md bg-white">
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-white/80 backdrop-blur-sm shadow-sm font-medium inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs">{priceRange}</div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden group cursor-pointer" onClick={() => {
            navigate(`/restaurant/${id}`);
          }}>
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between mb-4 cursor-pointer" onClick={() => {
              navigate(`/restaurant/${id}`);
            }}>
              <div>
                <h3 className="font-bold text-xl mb-1 line-clamp-1">{name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{location}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span className="text-sm font-medium">{rating}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary font-medium rounded-full">{cuisine}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative" >
                {/* Left arrow - positioned to match the screenshot */}
                {dealsCount > 1 && (
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-50">
                    <button
                      onClick={prevDeal}
                      className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Previous deal"
                      disabled={isTransitioning}
                    >
                      <ChevronLeft className="h-5 w-5 text-primary" />
                    </button>
                  </div>
                )}

                {/* Right arrow - positioned to match the screenshot */}
                {dealsCount > 1 && (
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-50">
                    <button
                      onClick={nextDeal}
                      className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Next deal"
                      disabled={isTransitioning}
                    >
                      <ChevronRight className="h-5 w-5 text-primary" />
                    </button>
                  </div>
                )}

                <div className="bg-gradient-to-r from-accent-purple/30 to-primary/5 rounded-xl p-4 shadow-sm min-h-[120px] flex flex-col justify-between">
                  {dealsCount > 1 && (
                    <div className="absolute right-4 top-0 -translate-y-1/2 bg-primary text-white font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                      {/* TEMPORARY: Change deals text for Source restaurant */}
                      {name === "Source" ? "Coming Tues." : `${dealsCount} deals`}
                    </div>
                  )}

                  <div
                    className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                      }`}
                  >
                    <h4 className="font-semibold text-lg text-primary mb-2">
                      {displayDealTitle}
                    </h4>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {displayDealDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Claim Deal Button - Now with onClick handler to open dialog */}
              <Button
                type='button'
                className="w-full group relative overflow-hidden transition-all duration-300 bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
                size="lg"
                onClick={() => handleClaimButtonClick()}
              >
                Claim this Deal
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L21 12L13.5 19.5M3 12H20.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Claim Deal Dialog - Only shown for authenticated users */}
      {user && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="z-50">
            <DialogHeader>
              <DialogTitle>Select a date for your deal</DialogTitle>
            </DialogHeader>
            <ClaimDealForm
              onSuccess={handleSuccess}
              dealTitle={displayDealTitle}
              restaurantName={name}
              restaurantId={id}
              offerPerCustomerLimit={currentDeal?.offerPerCustomerLimit || 0}
              dealDescription={displayDealDescription}
              user_id={user.id}
              userEmail={user.email}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Remove this function as it's not needed
// function onClaimDeal(selectedDate: Date) {
//   throw new Error('Function not implemented.');
// }
