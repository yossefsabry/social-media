import axios, { AxiosError, AxiosResponse } from "axios";
import { createAlert, loaderHandler, handleClickCard } from "../index.ts";
import { url } from "../storeData.ts";
import { AlertType } from "../interface.ts";

/**
 * handle create comment for  the user
 * @param {number} e - for the current id for the post
 * @throws {error} - handle the error when adding comment
 */
const handleAddingComment = (e: number) => {
  console.log("adding comment");
  const commentValue: string = (document.getElementById("addComment") as HTMLInputElement).value;
  const token: string = localStorage.getItem("token") || "";

  const formData: FormData = new FormData();
  formData.append("text", commentValue);

  const headers: { authorization: string } = {
    authorization: `bearer_${token}`,
  };

  if (commentValue == "") {
    createAlert("not valid comment !!", AlertType.danger);
    return;
  }
  loaderHandler(true);
  axios.post(`${url}/post/${e}/comment`, formData, { headers: headers })
    .then(() => {
      createAlert("success adding comment to the post", AlertType.success);
      loaderHandler(false);
    }).then(() => { // FIX reload the winddow fo the user
      // axios.get(`${url}/post/${e}`).then((res: AxiosResponse) => { // under fix
      //   console.log("res", res.data);
      //   loaderHandler(false);
      //   handleClickCard(encodeURIComponent(JSON.stringify(res.data.post)));
      // }).catch((e) => {
      //   console.log(e)
      //   loaderHandler(false);
      // })
    })
    .catch((e: AxiosError) => {
      console.log("error happend", e);
      createAlert("error happend in request: " + e.request.response, AlertType.danger);
      loaderHandler(false);
    });
};

export default handleAddingComment;
