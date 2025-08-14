<template>
  <IonPage>
    <ion-content>
      <!-- <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div> -->
      <div class="p-4">
        <div
          id="print-title"
          class="border-b-2 items-center justify-center flex p-2"
        >
          <label
            for="title"
            class="font-semibold text-3xl block mb-2 text-gray-900"
          >
            Transfer To Report
          </label>
        </div>
        <div id="filter-button" class="flex justify-end">
          <button
            type="submit"
            @click="showModal = true"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Filter
          </button>
          <button
            type="submit"
            @click="printPage"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Print
          </button>
        </div>
        <!-- WEB -->
        <div id="web-view" class="hidden md:block">
          <table class="w-full text-sm text-left rtl:text-right rounded-lg">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <!--<th id="theader" scope="col" class="px-6 py-3">Action</th> -->
                <th id="theader" scope="col" class="px-6 py-3">Trans #</th>
                <th id="theader" scope="col" class="px-6 py-3">Transfer To</th>
                <th id="theader" scope="col" class="px-6 py-3">Ref #</th>
                <th id="theader" scope="col" class="px-6 py-3">Doc #</th>
                <th id="theader" scope="col" class="px-6 py-3">Item Code</th>
                <th id="theader" scope="col" class="px-6 py-3">Description</th>
                <th id="theader" scope="col" class="px-6 py-3">Qty</th>
                <th id="theader" scope="col" class="px-6 py-3">
                  Source Storage
                </th>
                <th id="theader" scope="col" class="px-6 py-3">Remarks</th>
                <th id="theader" scope="col" class="px-6 py-3">Created By</th>
                <th id="theader" scope="col" class="px-6 py-3">Created Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b"
                v-for="trans in scope.transactionList"
              >
                <td id="tdetail" class="px-6 py-4">
                  {{ trans.TransactionID }}
                </td>
                <td id="tdetail" class="px-6 py-4">
                  {{ trans.TransferredTo }}
                </td>
                <td id="tdetail" class="px-6 py-4">{{ trans.referenceno }}</td>
                <td id="tdetail" class="px-6 py-4">{{ trans.documentno }}</td>
                <td id="tdetail" class="px-6 py-4">{{ trans.ItemCode }}</td>
                <td id="tdetail" class="px-6 py-4">
                  {{ trans.ItemDescription }}
                </td>
                <td id="tdetail" class="px-6 py-4">
                  {{ trans.QtyTransferred }}
                </td>
                <td id="tdetail" class="px-6 py-4">
                  {{ trans.SourceStorage }}
                </td>
                <td id="tdetail" class="px-6 py-4">{{ trans.remarks }}</td>
                <td id="tdetail" class="px-6 py-4">
                  {{ trans.CreatedBy }}
                </td>
                <td id="tdetail" class="px-6 py-4">
                  {{
                    format(new Date(trans.CreatedDate), "MM/dd/yyyy hh:mm:ss a")
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- mobile -->
        <div
          id="mobile-view"
          class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[75vh]"
        >
          <div
            v-for="trans in scope.transactionList"
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mb-3"
          >
            <div>
              <label for="transactionNumber"
                >Trans #: {{ trans.TransactionID }}</label
              >
            </div>
            <div>
              <label for="orderNumber"
                >Transfer To: {{ trans.TransferredTo }}</label
              >
            </div>
            <div>
              <label for="transactionNumber"
                >Ref #: {{ trans.referenceno }}</label
              >
            </div>
            <div>
              <label for="orderNumber">Doc #: {{ trans.documentno }}</label>
            </div>

            <div>
              <label for="transactionNumber"
                >Item Code: {{ trans.ItemCode }}</label
              >
            </div>
            <div>
              <label for="orderNumber">
                Description: {{ trans.ItemDescription }}</label
              >
            </div>
            <div>
              <label for="orderNumber"> Qty: {{ trans.QtyTransferred }}</label>
            </div>
            <div>
              <label for="orderNumber">
                Source Storage: {{ trans.SourceStorage }}</label
              >
            </div>
            <div>
              <label for="orderNumber"> Remarks: {{ trans.remarks }}</label>
            </div>
            <div>
              <label for="orderNumber">
                Created By: {{ trans.CreatedBy }}</label
              >
            </div>
            <div>
              <label for="orderNumber">
                Created Date: {{ trans.CreatedDate }}</label
              >
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
            <div class="grid gap-6 md:grid-cols-1">
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
                  <!-- <input
                    name="start"
                    type="date"
                    v-model="scope.dtefrom"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5   "
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
                  <!-- <input
                    name="end"
                    type="date"
                    v-model="scope.dteto"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5   "
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
              @click="onPreview()"
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
import Swal from "sweetalert2";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

var sitecode = JSON.parse(
  localStorage.getItem("_102")
).sitecode; /*set sidecode*/
const showModal = ref(true);
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

// const handleLoading = async () => {
//   document.querySelector("#loadingindicator").classList.toggle("hidden");
// };

const hideModal = () => {
  showModal.value = false;
};

/*initialize first load*/
const onInit = async (ipage) => {
  // handleLoading();
  scope.currentPage = ipage;

  const response = await serviceApi().get(
    "pallet/get-transfer-to-report/?sitecode=" +
      sitecode +
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
    // handleLoading();
  }
};

const totalItemServe = (param) => {
  var itotal = 0;
  for (var i in param) {
    itotal = itotal + param[i].qtyserved;
  }

  return itotal;
};

const onPreview = () => {
  if (
    scope.dtefrom == "" ||
    scope.dtefrom == undefined ||
    scope.dteto == "" ||
    scope.dteto == undefined
  ) {
    scope.requiredPrompt = "Please fill up required fields.";
    Toast.fire({
      title: "Please fill up required fields",
      icon: "warning",
    });
  } else {
    onInit(1);
    showModal.value = false;
  }
};

const onViewReport = (p) => {
  $state.go("receive-preview", {
    transid: p,
    rpttype: "receive",
  });
};
const printPage = () => {
  window.print();
};

onMounted(() => {});
</script>

<style scoped>
#web-view {
  overflow-x: auto;
}

@media screen and (max-width: 768px), print {
  #mobile-view,
  #filter-button {
    display: none;
  }

  #web-view {
    display: block;
    width: 100%;
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
</style>
