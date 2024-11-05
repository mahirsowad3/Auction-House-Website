'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewItemCardComponent from './ReviewItemCardComponent'
import Link from 'next/link';
import ItemFilter from "./ItemFilter";
const baseURL = "https://ziek69aur9.execute-api.us-east-2.amazonaws.com/initial";

export default function ReviewItems() {
    const [userType, setUserType] = React.useState<string | null>(null);
    const [userName, setUserName] = React.useState<string | null>(null);
    const [passowrd, setPassowrd] = React.useState<string | null>(null); 
    const [items, setItems] = useState<any[]>([]);
    const [chosenFilter, setChosenFilter] = React.useState<string>('');
    React.useEffect(() => {
        setUserType(sessionStorage.getItem('userType'));
        setUserName(sessionStorage.getItem('userName'));
        setPassowrd(sessionStorage.getItem('password'));

        const getSellerItems = async () => {
            const response = await axios.post(`${baseURL}/review-items`,{
                body: {
                    username: sessionStorage.getItem('userName'),
                    password: sessionStorage.getItem('password'),
                }

            });
            console.log(JSON.parse(response.data.body));
            setItems(JSON.parse(response.data.body));
        };
        getSellerItems();
    }, []);

    const filteredItems = items.filter((item: any) => 
        chosenFilter === '' || item.ActivityStatus === chosenFilter);

  return (
    <main >
        <div className="container mx-auto mt-5">
            <h1 className="text-4xl mb-6">Review Items Page</h1>
            <ItemFilter {...{ chosenFilter, setChosenFilter}}/>
            <div className="grid grid-cols-4 gap-4">
                {filteredItems.map((item, index) => (
                    <Link href = "/review-item-specific-item" key = {index}>
                         <ReviewItemCardComponent {...item}  />
                    </Link>
                ))}
            </div>
        </div>
    </main>
  );
}
