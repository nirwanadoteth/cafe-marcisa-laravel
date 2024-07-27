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
            Username: user.Username,
            current_password: "",
            Password: "",
            password_confirmation: "",
            Role: user.Role,
        });

    const submit = (e) => {
        e.preventDefault();

        put(route("user.update", user.id));
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
                                    <InputLabel htmlFor="Username" value="Username" />
                                    <TextInput
                                        id="Username"
                                        type="text"
                                        name="Username"
                                        value={data.Username}
                                        onChange={(e) =>
                                            setData("Username", e.target.value)
                                        }
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.Username} />
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
                                        id="Password"
                                        type="password"
                                        name="Password"
                                        value={data.Password}
                                        onChange={(e) =>
                                            setData("Password", e.target.value)
                                        }
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError message={errors.Password} />
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
                                        htmlFor="Role"
                                        value="Role"
                                    />
                                    <SelectInput
                                        id="Role"
                                        name="Role"
                                        value={data.Role}
                                        onChange={(e) =>
                                            setData("Role", e.target.value)
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
                                    <InputError message={errors.Role} />
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

                                    <Link href={route("user.index")}>
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
