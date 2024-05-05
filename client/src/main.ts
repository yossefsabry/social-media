// imports
import { setupUi, handleLogout, handlePagination, handleLogin, handleRegister, handleCreatePost,
  showUserInfo, changeUserImageProfile, changeUserImageCover, 
  handleClickEditButton,
  handleUserProfile,
  } from "./ts/index.ts";

import { currentPage , currentPostClick } from "./ts/storeData.ts";
import { getRequest, deleteUser, updatePasswordUser, updateUserInfoProfile , } from "./ts/index.ts";

getRequest(false, currentPage.value);

window.addEventListener("scroll", () => handlePagination());

document.querySelector("#LoginBtn")!.addEventListener("click", () => handleLogin());

document.getElementById("logout-button")!.addEventListener("click", () => handleLogout());

setupUi();

document.getElementById("RegisterBtn")!.addEventListener("click", () => handleRegister());

document.querySelector("#create-post-button")!.addEventListener("click", () => handleCreatePost()); // for user profile

document.querySelector("#update-post-button")!.addEventListener("click", () => handleClickEditButton(currentPostClick.value?._id!)); // for user profile

document.querySelector(".create__post__container__home button")!.addEventListener("click", () => handleCreatePost(false)); // for home 

document.getElementById("user__image__profile__navbar")!.addEventListener("click", () => showUserInfo(null));

document.getElementById("button__change__image__profile")!.addEventListener("click", () => changeUserImageProfile());

document.getElementById("button__change__image__cover")!.addEventListener("click",() => changeUserImageCover());

document.getElementById("update__user__profile__info")!.addEventListener("click", () => updateUserInfoProfile());

document.getElementById("update__password__user")!.addEventListener("click", () => updatePasswordUser());

// document.getElementById("delete__user__button")!.addEventListener("click", () => deleteUser());


//  for update the user profile each 3 second
const token: string = localStorage.getItem("token") || "";
if (token !== "") {
  setTimeout(() => {
    handleUserProfile(token);
  }, 3000);
}
