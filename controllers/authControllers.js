import ctrlWrapper from "../decorators/ctrlWrapper.js"
import HttpError from "../helpers/HttpError.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";
import { findUser, saveUser, updateUser } from "../services/authServices.js";

export const signup = async (req, res) => {
const {email} = req.body;

const checkEmail = await findUser({email});
 if(checkEmail) {
    throw HttpError(409, "Email already use")
 }
const newUser = await saveUser(req.body);

res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription
})


}

export const signin = async(req, res) => {
    const {email, password} = req.body;
    
    const checkEmail = await findUser({email});
    if(!checkEmail) {
        throw HttpError(401, "Email or password invalid")
    }
    const comparePassword = await compareHash(password, checkEmail.password);
    if(!comparePassword) {
        throw HttpError(401, "Email or password invalid")
    }
    const {_id: id} = checkEmail;
    const payload = {
        id,
    }
    console.log(checkEmail)
    const token = createToken(payload);

    await updateUser({_id: id}, {token})
    res.json({token});
}

const signout = async (req, res) => {
    const {_id} = req.user;
    const user = await findUser({_id});
    if(!user) {
        throw HttpError(401, "Not authorized")
    }
    await updateUser({_id}, {token: ""})
    res.status(204).json({
        message: "Signout success"
    })
}

const getCurrent = async (req, res) => {
    const user = req.user;
    if(!user) {
        throw HttpError(401,"Not authorized")
    }
    res.status(200).json({
        email: user.email,
        subscription: user.subscription
    })
}

const updateSub = async(req, res) => {
    const user = req.user;
    if(!user) {
        throw HttpError(401,"Not authorized")
    }
    const {subscription} = req.body;
    if(!subscription) {
        throw HttpError(401, "Subscription not valid")
    }
const updateSubscription = await updateUser({_id: user.id}, {subscription});
    res.status(201).json({
        message: "Success update subscription"
    });
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    signout: ctrlWrapper(signout),
    getCurrent: ctrlWrapper(getCurrent),
    updateSub: ctrlWrapper(updateSub)
}