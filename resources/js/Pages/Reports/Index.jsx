import React, { useState, useMemo, useCallback } from "react";
import {
    addDays,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    subMonths,
} from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import SelectInput from "@/Components/SelectInput";

const timeZone = "Asia/Jakarta";

const predefinedRanges = [
    {
        label: "Today",
        range: () => ({ startDate: new Date(), endDate: new Date() }),
    },
    {
        label: "Yesterday",
        range: () => ({
            startDate: addDays(new Date(), -1),
            endDate: addDays(new Date(), -1),
        }),
    },
    {
        label: "This Week",
        range: () => ({
            startDate: startOfWeek(new Date()),
            endDate: endOfWeek(new Date()),
        }),
    },
    {
        label: "Last Week",
        range: () => ({
            startDate: startOfWeek(addDays(new Date(), -7)),
            endDate: endOfWeek(addDays(new Date(), -7)),
        }),
    },
    {
        label: "This Month",
        range: () => ({
            startDate: startOfMonth(new Date()),
            endDate: endOfMonth(new Date()),
        }),
    },
    {
        label: "Last Month",
        range: () => ({
            startDate: startOfMonth(subMonths(new Date(), 1)),
            endDate: endOfMonth(subMonths(new Date(), 1)),
        }),
    },
];

const RangeSelector = ({ selectedRange, onChange }) => (
    <SelectInput
        onChange={onChange}
        className="mt-4 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        options={predefinedRanges.map((range) => ({
            value: range.label,
            label: range.label,
        }))}
        defaultValue={selectedRange}
    />
);

const NotaList = ({ nota }) => (
    <>
        <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">No</dt>
            <dt className="text-sm font-medium text-gray-900 sm:col-span-2">
                Customer Name
            </dt>
            <dt className="text-sm font-medium text-gray-900">Total</dt>
            <dt className="text-sm font-medium text-gray-900">Cash</dt>
            <dt className="text-sm font-medium text-gray-900">Change</dt>
        </div>
        {nota.length > 0 ? (
            nota.map((nota, index) => (
                <div
                    key={nota.Id_Nota}
                    className="bg-white px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6 items-center"
                >
                    <dt className="text-sm text-gray-900">{index + 1}</dt>
                    <dt className="text-sm text-gray-900 sm:col-span-2">
                        {nota.pesanan.pembeli.Nama}
                    </dt>
                    <dt className="text-sm text-gray-900">
                        {parseInt(nota.Total_Harga).toLocaleString()}
                    </dt>
                    <dt className="text-sm text-gray-900">
                        {parseInt(nota.Diterima).toLocaleString()}
                    </dt>
                    <dt className="text-sm text-gray-900">
                        {parseInt(nota.Kembali).toLocaleString()}
                    </dt>
                </div>
            ))
        ) : (
            <div className="bg-white px-4 py-5 sm:px-6">
                <dt className="text-sm text-gray-500 sm:col-span-5 text-center">
                    No data found.
                </dt>
            </div>
        )}
    </>
);

export default function Index({ auth }) {
    const [selectedLabel, setSelectedLabel] = useState(
        predefinedRanges[0].label
    );
    const [range, setRange] = useState(predefinedRanges[0].range());
    const [nota, setNota] = useState([]);
    const { post, processing } = useForm({});

    const handleRangeChange = useCallback(
        (event) => {
            const selectedRange = predefinedRanges.find(
                (range) => range.label === event.target.value
            );
            if (selectedRange && range !== selectedRange.range()) {
                setSelectedLabel(selectedRange.label);
                setRange(selectedRange.range());
            }
        },
        [range]
    );

    const fetchData = async () => {
        try {
            const startDateUtc = fromZonedTime(range.startDate, timeZone);
            const endDateUtc = fromZonedTime(range.endDate, timeZone);
            const response = await axios.post(route("laporan.fetchData"), {
                startDate: startDateUtc.toISOString(),
                endDate: endDateUtc.toISOString(),
            });
            setNota(response.data);
        } catch (error) {
            console.error("There was an error fetching the data!", error);
            // alert("Error fetching data, please try again later.");
        }
    };

    const printPDF = async (e) => {
        e.preventDefault();

        try {
            const startDateUtc = fromZonedTime(range.startDate, timeZone);
            const endDateUtc = fromZonedTime(range.endDate, timeZone);
            const response = await axios.post(route("laporan.store"), {
                selectedLabel: selectedLabel,
                startDate: startDateUtc.toISOString(),
                endDate: endDateUtc.toISOString(),
            });
            window.open(
                route("laporan.pdf", {
                    selectedLabel: selectedLabel,
                    startDate: range.startDate.toISOString(),
                    endDate: range.endDate.toISOString(),
                }),
                "_blank"
            );
        } catch (error) {
            console.error("Error generating PDF", error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Reports
                </h2>
            }
        >
            <Head title="Reports" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={printPDF}>
                            <div className="p-6 bg-white flex">
                                <RangeSelector
                                    selectedRange={selectedLabel}
                                    onChange={handleRangeChange}
                                />
                                <SecondaryButton
                                    onClick={fetchData}
                                    className="ml-3 mt-4"
                                >
                                    Show
                                </SecondaryButton>
                                <PrimaryButton
                                    // onClick={printPDF}
                                    className="ml-3 mt-4"
                                    disabled={nota.length === 0 || processing}
                                >
                                    Print PDF
                                </PrimaryButton>
                            </div>
                        </form>
                        <div className="p-6 border-t border-gray-200">
                            <NotaList nota={nota} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
