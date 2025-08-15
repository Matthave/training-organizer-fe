"use server";
import { jwtDecode } from "jwt-decode";
import { IDecodedToken } from "@/types/types";
import { cookies } from "next/headers";

const isTokenExpired = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token && token.value) {
    const { value: tokenValue } = token;
    const { exp, email, userId } = jwtDecode<IDecodedToken>(token.value) || {};
    const expirationTime = exp * 1000;
    const currentTime = Date.now();

    return {
      currentToken: tokenValue,
      tokenExpired: expirationTime < currentTime,
      expirationTime,
      currentTime,
      remainingTime: expirationTime - currentTime,
      email,
      userId,
    };
  }

  return {
    currentToken: null,
    tokenExpired: true,
    currentTime: null,
    expirationTime: null,
    remainingTime: "",
    email: "",
    userId: "",
  };
};

export default isTokenExpired;
