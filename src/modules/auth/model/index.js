import mongoose  from "mongoose";

const adminSchema = mongoose.Schema({
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

const adminModel = mongoose.model("access_detail", adminSchema);

export default adminModel;
