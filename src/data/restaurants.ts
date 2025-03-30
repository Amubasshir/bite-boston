import { generateRestaurantId } from '@/utils/restaurant';

export interface Deal {
  dealTitle: string;
  offerPerCustomerLimit: number;
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
    id: generateRestaurantId("Source"),
    name: "Source",
    image: 'https://i.ibb.co/21xYNC0V/pasta.jpg',
    location: 'Cambridge',
    rating: 4.3,
    priceRange: '$$',
    cuisine: 'Italian',

    dealText: 'Free Margherita Pizza*',
    dealDescription:
      '*Buy any entree and get a free Margherita Pizza.',

    neighborhood: 'Harvard Square',
    deals: [
      {
        dealTitle: 'Free Margherita Pizza*',
        dealDescription:
          '*Buy any entree and get a free Margherita Pizza.',
        potentialSavings: {
          average: '$18',
          upTo: '$18',
        },
        offerPerCustomerLimit: 1,
      },
      {
        dealTitle: 'Free Brussel Sprouts*',
        dealDescription:
          '*Get a free Brussel Sprouts appetizer when you order a Build Your Own Pizza, Pasta, or Entree',
        potentialSavings: {
          average: '$14',
          upTo: '$14',
        },
        offerPerCustomerLimit: 2,
      },
    ],
    fullDescription:
      "Pizzas & light fare doled out in a redbrick venue that has an industrial-style dining room & a bar.",
    address: '27 Church St, Cambridge, MA 02138',
    openingHours: {
      'Monday-Thursday': '12:00 PM - 9:00 PM',
      'Friday': '12:00 PM - 10:00 PM',
      'Saturday': '11:00 AM - 10:00 PM',
      'Sunday': '11:00 AM - 9:00 PM',
    },
    phoneNumber: '(857)856-6800',
    website: 'http://sourcerestaurants.com/',
    menuHighlights: [
      {
        name: "Build Your Own Pizza",
        description: 'Customize your own pizza with your choice of toppings',
        price: '$20 - $22',
      },
    ],
  },
  {
    id: generateRestaurantId('The Sea Hag Restaurant & Bar'),
    name: 'The Sea Hag Restaurant & Bar',
    image: 'https://i.ibb.co.com/ZpwtbQVw/seehag.jpg',
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
        offerPerCustomerLimit: 1,
        dealDescription:
          'Buy any main dish and get another main dish for free. Applies to items under the "From the Sea" section. Main dish of equal or lesser value will be free',
        potentialSavings: {
          average: '$15',
          upTo: '$25',
        },
      },
      {
        dealTitle: 'Free appetizer',
        offerPerCustomerLimit: 2,
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
    id: generateRestaurantId("Mr Bartley's Burger Cottage"),
    name: "Mr Bartley's Burger Cottage",
    image: 'https://i.ibb.co.com/4w4XYFvR/Mr-Bartley-BOGO.webp',
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
        offerPerCustomerLimit: 1,
        dealDescription:
          'Buy any burger, and enjoy a second one for free (applies to the burger of equal or lesser value)',
        potentialSavings: {
          average: '$20',
          upTo: '$20',
        },
      },
      {
        dealTitle: 'Free chocolate cake',
        offerPerCustomerLimit: 3,
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
    id: generateRestaurantId("Grendel's Den Restaurant & Bar"),
    name: "Grendel's Den Restaurant & Bar",
    image: 'https://i.ibb.co/WvsrDpYh/Screenshot-2025-03-30-at-2-43-12-PM.png',
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
        offerPerCustomerLimit: 2,
      },
      {
        dealTitle: 'Free appetizer',
        dealDescription:
          'Get a free appetizer of your choice when you order a main dish',
        potentialSavings: {
          average: '$12',
          upTo: '$12',
        },
        offerPerCustomerLimit: 2,
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
    id: generateRestaurantId("Joe's Pizza"),
    name: "Joe's Pizza",
    image: 'https://i.ibb.co/npTT6m4/Screenshot-2025-03-30-at-2-59-10-PM.png',
    location: 'Boston',
    rating: 4.2,
    priceRange: '$',

    cuisine: 'Pizza',
    dealText: 'Buy one get one Cheese Slice',
    dealDescription:
      'Buy any pizza slice, and enjoy a second one for free (cheese slice only)',

    neighborhood: 'Allston',
    deals: [
      {
        dealTitle: 'Buy one get one cheese slice',
        dealDescription:
          'Buy any pizza slice, and enjoy a second one for free (cheese slice only)',
        potentialSavings: {
          average: '$4',
          upTo: '$4',
        },
        offerPerCustomerLimit: 0,
      },
      {
        dealTitle: 'Free soda',
        dealDescription: 'Get a free soda when you order a slice of pizza',
        potentialSavings: {
          average: '$3',
          upTo: '$3',
        },
        offerPerCustomerLimit: 0,
      },
    ],
    fullDescription:
      'Casual spot for pizza, pasta & subs, plus beer & wine in a simple space with TVs.',
    address: '1694 Massachusetts Ave, Cambridge, MA 02138',
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
    id: generateRestaurantId('Le Macaron French Pastries Cambridge'),
    name: 'Le Macaron French Pastries Cambridge',
    image: 'https://i.ibb.co.com/Psx5zxkD/Le-Macaron-BOGO.jpg',
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
        offerPerCustomerLimit: 0,
      },
      {
        dealTitle: 'Free latte',
        dealDescription:
          'Get a free cold or hot drink when you order a box of 12 macaroons. Does not apply to Dubai chocolate latte drink and some other drinks',
        potentialSavings: {
          average: '$5',
          upTo: '$5',
        },
        offerPerCustomerLimit: 0,
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
    id: generateRestaurantId("Zinneken's Belgian waffles"),
    name: "Zinneken's Belgian waffles",
    image: 'https://i.ibb.co.com/q3gmWdjK/im.jpg',
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
        offerPerCustomerLimit: 0,
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
    id: generateRestaurantId('The Boiling Crab'),
    name: 'The Boiling Crab',
    image: 'https://i.ibb.co.com/2H8hFs1/Boiling-Crab-BOGO.jpg',
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
        offerPerCustomerLimit: 0,
      },
      {
        dealTitle: 'Free fries and soda',
        dealDescription:
          'Get free fries and a soda when you order a ½ lb of Boiled Shrimp',
        potentialSavings: {
          average: '$7',
          upTo: '$7',
        },
        offerPerCustomerLimit: 0,
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
  // {
  //   id: generateRestaurantId('Hokkaido Ramen Santouka Harvard Square'),
  //   name: 'Hokkaido Ramen Santouka Harvard Square',
  //   image: 'https://images.unsplash.com/photo-1598233847491-f16487adee2f',
  //   location: 'Cambridge',
  //   rating: 4.5,
  //   priceRange: '$',
  //   cuisine: 'Ramen',
  //   dealText: 'Free size upgrade',
  //   dealDescription: 'Upgrade to a large ramen bowl for free!',

  //   neighborhood: 'Harvard Square',
  //   deals: [
  //     {
  //       dealTitle: 'Free size upgrade',
  //       dealDescription: 'Upgrade to a large ramen bowl for free!',
  //       potentialSavings: {
  //         average: '$3',
  //         upTo: '$3',
  //       },
  //     },
  //   ],
  //   fullDescription:
  //     'Japanese chain offering ramen in various broths with a modern twist.',
  //   address: '1 Bow St, Cambridge, MA 02138',
  //   openingHours: {
  //     'Monday-Sunday': '11:00 AM - 10:00 PM',
  //   },
  //   phoneNumber: '(617) 945-1460',
  //   website: 'N/A',
  //   menuHighlights: [
  //     {
  //       name: 'Tonkotsu Ramen',
  //       description: 'Pork bone broth with chashu, bamboo shoots, and egg',
  //       price: '$15',
  //     },
  //     {
  //       name: 'Shio Ramen',
  //       description: 'Salt-based broth with pork and vegetables',
  //       price: '$14',
  //     },
  //     {
  //       name: 'Gyoza',
  //       description: 'Pan-fried pork dumplings',
  //       price: '$7',
  //     },
  //   ],
  // },
  {
    id: generateRestaurantId('Falafel Corner'),
    name: 'Falafel Corner',
    image: 'https://i.ibb.co.com/1fSWN4fp/Falafel-Corner-Free-Soup.jpg',
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
        offerPerCustomerLimit: 0,
      },
      {
        dealTitle: 'Free soup',
        dealDescription:
          'Get a free soup of your choice with the order of 2 roll up sandwiches or 2 plates',
        potentialSavings: {
          average: '$6',
          upTo: '$6',
        },
        offerPerCustomerLimit: 0,
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
    id: generateRestaurantId('Tasty Burger'),
    name: 'Tasty Burger',
    image: 'https://i.ibb.co.com/xtD6cL2W/Tasty-Burger-BOGO.jpg',
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
        offerPerCustomerLimit: 0,
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
    id: generateRestaurantId('Bon Me'),
    name: 'Bon Me',
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e',
    location: 'Boston',
    rating: 4.4,
    priceRange: '$',

    cuisine: 'Asian Fusion',
    dealText: '15% off',
    dealDescription: 'Get 15% off your bill. You must show your student ID.',

    neighborhood: 'Congress Street',
    deals: [
      {
        dealTitle: '15% off',
        dealDescription:
          'Get 15% off your bill. You must show your student ID.',
        potentialSavings: {
          average: '$5',
          upTo: 'unlimited',
        },
        offerPerCustomerLimit: 0,
      },
    ],
    fullDescription:
      'Asian-inspired sandwiches, rice bowls, and salads with a modern twist.',
    address: '1 Bow St, Cambridge, MA 02138',
    openingHours: {
      Thursday: 'Opens 11:00 AM',
    },
    phoneNumber: '(617) 357-9888',
    website: 'N/A',
    menuHighlights: [
      {
        name: 'Banh Mi Sandwich',
        description:
          'Vietnamese-style baguette with house-made fillings and pickled vegetables',
        price: '$9',
      },
      {
        name: 'Rice Bowl',
        description:
          'Steamed rice topped with your choice of protein and fresh vegetables',
        price: '$10',
      },
      {
        name: 'Salad Bowl',
        description:
          'Crisp greens with house-made dressings and protein options',
        price: '$11',
      },
    ],
  },

  {
    id: generateRestaurantId('Saloniki'),
    name: 'Saloniki',
    image: 'https://i.ibb.co.com/yBRn9P7S/Saloniki-BOGO.webp',
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
        offerPerCustomerLimit: 0,
      },
    ],
    fullDescription:
      'Greek restaurant with a modern twist serving gyros, salads, and other Greek specialties.',
    address: '24 Dunster St, Cambridge, MA 02138',
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
        offerPerCustomerLimit: 0,
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
  /*
  {
    id: generateRestaurantId('Da Long Yi'),
    name: 'Da Long Yi',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    location: 'Boston',
    rating: 4.3,
    priceRange: '$',
    cuisine: 'Hot Pot',
    dealText: 'Existing Deal',
    dealDescription: 'Check the restaurant for available promotions.',

    neighborhood: 'Commonwealth Avenue',
    deals: [
      {
        dealTitle: 'Existing Deal',
        dealDescription: 'Check the restaurant for available promotions.',
        potentialSavings: {
          average: 'Varies',
          upTo: 'Varies',
        },
        offerPerCustomerLimit: 0,
      },
    ],
    fullDescription:
      'Chain serving Sichuan-style hot pots with a variety of broths & ingredients, plus beer & cocktails.',
    address: '460 Commonwealth Ave, Boston, MA 02215',
    openingHours: {
      'Monday-Sunday': 'Open now, closes at 10 PM',
    },
    phoneNumber: '(617) 208-8788',
    website: 'N/A',
    menuHighlights: [
      {
        name: 'Sichuan Spicy Hot Pot',
        description:
          'Signature spicy broth with a mix of meats, seafood, and vegetables',
        price: 'Varies',
      },
      {
        name: 'Mild Herbal Broth',
        description: 'Aromatic herbal broth with a delicate flavor',
        price: 'Varies',
      },
      {
        name: 'Premium Beef Slices',
        description: 'Thinly sliced beef, perfect for dipping in hot pot',
        price: '$15',
      },
    ],
  }, */
  // {
  //   id: generateRestaurantId('Taiyaki NYC x The Dough Club - Cambridge'),
  //   name: 'Taiyaki NYC x The Dough Club - Cambridge',
  //   image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  //   location: 'Cambridge',
  //   rating: 4.5,
  //   priceRange: '$',
  //   cuisine: 'Ice Cream Shop',
  //   dealText: 'Existing Deal',
  //   dealDescription: 'Check the restaurant for available promotions.',

  //   neighborhood: 'Harvard Square',
  //   deals: [
  //     {
  //       dealTitle: 'Existing Deal',
  //       dealDescription: 'Check the restaurant for available promotions.',
  //       potentialSavings: {
  //         average: 'Varies',
  //         upTo: 'Varies',
  //       },
  //     },
  //   ],
  //   fullDescription:
  //     'Japanese ice cream shop offering fish-shaped waffles filled with soft-serve ice cream & other treats.',
  //   address: '6 Church St, Cambridge, MA 02138',
  //   openingHours: {
  //     'Monday-Sunday': 'Open now, closes at 9 PM',
  //   },
  //   phoneNumber: '(617) 945-0983',
  //   website: 'N/A',
  //   menuHighlights: [
  //     {
  //       name: 'Taiyaki',
  //       description:
  //         'Fish-shaped waffle filled with custard, red bean, or Nutella',
  //       price: 'Varies',
  //     },
  //     {
  //       name: 'Matcha & Strawberry Ice Cream',
  //       description:
  //         'Soft-serve ice cream with a mix of matcha and strawberry flavors',
  //       price: 'Varies',
  //     },
  //     {
  //       name: 'Strawberry Cheesecake',
  //       description: 'Japanese-style cheesecake topped with fresh strawberries',
  //       price: 'Varies',
  //     },
  //   ],
  // },
  // {
  //   id: generateRestaurantId('Wusong Road'),
  //   name: 'Wusong Road',
  //   image:
  //     'https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   location: 'Cambridge',
  //   rating: 4.2,
  //   priceRange: '$$',
  //   cuisine: 'Chinese',
  //   dealText: 'Existing Deal',
  //   dealDescription: 'Check the restaurant for available promotions.',

  //   neighborhood: 'Harvard Square',
  //   deals: [
  //     {
  //       dealTitle: 'Existing Deal',
  //       dealDescription: 'Check the restaurant for available promotions.',
  //       potentialSavings: {
  //         average: 'Varies',
  //         upTo: 'Varies',
  //       },
  //     },
  //   ],
  //   fullDescription:
  //     'Chinese cuisine with a focus on traditional dishes and flavors.',
  //   address: '112 Mt Auburn St, Cambridge, MA 02138',
  //   openingHours: {
  //     Thursday: 'Opens 11:30 AM',
  //   },
  //   phoneNumber: '(617) 945-0288',
  //   website: 'N/A',
  //   menuHighlights: [
  //     {
  //       name: 'Peking Duck',
  //       description:
  //         'Traditional roasted duck served with pancakes and hoisin sauce',
  //       price: '$30',
  //     },
  //     {
  //       name: 'Sichuan Mapo Tofu',
  //       description: 'Spicy tofu dish with minced pork and Sichuan peppercorns',
  //       price: '$15',
  //     },
  //     {
  //       name: 'Dan Dan Noodles',
  //       description: 'Spicy sesame and peanut noodles with ground pork',
  //       price: '$14',
  //     },
  //   ],
  // },
  // {
  //   id: generateRestaurantId('Madras Dosa Co'),
  //   name: 'Madras Dosa Co',
  //   image:
  //     'https://images.unsplash.com/photo-1630409351241-e90e7f5e434d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9zYXxlbnwwfHwwfHx8MA%3D%3D',
  //   location: 'Boston',
  //   rating: 4.3,
  //   priceRange: '$',
  //   cuisine: 'Indian',
  //   dealText: 'Existing Deal',
  //   dealDescription: 'Check the restaurant for available promotions.',

  //   neighborhood: 'Downtown Boston',
  //   deals: [
  //     {
  //       dealTitle: 'Existing Deal',
  //       dealDescription: 'Check the restaurant for available promotions.',
  //       potentialSavings: {
  //         average: 'Varies',
  //         upTo: 'Varies',
  //       },
  //     },
  //   ],
  //   fullDescription:
  //     'Authentic South Indian cuisine specializing in dosas and other traditional dishes.',
  //   address: '414 Washington St, Boston, MA 02108',
  //   openingHours: {
  //     Thursday: 'Opens 11:00 AM',
  //   },
  //   phoneNumber: '(617) 338-4988',
  //   website: 'N/A',
  //   menuHighlights: [
  //     {
  //       name: 'Masala Dosa',
  //       description: 'Crispy rice crepe filled with spiced potato masala',
  //       price: '$10',
  //     },
  //     {
  //       name: 'Paneer Dosa',
  //       description: 'Stuffed dosa with spiced paneer and chutneys',
  //       price: '$12',
  //     },
  //     {
  //       name: 'Sambar & Idli',
  //       description: 'Steamed rice cakes served with lentil soup and chutneys',
  //       price: '$9',
  //     },
  //   ],
  // },
  // {
  //   id: generateRestaurantId('Russell House Tavern'),
  //   name: 'Russell House Tavern',
  //   image:
  //     'https://images.unsplash.com/photo-1624935984039-395c058e3944?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9zYXxlbnwwfHwwfHx8MA%3D%3D',
  //   location: 'Cambridge',
  //   rating: 4.4,
  //   priceRange: '$$',
  //   cuisine: 'American',
  //   dealText: 'Existing Deal',
  //   dealDescription: 'Check the restaurant for available promotions.',

  //   neighborhood: 'Harvard Square',
  //   deals: [
  //     {
  //       dealTitle: 'Existing Deal',
  //       dealDescription: 'Check the restaurant for available promotions.',
  //       potentialSavings: {
  //         average: 'Varies',
  //         upTo: 'Varies',
  //       },
  //     },
  //   ],
  //   fullDescription:
  //     'Elevated American fare in a rustic-chic setting with craft cocktails and a lively atmosphere.',
  //   address: '14 JFK St, Cambridge, MA 02138',
  //   openingHours: {
  //     Thursday: 'Opens 11:30 AM',
  //   },
  //   phoneNumber: '(617) 500-3055',
  //   website: 'N/A',
  //   menuHighlights: [
  //     {
  //       name: 'Russell House Burger',
  //       description:
  //         'Grass-fed beef with cheddar, lettuce, tomato, and house sauce',
  //       price: '$16',
  //     },
  //     {
  //       name: 'Seared Scallops',
  //       description:
  //         'Pan-seared scallops with seasonal vegetables and citrus butter',
  //       price: '$28',
  //     },
  //     {
  //       name: 'Truffle Fries',
  //       description:
  //         'Crispy fries tossed with truffle oil, parmesan, and herbs',
  //       price: '$10',
  //     },
  //   ],
  // },
  // {
  //   id: generateRestaurantId('Waypoint'),
  //   name: 'Waypoint',
  //   image:
  //     'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   location: 'Cambridge',
  //   rating: 4.4,
  //   priceRange: '$$$',
  //   cuisine: 'Seafood',
  //   dealText: 'Existing Deal',
  //   dealDescription: 'Check the restaurant for available promotions.',

  //   neighborhood: 'Harvard Square',
  //   deals: [
  //     {
  //       dealTitle: 'Existing Deal',
  //       dealDescription: 'Check the restaurant for available promotions.',
  //       potentialSavings: {
  //         average: 'Varies',
  //         upTo: 'Varies',
  //       },
  //     },
  //   ],
  //   fullDescription:
  //     'Creative seafood and raw-bar selections, plus pizzas and pastas in a hip space.',
  //   address: '1030 Massachusetts Ave, Cambridge, MA 02138',
  //   openingHours: {
  //     Thursday: 'Opens 5:00 PM',
  //   },
  //   phoneNumber: '(617) 864-2300',
  //   website: 'N/A',
  //   menuHighlights: [
  //     {
  //       name: 'Oyster Selection',
  //       description: 'Fresh oysters served with house mignonette and lemon',
  //       price: 'Market Price',
  //     },
  //     {
  //       name: 'Lobster Pasta',
  //       description: 'Handmade pasta with lobster, saffron butter, and herbs',
  //       price: '$32',
  //     },
  //     {
  //       name: 'Wood-Fired Pizza',
  //       description:
  //         'Neapolitan-style pizza with fresh mozzarella and seasonal toppings',
  //       price: '$18',
  //     },
  //   ],
  // },
];

// Export all restaurants for the homepage
export const FEATURED_RESTAURANTS = RESTAURANTS_DATA;
