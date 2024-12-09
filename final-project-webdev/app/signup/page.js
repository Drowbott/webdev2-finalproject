"use client";
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../ToDoloo/_utils/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                email: email,
            });

            router.push('/todo-list');
        } catch (error) {
            console.error("Error signing up:", error);
            setError(error.message);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-navy-900 text-white">
            <h1 className="text-5xl font-bold mb-4 text-amber-500">ToDoloo</h1>
            <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSignUp} className="flex flex-col w-96">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 mb-2 text-black"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 mb-2 text-black"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 mb-2 text-black"
                />
                <button type="submit" className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">
                    Sign Up
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
            <p className="mt-4">
                Already have an account?{' '}
                <Link href="/" className="text-blue-500 hover:underline">
                    Sign In
                </Link>
            </p>
        </main>
    );
}