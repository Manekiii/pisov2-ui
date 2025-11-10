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
                class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Location Master
              </h1>
              <div
                class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
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
                class="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200"
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
              class="block w-full pl-12 pr-4 py-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 shadow-sm"
              placeholder="Search locations..."
              v-model="searchQuery"
              @change=""
            />
          </div>

          <!-- New Button -->
          <button
            v-show="scope.canAdd"
            @click="onNewLocation()"
            class="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
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
            New Location
          </button>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden lg:block">
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
                      Storage ID
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Description
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
                    v-for="(pallet, index) in filteredLocations"
                    :key="index"
                    class="hover:bg-blue-50/30 transition-colors duration-200 group"
                  >
                    <!-- Action Buttons -->
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <!-- Edit Button -->
                        <div class="relative" v-show="scope.canEdit">
                          <button
                            @mouseover="tooltips[index].showEdit = true"
                            @mouseleave="tooltips[index].showEdit = false"
                            @click="onEditLocation(pallet)"
                            class="group/btn relative p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg border border-blue-200 hover:border-blue-600 transition-all duration-200 hover:scale-110 hover:shadow-md"
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
                            @click="onDelete(pallet)"
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
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {{ pallet.Location }}
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">
                      {{ pallet.LocationDescription }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                      {{ pallet.CreatedBy }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500 font-mono">
                      {{
                        format(
                          new Date(pallet.CreateDate),
                          "yyyy-MM-dd hh:mm:ss"
                        )
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
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p class="text-lg font-medium">No locations found</p>
              <p class="text-sm">Start by creating your first location</p>
            </div>
          </div>
        </div>

        <!-- Mobile Card View -->
        <div
          class="grid grid-cols-1 gap-4 md:hidden overflow-y-auto max-h-[60vh] px-4 py-3 bg-gray-100/30 rounded-2xl"
        >
          <div
            v-if="filteredLocations"
            v-for="pallet in filteredLocations"
            :key="pallet.Location"
            class="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
          >
            <!-- Card Header -->
            <div class="flex items-center justify-between mb-4">
              <div
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {{ pallet.Location }}
              </div>
              <div class="flex items-center gap-2">
                <button
                  v-show="scope.canEdit"
                  @click="onEditLocation(pallet)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
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
                  @click="onDelete(pallet)"
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
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Description:</span
                >
                <span class="text-sm text-gray-900">{{
                  pallet.LocationDescription
                }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Created By:</span
                >
                <span class="text-sm text-gray-900">{{
                  pallet.CreatedBy
                }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Created:</span
                >
                <span class="text-sm text-gray-600 font-mono">
                  {{
                    format(new Date(pallet.CreateDate), "yyyy-MM-dd hh:mm:ss")
                  }}
                </span>
              </div>
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
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p class="text-xl font-medium mb-2">No locations found</p>
            <p class="text-sm text-center">
              Start by creating your first location
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
          class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200/50 transform transition-all duration-300 scale-100"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between p-6 border-b border-gray-200"
          >
            <div>
              <h3 class="text-2xl font-semibold text-gray-900">
                Location Master
              </h3>
              <p class="text-sm text-gray-500 mt-1">
                {{ scope.isEdit ? "Edit" : "Create new" }} location
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
          <div class="p-6 max-h-[60vh] overflow-y-auto">
            <div class="grid gap-6 md:grid-cols-2">
              <div class="space-y-4">
                <div>
                  <label
                    for="storageid"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Storage ID
                  </label>
                  <input
                    type="text"
                    id="storageid"
                    v-model="setup.locationId"
                    @input="toUpperCase('locationId')"
                    :disabled="scope.isEdit"
                    class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 bg-white"
                    placeholder="Enter Storage ID"
                    required
                  />
                </div>
                <button
                  @click="onViewWarehouse()"
                  class="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  View Warehouse
                </button>
              </div>

              <div>
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Location Description
                </label>
                <textarea
                  id="description"
                  v-model="setup.locationdesc"
                  @input="toUpperCase('locationdesc')"
                  rows="4"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none bg-white"
                  placeholder="Enter detailed description..."
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl"
          >
            <button
              @click="hideModal()"
              class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              @click="onSaveLocation()"
              class="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              {{ scope.isEdit ? "Update" : "Save" }} Location
            </button>
          </div>
        </div>
      </div>

      <!-- Warehouse Selection Modal -->
      <div
        v-if="viewWarehouse"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/40 backdrop-blur-sm"
          @click="hideViewWarehouse()"
        ></div>

        <!-- Modal -->
        <div
          class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200/50"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between p-6 border-b border-gray-200"
          >
            <div>
              <h3 class="text-2xl font-semibold text-gray-900">
                Select Warehouse
              </h3>
              <p class="text-sm text-gray-500 mt-1">
                Choose a warehouse for this location
              </p>
            </div>
            <button
              @click="hideViewWarehouse()"
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
          <div class="p-6 max-h-[60vh] overflow-y-auto">
            <div class="space-y-3">
              <div
                v-for="warehouse in scope.warehouseList"
                :key="warehouse.brancode"
                @click="onSelectWarehouse(warehouse)"
                class="p-4 bg-white border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all duration-200 hover:shadow-md group"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center mb-2">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors duration-200"
                      >
                        {{ warehouse.brancode }}
                      </span>
                    </div>
                    <p
                      class="text-sm font-medium text-gray-900 group-hover:text-blue-900 transition-colors duration-200"
                    >
                      {{ warehouse.branname }}
                    </p>
                  </div>
                  <svg
                    class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl"
          >
            <button
              @click="hideViewWarehouse()"
              class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { startLoading, stopLoading } from "~/stores/globalvariable";
import { showSwitchSiteModal } from "~/dashboard/store";

const scope = reactive({});
const setup = reactive({});
const sitecode = ref(
  localStorage.getItem("_102")
    ? JSON.parse(localStorage.getItem("_102")).sitecode
    : null
);
const userFullname = JSON.parse(decrypt(localStorage.getItem("_214"))).fullname;
const searchQuery = ref("");
const showModal = ref(false);
const viewWarehouse = ref(false);
scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.menuId = "location";

const filteredLocations = computed(() => {
  if (!searchQuery.value.trim()) return scope.locationlist;
  {
    return scope.locationlist.filter((location) => {
      return (
        location.Location.toLowerCase().includes(
          searchQuery.value.toLowerCase()
        ) ||
        location.LocationDescription.toLowerCase().includes(
          searchQuery.value.toLowerCase()
        ) ||
        location.CreatedBy.toLowerCase().includes(
          searchQuery.value.toLowerCase()
        )
      );
    });
  }
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

const OnSearch = () => {};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const hideModal = () => {
  showModal.value = false;
};

const hideViewWarehouse = () => {
  viewWarehouse.value = false;
};

const onDelete = (val) => {
  Swal.fire({
    title: `Want to remove <strong> ${val.LocationDescription}</strong>?`,
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
    heightAuto: false,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        scope.menuid = val.Location;
        var id = {
          locationId: scope.menuid,
          warehouseId: sitecode.value,
        };
        const response = await serviceApi().post(
          "pallet/remove-pallet-location",
          id,
          {
            headers: {
              Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
            },
          }
        );
        if (response.status === 200) {
          scope.isError2 = false;
          scope.isSuccess2 = true;
          scope.successMessage2 = response.errorMessage;

          console.log("this is delete:", response);
          if (response.data.hasError) {
            Toast.fire({
              title: "Deletion Failed!",
              text: response.data.errorMessage,
              icon: "error",
            });
          } else {
            Toast.fire({
              title: "Success",
              text: scope.successMessage2,
              icon: "success",
            });
          }

          onInit(scope.currentPage);
        } else {
          scope.isSuccess2 = false;
          scope.isError2 = true;
          scope.errorMessage2 = response.errorMessage;
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

const onEditLocation = (p) => {
  scope.isEdit = true;
  scope.isError = false;
  scope.isSuccess = false;
  scope.configView = 1;
  setup.locationId = p.Location;
  setup.locationdesc = p.LocationDescription;

  showModal.value = true;
};

const onNewLocation = () => {
  Object.assign(setup, "");
  scope.isError = false;
  scope.isSuccess = false;
  scope.isEdit = false;
  scope.configView = 1;
  showModal.value = true;
};

const onViewWarehouse = async () => {
  //Spinnerhere
  const response = await serviceApi().get(
    "user/get-user-sites/?userId=" +
      JSON.parse(decrypt(localStorage.getItem("_214"))).userid +
      "&sysId=17",
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (response.status === 200) {
    scope.warehouseList = response.data;
    scope.configView = 2;
    viewWarehouse.value = true;
  }
};

const onSelectWarehouse = (param) => {
  var branch = param;
  scope.configView = 1;
  setup.locationId = branch.brancode;
  setup.locationdesc = branch.branname;
  viewWarehouse.value = false;
  // scope.onNew();
};

const onSaveLocation = async () => {
  //Spinner Here

  if (
    (setup.locationId === "" || setup.locationdesc === "") &&
    (setup.locationId === undefined || setup.locationdesc === undefined)
  ) {
    scope.isError = true;
    scope.isSuccess = false;
    scope.errorMessage = "Location ID & Location Description is Required";
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
        setup.storageId = "PALLET";
        setup.brancode = sitecode.value;
        setup.created_by = userFullname;
        setup.locationId = setup.locationId.toUpperCase();
        setup.locationdesc = setup.locationdesc.toUpperCase();

        const response = await serviceApi().post(
          "pallet/post-pallet-master/",
          setup,
          {
            headers: {
              Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
              "Content-Type": "application/json", // Specify the content type
            },
          }
        );
        if (!response.hasError) {
          scope.isError = false;
          scope.isSuccess = true;
          scope.successMessage = "Location Master Save Complete";
          Toast.fire({
            title: "Success",
            text: scope.successMessage,
            icon: "success",
          });
          showModal.value = false;
          onInit(scope.currentPage);
        } else {
          scope.isError = true;
          scope.isSuccess = false;
          scope.errorMessage = response.errorMessage;

          Toast.fire({
            title: scope.errorMessage,
            icon: "error",
          });
        }
      } catch (error) {
        Toast.fire({
          title: "error",
          text: error.message,
          icon: "error",
        });
      }
    }
  });
};

const onInit = async (page) => {
  if (
    localStorage.getItem("_102") == undefined ||
    localStorage.getItem("_102") == null
  ) {
    showSwitchSiteModal.value = true;
    return;
  }

  startLoading({
    loadingText: "Please wait...",
    subText: "Fetching location...",
    spinnerColor: "blue",
    showEllipsis: true,
  });
  onInitMenu();
  scope.currentPage = page;

  const response = await serviceApi().get(
    "pallet//get-pallet-location/?sitecode=" + sitecode.value,
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  scope.locationlist = response.data;
  scope.total_count = response.data.total_count;

  stopLoading();
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

// Function to convert the input field to uppercase
const toUpperCase = (field) => {
  setup[field] = setup[field].toUpperCase();
};

onMounted(() => {
  onInit();
});
</script>
