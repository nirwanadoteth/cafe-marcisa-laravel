import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Index({ auth, kategori }) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        Nama: "",
        Status: "",
    });

    const [search, setSearch] = useState("");

    const submit = (e) => {
        e.preventDefault();
        post(route("kategori.store"), { onSuccess: () => reset() });
    };

    const toggleStatus = (idKategori) => {
        patch(route("kategori.update", idKategori));
    };

    const filteredKategori = kategori.filter((kategori) =>
        kategori.Nama.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Categories
                </h2>
            }
        >
            <Head title="Categories" />

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
                                <div className="mt-4 text-center">
                                    <PrimaryButton disabled={processing}>
                                        Create
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
                                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900 sm:col-span-2">
                                        Name
                                    </dt>
                                    <dt className="text-sm font-medium text-gray-900 sm:col-span-2">
                                        Status
                                    </dt>
                                    <dt className="text-sm font-medium text-gray-900">
                                        Actions
                                    </dt>
                                </div>
                                {filteredKategori.length > 0 ? (
                                    filteredKategori.map((kategori) => (
                                        <div
                                            key={kategori.Id_Kategori}
                                            className="bg-white px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6 items-center"
                                        >
                                            <dt className="text-sm text-gray-900 sm:col-span-2">
                                                {kategori.Nama}
                                            </dt>
                                            <dt className="text-sm text-gray-900 sm:col-span-2">
                                                {kategori.Status}
                                            </dt>
                                            <dt className="text-sm text-gray-900">
                                                <Link
                                                    href={route(
                                                        "kategori.edit",
                                                        {
                                                            kategori:
                                                                kategori.Id_Kategori,
                                                        }
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
                                        <dt className="text-sm text-gray-500 sm:col-span-5 text-center">
                                            No categories found.
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
