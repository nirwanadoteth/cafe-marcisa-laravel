import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import { Transition } from "@headlessui/react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Edit({ auth, produk, kategori }) {
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            Id_Kategori: produk.Id_Kategori,
            Nama: produk.Nama,
            Harga: parseInt(produk.Harga).toLocaleString(),
            Status: produk.Status,
        });

    const submit = (e) => {
        e.preventDefault();

        put(route("produk.update", produk.Id_Produk));
    };

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
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <form onSubmit={submit} className="mt-6 space-y-6">
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
                                <div>
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
                                <div>
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
                                <div>
                                    <InputLabel
                                        htmlFor="Status"
                                        value="Status"
                                    />
                                    <SelectInput
                                        id="Status"
                                        name="Status"
                                        value={data.Status}
                                        onChange={(e) =>
                                            setData("Status", e.target.value)
                                        }
                                        options={[
                                            {
                                                value: "Active",
                                                label: "Active",
                                            },
                                            {
                                                value: "Inactive",
                                                label: "Inactive",
                                            },
                                        ]}
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.Status} />
                                </div>
                                <div className="flex items-center justify-end gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Save
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

                                    <Link href={route("produk.index")}>
                                        <SecondaryButton>
                                            Cancel
                                        </SecondaryButton>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
