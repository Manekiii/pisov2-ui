<template>
  <div
    class="bg-card text-card-foreground p-4 rounded-lg shadow-md"
    id="report-container"
  >
    <div
      id="titleHeader"
      class="flex items-center justify-between border-b border-border pb-2 mb-4"
    >
      <div class="flex items-center">
        <h2 class="text-lg font-semibold">Transaction Report</h2>
      </div>
      <button
        onclick="printReport()"
        class="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 rounded text-xs"
      >
        <img
          aria-hidden="true"
          alt="print-icon"
          src="https://openui.fly.dev/openui/24x24.svg?text=🖨️"
        />
      </button>
    </div>
    <div class="p-6 bg-card text-card-foreground">
      <div class="flex flex-col space-y-6">
        <div id="tablebody" style="height: 600px">
          <div class="text-center">
            <h2 class="text-2xl font-semibold">rptTitle</h2>
          </div>
          <div>
            <table class="table w-full text-sm">
              <tr>
                <td>Transaction ID: transactionheader.transhdrId</td>
                <td class="text-right">
                  Reference No.: transactionheader.referenceno
                </td>
              </tr>
              <tr>
                <td>Transaction Date: transactionheader.create_date</td>
                <td class="text-right">
                  Document No.: transactionheader.documentno
                </td>
              </tr>
              <tr>
                <td>
                  Shipper No: transactionheader.shippercode -
                  transactionheader.shippername
                </td>
                <td class="text-right">Trucker: transactionheader.ownername</td>
              </tr>
            </table>
          </div>
          <div>
            <table
              class="w-full table-auto border-collapse border border-border"
            >
              <thead class="bg-muted text-muted-foreground">
                <tr>
                  <th class="border border-border p-2">Item Code</th>
                  <th class="border border-border p-2">Description</th>
                  <th class="border border-border p-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  ng-repeat="transactiondetailList in transactiondetail"
                  class="border border-border"
                >
                  <td class="border border-border p-2">
                    transactiondetailList.itemId
                  </td>
                  <td class="border border-border p-2">
                    transactiondetailList.itemdesc
                  </td>
                  <td class="border border-border p-2">
                    transactiondetailList.qtyserved | number
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="min-w-full mt-4">
          <table class="min-w-full w-full">
            <tbody>
              <tr>
                <td class="signature text-center">
                  <u></u><br />
                  <span class="text-muted"
                    >Signature over Printed Name / Date</span
                  ><br />
                  <span class="font-bold"> signatory1 </span>
                </td>
                <td class="signature text-center">
                  <u></u><br />
                  <span class="text-muted"
                    >Signature over Printed Name / Date</span
                  ><br />
                  <span class="font-bold">SUPERVISOR</span>
                </td>
                <td class="signature text-center">
                  <u></u><br />
                  <span class="text-muted"
                    >Signature over Printed Name / Date</span
                  ><br />
                  <span class="font-bold"> signatory2 </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.signature {
  text-align: center;
  vertical-align: middle;
  padding: 4px;
}

/* Print-Specific Styles */
@media screen and (max-width: 768px), print {
  .min-w-full {
    width: 100%;
  }

  table.min-w-full {
    width: 100%;
    margin: 0 auto; /* Center table horizontally */
  }

  #report-container {
    width: 100%;
    padding: 0;
    margin: 0;
  }
  #titleHeader {
    display: none;
  }

  .printFooter {
    width: 100%;
  }

  /* Ensure the report title is centered and prominent */
  h2,
  .text-center {
    text-align: center;
    font-size: 16px;
  }

  .reptitle {
    text-align: center;
    font-weight: bold;
    display: block;
    width: 100%;
  }

  td[colspan="2"] {
    width: 100%; /* Ensure full width for centered text */
  }

  /* Adjust font sizes for better readability */
  table td {
    font-size: 12px;
  }

  /* Ensure the report takes full width and uses single-column layout */
  .min-w-full {
    width: 100%;
  }

  .overflow-auto {
    overflow: visible;
    height: auto;
  }

  /* Remove any unnecessary backgrounds or shadows */
  .bg-card,
  .shadow-md {
    background: none;
    box-shadow: none;
  }

  /* Remove the print button from the print view */
  button[onclick="printReport()"] {
    display: none;
  }

  /* Adjust border and padding for printing */
  .border-border {
    border-color: #000;
  }

  .p-2 {
    padding: 4px;
  }

  .p-4 {
    padding: 8px;
  }

  /* Ensure signatures are visible */
  u {
    display: block;
    margin: 16px 0;
  }

  td.signature {
    display: inline-block;
    width: 33.33%; /* Ensures three signatures are evenly spaced */
    vertical-align: middle;
    text-align: center;
  }

  .min-w-full {
    width: 100%;
  }

  /* Ensure columns stay in line for print */
  td.text-center {
    display: inline-block;
    width: 30%;
    margin-bottom: 0;
    padding: 4px;
  }

  /* Adjust the underline for signature */
  u {
    display: block;
    margin: 8px 0;
    border-bottom: 1px solid #000;
    width: 80%; /* Keeps the signature line centered */
    margin-left: auto;
    margin-right: auto;
  }

  .text-muted {
    color: #000;
    font-size: 12px;
  }

  .font-bold {
    font-size: 14px;
  }

  /* Make sure the text is centered and evenly spaced */
  .text-muted,
  .font-bold {
    display: block;
    text-align: center;
  }

  td.signature {
    display: inline-block;
    width: 33.33%; /* Ensures three signatures are evenly spaced */
    vertical-align: middle;
    text-align: center;
  }

  /* Adjust the underline for signature */
  u {
    display: block;
    margin: 8px 0;
    border-bottom: 1px solid #000;
    width: 80%; /* Keeps the signature line centered */
    margin-left: auto;
    margin-right: auto;
  }

  /* Make sure the text is centered and evenly spaced */
  .text-muted,
  .font-bold {
    display: block;
    text-align: center;
  }

  /* Ensure padding and margins don't interfere with centering */
  .p-2 {
    padding: 4px;
  }
}
</style>
