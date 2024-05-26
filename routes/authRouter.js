import express from "express";
import emptyMiddleware from "../middlewares/isEmptyMiddleware.js";
import validateBody from "../helpers/validateBody.js";
import { signinSchema, signupSchema } from "../schemas/authSchemas.js";
import authControllers from "../controllers/authControllers.js";
import authorization from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", emptyMiddleware, validateBody(signupSchema), authControllers.signup)

authRouter.post("/login", emptyMiddleware, validateBody(signinSchema), authControllers.signin)

authRouter.post("/logout",  authorization, authControllers.signout);

authRouter.get("/current", authorization, authControllers.getCurrent);

authRouter.patch("/", authorization, authControllers.updateSub);

export default authRouter;