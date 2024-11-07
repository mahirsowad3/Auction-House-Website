'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const baseURL = "https://ziek69aur9.execute-api.us-east-2.amazonaws.com/initial";

export default function CloseAccountPage() {
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    const router = useRouter();
    
    // Assuming username is stored in sessionStorage when the user is logged in

    useEffect(() => {
        const username = sessionStorage.getItem('userName');
        setUsername(username);
    }, []);

    const handleCloseAccount = async () => {
        setMessage(null);
        setError(null);

        if (!username) {
            setError("Username is not available. Please log in.");
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/close-account`, {
                body: {
                    username,
                },
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log("Close Account Response:", response);

            const { statusCode, message: responseMessage } = response.data;

            if (statusCode === 404) {
                setError("User not found.");
            } else if (statusCode === 400) {
                setError("Cannot close account with active auctions.");
            } else if (statusCode === 200) {
                setMessage("Account closed successfully!");
                sessionStorage.clear();
                localStorage.clear(); 
                document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                router.push("/view-items");
                
            } else {
                setError(responseMessage || "An unexpected error occurred. Please try again later.");
            }
        } catch (err: any) {
            console.error("Error caught in catch block:", err);
            console.error("Error response:", err.response);
            console.error("Error message:", err.message);

            if (err.response && err.response.status === 500) {
                setError('Failed to close account. Please try again.');
            } else if (err.message.includes("Network Error")) {
                setError('Network error. Please check your connection and try again.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <main className="container mx-auto mt-5">
            <h1 className="text-4xl mb-6">Close Account</h1>

            {/* Display success or error messages */}
            {message && <div className="text-green-500 mb-4">{message}</div>}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <button
                onClick={handleCloseAccount}
                className="w-full p-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Close Account
            </button>
        </main>
    );
}
