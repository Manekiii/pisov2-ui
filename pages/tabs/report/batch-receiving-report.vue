<template>
  <IonPage>
    <ion-content>
      <!-- <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div> -->
      <div>
        <div class="border-b-2 items-center justify-center flex p-2">
          <label
            for="title"
            class="font-semibold text-3xl block mb-2 text-gray-900 dark:text-white"
          >
          Receiving Batch Report
          </label>
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            @click="showModal = true"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Filter
          </button>
        </div>
        <!-- WEB -->
        <div class="hidden md:block">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <!-- <th scope="col" class="px-6 py-3">Action</th> -->
                <th scope="col" class="px-6 py-3">Trans #</th>
                <th scope="col" class="px-6 py-3">Shipper</th>
                <th scope="col" class="px-6 py-3">Document#</th>
                <th scope="col" class="px-6 py-3">Ref#</th>
                <th scope="col" class="px-6 py-3">Invoice#</th>
                <th scope="col" class="px-6 py-3">Order</th>
                <th scope="col" class="px-6 py-3">Order Date</th>
                <th scope="col" class="px-6 py-3">Ref Date</th>
                <th scope="col" class="px-6 py-3">Delivery Date</th>
                <th scope="col" class="px-6 py-3">Remarks</th>
                <th scope="col" class="px-6 py-3">Total Item</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                v-for="trans in scope.transactionList"
              >
                <td class="px-6 py-4">{{ trans.transhdrId }}</td>
                <td class="px-6 py-4">{{ trans.shippername }}</td>
                <td class="px-6 py-4">{{ trans.documentno }}</td>
                <td class="px-6 py-4">{{ trans.referenceno }}</td>
                <td class="px-6 py-4">{{ trans.invoiceno }}</td>
                <td class="px-6 py-4">{{ trans.orderno }}</td>
                <td class="px-6 py-4">{{ trans.orderdate }}</td>
                <td class="px-6 py-4">{{ trans.referencedate }}</td>
                <td class="px-6 py-4">{{ trans.deliverydate }}</td>
                <td class="px-6 py-4">
                  {{ trans.remarks }}
                </td>
                <td class="px-6 py-4">
                  {{ totalItemServe(trans.invty_transdtl) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- mobile -->
        <div
          class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[75vh]"
        >
          <div
            v-for="trans in scope.transactionList"
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3"
          >
            <div>
              <label for="transactionNumber"
                >Trans #: {{ trans.transhdrId }}</label
              >
            </div>
            <div>
              <label for="orderNumber">Shipper: {{ trans.shippername }}</label>
            </div>
            <div>
              <label for="transactionNumber"
                >Document#: {{ trans.documentno }}</label
              >
            </div>
            <div>
              <label for="orderNumber">Ref#: {{ trans.referenceno }}</label>
            </div>

            <div>
              <label for="transactionNumber"
                >Invoice#: {{ trans.invoiceno }}</label
              >
            </div>
            <div>
              <label for="orderNumber"> Order: {{ trans.orderno }}</label>
            </div>
            <div>
              <label for="orderNumber">
                Order Date: {{ trans.orderdate }}</label
              >
            </div>
            <div>
              <label for="orderNumber">
                Ref Date: {{ trans.referencedate }}</label
              >
            </div>
            <div>
              <label for="orderNumber">
                Delivery Date: {{ trans.deliverydate }}</label
              >
            </div>
            <div>
              <label for="orderNumber"> Remarks: {{ trans.remarks }}</label>
            </div>
            <div>
              <label for="orderNumber">
                Total Item: {{ totalItemServe(trans.invty_transdtl) }}</label
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
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Filter
            </h3>
            <button
              @click="hideModal()"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Data From</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                  <input
                    name="start"
                    type="date"
                    v-model="scope.dtefrom"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date start"
                  />
                </div>
              </div>
              <div>
                
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Data To</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                  <input
                    name="end"
                    type="date"
                    v-model="scope.dteto"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date end"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div
            class="flex justify-end items-center p-2 space-x-2 border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              @click="onPreview()"
              type="button"
              class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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

var sitecode = JSON.parse(
  localStorage.getItem("_102")
).sitecode; /*set sidecode*/
const showModal = ref(true);
const scope = reactive({});
scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.dtefrom = new Date(format(new Date(), "mm/dd/yyyy"));
scope.dteto = new Date(format(new Date(), "mm/dd/yyyy"));

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

const hideModal = () => {
  showModal.value = false;
};

/*initialize first load*/
const onInit = async (ipage) => {
  scope.currentPage = ipage;

  const response = await serviceApi().get(
    "pallet/get-transaction-header/?sitecode=" +
      sitecode +
      "&transtype=I&dtefrom=" +
      scope.dtefrom +
      "&dteto=" +
      scope.dteto,
    {
      headers: {
        Token: JSON.parse(localStorage.getItem("_214")).token,
      },
    }
  );

  if (response.status === 200) {
    scope.transactionList = response.data;
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

onMounted(() => {});
</script>
