import bcrypt from "bcrypt";

const compareHash = (pass, hashPass) => bcrypt.compare(pass, hashPass);

export default compareHash;