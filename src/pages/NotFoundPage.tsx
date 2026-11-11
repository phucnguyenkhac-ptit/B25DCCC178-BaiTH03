import { ArrowLeft, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundPage({ product = false }: { product?: boolean }) {
  return (
    <div className="container interior-page not-found-page">
      <div className="empty-state">
        <span className="state-icon"><Search size={27} /></span>
        <p className="error-code">404</p>
        <h1>{product ? 'Không tìm thấy sản phẩm' : 'Không tìm thấy trang'}</h1>
        <Link className="button primary-button" to="/"><ArrowLeft size={17} /> Về trang chủ</Link>
      </div>
    </div>
  )
}
