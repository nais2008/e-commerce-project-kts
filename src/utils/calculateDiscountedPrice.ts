export const calculateDiscountedPrice = (
  price: number,
  discountPercent: number
): number => {
  if (discountPercent <= 0) return +price.toFixed(2)

  const discountedPrice = price * (1 - discountPercent / 100)

  return +discountedPrice.toFixed(2)
}
