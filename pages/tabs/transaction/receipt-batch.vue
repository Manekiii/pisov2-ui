<template>
  <IonPage>
    <ion-content class="bg-gray-50">
      <div class="min-h-screen p-4 lg:p-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            {{ scope.titleform }}
          </h1>
          <div
            class="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          ></div>
        </div>

        <div class="mx-auto space-y-8">
          <!-- Transaction Details Card -->
          <div
            class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          >
            <div
              class="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 px-8 py-6"
            >
              <h2 class="text-xl font-bold text-white flex items-center">
                <svg
                  class="w-7 h-7 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Transaction Details
              </h2>
            </div>

            <div class="p-8 flex flex-col gap-4">
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                <!-- Supplier -->
                <div class="group space-y-2">
                  <label
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Supplier <span class="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    v-model="trans.shipperId"
                    @change="ChangeSupplier"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                  >
                    <option
                      v-for="s in scope.supplierOptions"
                      :key="s.value"
                      :value="s.value"
                    >
                      {{ s.text }}
                    </option>
                  </select>
                </div>

                <!-- Trucker -->
                <div class="group space-y-2">
                  <label
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Trucker <span class="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    v-model="trans.trucker"
                    @change="ChangeTrucker"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                  >
                    <option
                      v-for="t in scope.truckersOptions"
                      :key="t.value"
                      :value="t.value"
                    >
                      {{ t.text }}
                    </option>
                  </select>
                </div>

                <!-- Asset Account -->
                <div class="group space-y-2">
                  <label
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Asset (Pallet,Crate,Bins,CO2, etc.) Accountability
                    <span class="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    v-model="trans.assetaccountability"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                  >
                    <option
                      v-for="s in scope.assetAccountOptions"
                      :key="s.value"
                      :value="s.value"
                    >
                      {{ s.text }}
                    </option>
                  </select>
                </div>

                <!-- Transaction Type -->
                <div class="group space-y-2">
                  <label
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Transaction Type <span class="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    v-model="trans.transcode"
                    @change="ChangeTransactionType"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                  >
                    <option
                      v-for="t in scope.transactiontypeOptions"
                      :key="t.value"
                      :value="t.value"
                    >
                      {{ t.text }}
                    </option>
                  </select>
                </div>

                <!-- Reference 1 -->
                <div class="group space-y-2">
                  <label
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Reference 1 <span class="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    v-model="trans.referenceno"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg placeholder-gray-400 backdrop-blur-sm"
                    placeholder="Enter reference number"
                    required
                  />
                </div>

                <!-- Reference 2 -->
                <div class="group space-y-2">
                  <label
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Reference 2
                  </label>
                  <input
                    type="text"
                    v-model="trans.orderno"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg placeholder-gray-400 backdrop-blur-sm"
                    placeholder="Enter order number"
                  />
                </div>

                <!-- Reference 3 -->
                <div class="group space-y-2">
                  <label
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Reference 3
                  </label>
                  <input
                    type="text"
                    v-model="trans.documentno"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg placeholder-gray-400 backdrop-blur-sm"
                    placeholder="Enter document number"
                  />
                </div>

                <!-- Reference 4 -->
                <div class="group space-y-2">
                  <label
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Reference 4
                  </label>
                  <input
                    type="text"
                    v-model="trans.invoiceno"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg placeholder-gray-400 backdrop-blur-sm"
                    placeholder="Enter invoice number"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <!-- Reference Date -->
                <div class="group space-y-2">
                  <label
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Reference Date <span class="text-red-500 ml-1">*</span>
                  </label>
                  <div class="relative">
                    <VueDatePicker
                      v-model="trans.referencedate"
                      :auto-position="false"
                      :teleport="true"
                      :enable-time-picker="false"
                      auto-apply
                      class="w-full date-picker-custom"
                    />
                  </div>
                </div>

                <!-- Order Date -->
                <div class="group space-y-2">
                  <label
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Order Date <span class="text-red-500 ml-1">*</span>
                  </label>
                  <div class="relative">
                    <VueDatePicker
                      v-model="trans.orderdate"
                      :auto-position="false"
                      :teleport="true"
                      :enable-time-picker="false"
                      auto-apply
                      class="w-full date-picker-custom"
                    />
                  </div>
                </div>

                <!-- Delivery Date -->
                <div class="group space-y-2">
                  <label
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Delivery Date <span class="text-red-500 ml-1">*</span>
                  </label>
                  <div class="relative">
                    <VueDatePicker
                      v-model="trans.deliverydate"
                      :auto-position="false"
                      :teleport="true"
                      :enable-time-picker="false"
                      auto-apply
                      class="w-full date-picker-custom"
                    />
                  </div>
                </div>
              </div>

              <!-- Remarks - Full Width -->
              <div class="md:col-span-2 xl:col-span-3 space-y-2">
                <label
                  class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                >
                  Remarks
                </label>
                <textarea
                  v-model="trans.remarks"
                  rows="4"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300 placeholder-gray-400 resize-none"
                  placeholder="Write your remarks here..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Items Section -->
          <div
            class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div class="bg-gradient-to-r from-green-600 to-teal-600 px-8 py-6">
              <h2 class="text-xl font-semibold text-white flex items-center">
                <svg
                  class="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                Asset Management
              </h2>
            </div>

            <div class="p-8">
              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-4 mb-8">
                <button
                  type="button"
                  @click="onSearchItem()"
                  class="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:via-blue-700 hover:to-blue-700 focus:ring-4 focus:ring-blue-200 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <svg
                    class="w-6 h-6 mr-3 group-hover:rotate-180 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Asset
                </button>
              </div>

              <!-- Modal -->
              <div
                v-if="showModal"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
              >
                <div
                  class="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
                >
                  <!-- Modal Header -->
                  <div
                    class="bg-gradient-to-r from-blue-600 to-blue-600 px-8 py-6"
                  >
                    <div class="flex items-center justify-between">
                      <h3 class="text-2xl font-bold text-white">Add Assets</h3>
                      <button
                        @click="hideModal()"
                        class="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
                      >
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
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
                  </div>

                  <!-- Modal Body -->
                  <div class="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
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
                          v-model="searchQuery"
                          class="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400"
                          placeholder="Search Code/Description..."
                        />
                      </div>
                    </div>

                    <!-- Items List -->
                    <div class="space-y-4">
                      <div
                        v-for="itm in itemMasterList"
                        :key="itm.PalletCode"
                        @click="onItemSelect(itm)"
                        v-show="!alreadyExist(itm.PalletCode)"
                        class="group bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg"
                      >
                        <div class="flex items-center space-x-4">
                          <input
                            type="checkbox"
                            :checked="itm.isSelected"
                            v-model="itm.isSelected"
                            class="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <div class="flex-1">
                            <div class="font-semibold text-gray-900 mb-1">
                              {{ itm.PalletCode }}
                            </div>
                            <div class="text-gray-600 mb-1">
                              {{ itm.PalletDescription }}
                            </div>
                            <div class="text-sm text-gray-500">
                              UOM: {{ itm.UnitOfMeasure }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Modal Footer -->
                  <div class="bg-gray-50 px-8 py-6 flex justify-end space-x-4">
                    <button
                      type="button"
                      @click="hideModal()"
                      class="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      @click="onAddSelectedPallet"
                      class="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-200 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Add Selected
                    </button>
                  </div>
                </div>
              </div>

              <!-- Desktop Table -->
              <div
                class="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 shadow-lg"
              >
                <table class="w-full">
                  <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th
                        class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                      <th
                        class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                      >
                        Asset Code
                      </th>
                      <th
                        class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                      >
                        UOM
                      </th>
                      <th
                        class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                      >
                        Qty Served
                      </th>
                      <th
                        class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                      >
                        Location
                      </th>
                      <th
                        class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                      >
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                      v-for="(pallet, index) in trans.invty_transdtl"
                      :key="index"
                      class="hover:bg-blue-50 transition-all duration-200"
                    >
                      <td class="px-6 py-4">
                        <button
                          @click="onDelete(index)"
                          class="group p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 focus:ring-4 focus:ring-red-100 transition-all duration-200 transform hover:scale-110"
                        >
                          <svg
                            class="w-5 h-5 group-hover:scale-110 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                      <td class="px-6 py-4 font-bold text-gray-900">
                        {{ pallet.itemId }}
                      </td>
                      <td class="px-6 py-4 text-gray-700">
                        {{ pallet.itemdesc }}
                      </td>
                      <td class="px-6 py-4 text-gray-700">{{ pallet.uom }}</td>
                      <td class="px-6 py-4">
                        <input
                          type="number"
                          v-model="pallet.qtyserved"
                          class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                          placeholder="0"
                        />
                      </td>
                      <td class="px-6 py-4">
                        <select
                          v-model="pallet.destination"
                          class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        >
                          <option value="" disabled>--Select Location--</option>
                          <option
                            v-for="loc in scope.locationOptions"
                            :key="loc.value"
                            :value="loc.value"
                          >
                            {{ loc.text }}
                          </option>
                        </select>
                      </td>
                      <td class="px-6 py-4">
                        <input
                          type="text"
                          v-model="pallet.remarks"
                          class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                          placeholder="Enter remarks"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Mobile Cards -->
              <div class="lg:hidden space-y-4">
                <div
                  v-for="(pallet, index) in trans.invty_transdtl"
                  :key="index"
                  class="bg-gray-50 rounded-2xl border border-gray-200 p-6 space-y-4"
                >
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="font-semibold text-gray-900 mb-1">
                        {{ pallet.itemId }}
                      </div>
                      <div class="text-gray-600 text-sm">
                        {{ pallet.itemdesc }}
                      </div>
                    </div>
                    <button
                      @click="onDelete(index)"
                      class="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-200"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div class="space-y-3">
                    <div>
                      <label
                        class="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Qty Served <span class="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        v-model="pallet.qtyserved"
                        class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label
                        class="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Location <span class="text-red-500">*</span>
                      </label>
                      <select
                        v-model="pallet.destination"
                        class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      >
                        <option value="" disabled>--Select Location--</option>
                        <option
                          v-for="loc in scope.locationOptions"
                          :key="loc.value"
                          :value="loc.value"
                        >
                          {{ loc.text }}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        class="block text-sm font-semibold text-gray-700 mb-1"
                        >Remarks</label
                      >
                      <input
                        type="text"
                        v-model="pallet.remarks"
                        class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                        placeholder="Enter remarks"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap justify-end gap-4 mt-8">
            <button
              v-if="scope.isEdit"
              @click="onBack"
              class="px-8 py-4 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200 transform hover:scale-105"
            >
              Back
            </button>
            <button
              :disabled="isClick"
              @click="onSave('P')"
              class="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-800 focus:ring-4 focus:ring-purple-200 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {{ isClick ? "Please wait..." : "Save And Post" }}
            </button>
            <button
              :disabled="isClick"
              @click="onSave('O')"
              class="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-200 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {{ isClick ? "Please wait..." : "Save" }}
            </button>
          </div>
        </div>
      </div>

      <!-- QR Scanner Modal -->
      <div
        v-if="openModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <QRBarcodeScanner
          @close="openModal = false"
          @success="OnSuccessScanPalletCode"
        />
      </div>
    </ion-content>
  </IonPage>
</template>

<script setup>
import { openModal } from "../../../dashboard/store";
import { serviceApi } from "../../../services/piso-serviceapi";
import { isClick } from "../../../dashboard/store";
import { format } from "date-fns";
import Swal from "sweetalert2";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const scope = reactive({});
const pltSearch = ref();
const supplierOptions = []; // Your options data here
const trans = reactive({});
const ionRouter = useIonRouter();
const showModal = ref(false);
trans.deliverydate = new Date();
trans.orderdate = new Date();
trans.referencedate = new Date();
scope.trnscde = getCookie("transid");
const tooltips = ref(false);
const searchQuery = ref("");

const itemMasterList = computed(() => {
  if (!searchQuery.value.trim()) return scope.itemMasterList;
  {
    return scope.itemMasterList.filter((item) => {
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

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const hideModal = () => {
  showModal.value = false;
};

const onBack = () => {
  ionRouter.replace("/tabs/transaction/receipt-batch-posting");
};

async function getIncomingTransTyps() {
  try {
    var sitecode = JSON.parse(localStorage.getItem("_102")).sitecode;

    // initialize module add/edit
    if (scope.trnscde === "" || scope.trnscde === undefined) {
      scope.iconform = "glyphicons glyphicons-circle_plus";
      scope.titleform = "New Receipt";
    } else {
      scope.iconform = "glyphicon glyphicon-edit";
      scope.titleform = "Update Receipt";
      scope.isEdit = true;
      await onGetItemUpdate(scope.trnscde);
    }

    // get trans type
    const transTypeResponse = await serviceApi().get(
      `pallet/get-trans-type/?code=incoming`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );
    scope.transcodeList = transTypeResponse.data;
    scope.transactiontypeOptions = scope.transcodeList.map((item) => ({
      value: item.master_key,
      text: item.description,
    }));

    // get location
    const locationResponse = await serviceApi().get(
      `pallet/get-pallet-location/?sitecode=${sitecode}`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );

    scope.location = locationResponse.data;
    scope.locationOptions = scope.location.map((item) => ({
      value: item.Location,
      text: item.LocationDescription,
    }));

    // get Supplier
    const supplierResponse = await serviceApi().get(
      `pallet/get-pallet-shipper-type/${sitecode},I`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );
    if (!supplierResponse.data.hasError) {
      scope.supplier = supplierResponse.data.data;
      scope.supplierOptions = scope.supplier.map((item) => ({
        value: item.Id,
        text: item.Name,
      }));
    } else {
      Toast.fire({
        title: "Error",
        text: supplierResponse.data.errorMessage,
        icon: "error",
      });
    }

    // get Trucker
    const truckerResponse = await serviceApi().get(
      `wfms/get-active-trucker/?appname=PISO&brancode=${sitecode}`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );
    scope.truckers = truckerResponse.data;
    scope.truckersOptions = scope.truckers.map((item) => ({
      value: item.fleetownerId,
      text: item.ownername,
    }));

    //get assetaccount
    const assetaccountResponse = await serviceApi().get(
      `pallet/get-assetaccount?dropid=ASSETACCOUNT`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );
    scope.assetaccounts = assetaccountResponse.data.data;
    console.log("this is assets: ", assetaccountResponse.data);

    scope.assetAccountOptions = scope.assetaccounts.map((item) => ({
      value: item.drpdata,
      text: item.drpdisplay,
    }));
    // if (scope.trnscde !== "") {
    //   scope.trans.trucker = scope.trans.trucker;
    // }
  } catch (error) {
    Toast.fire({
      title: "Error",
      text: error.message,
      icon: "error",
    });
    // HttpErrorService.getStatus(error.response.status, error.response.data);
    // $rootScope.ShowPrompt(
    //   "#modal-panel-prompt-error",
    //   "onInit: " + JSON.stringify(error.message)
    // );
  }
}

async function onGetItemUpdate(id) {
  try {
    const response = await serviceApi().get(
      `pallet/get-trans-details/?transId=${id}`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );
    //trans = response.data.data;
    if (response.status === 200) {
      Object.assign(trans, response.data.data);
      trans.referencedate = format(new Date(trans.referencedate), "yyyy-MM-dd");
      trans.orderdate = format(new Date(trans.orderdate), "yyyy-MM-dd");
      trans.deliverydate = format(new Date(trans.deliverydate), "yyyy-MM-dd");

      removeCookie("transid");
    }
    // Additional logic if needed
  } catch (error) {
    Toast.fire({
      title: "Error",
      text: error.message,
      icon: "error",
    });
    //HttpErrorService.getStatus(error.response.status, error.response.data);
    // Handle errors or show a message as needed
  }
}

const onSave = async (p) => {
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
        isClick.value = true;
        trans.warehouseId = JSON.parse(localStorage.getItem("_102")).sitecode;
        trans.created_by = JSON.parse(
          decrypt(localStorage.getItem("_214"))
        ).fullname;
        trans.status = p;
        trans.transtype = "I";

        // Save to API using Axios
        const response = await serviceApi().post(
          `Pallet/post-multi-trans`,
          trans,
          {
            headers: {
              "Content-Type": "application/json", // Specify the content type
              Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
            },
          }
        );

        if (response.status == 200) {
          if (p === "P") {
            Toast.fire({
              title: "Success!",
              text: "Successfully saved and posted.",
              icon: "success",
            });
          } else {
            Toast.fire({
              title: "Success!",
              text: "Successfully saved.",
              icon: "success",
            });
          }

          if (scope.isEdit) {
            ionRouter.replace("/tabs/transaction/receipt-batch-posting");
          }

          for (const key in trans) {
            trans[key] = null;
          }

          searchQuery.value = "";

          trans.deliverydate = new Date();
          trans.orderdate = new Date();
          trans.referencedate = new Date();

          isClick.value = false;
        } else {
          Swal.fire("Error Encounter!", `${response.data}`, "error");
          console.error(response.data);
          isClick.value = false;
        }
      } catch (error) {
        console.error(error);
        isClick.value = false;
      }
    }
  });
};

const ChangeSupplier = () => {
  for (var i in scope.supplier) {
    if (scope.supplier[i].Id === trans.shipperId) {
      trans.shipperId = scope.supplier[i].Id;
      break;
    }
  }
};

const ChangeAssetAccount = () => {
  for (var i in scope.assetaccounts) {
    if (scope.assetaccounts[i].Id === trans.assetaccounts) {
      trans.assetaccountid = scope.assetaccounts[i].drpdata;
      break;
    }
  }
};

const ChangeTrucker = () => {
  for (var i in scope.trucker) {
    if (scope.trucker[i].fleetownerId === trans.trucker) {
      trans.trucker = scope.trucker[i].fleetownerId;
      break;
    }
  }
};

const ChangeTransactionType = () => {
  for (var i in scope.transcodeList) {
    if (scope.transcodeList[i].master_key === trans.transcode) {
      trans.transcode = scope.transcodeList[i].master_key;
      break;
    }
  }
};

const onSearchItem = async () => {
  scope.itemMasterList = [];
  try {
    const response = await serviceApi().get(
      "pallet/get-pallet-item-master/?sitecode=" +
        JSON.parse(localStorage.getItem("_102")).sitecode +
        "&status=A&take=50&page=1",
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );

    if (!response.hasError) {
      console.log(response);
      var resData = response.data.data.data;
      for (var i in resData) {
        scope.itemMasterList.push({
          isSelected: false,
          CreateDate: resData[i].CreateDate,
          CreatedBy: resData[i].CreatedBy,
          PalletCode: resData[i].PalletCode,
          PalletDescription: resData[i].PalletDescription,
          PalletType: resData[i].PalletType,
          Status: resData[i].Status,
          UnitOfMeasure: resData[i].UnitOfMeasure,
        });
      }

      showModal.value = true;
    } else {
      console.log("Error: " + response.errorMessage);
    }
  } catch (error) {
    Toast.fire({
      title: "Error",
      text: error.message,
      icon: "error",
    });
  }

  // .success(function (response, status, headers, config) {

  // })
  // .error(function (data, status, headers, config) {
  //   HttpErrorService.getStatus(status, data);
  // });
};

//Add selected Pallet
const onAddSelectedPallet = () => {
  if (trans.invty_transdtl === undefined || trans.invty_transdtl === null) {
    trans.invty_transdtl = [];
  }

  scope.itemMasterList.forEach((item) => {
    if (item.isSelected === true) {
      const newItem = {
        itemId: item.PalletCode,
        itemdesc: item.PalletDescription,
        uom: item.UnitOfMeasure,
        qtytrans: 0,
        qtyserved: 0,
      };

      trans.invty_transdtl.push(newItem);

      item.isSelected = false;
    }
  });
  console.log(trans.invty_transdtl);
  showModal.value = false;
};

const alreadyExist = (palletcode) => {
  return (
    trans.invty_transdtl &&
    Array.isArray(trans.invty_transdtl) &&
    trans.invty_transdtl.some((item) => item.itemId === palletcode)
  );
};

const onItemSelect = (p) => {
  if (p.isSelected) {
    trans.itemdesc = "";
    trans.itemid = "";
    p.isSelected = false;
  } else {
    trans.itemdesc = p.PalletDescription;
    trans.itemid = p.PalletCode;
    p.isSelected = true;
  }
};

const onDelete = (index) => {
  trans.invty_transdtl.splice(index, 1);
};

const onCreateNew = () => {
  scope.isError = false;
  scope.isSuccess = false;

  scope.itemMasterList = [];
  scope.trans = {};
  scope.trans.invty_transdtl = [];
};

function onValidation() {
  var hasError = false;
  const name = ref();
  if (trans.shipperId === "" || trans.shipperId === undefined) {
    hasError = true;
    name.value = "Supplier";
  } else if (trans.trucker === "" || trans.trucker === undefined) {
    hasError = true;
    name.value = "Trucker";
  } else if (trans.referenceno === "" || trans.referenceno === undefined) {
    hasError = true;
    name.value = "Reference 1";
  } else if (trans.transcode === "" || trans.transcode === undefined) {
    hasError = true;
    name.value = "Transcode";
  } else if (trans.referencedate === "" || trans.referencedate === undefined) {
    hasError = true;
    name.value = "Reference Date";
  } else if (trans.orderdate === "" || trans.orderdate === undefined) {
    hasError = true;
    name.value = "Order Date";
  } else if (trans.deliverydate === "" || trans.deliverydate === undefined) {
    hasError = true;
    name.value = "Delivery Date";
  }

  if (hasError) {
    Toast.fire({
      title: `${name.value} is required!`,
      icon: "warning",
    });

    return hasError;
  }

  if (
    trans.invty_transdtl === undefined ||
    trans.invty_transdtl === null ||
    trans.invty_transdtl.length === 0
  ) {
    Toast.fire({
      title: "Please add at least one pallet!",
      icon: "warning",
    });
    hasError = true;
  }

  for (var i = 0; i < trans.invty_transdtl.length; i++) {
    if (trans.invty_transdtl[i].qtyserved <= 0) {
      Toast.fire({
        title: "Please Check the Quantity",
        icon: "warning",
      });
      hasError = true;
      break;
    }
  }

  for (var j = 0; j < trans.invty_transdtl.length; j++) {
    if (
      trans.invty_transdtl[j].destination === "" ||
      trans.invty_transdtl[j].destination === undefined
    ) {
      Toast.fire({
        title: "Please Select Location",
        icon: "warning",
      });
      hasError = true;
      break;
    }
  }

  return hasError;
}

const OnSuccessScanPalletCode = async (item) => {
  try {
    const response = await serviceApi().get(
      "pallet/get-pallet-item/?sitecode=" +
        JSON.parse(localStorage.getItem("_102")).sitecode +
        "&palletCode=" +
        item,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );

    if (!response.hasError) {
      console.log(response);
      var resData = response.data.data;
      if (trans.invty_transdtl === undefined || trans.invty_transdtl === null) {
        trans.invty_transdtl = [];
      }

      if (alreadyExist(resData.PalletCode)) {
        console.log(resData.PalletCode + " is already exist.");

        return;
      }
      const newItem = {
        itemId: resData.PalletCode,
        itemdesc: resData.PalletDescription,
        uom: resData.UnitOfMeasure,
        qtytrans: 0,
        qtyserved: 0,
      };

      trans.invty_transdtl.push(newItem);
      console.log(trans.invty_transdtl);
    } else {
      console.log("Error: " + response.errorMessage);
    }
  } catch (error) {
    Toast.fire({
      title: "Error",
      text: error.message,
      icon: "error",
    });
  }
};
onMounted(() => {
  getIncomingTransTyps();
});
</script>

<style scoped>
/* Custom date picker styling */
.date-picker-custom :deep(.dp__input) {
  @apply w-full px-4 py-4 pl-10 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm;
}

/* Enhanced scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded-full;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-gradient-to-b from-blue-400 to-purple-500 rounded-full;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  @apply from-blue-500 to-purple-600;
}

/* Glassmorphism effect for cards */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

/* Animation keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}
</style>
