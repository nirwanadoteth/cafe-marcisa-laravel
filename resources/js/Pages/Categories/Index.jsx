import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Index({ auth, categories }) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: "",
        status: "",
    });

    const [search, setSearch] = useState("");

    const submit = (e) => {
        e.preventDefault();
        post(route("categories.store"), { onSuccess: () => reset() });
    };

    const toggleStatus = (categoryId) => {
        patch(route("categories.update", categoryId));
    };

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
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
                                {filteredCategories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="bg-white px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6 items-center"
                                    >
                                        <dt className="text-sm text-gray-900 sm:col-span-2">
                                            {category.name}
                                        </dt>
                                        <dt className="text-sm text-gray-900 sm:col-span-2">
                                            {category.status}
                                        </dt>
                                        <dt className="text-sm text-gray-900">
                                            <SecondaryButton
                                                onClick={() =>
                                                    toggleStatus(category.id)
                                                }
                                                disabled={processing}
                                            >
                                                {category.status ===
                                                "Active" ? (
                                                    <i
                                                        className="fas fa-toggle-on"
                                                        style={{
                                                            lineHeight: 1.3,
                                                        }}
                                                    ></i>
                                                ) : (
                                                    <i
                                                        className="fas fa-toggle-off"
                                                        style={{
                                                            lineHeight: 1.3,
                                                        }}
                                                    ></i>
                                                )}
                                            </SecondaryButton>
                                            <Link
                                                href={route(
                                                    "categories.edit",
                                                    category.id
                                                )}
                                                className="ml-2"
                                            >
                                                <SecondaryButton>
                                                    Edit
                                                </SecondaryButton>
                                            </Link>
                                        </dt>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
