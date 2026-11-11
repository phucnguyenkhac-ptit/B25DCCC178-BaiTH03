import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { cartStorageKey } from '../features/cart/cartSlice'
import productsReducer from '../features/products/productsSlice'
import { writeStorage } from '../utils/storage'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
})

let savedCart = store.getState().cart.items
store.subscribe(() => {
  const items = store.getState().cart.items
  if (items !== savedCart) {
    savedCart = items
    writeStorage(cartStorageKey, items)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
