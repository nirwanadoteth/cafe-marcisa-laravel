<?php

use App\Http\Controllers\KategoriController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\NotaController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\ProfileController;
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
    return Inertia::render('Dashboard', [
        'totalCategories' => Kategori::where('Status', 'Active')->count(),   
        'totalProducts' => Produk::where('Status', 'Active')->count(),
        'favProduct' => Produk::withCount('rincian_pesanan')->orderBy('Nama')->first(),
        'orderToday' => Pesanan::whereDate('Tanggal', now('Asia/Jakarta'))->count(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::resource('kategori', KategoriController::class);
    Route::get('/kategori/{kategori}/edit', [KategoriController::class, 'edit'])->name('kategori.edit');
    Route::put('/kategori/{kategori}', [KategoriController::class, 'update'])->name('kategori.update');
    Route::patch('/kategori/{kategori}', [KategoriController::class, 'toggle'])->name('kategori.toggle');
});

Route::middleware('auth')->group(function () {
    Route::resource('produk', ProdukController::class);
    Route::get('/produk/{produk}/edit', [ProdukController::class, 'edit'])->name('produk.edit');
    Route::put('/produk/{produk}', [ProdukController::class, 'update'])->name('produk.update');
    Route::patch('/produk/{produk}', [ProdukController::class, 'toggle'])->name('produk.toggle');
});
Route::middleware('auth')->group(function () {
    Route::resource('user', UserController::class);
    Route::get('/user/{user}/edit', [UserController::class, 'edit'])->name('user.edit');
    Route::put('/user/{user}', [UserController::class, 'update'])->name('user.update');
    Route::delete('/user/{user}', [UserController::class, 'destroy'])->name('user.destroy');
});

Route::middleware('auth')->group(function () {
    Route::resource('pesanan', PesananController::class)->middleware('auth');
    Route::get('/pesanan/{pesanan}/edit', [PesananController::class, 'edit'])->name('pesanan.edit');
    Route::put('/pesanan/{pesanan}', [PesananController::class, 'update'])->name('pesanan.update');
});

Route::middleware('auth')->group(function () {
    Route::resource('nota', NotaController::class);
    Route::get('/nota/{pesanan}/process', [NotaController::class, 'process'])->name('nota.process');
    Route::get('/nota/{pesanan}/pdf', [NotaController::class, 'generatePdf'])->name('nota.pdf');
});

Route::middleware('auth')->group(function () {
    Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
    Route::post('/laporan/data', [LaporanController::class, 'fetchData'])->name('laporan.fetchData');
    Route::post('/laporan', [LaporanController::class, 'store'])->name('laporan.store');
    Route::get('/laporan/pdf', [LaporanController::class, 'generatePdf'])->name('laporan.pdf');
});

require __DIR__.'/auth.php';
