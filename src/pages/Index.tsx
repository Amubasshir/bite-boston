import { NewsletterForm } from '@/components/NewsletterForm';
import { RestaurantCard } from '@/components/RestaurantCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { FEATURED_RESTAURANTS } from '@/data/restaurants';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Add these imports at the top
import { useSuccessModal } from '@/components/SuccessModal';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// const NEIGHBORHOODS = [
//   'Back Bay',
//   'North End',
//   'Seaport',
//   'Cambridge',
//   'Fenway',
//   'Harvard Square',
//   'Allston',
// ];

// const CATEGORIES = ['All', 'Deals', 'Popular', 'New', 'Fine Dining'];

// Update the interface to match the data structure
interface DealClaimData {
  dealTitle: string;
  description: string;
  confirmationId: string;
  offerPerCustomerLimit: number;
  expiry_date: Date; // Changed from date to expiry_date to match usage
}

interface RestaurantDealData {
  name: string;
  id: string;
  dealData: DealClaimData;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [userName, setUserName] = useState<string>('');
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const { showSuccessModal, hideSuccessModal } = useSuccessModal();
  const [currentDealIndex, setCurrentDealIndex] = useState(0);

  useEffect(() => {
    if (user) {
      // Try to get the user's name from different possible locations
      const fullName = user.user_metadata?.full_name;
      const email = user.email;

      if (fullName) {
        setUserName(fullName);
      } else if (email) {
        // If no full name, use the part of the email before the @ symbol
        setUserName(email.split('@')[0]);
      } else {
        setUserName('User');
      }
    }
  }, [user]);

