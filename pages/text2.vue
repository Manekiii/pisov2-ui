<template>
  <IonPage>
    <IonContent>
      <div
        class="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 space-y-6"
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-2">
          <div>
            <!-- <p
              class="text-xs font-semibold tracking-widest text-cyan-600 uppercase mb-1"
            >
              Warehouse Management System
            </p> -->
            <h1 class="text-3xl font-bold text-slate-800 tracking-tight">
              Pallet Inventory <span class="text-cyan-600">Dashboard</span>
            </h1>
          </div>
          <div class="text-right">
            <p class="text-xs text-slate-400">Last Updated</p>
            <p class="text-sm font-semibold text-slate-600">
              {{ currentDate }}
            </p>
          </div>
        </div>

        <!-- ───────── SKELETON: KPI Cards ───────── -->
        <div
          v-if="isLoading"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div
            v-for="i in 4"
            :key="i"
            class="rounded-2xl p-5 bg-white border border-slate-200 flex flex-col gap-3 shadow-sm"
          >
            <div class="skeleton h-3 w-24 rounded-full"></div>
            <div class="skeleton h-9 w-20 rounded-lg"></div>
            <div class="skeleton h-2.5 w-32 rounded-full"></div>
          </div>
        </div>

        <!-- KPI Cards Row -->
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div
            class="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-5 shadow-md shadow-cyan-200 flex flex-col gap-1"
          >
            <p
              class="text-xs font-semibold uppercase tracking-widest text-cyan-100/80"
            >
              Total Pallet Inventory
            </p>
            <p class="text-4xl font-black text-white">
              {{ formatNumber(data.totalPalletInventory) }}
            </p>
            <p class="text-xs text-cyan-100/60 mt-1">All districts combined</p>
          </div>
          <div
            class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-1"
          >
            <p
              class="text-xs font-semibold uppercase tracking-widest text-slate-400"
            >
              Districts Active
            </p>
            <p class="text-4xl font-black text-slate-800">
              {{ data.palletInventoryPerDistrict.length }}
            </p>
            <p class="text-xs text-slate-400 mt-1">Reporting districts</p>
          </div>
          <div
            class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-1"
          >
            <p
              class="text-xs font-semibold uppercase tracking-widest text-slate-400"
            >
              Sites Active
            </p>
            <p class="text-4xl font-black text-slate-800">
              {{ data.palletInventoryPerSite.length }}
            </p>
            <p class="text-xs text-slate-400 mt-1">Warehouse sites</p>
          </div>
          <div
            :class="
              data.damagePalletInventoryPerSite.length > 0
                ? 'bg-red-50 border-red-200'
                : 'bg-white border-slate-200'
            "
            class="border rounded-2xl p-5 shadow-sm flex flex-col gap-1"
          >
            <p
              class="text-xs font-semibold uppercase tracking-widest text-slate-400"
            >
              Damaged Pallets
            </p>
            <p
              class="text-4xl font-black"
              :class="
                data.damagePalletInventoryPerSite.length > 0
                  ? 'text-red-500'
                  : 'text-emerald-500'
              "
            >
              {{
                data.damagePalletInventoryPerSite.length > 0
                  ? formatNumber(totalDamaged)
                  : "0"
              }}
            </p>
            <p class="text-xs text-slate-400 mt-1">
              {{
                data.damagePalletInventoryPerSite.length > 0
                  ? "Requires attention"
                  : "No damage reported"
              }}
            </p>
          </div>
        </div>

        <!-- ───────── SKELETON: Bar Charts ───────── -->
        <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4"
          >
            <div class="skeleton h-3 w-36 rounded-full"></div>
            <div v-for="j in 2" :key="j" class="space-y-2">
              <div class="flex justify-between">
                <div class="skeleton h-2.5 w-20 rounded-full"></div>
                <div class="skeleton h-2.5 w-12 rounded-full"></div>
              </div>
              <div
                class="skeleton h-2 rounded-full"
                :style="{ width: 75 - j * 15 + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Bar Charts Row -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- Inventory Per District -->
          <div
            class="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col"
            style="height: 340px"
          >
            <!-- Card Header -->
            <div class="px-5 pt-5 pb-3 flex-shrink-0">
              <div class="flex items-center justify-between mb-3">
                <h2
                  class="text-xs font-bold uppercase tracking-widest text-slate-400"
                >
                  Inventory per District
                </h2>
                <span
                  class="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full"
                >
                  {{ filteredDistricts.length }} /
                  {{ data.palletInventoryPerDistrict.length }}
                </span>
              </div>
              <!-- Search -->
              <div class="relative">
                <svg
                  class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  v-model="searchDistrict"
                  type="text"
                  placeholder="Search district..."
                  class="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition"
                />
              </div>
            </div>
            <!-- Scrollable List -->
            <div
              class="flex-1 overflow-y-auto px-5 pb-5 space-y-3 scrollbar-thin"
            >
              <div v-for="item in filteredDistricts" :key="item.districtname">
                <div class="flex justify-between text-xs mb-1.5">
                  <span
                    class="font-semibold text-slate-600 truncate max-w-[60%]"
                    >{{ item.districtname }}</span
                  >
                  <span class="text-cyan-600 font-bold flex-shrink-0">{{
                    formatNumber(item.sum)
                  }}</span>
                </div>
                <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full bar-animate"
                    :style="{
                      width: getBarWidth(item.sum, maxDistrictVal) + '%',
                    }"
                  ></div>
                </div>
              </div>
              <div
                v-if="filteredDistricts.length === 0"
                class="flex flex-col items-center justify-center py-8 gap-2"
              >
                <svg
                  class="w-8 h-8 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-xs text-slate-400">No results found</p>
              </div>
            </div>
          </div>

          <!-- Inventory Per Site -->
          <div
            class="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col"
            style="height: 340px"
          >
            <div class="px-5 pt-5 pb-3 flex-shrink-0">
              <div class="flex items-center justify-between mb-3">
                <h2
                  class="text-xs font-bold uppercase tracking-widest text-slate-400"
                >
                  Inventory per Site
                </h2>
                <span
                  class="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full"
                >
                  {{ filteredSites.length }} /
                  {{ data.palletInventoryPerSite.length }}
                </span>
              </div>
              <div class="relative">
                <svg
                  class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  v-model="searchSite"
                  type="text"
                  placeholder="Search site..."
                  class="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition"
                />
              </div>
            </div>
            <div
              class="flex-1 overflow-y-auto px-5 pb-5 space-y-3 scrollbar-thin"
            >
              <div v-for="item in filteredSites" :key="item.SiteName">
                <div class="flex justify-between text-xs mb-1.5">
                  <span
                    class="font-semibold text-slate-600 truncate max-w-[60%]"
                    >{{ item.SiteName }}</span
                  >
                  <span class="text-violet-600 font-bold flex-shrink-0">{{
                    formatNumber(item.sum)
                  }}</span>
                </div>
                <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full bar-animate"
                    :style="{ width: getBarWidth(item.sum, maxSiteVal) + '%' }"
                  ></div>
                </div>
              </div>
              <div
                v-if="filteredSites.length === 0"
                class="flex flex-col items-center justify-center py-8 gap-2"
              >
                <svg
                  class="w-8 h-8 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-xs text-slate-400">No results found</p>
              </div>
            </div>
          </div>

          <!-- Damaged Pallets Per Site -->
          <div
            class="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col"
            style="height: 340px"
          >
            <div class="px-5 pt-5 pb-3 flex-shrink-0">
              <div class="flex items-center justify-between mb-3">
                <h2
                  class="text-xs font-bold uppercase tracking-widest text-slate-400"
                >
                  Damaged Pallets per Site
                </h2>
                <span
                  class="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full"
                >
                  {{ filteredDamage.length }} /
                  {{ data.damagePalletInventoryPerSite.length }}
                </span>
              </div>
              <div class="relative">
                <svg
                  class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  v-model="searchDamage"
                  type="text"
                  placeholder="Search site..."
                  class="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
                />
              </div>
            </div>
            <div
              class="flex-1 overflow-y-auto px-5 pb-5 space-y-3 scrollbar-thin"
            >
              <div v-for="item in filteredDamage" :key="item.SiteName">
                <div class="flex justify-between text-xs mb-1.5">
                  <span
                    class="font-semibold text-slate-600 truncate max-w-[60%]"
                    >{{ item.SiteName }}</span
                  >
                  <span class="text-red-500 font-bold flex-shrink-0">{{
                    formatNumber(item.sum)
                  }}</span>
                </div>
                <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full bar-animate"
                    :style="{
                      width: getBarWidth(item.sum, maxDamageVal) + '%',
                    }"
                  ></div>
                </div>
              </div>
              <!-- Empty: no damage at all -->
              <div
                v-if="data.damagePalletInventoryPerSite.length === 0"
                class="flex flex-col items-center justify-center py-8 gap-2"
              >
                <div
                  class="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p class="text-xs text-emerald-600 font-semibold">
                  No damaged pallets
                </p>
              </div>
              <!-- Empty: search no match -->
              <div
                v-else-if="filteredDamage.length === 0"
                class="flex flex-col items-center justify-center py-8 gap-2"
              >
                <svg
                  class="w-8 h-8 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-xs text-slate-400">No results found</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ───────── SKELETON: Detail Tables ───────── -->
        <div v-if="isLoading" class="space-y-4">
          <div class="skeleton h-3 w-56 rounded-full"></div>
          <div
            class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <!-- district header -->
            <div class="bg-slate-100 px-5 py-3 flex items-center gap-3">
              <div class="skeleton h-3 w-40 rounded-full"></div>
            </div>
            <!-- site header -->
            <div
              class="bg-slate-50 px-5 py-2 border-t border-slate-100 flex items-center gap-3"
            >
              <div class="skeleton h-2.5 w-28 rounded-full"></div>
            </div>
            <!-- summary table -->
            <div class="px-5 py-4 space-y-3">
              <div class="skeleton h-2.5 w-32 rounded-full mb-3"></div>
              <div v-for="r in 3" :key="'s' + r" class="grid grid-cols-4 gap-4">
                <div class="skeleton h-2.5 rounded-full col-span-1"></div>
                <div class="skeleton h-2.5 rounded-full col-span-1"></div>
                <div class="skeleton h-2.5 rounded-full col-span-1"></div>
                <div class="skeleton h-2.5 rounded-full col-span-1"></div>
              </div>
            </div>
            <!-- location table -->
            <div class="px-5 pb-5 border-t border-slate-100 space-y-3">
              <div class="skeleton h-2.5 w-28 rounded-full mt-4 mb-3"></div>
              <div v-for="r in 6" :key="'l' + r" class="grid grid-cols-5 gap-3">
                <div class="skeleton h-2.5 rounded-full"></div>
                <div class="skeleton h-2.5 rounded-full"></div>
                <div class="skeleton h-2.5 rounded-full"></div>
                <div class="skeleton h-2.5 rounded-full"></div>
                <div class="skeleton h-2.5 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detail Tables -->
        <div v-else class="space-y-4">
          <!-- Section header + search bar -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-3">
            <h2
              class="text-xs font-bold uppercase tracking-widest text-slate-400 flex-shrink-0"
            >
              Inventory Detail by District &amp; Site
            </h2>
            <div class="flex gap-2 sm:ml-auto w-full sm:w-auto">
              <!-- District search -->
              <div class="relative flex-1 sm:w-52">
                <svg
                  class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  v-model="searchDetailDistrict"
                  type="text"
                  placeholder="Search district..."
                  class="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition shadow-sm"
                />
              </div>
              <!-- Site search -->
              <div class="relative flex-1 sm:w-52">
                <svg
                  class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  v-model="searchDetailSite"
                  type="text"
                  placeholder="Search site..."
                  class="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition shadow-sm"
                />
              </div>
              <!-- Expand / Collapse all -->
              <button
                @click="toggleAllDistricts"
                class="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition shadow-sm"
              >
                <svg
                  class="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {{ allDistrictsExpanded ? "Collapse All" : "Expand All" }}
              </button>
            </div>
          </div>

          <!-- No search results -->
          <div
            v-if="
              filteredGroupedDetails &&
              Object.keys(filteredGroupedDetails).length === 0
            "
            class="bg-white border border-slate-200 rounded-2xl p-10 flex flex-col items-center gap-3 shadow-sm"
          >
            <svg
              class="w-10 h-10 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-sm text-slate-400 font-medium">
              No matching districts or sites found
            </p>
            <button
              @click="
                searchDetailDistrict = '';
                searchDetailSite = '';
              "
              class="text-xs text-cyan-600 font-semibold hover:underline"
            >
              Clear search
            </button>
          </div>

          <!-- District blocks -->
          <div
            v-for="(district, dKey) in filteredGroupedDetails"
            :key="dKey"
            class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <!-- ── District Header (clickable collapse) ── -->
            <button
              type="button"
              @click="toggleDistrict(dKey)"
              class="w-full bg-slate-100 hover:bg-slate-200/70 px-5 py-3 flex items-center gap-3 transition text-left group"
            >
              <div class="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0"></div>
              <span
                class="text-xs font-bold uppercase tracking-widest text-cyan-700 flex-1"
              >
                District: {{ dKey }}
              </span>
              <!-- site count badge -->
              <span
                class="text-[10px] font-semibold bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full mr-2"
              >
                {{ Object.keys(district).length }} site{{
                  Object.keys(district).length !== 1 ? "s" : ""
                }}
              </span>
              <!-- chevron -->
              <svg
                class="w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0"
                :class="isDistrictOpen(dKey) ? 'rotate-180' : 'rotate-0'"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- ── District Body (collapsible) ── -->
            <div v-show="isDistrictOpen(dKey)" class="collapse-body">
              <div
                v-for="(siteItems, sKey) in district"
                :key="sKey"
                class="border-t border-slate-100"
              >
                <!-- ── Site Sub-header (clickable collapse) ── -->
                <button
                  type="button"
                  @click="toggleSite(dKey, sKey)"
                  class="w-full bg-violet-50/60 hover:bg-violet-100/60 px-5 py-2.5 flex items-center gap-3 transition text-left"
                >
                  <div
                    class="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0"
                  ></div>
                  <span
                    class="text-xs font-semibold uppercase tracking-wider text-violet-700 flex-1"
                  >
                    Site: {{ sKey }}
                  </span>
                  <!-- row count badge -->
                  <span
                    class="text-[10px] font-semibold bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full mr-2"
                  >
                    {{ getLocationDetails(dKey, sKey).length }} location{{
                      getLocationDetails(dKey, sKey).length !== 1 ? "s" : ""
                    }}
                  </span>
                  <svg
                    class="w-3.5 h-3.5 text-slate-400 transition-transform duration-300 flex-shrink-0"
                    :class="isSiteOpen(dKey, sKey) ? 'rotate-180' : 'rotate-0'"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <!-- ── Site Body (collapsible) ── -->
                <div v-show="isSiteOpen(dKey, sKey)" class="collapse-body">
                  <!-- Group Summary Table -->
                  <div class="px-5 py-4">
                    <p
                      class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3"
                    >
                      Summary by Item
                    </p>
                    <div
                      class="overflow-x-auto rounded-xl border border-slate-100"
                    >
                      <table class="w-full text-xs">
                        <thead>
                          <tr class="bg-slate-50">
                            <th
                              class="text-left px-4 py-2.5 font-semibold text-slate-500"
                            >
                              Item Description
                            </th>
                            <th
                              class="text-right px-4 py-2.5 font-semibold text-slate-500"
                            >
                              System Qty
                            </th>
                            <th
                              class="text-right px-4 py-2.5 font-semibold text-slate-500"
                            >
                              Actual Qty
                            </th>
                            <th
                              class="text-right px-4 py-2.5 font-semibold text-slate-500"
                            >
                              Variance
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(row, idx) in getGroupSummary(dKey, sKey)"
                            :key="row.ItemDesc"
                            :class="
                              idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                            "
                          >
                            <td class="px-4 py-2.5 font-medium text-slate-700">
                              {{ row.ItemDesc }}
                            </td>
                            <td class="px-4 py-2.5 text-right text-slate-600">
                              {{ formatNumber(row.sum1) }}
                            </td>
                            <td class="px-4 py-2.5 text-right text-slate-600">
                              {{ formatNumber(row.sum2) }}
                            </td>
                            <td
                              class="px-4 py-2.5 text-right font-bold"
                              :class="
                                row.sum3 >= 0
                                  ? 'text-emerald-600'
                                  : 'text-red-500'
                              "
                            >
                              <span class="inline-flex items-center gap-1">
                                <svg
                                  v-if="row.sum3 < 0"
                                  class="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                                    clip-rule="evenodd"
                                    transform="rotate(180 10 10)"
                                  />
                                </svg>
                                <svg
                                  v-else
                                  class="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clip-rule="evenodd"
                                    transform="rotate(180 10 10)"
                                  />
                                </svg>
                                {{ formatNumber(Math.abs(row.sum3)) }}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <!-- Location Detail Table -->
                  <div class="px-5 pb-5 border-t border-slate-100">
                    <p
                      class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-4 mb-3"
                    >
                      Detail by Location
                    </p>
                    <div
                      class="overflow-x-auto rounded-xl border border-slate-100"
                    >
                      <table class="w-full text-xs">
                        <thead>
                          <tr class="bg-slate-50">
                            <th
                              class="text-left px-4 py-2.5 font-semibold text-slate-500"
                            >
                              Location ID
                            </th>
                            <th
                              class="text-left px-4 py-2.5 font-semibold text-slate-500"
                            >
                              Item
                            </th>
                            <th
                              class="text-right px-4 py-2.5 font-semibold text-slate-500"
                            >
                              System Qty
                            </th>
                            <th
                              class="text-right px-4 py-2.5 font-semibold text-slate-500"
                            >
                              Actual Qty
                            </th>
                            <th
                              class="text-right px-4 py-2.5 font-semibold text-slate-500"
                            >
                              Variance
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(row, idx) in getLocationDetails(dKey, sKey)"
                            :key="row.LocationId + row.ItemDesc"
                            :class="
                              idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                            "
                          >
                            <td class="px-4 py-2.5">
                              <span
                                class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-semibold text-[10px]"
                              >
                                {{ row.LocationId }}
                              </span>
                            </td>
                            <td class="px-4 py-2.5 text-slate-600">
                              {{ row.ItemDesc }}
                            </td>
                            <td class="px-4 py-2.5 text-right text-slate-600">
                              {{ formatNumber(row.sum1) }}
                            </td>
                            <td class="px-4 py-2.5 text-right text-slate-600">
                              {{ formatNumber(row.sum2) }}
                            </td>
                            <td
                              class="px-4 py-2.5 text-right font-bold"
                              :class="
                                row.sum3 >= 0
                                  ? 'text-emerald-600'
                                  : 'text-red-500'
                              "
                            >
                              {{ row.sum3 >= 0 ? "+" : ""
                              }}{{ formatNumber(row.sum3) }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <!-- end site body -->
              </div>
            </div>
            <!-- end district body -->
          </div>
        </div>

        <!-- Footer -->
        <p class="text-center text-xs text-slate-400 pt-2 pb-4">
          Pallet Inventory Dashboard &copy; {{ new Date().getFullYear() }} ·
          Warehouse Management System
        </p>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { serviceApi } from "~/services/piso-serviceapi";

// ── State ─────────────────────────────────────────────────────────────────────
const isLoading = ref(true);

// Bar chart search terms
const searchDistrict = ref("");
const searchSite = ref("");
const searchDamage = ref("");

// Detail section search terms
const searchDetailDistrict = ref("");
const searchDetailSite = ref("");

// Collapse state: Set of open district keys, and Map of "dKey|sKey" for sites
const openDistricts = ref(new Set());
const openSites = ref(new Set());

const data = reactive({
  totalPalletInventory: 0,
  palletInventoryPerDistrict: [],
  damagePalletInventoryPerSite: [],
  palletInventoryPerSite: [],
  palletInventoryDetailPerGroup: [],
  palletInventoryDetailPerGroupPerLocation: [],
});

// ── API Call ──────────────────────────────────────────────────────────────────
const getDashboardData = async () => {
  try {
    isLoading.value = true;
    const response = await serviceApi().get("Pallet/Test", {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    });
    if (response.status === 200) {
      Object.assign(data, response.data);
      console.log("this is response: ", data);
    }
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getDashboardData();
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const currentDate = new Date().toLocaleDateString("en-PH", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const formatNumber = (n) =>
  Number(n).toLocaleString("en-PH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });

const getBarWidth = (val, max) =>
  max === 0 ? 0 : Math.max(4, (val / max) * 100);

const maxDistrictVal = computed(() =>
  Math.max(...data.palletInventoryPerDistrict.map((d) => d.sum), 1),
);
const maxSiteVal = computed(() =>
  Math.max(...data.palletInventoryPerSite.map((d) => d.sum), 1),
);
const maxDamageVal = computed(() =>
  Math.max(...data.damagePalletInventoryPerSite.map((d) => d.sum), 1),
);
const totalDamaged = computed(() =>
  data.damagePalletInventoryPerSite.reduce((a, b) => a + b.sum, 0),
);

// ── Bar Chart Filtered Lists ──────────────────────────────────────────────────
const filteredDistricts = computed(() => {
  const q = searchDistrict.value.trim().toLowerCase();
  if (!q) return data.palletInventoryPerDistrict;
  return data.palletInventoryPerDistrict.filter((d) =>
    d.districtname.toLowerCase().includes(q),
  );
});

const filteredSites = computed(() => {
  const q = searchSite.value.trim().toLowerCase();
  if (!q) return data.palletInventoryPerSite;
  return data.palletInventoryPerSite.filter((d) =>
    d.SiteName.toLowerCase().includes(q),
  );
});

const filteredDamage = computed(() => {
  const q = searchDamage.value.trim().toLowerCase();
  if (!q) return data.damagePalletInventoryPerSite;
  return data.damagePalletInventoryPerSite.filter((d) =>
    d.SiteName.toLowerCase().includes(q),
  );
});

// Group: { [districtName]: { [siteName]: items[] } }
const groupedDetails = computed(() => {
  const result = {};
  for (const row of data.palletInventoryDetailPerGroupPerLocation) {
    if (!result[row.DisctrictName]) result[row.DisctrictName] = {};
    if (!result[row.DisctrictName][row.SiteName])
      result[row.DisctrictName][row.SiteName] = [];
    result[row.DisctrictName][row.SiteName].push(row);
  }
  return result;
});

// Filtered version of groupedDetails for the detail section
const filteredGroupedDetails = computed(() => {
  const dq = searchDetailDistrict.value.trim().toLowerCase();
  const sq = searchDetailSite.value.trim().toLowerCase();
  const result = {};
  for (const [dKey, sites] of Object.entries(groupedDetails.value)) {
    if (dq && !dKey.toLowerCase().includes(dq)) continue;
    const filteredSites = {};
    for (const [sKey, rows] of Object.entries(sites)) {
      if (sq && !sKey.toLowerCase().includes(sq)) continue;
      filteredSites[sKey] = rows;
    }
    if (Object.keys(filteredSites).length > 0) result[dKey] = filteredSites;
  }
  return result;
});

// ── Collapse helpers ──────────────────────────────────────────────────────────
const isDistrictOpen = (dKey) => openDistricts.value.has(dKey);

const isSiteOpen = (dKey, sKey) => openSites.value.has(`${dKey}|${sKey}`);

const toggleDistrict = (dKey) => {
  if (openDistricts.value.has(dKey)) {
    openDistricts.value.delete(dKey);
  } else {
    openDistricts.value.add(dKey);
    // auto-open all sites within this district
    const sites = groupedDetails.value[dKey] || {};
    for (const sKey of Object.keys(sites)) {
      openSites.value.add(`${dKey}|${sKey}`);
    }
  }
};

const toggleSite = (dKey, sKey) => {
  const key = `${dKey}|${sKey}`;
  if (openSites.value.has(key)) {
    openSites.value.delete(key);
  } else {
    openSites.value.add(key);
  }
};

const allDistrictsExpanded = computed(() =>
  Object.keys(groupedDetails.value).every((d) => openDistricts.value.has(d)),
);

const toggleAllDistricts = () => {
  if (allDistrictsExpanded.value) {
    openDistricts.value.clear();
    openSites.value.clear();
  } else {
    for (const [dKey, sites] of Object.entries(groupedDetails.value)) {
      openDistricts.value.add(dKey);
      for (const sKey of Object.keys(sites)) {
        openSites.value.add(`${dKey}|${sKey}`);
      }
    }
  }
};

// Auto-open all districts & sites once data loads
watch(
  groupedDetails,
  (val) => {
    for (const [dKey, sites] of Object.entries(val)) {
      openDistricts.value.add(dKey);
      for (const sKey of Object.keys(sites)) {
        openSites.value.add(`${dKey}|${sKey}`);
      }
    }
  },
  { immediate: true },
);

const getGroupSummary = (district, site) =>
  data.palletInventoryDetailPerGroup.filter(
    (r) => r.DisctrictName === district && r.SiteName === site,
  );

const getLocationDetails = (district, site) =>
  data.palletInventoryDetailPerGroupPerLocation.filter(
    (r) => r.DisctrictName === district && r.SiteName === site,
  );
</script>

<style scoped>
/* Skeleton shimmer */
.skeleton {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Bar grow on data load */
.bar-animate {
  animation: grow 0.8s ease-out both;
}
@keyframes grow {
  from {
    width: 0% !important;
  }
}

/* Thin scrollbar for bar chart lists */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 99px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}
</style>
