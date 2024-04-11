import {
  url,
  postArray,
  lastPage,
  user,
  currentPostClick,
  idPost,
} from "../../../script.mjs";
import { loaderHandler, templateCard } from "../index.mjs";

/**
 * request for the api for data posts
 * @param {boolean} updatePost -  remove the content
 * @param {number} current - for the current page
 * @throws {error} - catch the error if the request fail
 * @returns {Promise} - return the response from the api
 * */
async function getRequest(updatePost, current) {
  loaderHandler(true);
  const response = await axios
    .get(`${url}/posts?limit=5&page=${current}`)
    .then((response) => {
      postArray.value = response.data.data;
      lastPage.value = response.data.meta.last_page;
      user.value = JSON.parse(localStorage.getItem("user"));
    })
    .then(() => {
      let posts = document.querySelector(".posts");
      // for when update and delete post its delete the posts conatiner and adding the new posts
      if (updatePost == true && posts != null) {
        posts.innerHTML = "";
      }

      postArray.value.map((item) => {
        currentPostClick.value = item;
        const tags = item.tags.map((tg) => {
          return `<div> ${tg}</div>`;
        });
        let title = item.title == null ? "" : item.title;
        let id = item.id;
        idPost.value = id; // for the post id handle for the delete and update
        const authorIdPost = item.author?.id;

        // check for the id for post and author
        let idUser = user.value !== null ? user.value.id : " ";
        let conditionEdit = idUser != null && authorIdPost == idUser;
        posts.innerHTML += templateCard(
          item,
          conditionEdit,
          idPost.value,
          id,
          title,
          tags,
        );
      });
    })
    .catch((error) => {
      console.log("error happend", error);
    });
  loaderHandler(false);
  return response;
}

export default getRequest;
