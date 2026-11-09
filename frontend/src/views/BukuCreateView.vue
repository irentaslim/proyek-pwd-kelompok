<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import bukuService from "../services/bukuService.js";
import BukuForm from "../components/BukuForm.vue";

const router = useRouter();
const form = ref({
  isbn: "",
  judul: "",
  pengarang: "",
  penerbit: "",
  tahun: new Date().getFullYear(),
  stok: 1,
});
const loading = ref(false);

const submit = async () => {
  loading.value = true;
  try {
    await bukuService.create(form.value);
    router.push({ name: "buku-list" });
  } catch (e) {
    alert("Gagal menyimpan buku: " + (e.response?.data?.message || e.message));
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="max-w-3xl mx-auto p-4 sm:p-6">
    <div class="mb-6">
      <RouterLink
        to="/"
        class="text-emerald-600 hover:underline text-sm font-medium"
      >
        &larr; Kembali ke Katalog Buku
      </RouterLink>
      <h1 class="text-2xl font-bold text-gray-800 mt-2">Tambah Buku Baru</h1>
      <p class="text-sm text-gray-500">
        Isi formulir di bawah ini untuk menambahkan koleksi buku ke
        perpustakaan.
      </p>
    </div>

    <BukuForm v-model="form" :loading="loading" @submit="submit" />
  </div>
</template>
