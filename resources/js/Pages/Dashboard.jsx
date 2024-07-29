import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    auth,
    totalCategories,
    totalProducts,
    favProduct,
    orderToday,
}) {
    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Beranda
                </h2>
            }
        >
            <Head title="Beranda" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-white text-center">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-gray-900 p-4 shadow-sm rounded-lg">
                                    <h3 className="mb-4 font-semibold text-lg">
                                        Total Kategori
                                    </h3>
                                    <span className="fas fa-list-alt fa-2xl"></span>
                                    <p className="mt-4 text-2xl">
                                        {totalCategories}
                                    </p>
                                </div>
                                <div className="bg-gray-900 p-4 shadow-sm rounded-lg">
                                    <h3 className="mb-4 font-semibold text-lg">
                                        Total Produk
                                    </h3>
                                    <span className="fas fa-box fa-2xl"></span>
                                    <p className="mt-4 text-2xl">
                                        {totalProducts}
                                    </p>
                                </div>
                                <div className="bg-gray-900 p-4 shadow-sm rounded-lg">
                                    <h3 className="mb-4 font-semibold text-lg">
                                        Produk Terbaik
                                    </h3>
                                    <span className="fas fa-star fa-2xl"></span>
                                    <p className="mt-4 text-2xl">
                                        {favProduct}
                                    </p>
                                </div>
                                <div className="bg-gray-900 p-4 shadow-sm rounded-lg">
                                    <h3 className="mb-4 font-semibold text-lg">
                                        Total Pesanan Hari Ini
                                    </h3>
                                    <span className="fas fa-shopping-cart fa-2xl"></span>
                                    <p className="mt-4 text-2xl">
                                        {orderToday}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
