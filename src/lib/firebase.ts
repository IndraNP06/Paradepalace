import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim(),
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim(),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim(),
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.trim(),
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim(),
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?.trim(),
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
