'use client'
import axios from "axios";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const baseURL = "https://ziek69aur9.execute-api.us-east-2.amazonaws.com/initial";

export default function Home() {
    const [itemID, setItemID] = React.useState<number | null>(null);
    const [itemName, setItemName] = React.useState<string | null>(null);
    const [itemDescription, setItemDescription] = React.useState<string | null>(null);
    const [initialPrice, setInitialPrice] = React.useState<number | null>(null);
    const [bidStartDate, setBidStartDate] = React.useState<string | null>(null);
    const [bidEndDate, setBidEndDate] = React.useState<string | null>(null);
    const [bids, setBids] = React.useState<[] | null>(null);
    const [publishedDate, setPublishedDate] = React.useState<string | null>(null);
    const [soldDate, setSoldDate] = React.useState<string | null>(null);
    const [isFrozen, setIsFrozen] = React.useState<number | null>(null);
    const [requestedUnfreeze, setRequestedUnfreeze] = React.useState<number | null>(null);
    const [creator, setCreator] = React.useState<string | null>(null);
    const [buyerSoldTo, setBuyerSoldTo] = React.useState<string | null>(null);
    const [activityStatus, setActivityStatus] = React.useState<string | null>(null);
    const [pictures, setPictures] = React.useState<[] | null>(null);
    const router = useRouter();
    const [bidEndDateTooSoon, setBidEndDateTooSoon] = React.useState<boolean>(false); // to indicate if today's publish date will be later than the currently entered end date

    // loading use state variables
    const [pageLoading, setPageLoading] = React.useState<boolean>(true);
    const [removeItemLoading, setRemoveItemLoading] = React.useState<boolean>(false);
    const [publishItemLoading, setPublishItemLoading] = React.useState<boolean>(false);
    const [unpublishItemLoading, setUnpublishItemLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        const selectedItemID = sessionStorage.getItem('selectedItemID');
        if (selectedItemID) {
            console.log('Selected item ID:', selectedItemID);
            setItemID(Number(selectedItemID));

            const payload = {
                body: {
                    username: sessionStorage.getItem('userName'),
                    password: sessionStorage.getItem('password'),
                    itemID: selectedItemID,
                }
            };

            const getReviewSpecificItem = async () => {
                try {
                    const response = await axios.post(`${baseURL}/review-items-specific-item`, payload, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    console.log('Response from getReviewSpecificItem:', JSON.parse(response.data.body));

                    const item = JSON.parse(response.data.body);
                    setItemName(item.Name);
                    setItemDescription(item.ItemDescription);
                    setInitialPrice(item.InitialPrice);
                    setBidStartDate(item.BidStartDate);
                    setBidEndDate(item.BidEndDate);
                    setBids(item.Bids);
                    setPublishedDate(item.PublishedDate);
                    setSoldDate(item.SoldDate);
                    setIsFrozen(item.IsFrozen);
                    setRequestedUnfreeze(item.requestedunfreeze);
                    setCreator(item.Creator);
                    setBuyerSoldTo(item.BuyerSoldTo);
                    setActivityStatus(item.ActivityStatus);
                    setPictures(item.Pictures);
                } catch (error) {
                    console.error('Error getting specified item: ', error);
                } finally {
                    setPageLoading(false);
                }
            };

            getReviewSpecificItem();
        };
    }, []);

    // handle remove item
    const handleRemoveItem = async () => {
        setRemoveItemLoading(true);

        const payload = {
            body: {
                username: sessionStorage.getItem('userName'),
                password: sessionStorage.getItem('password'),
                itemID: itemID,
            }
        };

        try {
            const response = await axios.post(`${baseURL}/remove-inactive-item`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response from remove-inactive-item:', response.data.body);
        } catch (error) {
            console.error('Error removing Inactive item:', error);
        } finally {
            setRemoveItemLoading(false);
            sessionStorage.removeItem('selectedItemID');
            router.push('/review-items');
        }
    };

    // to check if seller can publish item
    const canPublishItem = () => {
        if (
            activityStatus?.toLowerCase() === "inactive" &&
            bidEndDate &&
            bidEndDate > new Date().toISOString()) {
            setBidStartDate(new Date().toISOString());
            console.log('Can publish item');
            return true;
        } else if (bidEndDate && bidEndDate < new Date().toISOString()) {
            console.log('Bid end date is too soon');
            setBidEndDateTooSoon(true);
            return false;
        }
        else {
            return false;
        }
    };

    // handle publish item
    const handlePublishItem = async () => {
        setPublishItemLoading(true);

        const payload = {
            body: {
                username: sessionStorage.getItem('userName'),
                password: sessionStorage.getItem('password'),
                itemID: itemID,
            }
        };

        try {
            const response = await axios.post(`${baseURL}/publish-item`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response from publish-item:', JSON.parse(response.data.body));
            const updatedItem = JSON.parse(response.data.body);
            setItemName(updatedItem.Name);
            setItemDescription(updatedItem.ItemDescription);
            setInitialPrice(updatedItem.InitialPrice);
            setBidStartDate(updatedItem.BidStartDate);
            setBidEndDate(updatedItem.BidEndDate);
            setBids(updatedItem.Bids);
            setPublishedDate(updatedItem.PublishedDate);
            setSoldDate(updatedItem.SoldDate);
            setIsFrozen(updatedItem.IsFrozen);
            setRequestedUnfreeze(updatedItem.requestedunfreeze);
            setCreator(updatedItem.Creator);
            setBuyerSoldTo(updatedItem.BuyerSoldTo);
            setActivityStatus(updatedItem.ActivityStatus);
            // setPictures(updatedItem.Pictures);
        } catch (error) {
            console.error('Error publishing item:', error);
        } finally {
            setPublishItemLoading(false);
        }
    };

    // handle unpublish item
    const handleUnpublishItem = async () => {
        setUnpublishItemLoading(true);

        const payload = {
            body: {
                username: sessionStorage.getItem('userName'),
                password: sessionStorage.getItem('password'),
                itemID: itemID,
            }
        };

        try {
            const response = await axios.post(`${baseURL}/unpublish-item`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response from unpublish-item:', JSON.parse(response.data.body));
            const updatedItem = JSON.parse(response.data.body);
            setItemName(updatedItem.Name);
            setItemDescription(updatedItem.ItemDescription);
            setInitialPrice(updatedItem.InitialPrice);
            setBidStartDate(updatedItem.BidStartDate);
            setBidEndDate(updatedItem.BidEndDate);
            setBids(updatedItem.Bids);
            setPublishedDate(updatedItem.PublishedDate);
            setSoldDate(updatedItem.SoldDate);
            setIsFrozen(updatedItem.IsFrozen);
            setRequestedUnfreeze(updatedItem.requestedunfreeze);
            setCreator(updatedItem.Creator);
            setBuyerSoldTo(updatedItem.BuyerSoldTo);
            setActivityStatus(updatedItem.ActivityStatus);
            // setPictures(updatedItem.Pictures);
        } catch (error) {
            console.error('Error unpublishing item:', error);
        } finally {
            setUnpublishItemLoading(false);
        }
    };

    // if fetching data is taking too long
    if (pageLoading) {
        return (<div className="flex items-center justify-center">
            <LoadingSpinner />;
        </div>)
    }

    return (
        <main>
            <div className="container mx-auto mt-5">
                <h1 className="text-4xl rounded bg-slate-200 p-2">Item ID: {itemID}</h1>
                <h2 className="text-2xl mt-4 rounded bg-slate-200 p-2">Item Name: {itemName}</h2>
                <div className="mt-4 rounded bg-slate-200 p-2">
                    {pictures &&
                        <Carousel>
                            {pictures.map((picture: any, index: number) => (
                                <div key={index}>
                                    <img src={picture.URL} />
                                </div>
                            ))}
                        </Carousel>
                    }
                </div>
                <div className="mt-4 rounded bg-slate-200 p-2">
                    <h2 className="text-2xl">Item Description: </h2>
                    <p className="text-xl">{itemDescription}</p>
                </div>
                <div className="mt-4 rounded bg-slate-200 p-2">
                    <h2 className="text-2xl">Initial Price: </h2>
                    <p className="text-xl">${initialPrice}</p>
                </div>
                <div className="mt-4 rounded bg-slate-200 p-2">
                    <h2 className="text-2xl">Bid Start Date: </h2>
                    <p className="text-xl">{bidStartDate}</p>
                </ div>
                <div className="mt-4 rounded bg-slate-200 p-2">
                    <h2 className="text-2xl">Bid End Date: </h2>
                    <p className="text-xl">{bidEndDate}</p>
                </div>
                <div className="mt-4 rounded bg-slate-200 p-2">
                    <h2 className="text-2xl">Published Date: </h2>
                    <p className="text-xl">{publishedDate}</p>
                </div>
                {activityStatus?.toLowerCase() === "archived" &&
                    < div className="mt-4 rounded bg-slate-200 p-2">
                        <h2 className="text-2xl">Sold Date: </h2>
                        <p className="text-xl">{soldDate}</p>
                    </div>}
                {/* Bid Table for Bids When Item is published */}
                {activityStatus?.toLowerCase() === "active" &&
                    <div className="flex justify-center mt-4 rounded bg-slate-200">
                        {!bids || bids.length === 0 ?
                            <div>No bids have been placed yet</div> :
                            (<table className="table-auto">
                                <thead>
                                    <tr className="flex justify-around">
                                        <th className="px-4 py-2">Bid ID</th>
                                        <th className="px-4 py-2">Item ID</th>
                                        <th className="px-4 py-2">Buyer</th>
                                        <th className="px-4 py-2">Placement Date</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>)}
                    </div>}
                {/* Buttons */}
                <div className="flex justify-between mt-4 mb-8">
                    {activityStatus?.toLowerCase() === "inactive" &&
                        <button
                            onClick={handleRemoveItem}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            {removeItemLoading ?
                                <LoadingSpinner /> :
                                "Remove Item"}
                        </button>}
                    {activityStatus?.toLowerCase() === "inactive" &&
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                if (canPublishItem()) {
                                    handlePublishItem();
                                }
                            }}>
                            {publishItemLoading ?
                                <LoadingSpinner /> :
                                "Publish Item"}
                        </button>}
                    {activityStatus?.toLowerCase() === "active" && (bids == null || bids?.length === 0) &&
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleUnpublishItem}>
                            {unpublishItemLoading ?
                                <LoadingSpinner /> :
                                "Unpublish Item"}
                        </button>}
                    {activityStatus?.toLowerCase() === "inactive" &&
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                sessionStorage.setItem('editItemID', itemID!.toString());
                                router.push('/review-items/specific-item/edit-item');
                            }}>
                            Edit Details
                        </button>}
                </div>
                {/* Publish Item Error Message Below */}
                {bidEndDateTooSoon &&
                    <div className="mt-4 rounded bg-red-200 p-2">
                        <h2 className="text-2xl">Error: </h2>
                        <p className="text-xl">
                            Bid End Date is before the publish date (today) of this item. Please click "Edit Details" button to update the Bid End Date.
                        </p>
                    </div>}
                {/* Back to Review Items Button Below */}
                <div className="flex justify-center mt-4 mb-8">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            sessionStorage.removeItem('selectedItemID');
                            router.back();
                        }}>
                        Go Back to Review Items
                    </button>
                </div>
            </div>
        </main >
    );
}
