import axios, { AxiosError, AxiosResponse } from "axios";
import { url } from "../storeData";
import { User } from "../interface";


/**
 * Retrieves suggested user profiles based on a condition.
 * 
 * @param condition - A boolean value indicating whether to include suggested user profiles or not.
 * @returns A Promise that resolves to a string containing the HTML representation of the suggested user profiles.
 */
export default async function suggestUserProfile(condition: boolean): Promise<string> {
        const token: string = localStorage.getItem("token") || "";
        let content: Array<string>;
        const headers: { authorization: string } = {
            authorization: `bearer_${token}`,
        }
        await axios.get(`${url}/user/suggestUsers`, { headers: headers }).then((res: AxiosResponse) => {
               content = res.data.results.map((item: User) => {
                // console.log(item);
                    return `
                          <div class="card-body">
                              <div class="d-flex justify-content-between">
                                  <div class="d-flex align-items-center hover-pointer" onclick=showUserInfo('${item._id}')>
                                    ${item?.images?.profile?.url ?  
                                        `<img class="img-xs rounded-circle" src=${item.images.profile.url} alt="" />`
                                    : 
                                        `<img class="img-xs rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />`
                                    }
                                      <div class="ml-2">
                                          <p>${item.name}</p>
                                          <p class="tx-11 text-muted">${item?.connections?.accepted?.length} firends list</p>
                                      </div>
                                  </div>
                                  <button class="btn btn-icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus" data-toggle="tooltip" title="" data-original-title="Connect">
                                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                          <circle cx="8.5" cy="7" r="4"></circle>
                                          <line x1="20" y1="8" x2="20" y2="14"></line>
                                          <line x1="23" y1="11" x2="17" y2="11"></line>
                                      </svg>
                                  </button>
                              </div>
                          </div>
                    `;
               }).join('');
        }).catch((e: AxiosError) => { 
            console.log(e);
        });


    const data = `
        ${ condition ? 
                  `<div class="col-md-12 grid-margin">
                      <div class="card rounded">
                        ${content!}
                      </div>
                  </div>`
                : ""
            }
   `;

    return data;
};