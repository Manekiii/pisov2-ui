<template>
  <IonPage>
     <ion-content>
      <!-- <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div> -->
      <div class="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        <!-- Header Section -->
        <div class="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm sticky top-0 z-40">
          <div class="max-w-7xl mx-auto px-4 py-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div>
                  <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Pallet Overall Transaction
                  </h1>
                  <p class="text-sm text-gray-500 mt-1">Comprehensive transaction overview and analytics</p>
                </div>
              </div>
              
              <button
                type="button"
                @click="showModal = true"
                class="group relative inline-flex items-center px-6 py-3 overflow-hidden text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg class="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"></path>
                </svg>
                Filter
              </button>
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-8">
          <!-- WEB VIEW -->
          <div class="hidden md:block">
            <!-- Enhanced Context Menu -->
            <div
              v-if="showMenu"
              :style="{
                position: 'fixed',
                top: `${menuPosition.y}px`,
                left: `${menuPosition.x}px`,
              }"
              class="bg-white rounded-xl shadow-2xl border border-gray-200/50 backdrop-blur-sm z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 context-menu"
            >
              <ul class="py-2">
                <li @click="exportToExcel" class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 cursor-pointer transition-all duration-150 group">
                  <div class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48" class="text-green-600">
                      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
                        <path stroke-linejoin="round" d="M8 15V6a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v36a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-9"/>
                        <path d="M31 15h3m-6 8h6m-6 8h6"/>
                        <path stroke-linejoin="round" d="M4 15h18v18H4zm6 6l6 6m0-6l-6 6"/>
                      </g>
                    </svg>
                  </div>
                  <span class="font-medium">Export to Excel</span>
                </li>
                <li @click="printSelection" class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 cursor-pointer transition-all duration-150 group">
                  <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="text-blue-600">
                      <path fill="currentColor" d="M16 8V5H8v3H6V3h12v5zM4 10h16zm14 2.5q.425 0 .713-.288T19 11.5t-.288-.712T18 10.5t-.712.288T17 11.5t.288.713t.712.287M16 19v-4H8v4zm2 2H6v-4H2v-6q0-1.275.875-2.137T5 8h14q1.275 0 2.138.863T22 11v6h-4zm2-6v-4q0-.425-.288-.712T19 10H5q-.425 0-.712.288T4 11v4h2v-2h12v2z"/>
                    </svg>
                  </div>
                  <span class="font-medium">Print</span>
                </li>
              </ul>
            </div>

            <!-- Enhanced Table -->
            <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <table
                class="w-full text-sm"
                @contextmenu.prevent="handleRightClick"
              >
                <thead class="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm">
                  <tr class="border-b border-gray-200/50">
                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                        </svg>
                        Pallet Code
                      </div>
                    </th>
                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
                        </svg>
                        Description
                      </div>
                    </th>
                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Location
                      </div>
                    </th>
                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        Trucker
                      </div>
                    </th>
                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        Shipper
                      </div>
                    </th>
                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Ref 1
                      </div>
                    </th>
                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Ref 2
                      </div>
                    </th>
                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        Available Qty
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200/50">
                  <tr
                    class="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/50 transition-all duration-200 group"
                    v-for="trans in scope.transactionList"
                    :key="trans.ItemCode"
                  >
                    <td class="px-6 py-4 font-mono text-sm text-gray-900 font-semibold">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-8 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-full"></div>
                        <span>{{ trans.ItemCode }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-900 font-medium">{{ trans.ItemDesc }}</td>
                    <td class="px-6 py-4 text-gray-900">
                      <div class="flex items-center gap-2">
                        <!-- <div class="w-3 h-3 bg-orange-500 rounded-full"></div> -->
                        <span>{{ trans.LocationDesc }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      <div class="flex items-center gap-2">
                        <!-- <div class="w-3 h-3 bg-yellow-500 rounded-full"></div> -->
                        <span>{{ trans.TruckerDesc }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      <div class="flex items-center gap-2">
                        <!-- <div class="w-3 h-3 bg-teal-500 rounded-full"></div> -->
                        <span>{{ trans.ShipperDesc }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {{ trans.OtherReference1 }}
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {{ trans.OtherReference2 }}
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      <div class="flex items-center gap-2">
                        <!-- <div class="w-3 h-3 bg-red-500 rounded-full"></div> -->
                        <span class="font-bold text-lg">{{ trans.ActualQty }}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- MOBILE VIEW -->
          <div class="block md:hidden space-y-4">
            <div
              v-for="trans in scope.transactionList"
              :key="trans.ItemCode"
              class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div class="p-6">
                <!-- Header -->
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-bold text-gray-900 font-mono">{{ trans.ItemCode }}</p>
                      <p class="text-sm text-gray-600">{{ trans.ItemDesc }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-gray-500 uppercase tracking-wide">Available Qty</p>
                    <p class="text-2xl font-bold text-purple-600">{{ trans.ActualQty }}</p>
                  </div>
                </div>

                <!-- Details Grid -->
                <div class="space-y-4">
                  <!-- Location & Logistics -->
                  <div class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4">
                    <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Location & Logistics
                    </h4>
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <p class="text-xs font-medium text-gray-600 mb-1">Location</p>
                        <p class="text-sm font-semibold text-gray-900">{{ trans.LocationDesc }}</p>
                      </div>
                      <div>
                        <p class="text-xs font-medium text-gray-600 mb-1">Trucker</p>
                        <p class="text-sm font-semibold text-gray-900">{{ trans.TruckerDesc }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Shipper Info -->
                  <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4">
                    <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg class="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      Shipper Information
                    </h4>
                    <p class="text-sm font-semibold text-gray-900">{{ trans.ShipperDesc }}</p>
                  </div>

                  <!-- References -->
                  <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                    <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      References
                    </h4>
                    <div class="flex gap-2 flex-wrap">
                      <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Ref 1: {{ trans.OtherReference1 }}
                      </div>
                      <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Ref 2: {{ trans.OtherReference2 }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
    <!-- Main modal DateFilter-->
       <div
      v-if="showModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 w-full h-full p-4 flex items-center justify-center overflow-x-hidden overflow-y-auto md:inset-0 max-h-full"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-900 opacity-50"></div>
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t">
            <h3 class="text-xl font-semibold text-gray-900">Filter</h3>
            <button
              @click="hideModal()"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-2 overflow-y-auto max-h-[60vh]">
            <div class="grid gap-2 md:grid-cols-1">
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Data From</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                      />
                    </svg>
                  </div>
                  <!--  <input
                      name="start"
                      type="date"
                      v-model="scope.dtefrom"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                      placeholder="Select date start"
                    /> -->
                  <VueDatePicker
                    v-model="scope.dtefrom"
                    :auto-position="false"
                    :teleport="true"
                    :enable-time-picker="false"
                    auto-apply
                  ></VueDatePicker>
                </div>
              </div>
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Data To</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                      />
                    </svg>
                  </div>
                  <!--  <input
                    name="end"
                    type="date"
                    v-model="scope.dteto"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                    placeholder="Select date end"
                  /> -->

                  <VueDatePicker
                    v-model="scope.dteto"
                    :auto-position="false"
                    :teleport="true"
                    :enable-time-picker="false"
                    auto-apply
                  ></VueDatePicker>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div
            class="flex justify-end items-center p-2 space-x-2 border-gray-200 rounded-b"
          >
            <button
              @click="onInit()"
              type="button"
              class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Preview
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Swal from "sweetalert2";
import { sidebarOpen } from "~/dashboard/store";
import * as XLSX from "xlsx";

var sitecode = JSON.parse(
  localStorage.getItem("_102")
).sitecode; /*set sidecode*/
const showModal = ref(true);
const scope = reactive({});
scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.dtefrom = new Date();
scope.dteto = new Date();

const showMenu = ref(false);
const menuPosition = ref({ x: 0, y: 0 });

// Handle right-click event
const handleRightClick = (event) => {
  // Prevent the default right-click menu from showing up
  event.preventDefault();

  // Set the menu's position based on the mouse coordinates
  const x = event.clientX;
  const y = event.clientY;

  // Offset the position slightly if you want some space around the context menu
  const yoffset = -100;
  const xoffset = !sidebarOpen.value ? -100 : -225;

  menuPosition.value = { x: x + xoffset, y: y + yoffset };

  // Show the custom context menu
  showMenu.value = true;
};

// Export to Excel functionality
const exportToExcel = () => {
  console.log("Exporting to Excel...");
  const ws = XLSX.utils.json_to_sheet(scope.transactionList);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "tableData.xlsx");
  showMenu.value = false; // Close the context menu after action
};

// Close the context menu if clicked outside
window.addEventListener("click", () => {
  showMenu.value = false;
});

const printSelection = () => {
  showMenu.value = false; // Close the context menu after action
  window.print();
};
const handleLoading = async () => {
  document.querySelector("#loadingindicator").classList.toggle("hidden");
};

const hideModal = () => {
  showModal.value = false;
};

/*initialize first load*/
const onInit = async (ipage) => {
  scope.currentPage = ipage;

  const response = await serviceApi().get(
    "pallet/get-overall-transaction/?sitecode=" +
      sitecode +
      "&dtefrom=" +
      format(scope.dtefrom, "yyyy/MM/dd") +
      "&dteto=" +
      format(scope.dteto, "yyyy/MM/dd"),
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (response.status === 200) {
    scope.transactionList = response.data;
    showModal.value = false;
  }
};

const totalItemServe = (param) => {
  var itotal = 0;
  for (var i in param) {
    itotal = itotal + param[i].qtyserved;
  }

  return itotal;
};

const onPreview = function () {
  scope.dtefrom = $("#dtefrom").data().date;
  scope.dteto = $("#dteto").data().date;
  scope.requiredPrompt = "";

  if (
    dtefrom == "" ||
    dtefrom == undefined ||
    dteto == "" ||
    dteto == undefined
  ) {
    scope.requiredPrompt = "Please fill up required fields.";
  } else {
    //GlobalHelper.StartSpin();
    onInit(1);
    //$rootScope.closeModalForm();
  }
};
onMounted(() => {});
</script>

<style scoped>
.context-menu {
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.context-menu ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.context-menu li {
  padding: 10px;
  cursor: pointer;
}

.context-menu li:hover {
  background-color: #f0f0f0;
}
</style>
