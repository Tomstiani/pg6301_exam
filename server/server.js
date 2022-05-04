import express, { Router } from "express";
import * as path from "path";
import MoviesApi from "./moviesApi.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fetch from "node-fetch";

dotenv.config();

const app = express();

const mongoClient = new MongoClient(process.env.MONGODB_URI);
mongoClient.connect().then(async () => {
  console.log("Connected to mongoDB");
  app.use("/api/movies", MoviesApi(mongoClient.db("pg6301")));
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

app.post("/api/login", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token, { signed: true });
  res.sendStatus(200);
});

app.get("/api/login", async (req, res) => {
  const { access_token } = req.signedCookies;

  const { userinfo_endpoint } = await fetchJSON(
    "https://accounts.google.com/.well-known/openid-configuration"
  );

  const userInfo = await fetchJSON(userinfo_endpoint, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  res.json({ userInfo });
});

app.use(express.static("../client/dist/"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on http://localhost:${server.address().port}`);
});
