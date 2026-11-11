import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { CartItem, Product } from '../../types'
import { usdToVnd } from '../../utils/currency'
import { isProduct, productTitle } from '../../utils/product'
import { readStorage } from '../../utils/storage'

interface CartState {
  items: CartItem[]
  lastAdded: { title: string; quantity: number } | null
}

export const cartStorageKey = 'shopmini.cart'

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false

  const { product, quantity } = value as Record<string, unknown>
  return isProduct(product) && typeof quantity === 'number' && isValidQuantity(quantity)
}

function isValidQuantity(quantity: number): boolean {
  return Number.isSafeInteger(quantity) && quantity > 0
}

function loadCart(): CartState {
  const saved = readStorage(cartStorageKey)
  return {
    items: Array.isArray(saved) ? saved.filter(isCartItem) : [],
    lastAdded: null,
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCart,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload
      const item = state.items.find((entry) => entry.product.id === product.id)
      const quantity = (item?.quantity ?? 0) + 1
      if (!isValidQuantity(quantity)) return

      if (item) {
        item.quantity = quantity
      } else {
        state.items.push({ product, quantity })
      }
      state.lastAdded = { title: productTitle(product), quantity }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(({ product }) => product.id !== action.payload)
    },
    updateQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const { productId, quantity } = action.payload
      if (!isValidQuantity(quantity)) return

      const item = state.items.find(({ product }) => product.id === productId)
      if (item) item.quantity = quantity
    },
    clearCart(state) {
      state.items = []
      state.lastAdded = null
    },
    dismissCartNotice(state) {
      state.lastAdded = null
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, dismissCartNotice } = cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.items

export const selectTotalQuantity = (state: RootState) =>
  selectCartItems(state).reduce((total, item) => total + item.quantity, 0)

export const selectTotalPrice = (state: RootState) =>
  selectCartItems(state).reduce(
    (totalVnd, { product, quantity }) => totalVnd + usdToVnd(product.price) * quantity,
    0,
  )

export default cartSlice.reducer
