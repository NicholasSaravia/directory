interface SuccessResponse {
  success: boolean;
  error: null;
}

interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    code: number;
  };
}

export type APIResponse = SuccessResponse | ErrorResponse;
