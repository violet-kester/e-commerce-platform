/** formatPrice(amount)
 *
 * Converts an amount in the default Stripe currency format (cents)
 * to a formatted USD string.
 *
 * @param amount - The amount in cents to be converted.
 * @returns - A string representing the amount in USD.
 * @example - formatPrice(14000) // returns '$140.00'
 */

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount / 100);
}

export default formatPrice;