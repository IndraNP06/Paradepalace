"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    updateEmail,
    sendPasswordResetEmail,
    User as FirebaseUser
} from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";

interface User {
    name: string;
    email: string;
    role: "admin" | "user";
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Guard against uninitialized auth (missing API key)
        if (!firebaseAuth || !firebaseAuth.app) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
            if (firebaseUser) {
                // In a real app, you might fetch additional user details from Firestore here
                // using firebaseUser.uid
                setUser({
                    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
                    email: firebaseUser.email || "",
                    role: "admin", // Default role for now
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        if (!firebaseAuth || !firebaseAuth.app) {
            console.error("Firebase Auth not initialized");
            return;
        }
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            router.push("/admin");
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        if (!firebaseAuth || !firebaseAuth.app) {
            console.error("Firebase Auth not initialized");
            return;
        }
        try {
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
            // Update profile with name
            if (firebaseAuth.currentUser) {
                await updateProfile(firebaseAuth.currentUser, { displayName: name });
            }
            router.push("/admin");
        } catch (error) {
            console.error("Register error:", error);
            throw error;
        }
    };

    const logout = async () => {
        if (!firebaseAuth || !firebaseAuth.app) return;
        try {
            await signOut(firebaseAuth);
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const resetPassword = async (email: string) => {
        if (!firebaseAuth || !firebaseAuth.app) return;
        try {
            await sendPasswordResetEmail(firebaseAuth, email);
        } catch (error) {
            console.error("Reset password error:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                resetPassword,
                isAuthenticated: !!user,
                loading,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
