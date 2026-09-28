<script setup lang="ts">
import { ref } from 'vue'
import ProductList, { type Product } from './components/ProductList.vue'
import OrderForm from './components/OrderForm.vue'

// Danh sách sản phẩm, ảnh nằm trong thư mục public/images
const products = ref<Product[]>([
  {
    productId: 1,
    productName: 'Leaf Rake',
    productCode: 'GDN-0011',
    releaseDate: 'March 19, 2016',
    description: 'Leaf rake with 48-inch wooden handle.',
    price: 19.95,
    starRating: 3.2,
    imageUrl: '/images/leaf-rake.svg',
  },
  {
    productId: 2,
    productName: 'Garden Cart',
    productCode: 'GDN-0023',
    releaseDate: 'March 18, 2016',
    description: '15 gallon capacity rolling garden cart',
    price: 32.99,
    starRating: 4.2,
    imageUrl: '/images/garden-cart.svg',
  },
  {
    productId: 5,
    productName: 'Hammer',
    productCode: 'TBX-0048',
    releaseDate: 'May 21, 2016',
    description: 'Curved claw steel hammer',
    price: 8.9,
    starRating: 4.8,
    imageUrl: '/images/hammer.svg',
  },
  {
    productId: 8,
    productName: 'Saw',
    productCode: 'TBX-0022',
    releaseDate: 'May 15, 2016',
    description: '15-inch steel blade hand saw',
    price: 11.55,
    starRating: 3.7,
    imageUrl: '/images/saw.svg',
  },
  {
    productId: 10,
    productName: 'Video Game Controller',
    productCode: 'GMG-0042',
    releaseDate: 'October 15, 2015',
    description: 'Standard two-button video game controller',
    price: 35.95,
    starRating: 4.6,
    imageUrl: '/images/xbox-controller.svg',
  },
])
</script>

<template>
  <main>
    <!-- Bài 6: OrderForm -->
    <OrderForm />

    <!-- Gọi component ProductList và truyền dữ liệu qua props -->
    <ProductList :products="products" />
  </main>
</template>
