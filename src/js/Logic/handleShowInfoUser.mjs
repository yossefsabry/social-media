import { createAlert, loaderHandler, scrollTop, userInfoPostTemplate, userProfilePage } from "../index.mjs";
import { url, isFetching } from "../../../script.mjs";
import { idPost } from "../../../script.mjs";

/**
 * for show the user info
 */
const showUserInfo = async (element, foundUserId) => {
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
    if(foundUserId == null) {
      user = JSON.parse(decodeURIComponent(element));
      console.log(user)
      let user_id = user.author.id;
    }else {
      let user_id = foundUserId;
    }
    userProfile = false;
    // console.log(user)
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
      // loop for the tags for every post
      const tags = item.tags.map((tg) => {
        return `<div> ${tg}</div>`;
      });
      let title = item.title == null ? "" : item.title;
      let id = item.id;
      // for update method
      idPost.value = id;
      let userTemplate = userInfoPostTemplate(item, idPost, id, title, tags, userProfile);
      return userTemplate;
    });
    let userInfo = userProfilePage(user, allPostUser);
    content.innerHTML = userInfo;
    scrollTop();
    loaderHandler(false);
  }
};

export default showUserInfo;