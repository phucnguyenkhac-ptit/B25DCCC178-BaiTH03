import { LogOut, Moon, ShoppingCart, Sun, UserRound } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { selectTotalQuantity } from '../features/cart/cartSlice'
import Brand from './Brand'
import CartAddedNotice from './CartAddedNotice'
import ProductSearch from './ProductSearch'

export default function Header() {
  const quantity = useAppSelector(selectTotalQuantity)
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const themeLabel = theme === 'light' ? 'Bật chế độ tối' : 'Bật chế độ sáng'

  return (
    <header className="site-header">
      <nav className="container header-inner" aria-label="Điều hướng chính">
        <Brand />
        <ProductSearch key={pathname} onHome={pathname === '/'} />

        <div className="header-actions">
          <button className="icon-button theme-button" type="button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
            {theme === 'light' ? <Moon size={19} /> : <Sun size={20} />}
          </button>
          <NavLink className="icon-button cart-link" to="/cart" aria-label={`Giỏ hàng, ${quantity} sản phẩm`} title="Giỏ hàng">
            <ShoppingCart size={20} />
            <span className="cart-badge" aria-hidden="true">{quantity}</span>
          </NavLink>
          <span className="header-divider" />
          {user ? (
            <div className="account">
              <span className="account-name" title={user.username}>
                <UserRound size={18} /> <span>{user.username}</span>
              </span>
              <button type="button" className="icon-button" onClick={logout} aria-label="Đăng xuất" title="Đăng xuất">
                <LogOut size={19} />
              </button>
            </div>
          ) : (
            <Link className="login-link" to="/login" aria-label="Đăng nhập" title="Đăng nhập">
              <UserRound size={18} /> <span>Đăng nhập</span>
            </Link>
          )}
        </div>
        <CartAddedNotice />
      </nav>
    </header>
  )
}
