interface RegexInterface {
  [key: string]: RegExp;
}

export const regex: RegexInterface = {
  EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
};
