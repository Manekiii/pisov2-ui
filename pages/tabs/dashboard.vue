<template>
  <IonPage class="p-2">
    <ion-content class="overflow-auto">
      <!-- <div class="panel panel-primary">
          <div class="panel-body">
            <div class="container-fluid animated fadeIn">
              <div class="row">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                  <div class="col-md-3">
                    <div
                      class="panel bg-purple-400 light of-h mb10 p-4 text-white"
                    >
                      <div class="pn pl20 p15">
                        <div class="icon-bg">
                          <i class="glyphicons glyphicons-charts"></i>
                        </div>
                        <div class="text-left"><h2>Yesterday</h2></div>
                      </div>
                      <div>
                        <div class="grid gap-6 grid-cols-2">
                          <div style="border: none">
                            <div>
                              <h2 class="mt15 lh15"><b>IN</b></h2>
                            </div>
                            <h3 class="mt15 lh15">
                              <b>{{
                                scope.dailyCompare?.[0]?.TotalIn ?? "0"
                              }}</b>
                            </h3>
                          </div>
                          <div style="border: none">
                            <div>
                              <h2 class="mt15 lh15"><b>OUT</b></h2>
                            </div>
                            <h3 class="mt15 lh15">
                              <b>{{
                                scope.dailyCompare?.[0]?.TotalOut ?? "0"
                              }}</b>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div
                      class="panel bg-blue-400 light of-h mb10 p-4 text-white"
                    >
                      <div class="text-left"><h2>Today</h2></div>
                      <div>
                        <div class="grid gap-6 grid-cols-2">
                          <div style="border: none">
                            <div>
                              <h2 class="mt15 lh15"><b>IN</b></h2>
                            </div>
                            <h2 class="mt15 lh15">
                              <b>{{
                                scope.dailyCompare?.[1]?.TotalIn ?? "0"
                              }}</b>
                            </h2>
                          </div>
                          <div style="border: none">
                            <div>
                              <h2 class="mt15 lh15"><b>OUT</b></h2>
                            </div>
                            <h2 class="mt15 lh15">
                              <b>{{
                                scope.dailyCompare?.[1]?.TotalOut ?? "0"
                              }}</b>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div
                      class="panel bg-red-400 light of-h mb10 p-4 text-white"
                    >
                      <div class="pn pl20 p15">
                        <div class="icon-bg">
                          <i class="fa fa-bar-chart-o"></i>
                        </div>
                        <div class="text-left">
                          <h2>{{ scope.lastMonth }}</h2>
                        </div>
                      </div>
                      <div>
                        <div class="grid gap-6 grid-cols-2">
                          <div class="col-xs-6" style="border: none">
                            <div class="col-lg-3">
                              <h2 class="mt15 lh15"><b>IN</b></h2>
                            </div>
                            <h2 class="mt15 lh15">
                              <b>{{
                                setNumber(scope.monthlyLastMonth?.TotalIn)
                              }}</b>
                            </h2>
                          </div>
                          <div class="col-xs-6" style="border: none">
                            <div class="col-lg-3">
                              <h2 class="mt15 lh15"><b>OUT</b></h2>
                            </div>
                            <h2 class="mt15 lh15">
                              <b>{{
                                setNumber(scope.monthlyLastMonth?.TotalOut)
                              }}</b>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div
                      class="panel bg-yellow-300 light of-h mb10 p-4 text-white"
                    >
                      <div class="pn pl20 p15">
                        <div class="icon-bg">
                          <i class="fa fa-bar-chart-o"></i>
                        </div>
                        <div class="text-left">
                          <h2>{{ scope.currentMonth }}</h2>
                        </div>
                      </div>
                      <div>
                        <div class="grid gap-6 grid-cols-2">
                          <div class="col-xs-6" style="border: none">
                            <div class="col-lg-3">
                              <h2 class="mt15 lh15"><b>IN</b></h2>
                              <div class="col-xs-6" style="border: none">
                                <h2 class="mt15 lh15">
                                  <b>{{
                                    setNumber(
                                      scope.monthlyCurrentMonth?.TotalIn
                                    )
                                  }}</b>
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div class="col-xs-6" style="border: none">
                            <div class="col-lg-3">
                              <h2 class="mt15 lh15"><b>OUT</b></h2>
                            </div>
                            <div class="row">
                              <div class="col-xs-6" style="border: none">
                                <div class="col-lg-3">
                                  <h2 class="mt15 lh15">
                                    <b>{{
                                      setNumber(
                                        scope.monthlyCurrentMonth?.TotalOut
                                      )
                                    }}</b>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-12 col-lg-12 admin-grid">
                  <div class="panel panel-primary panel-border top" id="p1">
                    <div class="panel-body">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md6 col-lg-6 admin-grid">
                  <div class="panel panel-primary panel-border top" id="p2">
                    <div class="panel-body">
                      <hc-column-graph
                        data="scope.palletInventoryPerSite"
                        title="Pallet Inventory Per Site"
                      ></hc-column-graph>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-lg-6 admin-grid">
                  <div class="panel panel-primary panel-border top" id="p3">
                    <div class="panel-body">
                      <hc-column-graph
                        data="scope.palletInventoryPerLocation"
                        title="Pallet per location"
                      ></hc-column-graph>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      <div class="mt-3 overflow-auto" v-if="dynamicLink">
        <iframe
          :src="dynamicLink"
          frameborder="0"
          class="flex w-screen h-[78vh] overflow-auto"
          sandbox="allow-scripts allow-same-origin"
          aria-readonly="true"
        ></iframe>
      </div>
    </ion-content>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../services/piso-serviceapi";
