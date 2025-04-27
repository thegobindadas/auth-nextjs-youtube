"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';



function ForgotPassword() {

    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
  

    const validateEmail = (email: string) => {

        const errors = {} as { email?: string };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!(email.trim())) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            errors.email = "Please enter a valid email address";
        } else if (!email.endsWith('@gmail.com')) {
            errors.email = "Only Gmail addresses are allowed";
        }
        

        return errors;
    };


    const handleBlur = () => {
        const validationErrors = validateEmail(email);
        setErrors(validationErrors);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const validationErrors = validateEmail(email);
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            
            try {
                // Simulate API call
                const response = await axios.post('/api/users/forgot-password', { email });
                
                
                if (response.data.success === true) {
                    toast.success("Password reset link sent to your email!");
                    router.push('/forgot-password-success');
                    setEmail("");
                } 

            } catch (error: any) {
                setErrors({ api: error.response.data.error });
                toast.error(error.response.data.error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
                    <p className="text-gray-400 mt-2">
                        Enter your email and we'll send you a link to reset your password
                    </p>
                </div>
                
                {errors.api && (
                    <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-300 text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.api}
                    </div>
                )}
    
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.trim())}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 pl-10 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200`}
                                placeholder="your@gmail.com"
                                required
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                        </div>
                        {errors.email && (
                            <p className="text-red-400 text-xs flex items-center mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.email}
                            </p>
                        )}
                    </div>
    
                    <button
                        type="submit"
                        disabled={isSubmitting || Object.keys(validateEmail(email)).length > 0}
                        className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5 ${(isSubmitting || Object.keys(validateEmail(email)).length > 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            'Send Reset Link'
                        )}
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
                </form>
            </div>
        </div>
    )
}



export default ForgotPassword