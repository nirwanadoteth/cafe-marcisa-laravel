import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";

export default function Index({ auth, users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        password_confirmation: "",
        role: "Admin",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("users.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel
                                        htmlFor="username"
                                        value="Username"
                                    />

                                    <TextInput
                                        id="username"
                                        name="username"
                                        value={data.username}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("username", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.username}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />

                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="role" value="Role" />

                                    <SelectInput
                                        id="role"
                                        name="role"
                                        value={data.role}
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                        options={[
                                            {
                                                value: "Owner",
                                                label: "Owner",
                                            },
                                            {
                                                value: "Kasir",
                                                label: "Kasir",
                                            },
                                            {
                                                value: "MKP",
                                                label: "MKP",
                                            }
                                        ]}
                                        className="mt-1 block w-full"
                                    />

                                    <InputError
                                        message={errors.role}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 text-center">
                                    <PrimaryButton disabled={processing}>
                                        Add User
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 border-t border-gray-200">
                            <dl className="border-t border-gray-200">
                                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900 sm:col-span-2">
                                        Username
                                    </dt>
                                    <dt className="text-sm font-medium text-gray-900 sm:col-span-2">
                                        Role
                                    </dt>
                                    <dt className="text-sm font-medium text-gray-900">
                                        Actions
                                    </dt>
                                </div>
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        className="bg-white px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6 items-center"
                                    >
                                        <dt className="text-sm text-gray-900 sm:col-span-2">
                                            {user.username}
                                        </dt>
                                        <dt className="text-sm text-gray-900 sm:col-span-2">
                                            {user.role}
                                        </dt>
                                        <dt className="text-sm text-gray-900">
                                            <Link
                                                href={route(
                                                    "users.edit",
                                                    user.id
                                                )}
                                            >
                                                <SecondaryButton>
                                                    Edit
                                                </SecondaryButton>
                                            </Link>
                                            {/* delete button */}
                                            <Link
                                                href={route(
                                                    "users.destroy",
                                                    user.id
                                                )}
                                                method="delete"
                                                className="ml-2"
                                            >
                                                <DangerButton>
                                                    Delete
                                                </DangerButton>
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
