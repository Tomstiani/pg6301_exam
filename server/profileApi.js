import { Router } from "express";

export default function profileApi(db) {
  const router = Router();

  router.post("/change-role", async (req, res) => {
    const { user, role } = req.body;
    try {
      await db
        .collection("users")
        .updateOne({ email: user.email }, { $set: { role: role } });
      res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
  });

  return router;
}
