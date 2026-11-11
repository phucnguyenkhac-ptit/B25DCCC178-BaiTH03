import { ArrowDown, Gem, LayoutGrid, Monitor, Search, Shirt } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import CatalogNotice from '../components/CatalogNotice'
import ProductCard from '../components/ProductCard'
import { categories, normalizeSearch, productTitle } from '../utils/product'

const categoryIcons = [Shirt, Shirt, Gem, Monitor]
const filters = [
  { id: '', label: 'Tất cả', Icon: LayoutGrid },
  ...categories.map((category, index) => ({ ...category, Icon: categoryIcons[index] })),
]

export default function HomePage() {
  const { items, status } = useAppSelector((state) => state.products)
  const [params, setParams] = useSearchParams()
  const query = params.get('q')?.trim() ?? ''
  const category = filters.find(({ id }) => id === params.get('category'))?.id ?? ''
  const searchTerm = normalizeSearch(query)
  const CatalogTitle = query ? 'h1' : 'h2'
  const visibleProducts = items.filter((product) =>
    (category === '' || product.category === category) &&
    (normalizeSearch(productTitle(product)).includes(searchTerm) ||
      normalizeSearch(product.title).includes(searchTerm)),
  )
  const loading = items.length === 0 && (status === 'idle' || status === 'loading')

  function changeCategory(value: string) {
    const next = new URLSearchParams(params)
    if (value) {
      next.set('category', value)
    } else {
      next.delete('category')
    }
    setParams(next, { replace: true })
  }

  function resetFilters() {
    const next = new URLSearchParams(params)
    next.delete('q')
    next.delete('category')
    setParams(next, { replace: true })
  }

  return (
    <div className="container home-page">
      {!query && (
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Mua sắm dễ dàng,<br /><span>chọn điều bạn thích.</span></h1>
            <p>Khám phá thời trang, trang sức và đồ điện tử cho nhu cầu hằng ngày.</p>
            <a className="button primary-button hero-button" href="#san-pham">
              Xem danh mục <ArrowDown size={17} />
            </a>
          </div>
          <div className="hero-image">
            <img src="/images/hero-warm.webp" alt="Balo vải màu be, áo nâu đất và tai nghe màu kem" fetchPriority="high" />
          </div>
        </section>
      )}

      <section className="catalog" id="san-pham" aria-labelledby="catalog-title">
        <div className="catalog-heading">
          <CatalogTitle id="catalog-title">{query ? 'Kết quả tìm kiếm' : 'Khám phá sản phẩm'}</CatalogTitle>
          <p role="status">
            {loading ? 'Đang tải sản phẩm…' : `${visibleProducts.length} sản phẩm`}
            {!loading && query && <> cho <strong>“{query}”</strong></>}
          </p>
        </div>

        <div className="category-filters" role="group" aria-label="Lọc theo danh mục">
          {filters.map(({ id, label, Icon }) => (
            <button key={id} type="button" className="filter-button" aria-pressed={category === id} onClick={() => changeCategory(id)}>
              <Icon size={16} aria-hidden="true" /> {label}
            </button>
          ))}
        </div>

        <CatalogNotice />

        {loading ? (
          <div className="product-grid" aria-hidden="true">
            {Array.from({ length: 4 }, (_, index) => <div key={index} className="product-skeleton" />)}
          </div>
        ) : visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map((product) => <ProductCard key={product.id} product={product} catalogSearch={params.toString()} />)}
          </div>
        ) : (
          <div className="empty-state">
            <span className="state-icon"><Search size={25} /></span>
            <h3>{searchTerm || category ? 'Không tìm thấy sản phẩm' : 'Danh mục chưa có sản phẩm'}</h3>
            {(searchTerm || category) && (
              <button className="button secondary-button" type="button" onClick={resetFilters}>Xóa bộ lọc</button>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
