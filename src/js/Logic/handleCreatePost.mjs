import {
  loaderHandler,
  createAlert,
  getRequest,
  scrollTop,
  showUserInfo,
} from "../index.mjs";
import { url } from "../../../script.mjs";
/**
 * create post for user that authorization
 * @param { boolean } profileUser - for check the user profile or home reqeust for create post
 */
function handleCreatePost(profileUser) {
  let title;
  let body;
  let image;

  if (profileUser == false) {
     title = document.querySelector(".create__post__container__home .title__input").value;
     body = document.querySelector(".create__post__container__home .body__input").value;
     image = document.querySelector(".create__post__container__home .image__input").files[0];
  }
  else {
     title = document.querySelector("#title-create-post").value;
     body = document.querySelector("#body-create-post").value;
     image = document.querySelector("#image-create-post").files[0];
  }
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("image", image);
  const headers = {
    authorization: `Bearer ${token}`,
  };
  loaderHandler(true);
  axios
    .post(`${url}/posts`, formData, { headers: headers })
    .then(() => {
      //   console.log(response);
      createAlert("success create a new post ... ", "success");
      if (profileUser !== false) {
        const modal = document.getElementById("create-post-modal");
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
      }
      if (profileUser == false) {
        getRequest(true);
      }
      else {
        showUserInfo(null);
      }
      loaderHandler(false);
      scrollTop();
    })
    .catch((e) => {
      createAlert("error happend: " + e?.request?.responseText, "danger");
      console.log(e);
      loaderHandler(false);
    });
}
export default handleCreatePost;
