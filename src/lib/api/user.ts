import { API_URL, parseResponse } from "./auth";

export type Profile = {
  rollNumber: string;
  email: string;
  fullName: string;
  fatherName: string;
  cnic: string;
  mobile: string;
  dateOfBirth: string;
  gender: string;
  qualification: string;
  courses: string[];
  permanentAddress: string;
  city: string;
  referralCode?: string;
  testScore: number | null;
  testPassed: boolean;
  admissionType: string[];
};

export type ChallanInfo = {
  challanId: string;
  psid: string | null;
  amount: number;
  paid: boolean;
  txnId: number | null;
  branchCode: number | null;
  txnDate: string | null;
  createdAt: string;
};

export type ScholarshipInfo = {
  fullName: string;
  cnic: string;
  rollNumber: string;
  email: string;
  mobileNumber: string;
  challanNumber: string;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
  createdAt: string;
};

export type ProfileResponse = {
  status: string;
  data: {
    user: Profile;
    challans: {
      total: number;
      totalAmount: number;
      challans: ChallanInfo[];
    };
    scholarship: ScholarshipInfo | null;
  };
};

export function getProfile(token: string): Promise<ProfileResponse> {
  return fetch(`${API_URL}/api/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(parseResponse);
}

export function submitTestScore(
  token: string,
  payload: { testScore: number; testPassed: boolean }
): Promise<{ status: string; data: { testScore: number; testPassed: boolean } }> {
  return fetch(`${API_URL}/api/users/test`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  }).then(parseResponse);
}

export function applyForScholarship(formData: FormData): Promise<{ message: string; scholarship?: { id: string } }> {
  return fetch(`${API_URL}/api/scholarship/apply`, {
    method: "POST",
    body: formData,
  }).then(parseResponse);
}

export function generateChallan(
  token: string
): Promise<{ status: string; data: { fileName: string; challanNumber: string } }> {
  return fetch(`${API_URL}/api/users/generate-pdf/false`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  }).then(parseResponse);
}
