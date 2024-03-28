import { createAlert, loaderHandler } from "../index.mjs";
import { url } from "../../../script.mjs";
import { handleClickCard } from "../index.mjs";
/**
 * handle create comment for  the user
 */
const handleAddingComment = (e) => {
  console.log("adding comment");
  let commentValue = document.querySelector("#comment__input").value;
  let token = localStorage.getItem("token");
  const data = {
    body: commentValue,
  };
  const headers = {
    authorization: `Bearer ${token}`,
  };
  if (commentValue == "") {
    createAlert("please enter the comment", "danger");
    return;
  }
  loaderHandler(true);
  axios
    .post(`${url}/posts/${e}/comments`, data, { headers: headers })
    .then((response) => {
      // console.log(response);
      createAlert("success adding commit to the post", "success");
      handleClickCard(e);
      loaderHandler(false);
    })
    .catch((e) => {
      console.log("error happend", e);
      createAlert("error happend in request: " + e.request.response, "danger");
      loaderHandler(false);
    });
};

export default handleAddingComment;