<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Navbar -->
    <nav class="bg-emerald-700 text-white shadow-md">
      <div
        class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center gap-4"
      >
        <RouterLink
          to="/"
          class="font-bold text-lg tracking-wide flex items-center gap-2"
        >
          <span>SIM Perpustakaan</span>
        </RouterLink>
        <div class="flex items-center gap-6 text-sm font-medium">
          <RouterLink
            to="/"
            class="hover:text-emerald-200 transition"
            active-class="text-emerald-200 underline underline-offset-4"
          >
            Daftar Buku
          </RouterLink>
          <RouterLink
            to="/buku/create"
            class="bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 rounded-lg transition"
          >
            + Tambah Buku
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
