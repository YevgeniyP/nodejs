import express, { Request, Response, urlencoded } from "express";
import mongoose from "mongoose";

import { configs } from "./config";
import { User } from "./models";
import { UserInterface } from "./types";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<UserInterface>> => {
    const users = await User.find();
    return res.json(users);
  },
);

app.get(
  "/user/:id",
  async (req: Request, res: Response): Promise<Response<UserInterface>> => {
    try {
      const { id } = req.params;
      const currentUser = await User.findById(id);
      if (!currentUser) throw new Error("User not found");
      return res.json(currentUser);
    } catch (e) {
      return res.status(404).json(e);
    }
  },
);

app.post(
  "/create_user",
  async (req: Request, res: Response): Promise<Response<UserInterface>> => {
    try {
      const newUser = await User.create({ ...req.body });
      return res.status(201).json(newUser);
    } catch (e) {
      return res.status(400).json(e);
    }
  },
);

app.put(
  "/user/:id",
  async (req: Request, res: Response): Promise<Response<UserInterface>> => {
    try {
      const { id } = req.params;
      const currentUser = await User.findByIdAndUpdate(
        id,
        { ...req.body },
        { returnDocument: "after" },
      );
      if (!currentUser) throw new Error("User not found");
      return res.status(201).json(currentUser);
    } catch (e) {
      return res.status(400).json(e);
    }
  },
);

app.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentUser = await User.findByIdAndRemove(id, {
      returnDocument: "before",
    });
    if (!currentUser) throw new Error("User not found");
    return res.status(200).json(currentUser);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.listen(PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  console.log(`Server was started on http://localhost:${PORT}`);
});
