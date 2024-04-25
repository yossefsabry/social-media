import mongoose, { Schema, model, Types } from "mongoose";



// ocmmnet schema
const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    image: Object,
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Types.ObjectId,
      ref: "Post",
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
  },
  {
    // for the created at and updated at
    timestamps: true,
    // toObject: { virtuals: true } and mean that the virtuals will be shown in the response
    toJSON: { virtuals: true ,transform: function(doc, ret) {
        ret.id = undefined;
      }},
    toObject: { virtuals: true },
  }
);
// virtual populate for replies
commentSchema.virtual('replies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'commentId'
})
// virtual populate for user
commentSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

//  export the model
const commentModel = mongoose.models.Comment || model("Comment", commentSchema);
export default commentModel;
