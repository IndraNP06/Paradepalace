import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCCfIDd3oRD0RIOqTA2ZzuaAIVIs64yOVA",
    authDomain: "paradepalace-web.firebaseapp.com",
    projectId: "paradepalace-web",
    storageBucket: "paradepalace-web.firebasestorage.app",
    messagingSenderId: "512751216852",
    appId: "1:512751216852:web:0fdb122aa1a8447d857341",
    measurementId: "G-0N1R6WC2KP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testConnection() {
    console.log("Testing Firestore connection...");
    try {
        const querySnapshot = await getDocs(collection(db, "team_members"));
        console.log("Connection Successful!");
        console.log(`Found ${querySnapshot.size} documents.`);
    } catch (e) {
        console.error("Connection Failed:", e);
    }
}

testConnection();
