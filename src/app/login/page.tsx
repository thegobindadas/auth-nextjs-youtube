"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';



export default function LoginPage() {

    const [user, setUser] = React.useState({
        username: '',
        email: '',
        password: ''
    })



    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <label htmlFor="email">Email</label>
            <input
                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="abc@xyz.com"
            />

            <label htmlFor="password">Password</label>
            <input
                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />

            <button 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Login
            </button>

            <p className="text-gray-600">
                Don't have an account?{' '}
                <a href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-200">
                    Signup here
                </a>
          </p>
        
        </div>
    )
}
