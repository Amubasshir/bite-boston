// import { NewsletterForm } from '@/components/NewsletterForm';
import { RestaurantCard } from '@/components/RestaurantCard';
import RestaurantMap from '@/components/RestaurantMap';
import ViewToggle from '@/components/ViewToggle';
import EnvDebug from '@/components/EnvDebug';
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeView, setActiveView] = useState<'list' | 'map'>('list');

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

    // Add scroll event listener for scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCloseWelcomeModal = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setShowWelcomeModal(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent-purple/10 relative">
      {/* Floating scroll-to-top button */}
      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
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
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm py-4 shadow-sm rounded-b-xl border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo.jpg"
                  alt="Playful Bites Boston Logo"
                  className="h-16 w-auto object-contain rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                />
              </div>
              <div className="flex gap-4">
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium bg-primary/5 text-primary px-3 py-1.5 rounded-full">
                      Hello, {userName}
                    </span>
                    <Button
                      variant="outline"
                      className="px-6 py-2 rounded-full text-base font-medium border border-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow"
                      onClick={signOut}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="px-6 py-2 rounded-full text-base font-medium border border-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow"
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>
                    <Button
                      variant="default"
                      className="px-6 py-2 rounded-full text-base font-medium bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md"
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-purple">Unbeatable Food Deals</span> in Cambridge
            <div className="mt-4 text-3xl md:text-4xl">BOGO, Free Apps, and More</div>
          </h1>
          <div className="max-w-3xl">
            <p className="text-xl font-medium text-gray-800 mb-8 leading-relaxed">
              Harvard Business School ECs went door-to-door to secure exclusive
              deals for Harvard grad students.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex items-start space-x-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Find an unbeatable offer</h3>
                  <p className="text-gray-600 text-sm">BOGO, free apps, and more</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex items-start space-x-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Create an account</h3>
                  <p className="text-gray-600 text-sm">Sign up in seconds</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex items-start space-x-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎟️</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Redeem your offer</h3>
                  <p className="text-gray-600 text-sm">Quick and hassle-free</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex items-start space-x-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Savor a delicious meal</h3>
                  <p className="text-gray-600 text-sm">At the restaurant</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-4 my-8 text-center">
              <div className="inline-block bg-gradient-to-r from-primary/5 to-accent-purple/5 px-8 py-4 rounded-xl">
                <p className="text-primary font-medium">
                  <span className="text-xl mr-2">🙏</span>
                  <span>For the love of god please try us out so we can upgrade this website</span>
                </p>
              </div>
              
              <div className="flex items-center text-gray-600 text-sm">
                <span className="text-xl mr-2">❓</span>
                <span>
                  Need help? Call our unpaid intern Alex Mazzaferro at{' '}
                  <a
                    href="tel:815-404-1738"
                    className="text-primary hover:underline font-medium"
                  >
                    (815) 404-1738
                  </a>
                </span>
              </div>
            </div>
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
        {/* Newsletter Section - Temporarily hidden */}
        {/* <NewsletterForm /> */}
        
        {/* View Toggle Tabs */}
        <ViewToggle activeView={activeView} onViewChange={setActiveView} />
        
        {/* Restaurant Deals Grid or Map */}
        <div className="relative py-8">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-accent-purple/10 to-transparent -z-10"></div>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="text-primary">🍽️</span> Available Restaurant Deals
            <span className="ml-2 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">{filteredRestaurants.length} restaurants</span>
          </h2>
          
          {activeView === 'list' ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
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
                duration="1 week" /* Adding the required duration prop */
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
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500 bg-white/50 rounded-xl shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <div className="text-xl font-medium mb-2">No restaurants found</div>
                <p>No restaurants found matching your search criteria.</p>
              </div>
            )}
          </div>
          ) : (
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <RestaurantMap restaurants={filteredRestaurants} />
            </div>
          )}
        </div>
      </div>
      {/* Temporarily adding EnvDebug component to diagnose environment variable issues */}
      {process.env.NODE_ENV !== 'production' && <EnvDebug />}
    </div>
  );
};

export default Index;
