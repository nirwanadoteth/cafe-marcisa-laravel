import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";

export default function Show({ auth, order }) {
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
                        <div className="p-6 bg-white">
                            <dl>
                                <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-semibold text-gray-900">
                                        Customer Name : {order.customer_name}
                                    </dt>
                                </div>
                                {order.products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 items-center"
                                    >
                                        <dt className="text-sm text-gray-900 sm:col-span-2">
                                            {product.name}
                                        </dt>
                                        <dt className="text-sm text-gray-900 sm:col-span-1">
                                            {/* for every 3 zero num add dot */}
                                            {product.pivot.quantity} x {parseInt(product.price).toLocaleString()}
                                        </dt>
                                        <dt className="text-sm text-gray-900 text-right sm:col-span-1">
                                            {(product.pivot.quantity * product.price).toLocaleString()}
                                        </dt>
                                    </div>
                                ))}
                                <div className="bg-white border-t px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-semibold text-gray-900 text-right sm:col-span-2">
                                        Total Price : Rp. {parseInt(order.total_price).toLocaleString()}
                                    </dt>
                                </div>
                            </dl>
                            <div className="flex items-center justify-end gap-4">
                                <Link href={route("orders.index")}>
                                    <SecondaryButton>Back</SecondaryButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
