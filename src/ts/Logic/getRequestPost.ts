import axios, { AxiosError, AxiosResponse } from "axios";
import { PostInfoCard } from "../interface.ts";
import { loaderHandler, templateCard } from "../index.ts";
import { idPost, lastPage, postArray, url, currentPostClick, user  } from "../storeData.ts";

/**
 * request for the api for data posts
 * @param {boolean} updatePost -  remove the content
 * @param {number} current - for the current page
 * @throws { AxiosError } e - catch the error if the request fail
 * @returns {Promise} - return the response from the api
 * */

async function getRequest(updatePost?: boolean, current?: number): Promise<void> {

  loaderHandler(true);
  await axios.get(`${url}/posts?limit=4&page=${current}`)
  .then((response: AxiosResponse) => {
    postArray.value = response.data.data;
    lastPage.value = response.data.meta.last_page;

    const userString: string | null = localStorage.getItem("user");
    if (userString !== null) {
      const userValue = JSON.parse(userString);
      user.value = userValue;
    };
  })
  .then(() => {
    let posts = (document.querySelector(".posts") as HTMLElement);
    // for when update and delete post its delete the posts conatiner and adding the new posts
    if (updatePost == true && posts != null) {
      posts.innerHTML = "";
    }

    postArray.value.map((item: PostInfoCard ) => {
      currentPostClick.value = item;
      const tags: Array<string> = item.tags.map((tg: string) => {
        return `<div> ${tg}</div>`;
      });
      let title: string | null  = item.title == null ? "" : item.title;
      let id: number = item.id;

      try {
        idPost.value = id; // for the post id handle for the delete and update
      }
      catch (e) {
        console.log(e)
      }

      const authorIdPost: number = item.author.id;

        // check for the id for post and author
        let idUser: number | undefined = user.value !== undefined ? user.value.id : undefined;
        let conditionEdit: boolean = idUser != null && authorIdPost == idUser;
        if (posts != null) // check if there or delete when click post
          posts.innerHTML += templateCard( item, conditionEdit, idPost.value!, id, title, tags,);
      });
    })
    .catch((e: AxiosError) => {
      console.log("error happend", e);
    });
  loaderHandler(false);
}

export default getRequest;
