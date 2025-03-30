import React, { useEffect, useRef, useState } from 'react';
import { Restaurant } from '@/data/restaurants';
import { useNavigate } from 'react-router-dom';

interface RestaurantMapProps {
  restaurants: Restaurant[];
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({ restaurants }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // This function will be called after the Google Maps script loads
  window.initMap = () => {
    if (mapRef.current && !map) {
      try {
        // Default to Boston/Cambridge area
        const bostonLatLng = { lat: 42.3601, lng: -71.0589 };
        
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: bostonLatLng,
          zoom: 13,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });
        
        setMap(mapInstance);
        setInfoWindow(new window.google.maps.InfoWindow());
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize Google Maps');
        setIsLoading(false);
      }
    }
  };

  // Load Google Maps script
  useEffect(() => {
    setIsLoading(true);
    
    // Check if Google Maps script is already loaded
    if (!window.google) {
      const script = document.createElement('script');
      
      // Always use environment variable for API key
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      // Log for debugging
      console.log('Environment Variables Status:', {
        'VITE_GOOGLE_MAPS_API_KEY': apiKey ? 'Found ✓' : 'Missing ✗',
        'All env vars': Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')).length
      });
      
      // Safety check - if API key is missing, show error
      if (!apiKey) {
        setError('Google Maps API Key is missing in .env file');
        setIsLoading(false);
        return;
      }
      
      // Always read from environment variable
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=places`;
      script.async = true;
      script.defer = true;
      
      // Set a timeout for loading
      const timeoutId = setTimeout(() => {
        setError('Google Maps took too long to load. Please check your API key and internet connection.');
        setIsLoading(false);
      }, 10000);
      
      script.onerror = () => {
        clearTimeout(timeoutId);
        setError('Failed to load Google Maps API - Check your API key and restrictions');
        setIsLoading(false);
        console.error('Google Maps script failed to load. Check API key and restrictions.');
      };
      
      document.head.appendChild(script);
      
      return () => {
        clearTimeout(timeoutId);
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    } else {
      window.initMap();
    }
  }, []);

  // Add restaurant markers to the map when map is ready
  useEffect(() => {
    if (map && restaurants.length > 0) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      const newMarkers: any[] = [];
      
      // Function to convert address to geocode using the Geocoding API
      const geocodeAddress = async (restaurant: Restaurant) => {
        try {
          // In a real implementation, you would use the Google Geocoding API to convert addresses to coordinates
          // For this example, we'll use a mock geocoding with random offsets from Boston
          
          // Note: In production, you'd store latitude/longitude with each restaurant in your database
          // or use actual geocoding services
          
          // Mock geocoding - replace with real coordinates when available
          const bostonLat = 42.3601;
          const bostonLng = -71.0589;
          
          // Create small random offset based on neighborhood to distribute restaurants
          const getOffset = (neighborhood: string) => {
            const hash = neighborhood.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return {
              lat: (hash % 20) * 0.001 - 0.01,
              lng: ((hash * 13) % 20) * 0.001 - 0.01
            };
          };
          
          const offset = getOffset(restaurant.neighborhood || restaurant.location);
          const position = {
            lat: bostonLat + offset.lat,
            lng: bostonLng + offset.lng
          };
          
          // Create marker
          const marker = new window.google.maps.Marker({
            position,
            map,
            title: restaurant.name,
            animation: window.google.maps.Animation.DROP,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#FF385C',
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: '#FFFFFF',
            }
          });
          
          // Create info window content
          const contentString = `
            <div class="p-3" style="max-width: 300px; font-family: Arial, sans-serif;">
              <div style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">${restaurant.name}</div>
              <div style="font-size: 14px; color: #666; margin-bottom: 5px;">${restaurant.cuisine} · ${restaurant.priceRange}</div>
              <div style="font-size: 14px; margin-bottom: 8px;"><strong>Deal:</strong> ${restaurant.dealText}</div>
              <div style="font-size: 13px;">${restaurant.address}</div>
              <div style="margin-top: 10px;">
                <button 
                  style="background-color: #FF385C; color: white; border: none; padding: 8px 12px; 
                  border-radius: 20px; cursor: pointer; font-size: 14px;"
                  onclick="window.open('/restaurant/${restaurant.id}', '_self')"
                >
                  View Details
                </button>
              </div>
            </div>
          `;
          
          // Add click listener
          marker.addListener('click', () => {
            if (infoWindow) {
              infoWindow.setContent(contentString);
              infoWindow.open(map, marker);
            }
          });
          
          newMarkers.push(marker);
        } catch (error) {
          console.error(`Error geocoding ${restaurant.name}:`, error);
        }
      };
      
      // Process all restaurants
      const geocodePromises = restaurants.map(geocodeAddress);
      Promise.all(geocodePromises).then(() => {
        setMarkers(newMarkers);
        
        // Auto-fit bounds to show all markers
        if (newMarkers.length > 0) {
          const bounds = new window.google.maps.LatLngBounds();
          newMarkers.forEach((marker) => bounds.extend(marker.getPosition()));
          map.fitBounds(bounds);
          
          // Don't zoom in too far on small data sets
          const listener = window.google.maps.event.addListener(map, 'idle', () => {
            if (map.getZoom() > 16) map.setZoom(16);
            window.google.maps.event.removeListener(listener);
          });
        }
      });
      
      return () => {
        newMarkers.forEach(marker => marker.setMap(null));
      };
    }
  }, [map, restaurants, infoWindow]);

  return (
    <div className="w-full h-[70vh] rounded-xl overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-lg font-medium flex flex-col items-center">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            Loading map...
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-lg text-red-500 font-medium flex flex-col items-center p-6 max-w-md text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
            <p className="text-sm mt-2 text-gray-600">Please check your internet connection or API key configuration.</p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-800">
              <h3 className="font-bold mb-2">Troubleshooting Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-left">
                <li>Make sure .env file contains <code className="bg-gray-200 px-1 rounded">VITE_GOOGLE_MAPS_API_KEY</code></li>
                <li>Enable JavaScript API in Google Cloud Console</li>
                <li>Add HTTP referrer restrictions (include localhost)</li>
                <li>Ensure billing is set up for your Google account</li>
              </ol>
            </div>
            <button 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
              onClick={() => setIsLoading(true)}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      
      <div ref={mapRef} className="w-full h-full"></div>
      
      <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg text-sm">
        <p className="font-medium">🍽️ {restaurants.length} Restaurants with Deals</p>
      </div>
    </div>
  );
};

export default RestaurantMap;
