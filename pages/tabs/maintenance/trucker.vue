<template>
  <IonPage>
    <ion-header>
      <ion-toolbar>
        <ion-title>Header</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div> -->
      <div>
        <div class="border-2 items-center justify-center flex p-2">
          <label
            for="title"
            class="font-semibold text-3xl block mb-2 text-gray-900 dark:text-white"
          >
            Trucker Maintenance
          </label>
        </div>

        <div class="p-2">
          <div class="items-stretch">
            <!-- <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >Search</label
            > -->
            <div class="relative">
              <div
                class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                v-model="itemSearch"
                @input="onSearch(itemSearch)"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search ID"
                required
              />
            </div>
          </div>
          <div class="flex justify-end pt-2">
            <button
              @click="onOpenModal()"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              New
            </button>
          </div>
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
                <th scope="col" class="px-6 py-3">Action</th>
                <th scope="col" class="px-6 py-3">Id</th>
                <th scope="col" class="px-6 py-3">Trucker</th>
                <th scope="col" class="px-6 py-3">Contact Person</th>
                <th scope="col" class="px-6 py-3">Mobile #</th>
                <th scope="col" class="px-6 py-3">Tel #</th>
                <th scope="col" class="px-6 py-3">Email</th>
                <th scope="col" class="px-6 py-3">Address</th>
                <th scope="col" class="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                v-for="x in filteredTrucker"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div>
                    <button
                      class="bg-blue-500 rounded-lg p-1 mr-3"
                      @click="onEdit(x)"
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
                      class="bg-red-500 rounded-lg p-1"
                      @click="onDelete(x)"
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
                  </div>
                </th>
                <td class="px-6 py-4">{{ x.fleetownerId }}</td>
                <td class="px-6 py-4">{{ x.ownername }}</td>
                <td class="px-6 py-4">{{ x.contactperson }}</td>
                <td class="px-6 py-4">{{ x.celphoneno }}</td>
                <td class="px-6 py-4">{{ x.telephoneno }}</td>
                <td class="px-6 py-4">{{ x.emailaddy }}</td>
                <td class="px-6 py-4">{{ x.address }}</td>
                <td class="px-6 py-4">
                  {{ x.status === "A" ? "Active" : "Inactive" }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="mt-4 flex justify-end">
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
          </div>
        </div>
        <!-- MOBILE -->
        <div
          class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[68vh]"
        >
          <div
            v-for="x in filteredTrucker"
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3"
          >
            <div>
              <label for="transactionNumber">ID: {{ x.fleetownerId }}</label>
            </div>
            <div>
              <label for="orderNumber">Trucker: {{ x.ownername }}</label>
            </div>
            <div>
              <label for="transactionNumber"
                >Contact Person: {{ x.contactperson }}</label
              >
            </div>
            <div>
              <label for="orderNumber">Mobile#: {{ x.celphoneno }}</label>
            </div>

            <div>
              <label for="transactionNumber">Tel#: {{ x.telephoneno }}</label>
            </div>
            <div>
              <label for="orderNumber">Email: {{ x.emailadd }}</label>
            </div>
            <div>
              <label for="deliveryDate">Address: {{ x.address }}</label>
            </div>
            <div>
              <label for="deliveryDate"
                >Status: {{ x.status === "A" ? "Active" : "Inactive" }}</label
              >
            </div>
            <div class="bg-black h-px"></div>
            <div>
              <label for="modifiedDate">Modified Date: </label>
            </div>

            <div class="flex items-center justify-end">
              <button
                @click="onEdit(x)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
              </button>
              <button
                @click="onDelete(x)"
                class="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

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
              Trucker Setup
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
            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Trucker Code <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  v-model="scope.form.fleetownerId"
                  :disabled="scope.mode === 1"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Trucker Name <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  v-model="scope.form.ownername"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Contact Person</label
                >
                <input
                  type="text"
                  v-model="scope.form.contactperson"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Description"
                  required
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Mobile#</label
                >
                <input
                  type="text"
                  v-model="scope.form.celphoneno"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Tel#</label
                >
                <input
                  type="text"
                  v-model="scope.form.telephoneno"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Email Address</label
                >
                <input
                  type="text"
                  v-model="scope.form.emailadd"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Address</label
                >
                <input
                  type="text"
                  v-model="scope.form.address"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Remarks</label
                >
                <input
                  type="text"
                  v-model="scope.form.remarks"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div class="flex items-start mb-6">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    :value="scope.form.status"
                    v-model="scope.form.status"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  for="remember"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >IsActive
                </label>
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div
            class="flex justify-end items-center p-2 space-x-2 border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              @click="hideModal()"
              type="button"
              class="text-white bg-gray-400 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Close
            </button>
            <button
              @click="onSave()"
              type="button"
              class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Save
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
              Trucker Setup
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
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";
import { format } from "date-fns";
import Swal from "sweetalert2";

const scope = reactive({});
scope.setup = {};
scope.itemsPerPage = 20;
scope.currentPage = 0;
var sitecode = JSON.parse(localStorage.getItem("_102")).sitecode;
var userFullname = JSON.parse(localStorage.getItem("_214")).fullname;
const filteredTrucker = ref();
const showModal = ref(false);
const viewWarehouse = ref(false);
const itemSearch = ref();

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

const hideViewWarehouse = () => {
  viewWarehouse.value = false;
};

const onInit = async () => {
  handleLoading();
  scope.appData = [];

  const response = await serviceApi().get(
    "wfms/get-fleet-owner-list?param=&brancode=" +
      sitecode +
      "&appname=PISO&tk=100&pg=1",
    {
      headers: {
        Token: JSON.parse(localStorage.getItem("_214")).token,
      },
    }
  );

  if (response.status === 200) {
    scope.appData = response.data.fleetowners;
    filteredTrucker.value = scope.appData;
    handleLoading();
  }
};

const onEdit = (val) => {
  scope.mode = 1; //edit mode
  scope.form = val;
  scope.form.status = val.status == "A" ? true : false;
  showModal.value = true;
};

const onOpenModal = () => {
  scope.mode = 0;
  scope.form = {};
  showModal.value = true;
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
    confirmButtonText: "Yes",
    heightAuto: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        scope.form.ownertype = "TRUCKER";
        scope.form.created_by = userFullname;
        scope.form.status = scope.form.status == true ? "A" : "I";
        scope.form.branch = sitecode;
        scope.form.appname = "PISO";
        if (scope.mode === 1) {
          const response = await serviceApi().put(
            "wfms/edit-fleet-owner",
            scope.form,
            {
              headers: {
                Token: JSON.parse(localStorage.getItem("_214")).token,
                "Content-Type": "application/json", // Specify the content type
              },
            }
          );
          if (response.status === 200) {
            Toast.fire({
              title: "Success",
              text: "Save Complete.",
              icon: "success",
            });
            showModal.value = false;
            await onInit();
          } else {
            Toast.fire({
              title: "Error",
              text: response.error,
              icon: "error",
            });
            showModal.value = false;
          }
        } else {
          if (scope.form.fleetownerId) {
            if (scope.form.ownername) {
              const response = await serviceApi().post(
                "wfms/add-fleet-owner",
                scope.form,
                {
                  headers: {
                    Token: JSON.parse(localStorage.getItem("_214")).token,
                    "Content-Type": "application/json", // Specify the content type
                  },
                }
              );

              if (response.status === 200) {
                Toast.fire({
                  title: "Success",
                  text: "Save Complete.",
                  icon: "success",
                });
                showModal.value = false;
                await onInit();
              }
            } else {
              Toast.fire({
                title: "Error",
                text: "Trucker Name is Required",
                icon: "warning",
              });
            }
          } else {
            Toast.fire({
              title: "Error",
              text: "Trucker Code is Required",
              icon: "warning",
            });
          }
        }
      } catch (error) {
        Toast.fire({
          title: "Error",
          text: error,
          icon: "error",
        });
      }
    }
  });
};

