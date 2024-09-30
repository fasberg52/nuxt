<template>
  <section class="font-iranyekan">
    <!-- Header Section -->
    <div class="bg-blue-600 py-10 text-white text-center">
      <h1 class="text-2xl font-bold">نمونه کارها</h1>
      <p class="text-sm mt-2">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است.
      </p>
      <div class="container mt-4 mx-auto">
        <input
          type="text"
          v-model="searchQuery"
          class="px-4 py-2 rounded-md w-3/4 laptop:w-1/3"
          placeholder="جستجو کنید..."
        />
      </div>
    </div>

    <!-- ShadCN Tabs Section -->
    <Tabs
      :value="activeTab"
      @update:value="changeTab"
      class="w-full container mx-auto px-4 my-6"
    >
      <TabsList
        class="flex space-x-4 border-b pb-2 mb-4 justify-center"
        dir="rtl"
      >
        <TabsTrigger
          v-for="tab in tabs"
          :key="tab"
          :value="tab"
          class="px-4 py-2 font-semibold"
          :class="
            activeTab === tab
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500 hover:text-blue-500'
          "
        >
          {{ tab }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="فروشگاهی">
        <div
          class="container mx-auto px-4 grid grid-cols-4 mobile:grid-cols-2 laptop:grid-cols-4 gap-6"
        >
          <!-- Styled Skeleton Loader while data is loading -->
          <div
            v-if="loading"
            v-for="n in 8"
            :key="n"
            class="space-y-4 p-4 border rounded-lg shadow-md"
          >
            <Skeleton class="w-full h-40 rounded-md mb-4" />
            <Skeleton class="w-3/4 h-6 rounded" />
            <Skeleton class="w-1/2 h-4 rounded" />
          </div>

          <!-- Display data once loaded -->
          <SampleWorkCard
            v-else
            v-for="work in filteredWorks"
            :key="work.id"
            :id="work.id"
            :image="work.image"
            :title="work.title"
            :description="work.description"
            :url="work.url"
          />
        </div>
      </TabsContent>
      <TabsContent value="معرفی">
        <!-- Add logic for 'معرفی' tab content here -->
      </TabsContent>
      <TabsContent value="ویدیو ها">
        <!-- Add logic for 'ویدیو ها' tab content here -->
      </TabsContent>
    </Tabs>

    <!-- Pagination -->
    <div class="flex justify-center mt-10 space-x-4">
      <button
        v-for="n in paginationPages"
        :key="n"
        class="w-8 h-8 rounded-full border flex items-center justify-center"
        :class="{ 'bg-orange-500 text-white': n === currentPage }"
        @click="changePage(n)"
      >
        {{ n }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {useSampleWorks} from '../../composable/useSampleWorks';
import {ExampleWork} from '../../interfaces/example-work.interface';
const { sampleWorks, fetchSampleWorks, loading } = useSampleWorks(); // Include loading state from composable
const searchQuery = ref<string>('');
const activeTab = ref<string>('فروشگاهی'); // Default active tab
const currentPage = ref<number>(1);
const itemsPerPage = 8;
const tabs = ['فروشگاهی', 'معرفی', 'ویدیو ها']; // Tab labels

onMounted(fetchSampleWorks);

// Explicitly type filteredWorks as an array of ExampleWork
const filteredWorks = computed<ExampleWork[]>(() => {
  return sampleWorks.value
    .filter((work: ExampleWork) => work.title.includes(searchQuery.value))
    .slice(
      (currentPage.value - 1) * itemsPerPage,
      currentPage.value * itemsPerPage,
    );
});

function changeTab(tab: string) {
  activeTab.value = tab;
  currentPage.value = 1; // Reset to first page when switching tabs
}

function changePage(page: number) {
  currentPage.value = page;
}

const paginationPages = computed(() => {
  return Math.ceil(sampleWorks.value.length / itemsPerPage);
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
