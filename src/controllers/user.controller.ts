import { NextFunction, Request, Response } from "express";

import { User } from "../models/User.model";
import { userService } from "../services/user.service";

class UserController {
  public async findAll(req: Request, res: Response) {
    const users = await userService.findAll();
    res.json(users);
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const currentUser = await User.findById(id);
      if (!currentUser) throw new Error("User not found");
      res.json(currentUser);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const newUser = await User.create({ ...req.body });
      return res.status(201).json(newUser);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async updateById(req: Request, res: Response) {
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
  }

  public async deleteById(req: Request, res: Response) {
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
  }
}

export const userController = new UserController();
