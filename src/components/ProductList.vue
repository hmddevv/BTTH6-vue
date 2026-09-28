<script setup lang="ts">
export interface Product {
  productId: number
  productName: string
  productCode: string
  releaseDate: string
  description: string
  price: number
  starRating: number
  imageUrl: string
}

// Nhận danh sách sản phẩm từ component cha (App.vue)
defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="table-wrapper">
    <table class="product-table">
      <!-- Tiêu đề cột giữ đúng như hình mẫu của đề bài -->
      <thead>
        <tr>
          <th>Image</th>
          <th>Product</th>
          <th>Code</th>
          <th>Available</th>
          <th>Price</th>
          <th>5 star rating</th>
          <th colspan="2"></th>
        </tr>
      </thead>
      <tbody>
        <!-- Duyệt mảng sản phẩm, :key lấy theo productId -->
        <tr v-for="product in products" :key="product.productId">
          <td class="image-cell">
            <img :src="product.imageUrl" :alt="product.productName" :title="product.productName" />
          </td>
          <td>{{ product.productId }}</td>
          <td>{{ product.productName }}</td>
          <td>{{ product.productCode }}</td>
          <td>{{ product.releaseDate }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.starRating }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
}

.product-table {
  width: 100%;
  max-width: 900px;
  border-collapse: collapse;
  border: 2px solid #222;
  font-family: 'Segoe UI', Roboto, Arial, sans-serif;
  font-size: 14px;
  color: #212529;
  background: #fff;
}

th,
td {
  padding: 10px 12px;
  border: 1px solid #dee2e6;
  text-align: center;
  vertical-align: top;
}

th {
  font-weight: 600;
  vertical-align: bottom;
  border-bottom-width: 2px;
}

td:nth-child(2) {
  width: 55px;
}

td:nth-child(3) {
  width: 125px;
}

td:nth-child(4) {
  white-space: nowrap;
}

td:nth-child(5) {
  width: 122px;
}

.image-cell {
  width: 115px;
  padding: 6px 8px;
  vertical-align: middle;
}

.image-cell img {
  display: block;
  width: 100px;
  height: 88px;
  margin: 0 auto;
  object-fit: contain;
}
</style>
