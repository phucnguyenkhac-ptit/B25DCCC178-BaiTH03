import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import ProductImage from '../components/ProductImage'
import { removeFromCart, selectCartItems, selectTotalPrice, selectTotalQuantity, updateQuantity } from '../features/cart/cartSlice'
import { formatVnd, usdToVnd } from '../utils/currency'
import { productTitle } from '../utils/product'

export default function CartPage() {
  const items = useAppSelector(selectCartItems)
  const quantity = useAppSelector(selectTotalQuantity)
  const totalVnd = useAppSelector(selectTotalPrice)
  const dispatch = useAppDispatch()

  return (
    <div className="container interior-page">
      <Link className="back-link" to="/"><ArrowLeft size={17} /> Tiếp tục mua sắm</Link>
      <div className="page-heading">
        <h1>Giỏ hàng</h1>
        <p>{quantity} sản phẩm trong giỏ</p>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <span className="state-icon"><ShoppingCart size={26} /></span>
          <h2>Giỏ hàng đang trống</h2>
          <Link className="button primary-button" to="/">Khám phá sản phẩm <ArrowRight size={17} /></Link>
        </div>
      ) : (
        <div className="order-grid">
          <ul className="panel cart-items" aria-label="Sản phẩm trong giỏ">
            {items.map(({ product, quantity: count }) => {
              const title = productTitle(product)
              const unitPriceVnd = usdToVnd(product.price)

              return (
                <li className="cart-item" key={product.id}>
                  <Link className="cart-image image-surface" to={`/products/${product.id}`}>
                    <ProductImage product={product} />
                  </Link>
                  <div className="cart-item-info">
                    <Link to={`/products/${product.id}`} className="cart-item-title">{title}</Link>
                    <span>{formatVnd(unitPriceVnd)} / sản phẩm</span>
                  </div>
                  <div className="quantity-control" role="group" aria-label={`Số lượng ${title}`}>
                    <button
                      type="button"
                      aria-label="Giảm số lượng"
                      disabled={count === 1}
                      onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: count - 1 }))}
                    ><Minus size={15} /></button>
                    <span>{count}</span>
                    <button
                      type="button"
                      aria-label="Tăng số lượng"
                      onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: count + 1 }))}
                    ><Plus size={15} /></button>
                  </div>
                  <strong className="price cart-item-total">{formatVnd(unitPriceVnd * count)}</strong>
                  <button
                    className="icon-button remove-button"
                    type="button"
                    aria-label={`Xóa ${title} khỏi giỏ hàng`}
                    title="Xóa sản phẩm"
                    onClick={() => dispatch(removeFromCart(product.id))}
                  ><Trash2 size={18} /></button>
                </li>
              )
            })}
          </ul>
          <aside className="panel order-summary" aria-label="Tóm tắt đơn hàng">
            <h2>Tóm tắt đơn hàng</h2>
            <div className="summary-row"><span>Số lượng</span><strong>{quantity} sản phẩm</strong></div>
            <div className="summary-total"><span>Tổng tiền</span><strong className="price">{formatVnd(totalVnd)}</strong></div>
            <Link className="button primary-button full-width" to="/checkout">Thanh toán <ArrowRight size={17} /></Link>
          </aside>
        </div>
      )}
    </div>
  )
}
