import axios, { AxiosError, AxiosResponse } from "axios";
import { PostInfoCard } from "../interface.ts";
import { loaderHandler, templateCard } from "../index.ts";
import { idPost, lastPage, postArray, url, currentPostClick, user } from "../storeData.ts";

/**
 * request for the api for data posts
 * @param {boolean} updatePost -  remove the content
 * @param {number} current - for the current page
 * @throws { AxiosError } e - catch the error if the request fail
 * @returns {Promise} - return the response from the api
 * */

async function getRequest(updatePost?: boolean, current?: number): Promise<void> {
  const token = localStorage.getItem("token");
  const headers: any = {
    "authorization": `bearer_${token}`,
    "Contnet-Type": "application/json",
  }


  loaderHandler(true);
  await axios.get(`${url}/post?limit=4&page=${current}`, { headers: headers })
    .then(async(response: AxiosResponse) => {
      postArray.value = await response.data.results.results;
      lastPage.value = await response.data.lastPage;

      const userString: string | null = localStorage.getItem("user");
      if (userString !== null) {
        const userValue = JSON.parse(userString);
        user.value = userValue;
      };
    })
    .then(() => {
      const posts = (document.querySelector(".posts") as HTMLElement);
      // for when update and delete post its delete the posts conatiner and adding the new posts
      if (updatePost == true && posts != null) {
        posts.innerHTML = "";
      }

      postArray.value.map(async(item: any) => { // Add 'item' parameter to the arrow function
        currentPostClick.value = item;
        // const tags: Array<string> = item.tags.map((tg: string) => {
        //   return `<div> ${tg}</div>`;
        // });
        const title: string | null = item.title == null ? "" : item.title;
        const id: number = item._id;

        try {
          idPost.value = id; // for the post id handle for the delete and update
        }
        catch (e) {
          console.log(e);
        }


        // get the user info for the post
        const headers: any = {
          "authorization": `bearer_${localStorage.getItem("token")}`,
        }
        const userInfo = await axios.get(`${url}/user/${item.userId._id}/profile`, { headers: headers });
        // console.log(userInfo) console the user info

        const authorIdPost: number = item.userId._id;
        // check for the id for post and author
        const idUser: number | undefined = user.value !== undefined ? user.value._id : undefined;
        const conditionEdit: boolean = idUser != null && authorIdPost == idUser;
        if (posts != null) // check if there or delete when click post
          posts.innerHTML += templateCard(item, conditionEdit, idPost.value!, id, title!, userInfo.data);
      });
    }).catch((e: AxiosError) => {
      console.log("error happend", e);
    });
  loaderHandler(false);
}

export default getRequest;
