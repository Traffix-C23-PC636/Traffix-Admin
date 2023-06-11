import {createContext, useEffect, useState} from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {initializeApp} from "firebase/app";
import {useRouter} from "next/router";
import Image from "next/image";

export const SessionContext = createContext(null);

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

const SessionsProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const app = initializeApp(firebaseConfig);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="w-full flex flex-col justify-center items-center h-screen">
                <Image width={80} height={80} src={'/loader.gif'}  alt={'Loading'}/>
                <span className="text-green-500">Loading</span>
            </div>
        )
    }

    return (
        <SessionContext.Provider value={user}>
            {children}
        </SessionContext.Provider>
    );
};

// Fungsi untuk memeriksa apakah email diizinkan


export default SessionsProvider
