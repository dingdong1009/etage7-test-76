
export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: string;
  total: string;
  size?: string;
  color?: string;
  image?: string;
}

export interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  phone: string;
  status: string;
  total: string;
  subtotal: string;
  tax: string;
  shipping: string;
  shippingMethod: string;
  items: OrderItem[];
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  notes?: string;
}
