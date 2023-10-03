import { model, Schema } from "mongoose";

import { GendersEnum } from "../enums/Gender.enum";
import { UserInterface } from "../types/user.interface";

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      min: [1, "Min value 1"],
      max: [199, "Max value 199"],
      default: 1,
    },
    gender: {
      type: String,
      enum: GendersEnum,
      default: "other",
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<UserInterface>("users", userSchema);
