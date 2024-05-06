import axios, { AxiosError } from "axios";
import { url } from "../storeData";
import createAlert from "../UI/createAlert";
import { AlertType, User } from "../interface";

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
    }

    else {
      console.log(res);
      element.innerHTML = ``;
      res.data.connections.accepted.map((item: any) => {
        console.log("item object id", item);
        axios.get(`${url}/user/${item.id}/profile`, { headers: headers }).then((res) => {
          let data: User = res.data.user;
          console.log(data);
          element.innerHTML += `
         <div class="" id="friends__wrapper">
              <div class="d-flex justify-content-between gap-1 flex-row px-4">
                  <div class=" d-flex align-items-center  gap-2 hover-pointer" type="button" onclick=showUserInfo('${data._id}')>
                    ${data?.images?.profile?.url ?
              `<img class="img-xs rounded-circle mr-2" src=${data.images.profile.url} alt="" />`
              :
              `<img class="img-xs rounded-circle mr-2" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />`
            }
                      <div class="ml-2 mx-2 text-white d-flex flex-column align-items-center justify-content-between pt-2">
                          <h6>name: ${data.name}</h6>
                          <p class="text-muted">friends: ${data?.connections?.accepted?.length}</p>
                      </div>
                  </div>

                  <div class="d-flex align-items-center gap-0 justify-content-center">
                    <button class="btn btn-icon" onclick="removeConnection('${data._id}')">
                        <i id="trash__icon" class="bi bi-x-circle-fill"></i>
                    </button>
                  </div>
              </div>
          </div>
      `;
        }).catch((e: AxiosError<{ message: string }>) => {
          console.log(e);
        })
      })



    }
    // get all post and convert the array to array from for map and adding display none
    Array.from((document.querySelectorAll("#card__post"))).map((item: any) => { item.style.cssText = `display: none !important;` });
  }).catch((e: AxiosError<{ message: string }>) => {
    console.log(e);
    createAlert(`error happend: ${e.response?.data?.message}`, AlertType.danger);
  });

}
