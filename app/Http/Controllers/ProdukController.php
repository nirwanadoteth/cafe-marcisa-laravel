<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Models\Kategori;
use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProdukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Products/Index', [
            'user' => auth()->user(),
            'produk' => Produk::with('kategori')->get(),
            'kategori' => Kategori::orderBy('Nama')->get(),
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'Id_Kategori' => 'required',
            'Nama' => 'required|string|max:50',
            'Harga' => 'required|numeric',
        ]);

        Produk::create($validated);

        return redirect(route('produk.index'))->with('success', 'Produk berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Produk $produk)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Produk $produk)
    {
        return Inertia::render('Products/Edit', [
            'produk' => $produk::with('kategori')->find($produk->Id_Produk),
            'kategori' => Kategori::orderBy('Nama')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Produk $produk)
    {
        $validated = $request->validate([
            'Id_Kategori' => 'required',
            'Nama' => 'required|string|max:50',
            'Harga' => 'required|numeric',
            'Status' => [Rule::enum(Status::class)],
        ]);

        $produk->update($validated);

        return redirect(route('produk.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produk $produk)
    {
        //
    }
}
