import {AiFillGoogleCircle} from "react-icons/ai";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import Head from "next/head";
import {useContext, useState} from "react";
import {SessionContext} from "@/context/SessionProvider";
import login from "@/utils/firebase";
import Layout from "@/components/Layout";
import axios from "axios";



export default function Homepage() {
    const user = useContext(SessionContext);
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const startbatch = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            await axios.get('https://asia-southeast2-traffix-cloud.cloudfunctions.net/batch-start-monitoring/start')
            toast.success("Sukses Menjalankan Monitoring", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (e) {
            toast.error("Gagal Menjalankan Monitoring", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <Head>
                <title>Dashboard | Home</title>
            </Head>
            <Layout>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className={"flex-col flex items-center justify-center"}>
                                <button disabled={isLoading}
                                    className="flex items-center justify-center py-2 px-4 bg-red-600 text-white rounded-lg shadow-md" onClick={startbatch}>
                                    {
                                        !isLoading ? 'Run Batch Monitoring' : 'Loading... Please wait'
                                    }
                                </button>
                                <br/>
                                <span>Monitoring berjalan secara otomatis setiap 30 menit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}
