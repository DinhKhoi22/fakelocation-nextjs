'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const onLogIn = async () => {
        if(!user.username){
            toast.error('Please enter your name');
            return null;
        }

        if(!user.password){
            toast.error('Please enter your password')
            return null;
        }

        try {
            const response = await axios.post('/api/users/signin', user);
            console.log('Login success', response.data);
            toast.success('Login success');
            router.push('/test');
        } catch (error: any) {
            console.log('Login failed', error.message);
            toast.error("Password or user's name is incorrect");
        } finally {
            router.refresh();
        }
    };

    return (
        <div className="flex relative h-screen w-screen overflow-hidden">
            <div className="absolute right-0">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="943.139"
                    height="1024"
                    viewBox="0 0 943 1024"
                    fill="none"
                >
                    <path
                        d="M115.139 229.5C20.2502 191.638 0 7.88787 0 0H943.139V1023.85H797.93H750.486C710.23 1027 705.917 981.252 641.22 921.304C576.523 861.356 451.442 911.838 287.543 848.735C123.644 785.632 162.462 574.237 192.654 498.514C222.846 422.79 210.028 267.362 115.139 229.5Z"
                        fill="url(#paint0_linear_30_792)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_30_792"
                            x1="926.139"
                            y1="13"
                            x2="54.6392"
                            y2="261.5"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#020202" />
                            <stop offset="1" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="z-10 flex justify-between items-end mx-52 h-5/6 w-full text-white">
                <div className="text-center font-semibold">
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <p>Lacus pulvinar vitae tempor</p>
                    <div className="mt-10">
                        <Link
                            href={'/register'}
                            className="bg-transparent hover:text-slate-200 hover:cursor-pointer text-white font-semibold py-2 px-28 border border-slate-300 rounded-full"
                        >
                            Register
                        </Link>
                    </div>
                </div>

                <div className="text-center w-5/12">
                    <h1 className="text-4xl">Login</h1>
                    <p className="font-semibold mt-10">Lorem ipsum dolor sit amet consectetur.</p>
                    <p>Lacus pulvinar vitae tempor</p>
                    <div className="flex flex-col gap-8 font-semibold mt-20">
                        <input
                            type="text"
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="Username"
                            onKeyDown={(e) => e.key === 'Enter' && onLogIn()}
                            className="bg-transparent border-b border-white placeholder-white text-white focus:outline-none"
                        />
                        <input
                            type="password"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Password"
                            onKeyDown={(e) => e.key === 'Enter' && onLogIn()}
                            className="bg-transparent border-b border-white placeholder-white text-white focus:outline-none"
                        />
                    </div>
                    <div className="mt-8 font-semibold">
                        Do you want to reset{' '}
                        <Link href={'/resetPassword'} className="font-medium text-white hover:underline">
                            password
                        </Link>
                        ?
                    </div>
                    <button
                        onClick={onLogIn}
                        className="bg-gray-100 hover:bg-gray-200 font-medium text-black py-2 px-28 rounded-full mt-10"
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
