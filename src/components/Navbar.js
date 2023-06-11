import Link from 'next/link';
import {useRouter} from "next/router";
import {getAuth, signOut} from "firebase/auth";
import {useContext} from "react";
import {SessionContext} from "@/context/SessionProvider";
import Image from "next/image";


export default function Navbar() {
    const router = useRouter()
    const user = useContext(SessionContext);

    const auth = getAuth();

    const signOutHandler = async (e) => {
        e.preventDefault();
        await signOut(auth).then(()=>{
            router.replace('/')
        })
    }
    return (
        <nav className="flex items-center justify-between bg-white shadow-sm p-4 px-20">
            <div className={`flex items-center`}>
                <Image
                    src={user? user.photoURL : ''} // Ganti dengan URL atau path gambar avatar
                    alt="Avatar"
                    width={50} // Ganti dengan lebar yang diinginkan
                    height={50} // Ganti dengan tinggi yang diinginkan
                    className="rounded-full"
                />
                <Link href="/">
                    <p className="text-gray-800 font-semibold text-xl ml-5">Hi, {
                        user ? user.displayName.split(' ')[0] : ''
                    }</p>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <Link href="/admin">
                    <p className="text-gray-800 hover:text-gray-600 cursor-pointer">Data Kota</p>
                </Link>
                <Link href="/admin/atcs">
                    <p className="text-gray-800 hover:text-gray-600 cursor-pointer">Data ATCS</p>
                </Link>
                <div className={`bg-red-600 text-white rounded px-3 py-2 cursor-pointer`} onClick={signOutHandler}>
                    <p className="cursor-pointer">Log Out</p>
                </div>
            </div>
        </nav>
    );
}