const onDelete = (val) => {
  scope.selected = val;
  Swal.fire({
    title: `Are you sure you want to delete Trucker <strong> ${scope.selected.ownername}</strong>?`,
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
    heightAuto: false,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        var fleetowner = {
          fleetownerId: scope.selected.fleetownerId,
          branch: sitecode,
          appname: "PISO",
        };
        const response = await serviceApi().delete(
          "wfms/remove-fleet-owner?fleetownerId=" +
            scope.selected.fleetownerId +
            "&branch=" +
            sitecode,
          {
            headers: {
              Token: JSON.parse(localStorage.getItem("_214")).token,
            },
          }
        );

        if (response.status === 200) {
          Toast.fire({
            title: "Success",
            text: "Delete Complete.",
            icon: "success",
          });
          await onInit();
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

const onSearch = (search) => {
  if (search !== null) {
    filteredTrucker.value = scope.appData.filter((item) =>
      item.fleetownerId.toLowerCase().includes(itemSearch.value.toLowerCase())
    );
  } else {
    filteredTrucker.value = scope.appData;
  }
};

const onDeleteConfirn = async () => {
  //scope.form.branch = sitecode;
  //scope.form.appname = 'PISO';
  //scope.form.fleetownerId = scope.selected.fleetownerId;
};

function onValidation() {
  var hasError = false;
  const name = ref();
  if (scope.form.fleetownerId === "" || scope.form.fleetownerId === undefined) {
    hasError = true;
    name.value = "Trucker Code";
  } else if (
    scope.form.ownername === "" ||
    scope.form.ownername === undefined
  ) {
    hasError = true;
    name.value = "Trucker Name";
  }

  if (hasError) {
    Toast.fire({
      title: `${name.value} is required!`,
      icon: "warning",
    });
  }

  return hasError;
}

onMounted(() => {
  onInit(1);
});
</script>
