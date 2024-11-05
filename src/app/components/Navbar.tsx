'use client'
import Link from 'next/link';
// src/components/Navbar.tsx

import React from 'react'

const Navbar = () => {
    const [userType, setUserType] = React.useState<string | null>(null);
    const [userName, setUserName] = React.useState<string | null>(null);
    const [passowrd, setPassowrd] = React.useState<string | null>(null); 

    React.useEffect(() => {
        // TODO: Authenticate user
        // TODO: Fetch user type from the server
        sessionStorage.setItem('userType', 'seller');
        sessionStorage.setItem('userName', 'Test1');
        sessionStorage.setItem('password', 'Test1');
        setUserType(sessionStorage.getItem('userType'));
        setUserName(sessionStorage.getItem('userName'));
        setPassowrd(sessionStorage.getItem('password'));

    }, []);

    return (
        <div>
            {/* navbar for Tailwind */}
            <nav className="bg-gray-800">
                <div className="container mx-auto">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0">
                                <a href="#" className="text-white font-bold text-2xl">Eiffel Team</a>
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <Link href="/view-items" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">view-items</Link>
                                    {userType === 'seller' ? (
                                        <span>
                                        <Link href="/add-item" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Item</Link>
                                        <Link href="/review-items" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Review Items</Link>
                                        </span>
                                    ) : (
                                    <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Funds</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Login</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
