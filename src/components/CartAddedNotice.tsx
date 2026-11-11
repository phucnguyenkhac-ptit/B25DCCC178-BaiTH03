import { Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { dismissCartNotice } from '../features/cart/cartSlice'

export default function CartAddedNotice() {
  const notice = useAppSelector((state) => state.cart.lastAdded)
  const dispatch = useAppDispatch()
  const [hasFocus, setHasFocus] = useState(false)

  useEffect(() => {
    if (!notice || hasFocus) return

    const timeout = window.setTimeout(() => dispatch(dismissCartNotice()), 4500)
    return () => window.clearTimeout(timeout)
  }, [notice, hasFocus, dispatch])

  function dismiss() {
    setHasFocus(false)
    dispatch(dismissCartNotice())
  }

  return (
    <>
      <span className="sr-only" role="status">
        {notice && `Đã thêm ${notice.title} vào giỏ hàng. Số lượng sản phẩm này trong giỏ là ${notice.quantity}.`}
      </span>
      {notice && (
        <div
          className="cart-notice"
          onFocus={() => setHasFocus(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false)
          }}
        >
          <span className="cart-notice-icon" aria-hidden="true"><Check size={18} /></span>
          <div className="cart-notice-body">
            <strong>Đã thêm vào giỏ hàng</strong>
            <p title={notice.title}>{notice.title}</p>
            <Link to="/cart" onClick={dismiss}>Xem giỏ hàng</Link>
          </div>
          <button className="icon-button notice-close" type="button" onClick={dismiss} aria-label="Đóng thông báo giỏ hàng">
            <X size={16} />
          </button>
        </div>
      )}
    </>
  )
}
