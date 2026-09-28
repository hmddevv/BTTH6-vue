<script setup lang="ts">
import { computed, ref } from 'vue'

export interface MenuItem {
  name: string
  price: number
  active: boolean
}

// Danh sách món; active = true nghĩa là món đang được chọn
const items = ref<MenuItem[]>([
  { name: 'Chocolate freeze', price: 69, active: false },
  { name: 'Phindi Hạnh Nhân', price: 50, active: false },
  { name: 'Cà Phê Sữa', price: 40, active: false },
  { name: 'Trà Sen Vàng', price: 40, active: false },
])

// Click lần 1 là chọn món, click lần nữa là trả món
function toggleActive(item: MenuItem) {
  item.active = !item.active
}

// Tổng tiền tự tính lại mỗi khi có món được chọn / trả
const total = computed(() =>
  items.value.filter((item) => item.active).reduce((sum, item) => sum + item.price, 0),
)

function formatPrice(value: number) {
  return '$' + value.toFixed(2)
}

// ----- Thanh toán bill -----
// step: 'menu' = đang chọn món, 'bill' = xem hóa đơn, 'done' = đã thanh toán
const step = ref<'menu' | 'bill' | 'done'>('menu')
const cash = ref<number | null>(null) // tiền khách đưa
const billTime = ref('')

const selectedItems = computed(() => items.value.filter((item) => item.active))
const change = computed(() => (cash.value ?? 0) - total.value) // tiền thối lại
const canConfirm = computed(() => cash.value !== null && change.value >= 0)

function openBill() {
  if (selectedItems.value.length === 0) return
  billTime.value = new Date().toLocaleString('vi-VN')
  cash.value = null
  step.value = 'bill'
}

function confirmPayment() {
  if (canConfirm.value) step.value = 'done'
}

// Tạo đơn mới: bỏ chọn tất cả món, quay về menu
function newOrder() {
  items.value.forEach((item) => (item.active = false))
  cash.value = null
  step.value = 'menu'
}
</script>

<template>
  <form class="order-form" @submit.prevent>
    <h1>{{ step === 'menu' ? 'Menu' : 'Bill' }}</h1>

    <!-- Bước 1: chọn món -->
    <template v-if="step === 'menu'">
      <ul>
        <li
          v-for="item in items"
          :key="item.name"
          :class="{ active: item.active }"
          @click="toggleActive(item)"
        >
          {{ item.name }}
          <span>{{ formatPrice(item.price) }}</span>
        </li>
      </ul>

      <div class="total">
        Total:
        <span>{{ formatPrice(total) }}</span>
      </div>

      <button type="button" class="btn" :disabled="selectedItems.length === 0" @click="openBill">
        Thanh toán
      </button>
    </template>

    <!-- Bước 2 & 3: hóa đơn -->
    <div v-else class="bill">
      <p class="bill-time">Thời gian: {{ billTime }}</p>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Món</th>
            <th>Giá</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in selectedItems" :key="item.name">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ formatPrice(item.price) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="bill-row total-row">
        Tổng tiền:
        <span>{{ formatPrice(total) }}</span>
      </div>

      <template v-if="step === 'bill'">
        <label class="bill-row">
          Tiền khách đưa ($):
          <input v-model.number="cash" type="number" min="0" step="0.01" placeholder="0.00" />
        </label>
        <div class="bill-row">
          Tiền thối lại:
          <span :class="{ error: cash !== null && change < 0 }">
            {{ cash === null ? '—' : change < 0 ? 'Chưa đủ tiền' : formatPrice(change) }}
          </span>
        </div>

        <div class="actions">
          <button type="button" class="btn secondary" @click="step = 'menu'">Quay lại</button>
          <button type="button" class="btn" :disabled="!canConfirm" @click="confirmPayment">
            Xác nhận
          </button>
        </div>
      </template>

      <template v-else>
        <div class="bill-row">
          Tiền khách đưa:
          <span>{{ formatPrice(cash ?? 0) }}</span>
        </div>
        <div class="bill-row">
          Tiền thối lại:
          <span>{{ formatPrice(change) }}</span>
        </div>
        <p class="success">Thanh toán thành công! Cảm ơn quý khách.</p>
        <div class="actions">
          <button type="button" class="btn" @click="newOrder">Đơn mới</button>
        </div>
      </template>
    </div>
  </form>
</template>

<style scoped>
.order-form {
  width: 470px;
  max-width: 100%;
  margin: 0 auto 2rem;
  padding: 20px 50px 40px;
  background-color: #61a1bc;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
}

h1 {
  margin: 0 0 20px;
  text-align: center;
  font-family: 'Comic Sans MS', 'Chalkboard SE', cursive;
  font-size: 64px;
  font-weight: normal;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 20px 30px;
  background-color: #e35885; /* chưa chọn hoặc đã trả món: màu hồng */
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s;
}

li.active {
  background-color: #8ec16d; /* đã chọn: màu xanh */
}

.total {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding: 20px 30px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 18px;
  font-weight: bold;
}

.btn {
  display: block;
  width: 100%;
  margin-top: 24px;
  padding: 14px;
  border: none;
  background-color: #8ec16d;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn:hover:not(:disabled) {
  opacity: 0.85;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn.secondary {
  background-color: #e35885;
}

.bill {
  padding: 20px;
  background-color: #fff;
  color: #333;
}

.bill-time {
  margin: 0 0 12px;
  font-size: 14px;
  color: #666;
}

.bill table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}

.bill th,
.bill td {
  padding: 8px 4px;
  border-bottom: 1px dashed #ccc;
  text-align: left;
}

.bill th:last-child,
.bill td:last-child {
  text-align: right;
}

.bill-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  font-size: 16px;
}

.total-row {
  font-size: 18px;
  font-weight: bold;
}

.bill-row input {
  width: 120px;
  padding: 6px 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: right;
}

.error {
  color: #e35885;
  font-weight: bold;
}

.success {
  margin: 16px 0 0;
  text-align: center;
  color: #5a9a3a;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 12px;
}

.actions .btn {
  flex: 1;
}
</style>
