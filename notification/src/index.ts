import Express from "express";

const server = Express();
const app = Express.Router();
const appConfig = {
  name: "notification server",
  port: process.env.PORT || 4002,
  baseUrl: "/",
};

app.get("/test", (req, res) => {
  res.send(`<h1>${appConfig.name} is running</h1>`);
});

server.use(appConfig.baseUrl, app);
server.listen(appConfig.port, () => console.log(`[-] notification server started on port ${appConfig.port}`));
