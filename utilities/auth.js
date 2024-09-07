import { authHandler } from "./authHandler.js";
import { setCookie } from "./cookie.js";
import { postData } from "./httpRequest.js";

const loginBtn = document.querySelector(".login-btn");
const inputs = document.querySelectorAll("input");
const loader = document.querySelector(".loader1");
const loginText = document.querySelector(".login-text");
loginBtn.addEventListener("click", submitHandler);

async function submitHandler(event) {
  loader.classList.add("flex");
  loader.classList.remove("hidden");
  loginText.classList.add("hidden");
  event.preventDefault();
  console.log("js");

  const username = inputs[0].value;
  const password = inputs[1].value;
  const data = {
    username: username,
    password: password,
  };
  const response = await postData("auth/login", data);
  setCookie(response.token);
  location.assign("../index.html");
}
function init() {
  authHandler();
}

document.addEventListener("DOMContentLoaded", init);
