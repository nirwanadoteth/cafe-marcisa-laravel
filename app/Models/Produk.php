<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Produk extends Model
{
    use HasFactory;

    protected $table = 'produk';
    protected $primaryKey = 'Id_Produk';
    public $timestamps = false;

    protected $fillable = [
        'Id_Kategori',
        'Nama',
        'Harga',
        'Status',
    ];

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(Kategori::class, 'Id_Kategori', 'Id_Kategori');
    }

    public function rincian_pesanan()
    {
        return $this->hasMany(RincianPesanan::class, 'Id_Produk', 'Id_Produk');
    }
}
