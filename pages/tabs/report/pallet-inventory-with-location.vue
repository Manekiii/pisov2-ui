<template>
  <IonPage>
    <ion-content>
      <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div>
      <div>
        <div class="border-b-2 items-center justify-center flex p-2">
          <label
            for="title"
            class="font-semibold text-3xl block mb-2 text-gray-900 dark:text-white"
          >
            Pallet Inventory with Location
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
                <th scope="col" class="px-6 py-3">Trans ID</th>
                <th scope="col" class="px-6 py-3">Pallet Code</th>
                <th scope="col" class="px-6 py-3">Pallet Description</th>
                <th scope="col" class="px-6 py-3">Loc ID</th>
                <th scope="col" class="px-6 py-3">Location Desc</th>
                <th scope="col" class="px-6 py-3">TType</th>
                <th scope="col" class="px-6 py-3">In</th>
                <th scope="col" class="px-6 py-3">Out</th>
                <th scope="col" class="px-6 py-3">Running Bal</th>
                <th scope="col" class="px-6 py-3">Ref #</th>
                <th scope="col" class="px-6 py-3">Doc #</th>
                <th scope="col" class="px-6 py-3">Specifics</th>
                <th scope="col" class="px-6 py-3">Created Date</th>
                <th scope="col" class="px-6 py-3">Created By</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                v-for="trans in scope.transactionList"
              >
                <!-- <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div>
                    <button
                      class="bg-blue-500 rounded-lg p-1"
                      v-show="scope.canEdit"
                      @click="onEdit(posting.transhdrId)"
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                    <button
                      class="bg-red-500 rounded-lg p-1 ml-3"
                      v-show="scope.canDelete && posting.transcode !== 'IN03'"
                      @click="onDelete(posting.transhdrId)"
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

                    <button
                      class="bg-green-500 rounded-lg p-1 ml-3"
                      @click="onPost(posting.transhdrId)"
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
                          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </th> -->
                <td class="px-6 py-4">{{ trans.transId }}</td>
                <td class="px-6 py-4">{{ trans.itemId }}</td>
                <td class="px-6 py-4">{{ trans.itemdesc }}</td>
                <td class="px-6 py-4">{{ trans.locationId }}</td>
                <td class="px-6 py-4">{{ trans.locationdesc }}</td>
                <td class="px-6 py-4">{{ trans.transtype }}</td>
                <td class="px-6 py-4">{{ trans.In }}</td>
                <td class="px-6 py-4">{{ trans.Out }}</td>
                <td class="px-6 py-4">{{ trans.RunningBalance }}</td>
                <td class="px-6 py-4">
                  {{ trans.referenceno }}
                </td>
                <td class="px-6 py-4">
                  {{ trans.documentno }}
                </td>
                <td class="px-6 py-4">
                  {{ trans.Specifics }}
                </td>
                <td class="px-6 py-4">
                  {{
                    format(new Date(trans.create_date), "MM/dd/yyyy hh:mm:ss a")
                  }}
                </td>
                <td class="px-6 py-4">
                  {{ trans.created_by }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <div class="mt-4 flex justify-end">
            <svg
              class="w-6 h-6 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m15 19-7-7 7-7"
              />
            </svg>
            <label class="mx-2">3 out of 3</label>
            <svg
              class="w-6 h-6 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m9 5 7 7-7 7"
              />
            </svg>
          </div> -->
        </div>

        <!-- mobile -->
        <div
          class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[75vh]"
        >
          <div v-for="trans in filterPallet">
            <div
              class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3"
              v-if="trans.locationId === scope.location"
            >
              <div>
                <label for="transactionNumber"
                  >Trans ID: {{ trans.transId }}</label
                >
              </div>
              <div>
                <label for="orderNumber">Pallet Code: {{ trans.itemId }}</label>
              </div>
              <div>
                <label for="transactionNumber"
                  >Pallet Description: {{ trans.itemdesc }}</label
                >
              </div>
              <div>
                <label for="orderNumber">Loc ID: {{ trans.locationId }}</label>
              </div>

              <div>
                <label for="transactionNumber"
                  >Location Desc: {{ trans.transtype }}</label
                >
              </div>
              <div>
                <label for="orderNumber"> TType: {{ trans.In }}</label>
              </div>

              <div>
                <label for="transactionNumber">In: {{ trans.Out }}</label>
              </div>
              <div>
                <label for="orderNumber">
                  Out: {{ trans.RunningBalance }}</label
                >
              </div>
              <div>
                <label for="orderNumber">
                  Running Bal: {{ trans.referenceno }}</label
                >
              </div>
              <div>
                <label for="orderNumber"> Ref #: {{ trans.documentno }}</label>
              </div>
              <div>
                <label for="orderNumber"> Doc #: {{ trans.Specifics }}</label>
              </div>
              <div>
                <label for="orderNumber">
                  Created Date: {{ trans.create_date }}</label
                >
              </div>
              <div>
                <label for="orderNumber">
                  Created by: {{ trans.created_by }}</label
                >
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
                  >Pallet</label
                >
                <select
                  name="pallet"
                  v-model="scope.itemId"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Location</label
                >
                <select
                  name="location"
                  v-model="scope.location"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          </div>
          <!-- Modal footer -->
          <div
            class="flex justify-end items-center p-2 space-x-2 border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              @click="onInit()"
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

const showModal = ref(false);
const filterPallet = ref();
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
          Token: JSON.parse(localStorage.getItem("_214")).token,
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
          Token: JSON.parse(localStorage.getItem("_214")).token,
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
onMounted(() => {
  preload();
});
</script>
