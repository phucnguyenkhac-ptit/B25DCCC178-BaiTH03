import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import type { Product } from '../types'
import { formatVnd, usdToVnd } from '../utils/currency'
import { categoryLabel, productTitle } from '../utils/product'
import ProductImage from './ProductImage'

export default function ProductCard({ product, catalogSearch }: { product: Product; catalogSearch: string }) {
  const dispatch = useAppDispatch()
  const path = `/products/${product.id}`
  const linkState = { catalogSearch }
  const title = productTitle(product)

  return (
    <article className="product-card">
      <Link to={path} state={linkState} className="product-card-image image-surface" aria-label={`Xem ${title}`}>
        <ProductImage product={product} />
      </Link>
      <div className="product-card-body">
        <p className="product-category">{categoryLabel(product.category)}</p>
        <h3><Link to={path} state={linkState}>{title}</Link></h3>
        <div className="product-card-bottom">
          <strong className="price">{formatVnd(usdToVnd(product.price))}</strong>
          <button
            className="add-button"
            type="button"
            onClick={() => dispatch(addToCart(product))}
            aria-label={`Thêm ${title} vào giỏ`}
            title="Thêm vào giỏ"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </article>
  )
}
