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
import { Dialog, DialogBackdrop, DialogTitle } from "@headlessui/react";

export default function Index({ auth, user }) {
    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        Username: "",
        Password: "",
        password_confirmation: "",
        Role: "Owner",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    useEffect(() => {
        return () => {
            reset("Password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("user.store"), { onSuccess: () => reset() });
    };

    const openModal = (userId) => {
        setUserIdToDelete(userId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUserIdToDelete(null);
    };

    const confirmDelete = () => {
        destroy(route("user.destroy", userIdToDelete), {
            onSuccess: () => closeModal()
        });
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
                                        htmlFor="Username"
                                        value="Username"
                                    />

                                    <TextInput
                                        id="Username"
                                        name="Username"
                                        value={data.Username}
                                        className="mt-1 block w-full"
                                        autoComplete="Username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("Username", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.Username}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="Password"
                                        value="Password"
                                    />

                                    <TextInput
                                        id="Password"
                                        type="password"
                                        name="Password"
                                        value={data.Password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("Password", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.Password}
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
                                    <InputLabel htmlFor="Role" value="Role" />

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
                                            },
                                        ]}
                                        className="mt-1 block w-full"
                                    />

                                    <InputError
                                        message={errors.Role}
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
                                {user.map((user) => (
                                    <div
                                        key={user.Id_User}
                                        className="bg-white px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6 items-center"
                                    >
                                        <dt className="text-sm text-gray-900 sm:col-span-2">
                                            {user.Username}
                                        </dt>
                                        <dt className="text-sm text-gray-900 sm:col-span-2">
                                            {user.Role}
                                        </dt>
                                        <dt className="text-sm text-gray-900">
                                            <Link
                                                href={route(
                                                    "user.edit",
                                                    user.Id_User
                                                )}
                                            >
                                                <SecondaryButton>
                                                    Edit
                                                </SecondaryButton>
                                            </Link>
                                            {/* delete button */}
                                            <DangerButton
                                                onClick={() =>
                                                    openModal(user.Id_User)
                                                }
                                                className="ml-2"
                                            >
                                                Delete
                                            </DangerButton>
                                        </dt>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={isModalOpen}
                onClose={closeModal}
                className="fixed z-10 inset-0 overflow-y-auto"
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div>
                            <div className="mt-3 text-center sm:mt-5">
                                <DialogTitle
                                    as="h3"
                                    className="text-lg leading-6 font-medium text-gray-900"
                                >
                                    Confirm Deletion
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete this
                                        user? This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </AuthenticatedLayout>
    );
}
