<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import bukuService from "../services/bukuService.js";
import BukuForm from "../components/BukuForm.vue";

const route = useRoute();
const router = useRouter();

const form = ref({
  isbn: "",
  judul: "",
  pengarang: "",
  penerbit: "",
  tahun: new Date().getFullYear(),
  stok: 0,
});
const loading = ref(false);
const fetching = ref(true);

onMounted(async () => {
  try {
    const res = await bukuService.getById(route.params.id);
    form.value = res.data.data;
  } catch (e) {
    alert(
      "Gagal mengambil data buku: " + (e.response?.data?.message || e.message),
    );
    router.push({ name: "buku-list" });
  } finally {
    fetching.value = false;
  }
});

const submit = async () => {
  loading.value = true;
  try {
    await bukuService.update(route.params.id, form.value);
    router.push({ name: "buku-list" });
  } catch (e) {
    alert(
      "Gagal memperbarui buku: " + (e.response?.data?.message || e.message),
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
        class="text-emerald-600 hover:underline text-sm font-medium"
      >
        &larr; Kembali ke Katalog Buku
      </RouterLink>
      <h1 class="text-2xl font-bold text-gray-800 mt-2">Edit Data Buku</h1>
      <p class="text-sm text-gray-500">
        Perbarui informasi detail atau jumlah stok buku.
      </p>
    </div>

    <div
      v-if="fetching"
      class="bg-white shadow-sm rounded-xl p-8 text-center text-gray-500"
    >
      Memuat data buku...
    </div>

    <BukuForm
      v-else
      v-model="form"
      :is-edit="true"
      :loading="loading"
      @submit="submit"
    />
  </div>
</template>
