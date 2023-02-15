import { Response } from "express";
import { RequestDefention } from "../defeniton.js";
import * as auth from "./auth.js";
import validator from "validator";
import { createError } from "../util.js";

export const getUserData = (req: RequestDefention, res: Response) => {
  const userData: { name: string; photoURL: string; email: string; steps: number } = {
    name: req?.user?.name,
    photoURL: req?.user?.photoURL,
    email: req?.user?.email,
    steps: req?.user?.steps,
  };
  res.send({ error: false, data: userData });
};

export const signIn = async (req: RequestDefention, res: Response) => {
  try {
    // creates user
    const resData = await auth.signInUser(req.body);
    // sending response
    res.send({ error: false, ...resData });
  } catch (error) {
    res.status(error.code);
    res.send({ error: true, ...error });
  }
};

export const generateAccessToken = async (req: RequestDefention, res: Response) => {
  try {
    const refreshToken = req.headers["authorization"]?.split(" ")[1];
    if (!validator.default.isJWT(refreshToken + "")) throw createError(400, "Invalid refresh token");
    const NewAccessTocken = await auth.getNewAccessTockenFromRefreshToken(refreshToken);
    // sending new access token
    res.send({ error: false, data: { accessToken: NewAccessTocken } });
  } catch (error) {
    res.status(error.code);
    res.send({ error: true, ...error });
  }
};
