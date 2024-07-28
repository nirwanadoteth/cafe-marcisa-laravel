<?php

use App\Http\Controllers\KategoriController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\NotaController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\UserController;
use App\Models\Kategori;
use App\Models\Pesanan;
use App\Models\Produk;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    $totalCategories = Kategori::where('Status', 'Active')->count();
    $totalProducts = Produk::where('Status', 'Active')->count();
    $fav = Produk::where('Status', 'Active')->withCount('rincian_pesanan')->orderByDesc('rincian_pesanan_count')->first();
    $favProduct = $fav ? ($fav->rincian_pesanan_count > 0 ? $fav->Nama : 'No data') : 'No data';
    $orderToday = Pesanan::whereDate('Tanggal', now('Asia/Jakarta'))->count();

    return Inertia::render('Dashboard', [
        'totalCategories' => $totalCategories,
        'totalProducts' => $totalProducts,
        'favProduct' => $favProduct,
        'orderToday' => $orderToday,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::resource('kategori', KategoriController::class);
    Route::resource('produk', ProdukController::class);
    Route::resource('user', UserController::class);
    Route::resource('pesanan', PesananController::class);
    Route::resource('nota', NotaController::class);
    Route::get('/nota/{pesanan}/process', [NotaController::class, 'process'])->name('nota.process');
    Route::get('/nota/{pesanan}/pdf', [NotaController::class, 'generatePdf'])->name('nota.pdf');
    Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
    Route::post('/laporan/data', [LaporanController::class, 'fetchData'])->name('laporan.fetchData');
    Route::post('/laporan', [LaporanController::class, 'store'])->name('laporan.store');
    Route::get('/laporan/pdf', [LaporanController::class, 'generatePdf'])->name('laporan.pdf');
});

require __DIR__ . '/auth.php';
