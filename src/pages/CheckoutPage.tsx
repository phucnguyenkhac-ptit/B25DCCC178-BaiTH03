import { ArrowLeft, ArrowRight, CheckCircle2, ShoppingBag, ShoppingCart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useAuth } from '../contexts/AuthContext'
import { clearCart, selectCartItems, selectTotalPrice } from '../features/cart/cartSlice'
import { formatVnd, usdToVnd } from '../utils/currency'
import { productTitle } from '../utils/product'

export default function CheckoutPage() {
  const { user } = useAuth()
  const items = useAppSelector(selectCartItems)
  const totalVnd = useAppSelector(selectTotalPrice)
  const dispatch = useAppDispatch()
  const [ordered, setOrdered] = useState(false)
  const successHeading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (ordered) successHeading.current?.focus()
  }, [ordered])

  function placeOrder() {
    if (items.length === 0 || ordered) return
    dispatch(clearCart())
    setOrdered(true)
  }

  if (ordered) {
    return (
      <div className="container interior-page checkout-success">
        <div className="empty-state">
          <span className="state-icon success-icon"><CheckCircle2 size={32} /></span>
          <h1 ref={successHeading} tabIndex={-1}>Đặt hàng thành công!</h1>
          <p>Cảm ơn {user?.username} đã mua sắm tại Tạp hóa Pew Pew.</p>
          <Link className="button primary-button" to="/">Tiếp tục mua sắm <ArrowRight size={17} /></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container interior-page">
      <Link className="back-link" to="/cart"><ArrowLeft size={17} /> Quay lại giỏ hàng</Link>
      <div className="page-heading">
        <h1>Thanh toán</h1>
        <p>Kiểm tra đơn hàng của bạn trước khi đặt.</p>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <span className="state-icon"><ShoppingCart size={26} /></span>
          <h2>Giỏ hàng đang trống</h2>
          <Link className="button primary-button" to="/">Khám phá sản phẩm <ArrowRight size={17} /></Link>
        </div>
      ) : (
        <div className="order-grid">
          <section className="panel checkout-items" aria-labelledby="checkout-products">
            <h2 id="checkout-products">Sản phẩm đặt mua</h2>
            <ul>
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="checkout-item">
                  <div><Link to={`/products/${product.id}`}>{productTitle(product)}</Link><small>Số lượng {quantity}</small></div>
                  <strong className="price">{formatVnd(usdToVnd(product.price) * quantity)}</strong>
                </li>
              ))}
            </ul>
          </section>
          <aside className="panel order-summary" aria-label="Thông tin thanh toán">
            <h2>Thông tin thanh toán</h2>
            <div className="summary-row"><span>Người đặt</span><strong>{user?.username}</strong></div>
            <div className="summary-total"><span>Tổng tiền</span><strong className="price">{formatVnd(totalVnd)}</strong></div>
            <button className="button primary-button full-width" type="button" onClick={placeOrder}>
              <ShoppingBag size={18} /> Đặt hàng
            </button>
          </aside>
        </div>
      )}
    </div>
  )
}
