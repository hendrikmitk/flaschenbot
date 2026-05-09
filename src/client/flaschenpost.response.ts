export interface FlaschenpostProduct {
  id: string;
  key: string;
  name: LocalizedString;
  description?: LocalizedString;
  slug: LocalizedString;
  categories: ProductCategory[];
  masterVariant: MasterVariant;
  variants: unknown[];
}

export interface LocalizedString {
  'de-DE': string;
}

export interface MasterVariant {
  id: number;
  sku: string;
  attributes: ProductAttribute[];
  price: ProductPrice;
  images: ProductImage[];
}

export interface ProductAttribute {
  name: string;
  value: unknown;
}

export interface ProductPrice {
  id: string;
  value: Money;
  validFrom?: string;
  validUntil?: string;
  custom?: {
    fields?: {
      RegularPrice?: Money;
      RegularPricePerUnitText?: string;
      PricePerUnitText?: string;
      DiscountPercentage?: number;
      FrontendDisplayTags?: string[];
      ArticleStatus?: string;
      DistributionStatus?: string;
    };
  };
}

export interface Money {
  centAmount: number;
  currencyCode: string;
  type: string;
  fractionDigits: number;
}

export interface ProductImage {
  url: string;
  dimensions?: { w: number; h: number };
  label?: string;
}

export interface ProductCategory {
  id: string;
  obj?: {
    id: string;
    name?: LocalizedString;
    slug?: LocalizedString;
    custom?: {
      type?: { key: string };
    };
  };
}
