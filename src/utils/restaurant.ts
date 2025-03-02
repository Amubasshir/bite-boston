/**
 * Generates a URL-friendly ID from a restaurant name
 * Converts to lowercase, replaces spaces with hyphens, and removes apostrophes
 */
export const generateRestaurantId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
};
