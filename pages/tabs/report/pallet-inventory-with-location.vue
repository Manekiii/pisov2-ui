<template>
  <IonPage>
    <ion-content class="bg-gradient-to-br from-gray-50 to-gray-100">
      <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div>
      
      <div class="mx-auto p-4 md:p-6 lg:p-8">
        <!-- Header Section -->
        <div id="print-title" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
                Pallet Inventory with Location
              </h1>
            </div>
            
            <div id="filter-button" class="hidden md:flex gap-3">
              <button
                type="button"
                @click="showModal = true"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
                </svg>
                Filter
              </button>

              <button
                type="button"
                @click="printPage"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-gray-300"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                </svg>
                Print
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Action Buttons -->
        <div id="filter-button" class="flex md:hidden gap-3 mb-6">
          <button
            type="button"
            @click="showModal = true"
            class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg transition-all duration-200 shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            Filter
          </button>

          <button
            type="button"
            @click="printPage"
            class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 rounded-lg transition-all duration-200 shadow-sm border border-gray-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
            Print
          </button>
        </div>

        <!-- Desktop Table View -->
        <div id="web-view" class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Trans ID</th>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Pallet Code</th>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Pallet Description</th>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Loc ID</th>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location Desc</th>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">In</th>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Out</th>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Running Bal</th>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ref #</th>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Doc #</th>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Specifics</th>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created Date</th>
                  <th id="theader" scope="col" class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created By</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  class="hover:bg-gray-50 transition-colors duration-150"
                  v-for="trans in scope.transactionList"
                  :key="trans.transId"
                >
                  <td id="tdetail" class="px-4 py-3 text-gray-900 font-medium">{{ trans.transId }}</td>
                  <td id="tdetail" class="px-4 py-3 text-gray-700">{{ trans.itemId }}</td>
                  <td id="tdetail" class="px-4 py-3 text-gray-700">{{ trans.itemdesc }}</td>
                  <td id="tdetail" class="px-4 py-3 text-gray-700">{{ trans.locationId }}</td>
                  <td id="tdetail" class="px-4 py-3 text-gray-700">{{ trans.locationdesc }}</td>
                  <td id="tdetail" class="px-4 py-3">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ trans.transtype }}
                    </span>
                  </td>
                  <td id="tdetail" class="px-4 py-3 text-green-600 font-medium">{{ trans.In }}</td>
                  <td id="tdetail" class="px-4 py-3 text-red-600 font-medium">{{ trans.Out }}</td>
                  <td id="tdetail" class="px-4 py-3 text-gray-900 font-semibold">{{ trans.RunningBalance }}</td>
                  <td id="tdetail" class="px-4 py-3 text-gray-700">{{ trans.referenceno }}</td>
                  <td id="tdetail" class="px-4 py-3 text-gray-700">{{ trans.documentno }}</td>
                  <td id="tdetail" class="px-4 py-3 text-gray-700">{{ trans.Specifics }}</td>
                  <td id="tdetail" class="px-4 py-3 text-gray-600 text-xs">
                    {{ format(new Date(trans.create_date), "MM/dd/yyyy hh:mm:ss a") }}
                  </td>
                  <td id="tdetail" class="px-4 py-3 text-gray-700">{{ trans.created_by }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Mobile Card View -->
        <div
          id="mobile-view"
          class="block md:hidden space-y-4 overflow-y-auto"
        >
          <div v-for="trans in filterPallet" :key="trans.transId">
            <div
              class="bg-white border border-gray-200 rounded-xl shadow-sm p-5 transition-all duration-200 hover:shadow-md"
              v-if="trans.locationId === scope.location"
            >
              <div class="space-y-3">
                <div class="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span class="text-xs font-semibold text-gray-500 uppercase">Trans ID</span>
                  <span class="text-sm font-bold text-gray-900">{{ trans.transId }}</span>
                </div>
                
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <span class="text-xs font-medium text-gray-500 block mb-1">Pallet Code</span>
                    <span class="text-sm text-gray-900 font-medium">{{ trans.itemId }}</span>
                  </div>
                  <div>
                    <span class="text-xs font-medium text-gray-500 block mb-1">Loc ID</span>
                    <span class="text-sm text-gray-900 font-medium">{{ trans.locationId }}</span>
                  </div>
                </div>

                <div>
                  <span class="text-xs font-medium text-gray-500 block mb-1">Pallet Description</span>
                  <span class="text-sm text-gray-900">{{ trans.itemdesc }}</span>
                </div>

                <div>
                  <span class="text-xs font-medium text-gray-500 block mb-1">Location Desc</span>
                  <span class="text-sm text-gray-900">{{ trans.transtype }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <span class="text-xs font-medium text-gray-500">TType:</span>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ trans.In }}
                  </span>
                </div>

                <div class="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                  <div class="text-center">
                    <span class="text-xs font-medium text-gray-500 block mb-1">In</span>
                    <span class="text-sm font-semibold text-green-600">{{ trans.Out }}</span>
                  </div>
                  <div class="text-center">
                    <span class="text-xs font-medium text-gray-500 block mb-1">Out</span>
                    <span class="text-sm font-semibold text-red-600">{{ trans.RunningBalance }}</span>
                  </div>
                  <div class="text-center">
                    <span class="text-xs font-medium text-gray-500 block mb-1">Running Bal</span>
                    <span class="text-sm font-bold text-gray-900">{{ trans.referenceno }}</span>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <span class="text-xs font-medium text-gray-500 block mb-1">Ref #</span>
                    <span class="text-sm text-gray-900">{{ trans.documentno }}</span>
                  </div>
                  <div>
                    <span class="text-xs font-medium text-gray-500 block mb-1">Doc #</span>
                    <span class="text-sm text-gray-900">{{ trans.Specifics }}</span>
                  </div>
                </div>

                <div class="pt-3 border-t border-gray-100">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-500">Created: {{ trans.create_date }}</span>
                    <span class="text-gray-700 font-medium">{{ trans.created_by }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

    <!-- Filter Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
        @click="hideModal()"
      ></div>
      
      <!-- Modal -->
      <div class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-scale-in">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900">Filter Options</h3>
          </div>
          <button
            @click="hideModal()"
            type="button"
            class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 overflow-y-auto max-h-[60vh]">
          <div class="space-y-5">
            <!-- Pallet Select -->
            <div>
              <label class="block mb-2 text-sm font-semibold text-gray-700">
                Pallet
              </label>
              <select
                name="pallet"
                v-model="scope.itemId"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option
                  v-for="item in scope.itemMasterList"
                  :key="item.PalletCode"
                  :value="item.PalletCode"
                >
                  {{ item.PalletDescription }}
                </option>
              </select>
            </div>

            <!-- Location Select -->
            <div>
              <label class="block mb-2 text-sm font-semibold text-gray-700">
                Location
              </label>
              <select
                name="location"
                v-model="scope.location"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option
                  v-for="loc in scope.locationOptions"
                  :key="loc.value"
                  :value="loc.value"
                >
                  {{ loc.text }}
                </option>
              </select>
            </div>

            <!-- Date Range -->
            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="block mb-2 text-sm font-semibold text-gray-700">
                  Date From
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                    <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
                  </div>
                  <VueDatePicker
                    v-model="scope.dtefrom"
                    :auto-position="false"
                    :teleport="true"
                    :enable-time-picker="false"
                    auto-apply
                    class="date-picker-custom"
                  ></VueDatePicker>
                </div>
              </div>

              <div>
                <label class="block mb-2 text-sm font-semibold text-gray-700">
                  Date To
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                    <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
                  </div>
                  <VueDatePicker
                    v-model="scope.dteto"
                    :auto-position="false"
                    :teleport="true"
                    :enable-time-picker="false"
                    auto-apply
                    class="date-picker-custom"
                  ></VueDatePicker>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end items-center gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            @click="hideModal()"
            type="button"
            class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg transition-all duration-200 border border-gray-300"
          >
            Cancel
          </button>
          <button
            @click="onInit()"
            type="button"
            class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            Preview
          </button>
        </div>
      </div>
    </div>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";
import { format } from "date-fns";
import Swal from "sweetalert2";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

var sitecode = JSON.parse(
  localStorage.getItem("_102")
).sitecode; /*set sidecode*/

const showModal = ref(false);
const filterPallet = ref();
const scope = reactive({});

scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.dtefrom = new Date();
scope.dteto = new Date();

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

/*initialize first load*/
const onInit = async (ipage) => {
  scope.currentPage = ipage;

  const response = await serviceApi().get(
    "pallet/get-pallet-ledger-with-location-running-balance/?brancode=" +
      sitecode +
      "&itemId=" +
      scope.itemId +
      "&dtefrom=" +
      format(scope.dtefrom, "MM/dd/yyyy") +
      "&dteto=" +
      format(scope.dteto, "MM/dd/yyyy"),
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (response.status === 200) {
    scope.transactionList = response.data.data.data;
    scope.total_count = response.data.data.total_count;
    filterPallet.value = scope.transactionList.filter((item) =>
      item.locationId.toLowerCase().includes(scope.location.toLowerCase())
    );
    showModal.value = false;
  }
};

scope.onPreview = function () {
  scope.requiredPrompt = "";

  if (
    scope.dtefrom == "" ||
    scope.dtefrom == undefined ||
    scope.dteto == "" ||
    scope.dteto == undefined ||
    scope.itemId == "" ||
    scope.itemId == undefined
  ) {
    scope.requiredPrompt = "Please fill up required fields.";

    Toast.fire({
      title: scope.requiredPrompt,
      icon: "warning",
    });
  } else {
    scope.palletDes = filterFilter(scope.itemMasterList, {
      PalletCode: scope.itemId,
    })[0].PalletDescription;
    onInit(1);
  }
};

const preload = async () => {
  try {
    scope.itemMasterList = [];
    const response1 = await serviceApi().get(
      "pallet/get-pallet-item-master/?sitecode=" +
        sitecode +
        "&status=A&take=50&page=1",
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );

    if (response1.status === 200) {
      var resData = response1.data.data.data;
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
      //$rootScope.openModalForm("#modal-report-prompt-ledger-running-bal"); //call modal filter
    } else {
      console.log("Error: " + response1.errorMessage);
    }

    const response2 = await serviceApi().get(
      "pallet/get-pallet-location/?sitecode=" + sitecode,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );

    if (response2.status === 200) {
      scope.location = response2.data;
      scope.locationOptions = [];
      for (var i = 0; i < scope.location.length; i++) {
        scope.locationOptions.push({
          value: scope.location[i].Location,
          text: scope.location[i].LocationDescription,
        });
      }
    } else {
      Toast.fire({
        title: "Error",
        text: response2.errorMessage,
        icon: "error",
      });
    }
  } catch (error) {}
};

const filteredTransactions = computed(() =>
  scope.transactionList.filter((trans) =>
    trans.locationId.includes(scope.location)
  )
);

const printPage = () => {
  window.print();
};

onMounted(() => {
  preload();
});
</script>

<style scoped>
#web-view {
  overflow-x: auto;
}

@media screen and (max-width: 768px), print {
  #mobile-view,
  #filter-button {
    
  }

  #web-view {
    display: block;
    width: 100%;
    overflow: visible;
    border: 0;
    font-size: xx-small;
  }

  #theader,
  #tdetail {
    font-size: xx-small;
    padding-left: 3px;
    padding-right: 3px;
  }
}


@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
