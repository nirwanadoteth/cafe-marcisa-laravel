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
        Schema::create('pesanan', function (Blueprint $table) {
            $table->id('Id_Pesanan');
            $table->foreignId('Id_Pembeli')->constrained('pembeli', 'Id_Pembeli')->cascadeOnDelete();
            $table->foreignId('Id_User')->constrained('user', 'Id_User')->cascadeOnDelete();
            $table->dateTime('Tanggal')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesanan');
    }
};
