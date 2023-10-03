import * as joi from "joi";

import { regex } from "../constants/constants";
import { GendersEnum } from "../enums/Gender.enum";

export class UserValidator {
  static username = joi.string().min(4).max(20).trim().messages({
    "string.min": "Min length 4 chars",
    "string.max": "Max length 20 chars",
  });
  static age = joi.number().min(18).max(99).messages({
    "number.min": "Min age 18",
    "number.max": "Max age 99",
  });
  static gender = joi.valid(...Object.values(GendersEnum));
  static email = joi.string().pattern(regex.EMAIL).trim().messages({
    "string.pattern.base": "String isn't email",
  });
  static password = joi.string().trim();

  static create = joi.object({
    name: this.username,
    age: this.age,
    gender: this.gender,
    email: this.email.required(),
    password: this.password.required(),
  });

  static update = joi.object({
    name: this.name,
    age: this.age,
    gender: this.gender,
  });

  static register = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
