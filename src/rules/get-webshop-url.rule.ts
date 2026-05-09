import { FlaschenpostProduct } from '../client/flaschenpost.response';

const findCategorySlug = (
  product: FlaschenpostProduct,
  typeKey: string,
): string | undefined =>
  product.categories?.find(
    (category) => category.obj?.custom?.type?.key === typeKey,
  )?.obj?.slug?.['de-DE'];

/**
 * Retrieves the webshop URL for a given product.
 * @param {FlaschenpostProduct} product - The product to retrieve the webshop URL from.
 * @returns {string} The webshop URL.
 */
export const getWebshopUrl = (product: FlaschenpostProduct): string => {
  const brandSlug = findCategorySlug(product, 'fp-category-brand');
  const productSlug = product.slug['de-DE'];
  return `https://www.flaschenpost.de/p/${brandSlug}/${productSlug}`;
};
