import mongoose, { Schema, model, Types } from "mongoose";

// reply schema
const replySchema = new Schema(
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
    commentId: {
        type: Types.ObjectId,
        ref: "Comment",
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
    timestamps: true
  }
);


// for th reply schema 
replySchema.pre("find", function () {
  this.where({ isDeleted: false });
});

// export the modal
const replyModel = mongoose.models.Reply || model("Reply", replySchema);
export default replyModel;
