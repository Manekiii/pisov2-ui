<template>
  <IonPage>
    <div class="bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen">
      <!-- Header Section -->
      <div
        class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
      >
        <div class="container mx-auto px-4 py-6">
          <div class="flex items-center justify-center">
            <div class="relative">
              <h1
                class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              >
                Asset Master
              </h1>
              <div
                class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls Section -->
      <div class="container mx-auto px-4 py-6">
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6"
        >
          <!-- Search Bar -->
          <div class="relative flex-1 max-w-md group">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full pl-12 pr-4 py-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300 shadow-sm"
              placeholder="Search assets..."
              v-model="searchQuery"
              @change=""
            />
          </div>

          <!-- New Button -->
          <button
            v-show="scope.canAdd"
            @click="onNewItem()"
            class="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg
              class="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Asset
          </button>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden md:block">
          <div
            class="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden"
          >
            <div class="overflow-x-auto max-h-[60vh]">
              <table class="w-full">
                <thead class="sticky top-0 z-10">
                  <tr
                    class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                  >
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Asset Code
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      UOM
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Total Contracted
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Created By
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Created Date
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr
                    v-if="filteredLocations"
                    v-for="(item, index) in filteredLocations"
                    :key="index"
                    class="hover:bg-indigo-50/30 transition-colors duration-200 group"
                  >
                    <!-- Action Buttons -->
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <!-- Edit Button -->
                        <div class="relative" v-show="scope.canEdit">
                          <button
                            @mouseover="tooltips[index].showEdit = true"
                            @mouseleave="tooltips[index].showEdit = false"
                            @click="onEditItemMaster(item.PalletCode)"
                            class="group/btn relative p-2 text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg border border-indigo-200 hover:border-indigo-600 transition-all duration-200 hover:scale-110 hover:shadow-md"
                          >
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                          <div
                            v-if="tooltips[index].showEdit"
                            class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md shadow-lg z-10 before:content-[''] before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-gray-800"
                          >
                            Edit
                          </div>
                        </div>

                        <!-- Delete Button -->
                        <div class="relative" v-show="scope.canDelete">
                          <button
                            @mouseover="tooltips[index].showDelete = true"
                            @mouseleave="tooltips[index].showDelete = false"
                            @click="onDeleteItem(item.PalletCode)"
                            class="group/btn relative p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg border border-red-200 hover:border-red-600 transition-all duration-200 hover:scale-110 hover:shadow-md"
                          >
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                          <div
                            v-if="tooltips[index].showDelete"
                            class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md shadow-lg z-10 before:content-[''] before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-gray-800"
                          >
                            Delete
                          </div>
                        </div>
                      </div>
                    </td>

                    <td class="px-6 py-4 text-sm font-medium text-gray-900">
                      <div
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {{ item.PalletCode }}
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">
                      {{ item.PalletDescription }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                      <span
                        class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        {{ item.UnitOfMeasure }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900 font-semibold">
                      {{ item.totalcontracted?.toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                      {{ item.CreatedBy }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500 font-mono">
                      {{
                        format(new Date(item.CreateDate), "yyyy-MM-dd hh:mm:ss")
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Empty State -->
            <div
              v-if="!filteredLocations || filteredLocations.length === 0"
              class="flex flex-col items-center justify-center py-12 text-gray-500"
            >
              <svg
                class="w-16 h-16 mb-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p class="text-lg font-medium">No assets found</p>
              <p class="text-sm">Start by creating your first asset</p>
            </div>
          </div>
        </div>

        <!-- Mobile Card View -->
        <div
          class="grid grid-cols-1 gap-4 md:hidden overflow-y-auto max-h-[60vh] px-4 py-3 bg-gray-100/30 rounded-2xl"
        >
          <div
            v-if="filteredLocations"
            v-for="item in filteredLocations"
            :key="item.PalletCode"
            class="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
          >
            <!-- Card Header -->
            <div class="flex items-center justify-between mb-4">
              <div
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {{ item.PalletCode }}
              </div>
              <div class="flex items-center gap-2">
                <button
                  v-show="scope.canEdit"
                  @click="onEditItemMaster(item.PalletCode)"
                  class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  v-show="scope.canDelete"
                  @click="onDeleteItem(item.PalletCode)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Card Content -->
            <div class="space-y-3">
              <div class="flex items-start">
                <span
                  class="text-sm font-medium text-gray-500 w-24 flex-shrink-0"
                  >Description:</span
                >
                <span class="text-sm text-gray-900">{{
                  item.PalletDescription
                }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24">UOM:</span>
                <span
                  class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {{ item.UnitOfMeasure }}
                </span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Contracted:</span
                >
                <span class="text-sm text-gray-900 font-semibold">{{
                  item.totalcontracted?.toLocaleString()
                }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Created By:</span
                >
                <span class="text-sm text-gray-900">{{ item.CreatedBy }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Created:</span
                >
                <span class="text-sm text-gray-600 font-mono">
                  {{ format(new Date(item.CreateDate), "yyyy-MM-dd hh:mm:ss") }}
                </span>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200 my-4"></div>

            <!-- Modified Date Placeholder -->
            <div class="flex items-center">
              <span class="text-sm font-medium text-gray-500"
                >Modified Date:</span
              >
              <span class="text-sm text-gray-400 ml-2">—</span>
            </div>
          </div>

          <!-- Mobile Empty State -->
          <div
            v-if="!filteredLocations || filteredLocations.length === 0"
            class="flex flex-col items-center justify-center py-16 text-gray-500"
          >
            <svg
              class="w-20 h-20 mb-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <p class="text-xl font-medium mb-2">No assets found</p>
            <p class="text-sm text-center">
              Start by creating your first asset
            </p>
          </div>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/40 backdrop-blur-sm"
          @click="hideModal()"
        ></div>

        <!-- Modal -->
        <div
          class="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200/50 transform transition-all duration-300 scale-100"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between p-6 border-b border-gray-200"
          >
            <div>
              <h3 class="text-2xl font-semibold text-gray-900">Item Master</h3>
              <p class="text-sm text-gray-500 mt-1">
                {{ scope.isEdit ? "Edit" : "Create new" }} asset item
              </p>
            </div>
            <button
              @click="hideModal()"
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 max-h-[60vh] overflow-y-auto" @click="toggleDropdown">
            <div class="grid gap-6 md:grid-cols-2">
              <!-- Item ID -->
              <div>
                <label
                  for="storageid"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Item ID <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="storageid"
                  v-model="setup.itemid"
                  @input="toUpperCase('itemid')"
                  :disabled="scope.isEdit"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 bg-white"
                  placeholder="Enter unique item ID"
                  required
                />
              </div>

              <!-- Item Description -->
              <div>
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Item Description <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="description"
                  v-model="setup.itemdesc"
                  @input="toUpperCase('itemdesc')"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white"
                  placeholder="Enter detailed description"
                  required
                />
              </div>

              <!-- Unit of Measure -->
              <div>
                <label
                  for="uom"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Unit of Measure <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="uom"
                  v-model="setup.uom"
                  @input="toUpperCase('uom')"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white"
                  placeholder="e.g., KG, L, PCS, BOX"
                  required
                />
                <p class="mt-1 text-xs text-gray-500">
                  Common units: KG, L, PCS, BOX, M, CM
                </p>
              </div>

              <!-- Shelf Life -->
              <div>
                <label
                  for="shelflife"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Shelf Life (days)
                </label>
                <input
                  type="number"
                  id="shelflife"
                  v-model="setup.shelflife"
                  min="0"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white"
                  placeholder="Enter shelf life in days"
                />
                <p class="mt-1 text-xs text-gray-500">
                  Leave empty for non-perishable items
                </p>
              </div>

              <!-- Total Contracted -->
              <div>
                <label
                  for="totalcontracted"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Total Contracted Quantity <span class="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="totalcontracted"
                  v-model="setup.totalcontracted"
                  min="0"
                  step="0.01"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white"
                  placeholder="Enter contracted quantity"
                  required
                />
              </div>

              <!-- Status Toggle -->
              <div class="flex items-center justify-start">
                <div class="flex items-center">
                  <div
                    class="relative inline-block w-10 mr-2 align-middle select-none"
                  >
                    <input
                      type="checkbox"
                      id="status"
                      v-model="setup.status"
                      class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      :class="
                        setup.status
                          ? 'right-0 border-indigo-500'
                          : 'left-0 border-gray-300'
                      "
                    />
                    <label
                      for="status"
                      class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      :class="setup.status ? 'bg-indigo-500' : 'bg-gray-300'"
                    ></label>
                  </div>
                  <label
                    for="status"
                    class="text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    Active Status
                  </label>
                </div>
              </div>
            </div>

            <!-- Form Footer Info -->
            <div
              class="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200"
            >
              <div class="flex items-start">
                <svg
                  class="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div class="text-sm text-indigo-700">
                  <p class="font-medium mb-1">
                    Required fields are marked with
                    <span class="text-red-500">*</span>
                  </p>
                  <p class="text-xs">
                    Ensure all mandatory information is provided before saving
                    the item.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl"
          >
            <button
              @click="hideModal()"
              class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 bg-white"
            >
              Cancel
            </button>
            <button
              @click="onSaveItem()"
              class="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              {{ scope.isEdit ? "Update" : "Save" }} Item
            </button>
          </div>
        </div>
      </div>
    </div>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { showSwitchSiteModal } from "~/dashboard/store";
import { startLoading, stopLoading } from "~/stores/globalvariable";

const scope = reactive({});
const setup = reactive({});
const showModal = ref(false);
const sitecode = ref(
  localStorage.getItem("_102")
    ? JSON.parse(localStorage.getItem("_102")).sitecode
    : null
); /*set sidecode*/
const userFullname = JSON.parse(
  decrypt(localStorage.getItem("_214"))
).fullname; /*set userfullname*/
scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.menuId = "pallet-master";
const searchQuery = ref("");
const filteredLocations = computed(() => {
  if (!searchQuery.value.trim()) return scope.itemList;
  {
    return scope.itemList.filter((item) => {
      return (
        item.PalletCode.toLowerCase().includes(
          searchQuery.value.toLowerCase()
        ) ||
        item.PalletDescription.toLowerCase().includes(
          searchQuery.value.toLowerCase()
        ) ||
        item.CreatedBy.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
  }
});

const searchTerm = ref();

const filteredItems = computed(() => {
  return scope.presetitemList;
  /* if (!searchQuery.value.trim()) return scope.itemList;
  
  {
    return scope.itemList.filter((item) => {
      return (
        item.PalletCode.toLowerCase().includes(
          searchQuery.value.toLowerCase()
        ) ||
        item.PalletDescription.toLowerCase().includes(
          searchQuery.value.toLowerCase()
        ) ||
        item.CreatedBy.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
  } */
});
const tooltips = ref([]);

// Initialize tooltips array with states for each item
const initializeTooltips = (length) => {
  tooltips.value = Array.from({ length }, () => ({
    showEdit: false,
    showDelete: false,
    showPost: false,
  }));
};

// Initialize tooltips when data is loaded
watch(filteredLocations, (newVal) => {
  if (newVal) {
    initializeTooltips(newVal.length);
  }
});

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  /* didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }, */
});

const handleLoading = async () => {
  document.querySelector("#loadingindicator").classList.toggle("hidden");
};

const hideModal = () => {
  showModal.value = false;
};

const onInit = async (ipage) => {
  if (
    localStorage.getItem("_102") == undefined ||
    localStorage.getItem("_102") == null
  ) {
    showSwitchSiteModal.value = true;
    return;
  }

  startLoading({
    loadingText: "Please wait...",
    subText: "Fetching pallet master...",
    spinnerColor: "blue",
    showEllipsis: true,
  });

  onInitMenu();
  scope.currentPage = ipage;
  const response = await serviceApi().get(
    "pallet/get-pallet-item-master/?sitecode=" +
      sitecode.value +
      "&status=&take=" +
      scope.itemsPerPage +
      "&page=" +
      ipage,
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (response.status === 200) {
    scope.itemList = response.data.data.data;
    scope.total_count = response.data.data.total_count;
  }

  stopLoading();

  const response1 = await serviceApi().get(
    "pallet/get-preset-pallet-item-master/?" +
      "&status=1&take=" +
      scope.itemsPerPage +
      "&page=" +
      ipage,
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (response1.status === 200) {
    scope.presetitemList = response1.data.data.data;
  }
};

const onInitMenu = async () => {
  const userId = JSON.parse(decrypt(localStorage.getItem("_214"))).userid;
  const params = scope.menuId + "," + userId;

  try {
    const response = await serviceApi().get(
      `user/get-user-menu-list/${params}`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );
    scope.canAdd = response.data.canadd;
    scope.canEdit = response.data.canedit;
    scope.canDelete = response.data.candelete;
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
  }
};

const onEditItemMaster = (p) => {
  var newItemLIst = scope.itemList;

  var itemDtl = newItemLIst.filter(function (item) {
    return item.PalletCode == p;
  })[0];
  scope.isEdit = true;
  scope.isError = false;
  scope.isSuccess = false;
  setup.itemid = itemDtl.PalletCode;
  setup.itemdesc = itemDtl.PalletDescription;
  setup.uom = itemDtl.UnitOfMeasure;
  setup.status = itemDtl.Status == "A" ? true : false;
  setup.totalcontracted = itemDtl.totalcontracted;

  showModal.value = true;
};

const onDeleteItem = (p) => {
  scope.isError2 = false;
  scope.isSuccess2 = false;
  Swal.fire({
    title: `Want to remove <strong>Pallet Code: ${p}</strong>?`,
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
    heightAuto: false,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        scope.menuid = p;
        const response = await serviceApi().get(
          "pallet/remove-pallet-item-master/" +
            scope.menuid +
            "?warehouseId=" +
            sitecode.value,
          {
            headers: {
              Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
            },
          }
        );
        if (response.status === 200) {
          scope.isError2 = false;
          scope.isSuccess2 = true;
          scope.successMessage2 = "Delete complete..";
          Toast.fire({
            title: "Success",
            text: scope.successMessage2,
            icon: "success",
          });
          onInit(scope.currentPage);
        } else {
          scope.isSuccess2 = false;
          scope.isError2 = true;
          scope.errorMessage2 = response.errorMsg;
        }
      } catch (error) {
        Toast.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      }
    }
  });
};

const onNewItem = () => {
  Object.assign(setup, "");
  setup.itemcode = "";
  setup.shelflife = 0;
  scope.isError = false;
  scope.isSuccess = false;
  scope.isEdit = false;
  setup.totalcontracted = 0;

  showModal.value = true;
};

const onSaveItem = async () => {
  if (
    setup.itemid == null ||
    setup.itemid == undefined ||
    setup.itemdesc == null ||
    setup.itemdesc == undefined ||
    setup.uom == null ||
    setup.uom == undefined
  ) {
    scope.isError = true;
    scope.isSuccess = false;
    scope.errorMessage =
      "Item ID, Item Description & Unit of Measure is Required";
    Toast.fire({
      title: scope.errorMessage,
      icon: "warning",
    });
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    heightAuto: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        setup.itemtype = "PALLET";
        setup.storageid = "PALLET";
        setup.created_by = userFullname;
        setup.status = setup.status ? "A" : "I";
        setup.warehouseId = sitecode.value;
        setup.itemid = setup.itemid.toUpperCase();
        setup.itemdesc = setup.itemdesc.toUpperCase();
        setup.uom = setup.uom.toUpperCase();

        const response = await serviceApi().post(
          "pallet/post-pallet-item-master/",
          setup,
          {
            headers: {
              Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
            },
          }
        );
        if (!response.hasError) {
          scope.isError = false;
          scope.isSuccess = true;
          scope.successMessage = "Item Master Save Complete";
          showModal.value = false;
          onInit(scope.currentPage);
        } else {
          scope.isError = true;
          scope.isSuccess = false;
          scope.errorMessage = response.errorMessage;
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
};

// Function to convert the input field to uppercase
const toUpperCase = (field) => {
  setup[field] = setup[field].toUpperCase();
};

const isDropdownOpen = ref(false);
const selectedPreset = ref(null);
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value) {
    searchTerm.value = "";
  }
}
function selectPreset(item) {
  selectedPreset.value = item;
  setup.value = { ...item }; // Copy all properties to your form
  isDropdownOpen.value = false;
}

// Handle click outside
function handleClickOutside(event) {
  isDropdownOpen.value = false;
}

onMounted(() => {
  if (
    localStorage.getItem("_102") == undefined ||
    localStorage.getItem("_102") == null
  ) {
    showSwitchSiteModal.value = true;
    return;
  }
  onInit(1);
});
</script>

<style scoped>
.toggle-checkbox:checked {
  transform: translateX(20%);
  border-color: #6366f1;
  background-color: #f7f7f7;
}

.toggle-checkbox:checked + .toggle-label {
  background-color: #6366f1;
}

.toggle-label {
  transition: background-color 0.2s ease-in-out;
}

.toggle-checkbox {
  transition: all 0.2s ease-in-out;
}
</style>
