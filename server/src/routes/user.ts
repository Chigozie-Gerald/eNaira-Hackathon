import express, { Request as Req, Response as Res } from "express";
const router = express.Router();

router.post("/create", (req: Req, res: Res) => {
  res.send(`ok onBoard user`);
});

router.get("/get", (req: Req, res: Res) => {
  res.send(`ok get user`);
});

export default router;
