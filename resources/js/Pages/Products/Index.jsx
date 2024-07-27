import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";

export default function Index({ auth, produk, kategori }) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        Id_Kategori: kategori.length > 0 ? kategori[0].Id_Kategori : "",
        Nama: "",
        Harga: "",
        Status: "",
    });

    const [search, setSearch] = useState("");
    const submit = (e) => {
        e.preventDefault();
        post(route("produk.store"), { onSuccess: () => reset() });
    };

    const toggleStatus = (idProduk) => {
        patch(route("produk.update", idProduk));
    };

    const filteredProducts = produk.filter((produk) =>
        produk.Nama.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="Nama" value="Name" />
                                    <TextInput
                                        id="Nama"
                                        type="text"
                                        name="Nama"
                                        value={data.Nama}
                                        onChange={(e) =>
                                            setData("Nama", e.target.value)
                                        }
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.Nama} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="Id_Kategori"
                                        value="Category"
                                    />
                                    <SelectInput
                                        id="Id_Kategori"
                                        name="Id_Kategori"
                                        value={data.Id_Kategori}
                                        onChange={(e) =>
                                            setData(
                                                "Id_Kategori",
                                                e.target.value
                                            )
                                        }
                                        options={kategori.map((kategori) => ({
                                            value: kategori.Id_Kategori,
                                            label: kategori.Nama,
                                        }))}
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.Id_Kategori} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="Harga" value="Price" />
                                    <TextInput
                                        id="Harga"
                                        type="text"
                                        name="Harga"
                                        value={data.Harga}
                                        onChange={(e) =>
                                            setData("Harga", e.target.value)
                                        }
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.Harga} />
                                </div>
                                <div className="mt-4 text-center">
                                    <PrimaryButton disabled={processing || kategori.length === 0}>
                                        Add Product
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 border-t border-gray-200">
                            <div>
                                <TextInput
                                    id="search"
                                    type="text"
                                    name="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search products"
                                    className="mb-4 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                            </div>
                            <dl className="border-t border-gray-200">
                                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900 sm:col-span-2">
                                        Name
                                    </dt>
                                    <dt className="text-sm font-medium text-gray-900">
                                        Category
                                    </dt>
                                    <dt className="text-sm font-medium text-gray-900">
                                        Price
                                    </dt>
                                    <dt className="text-sm font-medium text-gray-900">
                                        Status
                                    </dt>
                                    <dt className="text-sm font-medium text-gray-900">
                                        Actions
                                    </dt>
                                </div>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((produk) => (
                                        <div
                                            key={produk.Id_Produk}
                                            className="bg-white px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6 items-center"
                                        >
                                            <dt className="text-sm text-gray-900 sm:col-span-2">
                                                {produk.Nama}
                                            </dt>
                                            <dt className="text-sm text-gray-900">
                                                {produk.kategori.Nama}
                                            </dt>
                                            <dt className="text-sm text-gray-900">
                                                Rp.{" "}
                                                {parseInt(
                                                    produk.Harga
                                                ).toLocaleString()}
                                            </dt>
                                            <dt className="text-sm text-gray-900">
                                                {produk.Status}
                                            </dt>
                                            <dt className="text-sm text-gray-900">
                                                <Link
                                                    href={route(
                                                        "produk.edit",
                                                        produk.Id_Produk
                                                    )}
                                                >
                                                    <SecondaryButton>
                                                        Edit
                                                    </SecondaryButton>
                                                </Link>
                                            </dt>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white px-4 py-5 sm:px-6">
                                        <dt className="text-sm text-gray-500 sm:col-span-6 text-center">
                                            No products found.
                                        </dt>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
