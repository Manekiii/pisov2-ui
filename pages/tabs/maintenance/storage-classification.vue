<template>
  <IonPage>
    <ion-header>
      <ion-toolbar>
        <ion-title>Header</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div>
        <div class="border-2 items-center justify-center flex">
          <label
            for="title"
            class="font-semibold text-3xl block mb-2 text-gray-900 dark:text-white"
          >
            Location Master
          </label>
        </div>
        <div class="mt-4 mb-4 flex justify-end">
          <button
            v-show="scope.canAdd"
            @click="onNewLocation()"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            New
          </button>
        </div>

        <div
          class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[75vh]"
        >
          <div
            v-for="pallet in scope.locationlist"
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3"
          >
            <div>
              <label for="transactionNumber"
                >Storage ID: {{ pallet.Location }}</label
              >
            </div>
            <div>
              <label for="orderNumber"
                >Description: {{ pallet.LocationDescription }}</label
              >
            </div>

            <div>
              <label for="createdBy">Created By: {{ pallet.CreatedBy }}</label>
            </div>
            <div>
              <label for="deliveryDate"
                >Created Date:
                {{
                  format(new Date(pallet.CreateDate), "yyyy-MM-dd hh:mm:ss")
                }}</label
              >
            </div>
            <div class="bg-black h-px"></div>
            <div>
              <label for="modifiedDate">Modified Date: </label>
            </div>

            <div class="flex items-center justify-end">
              <button
                v-show="scope.canEdit"
                @click="onEditLocation(pallet)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
              </button>
              <button
                v-show="scope.canDelete"
                @click="onDelete(pallet)"
                class="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main modal Add/Edit-->
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
                Location Master
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
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    for="storageid"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Storage ID</label
                  >
                  <input
                    type="text"
                    id="storageid"
                    v-model="setup.locationId"
                    :disabled="scope.isEdit"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Storage Id"
                    required
                  />
                  <button
                    type="submit"
                    @click="onViewWarehouse()"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    View Warehouse
                  </button>
                </div>
                <div>
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >LocationDescription</label
                  >
                  <input
                    type="text"
                    id="description"
                    v-model="setup.locationdesc"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Description"
                    required
                  />
                </div>
              </div>
            </div>
            <!-- Modal footer -->
            <div
              class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
              <button
                @click="onSaveLocation()"
                type="button"
                class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save
              </button>
              <button
                @click="hideModal()"
                type="button"
                class="text-white bg-gray-400 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main modal Warehouse-->
      <div
        v-if="viewWarehouse"
         
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
                Location Master
              </h3>
              <button
                @click="hideViewWarehouse()"
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
            <div class="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
              <div
                v-for="warehouse in scope.warehouseList"
                :key="warehouse.brancode"
                @click="onSelectWarehouse(warehouse)"
                class="relative w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3"
              >
                <div class="flex items-center">
                  <div id="default-checkbox">
                    <div>
                      <label for="temp">Code: {{ warehouse.brancode }}</label>
                    </div>
                    <div>
                      <label for="temp"
                        >Warehouse: {{ warehouse.branname }}</label
                      >
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
                @click="hideViewWarehouse()"
                type="button"
                class="text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";
import Swal from "sweetalert2";
import { format } from "date-fns";

const scope = reactive({});
const setup = reactive({});
const sitecode = JSON.parse(localStorage.getItem("_102")).sitecode;
const userFullname = JSON.parse(localStorage.getItem("_214")).fullname;
const showModal = ref(false);
const viewWarehouse = ref(false);
scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.menuId = "location";

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

const hideViewWarehouse = () => {
  viewWarehouse.value = false;
};

const onDelete = (val) => {
  Swal.fire({
    title: `Want to remove <strong> ${val.LocationDescription}</strong>?`,
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
    heightAuto: false,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        scope.menuid = val.Location;
        var id = {
          locationId: scope.menuid,
        };
        const response = await serviceApi().post(
          coreapi + "pallet/remove-pallet-location",
          id,
          {
            headers: {
              Token: JSON.parse(localStorage.getItem("_214")).token,
            },
          }
        );
        if (response.status === 200) {
          scope.isError2 = false;
          scope.isSuccess2 = true;
          scope.successMessage2 = response.errorMessage;

          Toast.fire({
            title: "Success",
            text: scope.successMessage2,
            icon: "success",
          });

          onInit(scope.currentPage);
        } else {
          scope.isSuccess2 = false;
          scope.isError2 = true;
          scope.errorMessage2 = response.errorMessage;
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

const onEditLocation = (p) => {
  scope.isEdit = true;
  scope.isError = false;
  scope.isSuccess = false;
  scope.configView = 1;
  setup.locationId = p.Location;
  setup.locationdesc = p.LocationDescription;

  showModal.value = true;
};

const onNewLocation = () => {
  Object.assign(setup, "");
  scope.isError = false;
  scope.isSuccess = false;
  scope.isEdit = false;
  scope.configView = 1;
  showModal.value = true;
};

const onViewWarehouse = async () => {
  //Spinnerhere
  const response = await serviceApi().get(
    "user/get-user-sites/?userId=" +
      JSON.parse(localStorage.getItem("_214")).userid +
      "&sysId=17",
    {
      headers: {
        Token: JSON.parse(localStorage.getItem("_214")).token,
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
  setup.locationId = branch.brancode;
  setup.locationdesc = branch.branname;
  viewWarehouse.value = false;
  // scope.onNew();
};

const onSaveLocation = async () => {
  //Spinner Here

  if (
    (setup.locationId === "" || setup.locationdesc === "") &&
    (setup.locationId === undefined || setup.locationdesc === undefined)
  ) {
    scope.isError = true;
    scope.isSuccess = false;
    scope.errorMessage = "Location ID & Location Description is Required";
    Toast.fire({
      title: scope.errorMessage,
      icon: "warning",
    });
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
        setup.storageId = "PALLET";
        setup.brancode = sitecode;
        setup.created_by = userFullname;

        const response = await serviceApi().post(
          "pallet/post-pallet-master/",
          setup,
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
          scope.successMessage = "Location Master Save Complete";
          Toast.fire({
            title: "Success",
            text: scope.successMessage,
            icon: "success",
          });
          showModal.value = false;
          onInit(scope.currentPage);
        } else {
          scope.isError = true;
          scope.isSuccess = false;
          scope.errorMessage = response.errorMessage;

          Toast.fire({
            title: scope.errorMessage,
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

const onInit = async (page) => {
  scope.currentPage = page;

  const response = await serviceApi().get(
    "pallet//get-pallet-location/?sitecode=" + sitecode,
    {
      headers: {
        Token: JSON.parse(localStorage.getItem("_214")).token,
      },
    }
  );

  scope.locationlist = response.data;
  scope.total_count = response.data.total_count;

  onInitMenu();
};

const onInitMenu = async () => {
  const userId = JSON.parse(localStorage.getItem("_214")).userid;
  const params = scope.menuId + "," + userId;

  try {
    const response = await serviceApi().get(
      `user/get-user-menu-list/${params}`,
      {
        headers: {
          Token: JSON.parse(localStorage.getItem("_214")).token,
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

onMounted(() => {
  onInit();
});
</script>
