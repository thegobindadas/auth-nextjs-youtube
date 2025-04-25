"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";



export default function EmailVerificationPage() {
    
    const router = useRouter();
    const [token, setToken] = useState("");
    const [verificationStatus, setVerificationStatus] = useState("verifying");
    const [errorMessage, setErrorMessage] = useState("");


    const verifyUserEmail = async () => {
        try {
            const response = await axios.post(`/api/users/emailverification`, { token });

            if (response.data.success) {
                setVerificationStatus("verified");
                toast.success(response.data.message);
            }
        } catch (error: any) {
            setVerificationStatus("error");
            setErrorMessage(error.response.data.error);
            toast.error(error.response.data.error);
        }
    }


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken.toString() || "");
    }, []);


    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);


  
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
                    <h1 className="text-2xl font-bold text-white">
                        {verificationStatus === 'verifying' && 'Verifying Your Email'}
                        {verificationStatus === 'verified' && 'Email Verified!'}
                        {verificationStatus === 'error' && 'Verification Error'}
                    </h1>
                </div>
            
                <div className="p-8 flex flex-col items-center">
                    {verificationStatus === 'verifying' && (
                        <div className="flex flex-col items-center space-y-6">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
                            <p className="text-gray-600 text-center">
                                Please wait while we verify your email address...
                            </p>
                        </div>
                    )}
                    
                    {verificationStatus === 'verified' && (
                        <div className="flex flex-col items-center space-y-6">
                            <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h2 className="text-2xl font-semibold text-gray-800">Successfully Verified!</h2>
                            <p className="text-gray-600 text-center">
                                Thank you for verifying your email address. You can now access all features of our platform.
                            </p>
                            <button
                                onClick={() => {router.push('/login')}}
                                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                            >
                                Continue to Dashboard
                            </button>
                        </div>
                    )}
                    
                    {verificationStatus === 'error' && (
                        <div className="flex flex-col items-center space-y-6">
                            <svg className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h2 className="text-2xl font-semibold text-gray-800">Verification Failed</h2>
                            <p className="text-gray-600 text-center">
                                {errorMessage}
                            </p>
                            <div className="flex space-x-4 mt-4">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
                                >
                                    Try Again
                                </button>
                                <button
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                                >
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <p className="mt-8 text-gray-500 text-sm text-center">
                Need help? <a href="/contact" className="text-indigo-600 hover:underline">Contact our support team</a>
            </p>
        </div>
    );
}