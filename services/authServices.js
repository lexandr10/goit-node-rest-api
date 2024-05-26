import User from "../models/users.js";
import bcrypt from "bcrypt";


export const findUser = filter => User.findOne(filter);

export const saveUser = async data => {
const hashPassword = await bcrypt.hash(data.password, 10);
return User.create({...data, password: hashPassword});
};

export const updateUser = (filter, data) => User.findByIdAndUpdate(filter, data);