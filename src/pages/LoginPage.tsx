import { ArrowRight, Eye, EyeOff, UserRound } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { matchPath, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function returnPath(state: unknown): string {
  if (typeof state !== 'object' || state === null || !('from' in state)) return '/'
  const { from } = state
  return typeof from === 'string' && matchPath('/checkout', from.split(/[?#]/, 1)[0]) ? from : '/'
}

export default function LoginPage() {
  const { user, login } = useAuth()
  const location = useLocation()
  const target = returnPath(location.state)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  if (user) return <Navigate to={target} replace />

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!login(username, password)) {
      setError(username.trim() ? 'Mật khẩu không đúng. Vui lòng thử lại.' : 'Vui lòng nhập tên người dùng.')
    }
  }

  return (
    <div className="container interior-page auth-page">
      <section className="panel auth-panel" aria-labelledby="login-title">
        <span className="state-icon"><UserRound size={25} /></span>
        <h1 id="login-title">Đăng nhập</h1>
        <p className="auth-description">{target === '/' ? 'Đăng nhập vào Tạp hóa Pew Pew.' : 'Đăng nhập để tiếp tục thanh toán.'}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="username">Tên người dùng</label>
            <input id="username" autoComplete="username" required value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Nhập tên người dùng" />
          </div>
          <div className="form-field">
            <label htmlFor="password">Mật khẩu</label>
            <div className="password-field">
              <input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nhập mật khẩu" />
              <button className="icon-button" type="button" aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button primary-button full-width" type="submit">Đăng nhập <ArrowRight size={18} /></button>
        </form>
        <p className="demo-hint">Mật khẩu dùng thử <code>123456</code></p>
      </section>
    </div>
  )
}
