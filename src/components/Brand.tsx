import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Tạp hóa Pew Pew – Trang chủ">
      <span className="brand-icon"><ShoppingBag size={19} strokeWidth={2.1} /></span>
      <span className="brand-name">Tạp hóa <span className="brand-accent">Pew Pew</span></span>
    </Link>
  )
}
