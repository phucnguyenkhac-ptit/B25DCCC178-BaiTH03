import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import CatalogNotice from '../components/CatalogNotice'
import ProductImage from '../components/ProductImage'
import { addToCart } from '../features/cart/cartSlice'
import type { Product } from '../types'
import { formatVnd, usdToVnd } from '../utils/currency'
import { categoryLabel, productTitle } from '../utils/product'
import NotFoundPage from './NotFoundPage'

function ProductDetails({ product }: { product: Product }) {
  const dispatch = useAppDispatch()

  return (
    <article className="product-detail">
      <div className="detail-image image-surface"><ProductImage product={product} eager /></div>
      <div className="detail-body">
        <p className="product-category">{categoryLabel(product.category)}</p>
        <h1>{productTitle(product)}</h1>
        <p className="detail-price price">{formatVnd(usdToVnd(product.price))}</p>
        <p className="detail-description">{product.description}</p>
        <button
          className="button primary-button"
          type="button"
          onClick={() => dispatch(addToCart(product))}
        >
          <ShoppingCart size={19} /> Thêm vào giỏ hàng
        </button>
      </div>
    </article>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const state: unknown = useLocation().state
  const catalogSearch = typeof state === 'object' && state !== null &&
    'catalogSearch' in state && typeof state.catalogSearch === 'string' ? state.catalogSearch : ''
  const catalogQuery = new URLSearchParams(catalogSearch).get('q')?.trim()
  const { items, status } = useAppSelector((state) => state.products)
  const product = /^\d+$/.test(id ?? '') ? items.find((item) => item.id === Number(id)) : undefined

  if (!product && (status === 'idle' || status === 'loading')) {
    return <div className="container interior-page"><p role="status">Đang tải sản phẩm…</p></div>
  }

  if (!product) return <NotFoundPage product />

  return (
    <div className="container interior-page">
      <Link className="back-link" to={{ pathname: '/', search: catalogSearch }}>
        <ArrowLeft size={17} /> {catalogQuery ? 'Về kết quả tìm kiếm' : 'Về danh mục'}
      </Link>
      <CatalogNotice />
      <ProductDetails key={product.id} product={product} />
    </div>
  )
}
