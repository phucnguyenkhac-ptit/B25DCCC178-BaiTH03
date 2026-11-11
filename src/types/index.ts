export interface Product {
  id: number
  title: string
  price: number // Giá gốc bằng USD từ API.
  description: string
  category: string
  image: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  username: string
}
