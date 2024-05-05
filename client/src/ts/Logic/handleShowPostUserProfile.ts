import axios, { AxiosResponse, AxiosError } from "axios";
import { url, user , idPost} from "../storeData";
import { AlertType, PostInfo } from "../interface";
import templateCard from "../templates/templateCard";
import createAlert from "../UI/createAlert";
import {loaderHandler} from "../index"

export default async function handleShowPostProfile() {
  loaderHandler(true);
  // console.log("welcome from post page");
  let allPostUser: any = [];

  if(user !== null ) {

  const { _id } = user.value!;
  const token: string = localStorage.getItem("token") || "";
  const headers: { authorization: string } = {
    authorization: `bearer_${token}`
  }
  //http://localhost:5000/post/socialuser/6426e14325fb796e7b40268c
  await axios.get(`${url}/post/socialuser/${_id}`, { headers: headers })
  .then((response: AxiosResponse) => {
      allPostUser =  response.data.results.results.map((item: PostInfo) => {
      console.log(response);
        const id: number = item._id;
        idPost.value = id;
        // FIX condition
        const userTemplate: string = templateCard(item, true, idPost.value!, item.title, user.value!, true);
        return userTemplate;
      }).join("");
    }).then(() => {

    const element: HTMLElement = document.getElementById("profile__body__user") as HTMLElement;
    (document.querySelector(".profile-page") as HTMLElement).style.cssText = ` width: 100% !important;`;
      element.innerHTML = `
      <div class="row profile-body w-100" id="profile__body__user">
        <div class="d-md-block left-wrapper py-4 ">
          <div class="card rounded">
            ${allPostUser}
          </div>
        </div>
      </div>
      `;
      loaderHandler(false);
    }).catch((e: AxiosError<{ message: string }>) => {
      console.log("error happend", e);
      createAlert("error happend: " +  e.response?.data?.message , AlertType.danger);
      loaderHandler(false);
    });
  } else {
    createAlert("no user found", AlertType.danger);
    console.error(" no user found" );
    loaderHandler(false);
  }
};
