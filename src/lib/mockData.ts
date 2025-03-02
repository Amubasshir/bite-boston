// Mock data service for claimed deals

// Interface for claimed deals
export interface ClaimedDeal {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  restaurantId: string;
  restaurantName: string;
  dealId: string;
  dealTitle: string;
  dealDescription: string;
  claimedAt: string;
  status: string; // 'active', 'used', 'expired'
}

// Generate mock claimed deals
const mockClaimedDeals: ClaimedDeal[] = [
  {
    id: 'cd001',
    userId: '1',
    userName: 'John Smith',
    userEmail: 'john.smith@example.com',
    restaurantId: '1',
    restaurantName: 'Burger Palace',
    dealId: 'deal001',
    dealTitle: 'Buy One Get One Free Burger',
    dealDescription:
      'Buy any signature burger and get a second one free. Valid Monday-Thursday.',
    claimedAt: '2023-11-15T14:30:00Z',
    status: 'active',
  },
  {
    id: 'cd002',
    userId: '1',
    userName: 'John Smith',
    userEmail: 'john.smith@example.com',
    restaurantId: '2',
    restaurantName: 'Pizza Heaven',
    dealId: 'deal005',
    dealTitle: '30% Off Any Large Pizza',
    dealDescription: 'Get 30% off any large pizza. Valid for dine-in only.',
    claimedAt: '2023-11-10T18:45:00Z',
    status: 'used',
  },
  {
    id: 'cd003',
    userId: '2',
    userName: 'Emily Johnson',
    userEmail: 'emily.j@example.com',
    restaurantId: '1',
    restaurantName: 'Burger Palace',
    dealId: 'deal002',
    dealTitle: 'Free Fries with Any Burger',
    dealDescription: 'Get free large fries with any burger purchase.',
    claimedAt: '2023-11-12T12:15:00Z',
    status: 'active',
  },
  {
    id: 'cd004',
    userId: '3',
    userName: 'Michael Brown',
    userEmail: 'michael.b@example.com',
    restaurantId: '3',
    restaurantName: 'Sushi Delight',
    dealId: 'deal008',
    dealTitle: '50% Off Sushi Rolls',
    dealDescription: 'Get 50% off all sushi rolls on your first visit.',
    claimedAt: '2023-11-08T19:30:00Z',
    status: 'expired',
  },
  {
    id: 'cd005',
    userId: '2',
    userName: 'Emily Johnson',
    userEmail: 'emily.j@example.com',
    restaurantId: '3',
    restaurantName: 'Sushi Delight',
    dealId: 'deal009',
    dealTitle: 'Free Miso Soup',
    dealDescription: 'Get a free miso soup with any order over $20.',
    claimedAt: '2023-11-14T13:20:00Z',
    status: 'active',
  },
  {
    id: 'cd006',
    userId: '3',
    userName: 'Michael Brown',
    userEmail: 'michael.b@example.com',
    restaurantId: '2',
    restaurantName: 'Pizza Heaven',
    dealId: 'deal006',
    dealTitle: 'Free Garlic Bread',
    dealDescription: 'Get free garlic bread with any pizza order.',
    claimedAt: '2023-11-09T20:10:00Z',
    status: 'used',
  },
  {
    id: 'cd007',
    userId: '1',
    userName: 'John Smith',
    userEmail: 'john.smith@example.com',
    restaurantId: '3',
    restaurantName: 'Sushi Delight',
    dealId: 'deal010',
    dealTitle: 'Buy 2 Rolls Get 1 Free',
    dealDescription:
      'Buy any 2 rolls and get 1 roll of equal or lesser value free.',
    claimedAt: '2023-11-13T17:45:00Z',
    status: 'active',
  },
  {
    id: 'cd008',
    userId: '2',
    userName: 'Emily Johnson',
    userEmail: 'emily.j@example.com',
    restaurantId: '2',
    restaurantName: 'Pizza Heaven',
    dealId: 'deal007',
    dealTitle: 'Family Meal Deal',
    dealDescription: 'Get a large pizza, 2 sides, and 4 drinks for $29.99.',
    claimedAt: '2023-11-11T18:30:00Z',
    status: 'expired',
  },
  {
    id: 'cd009',
    userId: '3',
    userName: 'Michael Brown',
    userEmail: 'michael.b@example.com',
    restaurantId: '1',
    restaurantName: 'Burger Palace',
    dealId: 'deal003',
    dealTitle: '20% Off Your Total Bill',
    dealDescription: 'Get 20% off your total bill when you spend $30 or more.',
    claimedAt: '2023-11-07T13:15:00Z',
    status: 'used',
  },
  {
    id: 'cd010',
    userId: '1',
    userName: 'John Smith',
    userEmail: 'john.smith@example.com',
    restaurantId: '1',
    restaurantName: 'Burger Palace',
    dealId: 'deal004',
    dealTitle: 'Free Dessert',
    dealDescription: 'Get a free dessert with any main course purchase.',
    claimedAt: '2023-11-05T19:20:00Z',
    status: 'expired',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Get all claimed deals
export const getAllClaimedDeals = async (): Promise<ClaimedDeal[]> => {
  await delay(800); // Simulate network delay
  return [...mockClaimedDeals];
};

// Get claimed deals by user ID
export const getClaimedDealsByUserId = async (
  userId: string
): Promise<ClaimedDeal[]> => {
  await delay(600);
  return mockClaimedDeals.filter((deal) => deal.userId === userId);
};

// Get claimed deals by restaurant ID
export const getClaimedDealsByRestaurantId = async (
  restaurantId: string
): Promise<ClaimedDeal[]> => {
  await delay(600);
  return mockClaimedDeals.filter((deal) => deal.restaurantId === restaurantId);
};

// Add a new claimed deal
export const addClaimedDeal = async (
  deal: Omit<ClaimedDeal, 'id'>
): Promise<ClaimedDeal> => {
  await delay(1000);
  const newDeal: ClaimedDeal = {
    ...deal,
    id: `cd${String(mockClaimedDeals.length + 1).padStart(3, '0')}`,
  };
  mockClaimedDeals.push(newDeal);
  return newDeal;
};
