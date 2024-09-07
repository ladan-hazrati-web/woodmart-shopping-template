const BASE_URL = "https://fakestoreapi.com";

const errorMessageContainer = document.querySelector(
  ".error-message-container"
);
const errorMessage = document.querySelector(".error-message");

const postData = async (path, data) => {
  try {
    errorMessageContainer.classList.add("hidden");
    errorMessageContainer.classList.remove("flex");
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    errorMessageContainer.classList.add("flex");
    errorMessageContainer.classList.remove("hidden");
    errorMessage.innerHTML = `${error.message}`;
  }
};

async function getUsers(path) {
  try {
    const response = await fetch(`${BASE_URL}/${path}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export { postData, getUsers };
