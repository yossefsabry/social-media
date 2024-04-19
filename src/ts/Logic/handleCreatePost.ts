import axios, { AxiosError } from "axios";
import {
  loaderHandler,
  createAlert,
  getRequest,
  scrollTop,
  showUserInfo,
} from "../index.ts";
import { url } from "../storeData.ts";
import { AlertType } from "../interface.ts";

/**
 * create post for user that authorization
 * @param { boolean } profileUser - for check the user profile or home reqeust for create post
 * @throws { AxiosError } - catch axios error
 */
function handleCreatePost(profileUser?: boolean)  {
  let title: string;
  let body: string;
  let image: File;
  let imageElement: HTMLInputElement | null;

  if (profileUser == false) {
     title = (document.querySelector(".create__post__container__home .title__input") as HTMLInputElement).value;
     body = (document.querySelector(".create__post__container__home .body__input") as HTMLInputElement).value;
     imageElement = (document.querySelector(".create__post__container__home .image__input") as HTMLInputElement);
  }
  else {
     title = (document.querySelector("#title-create-post" ) as HTMLInputElement).value;
     body = (document.querySelector("#body-create-post" ) as HTMLInputElement).value;
    imageElement = (document.querySelector("#image-create-post" ) as HTMLInputElement);
  }

  if (imageElement !== null && imageElement.files !== null && imageElement.files.length > 0) {
    image = imageElement.files[0];
  }

  const token: string | null  = localStorage.getItem("token");
  const formData: FormData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("image", image!); // fix used before assigned
  const headers: { authorization: string} = {
    authorization: `Bearer ${token}`,
  };
  loaderHandler(true);
  axios.post(`${url}/posts`, formData, { headers: headers })
    .then(() => {
      createAlert("success create a new post ... ", AlertType.success);
      if (profileUser !== false) {
        const modal: HTMLElement = document.getElementById("create-post-modal") as HTMLElement;
        const modalInstance = bootstrap.Modal.getInstance(modal) as bootstrap.Modal;
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
    .catch((e: AxiosError) => {
      createAlert("error happend: " + e?.request?.responseText, AlertType.danger)
      console.log(e);
      loaderHandler(false);
    });
}
export default handleCreatePost;
