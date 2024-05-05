import postModel from "../../../../DB/models/post.model.js";
import commentModel from "../../../../DB/models/comment.model.js";
import cloudinary from "../../../Utlis/cloudinary.js";
import { asyncHandler } from "../../../Utlis/ErrorHandeling.js";

/**
 * Get all posts.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object with the list of posts.
 */
export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = res.paginatedResults
  const lastPage = res.lastPage
  return res.status(200).json({
    status: "success", posts_count: posts.length, pageInfo: req.query, lastPage: lastPage,
    results: posts
  });
});

/**
 * Get all posts owned by the user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with the list of posts.
 */
export const getAllPostsOwner = asyncHandler(async (req, res, next) => {
  console.log("get user  posts");
  const posts = res.paginatedResults
  const lastPage = res.lastPage
  console.log("finsh user  posts");
  return res.status(200).json({
    status: "success", posts_count: posts.length, pageInfo: req.query, lastPage: lastPage,
    results: posts
  });
});

/**
 * Retrieves all posts of a public user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with the retrieved posts.
 */
export const getAllPostsPublicUser = asyncHandler(async (req, res, next) => {
  const posts = res.paginatedResults
  const lastPage = res.lastPage
  return res.status(200).json({
    status: "success", posts_count: posts.length, pageInfo: req.query, lastPage: lastPage,
    results: posts
  });
});

// /** Fix the get user
//  * Get a post by its ID.
//  *
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  * @param {Function} next - The next middleware function.
//  * @returns {Object} The response object with the post data.
//  * @throws {Error} If the post ID does not exist.
//  */
// export const getPostById = asyncHandler(async (req, res, next) => {
//   // console.log(req)
//   const posts = res.paginatedResults
//   // const post = await postModel.findById(req.params.post_id)
//   // const commentPost = await commentModel.find({ postId: req.params.post_id });
//   if (!posts) {
//     return next(new Error('Post ID not Exist', { cause: 404 }))
//   }
//   return res.status(200).json({ status: "success", post: { posts } });
// });

/**
 * Add a new post.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object containing the status, message, and created post.
 */
export const addPost = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  let post = await postModel.create({ title, userId: req.user._id });
  if (req.files.length != 0) {
    for (const file of req.files) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { folder: `${process.env.APP_NAME}/posts/${post._id}/images` }
      );
      post = await postModel.findByIdAndUpdate(
        post._id,
        { $push: { images: { url: secure_url, public_id } } },
        { new: true }
      );
    }
  }
  return res
    .status(201)
    .json({ status: "success", message: "Post created Successfully", post });
});

/**
 * Update a post.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The updated post.
 * @throws {Error} If the post ID does not exist.
 */
export const updatePost = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  if (!(await postModel.findById(req.params.post_id))) {
    return next(new Error("Post ID not Exist", { cause: 404 }));
  }
  const post = await postModel.findOneAndUpdate(
    { _id: req.params.post_id, userId: req.user._id },
    { title }
  );
  if (req.files.length != 0) {
    post.images = [];
    await post.save();

    await cloudinary.api.delete_resources_by_prefix(`posts/${post._id}`);
    for (const file of req.files) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { folder: `${process.env.APP_NAME}/posts/${post._id}/images` }
      );

      post.images.push({ url: secure_url, public_id });
    }
  }
  await post.save();
  return res
    .status(200)
    .json({ status: "success", message: "Post Updated Successfully" });
});

/**
 * Deletes a post.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with status and message.
 */
export const deletePost = asyncHandler(async (req, res, next) => {
  // console.log("welcomef rom the the request ot delete")
  if (!(await postModel.findById(req.params.post_id))) {
    return next(new Error("Post ID not Exist", { cause: 404 }));
  }
  const post = await postModel.findOneAndUpdate(
    { _id: req.params.post_id, userId: req.user._id },
    { isDeleted: true }
  );
  if (!post) {
    return next(new Error("you are not the owner of the post", { cause: 403 }));
  }
  return res
    .status(200)
    .json({ status: "success", message: "Post Deleted Successfully" });
});

/**
 * Like a post.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with status and post data.
 */
export const likePost = asyncHandler(async (req, res, next) => {
  const post = await postModel.findById(req.params.post_id)
  if (!post) {
    return next(new Error("Post ID not exist", { cause: 404 }));
  }
  for (const react of Object.keys(post.reactions)) {
    console.log(react)
    //console.log(post.reactions[1].includes(req.user._id));
    // console.log(post)
    if (post.reactions[react].includes(req.user._id)) {
      post.reactions[react].pull(req.user._id);
    }
  }
  post.reactions[req.query.react].addToSet(req.user._id);
  await post.save()
  return res.status(200).json({ status: "success", post });
});

/**
 * Unlike a post by removing the user's reaction.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with status and post data.
 */
export const unlikePost = asyncHandler(async (req, res, next) => {
  const post = await postModel.findById(req.params.post_id)
  if (!post) {
    return next(new Error("Post ID not exist", { cause: 404 }));
  }
  for (const react of Object.keys(post.reactions)) {
    if (post.reactions[react].includes(req.user._id)) {
      post.reactions[react].pull(req.user._id);
    }
  }
  await post.save()
  return res.status(200).json({ status: "success", post });
});

/**
 * Updates the privacy setting of a post to private.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The updated post object.
 * @throws {Error} If the user is not the owner of the post.
 */
export const privatePost = asyncHandler(async (req, res, next) => {
  const post = await postModel.findOneAndUpdate({ _id: req.params.post_id, userId: req.user._id }, { isPrivate: req.query.privacy }, { new: true }).select('isPrivate')
  if (!post) {
    return next(new Error('you are not the owner of the post', { cause: 403 }))
  }
  return res.status(200).json({ status: "success", post });
});
