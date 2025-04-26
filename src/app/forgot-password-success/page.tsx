"use client";
import React from 'react';
import Link from 'next/link';



const ForgotPasswordSuccess = () => {


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white">Reset Link Sent!</h1>
                    <p className="text-gray-400 mt-4">
                        We've sent a password reset link to your email address. Please check your inbox, including spam folder.
                    </p>
                    <p className="text-gray-400 mt-2">
                        The link will expire in 30 minutes for security reasons.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="text-center text-gray-300 text-sm">
                        <p>Didn't receive the email?</p>
                    </div>

                    <button
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5"
                    >
                        Resend Reset Link
                    </button>

                    <div className="text-center mt-4">
                        <Link 
                            href="/login" 
                            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200 inline-flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default ForgotPasswordSuccess;