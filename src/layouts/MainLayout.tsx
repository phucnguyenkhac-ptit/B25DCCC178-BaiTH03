import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Brand from '../components/Brand'
import Header from '../components/Header'

export default function MainLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#noi-dung">Chuyển đến nội dung</a>
      <Header />
      <main id="noi-dung" tabIndex={-1}><Outlet /></main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <Brand />
          <span>Dữ liệu sản phẩm từ Fake Store API</span>
        </div>
      </footer>
    </div>
  )
}
