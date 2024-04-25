import { User } from "../interface.ts";

/**
 * for show the user profile and all his post 
 * @param {object} user - for the user info
 * @param {HTMLDivElement} allPostUser - for the html posts for the user
 * @returns {HTMLDivElement} - return the userProfilePage for user
 */
function userProfilePage(user: User, allPostUser: any): string {
  let userProfile = `
  <!-- icons for create icon -->
  <i id="icon__adding" class="bi bi-plus-circle-fill" data-bs-toggle="modal" data-bs-target="#create-post-modal"
    title="adding post"></i>

  <section class="h-100 profile__user mt-2" style = "background-color: #f4f5f7; color: black;" >
          <div class="container profile__user py-2 h-100 w-100">
            <div class="row d-flex justify-content-center align-items-center">
              <div class="col col-lg-9 mb-4 mb-lg-9">
                <div class="card mb-3" style="border-radius: .5rem;">
                  <div class="row g-0">
                    <div class="col-md-4 text-center text-white"
                      style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;  background-image: radial-gradient(circle, #051937, #09485f, #3f7a7d, #84ac98, #d2dcbc);">
                      ${typeof user.profile_image === "string" ?
      `<img src="${user.profile_image}" alt="Avatar1" class="img-fluid my-5" style="width: 80px; height: 80px; border-radius: 50% !important;" />`
      :
      `<img src="images/icons8-user-48.png" alt="Avatar2" class="img-fluid my-5" style="width: 80px; height: 80px; border-radius: 50% !important;" />`
    }
                      <h5 class="text-white">${user.username}</h5>
                      <i class="far fa-edit mb-5"></i>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body p-4">
                        <h6>Information</h6>
                        <hr class="mt-0 mb-4">
                          <div class="row pt-1 text-white">
                            <div class="col-6 mb-3">
                              <h6>Email</h6>
                              <p class="text-muted text-white" style="color: white !important;">${user.email}</p>
                            </div>
                            <div class="col-6 mb-3">
                              <h6>Phone</h6>
                              <p style="color: white !important;" class="text-muted text-white">123 456 789</p>
                            </div>
                          </div>
                          <h6>Activites</h6>
                          <hr class="mt-0 mb-4">
                            <div class="row pt-1">
                              <div class="col-6 mb-3">
                                <h6>Recent Posts</h6>
                                <p style="color: white !important;" class="text-muted">${user.posts_count}</p>
                              </div>
                              <div class="col-6 mb-3">
                                <h6>Comments Counts</h6>
                                <p style="color: white !important;" class="text-muted">${user.comments_count}</p>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  <h2 style="text-decoration: underline; font-weight: bold;"> Posts User </h2>
                  ${allPostUser}
                </div>
              </div>
            </div>
          </section>
    `
  return userProfile;
}
export default userProfilePage;
