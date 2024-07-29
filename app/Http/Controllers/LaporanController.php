<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function index()
    {
        return Inertia::render('Reports/Index', [
            'user' => auth()->user(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'selectedLabel' => 'required|string',
            'startDate' => 'required|date',
            'endDate' => 'required|date',
        ]);

        return response()->json(['success' => true]);
    }

    public function fetchData(Request $request)
    {
        $startDate = Carbon::parse($request->input('startDate'))->setTimezone('Asia/Jakarta')->startOfDay();
        $endDate = Carbon::parse($request->input('endDate'))->setTimezone('Asia/Jakarta')->endOfDay();

        $nota = Nota::whereDate('Tanggal', '>=', $startDate)
            ->whereDate('Tanggal', '<=', $endDate)
            ->with('pesanan.pembeli', 'pesanan.rincian_pesanan.produk')
            ->get();

        return response()->json($nota);
    }

    public function generatePdf(Request $request)
    {
        $selectedLabel = $request->input('selectedLabel');
        $startDate = Carbon::parse($request->input('startDate'))->setTimezone('Asia/Jakarta');
        $endDate = Carbon::parse($request->input('endDate'))->setTimezone('Asia/Jakarta');

        $nota = Nota::with(['pesanan.pembeli', 'pesanan.rincian_pesanan.produk'])
            ->whereDate('Tanggal', '>=', $startDate)
            ->whereDate('Tanggal', '<=', $endDate)
            ->get();

        $label = $selectedLabel === 'Hari Ini' || $selectedLabel === 'Kemarin' ? $startDate->format('d F Y') : $startDate->format('d F Y') . ' - ' . $endDate->format('d F Y');

        $data = [
            'nota' => $nota,
            'selectedLabel' => $label,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ];

        $pdf = PDF::loadView('laporan', $data)->setOptions(['dpi' => 150, 'defaultFont' => 'sans-serif'])->setPaper('a4', 'portrait');
        $pdfFilename = "laporan-{$label}.pdf";

        return $pdf->stream($pdfFilename);
    }
}
