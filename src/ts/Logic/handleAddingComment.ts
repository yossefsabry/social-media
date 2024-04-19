import axios from "axios";
import { createAlert, loaderHandler, handleClickCard } from "../index.ts";
import { url } from "../storeData.ts";
import { AlertType } from "../interface.ts";
/**
 * handle create comment for  the user
 * @param {number} e - for the current id for the post
 * @throws {error} - handle the error when adding comment
 */
const handleAddingComment = (e: number) => {
  // console.log("adding comment");
  let commentValue: string = (
    document.querySelector("#comment__input") as HTMLInputElement
  ).value;
  let token: string | null = localStorage.getItem("token");
  const data: { body: string } = {
    body: commentValue,
  };
  const headers: { authorization: string } = {
    authorization: `Bearer ${token}`,
  };
  if (commentValue == "") {
    createAlert("not valid comment !!", AlertType.danger);
    return;
  }
  loaderHandler(true);
  axios
    .post(`${url}/posts/${e}/comments`, data, { headers: headers })
    .then(() => {
      createAlert("success adding comment to the post", AlertType.success);
      handleClickCard(e);
      loaderHandler(false);
    })
    .catch((e) => {
      console.log("error happend", e);
      createAlert(
        "error happend in request: " + e.request.response,
        AlertType.danger,
      );
      loaderHandler(false);
    });
};

export default handleAddingComment;
