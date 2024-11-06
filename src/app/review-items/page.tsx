'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import ItemFilter from "./ItemFilter";
import ReviewItemCardComponent, { ReviewItemCardComponentProps } from './ReviewItemCardComponent';
const baseURL = "https://ziek69aur9.execute-api.us-east-2.amazonaws.com/initial";

export default function ReviewItems() {
    const [userType, setUserType] = React.useState<string | null>(null);
    const [userName, setUserName] = React.useState<string | null>(null);
    const [password, setPassword] = React.useState<string | null>(null);
    const [items, setItems] = React.useState<any[]>([]);
    const [chosenFilter, setChosenFilter] = React.useState<string>('');
    const router = useRouter();

    React.useEffect(() => {
        setUserType(sessionStorage.getItem('userType'));
        setUserName(sessionStorage.getItem('userName'));
        setPassword(sessionStorage.getItem('password'));

        const getSellerItems = async () => {
            const response = await axios.post(`${baseURL}/review-items`, {
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
                <ItemFilter {...{ chosenFilter, setChosenFilter }} />
                <div className="grid grid-cols-4 gap-4">
                    {filteredItems.map((item: ReviewItemCardComponentProps, index: number) => (
                        <div
                            key={index}
                            onClick={() => {
                                console.log('Clicked on item with ID ', item.ItemID);
                                sessionStorage.setItem('selectedItemID', item.ItemID.toString());
                                router.push('/review-items/specific-item');
                            }}>
                            <ReviewItemCardComponent {...item} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
