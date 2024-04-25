import mongoose, { Schema, model, Types } from "mongoose";

// post schema
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: [{}],
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactions: {
      like: [{ type:Types.ObjectId, ref: 'User' }],
      celebrate: [{ type:Types.ObjectId, ref: 'User' }],
      support: [{ type:Types.ObjectId, ref: 'User' }],
      insightful: [{ type:Types.ObjectId, ref: 'User' }],
      funny: [{ type:Types.ObjectId, ref: 'User' }],
      love: [{ type:Types.ObjectId, ref: 'User' }]
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true , transform: function(doc, ret) {
      ret.id = undefined;
    } },
    toObject: { virtuals: true },
  }
);

// virtual populate for comments
postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId'
})

// react to post
postSchema.methods.react = function(userId, reaction) {
  this.reactions.set(userId, reaction);
  return this.save();
};

// virtual populate for user and comments
postSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

// export the model
const postModel = mongoose.models.Post || model("Post", postSchema);
export default postModel;
