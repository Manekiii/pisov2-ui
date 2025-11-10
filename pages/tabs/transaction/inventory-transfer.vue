<template>
  <IonPage>
    <ion-content class="bg-gray-50">
      <div class="min-h-screen p-4 lg:p-8">
        <!-- Header -->
        <div class="mb-8">
          <h1
            class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
          >
            {{ scope.titleform }}
          </h1>
          <div
            class="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
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
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div class="group space-y-2">
                  <label
                    for="default-search"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                    >Location <span class="text-red-500">*</span></label
                  >

                  <select
                    v-model="setup.source"
                    @change="onChangeLocSource(scope.locationOptions)"
                    class="w-full px-4 py-[18px] bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                  >
                    <option v-for="t in scope.locationOptions" :value="t.value">
                      {{ t.text }}
                    </option>
                  </select>
                </div>
                <div class="group space-y-2">
                  <label
                    for="de"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                    >Item Description <span class="text-red-500">*</span></label
                  >
                  <div class="flex">
                    <input
                      type="search"
                      id="de"
                      v-model="setup.itemdesc"
                      readonly
                      class="w-full rounded-r-none px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                      placeholder=""
                      required
                    />
                    <button
                      type="submit"
                      @click="onSearchItem"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg rounded-l-none text-sm px-4 py-2"
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div class="group space-y-2">
                  <label
                    for="visitors"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                    >Quantity <span class="text-red-500">*</span></label
                  >
                  <input
                    type="number"
                    id="visitors"
                    v-model="setup.quantity"
                    @change="onChangeQty"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                    placeholder=""
                    required
                  />
                  <small>Available: {{ scope.qtyAvailable }}</small>
                </div>
                <div class="group space-y-2">
                  <label
                    for="reference1"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                    >Reference No. <span class="text-red-500">*</span></label
                  >
                  <input
                    type="text"
                    id="reference1"
                    v-model="setup.referenceno"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                    placeholder=""
                    required
                  />
                </div>
                <div class="group space-y-2">
                  <label
                    for="reference2"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                    >Document No <span class="text-red-500">*</span></label
                  >
                  <input
                    type="text"
                    id="reference2"
                    v-model="setup.documentno"
                    class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                    placeholder=""
                    required
                  />
                </div>
                <div class="group space-y-2">
                  <label
                    for="default-search"
                    class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                    >Transfer To <span class="text-red-500">*</span></label
                  >

                  <select
                    v-model="setup.destination"
                    class="w-full px-4 py-[18px] bg-white/70 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg backdrop-blur-sm"
                  >
                    <option v-for="t in scope.storageOptions" :value="t.value">
                      {{ t.text }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="group space-y-2">
                <label
                  for="remarks"
                  class="block text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                >
                  Remarks
                </label>
                <textarea
                  id="renarks"
                  rows="4"
                  v-model="setup.remarks"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300 placeholder-gray-400 resize-none"
                  placeholder="Write your remarks here..."
                ></textarea>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap justify-end gap-4 mt-8">
            <button
              type="submit"
              :disabled="isClick"
              @click="onSave()"
              class="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-200 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {{ isClick ? "Saving..." : "Save" }}
            </button>
          </div>
        </div>

        <!-- Main modal -->
        <div
          v-if="showModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div
            class="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
          >
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow">
              <!-- Modal header -->
              <div class="bg-gradient-to-r from-blue-600 to-blue-600 px-8 py-6">
                <div class="flex items-center justify-between">
                  <h3 class="text-2xl font-bold text-white">Choose Assets</h3>
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
              <!-- Modal body -->
              <div class="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div
                  v-for="itm in scope.itemlist"
                  :key="itm.PalletCode"
                  @click="onItemSelect(itm)"
                  class="group bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg"
                >
                  <div class="flex items-center space-x-4">
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
              <!-- Modal footer -->

              <div class="bg-gray-50 px-8 py-6 flex justify-end space-x-4">
                <button
                  type="button"
                  @click="hideModal()"
                  class="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";
import { isClick } from "~/dashboard/store";
import Swal from "sweetalert2";

const sitecode = JSON.parse(localStorage.getItem("_102")).sitecode;
const userFullname = JSON.parse(decrypt(localStorage.getItem("_214"))).fullname;

const scope = reactive({});
const setup = reactive({});
const sType = "T";
scope.trnscde = 0;
//$rootScope.appClass = "messages-page";

scope.setup = {};
scope.location = [];
scope.storageto = [];

scope.isError = false;
scope.isSuccess = false;
scope.isEdit = false;

const ionRouter = useIonRouter();
const showModal = ref(false);

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

async function onInit() {
  var crudType;
  if (scope.trnscde === 0) {
    scope.iconform = "glyphicons glyphicons-circle_plus";
    scope.titleform = "Inventory Transfer";
    crudType = "New";
  } else {
    scope.iconform = "glyphicon glyphicon-edit";
    crudType = "Update";
    scope.onGetItemUpdate(scope.trnscde);
  }

  switch (sType) {
    case "I":
      scope.menuId = "inbound";
      scope.formtitle = crudType + " Inbound";
      break;
    case "O":
      scope.menuId = "out-bound";
      scope.formtitle = crudType + " Outbound";
      break;
    case "T":
      scope.menuId = "transfer";
      scope.formtitle = crudType + " Transfer";
      break;
  }

  // Function to fetch pallet location data
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

  // Function to fetch inbound location data
  const response = await serviceApi().get(
    "pallet/get-inbound-location/" + sitecode,
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (!response.hasError) {
    scope.sourcelocation = response.data.data;
  } else {
    console.error("Error: " + data.errorMessage);
    // Handle error as needed
  }
}

const onChangeLocSource = (p) => {
  scope.storageto = [];
  scope.storageOptions = [];

  scope.isError = false;
  scope.isSuccess = false;
  if (setup.source !== undefined) {
    for (var i = 0; i < p.length; i++) {
      if (setup.source !== p[i].value) {
        scope.storageOptions.push({ value: p[i].value, text: p[i].text });
      }
    }
  } else {
    scope.storageOptions = p;
  }

  //  scope.storageto = p;

  onClean();
};

const onClean = () => {
  setup.itemdesc = "";
  scope.qtyAvailable = 0;
};

const onSearchItem = async () => {
  var newSourceLoc = setup.source;
  scope.isError = false;
  scope.isSuccess = false;
  if (setup.source === undefined || setup.source === "") {
    // $rootScope.ShowPrompt(
    //   "#modal-panel-prompt-error",
    //   "Please select source storage"
    // );
    Toast.fire({
      title: "Please select source storage",
      icon: "warning",
    });
    return;
  }
  try {
    const response = await serviceApi().get(
      "pallet/get-inbound-item/?location=" +
        newSourceLoc +
        "&sitecode=" +
        sitecode,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );
    if (!response.hasError) {
      scope.itemlist = response.data.data;
      showModal.value = true;
    } else {
      console.log("Error: " + response.data.errorMessage);
    }
  } catch (error) {}

  //$rootScope.openModalForm("#modal-panel-item-master");
};

const onItemSelect = (p) => {
  setup.itemdesc = p.PalletDescription;
  setup.itemid = p.PalletCode;
  scope.qtyAvailable = p.qtyAvailable;
  hideModal();
};

const onChangeQty = () => {
  if (setup.quantity > scope.qtyAvailable) {
    scope.isError = true;
    scope.isSuccess = false;
    Toast.fire({
      title: "The quantity you enter is greater than available quantity",
      icon: "warning",
    });
  } else {
    scope.isError = false;
    scope.isSuccess = false;
  }
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
    confirmButtonText: "Yes, Confirm!",
    heightAuto: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      setup.brancode = sitecode;
      setup.transtype = sType;
      setup.created_by = userFullname;
      setup.transid = scope.trnscde;
      setup.status = "P"; /*un post */

      if (setup.source === undefined || setup.destination === undefined) {
        scope.isError = true;
        scope.isSuccess = false;

        Toast.fire({
          title: "Please select Source & Destination",
          icon: "warning",
        });
        return;
      }

      try {
        isClick.value = true;
        const response = await serviceApi().post(
          "pallet/post-transaction-ledger/",
          new URLSearchParams(setup), // Convert data to URL-encoded format,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded", // Specify the content type
              Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
            },
          }
        );

        if (!response.hasError) {
          scope.isError = false;
          scope.isSuccess = true;
          scope.successMessage = "Transfer Transaction Save Complete ";

          Toast.fire({
            title: "Success",
            text: scope.successMessage,
            icon: "success",
          });

          for (const key in setup) {
            setup[key] = "";
          }
          isClick.value = false;
        } else {
          scope.isError = false;
          scope.isSuccess = false;

          Toast.fire({
            title: "ERROR",
            text: response.errorMessage,
            icon: "error",
          });
          isClick.value = false;
        }
      } catch (error) {
        Toast.fire({
          title: "error",
          text: error.message,
          icon: "error",
        });
        isClick.value = false;
      }
    }
  });
};

function onValidation() {
  var hasError = false;
  if (setup.source === "" || setup.source === undefined) {
    hasError = true;
  }

  if (setup.itemdesc === "" || setup.itemdesc === undefined) {
    hasError = true;
  }

  if (setup.quantity === "" || setup.quantity === undefined) {
    hasError = true;
  }

  if (setup.referenceno === "" || setup.referenceno === undefined) {
    hasError = true;
  }

  if (setup.documentno === "" || setup.documentno === undefined) {
    hasError = true;
  }

  if (hasError) {
    Toast.fire({
      title: "Please fill all required required fields!",
      icon: "warning",
    });
  }

  return hasError;
}
onMounted(() => {
  onInit();
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
