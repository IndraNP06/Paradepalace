import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim() || "AIzaSyCCfIDd3oRD0RIOqTA2ZzuaAIVIs64yOVA",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim() || "paradepalace-web.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() || "paradepalace-web",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim() || "paradepalace-web.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.trim() || "512751216852",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim() || "1:512751216852:web:0fdb122aa1a8447d857341",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?.trim() || "G-0N1R6WC2KP",
};

// Initialize Firebase
import { FirebaseApp } from "firebase/app";
import { Analytics } from "firebase/analytics";

let app: FirebaseApp;
let auth: ReturnType<typeof getAuth>;
let db: ReturnType<typeof getFirestore>;
let analytics: Analytics;
let storage: ReturnType<typeof getStorage>;

try {
    // Debug logging to verify Env Vars are loaded
    console.log("[FIREBASE_DEBUG] Config:", {
        hasApiKey: !!firebaseConfig.apiKey,
        apiKeyLength: firebaseConfig.apiKey?.length,
        projectId: firebaseConfig.projectId
    });

    if (!firebaseConfig.apiKey) {
        console.error("[FIREBASE_CRITICAL] API Key is missing! Check Vercel Env Vars.");
    }

    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // Analytics is only supported in browser environment
    if (typeof window !== 'undefined') {
        isSupported().then(yes => yes && (analytics = getAnalytics(app)));
    }
} catch (error) {
    console.error("Error initializing Firebase:", error);
    // Fallbacks to prevent app crash if config is invalid
    auth = {} as ReturnType<typeof getAuth>;
    db = {} as ReturnType<typeof getFirestore>;
    storage = {} as ReturnType<typeof getStorage>;
}

export { app, auth as firebaseAuth, db, analytics, storage };
