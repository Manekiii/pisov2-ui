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
                class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-600 bg-clip-text text-transparent"
              >
                Trucker Maintenance
              </h1>
              <div
                class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-600 to-indigo-600 rounded-full"
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
              v-model="itemSearch"
              @input="onSearch(itemSearch)"
              class="block w-full pl-12 pr-4 py-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300 shadow-sm"
              placeholder="Search ID"
              required
            />
          </div>
          <button
            @click="onOpenModal()"
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
            New
          </button>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden md:block">
          <div
            class="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-auto"
          >
            <div class="overflow-x-auto max-h-[60vh]">
              <table class="w-full">
                <thead class="sticky top-0 z-10">
                  <tr
                    class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                  >
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Trucker
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Contact Person
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Mobile #
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Tel #
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr
                    v-if="filteredTrucker"
                    class="hover:bg-indigo-50/30 transition-colors duration-200 group"
                    v-for="(x, index) in filteredTrucker"
                    :key="index"
                  >
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <!-- Edit Button and Tooltip -->
                        <div class="relative">
                          <!-- Edit Button and Tooltip -->
                          <button
                            @mouseover="tooltips[index].showEdit = true"
                            @mouseleave="tooltips[index].showEdit = false"
                            class="group/btn relative p-2 text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg border border-indigo-200 hover:border-indigo-600 transition-all duration-200 hover:scale-110 hover:shadow-md"
                            @click="onEdit(x)"
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

                        <!-- Delete Button and Tooltip -->
                        <div class="relative">
                          <button
                            @mouseover="tooltips[index].showDelete = true"
                            @mouseleave="tooltips[index].showDelete = false"
                            class="group/btn relative p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg border border-red-200 hover:border-red-600 transition-all duration-200 hover:scale-110 hover:shadow-md"
                            @click="onDelete(x)"
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
                        {{ x.fleetownerId }}
                      </div>
                    </td>

                    <td class="px-6 py-4 text-sm text-gray-700">
                      {{ x.ownername }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">
                      {{ x.contactperson }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">
                      {{ x.celphoneno }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">
                      {{ x.telephoneno }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                      {{ x.emailadd }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                      {{ x.address }}
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="
                          x.status === 'A'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-red-800'
                        "
                      >
                        {{ x.status === "A" ? "Active" : "Inactive" }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Empty State -->
            <div
              v-if="!filteredTrucker || filteredTrucker.length === 0"
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
              <p class="text-lg font-medium">No Trucker found</p>
              <p class="text-sm">Start by creating your first trucker</p>
            </div>
          </div>
        </div>

        <!-- MOBILE -->
        <div
          class="grid grid-cols-1 gap-4 md:hidden overflow-y-auto max-h-[60vh] px-4 py-3 bg-gray-100/30 rounded-2xl"
        >
          <div
            v-if="filteredTrucker"
            v-for="x in filteredTrucker"
            class="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
          >
            <!-- Card Header -->
            <div class="flex items-center justify-between mb-4">
              <div
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {{ x.fleetownerId }}
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="onEdit(x)"
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
                  @click="onDelete(x)"
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
                  >Trucker:</span
                >
                <span class="text-sm text-gray-900">{{ x.ownername }}</span>
              </div>

              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Contact Person:
                </span>
                <span class="text-sm text-gray-900">{{ x.contactperson }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Mobile#:
                </span>
                <span class="text-sm text-gray-900">{{ x.celphoneno }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Tel#:
                </span>
                <span class="text-sm text-gray-900">{{ x.telephoneno }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Email:
                </span>
                <span class="text-sm text-gray-900">{{ x.emailadd }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Address:
                </span>
                <span class="text-sm text-gray-900">{{ x.address }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Status:</span
                >
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="
                    x.status === 'A'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-red-800'
                  "
                >
                  {{ x.status === "A" ? "Active" : "Inactive" }}
                </span>
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
          </div>
        </div>
      </div>
    </div>

    <!-- Main modal Add/Edit-->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/40 backdrop-blur-sm"
          @click="hideModal()"
        ></div>
        <!-- Modal content -->
        <div
          class="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200/50 transform transition-all duration-300 scale-100"
        >
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-6 border-b border-gray-200"
          >
            <div>
              <h3 class="text-2xl font-semibold text-gray-900">
                Trucker Setup
              </h3>
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
          <!-- Modal body -->
          <div class="p-6 max-h-[60vh] overflow-y-auto">
            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Trucker Code <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  v-model="scope.form.fleetownerId"
                  @input="toUpperCase('fleetownerId')"
                  :disabled="scope.mode === 1"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Trucker Name <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  v-model="scope.form.ownername"
                  @input="toUpperCase('ownername')"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Contact Person</label
                >
                <input
                  type="text"
                  v-model="scope.form.contactperson"
                  @input="toUpperCase('contactperson')"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white"
                  placeholder="Enter Description"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Mobile#</label
                >
                <input
                  type="number"
                  v-model="scope.form.celphoneno"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Tel#</label
                >
                <input
                  type="number"
                  v-model="scope.form.telephoneno"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Email Address</label
                >
                <input
                  type="text"
                  v-model="scope.form.emailadd"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Address</label
                >
                <input
                  type="text"
                  v-model="scope.form.address"
                  @input="toUpperCase('address')"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Remarks</label
                >
                <input
                  type="text"
                  v-model="scope.form.remarks"
                  @input="toUpperCase('remarks')"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white"
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
                      v-model="scope.form.status"
                      class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      :class="
                        scope.form.status
                          ? 'right-0 border-indigo-500'
                          : 'left-0 border-gray-300'
                      "
                    />
                    <label
                      for="status"
                      class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      :class="
                        scope.form.status ? 'bg-indigo-500' : 'bg-gray-300'
                      "
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
              @click="onSave()"
              class="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              {{ scope.isEdit ? "Update" : "Save" }} Item
            </button>
          </div>

          <!-- Modal footer -->
          <!-- <div
            class="flex justify-end items-center p-2 space-x-2 border-gray-200 rounded-b"
          >
            <button
              @click="hideModal()"
              type="button"
              class="text-white bg-gray-400 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Close
            </button>
            <button
              @click="onSave()"
              type="button"
              class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Save
            </button>
          </div> -->
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
scope.setup = {};
scope.itemsPerPage = 20;
scope.currentPage = 0;
var sitecode = ref(
  localStorage.getItem("_102")
    ? JSON.parse(localStorage.getItem("_102")).sitecode
    : null
);
var userFullname = JSON.parse(decrypt(localStorage.getItem("_214"))).fullname;
const filteredTrucker = ref();
const showModal = ref(false);
const viewWarehouse = ref(false);
const itemSearch = ref();

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

/* const handleLoading = async () => {
  document.querySelector("#loadingindicator").classList.toggle("hidden");
}; */

const hideModal = () => {
  showModal.value = false;
};

const hideViewWarehouse = () => {
  viewWarehouse.value = false;
};

const onInit = async () => {
  if (
    localStorage.getItem("_102") == undefined ||
    localStorage.getItem("_102") == null
  ) {
    showSwitchSiteModal.value = true;
    return;
  }

  startLoading({
    loadingText: "Please wait...",
    subText: "Fetching truckers...",
    spinnerColor: "blue",
    showEllipsis: true,
  });
  scope.appData = [];

  const response = await serviceApi().get(
    "wfms/get-fleet-owner-list?param=&brancode=" +
      sitecode.value +
      "&appname=PISO&tk=100&pg=1",
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (response.status === 200) {
    scope.appData = response.data.fleetowners;
    filteredTrucker.value = scope.appData;
  }

  stopLoading();
};

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
watch(filteredTrucker, (newVal) => {
  if (newVal) {
    initializeTooltips(newVal.length);
  }
});

const onEdit = (val) => {
  scope.mode = 1; //edit mode
  scope.form = val;
  scope.form.status = val.status == "A" ? true : false;
  showModal.value = true;
};

const onOpenModal = () => {
  scope.mode = 0;
  scope.form = {};
  scope.form.status = true;
  showModal.value = true;
};

const onSave = async () => {
  const haserror = onValidation();

  if (haserror) {
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
        scope.form.ownertype = "TRUCKER";
        scope.form.created_by = userFullname;
        scope.form.status = scope.form.status == true ? "A" : "I";
        scope.form.branch = sitecode.value;
        scope.form.appname = "PISO";
        if (scope.mode === 1) {
          const response = await serviceApi().put(
            "wfms/edit-fleet-owner",
            scope.form,
            {
              headers: {
                Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
                "Content-Type": "application/json", // Specify the content type
              },
            }
          );
          if (response.status === 200) {
            Toast.fire({
              title: "Success",
              text: "Save Complete.",
              icon: "success",
            });
            showModal.value = false;
            await onInit();
          } else {
            Toast.fire({
              title: "Error",
              text: response.error,
              icon: "error",
            });
            showModal.value = false;
          }
        } else {
          if (scope.form.fleetownerId) {
            if (scope.form.ownername) {
              const response = await serviceApi().post(
                "wfms/add-fleet-owner",
                scope.form,
                {
                  headers: {
                    Token: JSON.parse(decrypt(localStorage.getItem("_214")))
                      .token,
                    "Content-Type": "application/json", // Specify the content type
                  },
                }
              );

              if (response.status === 200) {
                Toast.fire({
                  title: "Success",
                  text: "Save Complete.",
                  icon: "success",
                });
                showModal.value = false;
                await onInit();
              }
            } else {
              Toast.fire({
                title: "Error",
                text: "Trucker Name is Required",
                icon: "warning",
              });
            }
          } else {
            Toast.fire({
              title: "Error",
              text: "Trucker Code is Required",
              icon: "warning",
            });
          }
        }
      } catch (error) {
        Toast.fire({
          title: "Error",
          text: error,
          icon: "error",
        });
      }
    }
  });
};

const onDelete = (val) => {
  scope.selected = val;
  Swal.fire({
    title: `Are you sure you want to delete Trucker <strong> ${scope.selected.ownername}</strong>?`,
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
    heightAuto: false,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        var fleetowner = {
          fleetownerId: scope.selected.fleetownerId,
          branch: sitecode.value,
          appname: "PISO",
        };
        const response = await serviceApi().delete(
          "wfms/remove-fleet-owner?fleetownerId=" +
            scope.selected.fleetownerId +
            "&branch=" +
            sitecode.value,
          {
            headers: {
              Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
            },
          }
        );

        if (response.status === 200) {
          Toast.fire({
            title: "Success",
            text: "Delete Complete.",
            icon: "success",
          });
          await onInit();
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

const onSearch = (search) => {
  if (search !== null) {
    filteredTrucker.value = scope.appData.filter((item) =>
      item.fleetownerId.toLowerCase().includes(itemSearch.value.toLowerCase())
    );
  } else {
    filteredTrucker.value = scope.appData;
  }
};

const onDeleteConfirn = async () => {
  //scope.form.branch = sitecode;
  //scope.form.appname = 'PISO';
  //scope.form.fleetownerId = scope.selected.fleetownerId;
};

function onValidation() {
  var hasError = false;
  const name = ref();
  if (scope.form.fleetownerId === "" || scope.form.fleetownerId === undefined) {
    hasError = true;
    name.value = "Trucker Code";
  } else if (
    scope.form.ownername === "" ||
    scope.form.ownername === undefined
  ) {
    hasError = true;
    name.value = "Trucker Name";
  }

  if (hasError) {
    Toast.fire({
      title: `${name.value} is required!`,
      icon: "warning",
    });
  }

  return hasError;
}

// Function to convert the input field to uppercase
const toUpperCase = (field) => {
  scope.form[field] = scope.form[field].toUpperCase();
};

onMounted(() => {
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
