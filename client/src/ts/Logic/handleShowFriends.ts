import axios, { AxiosError } from "axios";
import { url } from "../storeData";
import createAlert from "../UI/createAlert";
import { AlertType } from "../interface";

export default function showFriends() {
  console.log("show friends");
  const token: string = localStorage.getItem("token") || "";
  const headers: { authorization: string } = {
    authorization: `bearer_${token}`
  }
  axios.get(`${url}/user/connections`, { headers: headers }).then((res) => {
    // console.log(res);
      // for some style
  
    const element: HTMLElement = document.getElementById("profile__body__user") as HTMLElement;
    (document.querySelector(".profile-page") as HTMLElement).style.cssText = ` width: 100% !important;`;

    if (res.data.connections.accepted.length == 0) {
      element.innerHTML = `
      <div class="row profile-body w-100" id="profile__body__user">
        <div class="d-md-block left-wrapper py-4 ">
          <div class="card rounded">
            <h1 class="text-center d-block p-4" >no friends</h1>
          </div>
        </div>
      </div>
      `;
      // get all post and convert the array to array from for map and adding display none
      Array.from((document.querySelectorAll("#card__post"))).map((item: any) => { item.style.cssText = `display: none !important;`}); 
    }else {
      console.log(res);
    }
  }).catch((e: AxiosError<{ message: string }>) => {
      console.log(e);
      createAlert(`error happend: ${e.response?.data?.message}` , AlertType.danger);
  });

}
