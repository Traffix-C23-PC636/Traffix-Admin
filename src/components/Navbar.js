import Link from 'next/link';
import {useRouter} from "next/router";
import {signOut} from "next-auth/react";

export default function Navbar() {
    const router = useRouter()

    const signOutHandler = async (e) => {
        e.preventDefault();
        await signOut({callbackUrl: "/"})
    }
    return (
        <nav className="flex items-center justify-between bg-white shadow-sm p-4 px-20">
            <div>
                <Link href="/">
                    <p className="text-gray-800 font-semibold text-xl">Traffix</p>
                </Link>
            </div>
            <div className="flex space-x-4">
                <Link href="/admin">
                    <p className="text-gray-800 hover:text-gray-600 cursor-pointer">Dashboard</p>
                </Link>
                <Link href="/admin">
                    <p className="text-gray-800 hover:text-gray-600 cursor-pointer">Data Kota</p>
                </Link>
                <Link href="/admin/atcs">
                    <p className="text-gray-800 hover:text-gray-600 cursor-pointer">Data ATCS</p>
                </Link>
                <div onClick={signOutHandler}>
                    <p className="text-gray-800 hover:text-gray-600 cursor-pointer">Log Out</p>
                </div>
            </div>
        </nav>
    );
}
