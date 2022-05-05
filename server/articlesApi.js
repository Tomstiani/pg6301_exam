import { Router } from "express";
import { ObjectId } from "mongodb";

export default function articlesApi(db) {
  const router = Router();

  router.get("/", async (req, res) => {
    const articles = await db.collection("articles").find().toArray();
    res.json(articles);
  });

  router.post("/", async (req, res) => {
    const form = req.body;
    const article = {
      author: {
        name: form.author.name,
        id: form.author.id,
      },
      thumbnail: {
        title: form.thumbnailTitle,
        img: form.thumbnailImage,
      },
      content: {
        title: form.title,
        subtitle: form.subtitle,
        img: form.img,
        text: form.text,
      },
      topics: form.tags.split(","),
    };
    console.log("Created article:", article);
    await db.collection("articles").insertOne(article, (err, result) => {
      if (err) {
        console.log("Error:", err);
        res.status(500).send("Error");
      } else {
        res.status(200).send("OK");
      }
    });
  });

  router.get("/:id", async (req, res) => {
    const article = await db.collection("articles").findOne({
      _id: ObjectId(req.params.id),
    });
    res.json(article);
  });

  return router;
}
