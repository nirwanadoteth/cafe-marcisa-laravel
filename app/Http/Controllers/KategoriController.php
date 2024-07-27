<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Models\Kategori;
use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Categories/Index', [
            'kategori' => Kategori::all(),
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
            'Nama' => 'required|string|max:50',
        ]);

        Kategori::create($validated);

        return redirect(route('kategori.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Kategori $kategori)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kategori $kategori)
    {
        return Inertia::render('Categories/Edit', [
            'kategori' => $kategori,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kategori $kategori)
    {
        $validated = $request->validate([
            'Nama' => 'required|string|max:30',
            'Status' => [Rule::enum(Status::class)],
        ]);

        DB::transaction(function () use ($validated, $kategori) {
            $kategori->update($validated);

            Produk::where('Id_Kategori', $kategori->Id_Kategori)
                ->update(['Status' => $validated['Status']]);
        });

        return redirect(route('kategori.index'))->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategori $kategori)
    {
        //
    }
}
