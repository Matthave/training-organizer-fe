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

export const addExercise = async (exerciseData: any) => {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("token");

  if (hasToken) {
    const tokenFromCookie = cookieStore.get("token");
    const tokenValue = tokenFromCookie?.value;

    try {
      if (tokenValue) {
        const URL = "http://localhost:8080/exercise/add";
        const res = await fetch(URL, {
          method: "POST",
          headers: {
            cookie: `token=${tokenValue}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(exerciseData),
        });

        const user = await res.json();

        if (res.status !== 201)
          throw new Error(user.message || "Can't add exercise");

        return { success: true, message: "Dodano ćwiczenie!" };
      }
    } catch (err: unknown) {
      // eslint-disable-next-line no-console
      console.log("addExercise Error", err);
      return { success: false, message: "Wystąpił błąd" };
    }
  }
};

export const getExercises = async () => {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("token");

  if (hasToken) {
    const tokenFromCookie = cookieStore.get("token");
    const tokenValue = tokenFromCookie?.value;

    try {
      if (tokenValue) {
        const URL = "http://localhost:8080/exercise";
        const res = await fetch(URL, {
          method: "GET",
          headers: {
            cookie: `token=${tokenValue}`,
          },
          credentials: "include",
        });

        const data = await res.json();

        if (res.status !== 200) {
          throw new Error(data.message || "Nie udało się pobrać ćwiczeń");
        }

        return {
          success: true,
          exercises: data.exercises,
          message: data.message,
        };
      }
    } catch (err: unknown) {
      const error = err as Error;
      // eslint-disable-next-line no-console
      console.log("getExercises Error", error);
      return {
        success: false,
        message: error.message || "Wystąpił błąd przy pobieraniu ćwiczeń.",
      };
    }
  }
  return { success: false, message: "Brak tokena autoryzacyjnego." };
};

export const deleteExercise = async (exerciseId: string) => {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("token");

  if (hasToken) {
    const tokenFromCookie = cookieStore.get("token");
    const tokenValue = tokenFromCookie?.value;

    try {
      if (tokenValue) {
        const URL = `http://localhost:8080/exercise/${exerciseId}`;
        const res = await fetch(URL, {
          method: "DELETE",
          headers: {
            cookie: `token=${tokenValue}`,
          },
          credentials: "include",
        });

        const data = await res.json();

        if (res.status !== 200) {
          throw new Error(data.message || "Nie udało się usunąć ćwiczenia");
        }

        return {
          success: true,
          message: data.message,
        };
      }
    } catch (err: unknown) {
      const error = err as Error;
      // eslint-disable-next-line no-console
      console.log("deleteExercise Error", error);
      return {
        success: false,
        message: error.message || "Wystąpił błąd podczas usuwania ćwiczenia.",
      };
    }
  }
  return { success: false, message: "Brak tokena autoryzacyjnego." };
};

export const editExercise = async (exerciseId: string, exerciseData: any) => {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("token");

  if (hasToken) {
    const tokenFromCookie = cookieStore.get("token");
    const tokenValue = tokenFromCookie?.value;

    try {
      if (tokenValue) {
        const URL = `http://localhost:8080/exercise/${exerciseId}`;
        const res = await fetch(URL, {
          method: "PUT",
          headers: {
            cookie: `token=${tokenValue}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(exerciseData),
        });

        const data = await res.json();

        if (res.status !== 200) {
          throw new Error(data.message || "Nie udało się edytować ćwiczenia");
        }

        return {
          success: true,
          message: data.message,
          exercise: data.exercise,
        };
      }
    } catch (err: unknown) {
      const error = err as Error;
      // eslint-disable-next-line no-console
      console.log("editExercise Error", error);
      return {
        success: false,
        message: error.message || "Wystąpił błąd podczas edytowania ćwiczenia.",
      };
    }
  }
  return { success: false, message: "Brak tokena autoryzacyjnego." };
};

export const addTraining = async (trainingData: any) => {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("token");

  if (hasToken) {
    const tokenFromCookie = cookieStore.get("token");
    const tokenValue = tokenFromCookie?.value;

    try {
      if (tokenValue) {
        const URL = `http://localhost:8080/training/add`;
        const res = await fetch(URL, {
          method: "POST",
          headers: {
            cookie: `token=${tokenValue}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(trainingData),
        });

        const data = await res.json();

        if (res.status !== 201) {
          throw new Error(data.message || "Nie udało się dodać treningu");
        }

        return {
          success: true,
          message: data.message,
          training: data.training,
        };
      }
    } catch (err: unknown) {
      const error = err as Error;
      // eslint-disable-next-line no-console
      console.log("addTraining Error", error);
      return {
        success: false,
        message: error.message || "Wystąpił błąd podczas dodawania treningu.",
      };
    }
  }
  return { success: false, message: "Brak tokena autoryzacyjnego." };
};

export const getTrainings = async () => {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("token");

  if (hasToken) {
    const tokenFromCookie = cookieStore.get("token");
    const tokenValue = tokenFromCookie?.value;

    try {
      if (tokenValue) {
        const URL = `http://localhost:8080/training`;
        const res = await fetch(URL, {
          method: "GET",
          headers: {
            cookie: `token=${tokenValue}`,
          },
          credentials: "include",
        });

        const data = await res.json();

        if (res.status !== 200) {
          throw new Error(data.message || "Nie udało się pobrać treningów");
        }

        return {
          success: true,
          message: data.message,
          trainings: data.trainings,
        };
      }
    } catch (err: unknown) {
      const error = err as Error;
      // eslint-disable-next-line no-console
      console.log("getTrainings Error", error);
      return {
        success: false,
        message: error.message || "Wystąpił błąd podczas pobierania treningów.",
      };
    }
  }
  return { success: false, message: "Brak tokena autoryzacyjnego." };
};

export const getTraining = async (id: string) => {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("token");

  if (hasToken) {
    const tokenFromCookie = cookieStore.get("token");
    const tokenValue = tokenFromCookie?.value;

    try {
      if (tokenValue) {
        const URL = `http://localhost:8080/training/${id}`;
        const res = await fetch(URL, {
          method: "GET",
          headers: {
            cookie: `token=${tokenValue}`,
          },
          credentials: "include",
        });

        const data = await res.json();

        if (res.status !== 200) {
          throw new Error(data.message || "Nie udało się pobrać treningu");
        }

        return {
          success: true,
          message: data.message,
          training: data.training,
        };
      }
    } catch (err: unknown) {
      const error = err as Error;
      // eslint-disable-next-line no-console
      console.log("getTraining Error", error);
      return {
        success: false,
        message: error.message || "Wystąpił błąd podczas pobierania treningu.",
      };
    }
  }
  return { success: false, message: "Brak tokena autoryzacyjnego." };
};
