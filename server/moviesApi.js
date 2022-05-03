import { Router } from "express";

export default function MoviesApi(db) {
  const router = Router();

  router.get("/", async (req, res) => {
    const movies = await db.collection("movies").find().toArray();
    res.json(movies);
  });

  router.post("/add", (req, res) => {
    res.sendStatus(200);
  });
  return router;
}
