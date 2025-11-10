<template>
  <IonPage>
    <ion-content class="bg-gradient-to-br from-slate-50 to-blue-50">
      <div class="min-h-screen p-4 lg:p-8">
        <!-- Header -->
        <div class="mb-8">
          <h1
            class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
          >
            {{ scope.titleform }}
          </h1>
          <div
            class="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          ></div>
        </div>
        <div class="mx-auto space-y-8">
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
                <div class="group space-y-2">
                  <label
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                    >Customer <span class="text-red-500">*</span></label
                  >
                  <select
                    v-model="trans.shipperId"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                  >
                    <option v-for="s in scope.supplierOptions" :value="s.value">
                      {{ s.text }}
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    for="trucker"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                    >Trucker <span class="text-red-500">*</span></label
                  >
                  <select
                    v-model="trans.trucker"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                  >
                    <option v-for="t in scope.truckersOptions" :value="t.value">
                      {{ t.text }}
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    for="reference1"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                    >Ref # <span class="text-red-500">*</span></label
                  >
                  <input
                    type="text"
                    id="reference1"
                    v-model="trans.referenceno"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    for="reference2"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                    >Order # <span class="text-red-500">*</span></label
                  >
                  <input
                    type="text"
                    id="reference2"
                    v-model="trans.orderno"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                    placeholder=""
                    required
                  />
                </div>

                <div>
                  <label
                    for="reference3"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Doc #
                  </label>
                  <input
                    id="reference3"
                    type="text"
                    v-model="trans.documentno"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    for="reference4"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Invoice #
                  </label>
                  <input
                    id="reference4"
                    type="text"
                    v-model="trans.invoiceno"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                    placeholder=""
                    required
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label
                    for="refdate"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                    >Ref Date <span class="text-red-500">*</span></label
                  >
                  <!-- <input
                type="date"
                id="refdate"
                v-model="trans.referencedate"
                class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm   "
                placeholder="Flowbite"
                required
              /> -->
                  <VueDatePicker
                    v-model="trans.referencedate"
                    :auto-position="false"
                    :teleport="true"
                    :enable-time-picker="false"
                    auto-apply
                    class="w-full date-picker-custom"
                  ></VueDatePicker>
                </div>

                <div>
                  <label
                    for="orderDate"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Order Date <span class="text-red-500">*</span>
                  </label>
                  <!-- <input
                id="orderDate"
                type="date"
                v-model="trans.orderdate"
                class="max-w-md w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm   "
                placeholder=""
                required
              /> -->
                  <VueDatePicker
                    v-model="trans.orderdate"
                    :auto-position="false"
                    :teleport="true"
                    :enable-time-picker="false"
                    auto-apply
                    class="w-full date-picker-custom"
                  ></VueDatePicker>
                </div>
                <div>
                  <label
                    for="deliveryDate"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Delivery Date <span class="text-red-500">*</span>
                  </label>
                  <!--  <input
                id="deliveryDate"
                type="date"
                v-model="trans.deliverydate"
                class="max-w-md w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm   "
                placeholder=""
                required
              /> -->
                  <VueDatePicker
                    v-model="trans.deliverydate"
                    :auto-position="false"
                    :teleport="true"
                    :enable-time-picker="false"
                    auto-apply
                    class="w-full date-picker-custom"
                  ></VueDatePicker>
                </div>
              </div>
                <div>
                  <label
                    for="remarks"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Remarks
                  </label>
                  <textarea
                    id="renarks"
                    rows="4"
                    v-model="trans.remarks"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg placeholder-gray-400 resize-none backdrop-blur-sm"
                    placeholder="Write your remarks here..."
                  ></textarea>
                </div>
            </div>
          </div>

          <!-- Asset Section -->
          <div
            class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          >
            <div
              class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-8 py-6"
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                Asset Management
              </h2>
            </div>

            <div class="mt-5 overflow-auto rounded-lg shadow">
              <div class="p-8">
                <div class="mb-8">
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

                <!-- if the screen is wide or desktop view -->
                <div
                  class="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 shadow-xl"
                >
                  <table class="w-full">
                    <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                        >
                          Action
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                        >
                          Pallet Code
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                        >
                          Pallet Description
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                        >
                          UOM
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                        >
                          Available Qty
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                        >
                          Qty Served
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                        >
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr
                        class="hover:bg-blue-50 transition-all duration-200"
                        v-for="(pallet, index) in trans.invty_transdtl"
                      >
                        <td scope="row" class="px-6 py-4">
                          <!-- Delete Button and Tooltip -->
                          <div class="relative inline-block">
                            <button
                              @mouseover="tooltips = true"
                              @mouseleave="tooltips = false"
                              class="group p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 focus:ring-4 focus:ring-red-100 transition-all duration-200 transform hover:scale-110"
                              @click="onDelete(index)"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                            <div
                              v-if="tooltips"
                              class="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded shadow-lg"
                              :style="{
                                left: '50%',
                                transform: 'translateX(-50%)',
                              }"
                            >
                              Delete
                            </div>
                          </div>
                          <!--   <button
                        @click="onDelete(index)"
                        class="bg-red-500 rounded-lg p-1 ml-3"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button> -->
                        </td>

                        <td class="px-6 py-4">
                          <span
                            class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {{ pallet.destination }}
                          </span>
                        </td>
                        <td class="px-6 py-4 font-bold text-gray-900">
                          {{ pallet.itemId }}
                        </td>
                        <td class="px-6 py-4 text-gray-700">
                          {{ pallet.itemdesc }}
                        </td>
                        <td class="px-6 py-4 text-gray-700">
                          {{ pallet.uom }}
                        </td>
                        <td class="px-6 py-4">
                          <span
                            class="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold"
                          >
                            {{ pallet.AvailableQty }}
                          </span>
                        </td>
                        <td class="px-6 py-4">
                          <input
                            type="number"
                            id="QtyServed"
                            v-model="pallet.qtyserved"
                            @change="onCheckQtyTrans(pallet)"
                            class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                            placeholder=""
                            required
                          />
                        </td>
                        <td class="px-6 py-4">
                          <input
                            type="text"
                            id="remarks"
                            v-model="pallet.remarks"
                            class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                            placeholder=""
                            required
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- This when app is mobile view -->
              <div
                class="p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100"
              >
                <div
                  class="bg-white p-4 rounded-lg shadow"
                  v-for="(pallet, index) in trans.invty_transdtl"
                  :key="index"
                >
                  <div class="flex justify-between">
                    <label for="destination"
                      >Location: {{ pallet.destination }}</label
                    >
                    <button @click="onDelete(index)">
                      <svg
                        class="w-6 h-6 text-red-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>Code: {{ pallet.itemId }}</div>
                  <div>
                    <label for="description"
                      >Description: {{ pallet.itemdesc }}</label
                    >
                  </div>
                  <div>
                    <label for="uom">UOM: {{ pallet.uom }}</label>
                  </div>
                  <div>
                    <label for="availableqty"
                      >Available Qty: {{ pallet.AvailableQty }}</label
                    >
                  </div>
                  <!-- Qty -->
                  <div>
                    Qty Served: <span class="text-red-500">*</span>
                    <input
                      type="number"
                      id="QtyServed"
                      v-model="pallet.qtyserved"
                      @change="onCheckQtyTrans(pallet)"
                      class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      placeholder=""
                      required
                    />
                  </div>
                  <div>
                    Remarks:
                    <input
                      type="text"
                      id="remarks"
                      v-model="pallet.remarks"
                      class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="flex flex-wrap justify-end gap-4">
            <button
              type="submit"
              v-if="scope.isEdit"
              @click="onBack"
              class="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200 transform hover:scale-105"
            >
              Back
            </button>
            <button
              type="submit"
              :disabled="isClick"
              @click="onSave('P')"
              class="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-indigo-700 focus:ring-4 focus:ring-purple-200 transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {{ isClick ? "Please wait..." : "Save And Post" }}
            </button>
            <button
              type="submit"
              :disabled="isClick"
              @click="onSave('O')"
              class="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl hover:from-emerald-700 hover:to-teal-700 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {{ isClick ? "Please wait..." : "Save" }}
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      >
        <div
          class="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
        >
          <!-- Modal Header -->
          <div
            class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 py-6"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-2xl font-bold text-white">
                Select Items by Location
              </h3>
              <button
                @click="hideModal()"
                class="text-white hover:bg-white/20 rounded-full p-3 transition-all duration-200 hover:rotate-90"
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
          <div class="p-8 overflow-y-auto max-h-[calc(90vh-220px)]">
            <!-- Location Selection -->
            <div
              class="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200"
            >
              <div class="flex items-center gap-6">
                <div class="flex items-center">
                  <svg
                    class="w-6 h-6 text-blue-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <label class="text-lg font-bold text-gray-700"
                    >Location</label
                  >
                </div>
                <select
                  v-model="scope.selectedlocation"
                  @change="onGetItembyLocation()"
                  class="flex-1 px-4 py-3 bg-white border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                >
                  <option selected disabled value="">
                    Select a location to view available items
                  </option>
                  <option
                    v-for="t in scope.locationOptions"
                    :key="t.value"
                    :value="t.value"
                  >
                    {{ t.text }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Items List -->
            <div class="space-y-2">
              <h4
                class="text-lg font-bold text-gray-700 mb-4 flex items-center"
              >
                <svg
                  class="w-5 h-5 mr-2 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Available Items
              </h4>

              <div
                v-if="scope.itemMasterList && scope.itemMasterList.length > 0"
                class="space-y-4 max-h-96 overflow-y-auto pr-2"
              >
                <div
                  v-for="itm in scope.itemMasterList"
                  :key="itm.PalletCode"
                  @click="onItemSelect(itm)"
                  v-show="!alreadyExist(itm.PalletCode)"
                  class="group bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 border-2 border-gray-200 hover:border-blue-300 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                >
                  <div class="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      :checked="itm.isSelected"
                      v-model="itm.isSelected"
                      class="w-6 h-6 text-blue-600 bg-white border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-2 transition-all"
                    />
                    <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div class="font-bold text-gray-900 text-lg mb-1">
                          {{ itm.PalletCode }}
                        </div>
                        <div class="text-gray-600 mb-2">
                          {{ itm.PalletDescription }}
                        </div>
                        <div class="text-sm text-gray-500">
                          UOM: {{ itm.UnitOfMeasure }}
                        </div>
                      </div>
                      <div class="text-right">
                        <div
                          class="inline-flex items-center px-3 py-2 bg-emerald-100 text-emerald-800 rounded-xl font-semibold"
                        >
                          <svg
                            class="w-4 h-4 mr-2"
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
                          Available: {{ itm.AvailableQty }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-else-if="
                  scope.itemMasterList === undefined ||
                  (scope.itemMasterList && scope.itemMasterList.length === 0)
                "
                class="flex flex-col items-center justify-center py-12 text-gray-500"
              >
                <svg
                  class="w-16 h-16 mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <span class="text-lg font-semibold"
                  >No items available in selected location</span
                >
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div
            class="bg-gray-50/80 backdrop-blur-sm px-8 py-6 flex justify-end space-x-4 border-t border-gray-200/50"
          >
            <button
              type="button"
              @click="hideModal()"
              class="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="onAddSelectedPallet()"
              class="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Add Selected Items
            </button>
          </div>
        </div>
      </div>
    </ion-content>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";
import { format } from "date-fns";
import Swal from "sweetalert2";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { isClick } from "~/dashboard/store";

const scope = reactive({});
scope.selectedlocation = "";

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

/*search item*/
const onSearchItem = () => {
  showModal.value = true;
};

const hideModal = () => {
  showModal.value = false;
};

const onBack = () => {
  ionRouter.replace("/tabs/transaction/interplant-transfer-posting");
};

const onSave = async (p) => {
  const haserror = onValidation();

  if (haserror) {
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Confirm!",
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
        trans.transtype = "O";
        trans.transcode = "OUT03";

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
          if (!response.hasError) {
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

            isClick.value = false;
          } else {
            Toast.fire({
              title: "Error:",
              text: response.errorMessage,
              icon: "error",
            });
            isClick.value = false;
          }
          if (scope.isEdit) {
            ionRouter.replace("/tabs/transaction/interplant-transfer-posting");
          }
          for (const key in trans) {
            trans[key] = null;
          }

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
        AvailableQty: item.AvailableQty,
        destination: scope.selectedlocation,
      };

      trans.invty_transdtl.push(newItem);

      item.isSelected = false;
    }
  });
  console.log(trans.invty_transdtl);
  showModal.value = false;
};

