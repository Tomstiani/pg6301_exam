import { Router } from "express";

export default function articlesApi(db) {
  const router = Router();

  router.get("/", async (req, res) => {
    const articles = await db.collection("articles").find().toArray();
    res.json(articles);
  });

  router.post("/add", (req, res) => {
    res.sendStatus(200);
  });
  return router;
}
