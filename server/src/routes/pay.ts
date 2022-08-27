import express, {
  Request as Req,
  Response as Res,
  NextFunction as Next,
} from "express";
import { ErrorHandler } from "../errorHandler/errorHandler";
const router = express.Router();

router.post("/", async (req: Req, res: Res, next: Next) => {
  try {
    const {
      BVN,
      price,
      description,
      UserBVN,
    }: {
      BVN: string;
      price: number;
      description?: string;
      UserBVN: number;
    } = req.body;
  } catch (err: any) {
    next(new ErrorHandler());
  }
});

export default router;
