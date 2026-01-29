export interface Offer {
  id: number;
  name: string;
  description: string;
  price: number;
  onSale: boolean;
  savings?: {
    amount: string;
    percent: string;
  };
  url: string;
  emoji?: string;
}
