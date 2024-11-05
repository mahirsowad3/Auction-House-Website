"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const baseURL =
  "https://ziek69aur9.execute-api.us-east-2.amazonaws.com/initial";

export default function ListItems() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${baseURL}/view-items`);
        const data = JSON.parse(response.data.body);
        console.log("Fetched Items:", data);
        setItems(data);
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
      <h1 className="text-4xl font-bold text-start mb-6">Customer View</h1>
      <hr />
      <h1 className="mt-3 text-2xl font-bold text-start mb-6">Active Items</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.ItemID}
            className="bg-white shadow-md rounded-md border p-4"
          >
            {/* Display images */}
            {item.Images && item.Images.length > 0 && (
              <div className="">
                {item.Images.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Image of ${item.Name}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2">{item.Name}</h2>

            <p className="text-gray-700 mb-2">
              Price: ${item.HighestBid ? item.HighestBid : item.InitialPrice}
            </p>

            <p className="text-gray-700 mb-4">{item.ItemDescription}</p>

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
