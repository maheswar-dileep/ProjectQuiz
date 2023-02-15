import Express from "express";
import validator from "validator";
import cors from "cors";

import { createError } from "./util.js";
import * as auth from "./auth.js";
import { RequestDefention } from "./defeniton.js";
import checks from "./checks.js";

const server = Express();
const app = Express.Router();

const appConfig = {
  name: "Auth_server",
  port: process.env.PORT || 4001,
  baseUrl: "/",
};

app.use(cors());
app.use(Express.json());
app.use(auth.authInit);
app.use(checks);

app.get("/user_data", auth.mustLoginAsUser, (req: RequestDefention, res) => {
  res.send({ error: false, data: req.user });
});

app.post("/signin", async (req, res) => {
  try {
    // creates user
    const resData = await auth.signInUser(req.body);
    // sending response
    res.send({ error: false, ...resData });
  } catch (error) {
    res.status(error.code);
    res.send({ error: true, ...error });
  }
});

app.post("/generate_refresh_token", async (req, res) => {
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
});

// test route
app.get("/test", (req, res) => res.send("<h1>Auth server is running...</h1>"));
app.use((req, res) => {
  // 404 messaage
  res.status(404);
  res.send({
    error: true,
    server: "auth",
    message: "The service you are looking for is not found on this server",
  });
});

// BASE_URL route of the server
server.use(`${appConfig.baseUrl}`, app);
server.listen(appConfig.port, () => console.log(`[-] Auth server started on port ${appConfig.port}`));

// Created by \u0052\u0045\u004D\u0049\u004E
