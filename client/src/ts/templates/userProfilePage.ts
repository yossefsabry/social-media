import { User } from "../interface.ts";
import { suggestUserProfile, userCoverProfile, userAboutProfile } from "../index.ts";
import { user as userProfile } from "../storeData.ts";

/**
 * for show the user profile and all his post 
 * @param {object} user - for the user info
 * @param {HTMLDivElement} allPostUser - for the html posts for the user
 * @returns {HTMLDivElement} - return the userProfilePage for user
 */
async function userProfilePage(user: User, allPostUser: any, condition: boolean): Promise<string> {

  let userLogin = localStorage.getItem("user");
  let userValue: User | null;
  let UserId: number | null;
  const userString: string | null = localStorage.getItem("user");
  if (userString !== null) {
    userValue = JSON.parse(userString);
    UserId = userValue!._id;
  };

  // console.log(user)
  // some for check if the user is friend or not if the all element in the array is false the user is not friend else is friend
  let conditionFriend: boolean | undefined = user.connections?.accepted.some((element: any) => element._id == UserId);
  let userProfile = `
  <div class="profile-page tx-13">
      <div class="row">
        ${await userCoverProfile(user, condition)}
      </div>
      ${ user._id !== UserId! ? `
          <div class="text-end d-block">
            ${ conditionFriend ? ` 
                <button class="btn btn-outline-danger btn-icon-text btn-rounded" onclick="removeConnection('${user._id}')">  
                  remove friend
                </button>`
              
            : `<button class="btn btn-outline-primary btn-icon-text btn-rounded" onclick="requestConnection('${user._id}')" >  
                    add friend
                  </button>`
              }
          </div>`
          : "" 
        }
      <div class="row profile-body" id="profile__body__user" >
          <!-- left wrapper start -->
          <div class="d-md-block ${condition ? 'col-md-12 col-xl-6' : ' col-md-24 col-xl-24'} left-wrapper">
              <div class="card rounded">
                ${userAboutProfile(user, condition)}
              </div>
          </div>
          <!-- left wrapper end -->

          <!-- right wrapper start -->
          <div class="d-xl-block col-xl-6 right-wrapper">
              <div class="row">
              ${await suggestUserProfile(condition)}
              </div>
          </div>
          <!-- right wrapper end -->

          <!-- middle wrapper start -->
          <div class="col-md-12 col-xl-12 middle-wrapper" id="all__posts__profile">
              <div class="row">
                  <div class="col-md-12 grid-margin mb-5">
                      <hr />
                      <h2 class="text-3xl text-center white">uesr posts</h2>
                      ${allPostUser}
                  </div>
              </div>
          </div>
          <!-- middle wrapper end -->
      </div>
  </div>
    `
  return userProfile;
}
export default userProfilePage;
