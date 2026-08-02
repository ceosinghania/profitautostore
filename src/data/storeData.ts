import { ProductCategory, Product, StoreLocation, FranchiseTier, ServiceItem, ProcessStep, Testimonial, BlogPost } from '../types';

export const BRAND_PARTNERS = [
  { name: 'Castrol', logoText: 'Castrol', category: 'Lubricants', tag: 'Official Engine Oil Partner' },
  { name: 'Mobil 1', logoText: 'Mobil 1', category: 'Lubricants', tag: 'Synthetic Lubrication' },
  { name: 'Shell', logoText: 'Shell Helix', category: 'Lubricants', tag: 'Active Cleansing' },
  { name: 'Bosch', logoText: 'BOSCH', category: 'Spare Parts & Filters', tag: 'German Precision Engineering' },
  { name: 'Exide', logoText: 'EXIDE', category: 'Batteries', tag: 'Long Life Battery Technology' },
  { name: 'Amaron', logoText: 'AMARON', category: 'Batteries', tag: 'Lasts Long, Really Long' },
  { name: '3M Automotive', logoText: '3M Car Care', category: 'Detailing & Protection', tag: 'World-Class Detailing' },
  { name: 'Meguiar\'s', logoText: 'Meguiar\'s', category: 'Car Care', tag: 'Mirror Glaze Finish' },
  { name: 'SONAX', logoText: 'SONAX', category: 'Car Care', tag: 'German Car Polish Technology' },
  { name: 'Liqui Moly', logoText: 'LIQUI MOLY', category: 'Additives & Oils', tag: 'Engine Protection' },
  { name: 'JK Tyre', logoText: 'JK TYRE', category: 'Tyres & Alloys', tag: 'Steel Radial Tech' },
  { name: 'MRF', logoText: 'MRF', category: 'Tyres & Alloys', tag: 'Tyres With Muscle' },
  { name: 'CEAT', logoText: 'CEAT', category: 'Tyres & Alloys', tag: 'Superior Road Grip' },
  { name: 'Bridgestone', logoText: 'BRIDGESTONE', category: 'Tyres & Alloys', tag: 'Premium Performance' },
  { name: 'Osram', logoText: 'OSRAM', category: 'Lighting', tag: 'German Automotive Lighting' },
  { name: 'Philips', logoText: 'PHILIPS', category: 'Lighting', tag: 'Ultra White LED Tech' }
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'lubricants',
    title: 'Lubricants & Fluids',
    subtitle: 'Engine Oil, Gear Oil, Coolants & Brake Fluid',
    iconName: 'Droplet',
    image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80',
    itemCount: 140,
    subcategories: ['Engine Oil', 'Gear Oil', 'Hydraulic Oil', 'Coolants', 'Grease', 'Transmission Oil', 'Brake Fluid'],
    featuredProducts: [
      {
        id: 'lub-1',
        name: 'Castrol EDGE 5W-40 Advanced Full Synthetic Engine Oil 3.5L',
        category: 'Lubricants',
        brand: 'Castrol',
        price: 3450,
        originalPrice: 4200,
        rating: 4.9,
        reviewsCount: 320,
        image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80',
        description: 'Fluid TITANIUM Technology transforms under pressure to keep metal apart and reduce friction for maximum engine performance.',
        specifications: { 'Viscosity': '5W-40', 'Volume': '3.5 Liters', 'API Service': 'SP / SN PLUS', 'Vehicle Type': 'Petrol & Diesel Cars' },
        compatibility: ['Hyundai Creta', 'Tata Nexon', 'Mahindra Thar', 'Kia Seltos', 'Toyota Fortuner', 'Maruti Swift'],
        inStock: true,
        isPopular: true,
        warranty: '100% Genuine Guaranteed'
      },
      {
        id: 'lub-2',
        name: 'Mobil 1 ESP 0W-30 Premium Synthetic Motor Oil 4L',
        category: 'Lubricants',
        brand: 'Mobil 1',
        price: 4890,
        originalPrice: 5600,
        rating: 4.95,
        reviewsCount: 210,
        image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80',
        description: 'Engineered for exceptional cleaning power, wear protection and overall performance in modern luxury vehicles.',
        specifications: { 'Viscosity': '0W-30', 'Volume': '4.0 Liters', 'Approval': 'BMW Longlife-04, MB-Approval 229.52', 'Type': 'Full Synthetic' },
        compatibility: ['BMW 3 Series', 'Audi A4', 'Mercedes C-Class', 'Volkswagen Tiguan', 'Skoda Octavia'],
        inStock: true,
        isPopular: true,
        warranty: 'Official Brand Warranty'
      }
    ]
  },
  {
    id: 'batteries',
    title: 'Batteries & Inverters',
    subtitle: 'Car, Bike, Truck & Heavy Duty Lithium Batteries',
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    itemCount: 95,
    subcategories: ['Car Battery', 'Bike Battery', 'Truck Battery', 'Inverter Battery', 'Lithium Ion Battery'],
    featuredProducts: [
      {
        id: 'bat-1',
        name: 'Exide Epiq DIN60 Advanced Maintenance-Free Car Battery',
        category: 'Batteries',
        brand: 'Exide',
        price: 6850,
        originalPrice: 8100,
        rating: 4.8,
        reviewsCount: 540,
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
        description: '72 Months Warranty. High cranking power with robust grid technology designed for demanding Indian road conditions.',
        specifications: { 'Capacity': '60 Ah', 'Voltage': '12V', 'Warranty': '72 Months (36 F + 36 P)', 'Technology': 'PUNCH Grid Alloy' },
        compatibility: ['Hyundai Creta', 'Maruti Baleno', 'Tata Harrier', 'Kia Carens', 'Honda City'],
        inStock: true,
        isPopular: true,
        warranty: '72 Months Brand Warranty'
      },
      {
        id: 'bat-2',
        name: 'Amaron Flo AAM-FL-550114042 (DIN50) Zero Maintenance Battery',
        category: 'Batteries',
        brand: 'Amaron',
        price: 5950,
        originalPrice: 6900,
        rating: 4.9,
        reviewsCount: 680,
        image: 'https://images.unsplash.com/photo-1600792880447-0e6e76cfeb59?auto=format&fit=crop&w=800&q=80',
        description: 'SilverX alloy technology prevents corrosion and provides highest cold cranking amps for instant start every time.',
        specifications: { 'Capacity': '50 Ah', 'Voltage': '12V', 'Warranty': '60 Months', 'Terminal': 'Left Layout' },
        compatibility: ['Maruti Swift', 'Hyundai i20', 'Tata Punch', 'Renault Triber'],
        inStock: true,
        isPopular: true,
        warranty: '60 Months Replacement Warranty'
      }
    ]
  },
  {
    id: 'accessories',
    title: 'Automobile Accessories',
    subtitle: 'Android Stereo, LED Lighting, Dash Cams & Mats',
    iconName: 'Tv',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    itemCount: 380,
    subcategories: ['Android Stereo', 'LED Lights', 'Fog Lamps', 'Music Systems', 'Reverse Camera', 'Dash Camera', 'Floor Mats', 'Steering Covers'],
    featuredProducts: [
      {
        id: 'acc-1',
        name: 'PROFIT UltraHD 10.1" Android 13 Car Infotainment System (4GB+64GB)',
        category: 'Automobile Accessories',
        brand: 'PROFIT Signature',
        price: 18900,
        originalPrice: 24500,
        rating: 4.95,
        reviewsCount: 410,
        image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
        description: 'QLED 2.5D Curved Touchscreen, Wireless Apple CarPlay & Android Auto, 360-degree Camera Support, Built-in DSP Equalizer.',
        specifications: { 'Display': '10.1 Inch QLED 1280x720', 'RAM/ROM': '4GB RAM / 64GB Storage', 'Connectivity': 'Wireless CarPlay / Android Auto / 4G SIM Slot', 'Audio': '45W x 4 DSP Output' },
        compatibility: ['Universal Fit for all Cars with Double DIN Frame'],
        inStock: true,
        isPopular: true,
        warranty: '2 Years Doorstep Replacement'
      },
      {
        id: 'acc-2',
        name: '4K Ultra Dual Dash Camera with GPS Night Vision & Parking Monitor',
        category: 'Automobile Accessories',
        brand: 'PROFIT Tech',
        price: 9450,
        originalPrice: 12900,
        rating: 4.88,
        reviewsCount: 290,
        image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
        description: 'Front 4K UHD + Rear 1080P recording with Sony STARVIS sensor, G-Sensor Emergency Lock, and Mobile App WiFi connectivity.',
        specifications: { 'Resolution': '4K 2160P Front + 1080P Rear', 'Sensor': 'Sony STARVIS IMX415', 'Feature': 'WiFi + GPS + 24H Park Guard', 'Storage': 'Up to 256GB MicroSD' },
        compatibility: ['Universal for all Vehicles'],
        inStock: true,
        isPopular: true,
        warranty: '1 Year Full Replacement Warranty'
      }
    ]
  },
  {
    id: 'spare-parts',
    title: 'Genuine Spare Parts',
    subtitle: 'Brake Pads, Discs, Clutch Plates & Suspension',
    iconName: 'Cog',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    itemCount: 650,
    subcategories: ['Brake Pads', 'Brake Disc', 'Clutch Plates', 'Shock Absorbers', 'Bearings', 'Suspension Parts', 'Engine Components', 'Electrical Parts'],
    featuredProducts: [
      {
        id: 'sp-1',
        name: 'Bosch High Performance Front Ceramic Brake Pad Set',
        category: 'Spare Parts',
        brand: 'Bosch',
        price: 2850,
        originalPrice: 3400,
        rating: 4.85,
        reviewsCount: 430,
        image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
        description: 'Low-dust ceramic formula engineered for silent braking, smooth pedal response, and extended disc rotor life.',
        specifications: { 'Material': 'Advanced Ceramic Matrix', 'Noise Shim': 'Multi-layer Rubber Core Shim', 'Position': 'Front Axle Set', 'Certification': 'ECE R90 Certified' },
        compatibility: ['Hyundai Creta', 'Kia Seltos', 'Hyundai Verna', 'Tata Nexon'],
        inStock: true,
        isPopular: true,
        warranty: 'Official Bosch Warranty'
      }
    ]
  },
  {
    id: 'filters',
    title: 'Automotive Filters',
    subtitle: 'Oil, Air, Fuel & Anti-Allergen Cabin Filters',
    iconName: 'Filter',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    itemCount: 210,
    subcategories: ['Oil Filter', 'Air Filter', 'Fuel Filter', 'Cabin Filter', 'Transmission Filter'],
    featuredProducts: [
      {
        id: 'flt-1',
        name: 'Mann-Filter HEPA PM2.5 Anti-Bacterial Cabin Air Filter',
        category: 'Filters',
        brand: 'Bosch / Mann-Filter',
        price: 1150,
        originalPrice: 1500,
        rating: 4.9,
        reviewsCount: 310,
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
        description: 'Blocks 99.9% of dust particles, smog, bacteria, pollen and odors to keep the cabin air pure and allergy-free.',
        specifications: { 'Layering': '4-Stage Activated Carbon + Biofunctional Layer', 'Efficiency': 'PM2.5 Purification', 'Filter Code': 'FP 26 009' },
        compatibility: ['Toyota Fortuner', 'Innova Crysta', 'Mahindra XUV700', 'Tata Safari'],
        inStock: true,
        isPopular: true,
        warranty: '100% OEM Fit Guarantee'
      }
    ]
  },
  {
    id: 'car-care',
    title: 'Car Care & Detailing',
    subtitle: 'Ceramic Coating, Polish, Foam Wash & Microfiber',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
    itemCount: 180,
    subcategories: ['Foam Wash', 'Wax Polish', 'Ceramic Coating', 'Interior Cleaner', 'Tyre Polish', 'Dashboard Polish', 'Glass Cleaner', 'Microfiber Cloth'],
    featuredProducts: [
      {
        id: 'cc-1',
        name: '3M Auto Care Ceramic Coating 9H Hardness Protection Kit (50ml)',
        category: 'Car Care Products',
        brand: '3M Automotive',
        price: 7490,
        originalPrice: 9900,
        rating: 4.95,
        reviewsCount: 180,
        image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
        description: 'Extreme hydrophobic gloss effect, anti-scratch 9H nano-crystal coat protecting paint from UV rays, bird droppings & chemical stains for 3 years.',
        specifications: { 'Hardness': '9H Pencil Hardness', 'Durability': '3 Years Active Shield', 'Water Contact Angle': '115 Degrees Hydrophobic', 'Includes': 'Coating bottle, Applicator pad, Suede cloth, Microfiber' },
        compatibility: ['All Car & Bike Painted Surfaces'],
        inStock: true,
        isPopular: true,
        warranty: '3 Years Gloss Protection Warranty'
      }
    ]
  },
  {
    id: 'seat-covers',
    title: 'Luxury Seat Covers',
    subtitle: 'Nappa Leather, Custom Stitch & Breathable Fabric',
    iconName: 'Armchair',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    itemCount: 160,
    subcategories: ['Luxury Leather', 'Fabric', 'Custom Stitch', 'Premium Designs', 'Ventilated Covers'],
    featuredProducts: [
      {
        id: 'sc-1',
        name: 'PROFIT Royal Diamond Nappa Leatherette Custom Seat Cover Set',
        category: 'Seat Covers',
        brand: 'PROFIT Luxury',
        price: 12500,
        originalPrice: 16000,
        rating: 4.9,
        reviewsCount: 260,
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
        description: 'Bucket fitting custom crafted Nappa leatherette with breathable high-density memory foam padding, double diamond quilting and side airbag compatibility.',
        specifications: { 'Material': 'Ultra-Soft German Nappa Leatherette', 'Thickness': '14mm High Resilience Foam', 'Safety': 'Deployable Side Airbag Seam', 'Customization': '12 Color Stitch Variations' },
        compatibility: ['Custom Tailored for Any Specific Car Model'],
        inStock: true,
        isPopular: true,
        warranty: '3 Years Fade & Tear Warranty'
      }
    ]
  },
  {
    id: 'alloy-wheels',
    title: 'Alloy Wheels & Tyres',
    subtitle: 'Sports Alloys, Forged Wheels & Performance Tyres',
    iconName: 'Disc',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    itemCount: 120,
    subcategories: ['Luxury Wheels', 'Performance Wheels', 'Sports Wheels', 'Premium Finish', 'All-Terrain Wheels'],
    featuredProducts: [
      {
        id: 'aw-1',
        name: 'PROFIT Apex 17" Matte Black Gloss Lip Alloy Wheel Set (Set of 4)',
        category: 'Alloy Wheels',
        brand: 'PROFIT Alloys',
        price: 38500,
        originalPrice: 46000,
        rating: 4.92,
        reviewsCount: 140,
        image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
        description: 'Lightweight flow-formed aluminum alloy construction offering superior heat dissipation, enhanced braking agility and aggressive sport design.',
        specifications: { 'Rim Diameter': '17 Inch', 'PCD': '5x114.3', 'Width': '7.5J', 'Finish': 'Satin Matte Black + Red Ring Accent' },
        compatibility: ['Hyundai Creta', 'Kia Seltos', 'Mahindra Thar', 'MG Hector', 'Tata Harrier'],
        inStock: true,
        isPopular: true,
        warranty: '5 Years Structural Warranty'
      }
    ]
  },
  {
    id: 'modification',
    title: 'Vehicle Modification',
    subtitle: 'Body Kits, Spoilers, Lighting & Performance Upgrade',
    iconName: 'Flame',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    itemCount: 110,
    subcategories: ['Body Kits', 'Spoilers', 'Lighting Upgrade', 'Performance Upgrade', 'Suspension Upgrade', 'Custom Styling'],
    featuredProducts: [
      {
        id: 'mod-1',
        name: 'Urban Legend Wide Body Kit with Rear Diffuser & LED Matrix Lights',
        category: 'Vehicle Modification',
        brand: 'PROFIT Works',
        price: 42000,
        originalPrice: 55000,
        rating: 4.96,
        reviewsCount: 95,
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
        description: 'Aggressive sport styling crafted from lightweight ABS polymer with integrated daytime running light bars and quad exhaust tip cutouts.',
        specifications: { 'Material': 'Virgin Automotive Grade ABS Polymer', 'Finish': 'Primer Coated ready for custom paint matching', 'Includes': 'Front Bumper Lip, Side Skirts, Rear Diffuser, Tail Spoiler' },
        compatibility: ['Mahindra Thar', 'Tata Nexon', 'Hyundai Creta', 'Volkswagen Polo'],
        inStock: true,
        isPopular: true,
        warranty: '2 Years Custom Work Warranty'
      }
    ]
  },
  {
    id: 'garage-equipment',
    title: 'Garage Equipment & Tools',
    subtitle: 'Hydraulic Lifts, Diagnostic Scanners & Mechanic Tools',
    iconName: 'Wrench',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    itemCount: 85,
    subcategories: ['Hydraulic Lifts', 'Air Compressors', 'Diagnostic Tools', 'Wheel Alignment Machines', 'Tool Kits'],
    featuredProducts: [
      {
        id: 'ge-1',
        name: 'PROFIT Master Mechanic 186-Piece Tool Kit with Heavy Duty Cabinet',
        category: 'Garage Equipment',
        brand: 'PROFIT Pro Tools',
        price: 24900,
        originalPrice: 32000,
        rating: 4.88,
        reviewsCount: 110,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        description: 'Chrome Vanadium steel sockets, ratchets, torque wrenches and pneumatic impact guns housed in a powder-coated rolling tool chest.',
        specifications: { 'Steel Grade': 'Chrome Vanadium Cr-V', 'Drive Sizes': '1/4", 3/8", 1/2" Ratchets', 'Cabinet': '5 Drawer Ball Bearing Slide Chest' },
        compatibility: ['Professional Workshop & DIY Enthusiasts'],
        inStock: true,
        isPopular: false,
        warranty: 'Lifetime Tool Replacement'
      }
    ]
  },
  {
    id: 'helmets-rider',
    title: 'Rider Gear & Helmets',
    subtitle: 'ISI Certified Helmets, Riding Jackets & Accessories',
    iconName: 'ShieldAlert',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    itemCount: 140,
    subcategories: ['Full Face Helmets', 'Open Face Helmets', 'Premium Riding Gear', 'Riding Gloves', 'Chain Lube'],
    featuredProducts: [
      {
        id: 'hl-1',
        name: 'Axor Apex Venom ECE 22.06 & DOT Certified Full Face Helmet',
        category: 'Helmets & Rider Gear',
        brand: 'Axor / Studds',
        price: 4950,
        originalPrice: 5800,
        rating: 4.9,
        reviewsCount: 280,
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
        description: 'Dual visor configuration with anti-fog Pinlock 30 lens, aerodynamic spoiler and removable washable hypoallergenic inner liners.',
        specifications: { 'Certification': 'ECE R22.06 & ISI Certified', 'Visor': 'UV Resistant Anti-Scratch', 'Weight': '1500g +- 50g' },
        compatibility: ['Universal Bike Riders'],
        inStock: true,
        isPopular: true,
        warranty: '1 Year Manufacturer Warranty'
      }
    ]
  }
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'store-delhi',
    name: 'Profit Automobile Store - Delhi NCR Flagship',
    city: 'New Delhi',
    state: 'Delhi',
    address: 'Okhla Industrial Area, New Delhi - 110020',
    phone: 'Info@profitautostore.in',
    email: 'Info@profitautostore.in',
    timing: '09:00 AM - 09:00 PM (Open 7 Days)',
    coordinates: { lat: 28.5355, lng: 77.2610 },
    servicesAvailable: ['Full Product Store', 'Hydraulic Lift Workshop', 'Ceramic Detailing Studio', 'Wheel Alignment', 'Battery Replacement Station'],
    isFlagship: true
  },
  {
    id: 'store-mumbai',
    name: 'Profit Automobile Store - Mumbai Mega Hub',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Goregaon West, Mumbai - 400104',
    phone: 'Info@profitautostore.in',
    email: 'Info@profitautostore.in',
    timing: '09:30 AM - 09:30 PM (Open 7 Days)',
    coordinates: { lat: 19.1663, lng: 72.8526 },
    servicesAvailable: ['Full Accessories Range', 'Performance Modification Studio', 'Audio Fitting', 'Car Spa'],
    isFlagship: true
  },
  {
    id: 'store-bengaluru',
    name: 'Profit Automobile Store - Bengaluru Tech Hub',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: 'Marathahalli, Bengaluru - 560037',
    phone: 'Info@profitautostore.in',
    email: 'Info@profitautostore.in',
    timing: '09:00 AM - 09:00 PM (Open 7 Days)',
    coordinates: { lat: 12.9569, lng: 77.7011 },
    servicesAvailable: ['Spare Parts Hub', 'Android Stereo & Electronics Center', 'Detailing Bay', 'EV Charging Support'],
    isFlagship: true
  },
  {
    id: 'store-hyderabad',
    name: 'Profit Automobile Store - Hyderabad Center',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Jubilee Hills, Hyderabad - 500033',
    phone: 'Info@profitautostore.in',
    email: 'Info@profitautostore.in',
    timing: '09:30 AM - 09:00 PM (Open 7 Days)',
    coordinates: { lat: 17.4325, lng: 78.4071 },
    servicesAvailable: ['Accessories', 'Spare Parts', 'Oil Change Station', 'Alloy Wheel Fitting'],
    isFlagship: false
  },
  {
    id: 'store-jaipur',
    name: 'Profit Automobile Store - Jaipur Express Outlet',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'Tonk Road, Jaipur - 302018',
    phone: 'Info@profitautostore.in',
    email: 'Info@profitautostore.in',
    timing: '09:00 AM - 08:30 PM',
    coordinates: { lat: 26.8521, lng: 75.8052 },
    servicesAvailable: ['Lubricants', 'Batteries', 'Seat Covers', 'Fast Moving Spares'],
    isFlagship: false
  },
  {
    id: 'store-pune',
    name: 'Profit Automobile Store - Pune Central',
    city: 'Pune',
    state: 'Maharashtra',
    address: 'Baner, Pune - 411045',
    phone: 'Info@profitautostore.in',
    email: 'Info@profitautostore.in',
    timing: '09:00 AM - 09:00 PM',
    coordinates: { lat: 18.5590, lng: 73.7868 },
    servicesAvailable: ['Ceramic Coating Studio', 'Performance Tuning', 'Full Accessories'],
    isFlagship: false
  }
];

