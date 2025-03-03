import { AboutSection } from '@/components/restaurant/AboutSection';
import { ContactInfo } from '@/components/restaurant/ContactInfo';
import { DealSection } from '@/components/restaurant/DealSection';
import { HoursSection } from '@/components/restaurant/HoursSection';
import { MenuHighlights } from '@/components/restaurant/MenuHighlights';
import { RestaurantHero } from '@/components/restaurant/RestaurantHero';
import { Button } from '@/components/ui/button';
import { RESTAURANTS_DATA } from '@/data/restaurants';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

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
            className="px-6 py-2 rounded-lg text-base font-medium border-2 border-primary hover:bg-primary hover:text-white transition-colors bg-white"
            onClick={() => window.location.href = '/'}
          >
            Go Home
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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DealSection
            restaurant={restaurant}
              deals={restaurant.deals}
              duration={restaurant.duration}
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
