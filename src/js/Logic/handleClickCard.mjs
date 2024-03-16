import { loaderHandler, createAlert, postTemplate, templateComment, scrollTop } from "../index.mjs";
import { url, postInfo, idPost } from "../../../script.mjs";

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
      console.log(postInfo.value)

    })
    .then(() => {
      let containerPost = document.querySelector(".container__posts");
      containerPost.innerHTML = "";
      idPost.value = postInfo.value.id;
      const authorIdPost = postInfo.value.author.id;
      let user = JSON.parse(localStorage.getItem("user"));
      let userId = user !== null ? user.id : " ";
      // its for check if the post is the user post
      let conditionEdit = idPost.value != null && authorIdPost == idPost.value;
      const allComments = postInfo.value.comments.map((item) => {
        console.log(item)
        // for the comment authrozation and userID 
        const conditionComment = item.author.id == userId;
        const comm = templateComment(item, postInfo.value, conditionComment, item.author.id );
        return comm;
      });
      const post = postTemplate(postInfo.value, idPost, conditionEdit, allComments, e); // is for the adding comment the id
      containerPost.innerHTML = post;
      loaderHandler(false);
      scrollTop(); 
    })
    .catch((e) => {
      console.log("error happend", e);
      createAlert("error happend " + e, "danger");
      loaderHandler(false);
    });
};

export default handleClickCard;