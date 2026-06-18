export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export class ApiError extends Error {
  errors?: unknown;
  constructor(message: string, errors?: unknown) {
    super(message);
    this.errors = errors;
  }
}

export async function parseResponse(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.message || "Something went wrong", data.errors);
  }
  return data;
}

export type SignupResponse = {
  message: string;
  user: {
    rollNumber: string;
    email: string;
    fullName: string;
    courses?: string[];
    admissionType?: string[];
    isNewUser?: boolean;
  };
};

export type LoginResponse = {
  message: string;
  token: string;
  user: {
    rollNumber: string;
    email: string;
    fullName: string;
    testPassed?: boolean;
  };
};

export function signup(formData: FormData): Promise<SignupResponse> {
  return fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    body: formData,
  }).then(parseResponse);
}

export function login(payload: { email: string; password: string }): Promise<LoginResponse> {
  return fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(parseResponse);
}

export function forgotPassword(email: string): Promise<{ message: string; resetUrl?: string }> {
  return fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }).then(parseResponse);
}

export function resetPassword(resetToken: string, password: string): Promise<{ message: string }> {
  return fetch(`${API_URL}/api/auth/reset-password/${resetToken}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  }).then(parseResponse);
}
