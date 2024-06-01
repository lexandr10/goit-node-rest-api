import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import { findUser} from "../services/authServices.js";
import compareHash from "../helpers/compareHash.js";


const {DB_TEST_HOST} = process.env;
const port = process.env.PORT || 4000;

describe("test /api/users/login", () => {
    let server = null;
    beforeAll(async() => {
        await mongoose.connect(DB_TEST_HOST);
        server = app.listen(port);
    })
    afterAll(async() => {
await mongoose.connection.close();
server.close()
    })

    test("Test login when data is correct", async() => {

const loginData = {
    email: 'sfwfwf@gmail.com',
    password: "123456"
}

const {statusCode, body} = await request(app).post("/api/users/login").send(loginData);
expect(statusCode).toBe(200);
expect(body.user.email).toBe(loginData.email);
expect(body.user.subscription).toBe("starter");
expect(body.token).not.toBeNull();

const user = await findUser({email: loginData.email});
const comparePass = await compareHash(loginData.password, user.password);

expect(user).not.toBeNull();
expect(user.token).not.toBeNull();
expect(user.email).toBe(loginData.email);
expect(comparePass).toBe(true);
    })
})