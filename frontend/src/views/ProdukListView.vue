<script setup>
import { ref, computed, onMounted } from "vue";
import produkService from "../services/produkService.js";

const produk = ref([]);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");

const fetchData = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await produkService.getAll();
    produk.value = res.data.data || res.data;
  } catch (e) {
    error.value =
      e.response?.data?.message ||
      "Gagal memuat data dari server. Pastikan backend aktif.";
  } finally {
    loading.value = false;
  }
};

const hapus = async (id, nama) => {
  if (!confirm(`Yakin ingin menghapus produk "${nama}"?`)) return;
  try {
    await produkService.remove(id);
    fetchData();
  } catch (e) {
    alert(
      "Gagal menghapus produk: " + (e.response?.data?.message || e.message),
    );
  }
};

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(angka) || 0);
};

const filteredProduk = computed(() => {
  if (!searchQuery.value.trim()) return produk.value;
  const q = searchQuery.value.toLowerCase();
  return produk.value.filter(
    (p) =>
      p.nama_produk?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q) ||
      p.deskripsi?.toLowerCase().includes(q),
  );
});

const totalStok = computed(() => {
  return produk.value.reduce((acc, item) => acc + (Number(item.stok) || 0), 0);
});

const totalNilaiInventaris = computed(() => {
  return produk.value.reduce((acc, item) => {
    return acc + (Number(item.harga) || 0) * (Number(item.stok) || 0);
  }, 0);
});

onMounted(fetchData);
</script>

<template>
  <div class="max-w-6xl mx-auto p-4 sm:p-6">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800">
          Manajemen Penjualan Produk
        </h1>
        <p class="text-sm text-gray-500">
          Kelola inventaris barang, penyesuaian harga jual, dan stok produk
        </p>
      </div>
      <RouterLink
        to="/produk/create"
        class="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm transition"
      >
        + Tambah Produk
      </RouterLink>
    </div>

    <!-- Ringkasan Metrik & Filter -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div
        class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
      >
        <div>
          <p class="text-xs font-semibold text-gray-500 uppercase">Total SKU</p>
          <p class="text-2xl font-bold text-gray-800">{{ produk.length }}</p>
        </div>
        <span
          class="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full"
          >Item</span
        >
      </div>

      <div
        class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
      >
        <div>
          <p class="text-xs font-semibold text-gray-500 uppercase">
            Total Unit Stok
          </p>
          <p class="text-2xl font-bold text-emerald-600">{{ totalStok }}</p>
        </div>
        <span
          class="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full"
          >Unit</span
        >
      </div>

      <div
        class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
      >
        <div>
          <p class="text-xs font-semibold text-gray-500 uppercase">
            Nilai Aset Stok
          </p>
          <p class="text-base font-bold text-indigo-600 truncate">
            {{ formatRupiah(totalNilaiInventaris) }}
          </p>
        </div>
      </div>

      <div
        class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari SKU, nama produk, spesifikasi..."
          class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
      </div>
    </div>

    <!-- State Loading -->
    <div
      v-if="loading"
      class="bg-white shadow-sm rounded-xl p-12 text-center text-gray-500"
    >
      Memuat data katalog produk...
    </div>

    <!-- State Error -->
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex justify-between items-center"
    >
      <span>{{ error }}</span>
      <button
        @click="fetchData"
        class="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
      >
        Coba Lagi
      </button>
    </div>

    <!-- State Kosong -->
    <div
      v-else-if="filteredProduk.length === 0"
      class="bg-white shadow-sm rounded-xl p-12 text-center text-gray-500"
    >
      Tidak ada data produk yang ditemukan.
    </div>

    <!-- Tabel Produk -->
    <div
      v-else
      class="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                SKU
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Nama Produk
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Deskripsi
              </th>
              <th
                class="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Harga
              </th>
              <th
                class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Stok
              </th>
              <th
                class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="p in filteredProduk"
              :key="p.id"
              class="hover:bg-gray-50 transition"
            >
              <td
                class="px-4 py-3 text-sm font-mono font-medium text-indigo-600 whitespace-nowrap"
              >
                {{ p.sku }}
              </td>
              <td class="px-4 py-3 text-sm font-medium text-gray-900">
                {{ p.nama_produk }}
              </td>
              <td class="px-4 py-3 text-xs text-gray-500 max-w-xs truncate">
                {{ p.deskripsi || "-" }}
              </td>
              <td
                class="px-4 py-3 text-sm text-right font-semibold text-gray-800 whitespace-nowrap"
              >
                {{ formatRupiah(p.harga) }}
              </td>
              <td class="px-4 py-3 text-sm text-center">
                <span
                  :class="
                    p.stok > 10
                      ? 'bg-green-100 text-green-700'
                      : p.stok > 0
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                  "
                  class="inline-block font-semibold text-xs px-2.5 py-1 rounded-full"
                >
                  {{ p.stok }}
                </span>
              </td>
              <td
                class="px-4 py-3 text-sm text-center whitespace-nowrap space-x-2"
              >
                <RouterLink
                  :to="`/produk/edit/${p.id}`"
                  class="inline-block bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-md transition"
                >
                  Edit
                </RouterLink>
                <button
                  @click="hapus(p.id, p.nama_produk)"
                  class="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-md transition"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
