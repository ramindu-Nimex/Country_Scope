import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1EbhMbqdCA85UXXAxxXvcc0PN9xvHOZF6yYVUVRAYSlQC_B9aPU-tEdU&s",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;