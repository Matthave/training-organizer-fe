export enum Colors {
  primaryGold = "#fdbd32",
  primaryDark = "#1d1e20",
  primaryDarkest = "#161a1d",
  primaryGreen = "#00af97",
  primaryDarkGreen = "#008371",
}

export interface IDecodedToken {
  exp: number;
  email: string;
  userId: string;
}
