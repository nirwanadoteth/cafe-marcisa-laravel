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

export default function Edit({ auth, user }) {
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            username: user.username,
            current_password: "",
            password: "",
            password_confirmation: "",
            role: user.role,
        });

    const submit = (e) => {
        e.preventDefault();

        put(route("users.update", user.id));
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
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="username" value="Username" />
                                    <TextInput
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={data.username}
                                        onChange={(e) =>
                                            setData("username", e.target.value)
                                        }
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.username} />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="current_password"
                                        value="Current Password"
                                    />
                                    <TextInput
                                        id="current_password"
                                        type="password"
                                        name="current_password"
                                        value={data.current_password}
                                        onChange={(e) =>
                                            setData("current_password", e.target.value)
                                        }
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.current_password} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="Password" value="Password" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.password} />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData("password_confirmation", e.target.value)
                                        }
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="role"
                                        value="Role"
                                    />
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
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.role} />
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

                                    <Link href={route("users.index")}>
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
