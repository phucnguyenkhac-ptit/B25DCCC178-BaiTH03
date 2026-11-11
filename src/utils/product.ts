import { productTitlesVi } from '../data/productTitlesVi'
import type { Product } from '../types'

export function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false

  const { id, title, price, description, category, image } = value as Record<string, unknown>
  return (
    typeof id === 'number' &&
    Number.isSafeInteger(id) &&
    id > 0 &&
    typeof title === 'string' &&
    typeof price === 'number' &&
    Number.isFinite(price) &&
    price >= 0 &&
    typeof description === 'string' &&
    typeof category === 'string' &&
    typeof image === 'string'
  )
}

export const categories = [
  { id: "men's clothing", label: 'Thời trang nam' },
  { id: "women's clothing", label: 'Thời trang nữ' },
  { id: 'jewelery', label: 'Trang sức' },
  { id: 'electronics', label: 'Điện tử' },
]

export function categoryLabel(category: string): string {
  return categories.find(({ id }) => id === category)?.label ?? category
}

export function productTitle(product: Product): string {
  return productTitlesVi[product.id] ?? product.title.trim()
}

export function normalizeSearch(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/\p{Mark}/gu, '').replaceAll('đ', 'd')
}
