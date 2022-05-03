import { Router } from "express";

const movies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
  },
];

export default function MoviesApi() {
  const router = Router();
  router.get("/", (req, res) => {
    res.json(movies);
  });
  router.post("/add", (req, res) => {
    res.sendStatus(200);
  });
  return router;
}
