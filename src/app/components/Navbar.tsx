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

    const syncSessionState = () => {
        const storedUserType = sessionStorage.getItem('userType');
        const storedUserName = sessionStorage.getItem('userName');
        setUserType(storedUserType);
        setUserName(storedUserName);
    };

    const fetchFunds = async () => {
        const payload = {
          body: {
            username: sessionStorage.getItem("userName"),
            password: sessionStorage.getItem("password"),
          },
        };
      
        try {
          let fundsResponse;
          console.log("User type:", userType);
          if (userType === "Seller") {
            const response = await axios.post(
              `${baseURL}/get-seller-information`,
              payload,
              {
                headers: { "Content-Type": "application/json" },
              }
            );
      
            if (response.data?.body) {
              const parsedBody = JSON.parse(response.data.body);
              fundsResponse = parsedBody?.Funds;
            }
          } else if (userType === "Buyer") {
            const response = await axios.post(
              `${baseURL}/get-buyer-information`,
              payload,
              {
                headers: { "Content-Type": "application/json" },
              }
            );
      
            if (response.data?.body) {
              const parsedBody = JSON.parse(response.data.body);
              fundsResponse = parsedBody?.AccountFunds;
            }
          }
      
          if (!fundsResponse) throw new Error("Funds field is missing in the response.");
          setFunds(fundsResponse);
        } catch (error) {
          console.error("Error retrieving funds:", error);
          setFunds(null);
        }
      };

    useEffect(() => {
        syncSessionState();
        const handleStorageChange = () => syncSessionState();
        window.addEventListener('storage', handleStorageChange);

        if (userType) {
            fetchFunds();
        }

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [userType]);

    const handleLoginLogout = () => {
        if (userName) {
            sessionStorage.clear();
            syncSessionState();
            router.push('/');
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
                body: {
                    username: userName,
                    userType: userType, // Pass userType to distinguish between seller and buyer
                },
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            const { statusCode, message: responseMessage } = response.data;

            if (statusCode === 404) {
                alert("User not found.");
            } else if (statusCode === 400) {
                alert(responseMessage || "Cannot close account with active engagements.");
            } else if (statusCode === 200) {
                alert("Account closed successfully!");

                sessionStorage.clear();
                localStorage.clear();
                document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                syncSessionState();
                router.push('/');
            } else {
                alert(responseMessage || "An unexpected error occurred. Please try again later.");
            }
        } catch (err: any) {
            console.error("Error closing account:", err);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleSeeYourFunds = () => {
        if (funds !== null) {
            alert(`Your funds: $${funds}`);
        } else {
            alert('Unable to fetch funds. Please try again later.');
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
                                    {userType !== 'Seller' && (
                                        <Link
                                            href="/view-items"
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            View Items
                                        </Link>
                                    )}
                                    {userType === 'Seller' ? (
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
                                    ) : userType === 'Buyer' ? (
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
                            {userName && funds !== null && (
                                <button
                                    onClick={handleSeeYourFunds}
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    See Your Funds
                                </button>
                            )}
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
