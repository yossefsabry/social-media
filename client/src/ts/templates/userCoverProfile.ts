import axios from "axios";
import { url } from "../storeData";
import { headerLinks } from "../index";

export default async function userCoverProfile(user: any, condition: boolean) {
    let userFriends: number | "" = "" ;
    const token: string = localStorage.getItem("token") || "";
    const headers: any = {
        authorization: `bearer_${token}`,
    }
    if (condition == true) {
        await axios.get(`${url}/user/connections`, { headers: headers }).
            then((res) => {
                // console.log(res)
                userFriends = res.data.connections.accepted.length;
            })
    }
    const data = `
          <div class="col-12 grid-margin mt-5">
              <div class="profile-header">
                  <div class="cover">
                      <div class="gray-shade"></div>
                      <figure>
                        ${user?.images?.cover?.url ?
                            `<img src="${user?.images?.cover?.url}" alt="Avatar1" class="img-fluid image__cover" alt="profile cover" />
                            `
                            :
                            `<img src="https://bootdey.com/img/Content/bg1.jpg" class="img-fluid image__cover" alt="profile cover">`
                        }
                      </figure>
                      <div class="cover-body d-flex justify-content-between align-items-center">
                          <div>

                            ${user?.images?.profile?.url ?
            `<img src="${user?.images?.profile?.url}" alt="Avatar1" class="profile-pic" alt="profile" />
            <i class="bi bi-images icon__change__profile" type="button" data-bs-toggle="modal" data-bs-target="#image_profile_modal"
              data-bs-whatever="@mdo"></i>
            `

            :
            `<img class="profile-pic" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="profile">`
        }
                              <span class="profile-name">${user?.name}</span>
                          </div>
                          ${ condition == true ?
                            `<div class="d-none d-md-block">
                                <button class="btn btn-primary btn-icon-text btn-edit-profile"  data-bs-toggle="modal" data-bs-target="#image_cover_modal"
              data-bs-whatever="@mdo">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit btn-icon-prepend">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg> Edit cover
                                </button>
                            </div>`
                            :  ""
                            }
                      </div>
                  </div>
                  ${condition == true ?
                    headerLinks(userFriends)
            : ""}
              </div>
          </div>
    `;
    return data
}