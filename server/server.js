import express, { Router } from "express";
import * as path from "path";
import articlesApi from "./articlesApi.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import profileApi from "./profileApi.js";
import loginApi from "./loginApi.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const mongoClient = new MongoClient(process.env.MONGODB_URI);
mongoClient.connect().then(async () => {
  console.log("Connected to mongoDB");
  app.use("/api/articles", articlesApi(mongoClient.db("pg6301")));
  app.use("/api/profile", profileApi(mongoClient.db("pg6301")));
  app.use("/api/login", loginApi(mongoClient.db("pg6301")));
});

app.use(express.static("../client/dist/"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

app.get("/api/login-info", (req, res) => {
  res.json({
    auth: {
      client_id:
        "458398509144-96ll50575hbbb30at7bice2p008ruu1e.apps.googleusercontent.com",
      discovery_endpoint:
        "https://accounts.google.com/.well-known/openid-configuration",
      response_type: "token",
      scope: "email profile",
    },
  });
});

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on http://localhost:${server.address().port}`);
});
