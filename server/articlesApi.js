import { Router } from "express";
import { ObjectId } from "mongodb";

export default function articlesApi(db) {
  const router = Router();

  router.get("/", async (req, res) => {
    const articles = await db.collection("articles").find().toArray();
    res.json(articles);
  });

  router.post("/add", (req, res) => {
    res.sendStatus(200);
  });

  router.get("/:id", async (req, res) => {
    const article = await db.collection("articles").findOne({
      _id: ObjectId(req.params.id),
    });
    res.json(article);
  });
  return router;
}
