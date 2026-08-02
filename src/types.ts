export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  specifications: Record<string, string>;
  compatibility: string[];
  inStock: boolean;
  isPopular?: boolean;
  warranty?: string;
}

export interface ProductCategory {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  image: string;
  itemCount: number;
  subcategories: string[];
  featuredProducts: Product[];
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  timing: string;
  coordinates: { lat: number; lng: number };
  servicesAvailable: string[];
  isFlagship?: boolean;
}

export interface FranchiseTier {
  id: string;
  title: string;
  investmentRange: string;
  spaceRequired: string;
  expectedMargin: string;
  breakEven: string;
  description: string;
  features: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  duration: string;
  priceEstimate: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  vehicleModel: string;
  rating: number;
  review: string;
  serviceUsed: string;
  date: string;
  avatarUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  image: string;
  author: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
}

export interface VehicleSelection {
  make: string;
  model: string;
  year: string;
  fuelType: string;
}
