import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import { Transition } from "@headlessui/react";

export default function Process({ auth, order }) {
    const { data, setData, post, processing, errors, recentlySuccessful, setError, clearErrors } =
        useForm({
            order_id: order.id,
            pay: "",
        });

    console.log(order);
    const calculateSubTotal = () => {
        const tax = order.total_price * 0.1;
        const discount = 0; // Assuming no discount for simplicity
        const subtotal = parseFloat(order.total_price) + tax - discount;
        return parseInt(subtotal);
    };

    const subTotal = calculateSubTotal();

    const submit = (e) => {
        e.preventDefault();
        clearErrors();

        if (parseFloat(data.pay) < subTotal) {
            setError("pay", "Payment amount is less than the total amount.");
            return;
        }

        post(route("payments.store", data.order_id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Payments
                </h2>
            }
        >
            <Head title="Payments" />

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
                                            {product.pivot.quantity} x{" "}
                                            {parseInt(
                                                product.price
                                            ).toLocaleString()}
                                        </dt>
                                        <dt className="text-sm text-gray-900 text-right sm:col-span-1">
                                            {(
                                                product.pivot.quantity *
                                                product.price
                                            ).toLocaleString()}
                                        </dt>
                                    </div>
                                ))}
                                <div className="bg-white border-t px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-semibold text-gray-900">
                                        Total Price :
                                    </dt>
                                    <dt className="text-sm font-semibold text-gray-900 text-right">
                                        {parseInt(
                                            order.total_price
                                        ).toLocaleString()}
                                    </dt>
                                    <dt className="text-sm font-semibold text-gray-900">
                                        Tax (10%) :
                                    </dt>
                                    <dt className="text-sm font-semibold text-gray-900 text-right">
                                        {parseInt(
                                            order.total_price * 0.1
                                        ).toLocaleString()}
                                    </dt>
                                    <dt className="text-sm font-semibold text-gray-900">
                                        Discount :
                                    </dt>
                                    <dt className="text-sm font-semibold text-gray-900 text-right">
                                        0
                                    </dt>
                                    <dt className="text-sm font-semibold text-gray-900">
                                        Subtotal :
                                    </dt>
                                    <dt className="text-sm font-semibold text-gray-900 text-right">
                                        {parseInt(subTotal).toLocaleString()}
                                    </dt>
                                </div>
                            </dl>
                            <div className="mt-8">
                                <form
                                    onSubmit={submit}
                                    className="mt-6 space-y-6"
                                >
                                    <div>
                                        <InputLabel
                                            forInput="pay"
                                            value="Received"
                                        />
                                        <TextInput
                                            id="pay"
                                            type="text"
                                            name="pay"
                                            value={data.pay}
                                            onChange={(e) =>
                                                setData("pay", e.target.value)
                                            }
                                            className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                        />
                                        <InputError message={errors.pay} />
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

                                        <Link href={route("payments.index")}>
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
            </div>
        </AuthenticatedLayout>
    );
}
