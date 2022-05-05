import { Router } from "express";
import fetch from "node-fetch";

let isLoggedIn = false;

export default function loginApi(db) {
  const router = Router();

  router.post("/", (req, res) => {
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

  router.get("/", async (req, res) => {
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
      await db
        .collection("users")
        .findOne({
          email: userInfo.email,
        })
        .then((user) => {
          if (!user) {
            //If user doesn't exist, create a new user
            db.collection("users").insertOne({
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
      const user = await db.collection("users").findOne({
        email: userInfo.email,
      });
      res.json({ userInfo: user, isLoggedIn: isLoggedIn });
    }
  });

  return router;
}

const fetchJSON = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
};
