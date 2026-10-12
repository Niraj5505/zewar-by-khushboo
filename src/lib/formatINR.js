/**
 * Money utilities for Zewar by Khushboo.
 * Note: Prompt specification enforces: Money stored as integer paise everywhere — never floats!
 */

export function formatINR(paiseOrRupees, isPaise = true) {
  const rupees = isPaise ? Math.round(paiseOrRupees / 100) : Math.round(paiseOrRupees);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rupees);
}

export function formatPaise(paise) {
  return formatINR(paise, true);
}

export function rupeesToPaise(rupees) {
  return Math.round(rupees * 100);
}

export function paiseToRupees(paise) {
  return Math.round(paise / 100);
}

export function calculateDiscount(originalPaise, salePaise) {
  if (!originalPaise || originalPaise <= salePaise) return 0;
  return Math.round(((originalPaise - salePaise) / originalPaise) * 100);
}
