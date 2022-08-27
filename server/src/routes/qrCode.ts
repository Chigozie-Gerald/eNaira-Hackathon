import express, {
  Request as Req,
  Response as Res,
  NextFunction as Next,
} from "express";
import { ErrorHandler } from "../errorHandler/errorHandler";
import { Product } from "../helpers/modelDist";
import { axios, url } from "../https";
import QRCode from "qrcode";
const router = express.Router();

router.post("/product_create", async (req: Req, res: Res) => {
  const {
    name,
    price,
    description,
    UserBVN,
  }: {
    name: string;
    price: number;
    description?: string;
    UserBVN: string;
  } = req.body;

  const product = await Product.create({
    name,
    price,
    description,
    UserBVN,
  });

  const productJSON = JSON.stringify({ productId: product.id });
  const url = await QRCode.toDataURL(productJSON, { version: 2 });
  res.send({
    url,
  });
});

router.post("/preview", async (req: Req, res: Res, next: Next) => {
  try {
    const { productId } = req.params as unknown as { productId: number };
    const product = await Product.findByPk(productId);
    if (product) {
      const BVN = product.UserBVN;
      const merchantInfo = (
        await axios.post(url.BVN, {
          channel_code: "APISNG",
          bvn: BVN,
        })
      ).data;
      res.send({
        merchantInfo,
        product,
      });
    } else {
      res.send(null);
    }
  } catch (err: any) {
    next(new ErrorHandler(400, err.message || ``));
  }
});

export default router;
