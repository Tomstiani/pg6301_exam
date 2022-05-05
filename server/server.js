import express, { Router } from "express";
import * as path from "path";
import articlesApi from "./articlesApi.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fetch from "node-fetch";
import profileApi from "./profileApi.js";

dotenv.config();

const app = express();

const mongoClient = new MongoClient(process.env.MONGODB_URI);
mongoClient.connect().then(async () => {
  console.log("Connected to mongoDB");
  app.use("/api/articles", articlesApi(mongoClient.db("pg6301")));
  app.use("/api/profile", profileApi(mongoClient.db("pg6301")));
});

const fetchJSON = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
};

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

let isLoggedIn = false;

app.post("/api/login", (req, res) => {
  //If user wants to log in
  if (req.body.isLoggedIn === true) {
    const { access_token } = req.body;
    res.cookie("access_token", access_token, { signed: true });
    isLoggedIn = true;
    res.sendStatus(200);
  }
  //If user wants to log out
  else if (req.body.isLoggedIn === false) {
    isLoggedIn = false;
    res.sendStatus(200);
  }
});

app.get("/api/login", async (req, res) => {
  const { access_token } = req.signedCookies;

  const { userinfo_endpoint } = await fetchJSON(
    "https://accounts.google.com/.well-known/openid-configuration"
  );

  let userInfo;

  try {
    userInfo = await fetchJSON(userinfo_endpoint, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    //Check if user exists in database
    await mongoClient
      .db("pg6301")
      .collection("users")
      .findOne({
        email: userInfo.email,
      })
      .then((user) => {
        if (!user) {
          //If user doesn't exist, create a new user
          mongoClient.db("pg6301").collection("users").insertOne({
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
            role: "user",
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.send(error);
  } finally {
    const user = await mongoClient.db("pg6301").collection("users").findOne({
      email: userInfo.email,
    });
    res.json({ userInfo: user, isLoggedIn: isLoggedIn });
  }
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
