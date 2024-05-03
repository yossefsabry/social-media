import { formatTimestamp, deleteUser } from "../index"
import { User } from "../interface";

/**
 * Generates the HTML template for the user's about profile.
 * @param user - The user object containing the profile information.
 * @param condition - A boolean value indicating whether certain buttons should be displayed.
 * @returns The HTML template string for the user's about profile.
 */
export default function userAboutProfile(user: User, condition: boolean): string {
    console.log(user)
    const data = `
                  <div class="card-body">
                      <div class="d-flex align-items-center justify-content-between mb-2">
                          <h6 class="card-title mb-0">About</h6>
                      </div>
                      <p>${user.headline ? user.headline : `Hi! I'm ${user?.name} the Senior UI Designer at Vibrant. We hope you enjoy the design and quality of Social.`}</p>
                      <div class="mt-3">
                          <label class="tx-11 font-weight-bold mb-0 text-uppercase">Joined:</label>
                          <p class="text-muted">$${formatTimestamp(user.createdAt)}</p>
                      </div>
                      <div class="mt-3">
                          <label class="tx-11 font-weight-bold mb-0 text-uppercase">Lives:</label>
                          <p class="text-muted">New York, USA</p>
                      </div>
                      <div class="mt-3">
                          <label class="tx-11 font-weight-bold mb-0 text-uppercase">Email:</label>
                          <p class="text-muted">${user?.email}</p>
                      </div>
                      <div class="mt-3">
                          <label class="tx-11 font-weight-bold mb-0 text-uppercase">gender:</label>
                          <p class="text-muted">${user?.gender}</p>
                      </div>
                      <div class="mt-3">
                          <label class="tx-11 font-weight-bold mb-0 text-uppercase">phone number:</label>
                          <p class="text-muted">${user?.phone}</p>
                      </div>
                      <div class="mt-3">
                          <label class="tx-11 font-weight-bold mb-0 text-uppercase">age: </label>
                          <p class="text-muted">${user?.age}</p>
                      </div>
                      <div class="mt-3">
                          <label class="tx-11 font-weight-bold mb-0 text-uppercase">status: </label>
                          <p class="text-muted">${user?.status}</p>
                      </div>
                        ${condition == true ?
            `<button class="btn btn-primary" id="update__user__info__button"
                            type="button" data-bs-toggle="modal" data-bs-target="#update-user-info-modal" data-bs-whatever="@mdo"
                            >update</button>

                            <button class="btn btn-secondary" id="update__password__button"
                            type="button" data-bs-toggle="modal" data-bs-target="#update-user-password-modal" data-bs-whatever="@mdo"
                            >update password</button>
                            
                            <!-- <button class="btn btn-danger" id="delete__user__button" onClick="deleteUser()">delete user</button> -->`
            : ""}
                  </div>
    `;
    return data;
};