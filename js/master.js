// import { getCookie } from "../utilities/cookie.js";

const productsContainer = document.getElementById("products");
const loader = document.querySelector(".container-loader");
const cartIcons = document.querySelectorAll(".cart-icon");
const cartContainer = document.querySelector(".cart-container");
const cartOverlay = document.querySelector(".cart-overlay");
const cartClose = document.querySelector(".cart-close");
const cartBody = document.querySelector(".cart-body");
const totalPrice = document.querySelector(".total-price");
const clearAllBtn = document.querySelector(".clear-cart");
const qtys = document.querySelectorAll(".quantity");
const loginBtns = document.querySelectorAll(".login");
const dashboardBtns = document.querySelectorAll(".dashboard");
const checkoutBtn = document.querySelector(".checkout-btn");
const URL = "https://66d6b283006bfbe2e64e387f.mockapi.io/shop/products";
console.log("start");

let products = null;
let cart = [];
loadCart();
const init = () => {
  loadProducts(URL).then(renderProducts).finally(renderCart);
};

// start program

document.addEventListener("DOMContentLoaded", init);

// get products from api

const loadProducts = async (URL) => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("failed fetch");
    }
    products = await response.json();
  } catch (error) {
    console.log(error);
  }
};

// show products
function renderProducts() {
  loader.style.display = "none";
  productsContainer.innerHTML = "";
  productsContainer.innerHTML += products
    .map(({ image, title, price, category, id }) => {
      return `
     <div class="swiper-slide px-4 group relative overflow-hidden flex justify-center items-center flex-wrap ">
                    <img
                      src="${image}"
                      alt="${title}" 
                      loading="lazy"
                    />
                      <div
                        class="md:w-[50px] w-[40px] z-20 flex justify-center py-2 px-4 bg-white opacity-100 transition-all duration-300 absolute md:bottom-[-50px] left-[50%] translate-x-[-50%] md:group-hover:bottom-[100px] bottom-[80px]"
                     onclick="addToCart(${Number(id)})">
                        <i class="bi ${checkInCart(id)}"  data-id=${id}></i>
                    </div>
                    <div class="w-[100%] text-center mt-5 lg:-mt-16">
                      <h3 class="w-full">${title}</h3>
                      <span class="w-full text-grayText">${category}</span>
                      <p class="w-full text-orange">${price.format()}</p>
                    </div>
                  </div>
    `;
    })
    .join("");
}
function checkInCart(id) {
  const isInCart = cart.some((x) => Number(x.id) === Number(id));
  const iconTag = document.querySelector(`i[data-id='${id}']`);
  iconTag?.classList[isInCart ? "remove" : "add"]("bi-cart2");
  iconTag?.classList[isInCart ? "add" : "remove"]("bi-check");
  return isInCart ? "bi-check" : "bi-cart2";
}

// format number

