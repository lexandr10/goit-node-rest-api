import { Schema, model } from "mongoose";
import { emailRegexp } from "../constants/userCostants.js";
import { handlerSaveError, setUpSetting } from "./hooks.js";



const authSchema = new Schema({
    
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
          match: emailRegexp
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
        avatarURL: String,
        verify: {
          type: Boolean,
          default: false
        },
        vericationCode: {
          type: String
        }
      
}, {versionKey: false, timestamps: true})


authSchema.pre("findOneAndUpdate", setUpSetting);
authSchema.post("save", handlerSaveError);
authSchema.post("findOneAndUpdate", handlerSaveError);

const User = model("user", authSchema);

export default User;