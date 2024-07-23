import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";

export default function Index({ auth, orders }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Orders
                </h2>
            }
        >
            <Head title="Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white text-right">
                            <Link href={route("orders.create")}>
                                <PrimaryButton>Add Order</PrimaryButton>
                            </Link>
                        </div>
                        <div className="p-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">
                                Recent Orders
                            </h3>
                            <dl className="border-t border-gray-200">
                                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900 sm:col-span-2">
                                        Customer Name
                                    </dt>
                                    <dt className="text-sm font-medium text-gray-900 sm:col-span-2">
                                        Total Price
                                    </dt>
                                    <dt className="text-sm font-medium text-gray-900 sm:col-span-1">
                                        Status
                                    </dt>
                                    <dt className="text-sm font-medium text-gray-900 sm:col-span-1">
                                        Actions
                                    </dt>
                                </div>
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="bg-white px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6 items-center"
                                    >
                                        <dt className="text-sm text-gray-900 sm:col-span-2">
                                            {order.customer_name}
                                        </dt>
                                        <dt className="text-sm text-gray-900 sm:col-span-2">
                                            Rp. {parseInt(order.total_price).toLocaleString()}
                                        </dt>
                                        <dt className="text-sm text-gray-900 sm:col-span-1">
                                            {order.status}
                                        </dt>
                                        <dt className="text-sm text-gray-900 sm:col-span-1">
                                            <Link
                                                href={route(
                                                    "orders.edit",
                                                    order.id
                                                )}
                                                className="text-indigo-600 hover:text-indigo-900 mr-2"
                                            >
                                                <SecondaryButton disabled={order.status === "Completed"}>
                                                    Edit
                                                </SecondaryButton>
                                            </Link>
                                            <Link
                                                href={route(
                                                    "orders.show",
                                                    order.id
                                                )}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <SecondaryButton>
                                                    Show
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
