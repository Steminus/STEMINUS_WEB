import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const missingConfig = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

export const firebaseConfigError =
  missingConfig.length > 0
    ? `Missing Firebase env: ${missingConfig.join(", ")}`
    : null;

let authInstance: Auth | null = null;

export function getClientAuth() {
  if (typeof window === "undefined" || firebaseConfigError) {
    return null;
  }

  if (!authInstance) {
    const app =
      getApps().length > 0
        ? getApp()
        : initializeApp(firebaseConfig as Record<string, string>);

    authInstance = getAuth(app);
  }

  return authInstance;
}
