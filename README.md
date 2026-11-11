# Tạp hóa Pew Pew

Bài tập cửa hàng mini dùng React, TypeScript, Vite, React Router, Context API và Redux Toolkit.

## Chạy trên máy

Cài Node.js 20.19 trở lên. Sau khi giải nén, mở terminal trong thư mục chứa `package.json` và chạy:

```bash
npm ci
npm run dev
```

Mở địa chỉ Vite in ra trong terminal, thường là `http://localhost:5173/`. Trên PowerShell, có thể dùng `npm.cmd ci` và `npm.cmd run dev` nếu lệnh `npm` bị chặn bởi execution policy.

`npm run typecheck` kiểm tra kiểu. `npm run build` kiểm tra kiểu và tạo bản build trong `dist/`. Chạy `npm run preview` để mở thử bản build.

## Thử luồng mua hàng

1. Tìm **Áo khoác cotton nam** hoặc **ao khoac cotton nam** trong thanh tìm kiếm, mở chi tiết và thêm vào giỏ. Thông báo cạnh thanh điều hướng hiển thị tên sản phẩm và nút **Xem giỏ hàng**.
2. Vào giỏ, thử tăng hoặc giảm số lượng và kiểm tra tổng tiền.
3. Bấm **Thanh toán** khi chưa đăng nhập. Ứng dụng sẽ đưa bạn đến `/login`.
4. Nhập tên bất kỳ và mật khẩu **`123456`**. Ứng dụng sẽ quay lại `/checkout`.
5. Bấm **Đặt hàng**. Trang báo thành công và số lượng trong giỏ về 0.

## Đường dẫn

| Đường dẫn | Nội dung |
| --- | --- |
| `/` | Danh mục responsive và tìm theo tên sản phẩm |
| `/products/:id` | Chi tiết sản phẩm |
| `/cart` | Giỏ hàng và tổng tiền |
| `/login` | Đăng nhập giả lập |
| `/checkout` | Thanh toán, yêu cầu đăng nhập |
| Đường dẫn khác | Trang 404 |

## Vị trí mã nguồn

| Tệp | Vai trò |
| --- | --- |
| `src/app/store.ts`, `src/app/hooks.ts` | Store, `RootState`, `AppDispatch` và hooks có kiểu |
| `src/contexts/ThemeContext.tsx` | Giao diện sáng/tối và `useTheme()` |
| `src/contexts/AuthContext.tsx` | Người dùng, đăng nhập, đăng xuất và `useAuth()` |
| `src/features/products/productsSlice.ts` | `createAsyncThunk`, trạng thái tải và danh sách sản phẩm |
| `src/features/cart/cartSlice.ts` | Thêm, xóa, cập nhật số lượng, dọn giỏ và các selector tính tổng |
| `src/components/ProtectedRoute.tsx` | Giữ đường dẫn thanh toán để quay lại sau đăng nhập |
| `src/App.tsx`, `src/main.tsx` | Khai báo routes và gắn các provider |

Giao diện và giỏ hàng dùng `localStorage`. Phiên đăng nhập dùng `sessionStorage` của tab. Đăng nhập và đặt hàng là thao tác giả lập trên trình duyệt.

Ô tìm kiếm có trên mọi trang. Trang chủ cập nhật kết quả khi nhập và giữ từ khóa, danh mục trong URL. Từ các trang khác, nhấn Enter hoặc **Tìm** để mở kết quả.

## Dữ liệu sản phẩm

Thunk gọi [Fake Store API](https://fakestoreapi.com/products) và kiểm tra cấu trúc dữ liệu trả về. Khi gọi thất bại, Redux vẫn ghi trạng thái `failed` và giao diện hiển thị dữ liệu dự phòng kèm nút **Thử lại**. Bản sao 20 sản phẩm nằm ở `src/data/catalog.json`, với tên tiếng Việt trong `src/data/productTitlesVi.ts`.

Giá gốc từ API dùng USD. Ứng dụng quy đổi đơn giá sang VND theo tỷ giá mô phỏng cố định **1 USD = 25.000 ₫** và tính tổng từ các đơn giá đã quy đổi. Tỷ giá được khai báo trong `src/utils/currency.ts`.

Nguồn danh mục dự phòng: [bản sao JSON](https://github.com/ggracis/CHOPIN/blob/master/products.json). Ảnh sản phẩm: [kho ảnh Fake Store API](https://github.com/keikaavousi/fake-store-api/tree/master/public/img), được đóng gói dưới dạng WebP.
