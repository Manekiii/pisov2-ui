<template>
  <IonPage>
    <ion-header>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div>

      <div>
        <div class="border-2 items-center justify-center flex p-2">
          <label
            for="title"
            class="font-semibold text-3xl block mb-2 text-gray-900 dark:text-white"
          >
            Receipt Batch Posting
          </label>
        </div>
        <div class="mt-4 mb-4 flex justify-end">
          <button
            v-show="scope.canAdd"
            @click="addNew"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            New
          </button>
        </div>

        <div
          class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[75vh]"
        >
          <div
            v-for="posting in scope.transHeaders"
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3"
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
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
              </button>
              <button
                v-show="scope.canDelete && posting.transcode !== 'IN03'"
                @click="onDelete(posting.transhdrId)"
                class="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Delete
              </button>
              <button
                @click="onPost(posting.transhdrId)"
                class="text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Post
              </button>
            </div>
          </div>
        </div>

        <!-- Call Modal on Button click -->
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

const scope = reactive({});

scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.itemMasterList = [];
scope.trans = {};
scope.trans.invty_transdtl = [];
scope.menuId = "636808269730236079";

const ionRouter = useIonRouter();

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

async function getTransHeaders() {
  try {
    handleLoading();
    scope.currentPage = 1;
    const response = await serviceApi().get(
      `pallet/get-all-transaction-batch/?warehouseId=${
        JSON.parse(localStorage.getItem("_102")).sitecode
      }&transtype=I`,
      {
        headers: {
          Token: JSON.parse(localStorage.getItem("_214")).token,
        },
      }
    );

    scope.transHeaders = response.data.data;
    scope.total_count = response.data.total_count;
    handleLoading();
  } catch (error) {
    console.error("Error:", error.message);
    handleLoading();
    // HttpErrorService.getStatus(error.response.status, error.response.data);
    // $rootScope.ShowPrompt(
    //   "#modal-panel-prompt-error",
    //   "onInit: " + JSON.stringify(error.message)
    // );
  }
}

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

const addNew = () => {
  ionRouter.replace("/tabs/transaction/receipt-batch");
};

const onEdit = (p) => {
  setCookie("transid", p);
  ionRouter.replace("/tabs/transaction/receipt-batch");
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
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
    }
  });
};

const onPost = async (transID) => {
  try {
    const response = await serviceApi().get(
      "pallet/posted-transction/" + transID,
      {
        headers: {
          Token: JSON.parse(localStorage.getItem("_214")).token,
        },
      }
    );

    if (response.status === 200) {
      Toast.fire({
        title: "Success",
        text: "Receipt transaction: " + transID + " posted complete.",
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
  onInitMenu();
  getTransHeaders();
});
</script>
