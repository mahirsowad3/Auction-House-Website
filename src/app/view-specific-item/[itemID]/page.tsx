import React from "react";

export default async function ItemDetail({ params }: { params: { itemID: string } }) {
    const { itemID } = params; // No need to await params since they're passed as props

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Item Details</h1>
            <p>Details for Item ID: {itemID}</p>
        </div>
    );
}

export async function generateStaticParams() {
    const baseURL = "https://ziek69aur9.execute-api.us-east-2.amazonaws.com/initial";
    const response = await fetch(`${baseURL}/view-items`);
    const data = await response.json();
    const items = JSON.parse(data.body);

    return items.map((item: { ItemID: number }) => ({
        itemID: item.ItemID.toString(),
    }));
}
