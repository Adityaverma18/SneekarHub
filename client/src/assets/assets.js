import logo from './images/logo.svg'
import slider1 from './images/slider1.jpg'
import slider2 from './images/slider2.jpg'
import slider3 from './images/slider3.jpeg'
import image1 from './images/image1.jpg'
import image2 from './images/image2.jpg'
import image3 from './images/image3.jpg'
import image4 from './images/image4.jpg'
import image5 from './images/image5.jpg'
import image6 from './images/image6.jpg'
import { Target, Heart, Zap, Award } from "lucide-react";

// src/assets/assets.js
export const assetsImage ={
  logo,image1,image2,image3,image4,image5, image6,slider1, slider2, slider3,
}



// Complete slider assets configuration

export const sliderAssets = {
  slides: [
    {
      id: 1,
      title: "Step Into Style",
      subtitle: "New Collection 2025",
      description:
        "Discover the latest collection of premium sneakers. Crafted for comfort, designed for excellence.",
      image:
        "https://images.unsplash.com/photo-1577655197898-da78ff8bed68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMG1vZGVybiUyMHNwb3J0fGVufDF8fHx8MTc1OTg0ODA2MXww&ixlib=rb-4.1.0&q=80&w=1080",
      gradient:
        "from-blue-50 via-orange-50 to-white dark:from-gray-900 dark:via-blue-950 dark:to-gray-900",
      accentColor: "orange",
    },
    {
      id: 2,
      title: "Performance Redefined",
      subtitle: "Athletic Excellence",
      description:
        "Engineered for athletes, designed for champions. Experience unmatched performance and comfort.",
      image:
        "https://images.unsplash.com/photo-1694671793811-d745b259188b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwc2hvZXMlMjByZWR8ZW58MXx8fHwxNzU5Nzk1MjkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      gradient:
        "from-red-50 via-pink-50 to-white dark:from-gray-900 dark:via-red-950 dark:to-gray-900",
      accentColor: "red",
    },
    {
      id: 3,
      title: "Urban Lifestyle",
      subtitle: "Street Style Collection",
      description:
        "Make a statement with our urban sneaker collection. Where style meets the streets.",
      image:
        "https://images.unsplash.com/photo-1628136473110-6e95a86f4b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBzbmVha2VycyUyMHVyYmFufGVufDF8fHx8MTc1OTg0OTA4MHww&ixlib=rb-4.1.0&q=80&w=1080",
      gradient:
        "from-purple-50 via-blue-50 to-white dark:from-gray-900 dark:via-purple-950 dark:to-gray-900",
      accentColor: "purple",
    },
    {
      id: 4,
      title: "Court Champions",
      subtitle: "Basketball Collection",
      description:
        "Dominate the court with our premium basketball sneakers. Engineered for peak performance.",
      image:
        "https://images.unsplash.com/photo-1710378844907-faa3b444997f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwc2hvZXMlMjBjb3VydHxlbnwxfHx8fDE3NTk4NDkwODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      gradient:
        "from-green-50 via-teal-50 to-white dark:from-gray-900 dark:via-green-950 dark:to-gray-900",
      accentColor: "green",
    },
  ],

  accentColors: {
    orange: {
      badge:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
      gradient: "from-blue-600 to-orange-500",
      glow: "from-blue-500 to-orange-500",
    },
    red: {
      badge:
        "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
      gradient: "from-red-600 to-pink-500",
      glow: "from-red-500 to-pink-500",
    },
    purple: {
      badge:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      gradient: "from-purple-600 to-blue-500",
      glow: "from-purple-500 to-blue-500",
    },
    green: {
      badge:
        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      gradient: "from-green-600 to-teal-500",
      glow: "from-green-500 to-teal-500",
    },
  },
};