import { format, subMonths } from "date-fns";
import { initFlowbite } from "flowbite";
import { showSwitchSiteModal } from "../../dashboard/store";

definePageMeta({
  alias: ["/", "/tabs"],
});

var userFullname = JSON.parse(decrypt(localStorage.getItem("_214"))).fullname;
var userId = JSON.parse(decrypt(localStorage.getItem("_214"))).userid;
var dynamicLink =
  "https://metabase.fast.com.ph/public/dashboard/088ab834-7d4d-4a44-9f47-c1a6fde228cc";

/* var dynamicLink = localStorage.getItem("_102")
  ? "https://metabase.fast.com.ph/public/dashboard/cc6c27ae-77cc-4a2c-a414-efaa4a195e2a?sitecode=" +
    JSON.parse(localStorage.getItem("_102")).sitecode
  : null + "#hide_parameters=sitecode"; */
/* `
https://metabase.fast.com.ph/public/dashboard/cc6c27ae-77cc-4a2c-a414-efaa4a195e2a?sitecode=
${
  JSON.parse(localStorage.getItem("_102")).sitecode ?? null
}#hide_parameters=sitecode`; */
/* var sitecode = JSON.parse(
  localStorage.getItem("_102")
).sitecode; */ /*set sidecode*/

const scope = reactive({});
var prevDate = subMonths(new Date(), 1);
scope.lastMonth = format(prevDate, "MMMM");
scope.currentMonth = format(new Date(), "MMMM");

const init = async () => {
  if (
    localStorage.getItem("_102") == undefined ||
    localStorage.getItem("_102") == null
  ) {
    showSwitchSiteModal.value = true;
    return;
  }

  const response = await serviceApi().get(
    "pallet/GetPisoPalletChart/?sitecode=" +
      JSON.parse(localStorage.getItem("_102")).sitecode,
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (response.status === 200) {
    //scope.palletAllSites = convertPallets(response.data.data.palletAllSites);
    scope.palletInventoryPerSite = response.data.PalletInventoryPerSite;
    scope.palletInventoryPerLocation = response.data.PalletInventoryPerLocation;
    scope.dailyCompare = response.data.dailyCompare;
    // Find object with DateCreated equal to "CurrentMonth"
    scope.monthlyCurrentMonth = response.data.monthlyCompare.find(
      (item) => item.DateCreated === "CurrentMonth"
    );

    // Find object with DateCreated equal to "LastMonth"
    scope.monthlyLastMonth = response.data.monthlyCompare.find(
      (item) => item.DateCreated === "LastMonth"
    );
  }
};

const setNumber = (total) => {
  if (total === undefined || total === null) {
    return 0;
  } else {
    return total;
  }
};

function convertPallets(param) {
  var jresult = [];

  for (var jObj in param) {
    var pallet = [param[jObj].ItemDescription, param[jObj].Quantity];
    jresult.push(pallet);
  }

  return jresult;
}

onMounted(() => {
  initFlowbite();
  // if(JSON.parse(localStorage.getItem("_102")).sitecode){
  //   dynamicLink = "https://metabase.fast.com.ph/public/dashboard/cc6c27ae-77cc-4a2c-a414-efaa4a195e2a?sitecode=" + JSON.parse(localStorage.getItem("_102")).sitecode
  // }
  init();
});
</script>

<style scoped></style>
