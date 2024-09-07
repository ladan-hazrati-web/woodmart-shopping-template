import { getCookie } from "./cookie.js";

function authHandler() {
  const cookie = getCookie();
  const URL = location.href;
  if (
    (cookie && URL.includes("auth")) ||
    (!cookie && URL.includes("dashboard"))
  ) {
    location.assign("../index.html");
  }
}

export { authHandler };
