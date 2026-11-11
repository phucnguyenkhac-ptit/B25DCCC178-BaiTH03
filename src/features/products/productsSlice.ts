import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import catalog from '../../data/catalog.json'
import type { Product } from '../../types'
import { isProduct } from '../../utils/product'

interface ProductsState {
  items: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
}

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { state: { products: ProductsState } }
>(
  'products/fetchProducts',
  async (_, { signal }) => {
    const response = await fetch('https://fakestoreapi.com/products', {
      signal: AbortSignal.any([signal, AbortSignal.timeout(6500)]),
    })

    if (!response.ok) {
      throw new Error(`Fake Store API trả về HTTP ${response.status}`)
    }

    const data: unknown = await response.json()
    if (!Array.isArray(data) || !data.every(isProduct)) {
      throw new Error('Danh sách sản phẩm sai định dạng.')
    }

    return data
  },
  {
    condition: (_, { getState }) => getState().products.status !== 'loading',
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed'
        // Giữ danh mục mẫu để các luồng của bài tập vẫn dùng được khi API gián đoạn.
        state.items = catalog
      })
  },
})

export default productsSlice.reducer
