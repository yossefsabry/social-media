import { createAlert, loaderHandler, scrollTop, userInfoPostTemplate, userProfilePage } from "../index.mjs";
import { url, isFetching } from "../../../script.mjs";
import { idPost } from "../../../script.mjs";

/**
 * for show the user info
 * @param {object} element - the object for the user info
 * @returns {HTMLDivElement} - return the user template for profile and html tree
 * @throws {error} - when making request for the user info
 */
const showUserInfo = async (element) => {
  // to stop fetching data for pagination
  isFetching.value = true;
  let content = document.querySelector(".container__posts");
  let user;
  let userProfile;
  loaderHandler(true);
  if (element == null) {
    user = JSON.parse(localStorage.getItem("user"));
    userProfile = true;
  } else {
    user = JSON.parse(decodeURIComponent(element));
    let user_id = user.author.id;
    userProfile = false;
    const request = await axios
      .get(`${url}/users/${user_id}`)
      .then((response) => {
        user = response.data.data;
      })
      .catch((e) => console.log(e));
  }
  if (user == null) {
    createAlert("no user sign in ..", "danger");
  } else {
    loaderHandler(true);
    let postUser;
    const requestPost = await axios
      .get(`${url}/users/${user.id}/posts`)
      .then((response) => {
        postUser = response.data.data;
      })
      .catch((e) => {
        console.log("error happend", e);
      });
    loaderHandler(false);
    const allPostUser = postUser.map((item) => {
      const tags = item.tags.map((tg) => {
        return `<div> ${tg}</div>`;
      });
      let title = item.title == null ? "" : item.title;
      let id = item.id;
      idPost.value = id;
      let userTemplate = userInfoPostTemplate(item, idPost.value, id, title, tags, userProfile);
      return userTemplate;
    });
    let userInfo = userProfilePage(user, allPostUser);
    content.innerHTML = userInfo;
    scrollTop();
    loaderHandler(false);
  }
};

export default showUserInfo;