const onGetItembyLocation = async () => {
  scope.itemMasterList = [];
  const response = await serviceApi().get(
    "pallet/get-inbound-item/?location=" +
      scope.selectedlocation +
      "&sitecode=" +
      JSON.parse(localStorage.getItem("_102")).sitecode,
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (!response.hasError) {
    var resData = response.data.data;
    for (var i in resData) {
      scope.itemMasterList.push({
        isSelected: false,
        PalletCode: resData[i].PalletCode,
        PalletDescription: resData[i].PalletDescription,
        AvailableQty: resData[i].qtyAvailable,
        UnitOfMeasure: resData[i].UnitOfMeasure,
        AvailableQty: resData[i].qtyAvailable,
      });
    }
  } else {
    Toast.fire({
      title: "Error",
      text: response.errorMessage,
      icon: "error",
    });
  }
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

async function getIncomingTransTyps() {
  try {
    var sitecode = JSON.parse(localStorage.getItem("_102")).sitecode;

    // initialize module add/edit
    if (!scope.trnscde) {
      scope.iconform = "glyphicons glyphicons-circle_plus";
      scope.titleform = "New Inter-Plant";
    } else {
      scope.iconform = "glyphicon glyphicon-edit";
      scope.titleform = "Update Inter-Plant";
      scope.isEdit = true;
      await onGetItemUpdate(scope.trnscde);
    }

    // get trans type
    // const transTypeResponse = await serviceApi().get(
    //   `pallet/get-pallet-location/`+sitecode+ ',100,1',
    //   {
    //     headers: {
    //       Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
    //     },
    //   }
    // );
    // console.log(transTypeResponse);
    // scope.location = transTypeResponse.data.data.data;
    // scope.transcodeList = transTypeResponse.data;
    // scope.transactiontypeOptions = scope.transcodeList.map((item) => ({
    //   value: item.master_key,
    //   text: item.description,
    // }));

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
      `pallet/get-pallet-shipper-interplant/${sitecode}`,
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

    // if (scope.trnscde !== "") {
    //   scope.trans.trucker = scope.trans.trucker;
    // }
  } catch (error) {
    Toast.fire({
      title: "Error",
      text: error.message,
      icon: "error",
    });
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

const onCheckQtyTrans = (p) => {
  var p1 = p.AvailableQty;
  var p2 = p.qtyserved;
  if (p1 < p2) {
    Toast.fire({
      title: "The quantity you enter is greater than available quantity!",
      icon: "warning",
    });
    p.qtyserved = 0;
  }
};

function onValidation() {
  var hasError = false;
  const name = ref("");
  if (trans.shipperId === "" || trans.shipperId === undefined) {
    hasError = true;
    name.value = "Supplier";
  } else if (trans.trucker === "" || trans.trucker === undefined) {
    hasError = true;
    name.value = "Trucker";
  } else if (trans.referenceno === "" || trans.referenceno === undefined) {
    hasError = true;
    name.value = "Reference 1";
  } else if (trans.orderno === "" || trans.orderno === undefined) {
    hasError = true;
    name.value = "Order #";
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

  return hasError;
}

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
