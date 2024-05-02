/**
 * @param {object} postInfo - the object for the click card item
 * @param {object} idPost - the id for the clickDeleteButton function
 * @param {boolean} conditionEdit - the condition for show the delete and edit buttton
 * @param {HTMLDivElement} allComments - the html comments
 * @param {number} e - the id for post addingCommentFunction
 * @returns {HTMLDivElement} - return the post for the html tree
 */

import { templateCard, templateComment } from "../index.ts"

async function postTemplate(item: any, condition: boolean): Promise<string> {

  const allComments: string = await templateComment(item.comments, item._id);

  const post: string = `
      <h2 style="padding: 40px 0px 0px; color: white !important;">${item?.userId?.name} post</h2>
          ${templateCard(item, condition, item._id, item.title, item)}
          <!-- Comments Section -->
            <br />
          <div class="comments-section">
            <h3 style="text-decoration: underline; margin-bottom: 20px; width: 300px;">Comments</h3>
          </div>
        </div>
        <div data-mdb-input-init class="form-outline mb-4">
          <input type="text" id="addComment" class="form-control" placeholder="Type comment..." />
          <button class="btn btn-success mt-2 w-100 text-center" type="button" onclick="handleAddingComment('${item._id}')">+ Add a comment</button>
        </div>
      <div class="input-group" style="width: 100%;">
        ${allComments}
      </div>
`;
  return post;
}
export default postTemplate;
