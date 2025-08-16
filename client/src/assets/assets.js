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

// src/assets/assets.js
export const assetsImage ={
  logo,image1,image2,image3,image4,image5, image6,slider1, slider2, slider3,
}



// Complete slider assets configuration
export const sliderAssets = {
  slides: [
    {
      id: 1,
      title: "Premium Sneakers Collection",
      subtitle: "Limited Edition Releases",
      cta: "Shop Now",
      alt: "Featured sneakers with urban background",
      featuredProduct: "Nike Airforce 1"
    },
    {
      id: 2,
      title: "Summer Sports Footwear",
      subtitle: "Up to 30% off running shoes", 
      cta: "Explore Deals",
      alt: "Athletic shoes on basketball court",
      featuredProduct: "Nike Sumo 7"
    },
   
    {
      id: 3,
      title: "New Arrival",
      subtitle: "The wait is over",
      cta:"Buy now",
      alt: "Light and Comfy",
      featuredProduct: "Addidas Flight 2"
    },
  ],
  
  settings: {
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds
    infinite: true,
    showArrows: true,
    showDots: true,
    transitionSpeed: 500 // milliseconds
  },
  
  styles: {
    height: "28rem", // Tailwind h-96 = 28rem
    textColor: "text-white",
    buttonStyle: "bg-blue-600 hover:bg-blue-700",
    overlay: "bg-black bg-opacity-40"
  },
  
  fallbacks: {
    image: "https://placehold.co/1920x1080",
    logo: "https://placehold.co/40x40"
  }
};

// Products data
export const products = [
  {
    id: 1,
    name: 'Nike Airforce 1',
    title: "Premium Sneakers Collection",
    description: 'Comfortable running shoes',
    price: 99.99,
    image: assetsImage.image1,
    features: [
      'Breathable mesh upper',
      'Air cushioning',
      'Lightweight design'
    ],
    colors: ['White', 'Black', 'Red'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10']
  },
  {
    id: 2,
    name: 'Nike Sumo 7',
    title: "Summer Sports Footwear",
    description: 'Light Weight',
    price: 159.99,
    image: assetsImage.image2,
    features: [
      'Breathable mesh',
      'Shock absorption',
      'Flexible sole'
    ],
    colors: ['Black', 'Blue', 'Gray'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']
  },
  {
    id: 3,
    name: 'Addidas Flight 2',
    title: "New Arrival",
    description: 'Track ready shoes',
    price: 129.99,
    image: assetsImage.image3,
    features: [
      'Elastic laces',
      'Air cushioning',
      'Anti-slip sole'
    ],
    colors: ['White', 'Red', 'black'],
    sizes: ['US 8', 'US 9', 'US 10']
  },
  {
    id: 4,
    name: 'Puma RS-X',
    description: 'Bold style meets ultimate comfort',
    price: 109.99,
    image: assetsImage.image4,
    features: ['Chunky design', 'Bold colorway', 'Rubber outsole'],
    colors: ['Yellow', 'Black', 'White'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10']
  },
  {
    id: 5,
    name: 'Reebok Zig Kinetica',
    description: 'Built for energy return and stability',
    price: 139.99,
    image: assetsImage.image5,
    features: ['Energy return sole', 'Mesh upper', 'Stylish silhouette'],
    colors: ['Blue', 'Gray'],
    sizes: ['US 6', 'US 7', 'US 8', 'US 9']
  },
  {
    id: 6,
    name: 'New Balance 327',
    description: 'Retro vibes with modern comfort',
    price: 119.99,
    image: assetsImage.image6,
    features: ['Retro design', 'Cushioned midsole', 'Durable outsole'],
    colors: ['Green', 'Orange', 'Black'],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11']
  },
  {
    id: 7,
    name: 'Nike Air Max 270',
    description: 'Iconic air bubble comfort',
    price: 149.99,
    image: assetsImage.image1,
    features: ['Visible Air unit', 'Sleek look', 'Everyday wear'],
    colors: ['Black', 'White', 'Volt'],
    sizes: ['US 6', 'US 8', 'US 10', 'US 12']
  },
  {
    id: 8,
    name: 'Adidas Ultraboost 22',
    description: 'Performance and style in one',
    price: 179.99,
    image: assetsImage.image2,
    features: ['Primeknit upper', 'Boost cushioning', 'Running optimized'],
    colors: ['Core Black', 'Cloud White'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']
  }
];
export const assets = {products};
export const searchSuggestions = products.map(product => product.name);

export const aboutData = {
  hero: {
    title: "Our Story",
    subtitle: "From a small sneaker collection to your favorite footwear destination"
  },
  history: {
    title: "How It All Began",
    content: [
      "Founded in 2018, Sneekrr started as a passion project between college friends...",
      "We noticed how hard it was to find authentic sneakers without crazy prices...",
      "Today, we serve thousands worldwide while staying true to our roots..."
    ],
    imageKey: "slider1"
  },
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


