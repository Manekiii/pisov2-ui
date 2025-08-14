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
            class="font-semibold text-3xl block mb-2 text-gray-900"
          >
            Inter Plant Transaction List
          </label>
        </div>
        <div
          class="m-4 flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0"
        >
          <div class="relative flex-1">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500"
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
              class="block w-full sm:w-[350px] p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter"
              required
              v-model="searchQuery"
              @change=""
            />
          </div>
          <button
            v-show="scope.canAdd"
            @click="addNew"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            New
          </button>
        </div>

        <!-- WEB -->
        <div class="hidden md:block">
          <table class="w-full text-sm text-left rtl:text-right rounded-lg">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">Action</th>
                <th scope="col" class="px-6 py-3">Transaction#</th>
                <th scope="col" class="px-6 py-3">Doc#</th>
                <th scope="col" class="px-6 py-3">Order#</th>
                <th scope="col" class="px-6 py-3">Ref#</th>
                <th scope="col" class="px-6 py-3">Delivery Date</th>
                <th scope="col" class="px-6 py-3">Created By</th>
                <th scope="col" class="px-6 py-3">Created Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b"
                v-if="filteredLocations"
                v-for="(posting, index) in filteredLocations"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <div>
                    <div class="relative inline-block">
                      <!-- Edit Button and Tooltip -->
                      <button
                        @mouseover="tooltips[index].showEdit = true"
                        @mouseleave="tooltips[index].showEdit = false"
                        class="bg-blue-500 rounded-lg p-1 text-white"
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
                      <div
                        v-if="tooltips[index].showEdit"
                        class="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded shadow-lg"
                        :style="{ left: '50%', transform: 'translateX(-50%)' }"
                      >
                        Edit
                      </div>
                    </div>
                    <!-- Delete Button and Tooltip -->
                    <div class="relative inline-block">
                      <button
                        @mouseover="tooltips[index].showDelete = true"
                        @mouseleave="tooltips[index].showDelete = false"
                        class="bg-red-500 rounded-lg p-1 ml-3 text-white hover:bg-red-800"
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
                      <div
                        v-if="tooltips[index].showDelete"
                        class="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded shadow-lg"
                        :style="{ left: '50%', transform: 'translateX(-50%)' }"
                      >
                        Delete
                      </div>
                    </div>

                    <!-- Post Button and Tooltip -->
                    <div class="relative inline-block ml-3">
                      <button
                        @mouseover="tooltips[index].showPost = true"
                        @mouseleave="tooltips[index].showPost = false"
                        class="bg-green-500 rounded-lg p-1 text-white hover:bg-green-800"
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
                      <div
                        v-if="tooltips[index].showPost"
                        class="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded shadow-lg"
                        :style="{ left: '50%', transform: 'translateX(-50%)' }"
                      >
                        Post
                      </div>
                    </div>
                  </div>
                </th>
                <td class="px-6 py-4">{{ posting.transhdrId }}</td>
                <td class="px-6 py-4">{{ posting.documentno }}</td>
                <td class="px-6 py-4">{{ posting.orderno }}</td>
                <td class="px-6 py-4">{{ posting.referenceno }}</td>
                <!-- <td class="px-6 py-4">
                  <Table>
                    <tr v-for="i in posting.transactionbatchdetails">
                      <td>
                        {{ i.itemdesc }}
                      </td>
                    </tr>
                  </Table>
                </td>
                <td class="px-6 py-4">
                  <Table>
                    <tr v-for="i in posting.transactionbatchdetails">
                      <td>
                        {{ i.qtyserved }}
                      </td>
                    </tr>
                  </Table>
                </td> -->
                <td class="px-6 py-4">
                  {{ format(new Date(posting.deliverydate), "yyyy-MM-dd") }}
                </td>
                <td class="px-6 py-4">
                  {{ posting.created_by }}
                </td>
                <td class="px-6 py-4">
                  {{
                    format(new Date(posting.create_date), "yyyy-MM-dd hh:mm:ss")
                  }}
                </td>
              </tr>

              <tr v-else>
                <div class="flex justify-center items-center">
                  No Issuance found.
                </div>
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

        <!-- Mobile -->
        <div
          class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[75vh]"
        >
          <div
            v-if="filteredLocations"
            v-for="posting in filteredLocations"
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mb-3"
          >
            <div>
              <label for="transactionNumber"
                >Transaction#: {{ posting.transhdrId }}</label
              >
            </div>
            <div>
              <label for="orderNumber">Order#: {{ posting.orderno }}</label>
            </div>
            <div>
              <label for="palletDescription">Pallet Description: </label>
              <div v-for="i in posting.transactionbatchdetails" class="ml-5">
                <label for="palletDesc">{{ i.itemdesc }}</label>
                <div>
                  <label for="quantity">Quantity: {{ i.qtyserved }}</label>
                </div>
              </div>
            </div>
            <div>
              <label for="deliveryDate"
                >Delivery Date:
                {{
                  format(new Date(posting.deliverydate), "yyyy-MM-dd")
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
                @click="onEdit(posting.transhdrId)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Edit
              </button>
              <button
                v-show="scope.canDelete && posting.transcode !== 'IN03'"
                @click="onDelete(posting.transhdrId)"
                class="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Delete
              </button>
              <button
                @click="onPost(posting.transhdrId)"
                class="text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Post
              </button>
            </div>
          </div>

          <div v-else class="flex justify-center items-center">
            No Issuance found.
          </div>
        </div>

        <!-- Call Modal on Button click -->
        <!-- <div class="items-center">`
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

const scope = reactive({});

scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.itemMasterList = [];
scope.trans = {};
scope.trans.invty_transdtl = [];
scope.menuId = "636809470736329205";

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

const handleLoading = async () => {
  document.querySelector("#loadingindicator").classList.toggle("hidden");
};

async function getTransHeaders(ipage) {
  try {
    scope.currentPage = ipage;
    const response = await serviceApi().get(
      `pallet/get-interplant-headers/?warehouseId=${
        JSON.parse(localStorage.getItem("_102")).sitecode
      }&status=O&take=${scope.itemsPerPage}&page=${ipage}`,
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
  ionRouter.replace("/tabs/transaction/interplant-transfer");
};

const onEdit = (p) => {
  setCookie("transid", p);
  ionRouter.replace("/tabs/transaction/interplant-transfer");
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
        text: "Interplant Transaction: " + transID + " posted complete.",
        icon: "success",
      });
      await getTransHeaders(scope.currentPage);
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
  onInitMenu();
  getTransHeaders(1);
});
</script>
