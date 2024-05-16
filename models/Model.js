import { Schema, model } from "mongoose";
import { validateEmail, validatePhone } from "../constants/movieCostants.js";
import { handlerSaveError, setUpSetting } from "./hooks.js";

const contactsSchema = new Schema( {
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
        validate: {
            validator: validateEmail,
            message: 'Invalid email format'
        }
      },
      phone: {
        type: String,
        validate: {
            validator: validatePhone,
            message: "Invalid phone, correct format is (000-000-00-00)"
        }
      },
      favorite: {
        type: Boolean,
        default: false,
      },
}, {versionKey: false, timestamps: true})


contactsSchema.post("save", handlerSaveError);

contactsSchema.pre("findOneAndUpdate", setUpSetting)

contactsSchema.post("findOneAndUpdate", handlerSaveError)

const Contact = model("contact", contactsSchema);

export default Contact;