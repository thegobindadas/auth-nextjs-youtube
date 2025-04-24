"use client";
import { useState } from 'react';



const VerifyEmailPage = () => {

    const [isResent, setIsResent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleResend = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsResent(true);
            setIsLoading(false);
        }, 1500);
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Verify your email address
                    </h1>
                    <p className="text-gray-600 mb-6">
                        We've sent a verification link to your email. Please check your inbox
                        and click the link to activate your account.
                    </p>
                </div>

                <div className="text-center text-sm text-gray-500 mb-6">
                    <p>
                        Didn't receive the email? Check your spam folder or{' '}
                        <button
                            onClick={handleResend}
                            disabled={isLoading || isResent}
                            className={`font-medium focus:outline-none ${
                                isLoading || isResent
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-blue-600 hover:text-blue-700'
                            }`}
                        >
                            {isResent ? 'Email resent!' : 'Resend it'}
                        </button>
                    </p>
                </div>

                <button
                    onClick={handleResend}
                    disabled={isLoading || isResent}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        isLoading || isResent
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                ></circle>
                                <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Sending...
                        </span>
                    ) : isResent ? (
                        'Email Resent!'
                    ) : (
                        'Resend Verification Email'
                    )}
                </button>

                <div className="mt-6 text-center text-xs text-gray-400">
                    <p>Having trouble? Contact our support team.</p>
                </div>
            </div>
        </div>
    );
};



export default VerifyEmailPage;