import Cookies from 'js-cookie';

export function setCookie(name, value, options) {
  Cookies.set(name, value, options);
}

export function getCookie(name) {
  return Cookies.get(name);
}

export function removeCookie(name) {
  Cookies.remove(name);
}

export function removeAllCookies() {
  const cookies = Object.keys(Cookies.get());
  cookies.forEach(cookie => {
    Cookies.remove(cookie);
  });
}