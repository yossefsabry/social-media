import { loaderHandler, createAlert, postTemplate, templateComment } from "../index.mjs";
import { url, postInfo } from "../../../script.mjs";

/**
 * handle navgation an post page
 */
const handleClickCard = (e) => {
  // console.log(e);
  loaderHandler(true);
  axios
    .get(`${url}/posts/${e}`)
    .then((response) => {
      postInfo.value = response.data.data;

    })
    .then(() => {
      let containerPost = document.querySelector(".container__posts");
      containerPost.innerHTML = "";
      let idPost = postInfo.value.id;
      const authorIdPost = postInfo.value.author.id;
      let conditionEdit = idPost.value != null && authorIdPost == idPost.value;
      let item = postInfo.value;
      const allComments = postInfo.value.comments.map((item) => {
        const comm = templateComment(item, postInfo.value);
        return comm;
      });
      const post = postTemplate(postInfo.value, idPost, conditionEdit, allComments, e); // is for the adding comment the id
      containerPost.innerHTML = post;
    })
    .catch((e) => {
      console.log("error happend", e);
      createAlert("error happend " + e, "danger");
    });
  loaderHandler(false);
};

export default handleClickCard;