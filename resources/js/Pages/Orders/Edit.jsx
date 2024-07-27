import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Edit({ auth, pesanan, kategori, produk }) {
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            produk: pesanan.rincian_pesanan.map((produk) => ({
                Id_Produk: produk.Id_Produk,
                Jumlah: produk.Jumlah,
            })),
        });

    const [quantities, setQuantities] = useState(
        produk.reduce((acc, product) => {
            const orderedProduct = pesanan.rincian_pesanan.find(
                (op) => op.Id_Produk === product.Id_Produk
            );
            acc[product.Id_Produk] = orderedProduct ? orderedProduct.Jumlah : 0;
            return acc;
        }, {})
    );

    useEffect(() => {
        const selectedProducts = Object.keys(quantities)
            .filter((productId) => quantities[productId] > 0)
            .map((productId) => ({
                Id_Produk: parseInt(productId), // Ensure product ID is an integer
                Jumlah: quantities[productId],
            }));

        setData("produk", selectedProducts);
    }, [quantities, setData]);

    const handleQuantityChange = (productId, change) => {
        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[productId] || 0;
            const newQuantity = Math.max(currentQuantity + change, 0);

            if (
                newQuantity <
                pesanan.rincian_pesanan.find((op) => op.Id_Produk === productId)
                    ?.Jumlah
            ) {
                return {
                    ...prevQuantities,
                    [productId]: pesanan.rincian_pesanan.find(
                        (op) => op.Id_Produk === productId
                    )?.Jumlah,
                };
            }

            return {
                ...prevQuantities,
                [productId]: newQuantity,
            };
        });
    };

    const submit = (e) => {
        e.preventDefault();

        put(route("pesanan.update", pesanan.Id_Pesanan));
    };

    const filteredProducts = produk.reduce((acc, product) => {
        const category = kategori.find(
            (category) => category.Id_Kategori === product.Id_Kategori
        );

        if (!acc[category.Nama]) {
            acc[category.Nama] = [];
        }

        acc[category.Nama].push(product);
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
                                <dl className="mt-4 border-t border-b border-gray-200">
                                    <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-semibold text-gray-900">
                                            Customer Name :{" "}
                                            <span className="text-sm font-normal">
                                                {pesanan.pembeli.Nama}
                                            </span>
                                        </dt>
                                    </div>
                                    {Object.entries(filteredProducts).map(
                                        ([category, produk]) => (
                                            <div key={category}>
                                                <div className="bg-gray-100 px-4 py-5 sm:grid sm:gap-4 sm:px-6">
                                                    <dt className="text-sm font-semibold text-gray-900">
                                                        {category}
                                                    </dt>
                                                </div>
                                                {produk.map((product) => (
                                                    <div
                                                        key={product.Id_Produk}
                                                        className="bg-white px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6 items-center"
                                                    >
                                                        <dt className="text-sm text-gray-900 sm:col-span-4 ml-4">
                                                            {product.Nama}
                                                        </dt>
                                                        <dt className="text-sm text-gray-900 sm:col-span-1">
                                                            <div className="flex items-center justify-center mr-4">
                                                                <button
                                                                    type="button"
                                                                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                                                                    onClick={() =>
                                                                        handleQuantityChange(
                                                                            product.Id_Produk,
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
                                                                    {pesanan
                                                                        .rincian_pesanan
                                                                        .Id_Produk ===
                                                                    product.Id_Produk
                                                                        ? pesanan
                                                                              .rincian_pesanan
                                                                              .Jumlah
                                                                        : quantities[
                                                                              product
                                                                                  .Id_Produk
                                                                          ]
                                                                        ? quantities[
                                                                              product
                                                                                  .Id_Produk
                                                                          ]
                                                                        : 0}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                                                                    onClick={() =>
                                                                        handleQuantityChange(
                                                                            product.Id_Produk,
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

                                    <Link href={route("pesanan.index")}>
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
