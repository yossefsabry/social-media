// imports
import {
  loaderHandler, setLocalStorageInfo, setupUi,
  createAlert, templateCard, handleLogout, handleClickDeleteButton,
  handlePagination, handleLogin, handleRegister, handleCreatePost,
   handleAddingComment, showUserInfo, templateComment, postTemplate,
   handleClickCard
} from "./src/js/index.mjs";

// variable globel
export const url = "https://tarmeezacademy.com/api/v1"; // the main url
export let postArray = []; // for the posts in getReqeust
export let currentPage = { value: 1 }; // for the pagination
export let lastPage; // for the pagination
export let postInfo = { value: [] }; // for pagination when its have data stop the pagination
export let user = {}; // for the user info
let updatePost = false;
export let idPost = { value: null }; // for the post id handle for the delete and update
export let currentPostClick = null; // for the post click
export let isFetching = { value: false }; // for the pagination


/**
 * request for the api for data posts
 */
export async function getRequest(updatePost, current) {
  loaderHandler(true);
  const response = await axios.get(`${url}/posts?limit=5&page=${current}`)
    .then((response) => {
      postArray = response.data.data;
      // console.log(response);
      lastPage = response.data.meta.last_page;
      user = JSON.parse(localStorage.getItem("user"));
      console.log(" ---------------------", user);
    })
    .then(() => {
      let posts = document.querySelector(".posts");
      // for when update and delete post its delete the posts conatiner and adding the new posts
      if (updatePost == true) {
        posts.innerHTML = "";
      }
      postArray.map((item) => {
        currentPostClick = item;
        // loop for the tags for every post
        const tags = item.tags.map((tg) => {
          return `<div> ${tg}</div>`;
        });
        let title = item.title == null ? "" : item.title;
        let id = item.id;
        idPost.value = id; // for the post id handle for the delete and update
        const authorIdPost = item.author?.id;
        let idUser = user !== null ? user.id : " "
        let conditionEdit = idUser != null && authorIdPost == idUser;
        posts.innerHTML += templateCard(item, conditionEdit, idPost.value, id, title, tags);
      });
    })
    .catch((error) => {
      console.log("error happend", error);
    })
    .finally(() => {
      console.log("request finsh...");
    });
  loaderHandler(false);
  return response;
}

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

/**
 * handle click on edit button for my post
 */
export const handleClickEditButton = (e) => {
  const element = JSON.parse(decodeURIComponent(e));
  console.log("element: ", element);

  document.getElementById("create-post-button").innerHTML = "Update";
  document.getElementById("title-create-post").value = `${element.title}`;
  document.getElementById("body-create-post").value = `${element.body}`;
  const modal = document.querySelector("#create-post-modal");
  const modalInstance = new bootstrap.Modal(modal, {});
  modalInstance.toggle();
};

// request for the first time
getRequest(false, currentPage.value);
