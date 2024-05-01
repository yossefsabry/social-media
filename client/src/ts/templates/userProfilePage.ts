import { User } from "../interface.ts";
import { suggestUserProfile, userCoverProfile, userAboutProfile } from "../index.ts";

/**
 * for show the user profile and all his post 
 * @param {object} user - for the user info
 * @param {HTMLDivElement} allPostUser - for the html posts for the user
 * @returns {HTMLDivElement} - return the userProfilePage for user
 */
async function userProfilePage(user: any, allPostUser: any, condition: boolean): Promise<string> {
//   console.log(allPostUser)

  let userProfile = `
  <div class="profile-page tx-13">
      <div class="row">
        ${await userCoverProfile(user, condition)}
      </div>
      <div class="row profile-body">
          <!-- left wrapper start -->
          <div class="d-md-block col-md-12 col-xl-6 left-wrapper">
              <div class="card rounded">
                ${userAboutProfile(user, condition)}
              </div>
          </div>
          <!-- left wrapper end -->

          <!-- right wrapper start -->
          <div class="d-xl-block col-xl-6 right-wrapper">
              <div class="row">
              ${suggestUserProfile()}
              </div>
          </div>
          <!-- right wrapper end -->

          <!-- middle wrapper start -->
          <div class="col-md-12 col-xl-12 middle-wrapper">
              <div class="row">
                  <div class="col-md-12 grid-margin">
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
