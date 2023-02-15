import Express from "express";

const appConfig = {
  name: "Question server",
  port: process.env.PORT || 4003,
  baseUrl: "/",
};
const server = Express();
const app = Express.Router();

app.get("/test", (req, res) => {
  res.send(`<h1>${appConfig.name} is running</h1>`);
});

server.use(appConfig.baseUrl, app);
server.listen(appConfig.port, () => console.log(`[-] Question server started on port ${appConfig.port}`));
