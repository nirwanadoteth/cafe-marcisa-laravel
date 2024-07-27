<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Pembeli;
use App\Models\Pesanan;
use App\Models\Produk;
use App\Models\RincianPesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PesananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Orders/Index", [
            'pesanan' => Pesanan::with(['pembeli', 'nota'])->orderByDesc('Tanggal')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Orders/New', [
            'kategori' => Kategori::orderBy('Nama')->where('Status', 'Active')->get(),
            'produk' => Produk::orderBy('Nama')->where('Status', 'Active')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Nama' => 'required|string|max:255',
            'produk' => 'required|array',
            'produk.*.Id_Produk' => 'required|exists:produk,Id_Produk',
            'produk.*.Jumlah' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $pembeli = Pembeli::create([
                'Nama' => $request->Nama,
            ]);

            $pesanan = Pesanan::create([
                'Id_User' => Auth::user()->Id_User,
                'Id_Pembeli' => $pembeli->Id_Pembeli,
                'Tanggal' => now(),
            ]);

            foreach ($request->produk as $dataProduk) {
                $idProduk = $dataProduk['Id_Produk'];
                $jumlah = $dataProduk['Jumlah'];

                RincianPesanan::create([
                    'Id_Pesanan' => $pesanan->Id_Pesanan,
                    'Id_Produk' => $idProduk,
                    'Jumlah' => $jumlah,
                ]);

            }
        });

        return redirect()->route('pesanan.index')->with('success', 'Order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pesanan $pesanan)
    {
        return Inertia::render('Orders/Show', [
            'pesanan' => Pesanan::with(['pembeli', 'rincian_pesanan.produk'])->find($pesanan->Id_Pesanan),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pesanan $pesanan)
    {
        return Inertia::render('Orders/Edit', [
            'pesanan' => Pesanan::with(['pembeli', 'rincian_pesanan.produk'])->find($pesanan->Id_Pesanan),
            'kategori' => Kategori::orderBy('Nama')->get(),
            'produk' => Produk::orderBy('Nama')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pesanan $pesanan)
    {
        $request->validate([
            'produk' => 'required|array',
            'produk.*.Id_Produk' => 'required|exists:produk,Id_Produk',
            'produk.*.Jumlah' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($request, $pesanan) {
            $pesanan->update([
                'Tanggal' => now(),
            ]);

            foreach ($request->produk as $dataProduk) {
                $idProduk = $dataProduk['Id_Produk'];
                $jumlah = $dataProduk['Jumlah'];

                RincianPesanan::where('Id_Pesanan', $pesanan->Id_Pesanan)
                    ->where('Id_Produk', $idProduk)->update([
                            'Jumlah' => $jumlah,
                        ]);
            }
        });

        return redirect()->route('pesanan.index')->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pesanan $pesanan)
    {
        //
    }
}
