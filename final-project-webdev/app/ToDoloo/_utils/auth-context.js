"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GithubAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const gitHubSignIn = async () => {
        try {
            setLoading(true);
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err) {
            setError(err);
            console.error("GitHub Sign-in Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const firebaseSignOut = async () => {
        try {
            setLoading(true);
            await signOut(auth);
        } catch (err) {
            setError(err);
            console.error("Sign-out Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, error, gitHubSignIn, firebaseSignOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(AuthContext);
};