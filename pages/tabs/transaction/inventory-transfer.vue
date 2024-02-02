<template>
  <IonPage>
    <ion-header>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-title>{{ scope.titleform }}</ion-card-title>

        <div class="p-4 h-[90vh] overflow-y-auto">
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="default-search"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Location <span class="text-red-500">*</span></label
              >

              <select
                v-model="setup.source"
                @change="onChangeLocSource(scope.locationOptions)"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option v-for="t in scope.locationOptions" :value="t.value">
                  {{ t.text }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="de"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Item Description <span class="text-red-500">*</span></label
              >
              <div class="flex">
                <input
                  type="search"
                  id="de"
                  v-model="setup.itemdesc"
                  readonly
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos..."
                  required
                />
                <button
                  type="submit"
                  @click="onSearchItem"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>
            <div>
              <label
                for="visitors"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Quantity <span class="text-red-500">*</span></label
              >
              <input
                type="number"
                id="visitors"
                v-model="setup.quantity"
                @change="onChangeQty"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
              <small>Available: {{ scope.qtyAvailable }}</small>
            </div>
            <div>
              <label
                for="reference1"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Reference No. <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                id="reference1"
                v-model="setup.referenceno"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flowbite"
                required
              />
            </div>
            <div>
              <label
                for="reference2"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Document No <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                id="reference2"
                v-model="setup.documentno"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flowbite"
                required
              />
            </div>
            <div>
              <label
                for="default-search"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Transfer To <span class="text-red-500">*</span></label
              >

              <select
                v-model="setup.destination"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option v-for="t in scope.storageOptions" :value="t.value">
                  {{ t.text }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="remarks"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Remarks
              </label>
              <textarea
                id="renarks"
                rows="4"
                v-model="setup.remarks"
                class="max-w-md block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your remarks here..."
              ></textarea>
            </div>
          </div>

          <div class="mt-3 flex justify-end">
            <button
              type="submit"
              @click="onSave()"
              class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Save
            </button>
          </div>
        </div>

        <!-- Main modal -->
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
                  Choose Pallets
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
              <div class="p-6 space-y-6 overflow-y-auto">
                <div
                  v-for="itm in scope.itemlist"
                  :key="itm.PalletCode"
                  @click="onItemSelect(itm)"
                  class="relative w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3"
                >
                  <div class="flex items-center">
                    <div id="default-checkbox">
                      <div>
                        <label for="temp"
                          >Pallet Code: {{ itm.PalletCode }}</label
                        >
                      </div>
                      <div>
                        <label for="temp"
                          >Description: {{ itm.PalletDescription }}</label
                        >
                      </div>
                      <div>
                        <label for="temp">UOM: {{ itm.UnitOfMeasure }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal footer -->
              <div
                class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
              >
                <button
                  @click="hideModal()"
                  type="button"
                  class="text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </ion-card>
    </ion-content>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";
import Swal from "sweetalert2";

const sitecode = JSON.parse(localStorage.getItem("_102")).sitecode;
const userFullname = JSON.parse(localStorage.getItem("_214")).fullname;

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
        Token: JSON.parse(localStorage.getItem("_214")).token,
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
        Token: JSON.parse(localStorage.getItem("_214")).token,
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
          Token: JSON.parse(localStorage.getItem("_214")).token,
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
    text: "You won't be able to revert this!",
    icon: "warning",
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
        const response = await serviceApi().post(
          "pallet/post-transaction-ledger/" + setup,
          {
            headers: {
              Token: JSON.parse(localStorage.getItem("_214")).token,
              "Content-Type": "application/json", // Specify the content type
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
        } else {
          scope.isError = false;
          scope.isSuccess = false;

          Toast.fire({
            title: "error",
            text: response.errorMessage,
            icon: "error",
          });
        }
      } catch (error) {
        Toast.fire({
          title: "error",
          text: error.message,
          icon: "error",
        });
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
