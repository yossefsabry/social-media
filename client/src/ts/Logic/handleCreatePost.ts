import axios, { AxiosError } from "axios";
import { loaderHandler, createAlert, getRequest, scrollTop, showUserInfo} from "../index.ts";
import { url } from "../storeData.ts";
import { AlertType } from "../interface.ts";
import * as bootstrap from "bootstrap";

/**
 * create post for user that authorization
 * @param { boolean } profileUser - for check the user profile or home reqeust for create post
 * @throws { AxiosError } - catch axios error
 */
function handleCreatePost(profileUser?: boolean)  {
  let title: string;
  let image: File;
  let imageElement: HTMLInputElement | null;

  if (profileUser == false) {
     title = (document.querySelector(".create__post__container__home .title__input") as HTMLInputElement).value;
     imageElement = (document.querySelector(".create__post__container__home .image__input") as HTMLInputElement);
  }
  else {
     title = (document.querySelector("#title-create-post" ) as HTMLInputElement).value;
    imageElement = (document.querySelector("#image-create-post") as HTMLInputElement);
  }
  const formData: FormData = new FormData();
  if (imageElement !== null && imageElement.files !== null && imageElement.files.length > 0) {
    image = imageElement.files[0];
    formData.append("title", title);
    formData.append("images", image!); // fix used before assigned
  } else {
    formData.append("title", title);
  }
  const token: string | null  = localStorage.getItem("token");
  const headers: { authorization: string} = {
    authorization: `bearer_${token}`,
  };
  loaderHandler(true);
  axios.post(`${url}/post`, formData, { headers: headers })
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
      title = "";
      imageElement.value = "";
      loaderHandler(false);
      scrollTop();
    })
    .catch((e: AxiosError<{ message: string }>) => {
      createAlert("error happend: " + e?.response?.data?.message, AlertType.danger)
      console.log(e);
      loaderHandler(false);
    });
}
export default handleCreatePost;
