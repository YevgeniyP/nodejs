import * as joi from "joi";

import { GendersEnum } from "../enums/Gender.enum";

const mailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class UserValidator {
  static create = joi.object({
    name: joi.string().min(4).max(20).trim(),
    age: joi.number().min(18).max(99),
    gender: joi.valid(...Object.values(GendersEnum)),
    email: joi.string().regex(mailRegex).trim().required(),
    password: joi.string().trim().required(),
  });
}
