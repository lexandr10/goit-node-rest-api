import ctrlWrapper from "../decorators/ctrlWrapper.js"
import HttpError from "../helpers/HttpError.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";
import { findUser, saveUser, updateUser } from "../services/authServices.js";
import gravatar from "gravatar"
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

const avatarsPath = path.resolve("public", "avatars");

export const signup = async (req, res) => {
const {email} = req.body;
const avatar = gravatar.url(email, {s: "250"});
const checkEmail = await findUser({email});
 if(checkEmail) {
    throw HttpError(409, "Email already use")
 }
const newUser = await saveUser({...req.body, avatarURL: avatar});

res.status(201).json({
    user: {
        email: newUser.email,
        subscription: newUser.subscription
    }
   
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
    res.json({
        token,
        user: {
            email: checkEmail.email,
            subscription: checkEmail.subscription
        }
    });
}

const signout = async (req, res) => {
    const {_id} = req.user;
    const user = await findUser({_id});
    if(!user) {
        throw HttpError(401, "Not authorized")
    }
    await updateUser({_id}, {token: ""})
    res.status(204).json({
        user: {
            email: user.email,
            subscription: user.subscription
        }
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

export const changeAvatar = async (req, res) => {
const {path: oldPath, filename} = req.file;
const newPath = path.join(avatarsPath, filename);
await fs.rename(oldPath, newPath);
const avatar = path.join("avatars", filename);
const changeSize = Jimp.read(newPath, (err, av) => {
if(err) throw HttpError(401, err);
av.resize(250, 250).write(newPath);
})
const user = req.user;
if(!user) {
    throw HttpError(401, "Not authorized")
}
const updateAvatar = await updateUser({_id: user.id}, {avatarURL: avatar});

res.json({
    message: "Success update Avatar",
    avatarURL:avatar
})


}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    signout: ctrlWrapper(signout),
    getCurrent: ctrlWrapper(getCurrent),
    updateSub: ctrlWrapper(updateSub),
    changeAvatar: ctrlWrapper(changeAvatar)
}