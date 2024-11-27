'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
    const router = useRouter();
    const [userType, setUserType] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [funds, setFunds] = useState<number | null>(null);

    const syncSessionState = () => {
        const storedUserType = sessionStorage.getItem('userType');
        const storedUserName = sessionStorage.getItem('userName');
        setUserType(storedUserType || null);
        setUserName(storedUserName || null);
    };

    useEffect(() => {
        // Initial synchronization
        syncSessionState();

        // Listen for custom sessionUpdated events
        const handleSessionUpdated = (event: CustomEvent<{ userType: string; userName: string }>) => {
            const { userType, userName } = event.detail;
            setUserType(userType);
            setUserName(userName);
        };

        // Add event listener
        window.addEventListener('sessionUpdated', handleSessionUpdated as EventListener);

        return () => {
            // Remove event listener on cleanup
            window.removeEventListener('sessionUpdated', handleSessionUpdated as EventListener);
        };
    }, []);

    const handleLoginLogout = () => {
        if (userName) {
            sessionStorage.clear();
            const sessionUpdatedEvent = new CustomEvent('sessionUpdated', { detail: { userType: null, userName: null } });
            window.dispatchEvent(sessionUpdatedEvent);

            router.push('/');
        } else {
            router.push('/login-account');
        }
    };

    const handleCloseAccount = async () => {
        // Close account logic...
    };

    const handleSeeYourFunds = () => {
        if (funds !== null) {
            alert(`Your funds: $${funds}`);
        } else {
            alert('Unable to fetch funds. Please try again later.');
        }
    };

    return (
        <nav className="bg-gray-800">
            <div className="container mx-auto">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <Link href="/" className="text-white font-bold text-2xl">
                            Eiffel Team
                        </Link>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {userType !== 'Seller' && (
                                    <Link href="/view-items" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        View Items
                                    </Link>
                                )}
                                {userType === 'Seller' && (
                                    <>
                                        <Link href="/add-item" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                            Add Item
                                        </Link>
                                        <Link href="/review-items" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                            Review Items
                                        </Link>
                                    </>
                                )}
                                {userType === 'Buyer' && (
                                    <Link href="/add-funds" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Add Funds
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {userName && funds !== null && funds >= 0 && (
                            <button onClick={handleSeeYourFunds} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                See Your Funds
                            </button>
                        )}
                        <button onClick={handleLoginLogout} className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                            {userName ? 'Logout' : 'Login'}
                        </button>
                        {!userName && (
                            <Link href="/create-account" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Create Account
                            </Link>
                        )}
                        {userName && (
                            <button onClick={handleCloseAccount} className="text-gray-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Close Account
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