export const FRANCHISE_TIERS: FranchiseTier[] = [
  {
    id: 'tier-express',
    title: 'Retail Express Outlet',
    investmentRange: '₹5 Lakhs - ₹10 Lakhs',
    spaceRequired: '300 - 500 Sq. Ft.',
    expectedMargin: '20% - 28%',
    breakEven: '6 - 9 Months',
    description: 'Compact high-margin store focusing on Fast Moving Accessories, Lubricants, Batteries, Car Care and Quick Installation Services.',
    features: [
      'Multi-Brand Product Stocking (Castrol, Exide, Bosch, 3M)',
      'High footfall commercial location suitability',
      'Low operational expenditure with 2 technicians',
      'Complete Store Design, Signage & Branding provided',
      'Central Billing & Inventory Management Software',
      'Continuous Marketing & Local Demand Generation'
    ]
  },
  {
    id: 'tier-standard',
    title: 'Standard Store & Workshop',
    investmentRange: '₹12 Lakhs - ₹18 Lakhs',
    spaceRequired: '600 - 1000 Sq. Ft.',
    expectedMargin: '25% - 32%',
    breakEven: '6 - 10 Months',
    description: 'Comprehensive automobile store with dedicated installation bays, wheel alignment, battery testing and custom upholstery studio.',
    features: [
      'Full Product Catalog: Spares, Oils, Accessories, Alloy Wheels',
      '2 Hydraulic Service Bays + Battery Fitting Station',
      '3D Wheel Alignment & Balancing Equipment Setup',
      'Staff & Master Mechanic Training at Headquarters',
      'Exclusive Territory Protection Radius',
      'Direct Supply Chain Delivery from Central Hub'
    ]
  },
  {
    id: 'tier-flagship',
    title: 'Master Flagship Hub',
    investmentRange: '₹20 Lakhs - ₹25+ Lakhs',
    spaceRequired: '1200 - 2000+ Sq. Ft.',
    expectedMargin: '28% - 35%',
    breakEven: '5 - 8 Months',
    description: 'The ultimate regional destination featuring luxury detailing studio, custom vehicle modification bay, and B2B wholesale counter.',
    features: [
      'Exclusive Regional B2B Wholesaler Rights for Workshops',
      'Premium Ceramic Coating & Paint Protection Film (PPF) Booth',
      'Custom Vehicle Modification & Alloy Wheel Lounge',
      'Highest Margin Tier with Volume Rebates from Big Business House',
      'VIP Customer Lounge & Audio Demo Room',
      'Dedicated National Franchise Manager Support'
    ]
  }
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Multi-Point Vehicle Inspection',
    duration: '30 Mins',
    priceEstimate: 'Complimentary with Any Purchase',
    description: 'Comprehensive 50-point diagnostic check covering engine health, battery CCA, brake pad thickness, fluid quality, suspension and tire wear.',
    icon: 'SearchCheck',
    features: ['Computerized OB2 Diagnostic Scan', 'Battery Health & Alternator Check', 'Brake Fluid Moisture Test', 'Tire Tread Depth Analysis']
  },
  {
    id: 'srv-2',
    title: 'Professional Accessories Installation',
    duration: '45 - 90 Mins',
    priceEstimate: 'Starting ₹299',
    description: 'Precision wiring and coupler-to-coupler installation for Android stereos, dash cams, ambient lighting, horn upgrades and reverse cameras without voiding car warranty.',
    icon: 'Wrench',
    features: ['No Wire Cutting (Coupler to Coupler)', 'Fuse Tap Protection', 'Clean Hidden Cable Routing', 'Tested by Senior Techs']
  },
  {
    id: 'srv-3',
    title: 'German Ceramic Coating & Car Spa',
    duration: '4 - 8 Hours',
    priceEstimate: 'Starting ₹4,999',
    description: 'Multi-stage paint correction, clay bar treatment, and high-gloss 9H ceramic coating application inside dust-free temperature controlled booth.',
    icon: 'Sparkles',
    features: ['3-Stage Paint Correction & Swirl Removal', '3M / Sonax 9H Nano Coating', 'Hydrophobic Glass Shield', 'Interior Deep Steam Sanitation']
  },
  {
    id: 'srv-4',
    title: 'Vehicle Modification & Styling',
    duration: '1 - 2 Days',
    priceEstimate: 'Custom Quotation',
    description: 'Transform your SUV, Sedan or Off-roader with custom body kits, matrix LED headlight setups, sports alloy wheels, performance exhausts and wraps.',
    icon: 'Flame',
    features: ['Aerodynamic Body Kits', 'Matrix LED & Projector Retrofitting', 'Custom Leather Seat Upholstery', 'Performance Suspension Lift Kits']
  },
  {
    id: 'srv-5',
    title: '3D Laser Wheel Alignment & Balancing',
    duration: '30 Mins',
    priceEstimate: 'Starting ₹499',
    description: 'State-of-the-art Italian 3D laser alignment and digital wheel balancing to eliminate tire uneven wear and steering vibration.',
    icon: 'Disc',
    features: ['3D Camera High Precision Measurement', 'Camber, Caster & Toe Adjustment', 'Digital Weight Balancing', 'Test Drive Verification']
  },
  {
    id: 'srv-6',
    title: 'Express Oil & Filter Change Service',
    duration: '20 Mins',
    priceEstimate: 'Starting ₹1,499',
    description: 'Quick synthetic oil change using genuine Castrol/Mobil oils with fresh OEM oil filter replacement and washer fluid top-up.',
    icon: 'Droplet',
    features: ['Full Synthetic Engine Oil Flush', 'New OEM Oil Filter', 'Air Filter Cleaning', '21-Point Fluid Top Up']
  }
];

