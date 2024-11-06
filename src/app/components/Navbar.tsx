'use client'
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    const [userType, setUserType] = React.useState<string | null>(null);
    const [userName, setUserName] = React.useState<string | null>(null);
    const [password, setPassword] = React.useState<string | null>(null);

    React.useEffect(() => {
        // Set initial values from sessionStorage if available
        setUserType(sessionStorage.getItem('userType'));
        setUserName(sessionStorage.getItem('userName'));
        setPassword(sessionStorage.getItem('password'));
    }, []);

    const handleLoginLogout = () => {
        if (userName) {
            // Logout action
            sessionStorage.clear();
            setUserType(null);
            setUserName(null);
        } else {
            // Redirect to login page
            window.location.href = "/login-account";
        }
    };

    const handleCloseAccount = () => {
        if (userName) {
            // Redirect to close account page
            window.location.href = "/close-account";
        }
    };

    return (
        <div>
            <nav className="bg-gray-800">
                <div className="container mx-auto">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0">
                                <Link href="/" className="text-white font-bold text-2xl">Eiffel Team</Link>
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4" style={{ border: '1px solid red' }}>
                                    <Link href="/view-items" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">View Items</Link>
                                    {userType === 'seller' ? (
                                        <>
                                            <Link href="/add-item" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Item</Link>
                                            <Link href="/review-items" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Review Items</Link>
                                        </>
                                    ) : userType === 'buyer' ? (
                                        <Link href="/add-funds" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Funds</Link>
                                    ) : null}
                                    
                                    {/* Conditionally render "Create Account" only if not logged in */}
                                    {!userName && (
                                        <Link href="/create-account" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Account</Link>
                                    )}
                                    
                                    {/* Conditionally render "Close Account" if logged in */}
                                    {userName && (
                                        <button onClick={handleCloseAccount} className="text-gray-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Close Account</button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button onClick={handleLoginLogout} className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                {userName ? 'Logout' : 'Login'}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;