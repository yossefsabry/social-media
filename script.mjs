// imports
import {
  setupUi,
  handleLogout,
  handlePagination, handleLogin, handleRegister, handleCreatePost,
  showUserInfo, getRequest
} from "./src/js/index.mjs";




// variable globel
export const url = "https://tarmeezacademy.com/api/v1"; // the main url
export let postArray = { value: [] }; // for the posts in getReqeust
export let currentPage = { value: 1 }; // for the pagination
export let lastPage = { value: null }; // for the pagination
export let postInfo = { value: [] }; // for pagination when its have data stop the pagination
export let user = { value: {} }; // for the user info
let updatePost = false;
export let idPost = { value: null }; // for the post id handle for the delete and update
export let currentPostClick = { value: null }; // for the post click
export let isFetching = { value: false }; // for the pagination


/**
 * adding pagination for the website
 */
window.addEventListener("scroll", () => handlePagination());

/**
 * for loginBtn handler and send the data
 */
document.querySelector("#LoginBtn").addEventListener("click", () => handleLogin());

/**
 * handle the logout
 */
document.getElementById("logout-button").addEventListener("click", () => handleLogout());

/**
 * for the first time to setup the ui for the app
 */
setupUi();

/**
 * handle register 
 */
document.getElementById("RegisterBtn").addEventListener("click", () => handleRegister());

/**
 * create post for user that authorization
 */
document.querySelector("#create-post-button").addEventListener("click", () => handleCreatePost());

document.getElementById("profile-user").addEventListener("click", () => showUserInfo(null));

// request for the first time
getRequest(false, currentPage.value);

