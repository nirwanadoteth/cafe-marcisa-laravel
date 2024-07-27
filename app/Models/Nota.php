<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nota extends Model
{
    use HasFactory;

    protected $table = "nota";
    protected $primaryKey = "Id_Nota";
    public $timestamps = false;

    protected $fillable = [
        "Id_Pesanan",
        "Sub_Total",
        "Pajak",
        "Total_Harga",
        "Diterima",
        "Kembali",
        "Tanggal",
        "Status",
    ];

    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class, 'Id_Pesanan', 'Id_Pesanan');
    }
}
