<template>
  <IonPage>
    <div class="bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen">
      <!-- <div id="loadingindicator" class="hidden">
          <LoadingIndicator />
        </div> -->

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
                Shipper Master
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
              class="block w-full pl-12 pr-4 py-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300 shadow-sm"
              placeholder="Search shipper..."
              v-model="searchQuery"
              @change=""
            />
          </div>

          <!-- New Button -->
          <button
            v-show="scope.canAdd"
            @click="onNew()"
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
            New Shipper
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
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Code
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Name
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
                      Contact #
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Transaction Type
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Created By
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Created Date
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr
                    class="hover:bg-indigo-50/30 transition-colors duration-200 group"
                    v-if="filteredLocations"
                    v-for="(shipper, index) in filteredLocations"
                  >
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <!-- Edit Button and Tooltip -->
                        <div class="relative" v-show="scope.canEdit">
                          <!-- Edit Button and Tooltip -->
                          <button
                            @mouseover="tooltips[index].showEdit = true"
                            @mouseleave="tooltips[index].showEdit = false"
                            class="group/btn relative p-2 text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg border border-indigo-200 hover:border-indigo-600 transition-all duration-200 hover:scale-110 hover:shadow-md"
                            v-show="scope.canEdit"
                            @click="onEdit(shipper.Id)"
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
                        <div class="relative" v-show="scope.canDelete">
                          <button
                            @mouseover="tooltips[index].showDelete = true"
                            @mouseleave="tooltips[index].showDelete = false"
                            class="group/btn relative p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg border border-red-200 hover:border-red-600 transition-all duration-200 hover:scale-110 hover:shadow-md"
                            v-show="scope.canDelete"
                            @click="onDelete(shipper)"
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
                        {{ shipper.Code }}
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">
                      {{ shipper.Name }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                      {{ shipper.Address }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                      {{ shipper.contactno }}
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="
                          shipper.status === 'A'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-red-800'
                        "
                      >
                        {{ shipper.status === "A" ? "Active" : "Inactive" }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium"
                        :class="
                          shipper.TransactionType === 'I'
                            ? 'bg-blue-100 text-blue-800'
                            : shipper.TransactionType === 'O'
                            ? 'bg-purple-100 text-purple-800'
                            : shipper.TransactionType === 'A'
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-gray-100 text-gray-800'
                        "
                      >
                        {{ TransType(shipper.TransactionType) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                      {{ shipper.CreatedBy }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500 font-mono">
                      {{
                        format(
                          new Date(shipper.CreateDate),
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p class="text-lg font-medium">No shipper found</p>
              <p class="text-sm">Start by creating your first shipper</p>
            </div>
          </div>
        </div>

        <!-- Mobile Card View -->
        <div
          class="grid grid-cols-1 gap-4 md:hidden overflow-y-auto max-h-[60vh] px-4 py-3 bg-gray-100/30 rounded-2xl"
        >
          <div
            v-if="filteredLocations"
            v-for="shipper in filteredLocations"
            class="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
          >
            <!-- Card Header -->
            <div class="flex items-center justify-between mb-4">
              <div
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {{ shipper.Code }}
              </div>
              <div class="flex items-center gap-2">
                <button
                  v-show="scope.canEdit"
                  @click="onEdit(shipper.Id)"
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
                  @click="onDelete(shipper)"
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
                  >Name:</span
                >
                <span class="text-sm text-gray-900">{{ shipper.Name }}</span>
              </div>
              <div class="flex items-center">
                <span
                  class="text-sm font-medium text-gray-500 w-24 flex-shrink-0"
                  >Address:</span
                >
                <span class="text-sm text-gray-900">{{ shipper.Address }}</span>
              </div>
              <div class="flex items-center">
                <span
                  class="text-sm font-medium text-gray-500 w-24 flex-shrink-0"
                  >Contact#:</span
                >
                <span class="text-sm text-gray-900">{{
                  shipper.contactno
                }}</span>
              </div>
              <div class="flex items-center">
                <span
                  class="text-sm font-medium text-gray-500 w-24 flex-shrink-0"
                  >Status:</span
                >
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="
                    shipper.status === 'A'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-red-800'
                  "
                >
                  {{ shipper.status === "A" ? "Active" : "Inactive" }}
                </span>
              </div>
              <div class="flex items-center">
                <span
                  class="text-sm font-medium text-gray-500 w-24 flex-shrink-0"
                  >Transaction Type:</span
                >
                <span
                  class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium"
                  :class="
                    shipper.TransactionType === 'I'
                      ? 'bg-blue-100 text-blue-800'
                      : shipper.TransactionType === 'O'
                      ? 'bg-purple-100 text-purple-800'
                      : shipper.TransactionType === 'A'
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-gray-100 text-gray-800'
                  "
                >
                  {{ TransType(shipper.TransactionType) }}
                </span>
              </div>

              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Created By:</span
                >
                <span class="text-sm text-gray-900">{{
                  shipper.CreatedBy
                }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 w-24"
                  >Created:</span
                >
                <span class="text-sm text-gray-600 font-mono">
                  {{
                    format(new Date(shipper.CreateDate), "yyyy-MM-dd hh:mm:ss")
                  }}
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
            <p class="text-xl font-medium mb-2">No shipper found</p>
            <p class="text-sm text-center">
              Start by creating your first shipper
            </p>
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
            <h3 class="text-xl font-semibold text-gray-900">Shipper Setup</h3>

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
                  >Transaction Type</label
                >
                <select
                  v-model="scope.setup.shippertype"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 bg-white"
                >
                  <option v-for="t in scope.shipType" :value="t.code">
                    {{ t.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Code <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  v-model="scope.setup.shippercode"
                  @input="toUpperCase('shippercode')"
                  :disabled="scope.isEdit || scope.setup.shippertype == 'X'"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 bg-white"
                  placeholder="Enter Storage Id"
                  required
                />
              </div>
              <div v-show="scope.setup.shippertype == 'X'">
                <button
                  type="submit"
                  v-show="scope.setup.shippertype == 'X'"
                  @click="onViewWarehouse()"
                  class="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  View Warehouse
                </button>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Name <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  v-model="scope.setup.shippername"
                  @input="toUpperCase('shippername')"
                  :disabled="scope.setup.shippertype == 'X'"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 bg-white"
                  placeholder="Enter Description"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Address</label
                >
                <input
                  type="text"
                  v-model="scope.setup.shipperaddress"
                  @input="toUpperCase('shipperaddress')"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 bg-white"
                  placeholder="Enter Description"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Contact No</label
                >
                <input
                  type="number"
                  v-model="scope.setup.contactno"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 bg-white"
                  placeholder="Enter Description"
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
                      v-model="scope.setup.status"
                      class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      :class="
                        scope.setup.status
                          ? 'right-0 border-indigo-500'
                          : 'left-0 border-gray-300'
                      "
                    />
                    <label
                      for="status"
                      class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      :class="
                        scope.setup.status ? 'bg-indigo-500' : 'bg-gray-300'
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
              class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200"
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
        </div>
      </div>
    </div>

    <!-- Main modal Warehouse-->
    <div
      v-if="viewWarehouse"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/40 backdrop-blur-sm"
          @click="hideViewWarehouse()"
        ></div>
        <!-- Modal content -->
        <div
          class="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200/50 transform transition-all duration-300 scale-100"
        >
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-6 border-b border-gray-200"
          >
            <h3 class="text-xl font-semibold text-gray-900">Warehouse List</h3>
            <button
              @click="hideViewWarehouse()"
              type="button"
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
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
            <!-- Search -->
            <div class="mb-6">
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  v-model="searchQueryWarehouse"
                  class="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400"
                  placeholder="Search Code/Description..."
                />
              </div>
            </div>
            <div
              v-for="warehouse in warehouseList"
              :key="warehouse.brancode"
              @click="onSelectWarehouse(warehouse)"
              class="group bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg"
            >
              <div class="flex items-center space-x-4">
                <div class="flex-1">
                  <div class="font-semibold text-gray-900 mb-1">
                    {{ warehouse.brancode }}
                  </div>
                  <div class="text-gray-600 mb-1">
                    {{ warehouse.branname }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal Footer -->
          <div class="bg-gray-50 px-8 py-6 flex justify-end space-x-4">
            <button
              type="button"
              @click="hideViewWarehouse()"
              class="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200"
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
import { format } from "date-fns";
import Swal from "sweetalert2";
import { showSwitchSiteModal } from "~/dashboard/store";
import { startLoading, stopLoading } from "~/stores/globalvariable";

const scope = reactive({});
scope.setup = {};
scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.shipType = [
  { code: "A", name: "ALL" },
  { code: "I", name: "Inbound" },
  { code: "O", name: "Outbound" },
  { code: "X", name: "Inter-Plant" },
];

var sitecode = ref(
  localStorage.getItem("_102")
    ? JSON.parse(localStorage.getItem("_102")).sitecode
    : null
);
var userFullname = JSON.parse(decrypt(localStorage.getItem("_214"))).fullname;
const showModal = ref(false);
const viewWarehouse = ref(false);

const searchQuery = ref("");
const searchQueryWarehouse = ref("");
const filteredLocations = computed(() => {
  if (!searchQuery.value.trim()) return scope.shipperList;
  {
    return scope.shipperList.filter((item) => {
      return (
        item.Code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.Name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.CreatedBy.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
  }
});

const warehouseList = computed(() => {
  if (!searchQueryWarehouse.value.trim()) return scope.warehouseList;
  {
    return scope.warehouseList.filter((item) => {
      return (
        item.brancode
          .toLowerCase()
          .includes(searchQueryWarehouse.value.toLowerCase()) ||
        item.branname
          .toLowerCase()
          .includes(searchQueryWarehouse.value.toLowerCase())
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

const hideViewWarehouse = () => {
  viewWarehouse.value = false;
};

const TransType = (p) => {
  switch (p) {
    case "I":
      return "Inbound";
      break;
    case "O":
      return "Outbound";
      break;
    case "A":
      return "All";
      break;
    case "X":
      return "Inter-Plant";
      break;
  }
};

/*initialize first load*/
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
    subText: "Fetching shippers...",
    spinnerColor: "blue",
    showEllipsis: true,
  });
  scope.currentPage = ipage;

  const response = await serviceApi().get(
    "pallet/get-pallet-shipper/" +
      sitecode.value +
      "," +
      scope.itemsPerPage +
      "," +
      ipage,
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );
  scope.shipperList = response.data.data.data;
  scope.total_count = response.data.data.total_count;

  onInitMenu("pallet-customer");

  stopLoading();
};

const onInitMenu = async (p) => {
  const userId = JSON.parse(decrypt(localStorage.getItem("_214"))).userid;
  const params = p + "," + userId;

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

const onDelete = (p) => {
  scope.isError2 = false;
  scope.isSuccess2 = false;
  Swal.fire({
    title: `Want to remove <strong>${p.Name}</strong>?`,
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
    heightAuto: false,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        scope.menuid = p.Id;
        const response = await serviceApi().get(
          "pallet/remove-pallet-customer/" +
            scope.menuid +
            "?warehouseId=" +
            sitecode.value,
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
            text: "Delete complete.",
            icon: "success",
          });
          onInit(scope.currentPage);
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

const onEdit = (p) => {
  scope.setup = {};

  for (
    scope.i_itm = 0;
    scope.i_itm <= scope.shipperList.length - 1;
    scope.i_itm++
  ) {
    if (scope.shipperList[scope.i_itm].Id === p) {
      if (scope.shipperList[scope.i_itm].Id === p) {
        var setup = scope.shipperList[scope.i_itm];
        scope.isEdit = true;
        scope.isError = false;
        scope.isSuccess = false;
        scope.configView = 1;
        scope.setup.shipperid = p;
        scope.setup.shippercode = setup.Code;
        scope.setup.shippername = setup.Name;
        scope.setup.shipperaddress = setup.Address;
        scope.setup.contactno = setup.contactno;
        scope.setup.shippertype = setup.TransactionType;
        scope.setup.status = setup.status === "A" ? true : false;
      }
    }
  }

  showModal.value = true;
};

const RemoveItem = async () => {
  scope.menuid = $("#itemcode").val();
};

const onNew = () => {
  scope.setup = {};
  scope.setup.shipperid = 0;
  scope.isError = false;
  scope.isSuccess = false;
  scope.isEdit = false;
  scope.setup.status = true;
  scope.configView = 1;

  showModal.value = true;
};

const onSave = async () => {
  if (
    scope.setup.shippercode === "" ||
    scope.setup.shippercode === undefined ||
    scope.setup.shippername === "" ||
    scope.setup.shippername === undefined
  ) {
    scope.isError = true;
    scope.isSuccess = false;
    scope.errorMessage = "Shipper Code & Shipper Name is Required";
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
        scope.setup.storageid = "PALLET";
        scope.setup.brancode = sitecode.value;
        scope.setup.created_by = userFullname;
        scope.setup.status = scope.setup.status ? "A" : "I";

        const response = await serviceApi().post(
          "pallet/post-pallet-customer/",
          scope.setup,
          {
            headers: {
              Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
              "Content-Type": "application/json", // Specify the content type
            },
          }
        );
        if (response.status === 200) {
          showModal.value = false;

          Toast.fire({
            title: "Success",
            text: "Shipper save complete.",
            icon: "success",
          });

          onInit(scope.currentPage);
        } else {
          $rootScope.ShowPrompt(
            "#modal-panel-prompt-error",
            response.errorMessage
          );
          Toast.fire({
            title: "Error",
            text: response.data.errorMessage,
            icon: "error",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
};

const onViewWarehouse = async () => {
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
  scope.setup.shippercode = branch.brancode;
  scope.setup.shippername = branch.branname;
  // scope.onNew();
  viewWarehouse.value = false;
};

// Function to convert the input field to uppercase
const toUpperCase = (field) => {
  scope.setup[field] = scope.setup[field].toUpperCase();
};

onMounted(() => {
  onInit(1);
});
</script>
