<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: { type: Object, required: true },
  isEdit: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "submit"]);

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <form
    @submit.prevent="emit('submit')"
    class="bg-white shadow-md rounded-xl p-6 space-y-5 border border-gray-100"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- SKU -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          SKU / Kode Produk <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.sku"
          type="text"
          required
          placeholder="Contoh: PRD-006"
          class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
      </div>

      <!-- Nama Produk -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Nama Produk <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.nama_produk"
          type="text"
          required
          placeholder="Contoh: Monitor Gaming 27 Inch"
          class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
      </div>

      <!-- Harga Satuan -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Harga (Rp) <span class="text-red-500">*</span>
        </label>
        <input
          v-model.number="form.harga"
          type="number"
          required
          min="0"
          placeholder="Contoh: 2500000"
          class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
      </div>

      <!-- Stok -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Stok Produk <span class="text-red-500">*</span>
        </label>
        <input
          v-model.number="form.stok"
          type="number"
          required
          min="0"
          placeholder="Jumlah unit tersedia"
          class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
      </div>

      <!-- Deskripsi -->
      <div class="md:col-span-2">
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Deskripsi Produk
        </label>
        <textarea
          v-model="form.deskripsi"
          rows="3"
          placeholder="Detail spesifikasi barang atau keterangan produk..."
          class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        ></textarea>
      </div>
    </div>

    <div class="pt-2">
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm transition duration-150"
      >
        {{
          loading
            ? "Menyimpan Data..."
            : isEdit
              ? "Update Data Produk"
              : "Simpan Produk Baru"
        }}
      </button>
    </div>
  </form>
</template>
