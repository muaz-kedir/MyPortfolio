import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * Firebase web config is public by design, but the app must still work before
 * keys are set (falls back to bundled default content). This flag gates all
 * network calls so the portfolio renders with defaults during local dev.
 */
export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(config);
    authInstance = getAuth(app);
    dbInstance = getFirestore(app);
  } catch (error) {
    console.error("[firebase] failed to initialize", error);
  }
}

export const auth = authInstance;
export const db = dbInstance;

export function requireDb(): Firestore {
  if (!db) {
    throw new Error(
      "Firestore is not configured. Add VITE_FIREBASE_* variables to your .env file.",
    );
  }
  return db;
}

export function requireAuth(): Auth {
  if (!auth) {
    throw new Error(
      "Firebase Auth is not configured. Add VITE_FIREBASE_* variables to your .env file.",
    );
  }
  return auth;
}
