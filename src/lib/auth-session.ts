const STORAGE_KEY = "yetp_session";

export type Session = {
  token: string;
  user: {
    rollNumber: string;
    email: string;
    fullName: string;
    testPassed?: boolean;
  };
};

export function setSession(session: Session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getSession(): Session | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}
