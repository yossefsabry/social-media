import axios, { AxiosResponse } from "axios"
import { loaderHandler, createAlert, postTemplate, templateComment, scrollTop } from "../index.ts";
import { url, postInfo, idPost } from "../storeData.ts";
import { AlertType,  User } from "../interface.ts";

/**
 * handle navgation an post page
 * @param {number} e - the id for the current clicked card
 * @throws {AxiosError} e - throw an error from axios 
 */
const handleClickCard = (e: number) => {
  loaderHandler(true);
  axios.get(`${url}/posts/${e}`)
    .then((response: AxiosResponse) => {
      console.log(postInfo)
      postInfo.value = response.data.data;
    })

    // .then(() => {
    //   let allComments: string[] = []; // adding the value = [] for if the postinfo.value == undefined 
    //   let user: User | undefined;
    //   let authorIdPost: number = -1;
    //   let authorId: number = -1;

    //   const containerPost = (document.querySelector(".container__posts") as HTMLElement);
    //   containerPost.innerHTML = "";
    //   if (postInfo.value !== undefined ) {
    //     idPost.value = postInfo.value.id;
    //     allComments =  postInfo.value.comments.map((item: any) => {
    //       const comm = templateComment(item);
    //       return comm;
    //     });
    //   }

    //   // set condition for the post author for the edit and delete buttons
    //   if (postInfo.value !== undefined)
    //      authorIdPost  = postInfo.value.author.id;

    //   // Retrieve the user from local storage if it exists
    //   const userData = localStorage.getItem("user");
    //   if (userData !== null) {
    //     user = JSON.parse(userData);
    //   }

    //   // check for the author
    //   if (user !== undefined) 
    //     authorId  = user.id;

    //   const conditionPostAuthor: boolean = authorIdPost == authorId;
    //   const post = postTemplate(postInfo.value!, idPost.value!, conditionPostAuthor, allComments, e); // is for the adding comment the id
    //   containerPost.innerHTML = post;
    //   loaderHandler(false);
    //   scrollTop(); 
    // })
    // .catch((e) => {
    //   console.log("error happend", e);
    //   createAlert("error happend " + e, AlertType.danger);
    //   loaderHandler(false);
    // });
};

export default handleClickCard;
