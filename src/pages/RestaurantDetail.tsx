import { AboutSection } from '@/components/restaurant/AboutSection';
import { ContactInfo } from '@/components/restaurant/ContactInfo';
import { DealSection } from '@/components/restaurant/DealSection';
import { HoursSection } from '@/components/restaurant/HoursSection';
import { MenuHighlights } from '@/components/restaurant/MenuHighlights';
import { RestaurantHero } from '@/components/restaurant/RestaurantHero';
import { Button } from '@/components/ui/button';
import { RESTAURANTS_DATA } from '@/data/restaurants';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// Restaurant data is now imported from data/restaurants.ts

const RestaurantDetail = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const restaurant = RESTAURANTS_DATA.find((r) => r.id === restaurantId);

  // Add this useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Restaurant Not Found</h1>
        <p className="mb-8">
          We couldn't find the restaurant you're looking for.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        <div className="absolute z-10 top-4 left-4">
          <Button
            variant="outline"
            className="px-6 py-2 rounded-full text-base font-medium border border-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg bg-white/90 backdrop-blur-sm flex items-center gap-2"
            onClick={() => window.location.href = '/'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Deals
          </Button>
        </div>
        <RestaurantHero
          name={restaurant.name}
          image={restaurant.image}
          cuisine={restaurant.cuisine}
          rating={restaurant.rating}
          priceRange={restaurant.priceRange}
        />
      </div>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-accent-purple/5 rounded-2xl -z-10 blur-xl opacity-30"></div>
          <div className="lg:col-span-2">
            <DealSection
              restaurant={restaurant}
              deals={restaurant.deals}
              duration="1 week" /* Using a default value for duration */
            />
            <AboutSection description={restaurant.fullDescription} />
            <MenuHighlights items={restaurant.menuHighlights} />
          </div>
          <div className="space-y-8">
            <HoursSection hours={restaurant.openingHours} />
            <ContactInfo
              address={restaurant.address}
              phoneNumber={restaurant.phoneNumber}
              website={restaurant.website}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
