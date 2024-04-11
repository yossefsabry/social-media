import { loaderHandler, createAlert, postTemplate, templateComment, scrollTop } from "../index.mjs";
import { url, postInfo, idPost } from "../../../script.mjs";

/**
 * handle navgation an post page
 * @param {number} e - the id for the current clicked card
 * @throws {throws} - throw an error for request for the clicked card
 */
const handleClickCard = (e) => {
  // console.log(e);
  loaderHandler(true);
  axios
    .get(`${url}/posts/${e}`)
    .then((response) => {
      postInfo.value = response.data.data;
      // console.log(postInfo.value)
    })
    .then(() => {
      let containerPost = document.querySelector(".container__posts");
      containerPost.innerHTML = "";
      idPost.value = postInfo.value.id;
      const authorIdPost = postInfo.value.author.id;
      const allComments = postInfo.value.comments.map((item) => {
        const comm = templateComment(item);
        return comm;
      });

      // set condition for the post author for the edit and delete buttons
      let user  = JSON.parse(localStorage.getItem("user"));
      let authorId = user.id;
      let conditionPostAuthor = authorIdPost == authorId;
      const post = postTemplate(postInfo.value, idPost.value, conditionPostAuthor, allComments, e); // is for the adding comment the id
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
