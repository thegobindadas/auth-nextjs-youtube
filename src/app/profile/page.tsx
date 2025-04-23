"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function ProfilePage() {

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const fetchUser = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get('/api/users/me');

      console.log(response.data.user);
      
      setUser(response.data.user);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchUser();
  }, [])
  


  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout');

      if (response.data.success === true) {
        toast.success("Logout successfully");
        router.push('/login');
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }


  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </div>
      </button>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse">
            
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-48 p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 mx-auto mb-4"></div>
              <div className="h-8 bg-indigo-400 rounded w-1/3 mx-auto mb-2"></div>
              <div className="h-4 bg-indigo-300 rounded w-1/4 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="space-y-6">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="space-y-4">
                    {[1, 2].map((item) => (
                      <div key={item} className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                        <div className="ml-4 w-full">
                          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                          <div className="h-5 bg-gray-300 rounded w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                      <div className="ml-4 w-full">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-5 bg-gray-300 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 ease-in-out">
        
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-1 animate-fade-in">
                {user?.username}
              </h1>
              <p className="text-indigo-100 font-medium animate-fade-in">
                Member since {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Account Details</h2>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">User ID</p>
                        <Link 
                          href={`/profile/${user?._id}`} 
                          className="text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                        >
                          #{user?._id}
                        </Link>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Username</p>
                        <Link 
                          href={`/profile/${user?.username}`} 
                          className="text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                        >
                          @{user?.username}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Information</h2>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-base font-semibold text-gray-900">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section - Shows after loading */}
        {!isLoading && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3 animate-fade-in-up">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">Friends</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">128</div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">Achievements</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">24</div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-pink-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">Events</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">7</div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}