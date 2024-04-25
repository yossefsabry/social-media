/**
 * @param {object} postInfo - the object for the click card item
 * @param {object} idPost - the id for the clickDeleteButton function
 * @param {boolean} conditionEdit - the condition for show the delete and edit buttton
 * @param {HTMLDivElement} allComments - the html comments
 * @param {number} e - the id for post addingCommentFunction
 * @returns {HTMLDivElement} - return the post for the html tree
 */

import { PostInfoCard } from "../interface.ts";

function postTemplate(postInfo: PostInfoCard, idPostValue: number, conditionEdit: boolean, allComments: string[] , e: number): string {
      const post: string = `
      <h2 style="padding: 40px 0px 0px; color: white !important;">${postInfo.author.username} post</h2>
      <div class="card my-5">
       <div class="card-header">
          <img src="${postInfo.author.profile_image}" style="width: 40px; border-radius: 50%;" />
          <span onclick="showUserInfo('${encodeURIComponent(
        JSON.stringify(postInfo),
      )}')" style="cursor: pointer;"><strong>${postInfo.author.username}</strong></span>
            ${conditionEdit
          ? `<button class="btn btn-danger mx-2" style="float: right;" onclick="handleClickDeleteButton('${idPostValue}' )">Delete</button>`
          : ""
        }
            ${conditionEdit
          ? `<button class="btn btn-primary" style="float: right;" onclick={handleClickEditButton('${encodeURIComponent(
            JSON.stringify(postInfo),
          )}')}>edit</button>`
          : ""
        }
        </div>
        <div class="card-body">
          <img src="${postInfo.image}" alt="image post" style="width: 100%; height: 500px; padding-bottom: 3px;" />
          <h6 style="color: #777;">${postInfo.create_at}</h6>
          <h4>${postInfo.title}</h4>
          <p>${postInfo.body}</p>
          <hr />
          <div class="d-flex gap-3 justify-content-start align-items-center">
            <a href="#">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                </svg>
              </span>
              (${postInfo.comments_count}) Commits
            </a>
          </div>
          <!-- Comments Section -->
            <br />
          <div class="comments-section">
            <h3 style="text-decoration: underline; margin-bottom: 20px; width: 300px;">Comments</h3>
              ${allComments}
          </div>
        </div>
      <div class="input-group">
        <input id="comment__input" type="text" class="form-control py-2" placeholder="add comment..." aria-label="Enter something..." aria-describedby="button-addon">
        <button class="btn btn-primary" type="button" id="button-addon" onclick="handleAddingComment(${e})">Add Comment</button>
      </div>
      </div>
`;
        return post;
}
export default postTemplate;
