import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface RestaurantHeroProps {
  name: string;
  image: string;
  cuisine: string;
  priceRange: string;
  rating: number;
}

export function RestaurantHero({ name, image, cuisine, priceRange, rating }: RestaurantHeroProps) {
  return (
    <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">{name}</h1>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-white/20">
            {cuisine}
          </Badge>
          <Badge variant="secondary" className="bg-white/20">
            {priceRange}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}