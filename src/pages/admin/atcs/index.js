import{useEffect, Fragment} from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    Title,
    Text,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    TextInput, Select, SelectItem
} from '@tremor/react';
import {useState} from "react";
import axios from "axios";
import { Dialog,Transition } from '@headlessui/react'
import Layout from "@/components/Layout";
import Image from "next/image";
import {useSession} from "next-auth/react";
import Head from "next/head";
import {toast} from "react-toastify";


function Page() {
    const router = useRouter()
    const [dataAtcs, setDataAtcs] = useState(null)
    const [dataKota, setDataKota] = useState(null)
    let [isOpen, setIsOpen] = useState(false)
    const [namaAtcs, setNamaAtcs] = useState('')
    const [latAtcs, setLatAtcs] = useState('')
    const [longAtcs, setLongAtcs] = useState('')
    const [idKotaAtcs, setIdKotaAtcs] = useState(0)
    const [streamAtcs, setStreamAtcs] = useState('')
    const [isMonitoringAtcs, setIsMonitoringAtcs] = useState('true')




    const { data: session, status } = useSession()

    if (status === "unauthenticated") {
        router.replace('/')
    }

    useEffect(() => {
        fetchData();
    }, [router])

    const fetchData = async () => {
        try {
            const kota = await axios.get('https://api.traffix.my.id/api/admin/kota');
            setDataKota(kota.data['kota']);
            const atcs = await axios.get('https://api.traffix.my.id/api/admin/atcs');
            setDataAtcs(atcs.data['atcs']);
        } catch (error) {
            toast.error("Gagal Fetch Data", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    const submitData = async () => {
        try {
            await axios.post('https://api.traffix.my.id/api/admin/atcs',{
                nama_atcs : namaAtcs,
                lat : latAtcs,
                long : longAtcs,
                kota_id: parseInt(idKotaAtcs),
                stream_url: streamAtcs,
                is_monitoring : isMonitoringAtcs
            }).then(r => {
                toast.success("Sukses Simpan Data", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                closeModal()
                fetchData()
            })
        } catch (e) {
            toast.error("Gagal Simpan Data", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            closeModal()
        }
    }

    const deleteData = async (e) => {
        try {
            await axios.delete('https://api.traffix.my.id/api/admin/atcs/' + e)
        } catch (e) {

        } finally {
            fetchData()
        }
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }



    return (
        <>
            <Head>
                <title>Dashboard | Data ATCS</title>
            </Head>
            {
                (dataAtcs) ?<Layout>
                    <main className="p-4 md:p-10 mx-auto max-w-7xl">
                        <Transition appear show={isOpen} as={Fragment}>
                            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full h-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Input Data ATCS
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <span className={'mb-3'}>Nama ATCS : </span>
                                                    <TextInput onChange={event => setNamaAtcs(event.target.value)}  placeholder="nama atcs" />
                                                </div>
                                                <div className="mt-2">
                                                    <span className={'mb-3'}>Kota ATCS: </span>
                                                    <Select onChange={event => setIdKotaAtcs(event)}  aria-required={true}>
                                                        {
                                                            dataKota.map((item) => (
                                                                <SelectItem value={item['id_kota']} >
                                                                    {item['nama_kota']}
                                                                </SelectItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </div>
                                                <div className="mt-2">
                                                    <span className={'mb-3'}>Lat ATCS : </span>
                                                    <TextInput onChange={event => setLatAtcs(event.target.value)}  placeholder="lat atcs" />
                                                </div>
                                                <div className="mt-2">
                                                    <span className={'mb-3'}>Long ATCS: </span>
                                                    <TextInput onChange={event => setLongAtcs(event.target.value)} placeholder="long atcs" />
                                                </div>
                                                <div className="mt-2">
                                                    <span className={'mb-3'}>URL Stream ATCS: </span>
                                                    <TextInput onChange={event => setStreamAtcs(event.target.value)} placeholder="url stream atcs" />
                                                </div>
                                                <div className="mt-2">
                                                    <span className={'mb-3'}>Is Monitoring ATCS: </span>
                                                    <Select defaultValue={'true'} onChange={event => setIsMonitoringAtcs(event)} aria-required={true}>
                                                        <SelectItem aria-selected={true} value={'true'} >
                                                            Ya
                                                        </SelectItem>
                                                        <SelectItem value={'false'} >
                                                            Tidak
                                                        </SelectItem>
                                                    </Select>
                                                </div>
                                                <div className="mt-4">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={submitData}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                        <Card className="mt-6">
                            <Card>
                                <div className={'flex flex-row justify-between'}>
                                    <Title>Data ATCS</Title>
                                    <button onClick={e=>{setIsOpen(true)}} className={'p-3 text-white rounded bg-blue-600'}>Tambah Data</button>
                                </div>
                                <br/>
                                <Table className="mt-5">
                                    <TableHead>
                                        <TableRow className={'text-right'}>
                                            <TableHeaderCell>ID ATCS</TableHeaderCell>
                                            <TableHeaderCell>Nama ATCS</TableHeaderCell>
                                            <TableHeaderCell>Kota ATCS</TableHeaderCell>
                                            <TableHeaderCell>Lat</TableHeaderCell>
                                            <TableHeaderCell>Long</TableHeaderCell>
                                            <TableHeaderCell>Stream URL</TableHeaderCell>
                                            <TableHeaderCell>Is Monitoring</TableHeaderCell>
                                            <TableHeaderCell>Aksi</TableHeaderCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className={'text-right border-2'}>
                                        {dataAtcs.map((item) => (
                                            <TableRow key={item['id_atcs']}>
                                                <TableCell>{item['id_atcs']}</TableCell>
                                                <TableCell>
                                                    <Text>{item['nama_atcs']}</Text>
                                                </TableCell>
                                                <TableCell>
                                                    <Text>{item['kota']['nama_kota']}</Text>
                                                </TableCell>
                                                <TableCell>
                                                    <Text>{item['lat']}</Text>
                                                </TableCell>
                                                <TableCell>
                                                    <Text>{item['long']}</Text>
                                                </TableCell>
                                                <TableCell>
                                                    <Text>{item['stream_url']}</Text>
                                                </TableCell>
                                                <TableCell>
                                                    <Text>{item['is_monitoring']}</Text>
                                                </TableCell>
                                                <TableCell>
                                                    <button onClick={async () => {
                                                        await deleteData(item['id_atcs'])
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </Card>
                    </main>
                </Layout> : <div className="w-full flex flex-col justify-center items-center h-screen">
                    <Image width={80} height={80} src={'/loader.gif'}  alt={'Loading'}/>
                    <span className="text-green-500">
                    Loading
                </span>
                </div>
            }
        </>
    );
}
export default Page;