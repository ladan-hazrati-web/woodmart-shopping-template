import { authHandler } from "./authHandler.js";
import { getUsers } from "./httpRequest.js";
let users = null;
const loaderContainer = document.querySelector(".loader-container");
const usersContainer = document.querySelector("tbody");
document.addEventListener("DOMContentLoaded", init);

async function init() {
  authHandler();
  users = await getUsers("users");
  displayUser();
}

const logoutBtns = document.querySelectorAll(".logout-btn");

logoutBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    cookieStore.delete("token");
    location.assign("../index.html");
  });
});

function displayUser() {
  console.log(users);
  loaderContainer.classList.add("hidden");
  usersContainer.innerHTML = "";
  usersContainer.innerHTML += users
    .map(({ id, name: { firstname, lastname }, password, username }, index) => {
      const rowClass = index % 2 === 0 ? "bg-orange" : "";
      return `
         <tr class='${rowClass} border'>
            <td class='p-3'>${id}</td>
            <td class='p-3'>${firstname} ${lastname}</td>
            <td class='p-3'>${username}</td>
            <td class='p-3'>${password}</td>
          </tr>

        `;
    })
    .join("");
}
