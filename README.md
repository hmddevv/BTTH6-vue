# BTTH6 - Vue: OrderForm

Bài 6: Thiết kế **OrderForm** (menu gọi món) bằng Vue 3 + TypeScript + Vite.

## Yêu cầu đề bài

- Người dùng chọn sản phẩm nào thì hệ thống **tự động tính tổng tiền**.
- Nếu trả món thì click lại vào món đó, hệ thống **tự động trừ lại tiền** trong tổng tiền.
- Sản phẩm **được chọn** hiển thị **màu xanh**; **chưa chọn hoặc đã trả món** hiển thị **màu hồng**.

## Chức năng

### 1. Chọn / trả món

| Món              | Giá    |
| ---------------- | ------ |
| Chocolate freeze | $69.00 |
| Phindi Hạnh Nhân | $50.00 |
| Cà Phê Sữa       | $40.00 |
| Trà Sen Vàng     | $40.00 |

- Click vào một món để chọn: món chuyển sang màu xanh, tổng tiền được cộng thêm.
- Click lại vào món đó để trả: món về màu hồng, tổng tiền bị trừ lại.
- Ví dụ: chọn Chocolate freeze + Phindi Hạnh Nhân → **$119.00**; chọn thêm Cà Phê Sữa → **$159.00**.

### 2. Thanh toán bill (mở rộng)

- Nút **Thanh toán** chỉ bấm được khi đã chọn ít nhất 1 món.
- Màn hình hóa đơn hiển thị thời gian lập, danh sách món đã chọn (STT, tên, giá) và tổng tiền.
- Nhập **tiền khách đưa**, hệ thống tự tính **tiền thối lại**; nếu thiếu thì báo "Chưa đủ tiền" và khóa nút **Xác nhận**.
- **Quay lại**: về menu để thêm/trả món (vẫn giữ các món đã chọn).
- Sau khi xác nhận hiện "Thanh toán thành công!", nút **Đơn mới** sẽ bỏ chọn toàn bộ món và đưa tổng tiền về $0.00.

## Cách làm

- Danh sách món lưu trong `ref`, mỗi món có thuộc tính `active` (đã chọn hay chưa).
- `@click` đảo giá trị `active` → dùng `:class="{ active: item.active }"` để đổi màu xanh/hồng.
- Tổng tiền là `computed`: lọc các món `active` rồi cộng giá, nên luôn tự cập nhật khi chọn/trả món.
- Tiền thối lại cũng là `computed` (`tiền khách đưa - tổng tiền`); luồng màn hình được điều khiển bằng biến `step` (`menu` → `bill` → `done`).

## Cấu trúc thư mục chính

```
src/
├── App.vue                      # Hiển thị OrderForm (và ProductList của bài trước)
├── components/
│   ├── OrderForm.vue            # Bài 6: menu gọi món + thanh toán bill
│   └── ProductList.vue          # Bài trước: bảng danh sách sản phẩm
└── __tests__/
    ├── App.spec.ts
    └── OrderForm.spec.ts        # Test chọn/trả món và luồng thanh toán
```

## Cài đặt và chạy

```sh
npm install      # cài thư viện
npm run dev      # chạy dev server
npm run test:unit  # chạy unit test (Vitest)
npm run build    # kiểm tra kiểu + build production
```
