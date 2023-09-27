import { Document } from "mongoose";

import { GendersEnum } from "../enums";

export interface UserInterface extends Document {
  name?: string;
  age?: number;
  gender?: GendersEnum;
  email: string;
  password: string;
}
