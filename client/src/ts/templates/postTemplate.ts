import { templateCard, templateComment } from "../index.ts"
import { PostInfo, User, postInfoComments } from "../interface.ts";

/**
 * Generates the HTML template for a post.
 * @param item - The post information.
 * @param condition - A boolean condition.
 * @param user - The user information.
 * @returns A Promise that resolves to the generated HTML template as a string.
 */
async function postTemplate(item: PostInfo, condition: boolean, user: User): Promise<string> {
  const commentsArray: Array<postInfoComments> = item.comments as unknown as postInfoComments[] || [];
  const allComments: string = await templateComment(commentsArray, item._id);
  const post: string = `
      <h2 style="padding: 40px 0px 0px; color: white !important;">${item?.userId?.name} post</h2>
          ${templateCard(item, condition, item._id, item.title, user)}
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
