'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface RegisterProps {}

const Register: FC<RegisterProps> = ({}) => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const onSignup = async () => {
        try {
            const response = await axios.post('/api/users/signup', user);
            console.log('Signup success', response.data);
            toast.success('Please check your email to verify your account')
        } catch (error: any) {
            console.log('Signup failed', error.message);            
            toast.error('Invalid email or already exists');
        } finally {            
            router.refresh();
        }
    };

    return (
        <div className="flex relative h-screen w-screen overflow-hidden">
            <div className="absolute left-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="890" height="1024" viewBox="0 0 890 1024" fill="none">
                    <path
                        d="M265.844 0H0V1024H890C885.719 996.735 856.609 929.622 774.416 879.287C671.674 816.369 708.918 733.002 737.172 437.284C765.426 141.567 494.444 114.826 414.82 99.0968C351.12 86.5131 288.961 27.789 265.844 0Z"
                        fill="url(#paint0_linear_31_917)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_31_917"
                            x1="9.56373e-07"
                            y1="497"
                            x2="746"
                            y2="237"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#020202" />
                            <stop offset="1" stopColor="#0F0F0F" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="z-10 flex justify-between items-end mx-52 h-5/6 w-full text-white">
                <div className="text-center font-semibold w-5/12">
                    <h1 className="text-4xl mb-10">Register</h1>
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <p>Lacus pulvinar vitae tempor</p>
                    <form className="flex flex-col gap-8 font-semibold mt-14">
                        <input
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="Username"
                            className="bg-transparent border-b border-white placeholder-white text-white focus:outline-none"
                        />
                        <input
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                            className="bg-transparent border-b border-white placeholder-white text-white focus:outline-none"
                        />
                        <input
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Password"
                            className="bg-transparent border-b border-white placeholder-white text-white focus:outline-none"
                        />
                    </form>
                    <div className="mt-8 font-semibold">
                        Do you want to reset <Link href={'/resetPassword'}>password</Link>?
                    </div>
                    <button
                        type="button"
                        onClick={onSignup}
                        className="bg-transparent hover:text-slate-200 text-white font-semibold py-2 px-28 border border-slate-300 rounded-full mt-10"
                    >
                        Register
                    </button>
                </div>

                <div className="text-center">
                    <p className="font-semibold mt-10">Lorem ipsum dolor sit amet consectetur.</p>
                    <p>Lacus pulvinar vitae tempor</p>
                    <div className="mt-10">
                        <Link
                            href={'/login'}
                            className="bg-gray-100 hover:bg-gray-200 font-medium text-black py-2 px-28 rounded-full"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
