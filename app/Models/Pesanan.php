<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    use HasFactory;

    protected $table = 'pesanan';
    protected $primaryKey = 'Id_Pesanan';
    public $timestamps = false;

    protected $fillable = [
        'Id_Pembeli',
        'Id_User',
        'Tanggal',
    ];

    public function pembeli()
    {
        return $this->belongsTo(Pembeli::class, 'Id_Pembeli', 'Id_Pembeli');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'Id_User', 'Id_User');
    }

    public function rincian_pesanan()
    {
        return $this->hasMany(RincianPesanan::class, 'Id_Pesanan', 'Id_Pesanan');
    }

    public function nota()
    {
        return $this->hasOne(Nota::class, 'Id_Pesanan', 'Id_Pesanan');
    }
}
