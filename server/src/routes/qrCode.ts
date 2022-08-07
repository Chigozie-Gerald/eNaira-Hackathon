import express, { Request as Req, Response as Res } from "express";
const router = express.Router();

router.post("/generate", (req: Req, res: Res) => {
  res.send(`ok generate qr code`);
});

router.post("/preview", (req: Req, res: Res) => {
  res.send(`ok preview qr code`);
});

export default router;
