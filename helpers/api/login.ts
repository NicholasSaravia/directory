import { APIResponse } from "./interfaces";

export const login = (email: string): Promise<APIResponse> => {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then(async (res) => {
      const { message } = await res.json();
      if (res.ok) {
        return {
          success: true,
          error: null,
        };
      } else {
        return {
          success: false,
          error: {
            message,
            code: res.status,
          },
        };
      }
    })
    .catch((err) => {
      return {
        success: false,
        error: {
          message: err.message,
          code: 500,
        },
      };
    });
};
