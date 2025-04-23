"use client";
import React from "react";
import { useRouter } from 'next/navigation';



export default function ProfileId({params}: any) {

    const { id } = React.use(params);
    const router = useRouter();

    
    const getDisplayId = (id: string) => {
        try {
            // Try to decode - if it changes the string, it was encoded
            const decoded = decodeURIComponent(id);
            return decoded !== id ? decoded : id;
        } catch {
            // If decoding fails (for regular IDs), return original
            return id;
        }
    };

    const displayId = getDisplayId(id);



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 mx-auto mb-4 flex items-center justify-center">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-10 w-10 text-white" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white">User Profile Info</h1>
                </div>
      
                {/* Content Section */}
                <div className="p-6 space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">User Identification</h2>
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5 text-blue-600" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" 
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Unique Identifier</p>
                                <p className="text-lg font-semibold text-gray-900 bg-orange-100 px-3 py-1 rounded-md inline-block">
                                    {displayId}
                                </p>
                            </div>
                        </div>
                    </div>
        
                    <div className="pt-4 border-t border-gray-100">
                        <button 
                            onClick={() => router.push(`/profile`)}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            View Full Profile
                        </button>
                    </div>
                </div>
        
                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 text-center">
                    <p className="text-xs text-gray-500">
                        Account created on {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    )
}