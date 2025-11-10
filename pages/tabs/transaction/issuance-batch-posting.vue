<template>
  <IonPage>
    <ion-content>
      <div class="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
        <!-- Header Section -->
        <div class="bg-white shadow-lg border-b border-slate-200">
          <div class="container mx-auto px-4 py-6">
            <h1
              class="text-4xl font-bold text-slate-800 text-center tracking-tight"
            >
              Issuance Batch Posting
            </h1>
          </div>
        </div>

        <!-- Controls Section -->
        <div class="container mx-auto px-4 py-6">
          <div
            class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6"
          >
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
            >
              <!-- Search Input -->
              <div class="relative flex-1 max-w-md">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-slate-400"
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
                  class="block w-full pl-10 pr-4 py-3 text-sm text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-slate-400"
                  placeholder="Search issuances..."
                  required
                  v-model="searchQuery"
                  @change=""
                />
              </div>

              <!-- New Button -->
              <button
                v-show="scope.canAdd"
                @click="addNew"
                class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 focus:ring-4 focus:ring-orange-300 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                New Issuance
              </button>
            </div>
          </div>

          <!-- Desktop Table -->
          <div
            class="hidden lg:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead
                  class="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200"
                >
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Transaction#
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Doc#
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Order#
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Ref#
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Pallet Desc
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Delivery Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Created By
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Created Date
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  <tr
                    v-if="filteredLocations"
                    v-for="(posting, index) in filteredLocations"
                    :key="posting.transhdrId"
                    class="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-2">
                        <!-- Edit Button -->
                        <div class="relative group" v-show="scope.canEdit">
                          <button
                            @click="onEdit(posting.transhdrId)"
                            class="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                          <div
                            class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
                          >
                            Edit
                          </div>
                        </div>

                        <!-- Delete Button -->
                        <div
                          class="relative group"
                          v-show="
                            scope.canDelete && posting.transcode !== 'IN03'
                          "
                        >
                          <button
                            @click="onDelete(posting.transhdrId)"
                            class="p-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                          <div
                            class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
                          >
                            Delete
                          </div>
                        </div>

                        <!-- Post Button -->
                        <div class="relative group">
                          <button
                            @click="onPost(posting.transhdrId)"
                            class="p-2 text-white bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                              />
                            </svg>
                          </button>
                          <div
                            class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
                          >
                            Post
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-medium text-slate-900">
                      {{ posting.transhdrId }}
                    </td>
                    <td class="px-6 py-4 text-slate-700">
                      {{ posting.documentno }}
                    </td>
                    <td class="px-6 py-4 text-slate-700">
                      {{ posting.orderno }}
                    </td>
                    <td class="px-6 py-4 text-slate-700">
                      {{ posting.referenceno }}
                    </td>
                    <td class="px-6 py-4">
                      <div class="space-y-1">
                        <div
                          v-for="i in posting.transactionbatchdetails"
                          :key="i.id"
                          class="text-sm text-slate-700 bg-slate-50 px-2 py-1 rounded"
                        >
                          {{ i.itemdesc }}
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="space-y-1">
                        <div
                          v-for="i in posting.transactionbatchdetails"
                          :key="i.id"
                          class="text-sm font-medium text-slate-700 bg-orange-50 px-2 py-1 rounded text-center"
                        >
                          {{ i.qtyserved }}
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-slate-700">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                      >
                        {{
                          format(new Date(posting.deliverydate), "yyyy-MM-dd")
                        }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-slate-700">
                      {{ posting.created_by }}
                    </td>
                    <td class="px-6 py-4 text-slate-700">
                      <span class="text-xs">
                        {{
                          format(
                            new Date(posting.create_date),
                            "yyyy-MM-dd hh:mm:ss"
                          )
                        }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Empty State -->
            <div
              v-if="!filteredLocations || filteredLocations.length === 0"
              class="text-center py-12"
            >
              <svg
                class="mx-auto h-12 w-12 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3a4 4 0 118 0v4m-4 6v6m-6 0h12a2 2 0 002-2V9a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-slate-900">
                No issuances found
              </h3>
              <p class="mt-1 text-sm text-slate-500">
                Get started by creating a new issuance.
              </p>
            </div>
          </div>

          <!-- Mobile Cards -->
          <div class="lg:hidden space-y-4">
            <div
              v-if="filteredLocations"
              v-for="posting in filteredLocations"
              :key="posting.transhdrId"
              class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <!-- Header -->
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">
                    Transaction #{{ posting.transhdrId }}
                  </h3>
                  <p class="text-sm text-slate-600">
                    Order #{{ posting.orderno }}
                  </p>
                </div>
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                >
                  Issuance
                </span>
              </div>

              <!-- Content -->
              <div class="space-y-3">
                <div>
                  <label class="text-sm font-medium text-slate-700"
                    >Document #:</label
                  >
                  <span class="ml-2 text-sm text-slate-900">{{
                    posting.documentno
                  }}</span>
                </div>

                <div>
                  <label class="text-sm font-medium text-slate-700"
                    >Reference #:</label
                  >
                  <span class="ml-2 text-sm text-slate-900">{{
                    posting.referenceno
                  }}</span>
                </div>

                <div>
                  <label class="text-sm font-medium text-slate-700 block mb-2"
                    >Pallet Details:</label
                  >
                  <div class="space-y-2">
                    <div
                      v-for="i in posting.transactionbatchdetails"
                      :key="i.id"
                      class="bg-slate-50 rounded-lg p-3 border border-slate-200"
                    >
                      <div class="font-medium text-slate-900">
                        {{ i.itemdesc }}
                      </div>
                      <div class="text-sm text-slate-600">
                        <span class="font-medium">Quantity:</span>
                        {{ i.qtyserved }}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="text-sm font-medium text-slate-700"
                    >Delivery Date:</label
                  >
                  <span
                    class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                  >
                    {{ format(new Date(posting.deliverydate), "yyyy-MM-dd") }}
                  </span>
                </div>

                <div class="pt-3 border-t border-slate-200">
                  <div class="text-xs text-slate-500">
                    Created by {{ posting.created_by }} on
                    {{
                      format(
                        new Date(posting.create_date),
                        "yyyy-MM-dd hh:mm:ss"
                      )
                    }}
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div
                class="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-slate-200"
              >
                <button
                  v-show="scope.canEdit"
                  @click="onEdit(posting.transhdrId)"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm"
                >
                  <svg
                    class="w-4 h-4 mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                  Edit
                </button>
                <button
                  v-show="scope.canDelete && posting.transcode !== 'IN03'"
                  @click="onDelete(posting.transhdrId)"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 shadow-sm"
                >
                  <svg
                    class="w-4 h-4 mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                  Delete
                </button>
                <button
                  @click="onPost(posting.transhdrId)"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 shadow-sm"
                >
                  <svg
                    class="w-4 h-4 mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                  Post
                </button>
              </div>
            </div>

            <!-- Mobile Empty State -->
            <div
              v-if="!filteredLocations || filteredLocations.length === 0"
              class="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center"
            >
              <svg
                class="mx-auto h-12 w-12 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3a4 4 0 118 0v4m-4 6v6m-6 0h12a2 2 0 002-2V9a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 class="mt-4 text-lg font-medium text-slate-900">
                No issuances found
              </h3>
              <p class="mt-2 text-sm text-slate-500">
                Get started by creating a new issuance.
              </p>
            </div>
          </div>
        </div>

        <!-- Modal Placeholder -->
        <!-- <div class="items-center">
          <ReceiptBatchPostingModal
            :data="postingData.transhdrId"
            v-if="showPreviewModal"
            @close-modal="showPreviewModal = false"
            @data-updated="getReceiptBatchPosting()"
          />
        </div> -->
      </div>
    </ion-content>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { startLoading, stopLoading } from "~/stores/globalvariable";

const scope = reactive({});

scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.itemMasterList = [];
scope.trans = {};
scope.trans.invty_transdtl = [];
scope.menuId = "636808272376317312";

const ionRouter = useIonRouter();

const searchQuery = ref("");
const filteredLocations = computed(() => {
  if (!searchQuery.value.trim()) return scope.transHeaders;
  {
    return scope.transHeaders.filter((item) => {
      return (
        item.referenceno
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        item.created_by.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
  }
});

const tooltips = ref([]);

// Initialize tooltips array with states for each item
const initializeTooltips = (length) => {
  tooltips.value = Array.from({ length }, () => ({
    showEdit: false,
    showDelete: false,
    showPost: false,
  }));
};

// Initialize tooltips when data is loaded
watch(filteredLocations, (newVal) => {
  if (newVal) {
    initializeTooltips(newVal.length);
  }
});

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

const init = async () => {
  startLoading({
    loadingText: "Please wait...",
    subText: "Fetching issuance posting...",
    spinnerColor: "orange",
    showEllipsis: true,
  });
  await onInitMenu();
  await getTransHeaders();
  stopLoading();
};

async function getTransHeaders() {
  try {
    scope.currentPage = 1;
    const response = await serviceApi().get(
      `pallet/get-all-transaction-batch/?warehouseId=${
        JSON.parse(localStorage.getItem("_102")).sitecode
      }&transtype=O`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );

    scope.transHeaders = response.data.data;
    scope.total_count = response.data.total_count;
  } catch (error) {
    console.error("Error:", error.message);
    Toast.fire({
      title: "Error",
      text: error.message,
      icon: "error",
    });
  }
}

const onInitMenu = async () => {
  const userId = JSON.parse(decrypt(localStorage.getItem("_214"))).userid;
  const params = scope.menuId + "," + userId;

  try {
    const response = await serviceApi().get(
      `user/get-user-menu-list/${params}`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
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

const addNew = () => {
  ionRouter.replace("/tabs/transaction/issuance-batch");
};

const onEdit = (p) => {
  setCookie("transid", p);
  ionRouter.replace("/tabs/transaction/issuance-batch");
};

const onDelete = (p) => {
  scope.isError2 = false;
  scope.isSuccess2 = false;
  // $("#itemname").text("Transaction ID: " + p);
  // $("#itemcode").val(p);

  Swal.fire({
    title: `Want to remove <strong>Transaction ID: ${p}</strong>?`,
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
    heightAuto: false,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        const response = await serviceApi().delete(
          "pallet/delete-pallet-trans/" + p,
          {
            headers: {
              Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
            },
          }
        );

        if (response.status === 200) {
          Toast.fire({
            title: "Success",
            text: "Transaction ID: " + p + " has been removed",
            icon: "success",
          });
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

const onPost = async (transID) => {
  try {
    const response = await serviceApi().get(
      "pallet/posted-transction/" + transID,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );

    if (response.status === 200) {
      Toast.fire({
        title: "Success",
        text: "Issuance Transaction: " + transID + " posted complete.",
        icon: "success",
      });
      await getTransHeaders();
    }
  } catch (error) {
    Toast.fire({
      title: "Error",
      text: error.message,
      icon: "error",
    });
  }
};

onMounted(() => {
  init();
});
</script>
