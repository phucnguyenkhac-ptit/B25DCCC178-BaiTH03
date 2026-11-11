// Tỷ giá cố định cho dữ liệu mua sắm mô phỏng.
const vndPerUsd = 25_000

const vndFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
})

export function usdToVnd(amountUsd: number): number {
  return Math.round(amountUsd * vndPerUsd)
}

export function formatVnd(amountVnd: number): string {
  return vndFormatter.format(amountVnd)
}
