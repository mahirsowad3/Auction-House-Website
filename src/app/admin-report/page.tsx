'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = "https://ziek69aur9.execute-api.us-east-2.amazonaws.com/initial";

const AdminFunds = () => {
    const [funds, setFunds] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdminFunds = async () => {
            const username = sessionStorage.getItem("userName");
            const password = sessionStorage.getItem("password");

            if (!username || !password) {
                setError("Please log in as an admin to view funds.");
                return;
            }

            try {
                const response = await axios.post(`${baseURL}/get-admin-information`, {
                    body:{
                        username,
                        password,
                    }
                   
                }, {
                    headers: { 'Content-Type': 'application/json' },
                });
                let res = JSON.parse(response.data.body);

                if (res && res.TotalACFunds !== undefined) {
                    setFunds(res.TotalACFunds);
                } else {
                    setError("Failed to fetch funds. Please try again later.");
                }
            } catch (err) {
                console.error("Error fetching funds:", err);
                setError("An error occurred while fetching funds.");
            }
        };

        fetchAdminFunds();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl font-bold mb-4">Auction Report</h1>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : funds !== null ? (
                    <p className="text-gray-700 text-lg">
                        Total Funds: <span className="font-bold">${funds.toFixed(2)}</span>
                    </p>
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default AdminFunds;
