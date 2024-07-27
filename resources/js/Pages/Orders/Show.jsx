import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Show({ auth, pesanan }) {
    const subTotal = pesanan.rincian_pesanan.reduce((total, rincian) => {
        return total + rincian.Jumlah * parseFloat(rincian.produk.Harga);
    }, 0);
    const tax = subTotal * 0.1;
    const totalPrice = subTotal + tax;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Orders
                </h2>
            }
        >
            <Head title="Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white">
                            <dl>
                                <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-semibold text-gray-900">
                                        Customer Name :{" "}
                                        <span className="text-sm font-normal">
                                            {pesanan.pembeli.Nama}
                                        </span>
                                    </dt>
                                </div>
                                {pesanan.rincian_pesanan.map((rincian) => (
                                    <div
                                        key={rincian.produk.Id_Produk}
                                        className="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 items-center"
                                    >
                                        <dt className="text-sm text-gray-900 sm:col-span-2">
                                            {rincian.produk.Nama}
                                        </dt>
                                        <dt className="text-sm text-gray-900 sm:col-span-1">
                                            {rincian.Jumlah} x{" "}
                                            {parseInt(
                                                rincian.produk.Harga
                                            ).toLocaleString()}
                                        </dt>
                                        <dt className="text-sm text-gray-900 text-right sm:col-span-1">
                                            {(
                                                rincian.Jumlah *
                                                rincian.produk.Harga
                                            ).toLocaleString()}
                                        </dt>
                                    </div>
                                ))}
                                <div className="bg-white border-t px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-semibold text-gray-900">
                                        Subtotal
                                    </dt>
                                    <dt className="text-sm text-gray-900 text-right">
                                        {parseInt(subTotal).toLocaleString()}
                                    </dt>
                                    <dt className="text-sm font-semibold text-gray-900">
                                        Tax (10%)
                                    </dt>
                                    <dt className="text-sm text-gray-900 text-right">
                                        {parseInt(tax).toLocaleString()}
                                    </dt>
                                    <dt className="text-sm font-semibold text-gray-900">
                                        Total
                                    </dt>
                                    <dt className="text-sm text-gray-900 text-right">
                                        {parseInt(totalPrice).toLocaleString()}
                                    </dt>
                                </div>
                            </dl>
                            <div className="flex items-center border-t justify-end px-4 sm:px-6 py-4">
                                <Link href={route("pesanan.index")}>
                                    <SecondaryButton>Back</SecondaryButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
