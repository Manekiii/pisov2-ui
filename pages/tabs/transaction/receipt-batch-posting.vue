<template>
  <IonPage>
    <ion-content> </ion-content>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";

const scope = reactive({});

scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.itemMasterList = [];
scope.trans = {};
scope.trans.invty_transdtl = [];
scope.menuId = "636808269730236079";

async function getTransHeaders() {
  try {
    scope.currentPage = 1;
    const response = await serviceApi().get(
      `pallet/get-all-transaction-batch/?warehouseId=${sitecode}&transtype=I`
    );
    scope.transHeaders = response.data;
    scope.total_count = response.total_count;
  } catch (error) {
    console.error("Error:", error.message);
   // HttpErrorService.getStatus(error.response.status, error.response.data);
    // $rootScope.ShowPrompt(
    //   "#modal-panel-prompt-error",
    //   "onInit: " + JSON.stringify(error.message)
    // );
  }
}

onMounted(() => {
  getTransHeaders();
  onInitMenu(scope.menuId);
});
</script>
