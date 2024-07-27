<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembeli extends Model
{
    use HasFactory;

    protected $table = 'pembeli';
    protected $primaryKey = 'Id_Pembeli';
    public $timestamps = false;

    protected $fillable = [
        'Nama',
    ];

    public function pesanan()
    {
        return $this->hasMany(Pesanan::class, 'Id_Pembeli', 'Id_Pembeli');
    }
}
