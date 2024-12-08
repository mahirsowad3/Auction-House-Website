'use client';

import React from 'react';

const AdminDashboard = () => {
    return (
        <main className="container mx-auto mt-5">
            <h1 className="text-4xl mb-6">Admin Dashboard</h1>

            <section className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Admin Actions</h2>

                <div className="space-y-4">
                    <button
                        onClick={() => alert('Freeze/Unfreeze Item clicked')}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Freeze/Unfreeze Item
                    </button>

                    <button
                        onClick={() => alert('Generate Auction Report clicked')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Generate Auction Report
                    </button>

                    <button
                        onClick={() => alert('Generate Forensics Report clicked')}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Generate Forensics Report
                    </button>
                </div>
            </section>
        </main>
    );
};

export default AdminDashboard;
