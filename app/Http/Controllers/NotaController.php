<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use App\Models\Pesanan;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pesanan = Pesanan::with('pembeli', 'nota')->orderByDesc('Tanggal')->get();

        // Pisahkan pesanan yang sudah dibayar dan belum dibayar
        $pesananBelumDibayar = $pesanan->filter(function ($item) {
            return $item->nota === null;
        });

        $pesananSudahDibayar = $pesanan->filter(function ($item) {
            return $item->nota !== null;
        });

        // Gabungkan pesanan yang belum dibayar di atas dan yang sudah dibayar di bawah
        $sortedPesanan = $pesananBelumDibayar->merge($pesananSudahDibayar);

        return Inertia::render('Payments/Index', [
            'pesanan' => $sortedPesanan,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Pesanan $pesanan)
    {
        $request->validate([
            'Id_Pesanan' => 'required|exists:pesanan,Id_Pesanan',
            'pay' => 'required|numeric|min:0',
        ]);

        $pesanan = Pesanan::with('rincian_pesanan.produk')->findOrFail($request->Id_Pesanan);

        $subtotal = 0;
        foreach ($pesanan->rincian_pesanan as $rincian) {
            $subtotal += $rincian->Jumlah * $rincian->produk->Harga;
        }
        $pajak = $subtotal * 0.1;
        $total = $subtotal + $pajak;
        $diterima = $request->pay;

        if ($diterima < $total) {
            return back()->withErrors(['pay' => 'Payment amount is less than the total amount.'])->withInput();
        }

        $kembali = $diterima - $total;

        Nota::create([
            'Id_Pesanan' => $pesanan->Id_Pesanan,
            'Sub_Total' => $subtotal,
            'Pajak' => $pajak,
            'Total_Harga' => $total,
            'Diterima' => $diterima,
            'Kembali' => $kembali,
            'Tanggal' => now(),
            'Status' => 'Lunas',
        ]);

        return redirect()->route('nota.index')->with('success', 'Pembayaran berhasil.');
    }

    public function generatePdf(Pesanan $pesanan)
    {
        $pesanan = Pesanan::with(['user', 'pembeli', 'rincian_pesanan.produk', 'nota'])->findOrFail($pesanan->Id_Pesanan);

        $data = [
            'pesanan' => $pesanan,
        ];

        $pdf = PDF::loadView('nota', $data)->setOptions(['dpi' => 150, 'defaultFont' => 'sans-serif'])->setPaper('a4', 'portrait');
        // "invoice-{$pesanan->Id_Pesanan}.pdf"
        $pdfFilename = "receipt-{$pesanan->nota->Id_Nota}.pdf";
        return $pdf->stream($pdfFilename);
    }

    /**
     * Display the specified resource.
     */
    public function show(Nota $nota)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Nota $nota)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nota $nota)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nota $nota)
    {
        //
    }

    /**
     * Process the payment.
     */
    public function process(Pesanan $pesanan)
    {
        return Inertia::render('Payments/Process', [
            'pesanan' => Pesanan::with(['pembeli', 'rincian_pesanan.produk'])->find($pesanan->Id_Pesanan),
        ]);
    }
}
