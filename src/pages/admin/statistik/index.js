import {useEffect, useContext} from "react";
import {
    Card,
    Title,
    Text,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell
} from '@tremor/react';
import {useState} from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import Head from "next/head";
import {toast} from "react-toastify";
import {SessionContext} from "@/context/SessionProvider";


function Page() {
    const [dataStatistik, setDataStatistik] = useState([])
    let [isOpen, setIsOpen] = useState(false)
    const [namaAtcs, setNamaAtcs] = useState('')
    const [latAtcs, setLatAtcs] = useState('')
    const [longAtcs, setLongAtcs] = useState('')
    const [idKotaAtcs, setIdKotaAtcs] = useState(0)
    const [streamAtcs, setStreamAtcs] = useState('')
    const [isMonitoringAtcs, setIsMonitoringAtcs] = useState('true')

    const user = useContext(SessionContext);


    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const statistik = await axios.get('https://traffix-prod-jiiwmdjwva-as.a.run.app//api/admin/statistik',{
                headers:{
                    authorization: 'Bearer ' + user.accessToken,
                }
            });
            setDataStatistik(statistik.data['statistik']);
            console.log(statistik.data['statistik'])
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

    const deleteData = async (e) => {
        try {
            await axios.delete('https://traffix-prod-jiiwmdjwva-as.a.run.app//api/admin/statistik/' + e, {
                headers: {
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



    return (
        <>
            <Head>
                <title>Dashboard | Data ATCS</title>
            </Head>
            <Layout>
                <main className="p-4 md:p-10 mx-auto max-w-7xl">
                    <Card className="mt-6">
                        <Card>
                            <div className={'flex flex-row justify-between'}>
                                <Title>Data Statistik</Title>
                            </div>
                            <br/>
                            <Table className="mt-5">
                                <TableHead>
                                    <TableRow className={'text-right'}>
                                        <TableHeaderCell>ID</TableHeaderCell>
                                        <TableHeaderCell>ID ATCS</TableHeaderCell>
                                        <TableHeaderCell>Car</TableHeaderCell>
                                        <TableHeaderCell>Motorcycle</TableHeaderCell>
                                        <TableHeaderCell>Bus</TableHeaderCell>
                                        <TableHeaderCell>Truck</TableHeaderCell>
                                        <TableHeaderCell>Data In</TableHeaderCell>
                                        <TableHeaderCell>Data Out</TableHeaderCell>
                                        <TableHeaderCell>Created At</TableHeaderCell>
                                        <TableHeaderCell>Aksi</TableHeaderCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody className={'text-right border-2'}>
                                    {dataStatistik.map((item) => (
                                        <TableRow key={item['id']}>
                                            <TableCell>
                                                <Text>{item['id']}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text>{item['id_atcs']}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text>{item['car']}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text>{item['motorcycle']}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text>{item['bus']}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text>{item['truck']}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text>{item['data_in']}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text>{item['data_out']}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text>{item['createdAt']}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <button onClick={async () => {
                                                    await deleteData(item['id'])
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