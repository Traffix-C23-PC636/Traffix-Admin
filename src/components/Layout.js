import React, {useContext, useEffect, useState} from 'react';
import Navbar from './Navbar';
import {SessionContext} from "@/context/SessionProvider";
import {useRouter} from "next/navigation";
import Image from "next/image";

const Layout = ({ children }) => {
    const user = useContext(SessionContext);
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)


    useEffect(()=>{
        if (!user) {
            router.push("/");
        } else {
            setIsLoading(false)
        }
    },[router, user])

    return (
        (!isLoading) ?
            <>
                <div>
                    <Navbar />
                    {children}
                </div>
            </>
            :
            <>
                <div className="w-full flex flex-col justify-center items-center h-screen">
                    <Image width={80} height={80} src={'/loader.gif'}  alt={'Loading'}/>
                    <span className="text-green-500">
                    Loading
                </span>
                </div>
            </>
    );
};

export default Layout;
