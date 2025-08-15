"use server";

import { cookies } from "next/headers";

export const getLogoutUser = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("token");

  return { status: 200, message: "Logged out successfully" };
};

export const signupUser = async (userData: any) => {
  const URL = `http://localhost:8080/auth/signup`;
  try {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 201) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message:
          errorData.message ||
          "Rejestracja nie powiodła się! Spróbuj ponownie.",
      };
    }

    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    return { success: false, message: error.message || "Coś poszło nie tak!" };
  }
};
