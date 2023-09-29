import express, { NextFunction, Request, Response, urlencoded } from "express";
import mongoose from "mongoose";

import { configs } from "./config/config";
import { ApiError } from "./errors/ApiError";
import { userRouter } from "./routers/user.router";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  const { message, status } = error;

  res.status(status).json(message);
});

app.listen(PORT, async () => {
  await mongoose
    .connect(configs.DB_URI)
    .then(() => console.log(`DB connection successful`))
    .catch((error) => console.log(`DB connection error. ${error}`));
  console.log(`Server was started on http://localhost:${PORT}`);
});
