import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import { Transition } from "@headlessui/react";

export default function Process({ auth, pesanan }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
        setError,
        clearErrors,
    } = useForm({
        Id_Pesanan: pesanan.Id_Pesanan,
        pay: "",
    });

    // const { errors } = usePage().props;

    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const calculateSubTotal = () => {
            let subTotal = 0;
            pesanan.rincian_pesanan.forEach((rincian) => {
                subTotal += rincian.Jumlah * rincian.produk.Harga;
            });
            return subTotal;
        };

        const subTotal = calculateSubTotal();
        const tax = subTotal * 0.1;
        const total = subTotal + tax;

        setSubTotal(subTotal);
        setTax(tax);
        setTotal(total);
    }, [pesanan]);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();

        if (parseFloat(data.pay) < total) {
            setError("pay", "Pembayaran tidak mencukupi.");
            return;
        }

        post(route("nota.store", pesanan.Id_Pesanan));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Rincian Pembayaran
                </h2>
            }
        >
            <Head title="Pembayaran" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white">
                            <dl>
                                <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-semibold text-gray-900 sm:col-span-1">
                                        Nama Pembeli :{" "}
                                        <span className="font-normal">
                                            {pesanan.pembeli.Nama}
                                        </span>
                                    </dt>
                                    {/* <dt className="text-sm font-semibold text-gray-900 sm:col-span-1 text-right">
                                        <SecondaryButton onClick={handlePdfDownload}>
                                            Download PDF
                                        </SecondaryButton>
                                    </dt> */}
                                </div>
                                {pesanan.rincian_pesanan.map((rincian) => (
                                    <div
                                        key={rincian.Id_Produk}
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
                                        Pajak (10%)
                                    </dt>
                                    <dt className="text-sm text-gray-900 text-right">
                                        {parseInt(tax).toLocaleString()}
                                    </dt>
                                    <dt className="text-sm font-semibold text-gray-900">
                                        Total
                                    </dt>
                                    <dt className="text-sm text-gray-900 text-right">
                                        {parseInt(total).toLocaleString()}
                                    </dt>
                                </div>
                            </dl>
                            <div className="px-6">
                                <form
                                    onSubmit={submit}
                                    className="mt-6 space-y-6"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="pay"
                                            value="Diterima"
                                        />
                                        <TextInput
                                            id="pay"
                                            type="text"
                                            name="pay"
                                            value={data.pay}
                                            onChange={(e) =>
                                                setData("pay", e.target.value)
                                            }
                                            className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                        />
                                        <InputError message={errors.pay} />
                                    </div>
                                    <div className="flex items-center justify-end gap-4">
                                        <PrimaryButton disabled={processing}>
                                            Bayar
                                        </PrimaryButton>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-gray-600">
                                                Saved.
                                            </p>
                                        </Transition>

                                        <Link href={route("nota.index")}>
                                            <SecondaryButton>
                                                Batal
                                            </SecondaryButton>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
