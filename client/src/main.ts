// imports
import {
  setupUi,
  handleLogout,
  handlePagination, handleLogin, handleRegister, handleCreatePost,
  showUserInfo 
} from "./ts/index.ts";

import { currentPage } from "./ts/storeData.ts";
import { getRequest } from "./ts/index.ts";

getRequest(false, currentPage.value);

window.addEventListener("scroll", () => handlePagination());

document.querySelector("#LoginBtn")!.addEventListener("click", () => handleLogin());

document.getElementById("logout-button")!.addEventListener("click", () => handleLogout());

setupUi();

document.getElementById("RegisterBtn")!.addEventListener("click", () => handleRegister());

document.querySelector("#create-post-button")!.addEventListener("click", () => handleCreatePost()); // for user profile

document.querySelector(".create__post__container__home button")!.addEventListener("click", () => handleCreatePost(false)); // for home 

document.getElementById("profile-user")!.addEventListener("click", () => showUserInfo(null));