  const filteredRestaurants = useMemo(() => {
    let filtered = [...FEATURED_RESTAURANTS];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((restaurant) => {
        // Create a searchable text that includes all relevant fields
        const searchableText = [
          restaurant.name,
          restaurant.cuisine,
          restaurant.location,
          restaurant.dealText,
          restaurant.neighborhood,
          restaurant.dealDescription,
          restaurant.deals?.map((deal) => deal.dealTitle).join(' '),
          restaurant.deals?.map((deal) => deal.dealDescription).join(' '),
          restaurant.menuHighlights?.map((item) => item.name).join(' '),
          restaurant.menuHighlights?.map((item) => item.description).join(' '),
        ]
          .join(' ')
          .toLowerCase();

        // Split search query into words for better matching
        const searchTerms = query.split(' ').filter((term) => term.length > 0);

        // Return true if ALL search terms are found in the searchable text
        return searchTerms.every((term) => searchableText.includes(term));
      });
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((restaurant) => {
        switch (selectedCategory) {
          case 'Deals':
            // Check if restaurant has any active deals
            return restaurant.deals && restaurant.deals.length > 0;
          case 'Popular':
            return restaurant.rating >= 4.3; // Adjusted threshold
          case 'New':
            // Assuming restaurants added in the last 30 days are "new"
            // You might want to add a dateAdded field to your restaurant data
            return true;
          case 'Fine Dining':
            return (
              restaurant.priceRange === '$$$' ||
              restaurant.priceRange === '$$$$'
            );
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleDealClaim = async (restaurantData: RestaurantDealData) => {
    try {
      if (!user) {
        toast.error('Please login to claim deals');
        navigate('/login');
        return;
      }
      // Check if user has reached the claim limit for this restaurant
      const { data: claimedDealsCount, error: countError } = await supabase
        .from('claimed_deals')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .eq('restaurant_id', restaurantData.id);

      if (countError) throw countError;
      console.log(restaurantData, 'restaurantData');
      if (
        claimedDealsCount &&
        claimedDealsCount.length >=
          restaurantData?.dealData?.offerPerCustomerLimit &&
        restaurantData.dealData.offerPerCustomerLimit
      ) {
        toast.error(
          `You have reached the maximum limit of ${restaurantData?.dealData?.offerPerCustomerLimit} claims for this restaurant's deals`
        );
        hideSuccessModal();
        return;
      }

      // First save to database
      const { error: dbError } = await supabase.from('claimed_deals').insert({
        user_id: user.id,
        email: user.email,
        restaurant_name: restaurantData.name,
        restaurant_id: restaurantData.id,
        deal_title: restaurantData.dealData.dealTitle,
        deal_description: restaurantData.dealData.description,
        confirmation_id: restaurantData.dealData.confirmationId,
        expiry_date: restaurantData.dealData.expiry_date,
        claimed_at: new Date(),
      });

      if (dbError) throw dbError;

      // Replace the Resend email sending with API call
      try {
        const { data: emailData, error: emailError } =
          await supabase.functions.invoke('send-deal-email', {
            body: {
              userEmail: user.email,
              userName: user.user_metadata?.full_name || 'Valued Customer',
              restaurantName: restaurantData.name,
              dealTitle: restaurantData.dealData.dealTitle,
              confirmationId: restaurantData.dealData.confirmationId,
              expiryDate: restaurantData.dealData.expiry_date,
              dealDescription: restaurantData.dealData.description,
            },
          });

        if (emailError) {
          throw emailError;
        }

        // Show success modal with the deal data
        showSuccessModal({
          selectedDate: new Date(),
          confirmationId: restaurantData.dealData.confirmationId,
          user_id: user.id,
          email: user.email,
          restaurant_name: restaurantData.name,
          restaurant_id: restaurantData.id,
          deal_title: restaurantData.dealData.dealTitle,
          deal_description: restaurantData.dealData.description,
          expiry_date: restaurantData.dealData.expiry_date,
          claimed_at: new Date(),
        });

        toast.success(`Deal claimed! Confirmation sent to ${user.email}`);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        toast.warning(
          'Deal claimed but email delivery failed. Please check your account.'
        );
      }
    } catch (error) {
      console.error('Error claiming deal:', error);
      toast.error('Failed to claim deal. Please try again.');
    }
  };

  useEffect(() => {
    // Check if user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setShowWelcomeModal(false);
    }
  }, []);

  const handleCloseWelcomeModal = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setShowWelcomeModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent-purple/10">
      <Dialog open={showWelcomeModal} onOpenChange={handleCloseWelcomeModal}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              🍽️ Discover Cambridge Restaurants for Up To Half the Price!
            </DialogTitle>
            <DialogDescription className="space-y-4">
              <p className="text-center mt-4">
                Enjoy 2-for-1 meals, free appetizers, desserts, and more at some
                of the best restaurants in town.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>
                    10+ unique restaurants and counting – with new spots added
                    weekly!
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>
                    Over $200 worth of restaurant deals for just $4.99/month
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Exclusive offers you won't find anywhere else!</span>
                </li>
              </ul>
              <p className="text-center font-medium">
                What are you waiting for? Start exploring now!
              </p>
              <div className="flex justify-center mt-4">
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleCloseWelcomeModal}
                >
                  Explore Deals
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div
        className={`container mx-auto px-4 py-8 transition-all duration-300 ${showWelcomeModal ? 'blur-sm' : ''}`}
      >
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm py-4 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div>
                <img
                  src="/logo.jpg"
                  alt="Playful Bites Boston Logo"
                  className="h-16 w-auto"
                />
              </div>
              <div className="flex gap-4">
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      Hello, {userName}
                    </span>
                    <Button
                      variant="outline"
                      className="px-6 py-2 rounded-lg text-base font-medium border-2 border-primary hover:bg-primary hover:text-white transition-colors"
                      onClick={signOut}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="px-6 py-2 rounded-lg text-base font-medium border-2 border-primary hover:bg-primary hover:text-white transition-colors"
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>
                    <Button
                      variant="default"
                      className="px-6 py-2 rounded-lg text-base font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
                      onClick={() => navigate('/signup')}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Unbeatable Food Deals in Cambridge
            <div className="mt-4">BOGO, Free Apps, and More</div>
          </h1>
          <div className="space-y-4 max-w-3xl">
            <p className="text-xl font-semibold">
              Harvard Business School ECs went door-to-door too secure exclusive
              deals for Harvard grad students.
            </p>

            <ul className="space-y-2 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-xl">🔍</span>
                <span>
                  Find an unbeatable offer (BOGO, free apps, and more)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xl">📝</span>
                <span>Create an account in seconds</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xl">🎟️</span>
                <span>Redeem your offer</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xl">🍽️</span>
                <span>Savor a delicious meal at the restaurant</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xl">🙏</span>
                <span>
                  for the love of god please try us out so we can upgrade this
                  website
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xl">❓</span>
                <span>
                  Need help? Call our unpaid intern Alex Mazzaferro at{' '}
                  <a
                    href="tel:815-404-1738"
                    className="text-primary hover:underline font-medium"
                  >
                    (815) 404-1738
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="flex gap-3 overflow-x-auto py-6 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant={category === selectedCategory ? 'default' : 'secondary'}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                category === selectedCategory
                  ? 'bg-primary/90 text-black font-medium shadow-sm hover:bg-primary'
                  : 'hover:bg-primary'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div> */}
        {/* Neighborhoods */}
        {/* <div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
          {NEIGHBORHOODS.map((neighborhood) => (
            <Badge
              key={neighborhood}
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-accent-purple/20 transition-colors"
            >
              {neighborhood}
            </Badge>
          ))}
        </div> */}
        {/* Newsletter Section */}
        <NewsletterForm />
        {/* Restaurant Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant, i) => (
              <RestaurantCard
                offerPerCustomerLimit={Number(
                  restaurant?.deals[currentDealIndex]?.offerPerCustomerLimit
                )}
                key={i}
                {...restaurant}
                currentDealIndex={currentDealIndex}
                setCurrentDealIndex={setCurrentDealIndex}
                onClaimDeal={() =>
                  handleDealClaim({
                    name: restaurant.name,
                    id: restaurant.id,
                    dealData: {
                      dealTitle: restaurant.deals[currentDealIndex].dealTitle,
                      offerPerCustomerLimit: Number(
                        restaurant?.deals[currentDealIndex]
                          ?.offerPerCustomerLimit
                      ),
                      description:
                        restaurant.deals[currentDealIndex].dealDescription,
                      confirmationId: `${restaurant.name.substring(0, 5).toUpperCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
                      expiry_date: new Date(
                        Date.now() + 7 * 24 * 60 * 60 * 1000
                      ),
                    },
                  })
                }
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No restaurants found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
