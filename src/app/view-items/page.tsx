'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "https://ziek69aur9.execute-api.us-east-2.amazonaws.com/initial";
export default function ListItems() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${baseURL}/view-items`);
                console.log(JSON.parse(response.data.body));
                setItems(JSON.parse(response.data.body));
            } catch (error) {
                setError("Failed to fetch items.");
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Active Items</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                    <div key={item.ItemID} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-2">{item.Name}</h2>
                        <p className="text-gray-700 mb-2">Price: ${item.InitialPrice}</p>
                        <p className="text-gray-500 text-sm mb-2">
                            Start Date: {new Date(item.BidStartDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500 text-sm">
                            End Date: {new Date(item.BidEndDate).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}
