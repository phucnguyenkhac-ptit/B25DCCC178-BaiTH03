import { CircleAlert, RotateCw } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProducts } from '../features/products/productsSlice'

export default function CatalogNotice() {
  const { status, items } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()
  const retrying = status === 'loading' && items.length > 0

  if (status !== 'failed' && !retrying) return null

  return (
    <div className="catalog-notice">
      <span role="status">
        <CircleAlert size={17} />
        {retrying ? 'Đang kết nối lại với Fake Store API…' : 'Đang hiển thị dữ liệu dự phòng vì chưa kết nối được với Fake Store API.'}
      </span>
      <button className="text-button" type="button" disabled={retrying} onClick={() => dispatch(fetchProducts())}>
        <RotateCw size={15} /> {retrying ? 'Đang tải' : 'Thử lại'}
      </button>
    </div>
  )
}
