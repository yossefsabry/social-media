import { loaderHandler, createAlert } from "../index.mjs";
import { url, getRequest } from "../../../script.mjs";
/**
 * create post for user that authorization
 */
function handleCreatePost() {
  const title = document.querySelector("#title-create-post").value;
  const body = document.querySelector("#body-create-post").value;
  const image = document.querySelector("#image-create-post").files[0];
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
    .then((response) => {
    //   console.log(response);
      createAlert("success create a new post ... ", "success");
      const modal = document.getElementById("create-post-modal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      getRequest(true);
      loaderHandler(false);
      scrollTop();
    })
    .catch((e) => {
      createAlert("error happend: " + e.request.responseText, "danger");
      console.log(e);
      loaderHandler(false);
    });
};
export default handleCreatePost;
