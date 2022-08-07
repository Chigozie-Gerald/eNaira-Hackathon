import { Request as Req, Response as Res, NextFunction as Next } from "express";

export class ErrorHandler extends Error {
  constructor(
    readonly status = 500,
    readonly message = "Something went wrong"
  ) {
    super(message);
    this.status = status > 399 && status < 600 ? status : 500;
    this.message =
      typeof message === "string" ? message : "Something went wrong";
  }
}

export const errorMiddleware = (
  error: ErrorHandler,
  req: Req,
  res: Res,
  next: Next
) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).send({
    status,
    message,
  });
};
