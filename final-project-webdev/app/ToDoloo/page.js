"use client";
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './_utils/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/todo-list');
        } catch (error) {
            console.error("Error signing in:", error);
            setError(error.message);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-navy-900 text-white">
            <h1 className="text-5xl font-bold mb-4 text-amber-500">ToDoloo</h1>
            <form onSubmit={handleSignIn} className="flex flex-col w-96">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 mb-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 mb-2"
                />
                <button type="submit" className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">
                    Sign In
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
            <p className="mt-4">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-500 hover:underline">
                    Sign Up
                </Link>
            </p>
        </main>
    );
}