<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rincian_pesanan', function (Blueprint $table) {
            $table->id('Id_Rincian');
            $table->foreignId('Id_Pesanan')->constrained('pesanan', 'Id_Pesanan')->cascadeOnDelete();
            $table->foreignId('Id_Produk')->constrained('produk', 'Id_Produk')->cascadeOnDelete();
            $table->integer('Jumlah');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rincian_pesanan');
    }
};
