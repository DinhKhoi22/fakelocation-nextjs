'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyEmail', { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || '');
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen py-2">
            <h1 className="text-4xl font-semibold text-white">Verify Email</h1>

            {verified && (
                <div className="mt-20">
                    <h2 className="text-2xl text-white text-center">Email Verified</h2>
                    <div className="bg-transparent hover:text-slate-200 text-white font-semibold py-2 px-28 border border-slate-300 rounded-full mt-10">
                        <Link href="/login">Login</Link>
                    </div>
                </div>
            )}
            {error && (
                <div className="mt-10">
                    <h2 className="text-2xl p-2 font-semibold bg-red-500 text-black">Error: Unable to verify email.</h2>
                    <div className="bg-transparent hover:text-slate-200 text-white font-semibold py-2 px-28 border border-slate-300 rounded-full mt-10">
                        <Link href={'/'}>Homepage</Link>
                    </div>
                </div>
            )}
        </div>
    );
}
