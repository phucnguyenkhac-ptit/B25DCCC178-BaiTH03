import { Search, X } from 'lucide-react'
import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function ProductSearch({ onHome }: { onHome: boolean }) {
  const [params, setParams] = useSearchParams()
  const [draft, setDraft] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const query = onHome ? params.get('q') ?? '' : draft

  function updateQuery(value: string) {
    if (!onHome) {
      setDraft(value)
      return
    }

    const next = new URLSearchParams(params)
    if (value) {
      next.set('q', value)
    } else {
      next.delete('q')
    }
    setParams(next, { replace: true })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const term = query.trim()
    if (onHome) {
      updateQuery(term)
    } else if (term) {
      navigate({ pathname: '/', search: new URLSearchParams({ q: term }).toString() })
    }
  }

  return (
    <form className="search-field header-search" role="search" onSubmit={search}>
      <Search size={19} aria-hidden="true" />
      <label className="sr-only" htmlFor="product-search">Tìm theo tên sản phẩm</label>
      <input
        id="product-search"
        ref={input}
        type="search"
        enterKeyHint="search"
        placeholder="Tìm theo tên sản phẩm…"
        value={query}
        onChange={(event) => updateQuery(event.target.value)}
      />
      {query && (
        <button
          className="search-clear"
          type="button"
          aria-label="Xóa từ khóa"
          onClick={() => {
            updateQuery('')
            input.current?.focus()
          }}
        >
          <X size={17} />
        </button>
      )}
      <button className="search-submit" type="submit" aria-label="Tìm sản phẩm">Tìm</button>
    </form>
  )
}
