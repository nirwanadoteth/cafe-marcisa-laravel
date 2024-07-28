<?php

use App\Models\Pesanan;
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
        Schema::create('nota', function (Blueprint $table) {
            $table->id('Id_Nota');
            $table->foreignId('Id_Pesanan')->constrained('pesanan', 'Id_Pesanan')->cascadeOnDelete();
            $table->decimal('Sub_Total', 10, 2);
            $table->decimal('Pajak', 10, 2);
            $table->decimal('Total_Harga', 10, 2);
            $table->decimal('Diterima', 10, 2);
            $table->decimal('Kembali', 10, 2);
            $table->dateTime('Tanggal')->useCurrent();
            $table->enum('Status', ['Lunas'])->default('Lunas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nota');
    }
};
