<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import produkService from "../services/produkService.js";
import ProdukForm from "../components/ProdukForm.vue";

const route = useRoute();
const router = useRouter();

const form = ref({
  sku: "",
  nama_produk: "",
  harga: 0,
  stok: 0,
  deskripsi: "",
});
const loading = ref(false);
const fetching = ref(true);

onMounted(async () => {
  try {
    const res = await produkService.getById(route.params.id);
    const data = res.data.data || res.data;
    form.value = {
      sku: data.sku || "",
      nama_produk: data.nama_produk || "",
      harga: Number(data.harga) || 0,
      stok: Number(data.stok) || 0,
      deskripsi: data.deskripsi || "",
    };
  } catch (e) {
    alert(
      "Gagal mengambil data produk: " +
        (e.response?.data?.message || e.message),
    );
    router.push({ name: "produk-list" });
  } finally {
    fetching.value = false;
  }
});

const submit = async () => {
  loading.value = true;
  try {
    await produkService.update(route.params.id, form.value);
    router.push({ name: "produk-list" });
  } catch (e) {
    alert(
      "Gagal memperbarui produk: " + (e.response?.data?.message || e.message),
    );
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
        class="text-indigo-600 hover:underline text-sm font-medium"
      >
        &larr; Kembali ke Katalog Produk
      </RouterLink>
      <h1 class="text-2xl font-bold text-gray-800 mt-2">Edit Data Produk</h1>
      <p class="text-sm text-gray-500">
        Perbarui spesifikasi, penyesuaian harga, atau kuantitas stok.
      </p>
    </div>

    <div
      v-if="fetching"
      class="bg-white shadow-sm rounded-xl p-8 text-center text-gray-500"
    >
      Memuat data produk...
    </div>

    <ProdukForm
      v-else
      v-model="form"
      :is-edit="true"
      :loading="loading"
      @submit="submit"
    />
  </div>
</template>
