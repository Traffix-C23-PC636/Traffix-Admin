import {useEffect, Fragment, useContext} from "react";
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
    TextInput
} from '@tremor/react';
import {useState} from "react";
import axios from "axios";
import { Dialog,Transition } from '@headlessui/react'
import Layout from "@/components/Layout";
import Head from "next/head";
import {toast} from "react-toastify";
import {SessionContext} from "@/context/SessionProvider";


function Page() {
    const [dataKota, setDataKota] = useState([])
    let [isOpen, setIsOpen] = useState(false)
    const [idKota, setIdKota] = useState('')
    const [namaKota, setNamaKota] = useState('')
    const [provinsi, setProvinsi] = useState('')

    const user = useContext(SessionContext);



    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get('https://api.traffix.my.id/api/admin/kota',{
                headers:{
                    authorization: 'Bearer ' + user.accessToken,
                }
            });
            setDataKota(response.data['kota']);
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
            await axios.post('https://api.traffix.my.id/api/admin/kota',{
                id_kota : idKota,
                nama_kota : namaKota,
                provinsi : provinsi
            },{
                headers:{
                    authorization: 'Bearer ' + user.accessToken,
                }
            }).then(r =>{
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
            closeModal()
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
        }
    }

    const deleteData = async (e) => {
        try {
            await axios.delete('https://api.traffix.my.id/api/admin/kota/' + e,{
                headers:{
                    authorization: 'Bearer ' + user.accessToken,
                }
            })
            toast.success("Sukses Hapus Data", {
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
                <title>Dashboard | Kota</title>
            </Head>
            <Layout>
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
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Input Data Kota
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <span className={'mb-3'}>ID Kota : </span>
                                                    <TextInput onChange={event => setIdKota(event.target.value)} placeholder="ID Kota" />
                                                </div>
                                                <div className="mt-2">
                                                    <span className={'mb-3'}>Nama Kota : </span>
                                                    <TextInput onChange={event => setNamaKota(event.target.value)} placeholder="Nama Kota" />
                                                </div>
                                                <div className="mt-2">
                                                    <span className={'mb-3'}>Provinsi: </span>
                                                    <TextInput onChange={event => setProvinsi(event.target.value)} placeholder="Provinsi" />
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
                                    <Title>Data Kota</Title>
                                    <button onClick={e=>{setIsOpen(true)}} className={'p-3 text-white rounded bg-blue-600'}>Tambah Data</button>
                                </div>
                                <br/>
                                <Table className="mt-5">
                                    <TableHead>
                                        <TableRow className={'text-right'}>
                                            <TableHeaderCell>ID Kota</TableHeaderCell>
                                            <TableHeaderCell>Nama Kota</TableHeaderCell>
                                            <TableHeaderCell>Provinsi</TableHeaderCell>
                                            <TableHeaderCell>Aksi</TableHeaderCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className={'text-right border-2'}>
                                        {dataKota.map((item) => (
                                            <TableRow key={item['id_kota']}>
                                                <TableCell>{item['id_kota']}</TableCell>
                                                <TableCell>
                                                    <Text>{item['nama_kota']}</Text>
                                                </TableCell>
                                                <TableCell>
                                                    <Text>{item['provinsi']}</Text>
                                                </TableCell>
                                                <TableCell>
                                                    <button onClick={async () => {
                                                        await deleteData(item['id_kota'])
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
                </Layout>
        </>
    );
}
export default Page;