export const WORKING_PROCESS: ProcessStep[] = [
  {
    step: '01',
    title: 'Vehicle Inspection',
    subtitle: 'Thorough Diagnostics',
    description: 'Master mechanics inspect your vehicle using digital diagnostic tools, checking battery health, oil viscosity, brake wear and electrical systems.',
    icon: 'ClipboardCheck',
    details: ['Obd-II Scanner Diagnosis', 'Battery CCA Test', 'Brake Pad Thickness Check', 'Fluid Quality Test']
  },
  {
    step: '02',
    title: 'Product Selection',
    subtitle: '100% Genuine Match',
    description: 'Our AI system and store experts match the exact OEM specifications for your make and model across top global brands like Bosch, Castrol, Exide & 3M.',
    icon: 'PackageCheck',
    details: ['Barcode Verified Genuine Stock', 'AI Vehicle Compatibility Lock', 'Transparent Price Guarantee', 'Warranty Card Issuance']
  },
  {
    step: '03',
    title: 'Expert Installation',
    subtitle: 'Certified Mechanics',
    description: 'Trained technicians execute precision installation using specialized garage tools, coupler-to-coupler wiring, and torque-wrench tightening.',
    icon: 'Wrench',
    details: ['Zero Wire Splicing', 'Hydraulic Lift Operation', 'Pneumatic Tool Fitting', 'Clean Protective Seat Covers Used']
  },
  {
    step: '04',
    title: 'Quality Check',
    subtitle: 'Strict Quality Standards',
    description: 'Senior Store Manager conducts a rigorous post-service inspection, road testing electrical systems, audio output, alignment and finish.',
    icon: 'ShieldCheck',
    details: ['Electronic Systems Audit', 'Torque Specifications Verification', 'Cleanliness & Polish Check', 'Customer Walkthrough']
  },
  {
    step: '05',
    title: 'Happy Customer',
    subtitle: 'Complete Peace of Mind',
    description: 'Drive away with complete confidence, backed by national warranty coverage across all Profit Automobile Stores nationwide.',
    icon: 'Smile',
    details: ['Digital GST Invoice', 'Pan-India Warranty Registration', 'Email Support Access', 'Loyalty Rewards Points']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    customerName: 'Vikramaditya Singh',
    location: 'Gurugram, Haryana',
    vehicleModel: 'Mahindra Thar 4x4',
    rating: 5,
    review: 'Got complete modification done at Profit Automobile Store Okhla outlet — off-road body kit, matrix headlights, and 17" matte alloy wheels. The finish is unmatched, like a factory-fitted luxury edition. Big Business House trust is real!',
    serviceUsed: 'Vehicle Modification & Accessories',
    date: '14 Jan 2026'
  },
  {
    id: 't-2',
    customerName: 'Ananya Deshmukh',
    location: 'Mumbai, Maharashtra',
    vehicleModel: 'Hyundai Creta SX(O)',
    rating: 5,
    review: 'Replaced my OEM battery with Exide DIN60 and added 3M Ceramic Coating. The store manager was polite and the AI product recommendation guided me to the exact oil grade for my diesel engine. 10/10 experience!',
    serviceUsed: 'Battery Replacement & Ceramic Coating',
    date: '28 Dec 2025'
  },
  {
    id: 't-3',
    customerName: 'Rajesh K. Agarwal',
    location: 'Bengaluru, Karnataka',
    vehicleModel: 'Franchise Partner (Marathahalli)',
    rating: 5,
    review: 'Invested in a Standard Store Franchise 8 months ago. The store design, branding, supply chain support and training provided by Big Business House team made my store profitable within 5 months. Outstanding business model!',
    serviceUsed: 'Franchise Partnership',
    date: '05 Nov 2025'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b-1',
    title: 'Synthetic vs Mineral Engine Oil: Which Is Best For Indian Summers?',
    category: 'Engine Oil Guide',
    readTime: '4 min read',
    date: 'Jan 18, 2026',
    summary: 'Discover why 5W-40 and 0W-30 full synthetic oils from Castrol and Mobil 1 protect your engine under extreme high temperatures and heavy city traffic.',
    image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80',
    author: 'Master Mechanic Team'
  },
  {
    id: 'b-2',
    title: '5 Warning Signs Your Car Battery Is Failing & How To Choose The Right Ah',
    category: 'Battery Care',
    readTime: '3 min read',
    date: 'Jan 10, 2026',
    summary: 'Slow engine crank? Dim headlights? Here is how to test your battery CCA and choose zero-maintenance Exide or Amaron batteries with maximum warranty.',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    author: 'Electrical Tech Team'
  },
  {
    id: 'b-3',
    title: 'The Ultimate Car Detailing Guide: Ceramic Coating vs PPF vs Wax Polish',
    category: 'Car Maintenance',
    readTime: '6 min read',
    date: 'Dec 22, 2025',
    summary: 'Learn how 3M 9H ceramic coating shields your car paint against UV discoloration, swirl marks, acid rain, and road debris.',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
    author: 'Detailing Studio Head'
  }
];
