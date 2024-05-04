import axios, { AxiosError  } from "axios";
import { createAlert, loaderHandler, handleClickCard  } from "../index.ts";
import { url, currentPostClick, user } from "../storeData.ts";
import { AlertType, postInfoAuthor, postInfoComments } from "../interface.ts";

/**
 * handle create comment for  the user
 * @param {number} e - for the current id for the post
 * @throws {error} - handle the error when adding comment
 */
const handleAddingComment = (e: number) => {
  // console.log("adding comment");
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
    }).then(() => {
      // adding the comment to  the template and update the handleClickCard page
      let userInfo: postInfoAuthor ;
      if (user.value !== undefined) {
         userInfo = {
          name: user.value.name,
          _id: user.value._id,
          images: user.value.images!,
        }
      }
      const reactions = {
        like: [],
      }
      const dataComment: postInfoComments = {
        postId: String(e),
        replies: [],
        reactions: reactions,
        text: commentValue,
        _id:"222222222222",
        userId: userInfo!
      };
      // console.log("---------------------------" , currentPostClick.value);
      loaderHandler(false);
      if ( currentPostClick?.value?.comments !== undefined )
        currentPostClick.value?.comments.push(dataComment);
        handleClickCard(encodeURIComponent(JSON.stringify(currentPostClick?.value)));
    })
    .catch((e: AxiosError) => {
      console.log("error happend", e);
      createAlert("error happend in request: " + e.request.response, AlertType.danger);
      loaderHandler(false);
    });
};

export default handleAddingComment;
