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

export default function Edit({ auth, product, categories }) {
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            category_id: product.category_id,
            name: product.name,
            price: product.price,
            status: product.status,
        });

    const submit = (e) => {
        e.preventDefault();

        put(route("products.update", product.id));
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
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="category_id" value="Category" />
                                    <SelectInput
                                        id="category_id"
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData("category_id", e.target.value)
                                        }
                                        options={categories.map((category) => ({
                                            value: category.id,
                                            label: category.name,
                                        }))}
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.category_id} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="price" value="Price" />
                                    <TextInput
                                        id="price"
                                        type="text"
                                        name="price"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.price} />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="Status"
                                    />
                                    <SelectInput
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
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
                                    <InputError message={errors.status} />
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

                                    <Link href={route("products.index")}>
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
