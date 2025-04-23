"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';



export default function LoginPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = React.useState({
        email: ''
    });
    const [loading, setLoading] = React.useState(false);



    const validateEmail = (email: string) => {
        if (!email.includes('@')) {
            setErrors({...errors, email: 'Please enter a valid email address'});
            return false;
        }
        setErrors({...errors, email: ''});
        return true;
    };

    const handleEmailChange = (e) => {
        setUser({...user, email: e.target.value});
        // Clear error when user starts typing again
        if (errors.email && e.target.value.includes('@')) {
            setErrors({...errors, email: ''});
        }
    };


    const onLogin = async () => {

        // Validate email before submitting
        if (!validateEmail(user.email)) return;

        try {

            setLoading(true);

            const response = await axios.post('/api/users/login', user);

            console.log("Login success: ", response.data);

            if (response.data.success === true) {
                toast.success("User login successfully");
                router.push("/profile");
            }
            
        } catch (error: any) {
            toast.error(error.response.data.error);
        } finally{
            setLoading(false);
        }
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold ">Login</h1>
                    <p className="text-gray-500 mt-2">{loading ? "Loading..." : "Login to your account"}</p>
                </div>
    
                <div className="space-y-5">

                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium ">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleEmailChange}
                                onBlur={() => validateEmail(user.email)}
                                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
                                placeholder="you@example.com"
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
                            <p className="text-red-400 text-sm mt-1 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.email}
                            </p>
                        )}
                    </div>
    
                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium ">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
                                placeholder="••••••••"
                                required
                                minLength={8}
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
    
    
                    <button
                        type="submit"
                        onClick={onLogin}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5"
                    >
                        Log in
                    </button>
                </div>
    
                <div className="mt-6 text-center">
                    <p className="text-gray-300">
                        Don't have any account?{' '}
                        <Link href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-200">
                            Signup here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
