import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function New({ auth, categories, products }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        customer_name: "",
        products: [],
    });

    const [quantities, setQuantities] = useState(
        products.reduce((acc, product) => {
            acc[product.id] = 0;
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

        post(route("orders.store"), {
            onSuccess: () => reset(),
        });
    };

    const filteredProducts = products.reduce((acc, product) => {
        const category = categories.find(
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
                        <div className="p-6 bg-white">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel
                                        htmlFor="customer_name"
                                        value="Customer Name"
                                    />
                                    <TextInput
                                        id="customer_name"
                                        type="text"
                                        name="customer_name"
                                        value={data.customer_name}
                                        onChange={(e) =>
                                            setData(
                                                "customer_name",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                    <InputError
                                        message={errors.customer_name}
                                    />
                                </div>
                                <dl className="mt-4 border-t border-gray-200">
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
                                                                    {quantities[
                                                                        product
                                                                            .id
                                                                    ] || 0}
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
                                <div className="mt-4 text-center">
                                    <PrimaryButton disabled={processing}>
                                        Create Order
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
