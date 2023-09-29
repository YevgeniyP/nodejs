import { Document } from "mongoose";

import { GendersEnum } from "../enums/Gender.enum";

export interface UserInterface extends Document {
  name?: string;
  age?: number;
  gender?: GendersEnum;
  email: string;
  password: string;
}