// Products data
export const products = [
  {
    id: 1,
    name: 'Nike Airforce 1',
    title: "Premium Sneakers Collection",
    brand: 'Nike',
    category: 'Sneakers',
    description:
      'The Nike Air Force 1 is an icon of street style and comfort. Originally designed for basketball, this sneaker features a soft yet durable leather upper and Nike Air cushioning for all-day comfort. Its classic silhouette and versatile colorways make it perfect for both casual wear and sporty outfits.',
    price: 99.99,
    image: assetsImage.image1,
    features: [
      'Premium leather construction',
      'Air cushioning for superior comfort',
      'Perforated toe for breathability',
      'Classic low-cut design',
      'Durable rubber outsole for traction'
    ],
    colors: ['white', 'black', 'red'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10'],
    shippingInfo: 'Free standard shipping on orders above $50. Delivered within 3–5 business days.',
    reviews: [
      { user: 'Alex M.', rating: 5, comment: 'Classic style, super comfortable!' },
      { user: 'Priya S.', rating: 4, comment: 'Love them! Fit perfectly and look great.' }
    ]
  },
  {
    id: 2,
    name: 'Nike Sumo 7',
    title: "Summer Sports Footwear",
    brand: 'Nike',
    category: 'Running Shoes',
    description:
      'Built for everyday runners, the Nike Sumo 7 combines lightweight comfort with exceptional flexibility. Its breathable mesh upper keeps your feet cool, while the foam midsole provides lasting cushioning. Ideal for gym workouts, running, or casual wear.',
    price: 159.99,
    image: assetsImage.image2,
    features: [
      'Breathable mesh upper for ventilation',
      'Shock absorption midsole',
      'Flexible and lightweight sole',
      'Enhanced traction outsole for grip'
    ],
    colors: ['black', 'blue', 'gray'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    shippingInfo: 'Ships within 2 business days. Free returns within 30 days of purchase.',
    reviews: [
      { user: 'John D.', rating: 5, comment: 'Amazing comfort and lightweight feel!' },
      { user: 'Emma L.', rating: 4, comment: 'Great for workouts, color slightly darker than shown.' }
    ]
  },
  {
    id: 3,
    name: 'Adidas Flight 2',
    title: "New Arrival",
    brand: 'Adidas',
    category: 'Sports Shoes',
    description:
      'The Adidas Flight 2 is engineered for athletes who value speed and agility. With an elastic lace system, enhanced cushioning, and anti-slip sole, it offers comfort and performance for every stride. Perfect for track, gym, or streetwear.',
    price: 129.99,
    image: assetsImage.image3,
    features: [
      'Elastic quick-lace system',
      'Lightweight air cushioning',
      'Anti-slip rubber sole',
      'Reinforced toe protection'
    ],
    colors: ['white', 'red', 'black'],
    sizes: ['US 8', 'US 9', 'US 10'],
    shippingInfo: 'Delivered within 4–6 business days. Express shipping available.',
    reviews: [
      { user: 'Rohit K.', rating: 5, comment: 'Super comfortable and looks awesome!' },
      { user: 'Sophia T.', rating: 4, comment: 'Good grip and fit, perfect for my morning runs.' }
    ]
  },
  {
    id: 4,
    name: 'Puma RS-X',
    brand: 'Puma',
    category: 'Lifestyle Sneakers',
    description:
      'The Puma RS-X brings bold design and ultimate comfort together. Inspired by retro running shoes, it features vibrant colorways and a chunky silhouette. Ideal for everyday wear with a statement look.',
    price: 109.99,
    image: assetsImage.image4,
    features: [
      'Chunky retro-inspired design',
      'Soft foam cushioning',
      'Durable rubber outsole',
      'Bold color combinations'
    ],
    colors: ['yellow', 'black', 'white'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10'],
    shippingInfo: 'Standard delivery in 3–5 days. Free shipping on all orders above $75.',
    reviews: [
      { user: 'Arjun P.', rating: 4, comment: 'Love the chunky design, feels premium!' },
      { user: 'Lina M.', rating: 5, comment: 'Stylish and comfortable for all-day wear.' }
    ]
  },
  {
    id: 5,
    name: 'Reebok Zig Kinetica',
    brand: 'Reebok',
    category: 'Training Shoes',
    description:
      'The Reebok Zig Kinetica is designed for energy return and stability. Its innovative zigzag midsole absorbs impact and propels you forward, while the mesh upper ensures breathability during intense workouts.',
    price: 139.99,
    image: assetsImage.image5,
    features: [
      'Energy-return ZigTech sole',
      'Breathable mesh upper',
      'Responsive cushioning',
      'Supportive heel design'
    ],
    colors: ['blue', 'gray'],
    sizes: ['US 6', 'US 7', 'US 8', 'US 9'],
    shippingInfo: 'Free delivery and 30-day returns. Ships in eco-friendly packaging.',
    reviews: [
      { user: 'Noah B.', rating: 5, comment: 'Super bouncy sole, perfect for training!' },
      { user: 'Kavya N.', rating: 4, comment: 'Comfortable but runs a bit large.' }
    ]
  },
  {
    id: 6,
    name: 'New Balance 327',
    brand: 'New Balance',
    category: 'Casual Shoes',
    description:
      'Retro-inspired yet built for modern comfort, the New Balance 327 combines vintage style with a cushioned midsole and durable outsole. Great for everyday wear with jeans or activewear.',
    price: 119.99,
    image: assetsImage.image6,
    features: [
      'Retro-inspired design',
      'Cushioned EVA midsole',
      'Durable traction outsole',
      'Lightweight comfort fit'
    ],
    colors: ['green', 'orange', 'black'],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11'],
    shippingInfo: 'Ships within 3–4 days. Free returns and exchanges.',
    reviews: [
      { user: 'David S.', rating: 5, comment: 'Looks stylish and feels great!' },
      { user: 'Mira J.', rating: 4, comment: 'Perfect casual sneakers for everyday wear.' }
    ]
  },
  {
    id: 7,
    name: 'Nike Air Max 270',
    brand: 'Nike',
    category: 'Running Shoes',
    description:
      'The Nike Air Max 270 offers iconic Air cushioning for a soft, responsive ride. Its lightweight upper and large air unit provide style and comfort that lasts all day. Ideal for lifestyle wear or workouts.',
    price: 149.99,
    image: assetsImage.image1,
    features: [
      'Visible Air unit in heel',
      'Lightweight mesh construction',
      'Padded collar for comfort',
      'Durable traction outsole'
    ],
    colors: ['black', 'white', 'yellow'], // Volt replaced with yellow
    sizes: ['US 6', 'US 8', 'US 10', 'US 12'],
    shippingInfo: 'Express shipping available. Delivered in 2–5 business days.',
    reviews: [
      { user: 'Yash R.', rating: 5, comment: 'Extremely comfy and stylish!' },
      { user: 'Olivia G.', rating: 4, comment: 'Perfect for walking, slightly snug fit.' }
    ]
  },
  {
    id: 8,
    name: 'Adidas Ultraboost 22',
    brand: 'Adidas',
    category: 'Performance Running',
    description:
      'Experience ultimate energy return with the Adidas Ultraboost 22. Featuring a Primeknit upper and Boost cushioning, it delivers unmatched comfort and performance whether you’re running or walking.',
    price: 179.99,
    image: assetsImage.image2,
    features: [
      'Primeknit upper for adaptive fit',
      'Boost midsole for energy return',
      'Torsion system for stability',
      'Continental rubber outsole for grip'
    ],
    colors: ['black', 'white'], // Core Black -> black, Cloud White -> white
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    shippingInfo: 'Free worldwide shipping on all Ultraboost models. Delivered within 5–7 business days.',
    reviews: [
      { user: 'Harsh M.', rating: 5, comment: 'The best running shoes I’ve ever owned!' },
      { user: 'Alicia K.', rating: 5, comment: 'Perfect cushioning, worth every penny.' }
    ]
  }
];


export const assets = {products};
export const searchSuggestions = products.map(product => product.name);

export const aboutData = {
  hero: {
    title: "About Snekar Hub",
    subtitle: " We're more than just a sneaker store. We're a community of enthusiasts, collectors, and casual wearers who believe that the right pair of shoes can change your day, your style, and your confidence."
  },
  history: {
    title: "How It All Began",
    content: [
      "Founded in 2020, Sneekar Hub started with a simple mission: to make premium sneakers accessible to everyone. What began as a small online store has grown into a thriving community of sneaker lovers.",
      "We believe that sneakers are more than just footwear – they're a form of self-expression, a piece of culture, and a statement of who you are. That's why we carefully curate our collection to include everything from classic designs to the latest releases.",
      "Today, we're proud to serve customers worldwide, offering authentic products, competitive prices, and exceptional customer service that keeps people coming back."
    ],
    imageKey: "slider1"
  },
  stats : [
  { value: "50K+", label: "Happy Customers" },
  { value: "200+", label: "Sneaker Brands" },
  { value: "10K+", label: "Products Sold" },
  { value: "98%", label: "Satisfaction Rate" }
  ],
  values: [
  { icon: Target, title: "Quality First", description: "We source only authentic sneakers..." },
  { icon: Heart, title: "Customer Focused", description: "Your satisfaction is our priority." },
  { icon: Zap, title: "Fast Delivery", description: "Quick processing and shipping..." },
  { icon: Award, title: "Expert Curation", description: "Hand-picked collections..." }
],
  mission: {
    title: "Our Mission",
    points: [
      "Providing authentic, curated sneakers",
      "Competitive prices with no hidden markups",
      "Exceptional customer service",
      "Sustainable footwear practices"
    ],
    imageKey: "slider2"
  },
  team: [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Sneaker collector with 15+ years experience"
    },
    {
      name: "Sarah Miller",
      role: "Head of Operations",
      bio: "Ensures perfect order delivery"
    },
    {
      name: "Jamal Williams",
      role: "Lead Curator",
      bio: "Our resident sneaker expert who selects every pair."
    },
    {
      name: "Emma Davis",
      role: "Customer Experience",
      bio: "Here to help with any questions you have."
    },
    {
      name: "Chris Taylor",
      role: "Marketing Director",
      bio: "Brings you the hottest drops and best deals."
    },
    {
      name: "You",
      role: "The Sneekrr Community",
      bio: "The reason we do what we do every day."
    }
  ]
};


// src/assets/footerAssets.js
export const footerAssets = {
  company: {
    name: "Sneekar Hub",
    description: "Quality products at affordable prices. We make shopping easy and enjoyable for everyone.",
    logo  : assetsImage.logo,
    logoAlt: "ShopEasy company logo"
  },
  links: {
    myaccount: [
      {text: "Order Status", url: '/orderStatus'},
      {text: "Saved Products", url: '/savedProduct'},
      {text: "My Returns", url: '/myReturn'},
    ],
    shop: [
      { text: "New Arrivals", url: "/new-arrivals" },
      { text: "Best Sellers", url: "/best-sellers" },
      { text: "Deals & Promotions", url: "/deals" },
      { text: "Gift Cards", url: "/gift-cards" }
    ],
    customerService: [
      { text: "Contact Us", url: "/contact" },
      { text: "FAQs", url: "/faq" },
      { text: "Shipping Policy", url: "/shipping" },
      { text: "Returns & Exchanges", url: "/returns" }
    ]
  },
  socialMedia: [
    { name: "Instagram", icon: "instagram", url: "https://instagram.com/sneekrr" },
    { name: "Twitter", icon: "twitter", url: "https://twitter.com/sneekrr" },
    { name: "Facebook", icon: "facebook", url: "https://facebook.com/sneekrr" },
  ],
  fallbackImages: {
    logo: "https://placehold.co/40x40",
    social: "https://placehold.co/24x24"
  }
};

// src/assets/assets.js
export const contactData = {
  pageTitle: "Contact Us",
  pageSubtitle: "We'd love to hear from you",
  contactMethods: [
    {
      title: "Customer Support",
      description: "Our team is here to help with any questions",
      icon: "support",
      details: [
        { label: "Email", value: "support@sneekrr.com" },
        { label: "Phone", value: "+1 (555) 123-4567" },
        { label: "Hours", value: "Mon-Fri: 9AM-6PM EST" }
      ]
    },
    {
      title: "Visit Our Store",
      description: "See our products in person",
      icon: "store",
      details: [
        { label: "Address", value: "123 Sneaker Street, Footwear City, FC 10001" },
        { label: "Hours", value: "Mon-Sat: 10AM-8PM, Sun: 11AM-6PM" }
      ]
    },
    {
      title: "Business Inquiries",
      description: "For partnerships and wholesale",
      icon: "business",
      details: [
        { label: "Email", value: "biz@sneekrr.com" },
        { label: "Phone", value: "+1 (555) 987-6543" }
      ]
    }
  ],
  socialMedia: [
    { name: "Instagram", icon: "instagram", url: "https://instagram.com/sneekrr" },
    { name: "Twitter", icon: "twitter", url: "https://twitter.com/sneekrr" },
    { name: "Facebook", icon: "facebook", url: "https://facebook.com/sneekrr" },
    { name: "TikTok", icon: "tiktok", url: "https://tiktok.com/@sneekrr" }
  ],
  faqs: [
    {
      question: "How can I track my order?",
      answer: "You'll receive a tracking number via email once your order ships."
    },
    {
      question: "What's your return policy?",
      answer: "We accept returns within 30 days of purchase for unworn items."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes! We ship worldwide with various delivery options."
    }
  ],
  formFields: [
    { id: "name", label: "Full Name", type: "text", required: true },
    { id: "email", label: "Email Address", type: "email", required: true },
    { id: "phone", label: "Phone Number", type: "tel" },
    { id: "subject", label: "Subject", type: "text" },
    { id: "message", label: "Message", type: "textarea", required: true }
  ]
};

// Vision Section Assets
export const visionAssets = {
  mainVision: {
    title: "Revolutionizing Sneaker Culture",
    description: "We're not just selling shoes - we're building a community where style meets authenticity, where every step tells a story, and where sneaker enthusiasts find their perfect match."
  },
  
  projectStory: {
    title: "Our Project Story",
    content: [
      "What started as a college dorm room passion project has evolved into something extraordinary. We noticed a gap in the market - authentic sneaker lovers were struggling to find genuine, limited-edition releases without paying inflated reseller prices.",
      "Our mission became clear: create a platform that connects sneaker enthusiasts with the shoes they love, while maintaining authenticity and fair pricing. We're not just another e-commerce site; we're a community-driven marketplace built by sneakerheads, for sneakerheads.",
      "Today, Sneekrr represents the intersection of technology and street culture, where cutting-edge web development meets the timeless appeal of premium footwear."
    ],
    highlights: [
      "100% Authentic Products Guaranteed",
      "Direct Partnerships with Major Brands", 
      "Community-Driven Reviews & Ratings",
      "Exclusive Early Access to Limited Drops",
      "Sustainable Packaging & Shipping",
      "24/7 Customer Support from Sneaker Experts"
    ]
  },

  visionCards: [
    {
      icon: "🚀",
      title: "Innovation First",
      description: "Leveraging the latest technology to create seamless shopping experiences. From AI-powered recommendations to AR try-on features, we're always pushing boundaries."
    },
    {
      icon: "🤝",
      title: "Community Driven",
      description: "Built by sneaker enthusiasts for sneaker enthusiasts. Every feature, every partnership, every decision is made with our community's passion in mind."
    },
    {
      icon: "🌱",
      title: "Sustainable Future",
      description: "Committed to environmental responsibility through eco-friendly packaging, carbon-neutral shipping, and partnerships with sustainable brands."
    }
  ],

  stats: [
    {
      number: "50K+",
      label: "Happy Customers"
    },
    {
      number: "500+",
      label: "Sneaker Models"
    },
    {
      number: "99.9%",
      label: "Authenticity Rate"
    },
    {
      number: "24/7",
      label: "Customer Support"
    }
  ],

  futureGoals: [
    {
      title: "Global Expansion",
      description: "Bringing authentic sneaker culture to sneaker enthusiasts worldwide with localized experiences and regional partnerships."
    },
    {
      title: "AR Technology Integration", 
      description: "Implementing cutting-edge AR technology so customers can virtually try on sneakers before purchasing, reducing returns and increasing satisfaction."
    },
    {
      title: "Sustainability Initiative",
      description: "Achieving carbon-neutral operations and partnering with eco-conscious brands to promote sustainable fashion in the sneaker industry."
    },
    {
      title: "Community Platform",
      description: "Building a social platform where sneaker enthusiasts can share collections, trade rare finds, and connect with fellow collectors globally."
    }
  ]
};


