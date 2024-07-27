import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Edit({
    auth,
    categories,
    products,
    order,
    orderProducts,
}) {
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            customer_name: order.customer_name,
            products: orderProducts.map((product) => ({
                product_id: product.product_id,
                quantity: product.quantity,
            })),
        });

    const [quantities, setQuantities] = useState(
        products.reduce((acc, product) => {
            const orderedProduct = orderProducts.find(
                (op) => op.product_id === product.id
            );
            acc[product.id] = orderedProduct ? orderedProduct.quantity : 0;
            return acc;
        }, {})
    );

    useEffect(() => {
        const selectedProducts = Object.keys(quantities)
            .filter((productId) => quantities[productId] > 0)
            .map((productId) => ({
                product_id: parseInt(productId), // Ensure product ID is an integer
                quantity: quantities[productId],
            }));

        setData("products", selectedProducts);
    }, [quantities, setData]);

    const handleQuantityChange = (productId, change) => {
        setQuantities((prevQuantities) => {
            const newQuantity = Math.max(
                (prevQuantities[productId] || 0) + change,
                0
            );
            return {
                ...prevQuantities,
                [productId]: newQuantity,
            };
        });
    };

    const submit = (e) => {
        e.preventDefault();

        put(route("orders.update", order.id));
    };

    const filteredProducts = products.reduce((acc, product) => {
        const category = kategori.find(
            (category) => category.id === product.category_id
        );

        if (!acc[category.name]) {
            acc[category.name] = [];
        }

        acc[category.name].push(product);
        return acc;
    }, {});

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
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <dl className="mt-4 border-t border-gray-200">
                                    <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-semibold text-gray-900">
                                            Customer Name :{" "}
                                            {data.customer_name}
                                        </dt>
                                    </div>
                                    {Object.entries(filteredProducts).map(
                                        ([category, products]) => (
                                            <div key={category}>
                                                <div className="bg-gray-100 px-4 py-5 sm:grid sm:gap-4 sm:px-6">
                                                    <dt className="text-sm font-semibold text-gray-900">
                                                        {category}
                                                    </dt>
                                                </div>
                                                {products.map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="bg-white px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6 items-center"
                                                    >
                                                        <dt className="text-sm text-gray-900 sm:col-span-4 ml-4">
                                                            {product.name}
                                                        </dt>
                                                        <dt className="text-sm text-gray-900 sm:col-span-1">
                                                            <div className="flex items-center">
                                                                <button
                                                                    type="button"
                                                                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                                                                    onClick={() =>
                                                                        handleQuantityChange(
                                                                            product.id,
                                                                            -1
                                                                        )
                                                                    }
                                                                >
                                                                    <span className="sr-only">
                                                                        Decrease
                                                                    </span>
                                                                    <span className="text-lg">
                                                                        &#8722;
                                                                    </span>
                                                                </button>
                                                                <span className="mx-2 text-gray-700">
                                                                    {orderProducts.product_id ===
                                                                    product.id
                                                                        ? orderProducts.quantity
                                                                        : quantities[
                                                                              product
                                                                                  .id
                                                                          ]
                                                                        ? quantities[
                                                                              product
                                                                                  .id
                                                                          ]
                                                                        : 0}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                                                                    onClick={() =>
                                                                        handleQuantityChange(
                                                                            product.id,
                                                                            1
                                                                        )
                                                                    }
                                                                >
                                                                    <span className="sr-only">
                                                                        Increase
                                                                    </span>
                                                                    <span className="text-lg">
                                                                        &#43;
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </dt>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    )}
                                </dl>
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

                                    <Link href={route("orders.index")}>
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
