'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles

const baseURL = "https://ziek69aur9.execute-api.us-east-2.amazonaws.com/initial";

export default function ListItems() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [sortOption, setSortOption] = useState<string>(""); 
    const [sortOrder, setSortOrder] = useState<string>("asc");
    const [searchTerm, setSearchTerm] = useState<string>("");
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/view-items`);
            const data = JSON.parse(response.data.body);
            setItems(data);
        } catch (error) {
            setError("Failed to fetch items.");
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    // Filter and sort items based on the selected options
    const filteredAndSortedItems = items
        .filter((item) => {
            return (
                item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.ItemDescription.toLowerCase().includes(searchTerm.toLowerCase())
            );
        })
        .sort((a, b) => {
            if (sortOption === "price") {
                const priceA = a.HighestBid || a.InitialPrice;
                const priceB = b.HighestBid || b.InitialPrice;
                return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
            } else if (sortOption === "publishedDate") {
                return sortOrder === "asc"
                    ? new Date(a.BidStartDate).getTime() - new Date(b.BidStartDate).getTime()
                    : new Date(b.BidStartDate).getTime() - new Date(a.BidStartDate).getTime();
            } else if (sortOption === "expirationDate") {
                return sortOrder === "asc"
                    ? new Date(a.BidEndDate).getTime() - new Date(b.BidEndDate).getTime()
                    : new Date(b.BidEndDate).getTime() - new Date(a.BidEndDate).getTime();
            } else {
                return 0;
            }
        });


    if (loading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-start mb-6">Active Items</h1>

            {/* Search and Sort Section */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name or description"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded-md w-full md:w-1/3"
                />
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border p-2 rounded-md w-full md:w-1/6"
                >
                    <option value="">Sort By</option>
                    <option value="price">Price</option>
                    <option value="publishedDate">Published DateTime</option>
                    <option value="expirationDate">Expiration DateTime</option>
                </select>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border p-2 rounded-md w-full md:w-1/6"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredAndSortedItems.map((item) => (
                    <div key={item.ItemID} className="bg-white shadow-md rounded-lg p-4">
                        {/* Carousel for multiple images */}
                        {item.Images && item.Images.length > 0 && (
                            <Carousel
                                showThumbs={false}
                                showStatus={false}
                                infiniteLoop
                                className="mt-4 rounded-lg shadow-sm"
                            >
                                {item.Images.map((imageUrl: any, index: any) => (
                                    <div key={index}>
                                        <img
                                            src={imageUrl}
                                            alt={`Image of ${item.Name}`}
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        )}
                        <h2 className="text-xl font-semibold mb-2">{item.Name}</h2>
                        
                        {/* Display highest bid or initial price */}

                        {item.HighestBid ? (
                            <p className="text-gray-700 mb-2">Highest Bid: ${item.HighestBid}</p>
                        ) : (
                            <p className="text-gray-700 mb-2">
                                Price: ${item.InitialPrice} <span className="text-sm text-gray-500">(No bids yet)</span>
                            </p>
                        )}

                        <p className="text-gray-700 mb-4">{item.ItemDescription}</p>
                        <p className="text-gray-500 text-sm mb-2">
                            Published DateTime: {new Date(item.BidStartDate.replace(' ', 'T'))
                            .toLocaleDateString('en-US', {
                               month: '2-digit',
                               day: '2-digit',
                               year: 'numeric',
                               hour: '2-digit',
                               minute: '2-digit',
                               second: '2-digit',
                               hour12: false
                            })}
                        </p>
                        <p className="text-gray-500 text-sm">
                            Expiration DateTime: {new Date(item.BidEndDate.replace(' ', 'T'))
                            .toLocaleDateString('en-US', {
                                month: '2-digit',
                               day: '2-digit',
                               year: 'numeric',
                               hour: '2-digit',
                               minute: '2-digit',
                               second: '2-digit',
                               hour12: false
                            })}
                        </p>

                        
                    </div>
                ))}
            </div>
        </main>
    );
}