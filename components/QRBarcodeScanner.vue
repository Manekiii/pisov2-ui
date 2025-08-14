<template>
  <!-- Main modal -->
  <div
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 w-full h-full p-4 flex items-center justify-center overflow-x-hidden overflow-y-auto md:inset-0 max-h-full"
  >
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-900 opacity-50"></div>
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t">
          <h3 class="text-xl font-semibold text-gray-900">Scan QR/Barcode</h3>
          <button
            @click="openModal = false"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
          <div class="bg-white shadow-sm border border-gray-300 rounded-lg">
            <div class="h-full w-full">
              <qrcode-stream
                :constraints="selectedConstraints"
                :track="trackFunctionSelected.value"
                :paused="paused"
                :formats="selectedBarcodeFormats"
                @detect="onDetect"
                @error="onError"
                @camera-on="onCameraOn"
                @camera-off="onCameraOff"
              >
                <!-- <div v-if="validationSuccess" class="validation-success">Scanned</div>
        <div v-if="validationPending" class="validation-pending">
          Long validation in progress...
        </div> -->

                <div
                  v-show="showScanConfirmation"
                  class="flex flex-nowrap justify-center items-center absolute w-full h-full bg-opacity-50"
                  style="background-color: rgba(255, 255, 255, 0.8)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    class="text-green-300"
                  >
                    <g fill="currentColor">
                      <path
                        d="M10.243 16.314L6 12.07l1.414-1.414l2.829 2.828l5.656-5.657l1.415 1.415z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12m11 9a9 9 0 1 1 0-18a9 9 0 0 1 0 18"
                        clip-rule="evenodd"
                      />
                    </g>
                  </svg>
                </div>
              </qrcode-stream>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b"
        >
          <button
            @click="openModal = false"
            type="button"
            class="text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import { openModal } from "~/dashboard/store";

const paused = ref(false);
const isValid = ref(false);
const result = ref("");
const emit = defineEmits(["success"]);
const showScanConfirmation = ref(false);

const onDetect = async ([firstDetectedCode]) => {
  // scanSound.play();
  // assetCode = firstDetectedCode.rawValue;
  // insertdatalocal();
  console.log(firstDetectedCode);

  paused.value = true;

  // // pretend it's taking really long
  await timeout(200);
  isValid.value = true;

  emit("success", firstDetectedCode.rawValue);
  // some more delay, so users have time to read the message
  await timeout(100);
  paused.value = false;
};

const timeout = (ms) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

const onCameraOn = () => {
  showScanConfirmation.value = false;
};

const onCameraOff = () => {
  showScanConfirmation.value = true;
};

/*** select camera ***/
const selectedConstraints = ref({ facingMode: "user" });
const defaultConstraintOptions = [
  { label: "rear camera", constraints: { facingMode: "environment" } },
  { label: "front camera", constraints: { facingMode: "user" } },
];
const constraintOptions = ref(defaultConstraintOptions);

async function onCameraReady() {
  // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
  // camera access permission. `QrcodeStream` internally takes care of
  // requesting the permissions. The `camera-on` event should guarantee that this
  // has happened.
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(({ kind }) => kind === "videoinput");

  constraintOptions.value = [
    ...defaultConstraintOptions,
    ...videoDevices.map(({ deviceId, label }) => ({
      label: `${label} (ID: ${deviceId})`,
      constraints: { deviceId },
    })),
  ];

  error.value = "";
}
/*** track functons ***/
function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
}
function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height },
    } = detectedCode;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#007bff";
    ctx.strokeRect(x, y, width, height);
  }
}
function paintCenterText(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode;

    const centerX = boundingBox.x + boundingBox.width / 2;
    const centerY = boundingBox.y + boundingBox.height / 2;

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width);

    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "center";

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#35495e";
    ctx.strokeText(detectedCode.rawValue, centerX, centerY);

    ctx.fillStyle = "#5cb984";
    ctx.fillText(rawValue, centerX, centerY);
  }
}
const trackFunctionOptions = [
  { text: "nothing (default)", value: undefined },
  { text: "outline", value: paintOutline },
  { text: "centered text", value: paintCenterText },
  { text: "bounding box", value: paintBoundingBox },
];
const trackFunctionSelected = ref(trackFunctionOptions[1]);

// /*** barcode formats ***/
const barcodeFormats = ref({
  aztec: true,
  code_128: true,
  code_39: true,
  code_93: true,
  codabar: true,
  databar: true,
  databar_expanded: true,
  data_matrix: true,
  dx_film_edge: true,
  ean_13: true,
  ean_8: true,
  itf: true,
  maxi_code: true,
  micro_qr_code: true,
  pdf417: true,
  qr_code: true,
  rm_qr_code: true,
  upc_a: true,
  upc_e: true,
  linear_codes: true,
  matrix_codes: true,
});
const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats.value).filter(
    (format) => barcodeFormats.value[format]
  );
});
// /*** error handling ***/
const error = ref("");
function onError(err) {
  error.value = `[${err.name}]: `;

  if (err.name === "NotAllowedError") {
    error.value += "you need to grant camera access permission";
  } else if (err.name === "NotFoundError") {
    error.value += "no camera on this device";
  } else if (err.name === "NotSupportedError") {
    error.value += "secure context required (HTTPS, localhost)";
  } else if (err.name === "NotReadableError") {
    error.value += "is the camera already in use?";
  } else if (err.name === "OverconstrainedError") {
    error.value += "installed cameras are not suitable";
  } else if (err.name === "StreamApiNotSupportedError") {
    error.value += "Stream API is not supported in this browser";
  } else if (err.name === "InsecureContextError") {
    error.value +=
      "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
  } else {
    error.value += err.message;
  }
}

function startscan() {
  isOpenCamera.value = !isOpenCamera.value;
}
</script>
