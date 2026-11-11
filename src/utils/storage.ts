type StorageKind = 'localStorage' | 'sessionStorage'

export function readStorage(key: string, kind: StorageKind = 'localStorage'): unknown {
  try {
    const value = window[kind].getItem(key)
    return value === null ? null : JSON.parse(value)
  } catch {
    return null
  }
}

export function writeStorage(
  key: string,
  value: unknown,
  kind: StorageKind = 'localStorage',
): void {
  try {
    if (value === null) {
      window[kind].removeItem(key)
    } else {
      window[kind].setItem(key, JSON.stringify(value))
    }
  } catch {
    // Trình duyệt có thể chặn lưu trữ. State vẫn dùng được trong bộ nhớ.
  }
}
