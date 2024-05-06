import { user } from "../storeData";
import { CustomWindowFriendsList, User } from "../interface";
import {removeConnection, addingConnection} from "../index"
import { handleUserProfile , loaderHandler} from "../index"


export default async function updateNavFriendMenu() {
  loaderHandler(true)

  const customWindow: CustomWindowFriendsList = window as unknown as CustomWindowFriendsList;
  
  customWindow.removeConnection = removeConnection;
  customWindow.addingConnection = addingConnection;

  const element: HTMLElement = (document.getElementById("dropmenu__wrapper__friends") as HTMLElement);

  if (user!.value!.connections!.requested.length <= 0) {
    element.innerHTML = `
          <h4 class="text-white text-decoration-underline d-block w-100 text-center p-5">
              Empty
          </h4>
      `;
      loaderHandler(false)
  } else {
    // console.log(user);
    const token: string = localStorage.getItem("token") || "";
    element.innerHTML = ``;
    const allData = user.value?.connections?.requested.map(async (item: string) => {
      return await handleUserProfile(token, item).then((res: User) => {
        // sample template for user profile request friend
        element.innerHTML = `
         <div class="" id="friends__wrapper">
              <div class="d-flex justify-content-between gap-1 flex-row px-4">
                  <div class=" d-flex align-items-center  gap-2 hover-pointer" type="button" onclick=showUserInfo('${res._id}')>
                    ${res?.images?.profile?.url ?
            `<img class="img-xs rounded-circle mr-2" src=${res.images.profile.url} alt="" />`
            :
            `<img class="img-xs rounded-circle mr-2" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />`
          }
                      <div class="ml-2 mx-2">
                          <h6>${res.name}</h6>
                      </div>
                  </div>

                  <div class="d-flex align-items-center gap-0 justify-content-center">
                    <button class="btn btn-icon" type="button">
                      <i id="accepted__icon" class="bi bi-bookmark-check-fill text-white p-0 m-0" onclick="addingConnection('${res._id}')" ></i>
                    </button>
                   <!-- <button class="btn btn-icon" > -->
                        <!--<i id="trash__icon" class="bi bi-x-circle-fill" onclick="removeConnection('${res._id}')" ></i> -->
                    <!--</button> -->
                  </div>
              </div>
          </div>
      `;
      loaderHandler(false)
      });
    })

    element.innerHTML = `
      `;

  };
};
