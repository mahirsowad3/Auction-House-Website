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
        setUserType("seller");
        setUserName("Test1");
        setPassowrd("Test1");
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
                                <div style={{ border: '1px solid red' }} className="flex space-x-4">
                                    {userType === 'seller' ? (
                                        <Link href="/add-item" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Item</Link>
                                    ) : (
                                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Funds</a>
                                    )}
                                    {/* <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
                                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a> */}
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
