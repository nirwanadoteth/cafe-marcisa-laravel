<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $table = 'kategori';
    protected $primaryKey = 'Id_Kategori';
    public $timestamps = false;

    protected $fillable = [
        'Nama',
        'Status',
    ];

    public function produk()
    {
        return $this->hasMany(Produk::class, 'Id_Kategori', 'Id_Kategori');
    }
}
