<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RincianPesanan extends Model
{
    use HasFactory;

    protected $table = 'rincian_pesanan';
    protected $primaryKey = 'Id_Rincian';
    public $timestamps = false;

    protected $fillable = [
        'Id_Pesanan',
        'Id_Produk',
        'Jumlah',
    ];

    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class, 'Id_Pesanan', 'Id_Pesanan');
    }

    public function produk()
    {
        return $this->belongsTo(Produk::class, 'Id_Produk', 'Id_Produk');
    }
}
