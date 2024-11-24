'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const baseURL = "https://ziek69aur9.execute-api.us-east-2.amazonaws.com/initial";

const Navbar = () => {
    const router = useRouter();
    const [userType, setUserType] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [funds, setFunds] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const syncSessionState = () => {
        const storedUserType = sessionStorage.getItem('userType');
        const storedUserName = sessionStorage.getItem('userName');
        setUserType(storedUserType);
        setUserName(storedUserName);
    };

    useEffect(() => {
        syncSessionState();
        const handleStorageChange = () => syncSessionState();
        window.addEventListener('storage', handleStorageChange);

        // to get the seller's funds
        const getSellerInformation = async () => {
            const payload = {
                body: {
                    username: sessionStorage.getItem('userName'),
                    password: sessionStorage.getItem('password'),
                }
            };
            try {
                const response = await axios.post(`${baseURL}/get-seller-information`, payload, {
                    headers: { 'Content-Type': 'application/json' },
                });

                const sellerFunds = JSON.parse(response.data.body).Funds;
                console.log("Seller's funds: ", sellerFunds);
                setFunds(sellerFunds);
            } catch (error) {
                console.error("Error retrieving the seller's information: ", error);
            }
        };

        if (sessionStorage.getItem("userType") === 'seller') {
            getSellerInformation();
        } else if (sessionStorage.getItem("userType") === 'buyer') {
            // call function to get buyer's funds when implemented
        }

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLoginLogout = () => {
        if (userName) {
            sessionStorage.clear();
            syncSessionState();
            router.push('/view-items');
        } else {
            router.push('/login-account');
        }
    };

    const handleCloseAccount = async () => {
        if (!userName) {
            alert("Username is not available. Please log in.");
            return;
        }

        if (!confirm("Are you sure you want to close your account? This action cannot be undone.")) {
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/close-account`, {
                body: { username: userName },
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            const { statusCode, message: responseMessage } = response.data;

            if (statusCode === 404) {
                alert("User not found.");
            } else if (statusCode === 400) {
                alert("Cannot close account with active auctions.");
            } else if (statusCode === 200) {
                alert("Account closed successfully!");

                sessionStorage.clear();
                localStorage.clear();
                document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                syncSessionState();
                router.push('/view-items');
            } else {
                alert(responseMessage || "An unexpected error occurred. Please try again later.");
            }
        } catch (err: any) {
            alert('An error occurred. Please try again later.');
        }
    };


    return (
        <div>
            <nav className="bg-gray-800">
                <div className="container mx-auto">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0">
                                <Link href="/" className="text-white font-bold text-2xl">
                                    Eiffel Team
                                </Link>
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    {userType !== 'seller' && (
                                        <Link
                                            href="/view-items"
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            View Items
                                        </Link>
                                    )}
                                    {userType === 'seller' ? (
                                        <>
                                            <Link
                                                href="/add-item"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                Add Item
                                            </Link>
                                            <Link
                                                href="/review-items"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                Review Items
                                            </Link>
                                        </>
                                    ) : userType === 'buyer' ? (
                                        <Link
                                            href="/add-funds"
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Add Funds
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {userName && funds && (
                                <button
                                    onClick={() => {
                                        alert(`Your funds: $${funds}`)
                                    }}
                                    className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                                    See Your Funds
                                </button>)}
                            <button
                                onClick={handleLoginLogout}
                                className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                {userName ? 'Logout' : 'Login'}
                            </button>

                            {!userName && (
                                <Link
                                    href="/create-account"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Create Account
                                </Link>
                            )}
                            {userName && (
                                <button
                                    onClick={handleCloseAccount}
                                    className="text-gray-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Close Account
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
