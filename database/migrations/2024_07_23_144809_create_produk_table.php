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
        Schema::create('produk', function (Blueprint $table) {
            $table->id('Id_Produk');
            $table->foreignId('Id_Kategori')->constrained('kategori', 'Id_Kategori')->cascadeOnDelete();
            $table->string('Nama', 50);
            $table->decimal('Harga', 10, 2);
            $table->enum('Status', ['Aktif', 'Tidak Aktif'])->default('Aktif');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produk');
    }
};