Number.prototype.format = function () {
  return this.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

// add product in cart

// click icons cart

cartIcons.forEach((icon) => {
  icon.addEventListener("click", showCart);
});

// show cart

function showCart() {
  cartContainer.classList.add("visible");
  cartContainer.classList.add("opacity-100");
  cartContainer.classList.remove("invisible");
  cartContainer.classList.remove("opacity-0");
  cartOverlay.classList.add("translate-x-0");
  cartOverlay.classList.remove("translate-x-[100%]");
}

cartClose.addEventListener("click", hideCart);

// hide cart

function hideCart() {
  cartContainer.classList.remove("visible");
  cartContainer.classList.remove("opacity-100");
  cartContainer.classList.add("invisible");
  cartContainer.classList.add("opacity-0");
  cartOverlay.classList.remove("translate-x-0");
  cartOverlay.classList.add("translate-x-[100%]");
}

cartContainer.addEventListener("click", hideCart);
cartOverlay.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
});

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  qtys.forEach((item) => {
    item.textContent = count;
  });

  if (cart.length >= 4) {
    cartBody.classList.add("overflow-y-scroll");
  }
  if (cart.length === 0) {
    cartBody.classList.remove("overflow-y-scroll");
    cartBody.innerHTML = `<div class="flex justify-center flex-wrap">
    <i class="bi bi-cart-dash text-[150px] text-gray"></i>
    <p class="w-full text-center text-black text-opacity-70 mt-6 ">No products in the cart</p>
    </div>`;
    calculatTotal();
    saveCart();
    return;
  }
  cartBody.innerHTML = "";
  cartBody.innerHTML = cart
    .map((product) => {
      const { image, id, title, price, quantity } = product;
      return `
           <div class="product-item flex justify-between my-3">
              <img
                src="${image}"
                class="w-[60px] h-[60px] object-cover"
                alt="${title}"
              />
              <div>
                <h2>${title}</h2>
                <div class="counter flex items-center my-2">
                  <i class="bi bi-dash border border-gray" onclick="decreaseHandler(${Number(
                    id
                  )})"></i>
                  <span
                    class="flex px-2 justify-center items-center border-t border-b border-t-gray border-b-gray"
                    >${quantity}</span
                  >
                  <i class="bi bi-plus border border-gray" onclick="increaseHandler(${Number(
                    id
                  )})"></i>
                </div>
                <p class="flex items-center">
                  <span class="text-black text-opacity-60">${quantity}</span
                  ><i
                    class="bi bi-x text-black text-opacity-60 text-[10px]"
                    
                  ></i>
                  <span>${price.format()}</span>
                </p>
              </div>
              <i class="bi bi-x text-right" onclick="removeProduct(${id})"></i>
            </div>
             <hr class="text-gray" />

        `;
    })
    .join("");
  saveCart();
  calculatTotal();
}

function calculatTotal() {
  const total = cart.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );
  totalPrice.textContent = total.format() || "$0.00";
}

// save to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function loadCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

function removeProduct(id) {
  const inCart = cart.find((x) => Number(x.id) === id);
  if (!inCart) return;
  cart = cart.filter((x) => Number(x.id) !== id);
  checkInCart(id);
  renderCart();
  saveCart();
}

clearAllBtn.addEventListener("click", clearCart);

function clearCart() {
  cart = [];
  saveCart();
  renderProducts();
  renderCart();
  setTimeout(hideCart, 500);
}

function increaseHandler(id) {
  const inCart = cart.find((x) => Number(x.id) === id);
  if (!inCart) return;
  inCart.quantity++;
  renderCart();
}
function decreaseHandler(id) {
  const inCart = cart.find((x) => Number(x.id) === id);
  if (!inCart) return;
  if (inCart.quantity === 1) {
    removeProduct(id);
    return;
  } else {
    inCart.quantity--;
  }
  renderCart();
}
function getCookie() {
  const cookie = document.cookie;
  if (cookie) {
    const cookieArray = cookie.split("=");
    return { [cookieArray[0]]: cookieArray[1] };
  }
  return false;
}

function displayLoginBtnOrDashbordBtn() {
  const cookie = getCookie();
  if (cookie) {
    loginBtns.forEach((btn) => {
      btn.style.display = "none";
    });
  } else {
    dashboardBtns.forEach((btn) => {
      btn.style.display = "none";
    });
  }
}
displayLoginBtnOrDashbordBtn();

function addToCart(id) {
  const inCart = cart.find((x) => Number(x.id) === id);
  const productSelected = products.find((product) => Number(product.id) === id);
  if (inCart) {
    inCart.quantity++;
  } else {
    cart.push({ ...productSelected, quantity: 1 });
  }

  //   render cart
  checkInCart(id);
  setTimeout(showCart, 500);
  saveCart();
  loadCart();
  renderCart();
}

checkoutBtn.addEventListener("click", () => {
  clearCart();
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Checkout is Successful",
    showConfirmButton: false,
    timer: 2000,
  });
});
