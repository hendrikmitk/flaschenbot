export interface Offer {
  name: string;
  description: string;
  price: number;
  onSale: boolean;
  savings?: {
    amount: string;
    percent: string;
  };
}
