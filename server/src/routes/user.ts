import express, {
  Request as Req,
  Response as Res,
  NextFunction as Next,
} from "express";
import { ErrorHandler } from "../errorHandler/errorHandler";
import { axios, headers, url } from "../https";
const router = express.Router();

router.post("/create", async (req: Req, res: Res, next: Next) => {
  try {
    const response = (
      await axios.post(url.NIN, {
        searchParameter: "02730846093",
        verificationType: "NIN-SEARCH",
      })
    ).data;
    res.send(response);
    console.log(`response create`);
  } catch (err: any) {
    console.log(err.message, Object.keys(err.response), err.response);
    next(new ErrorHandler(400, err.message));
  }
});

router.get("/", async (req: Req, res: Res, next: Next) => {
  try {
    const response = (
      await axios.post(url.getBalance, {
        user_email: "test_user+access@bitt.com",
        user_token:
          "eyJhbGciOiJSUI1NiIsInR5cCI6IkpXVCJ9.eyJhbGlhcyI6IkB0YWNoLjAxZiIsImV4cGlyeSI6IjIwMjEtMDktMjdUMTM6MjU6NDMuMDg2NDMxWiIsImlzcyI6ImdvbmRvciBjb21tZXJjZSIsIm9yZyI6ImNmYiIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJ1c2VyaWQiOiIwMUZFUERXS1BHVjkxVzRCRE45MTczTjBWRyJ9.zMIxdoqkxY3MFnY7zRUeQdA88SrXD-KcukT2fePc3a4IMhtuAuBcNjSnVQ9J4AUNAz2BQGnhvjsJiOJGcV4M6w1n1tFJMr6xnDTChb2OZa2eSi6u3qjppOKXgQ_t0EOPpTC9Iqx3zgRt0C6Nl1z14ixmGmaAY0SKKgjHSI1ieiuRtzJuJi7qq7nHf_u4iypr4mMN1H6KCrIq86xEPp2bN2H3cEHQr2AaSjLamoPkT_oA0RHoNroZvTqmpZE80hvYHBSECUagiAazlb_ANMJgNF0zo_uSSMkyXHpASwqdaZnPLgINzLkIJrfNLwDf4P1VEh9VoaB1E9ElQanZVBrN51VDhBitTzGolSxk0_P37aVPrS9yeWceJTHs1GojMOGCosYRu_wi05n0bsG_iAEFRFxlV3pT-2YdS5YAbUdEJj65NO-6SkmPQBcMGCwHCztDn6h6lQZiUPgjnTqsSUq_kUC_X3ki4I7fVohm-Z9jplLOPHHk88CmlJnUI0AgYYfJQw8Kwi5010-1eTz6EFVI7_fjeV_OPI-emxJ4F1QaUy934XC69kWPDgfeLtBfYmee3M3N6MaD6eurltD23YknDhg-VWcBD_BycmUKMIQ5hXHL-0ix_e97zr1kw7UjcwdNwlCC6m9AkrEhevzvG4nQ3ZIVRhb_fklXykYITjulUmQ",
        user_type: "USER",
        channel_code: "APISNG",
      })
    ).data;
    res.send(response);
    console.log(`response get`);
  } catch (err: any) {
    console.log(err.message, Object.keys(err.response), err.response);
    next(new ErrorHandler(400, err.message));
  }
});

export default router;
