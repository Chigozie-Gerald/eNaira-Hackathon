import express, { Application } from "express";
const app: Application = express();
import userRouter from "./routes/user";
import qrRouter from "./routes/qrCode";
import payRouter from "./routes/pay";
import { errorMiddleware } from "./errorHandler/errorHandler";
import cors from "cors";

const PORT = 6660;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: `*`, credentials: true }));

// General Routes

app.use("/api/user", userRouter);
app.use("/api/qrcode", qrRouter);
app.use("/api/pay", payRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
