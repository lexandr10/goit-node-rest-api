import Joi from "joi";
import { emailRegexp } from "../constants/userCostants.js";


export const signupSchema = Joi.object({
password: Joi.string().required(),
email: Joi.string().required().pattern(emailRegexp),
subscription: Joi.string().default("starter").valid("starter", "pro", "business"),

})

export const signinSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required().pattern(emailRegexp)
})