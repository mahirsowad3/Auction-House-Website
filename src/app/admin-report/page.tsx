'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = "https://ziek69aur9.execute-api.us-east-2.amazonaws.com/initial";

const AdminFunds = () => {
    const [funds, setFunds] = useState<number | null>(null);
    const [auctionData, setAuctionData] = useState<any[]>([]);
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
                    body: {
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

        const fetchAuctionData = async () => {
            const username = sessionStorage.getItem("userName");
            const password = sessionStorage.getItem("password");

            if (!username || !password) {
                setError("Please log in as an admin to view funds.");
                return;
            }
            try {
                const response = await axios.post(`${baseURL}/get-admin-information`, {
                    body: {
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
        fetchAuctionData();
    }, []);

    return (
        <div className="container mx-auto mt-5">
            <div className="px-8 pt-6 pb-8 mb-4 border">
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
                <br />
                <h1 className="text-2xl font-bold mb-4">Auction Forensics</h1>
                <div className="overflow-x-auto mt-6">
                    <table className="table-auto w-full text-left border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border border-gray-200">Item</th>
                                <th className="px-4 py-2 border border-gray-200">Bid</th>
                                <th className="px-4 py-2 border border-gray-200">Seller's Name</th>
                                <th className="px-4 py-2 border border-gray-200">Buyer's Name</th>
                                <th className="px-4 py-2 border border-gray-200">Sold Date</th>
                                <th className="px-4 py-2 border border-gray-200">Total #bid</th>
                                <th className="px-4 py-2 border border-gray-200">Lowest Bid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auctionData.map((auction, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border border-gray-200">{auction.item}</td>
                                    <td className="px-4 py-2 border border-gray-200">${auction.bid}</td>
                                    <td className="px-4 py-2 border border-gray-200">{auction.sellerName}</td>
                                    <td className="px-4 py-2 border border-gray-200">{auction.buyerName}</td>
                                    <td className="px-4 py-2 border border-gray-200">{auction.soldDate}</td>
                                    <td className="px-4 py-2 border border-gray-200">{auction.totalBids}</td>
                                    <td className="px-4 py-2 border border-gray-200">${auction.lowestBid}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminFunds;
