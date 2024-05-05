import axios, {AxiosError} from "axios";
import {loaderHandler, createAlert, getRequest, showUserInfo, scrollTop, closeModal} from "../index"
import { url } from "../storeData";
import { AlertType } from "../interface";

/**
 * handle click on edit button for my post
 *@param {number} id - for the post id update
 */
const handleClickEditButton = (id: number) => {
  let title: string;
  let image: File;
  let imageElement: HTMLInputElement | null;

  title = (document.querySelector("#update-post-modal #title-update-post") as HTMLInputElement).value;
  imageElement = (document.querySelector("#update-post-modal #image-update-post") as HTMLInputElement);

  const formData: FormData = new FormData();
  if (imageElement !== null && imageElement.files !== null && imageElement.files.length > 0) {
    image = imageElement.files[0];
    formData.append("title", title);
    formData.append("images", image!); // fix used before assigned
  }else {
    formData.append("title", title);
  }

  const token: string | null  = localStorage.getItem("token");
  const headers: { authorization: string} = {
    authorization: `bearer_${token}`,
  };
  loaderHandler(true);
  axios.put(`${url}/post/${id}/update`, formData, { headers: headers })
    .then(() => {
      createAlert("success update the post", AlertType.success);
      getRequest(true);
      // showUserInfo(null);
      closeModal("update-post-modal")
      loaderHandler(false);
      scrollTop();
    }).catch((e: AxiosError<{ message: string }>) => {
      createAlert("error happend: " + e?.response?.data?.message, AlertType.danger)
      console.log(e);
      loaderHandler(false);
    });

};
export default handleClickEditButton; 
