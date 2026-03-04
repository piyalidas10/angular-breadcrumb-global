export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  currency: 'USD' | 'EUR' | 'INR';
  categoryId: string;
  isActive: boolean;
}