export interface Inventory {
  info: Info;
  results: Result[];
}

interface Info {
  needed: number;
  indexUsed: string;
  lastUpdatedForWarehouse: string;
  updated: Date;
}

export interface Result {
  id: number;
  categoryId: number;
  subCategoryId: number;
  brandId: number;
  brandName: string;
  brandWebShopUrl: string;
  name: string;
  shortDescription: string;
  articles: Article[];
  gradientColor: string;
  backgroundColor: string;
  imageArticleId: number;
  image: string;
  imagesBig: string[];
  details: Detail[];
  alcoholInfo: string;
  titleColor: string;
  subTitleColor: string;
  linkColor: string;
  alphabeticSort: number;
  popularSort: number;
  onTopOfferColor: string;
  onTopOfferBackgroundColor: string;
  onTopOfferGradientColor: string;
  onTopOfferTitleColor: string;
  onTopOfferSubTitleColor: string;
  colorProfileId: number;
  offerColorProfileId: number;
  offerPricingColorProfileId: number;
  substancesCaption: string;
  substancesText: string;
  substancesUnit: unknown;
  webShopUrl: string;
  style: number;
  urlWebName: string;
  prvSliderPosition: number;
  onTopOfferText?: string;
  productGroupId?: number;
  productGroupSort?: number;
  productGroupName?: string;
}

export interface Article {
  id: number;
  warehouseId: number;
  shortDescription: string;
  depositPerBottle: number;
  depositPerFrame: number;
  depositOverall: number;
  itemsInFrame: number;
  valueAddedTax: number;
  depositValueAddedTax: number;
  isAvailable: boolean;
  hasCrossPrice: boolean;
  crossedPrice: number;
  crossedPriceColor: string;
  crossColor: string;
  cartColor: string;
  maximumOrderQuantity: number;
  minimumOrderQuantity: number;
  orderPackageSize: number;
  bottleType: string;
  bottleTypeHint: string;
  price: number;
  salesPriceFix: number;
  pricePerUnit: number;
  offerPricePerUnit: number;
  priceColor: string;
  offerFrom: Date;
  offerTo: Date;
  offerPrice: number;
  onTopOfferColor: string;
  onTopOfferBorderColor: string;
  onTopOfferPriceColor: string;
  onTopOfferCrossedPriceColor: string;
  onTopOfferCrossColor: string;
  onTopOfferCartColor: string;
  onTopOfferBackgroundColor: string;
  onTopOfferGradientColor: string;
  onTopOfferTitleColor: string;
  onTopOfferSubTitleColor: string;
  subCategoryName: string;
  subCategoryWebShopUrl: string;
  hasBadge: boolean;
  badgeText: string;
  isShownInHeaderSlider: boolean;
  isShownInOfferSlider: boolean;
  isWebTeaerOffer: boolean;
  showCrossPrice: boolean;
  topAndInlineOffer: boolean;
  inlineOffer: boolean;
  hasMultipleSliderImages: boolean;
  unit: string;
  pricePerUnitText: string;
  offerPricePerUnitText: string;
  depositOverallText: string;
  salesUnitWeight: number;
  imageArticleId: number;
  image: string;
  imagesBig: string[];
  deliveryStateInfo: string;
  isChilled: boolean;
  origin: number;
  articleWarehouseId: number;
  offerColorProfileId: number;
  offerPricingColorProfileId: number;
  substituteArticleMappingCount: number;
  articleType: number;
  prvSliderPosition: number;
  onTopOfferText?: string;
  webOnTopOfferColor?: string;
  webPriceColor?: string;
  webFrameColor?: string;
  onTopOffer?: number;
  frontendDisplayTags?: string[];
}

interface Detail {
  value: number;
  prefix: unknown;
  sort: number;
  description: string;
  unit: unknown;
  group: unknown;
  perVolume: unknown;
  per: number;
  volume: unknown;
}
