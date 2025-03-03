import { generateRestaurantId } from '@/utils/restaurant';

export interface Deal {
  dealTitle: string;
  dealDescription: string;
  potentialSavings: {
    average: string;
    upTo: string;
  };
}

export interface MenuItem {
  name: string;
  description: string;
  price: string;
}

export interface Restaurant {
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
  deals: Deal[];
  fullDescription: string;
  address: string;
  openingHours: Record<string, string>;
  phoneNumber: string;
  website: string;
  menuHighlights: MenuItem[];
}

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: generateRestaurantId('The Boiling Crab'),
    name: 'The Boiling Crab',
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8',
    location: 'Cambridge',
    rating: 4.6,
    priceRange: '$$',
    cuisine: 'Seafood',
    dealText: 'Buy one get one half off on shrimp',
    dealDescription:
      'Order any shrimp item—boiled (head-on or EZ-Peel), fried shrimp baskets, or Sha-Bang Bang shrimp—and get the second (equal or lower-priced) for half off. Mix and match!',

    neighborhood: 'Harvard Square',
    deals: [
      {
        dealTitle: 'Buy one get one half off on shrimp',
        dealDescription:
          'Order any shrimp item—boiled (head-on or EZ-Peel), fried shrimp baskets, or Sha-Bang Bang shrimp—and get the second (equal or lower-priced) for half off. Mix and match!',
        potentialSavings: {
          average: '$7',
          upTo: '$10',
        },
      },
      {
        dealTitle: 'Free fries and soda',
        dealDescription:
          'Get free fries and a soda when you order a ½ lb of Boiled Shrimp',
        potentialSavings: {
          average: '$7',
          upTo: '$7',
        },
      },
    ],
    fullDescription:
      'Casual small chain offering boiled-in-bag Cajun-spiced crawfish, oysters, shrimp & other shellfish.',
    address: '96 Winthrop St, Cambridge, MA 02138',
    openingHours: {
      Monday: '3:00 PM - 10:00 PM',
      'Tuesday-Sunday': '11:00 AM - 10:00 PM',
    },
    phoneNumber: '(617) 300-0299',
    website: 'https://theboilingcrab.com/#menu',
    menuHighlights: [
      {
        name: 'Cajun Crawfish',
        description: 'Boiled crawfish with signature Cajun seasoning',
        price: 'Market Price',
      },
      {
        name: 'Fried Shrimp Basket',
        description: 'Golden fried shrimp served with fries',
        price: '$14',
      },
      {
        name: 'Sha-Bang Bang Shrimp',
        description: 'Shrimp tossed in a spicy, creamy sauce',
        price: '$16',
      },
    ],
  },
  {
    id: generateRestaurantId('Tasty Burger'),
    name: 'Tasty Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    location: 'Cambridge',
    rating: 4.4,
    priceRange: '$',
    cuisine: 'Fast Food',
    dealText: 'Free beer with burger and fries',
    dealDescription:
      'Choose your preferred beer (between a Gansett, High Life, and PBR) when you order a hamburger or cheeseburger and fries. Make sure to ask for the Starvin student deal',

    neighborhood: 'Harvard Square',
    deals: [
      {
        dealTitle: 'Free beer',
        dealDescription:
          'Choose your preferred beer (between a Gansett, High Life, and PBR) when you order a hamburger or cheeseburger and fries. Make sure to ask for the Starvin student deal',
        potentialSavings: {
          average: '$5',
          upTo: '$7',
        },
      },
    ],
    fullDescription:
      'Casual counter-service chain specializing in burgers, fries & shakes, with a laid-back vibe.',
    address: '40 JFK Street, Cambridge, MA 02138',
    openingHours: {
      'Sunday-Thursday': '11:00 AM - 12:00 AM',
      'Friday-Saturday': '11:00 AM - 2:00 AM',
    },
    phoneNumber: 'N/A',
    website: 'N/A',
    menuHighlights: [
      {
        name: 'Tasty Burger',
        description:
          'Classic burger with lettuce, tomato, onion, and special sauce',
        price: '$8',
      },
      {
        name: 'Cheeseburger',
        description: 'Classic burger topped with American cheese',
        price: '$9',
      },
      {
        name: 'Hand-cut Fries',
        description: 'Fresh-cut potato fries',
        price: '$4',
      },
    ],
  },
  {
    id: generateRestaurantId('Saloniki'),
    name: 'Saloniki',
    image: 'https://images.unsplash.com/photo-1583953594539-5d77e9ba023f',
    location: 'Boston',
    rating: 4.4,
    priceRange: '$$',
    cuisine: 'Greek',
    dealText: 'Free Greek Fries for students',
    dealDescription:
      'Free order of Greek Fries with any lunch or dinner purchase (sandwich, plate, or salad). Valid for students only!',

    neighborhood: 'Back Bay',
    deals: [
      {
        dealTitle: 'Free fries',
        dealDescription:
          'Free order of Greek Fries with any lunch or dinner purchase (sandwich, plate, or salad). Valid for students only!',
        potentialSavings: {
          average: '$4',
          upTo: '$4',
        },
      },
    ],
    fullDescription:
      'Greek restaurant with a modern twist serving gyros, salads, and other Greek specialties.',
    address: '181 Massachusetts Ave, Boston, MA 02115',
    openingHours: {
      'Monday-Sunday': '11:00 AM - 9:00 PM',
    },
    phoneNumber: '(617) 585-6588',
    website: 'N/A',
    menuHighlights: [
      {
        name: 'Classic Gyro',
        description:
          'Pork shoulder, tomatoes, onions, and tzatziki in a warm pita',
        price: '$10',
      },
      {
        name: 'Greek Salad',
        description: 'Tomatoes, cucumbers, peppers, onions, feta, and olives',
        price: '$9',
      },
      {
        name: 'Greek Fries',
        description: 'Hand-cut fries with herbs and feta',
        price: '$4',
      },
    ],
  },
  {
    id: generateRestaurantId('Le Macaron French Pastries Cambridge'),
    name: 'Le Macaron French Pastries Cambridge',
    image: 'https://images.unsplash.com/photo-1558326567-98166332163b',
    location: 'Cambridge',
    rating: 3.6,
    priceRange: '$',
    cuisine: 'Dessert',
    dealText: 'Free macaron with box of 6',
    dealDescription:
      'Get a free macaron of your choice when you order a box of 6',

    neighborhood: 'Harvard Square',
    deals: [
      {
        dealTitle: 'Free macaron',
        dealDescription:
          'Get a free macaron of your choice when you order a box of 6',
        potentialSavings: {
          average: '$3',
          upTo: '$3',
        },
      },
      {
        dealTitle: 'Free latte',
        dealDescription:
          'Get a free cold or hot drink when you order a box of 12 macaroons. Does not apply to Dubai chocolate latte drink and some other drinks',
        potentialSavings: {
          average: '$5',
          upTo: '$5',
        },
      },
    ],
    fullDescription:
      'Bakery specializing in macarons and other French pastries, plus coffee and gelato.',
    address: '1374 Massachusetts Ave, Cambridge, MA 02138',
    openingHours: {
      'Monday-Sunday': '10:00 AM - 9:00 PM',
    },
    phoneNumber: '(617) 714-4615',
    website: 'N/A',
    menuHighlights: [
      {
        name: 'Classic Macarons',
        description:
          'Assorted flavors including chocolate, vanilla, pistachio, and more',
        price: '$3 each',
      },
      {
        name: 'Box of 6 Macarons',
        description: 'Choose any 6 flavors of macarons',
        price: '$16',
      },
      {
        name: 'Box of 12 Macarons',
        description: 'Choose any 12 flavors of macarons',
        price: '$30',
      },
    ],
  },
  {
    id: generateRestaurantId("Mr Bartley's Burger Cottage"),
    name: "Mr Bartley's Burger Cottage",
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
    location: 'Cambridge',
    rating: 4.5,
    priceRange: '$',
    cuisine: 'Burger',
    dealText: 'Buy one get one burger free',
    dealDescription:
      'Buy any burger, and enjoy a second one for free (applies to the burger of equal or lesser value)',

    neighborhood: 'Harvard Square',
    deals: [
      {
        dealTitle: 'Buy one get one burger',
        dealDescription:
          'Buy any burger, and enjoy a second one for free (applies to the burger of equal or lesser value)',
        potentialSavings: {
          average: '$20',
          upTo: '$20',
        },
      },
      {
        dealTitle: 'Free chocolate cake',
        dealDescription:
          'Get a free slice of chocolate cake when you order a burger or another main dish',
        potentialSavings: {
          average: '$7',
          upTo: '$7',
        },
      },
    ],
    fullDescription:
      'Quirky burger joint with a menu of creatively named burgers & frappes, plus sandwiches & salads.',
    address: '1246 Massachusetts Ave, Cambridge, MA 02138',
    openingHours: {
      'Monday-Sunday': '11:00 AM - 9:00 PM',
    },
    phoneNumber: '(617) 354-6559',
    website: 'N/A',
    menuHighlights: [
      {
        name: 'The Big Papi',
        description: 'Burger with guacamole, jalapeños, and salsa',
        price: '$18',
      },
      {
        name: 'The Tom Brady',
        description: 'Burger with cheddar, guacamole, lettuce, and tomato',
        price: '$19',
      },
      {
        name: 'Chocolate Frappe',
        description: 'Thick chocolate milkshake',
        price: '$8',
      },
    ],
  },
  {
    id: generateRestaurantId("Joe's Pizza"),
    name: "Joe's Pizza",
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    location: 'Boston',
    rating: 4.2,
    priceRange: '$',
    cuisine: 'Pizza',
    dealText: 'Buy one get one pizza slice free',
    dealDescription:
      'Buy any pizza slice, and enjoy a second one for free (applies to the slice of equal or lesser value)',

    neighborhood: 'Allston',
    deals: [
      {
        dealTitle: 'Buy one get one pizza',
        dealDescription:
          'Buy any pizza slice, and enjoy a second one for free (applies to the slice of equal or lesser value)',
        potentialSavings: {
          average: '$4',
          upTo: '$4',
        },
      },
      {
        dealTitle: 'Free soda',
        dealDescription: 'Get a free soda when you order a slice of pizza',
        potentialSavings: {
          average: '$3',
          upTo: '$3',
        },
      },
    ],
    fullDescription:
      'Casual spot for pizza, pasta & subs, plus beer & wine in a simple space with TVs.',
    address: '33 N Beacon St, Boston, MA 02134',
    openingHours: {
      'Monday-Sunday': '11:00 AM - 10:00 PM',
    },
    phoneNumber: '(617) 782-6200',
    website: 'N/A',
    menuHighlights: [
      {
        name: 'Cheese Slice',
        description: 'Classic New York style cheese slice',
        price: '$4',
      },
      {
        name: 'Pepperoni Slice',
        description: 'Cheese slice topped with pepperoni',
        price: '$4.50',
      },
      {
        name: 'Sicilian Slice',
        description: 'Thick crust square slice with cheese and sauce',
        price: '$5',
      },
    ],
  },
  {
    id: generateRestaurantId("Zinneken's Belgian waffles"),
    name: "Zinneken's Belgian waffles",
    image: 'https://images.unsplash.com/photo-1598233847491-f16487adee2f',
    location: 'Cambridge',
    rating: 4.4,
    priceRange: '$',
    cuisine: 'Dessert',
    dealText: 'Free drink with waffle order',
    dealDescription:
      'Get a free hot or cold beverage with the order of any pre-designed waffle. Not applicable to any matcha-based drinks or smoothies. If you choose to build your own waffle, a minimum of 2 toppings is required to redeem the deal',

    neighborhood: 'Harvard Square',
    deals: [
      {
        dealTitle: 'Free drink',
        dealDescription:
          'Get a free hot or cold beverage with the order of any pre-designed waffle. Not applicable to any matcha-based drinks or smoothies. If you choose to build your own waffle, a minimum of 2 toppings is required to redeem the deal. Only redeemable on weekdays (up to 2PM on Friday)',
        potentialSavings: {
          average: '$5',
          upTo: '$5',
        },
      },
    ],
    fullDescription:
      'Counter-service shop offering sweet & savory waffles, plus coffee & tea in a casual setting.',
    address: '1154 Massachusetts Ave, Cambridge, MA 02138',
    openingHours: {
      'Monday-Sunday': '10:00 AM - 10:00 PM',
    },
    phoneNumber: '(617) 876-0836',
    website: 'N/A',
    menuHighlights: [
      {
        name: 'Brussels Waffle',
        description: 'Light and crispy rectangular waffle',
        price: '$6',
      },
      {
        name: 'Liège Waffle',
        description: 'Dense, sweet waffle with caramelized sugar',
        price: '$7',
      },
      {
        name: 'Nutella & Banana Waffle',
        description: 'Waffle topped with Nutella and fresh banana slices',
        price: '$10',
      },
    ],
  },
  {
    id: generateRestaurantId('The Sea Hag Restaurant & Bar'),
    name: 'The Sea Hag Restaurant & Bar',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    location: 'Cambridge',
    rating: 4.3,
    priceRange: '$$$',
    cuisine: 'Seafood',
    dealText: 'Buy one get one main dish free',
    dealDescription:
      'Buy any main dish and get another main dish for free. Applies to items under the "From the Sea" section. Main dish of equal or lesser value will be free',

    neighborhood: 'Harvard Square',
    deals: [
      {
        dealTitle: 'Buy one get one main dish',
        dealDescription:
          'Buy any main dish and get another main dish for free. Applies to items under the "From the Sea" section. Main dish of equal or lesser value will be free',
        potentialSavings: {
          average: '$15',
          upTo: '$25',
        },
      },
      {
        dealTitle: 'Free appetizer',
        dealDescription:
          'Get a free appetizer of your choice when you order a main dish',
        potentialSavings: {
          average: '$15',
          upTo: '$15',
        },
      },
    ],
    fullDescription:
      "Serves great cocktails, serves vegan dishes, has a kids' menu.",
    address: '49 Mt Auburn St, Cambridge, MA 02138',
    openingHours: {
      'Thursday-Sunday': '11:30 AM - 10:00 PM',
      'Monday-Wednesday': 'Closed',
    },
    phoneNumber: '(617) 945-7477',
    website: 'N/A',
    menuHighlights: [
      {
        name: 'Lobster Roll',
        description: 'Fresh lobster meat on a toasted roll',
        price: '$28',
      },
      {
        name: 'Fish & Chips',
        description: 'Beer-battered cod with hand-cut fries',
        price: '$22',
      },
      {
        name: 'Clam Chowder',
        description: 'Creamy New England style clam chowder',
        price: '$12',
      },
    ],
  },
  {
    id: generateRestaurantId("Grendel's Den Restaurant & Bar"),
    name: "Grendel's Den Restaurant & Bar",
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
    location: 'Cambridge',
    rating: 4.2,
    priceRange: '$$',
    cuisine: 'American',
    dealText: 'Buy one get one main dish free',
    dealDescription:
      'Buy any main dish and get another main dish for free. Applies to items in the main dish, sandwich, and salads section. Main dish of equal or lesser value will be free',

    neighborhood: 'Harvard Square',
    deals: [
      {
        dealTitle: 'Buy one get one main dish',
        dealDescription:
          'Buy any main dish and get another main dish for free. Applies to items in the main dish, sandwich, and salads section. Main dish of equal or lesser value will be free',
        potentialSavings: {
          average: '$12',
          upTo: '$18',
        },
      },
      {
        dealTitle: 'Free appetizer',
        dealDescription:
          'Get a free appetizer of your choice when you order a main dish',
        potentialSavings: {
          average: '$12',
          upTo: '$12',
        },
      },
    ],
    fullDescription:
      "Staple pub that's popular with students for beer selection, happy-hour bar bites & a patio.",
    address: '89 Winthrop St, Cambridge, MA 02138',
    openingHours: {
      'Thursday-Sunday': '11:00 AM - 11:00 PM',
      'Monday-Wednesday': 'Closed',
    },
    phoneNumber: 'N/A',
    website: 'N/A',
    menuHighlights: [
      {
        name: "Grendel's Burger",
        description: 'House burger with lettuce, tomato, and special sauce',
        price: '$15',
      },
      {
        name: 'Mediterranean Plate',
        description: 'Hummus, falafel, olives, and pita',
        price: '$14',
      },
      {
        name: 'Fish Tacos',
        description: 'Grilled fish with slaw and chipotle mayo',
        price: '$16',
      },
    ],
  },
  {
    id: generateRestaurantId('Falafel Corner'),
    name: 'Falafel Corner',
    image: 'https://images.unsplash.com/photo-1593001872095-7d5b3868dd20',
    location: 'Cambridge',
    rating: 3.9,
    priceRange: '$$',
    cuisine: 'Middle Eastern',
    dealText: 'Free appetizer with 2 sandwiches',
    dealDescription:
      'Get a free appetizer of your choice with the order of 2 roll up sandwiches or 2 plates',

    neighborhood: 'Harvard Square',
    deals: [
      {
        dealTitle: 'Free appetizer',
        dealDescription:
          'Get a free appetizer of your choice with the order of 2 roll up sandwiches or 2 plates',
        potentialSavings: {
          average: '$6',
          upTo: '$8',
        },
      },
      {
        dealTitle: 'Free soup',
        dealDescription:
          'Get a free soup of your choice with the order of 2 roll up sandwiches or 2 plates',
        potentialSavings: {
          average: '$6',
          upTo: '$6',
        },
      },
    ],
    fullDescription:
      'Miniature counter-serve late-night option doling out falafel, shawarma & other Middle Eastern eats.',
    address: '8 Eliot St, Cambridge, MA 02138',
    openingHours: {
      'Monday-Sunday': '11:00 AM - 3:00 AM',
    },
    phoneNumber: '(617) 441-8888',
    website: 'N/A',
    menuHighlights: [
      {
        name: 'Falafel Sandwich',
        description: 'Falafel with tahini, lettuce, tomato in pita bread',
        price: '$8',
      },
      {
        name: 'Chicken Shawarma Plate',
        description: 'Marinated chicken with rice, salad, and hummus',
        price: '$14',
      },
      {
        name: 'Hummus Appetizer',
        description: 'Creamy hummus served with pita bread',
        price: '$6',
      },
    ],
  },
  {
    id: generateRestaurantId('Hokkaido Ramen Santouka Harvard Square'),
    name: 'Hokkaido Ramen Santouka Harvard Square',
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e',
    location: 'Cambridge',
    rating: 4.5,
    priceRange: '$',
    cuisine: 'Ramen',
    dealText: 'Free size upgrade',
    dealDescription: 'Upgrade to a large ramen bowl for free!',

    neighborhood: 'Harvard Square',
    deals: [
      {
        dealTitle: 'Free size upgrade',
        dealDescription: 'Upgrade to a large ramen bowl for free!',
        potentialSavings: {
          average: '$3',
          upTo: '$3',
        },
      },
    ],
    fullDescription:
      'Japanese chain offering ramen in various broths with a modern twist.',
    address: '1 Bow St, Cambridge, MA 02138',
    openingHours: {
      'Monday-Sunday': '11:00 AM - 10:00 PM',
    },
    phoneNumber: '(617) 945-1460',
    website: 'N/A',
    menuHighlights: [
      {
        name: 'Tonkotsu Ramen',
        description: 'Pork bone broth with chashu, bamboo shoots, and egg',
        price: '$15',
      },
      {
        name: 'Shio Ramen',
        description: 'Salt-based broth with pork and vegetables',
        price: '$14',
      },
      {
        name: 'Gyoza',
        description: 'Pan-fried pork dumplings',
        price: '$7',
      },
    ],
  },
];

// Export a subset of restaurants for the homepage
export const FEATURED_RESTAURANTS = RESTAURANTS_DATA.slice(0, 9);
