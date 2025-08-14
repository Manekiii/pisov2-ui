import CryptoJS from "crypto-js";

const secretKey = "FAST-PISO";

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.provide("crypto", {
//     encrypt: (data) => {
//       return CryptoJS.AES.encrypt(data, secretKey).toString();
//     },
//     decrypt: (cipherText) => {
//       const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
//       return bytes.toString(CryptoJS.enc.Utf8);
//     },
//   });
// });

export function encrypt(data) {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}
export function decrypt(cipherText) {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
