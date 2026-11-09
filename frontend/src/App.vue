<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Navbar -->
    <nav class="bg-indigo-700 text-white shadow-md">
      <div
        class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center gap-4"
      >
        <RouterLink
          to="/"
          class="font-bold text-lg tracking-wide flex items-center gap-2"
        >
          <span>SIM Penjualan Produk</span>
        </RouterLink>
        <div class="flex items-center gap-6 text-sm font-medium">
          <RouterLink
            to="/"
            class="hover:text-indigo-200 transition"
            active-class="text-indigo-200 underline underline-offset-4"
          >
            Katalog Produk
          </RouterLink>
          <RouterLink
            to="/produk/create"
            class="bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 rounded-lg transition"
          >
            + Tambah Produk
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Konten Halaman -->
    <main class="py-4">
      <RouterView />
    </main>
  </div>
</template>
