import { ClaimDealForm } from '@/components/ClaimDealForm';
import { Badge } from '@/components/ui/badge';
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
import { Link, useNavigate } from 'react-router-dom';

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

  neighborhood: string;
  deals: Array<{
    dealTitle: string;
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
  duration,
  deals,
  onClaimDeal,
}: RestaurantCardProps) => {
  const dealsCount = deals?.length || 0;
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get the current deal to display if deals array exists
  const currentDeal =
    deals && deals.length > 0 ? deals[currentDealIndex] : null;

  // Use the current deal's title and description if available, otherwise use the props
  const displayDealTitle = currentDeal?.dealTitle || dealText;
  const displayDealDescription =
    currentDeal?.dealDescription || dealDescription;

  const nextDeal = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the slider buttons
    if (isTransitioning || !deals || deals.length <= 1) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentDealIndex((prev) => (prev + 1) % deals.length);
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

  const handleClaimButtonClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to restaurant details page

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
      <Link to={`/restaurant/${id}`} className="block h-full w-full">
        <Card className="overflow-hidden h-full transition-transform hover:scale-[1.02] hover:shadow-lg">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-xl mb-1">{name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{location}</span>
                  <span className="text-primary">★</span>
                  <span className="text-sm font-medium">{rating}</span>
                </div>
              </div>
              <Badge variant="outline">{priceRange}</Badge>
            </div>

            <div className="space-y-4">
              <div className="relative">
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

                <div className="bg-accent-purple rounded-lg p-4">
                  {dealsCount > 1 && (
                    <Badge className="absolute right-4 top-0 -translate-y-1/2 bg-primary text-white font-bold px-3 py-1 rounded-full shadow-md">
                      {dealsCount} deals
                    </Badge>
                  )}

                  <div
                    className={`transition-opacity duration-200 ${
                      isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <h4 className="font-medium text-lg text-primary mb-1">
                      {displayDealTitle}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {displayDealDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Claim Deal Button - Now with onClick handler to open dialog */}
              <Button
                className="w-full"
                size="lg"
                onClick={handleClaimButtonClick}
              >
                Claim this Deal
              </Button>
            </div>
          </div>
        </Card>
      </Link>

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
