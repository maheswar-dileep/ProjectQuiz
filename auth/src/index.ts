import Express from "express";
import cors from "cors";
import * as auth from "./controller/auth.js";
import checks from "./controller/checks.js";
import * as controller from "./controller/middleware.js";

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

// Main Routes
app.get("/user_data", auth.mustLoginAsUser, controller.getUserData);
app.post("/signin", controller.signIn);
app.post("/generate_access_token", controller.generateAccessToken);

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
