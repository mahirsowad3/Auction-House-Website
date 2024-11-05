

import React from "react";


export interface ReviewItemCardComponentProps {
    ActivityStatus: string | null;
    BidEndDate: string | null;
    BidStartDate: string | null;
    BuyerSoldTo: string | null;
    Creator: string | null;
    InitialPrice: Number | null;
    IsFrozen: number | null;
    ItemDescriptioon: string | null;
    ItemID: number;
    Name: string | null;
    PublishedDate: string | null;
    SoldDate: string | null;
    requestedunfreeze: number | null;
}

export default function Home(item: ReviewItemCardComponentProps) {

    return (
        <main>
            <div className="block max-w-sm p-6 bg-slate-100 border border-gray-400 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ItemID: {item.ItemID}</h1>
                <h1 className="font-normal text-gray-700 dark:text-gray-400">ItemName: {item.Name}</h1>
            </div>
        </main>
    );
}

