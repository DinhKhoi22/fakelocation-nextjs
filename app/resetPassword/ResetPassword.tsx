import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface ResetPasswordProps {}

const ResetPassword: FC<ResetPasswordProps> = ({}) => {
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
                            <stop offset="1" stop-opacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="z-10 flex justify-center items-end mx-52 h-4/6 w-full text-white">
                <div className="text-center w-5/12">
                    <h1 className="text-4xl">Forgot Password</h1>
                    <p className="font-semibold mt-10">A link with code to reset your password</p>
                    <p>has been sent to your email.  </p>
                    <div className="flex flex-col gap-8 font-semibold mt-20">
                        <input
                            placeholder="Email"
                            className="bg-transparent border-b border-white placeholder-white text-white focus:outline-none"
                        />
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-200 font-medium text-black py-2 px-28 rounded-full mt-10">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
