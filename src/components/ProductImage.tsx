import { ImageOff } from 'lucide-react'
import { useState } from 'react'
import catalog from '../data/catalog.json'
import type { Product } from '../types'
import { productTitle } from '../utils/product'

export default function ProductImage({ product, eager = false }: { product: Product; eager?: boolean }) {
  const original = catalog.find(({ id }) => id === product.id)
  const image = original?.image === product.image
    ? `/images/products/${product.id}.webp`
    : product.image
  const [failedImage, setFailedImage] = useState('')

  return failedImage === image || image.length === 0 ? (
    <span className="product-image-fallback" role="img" aria-label="Ảnh sản phẩm chưa có">
      <ImageOff size={27} aria-hidden="true" />
    </span>
  ) : (
    <img
      src={image}
      alt={productTitle(product)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailedImage(image)}
    />
  )
}
