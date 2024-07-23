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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->decimal('total_price', 10, 2);
            $table->date('date');
            $table->decimal('tax', 10, 2);
            $table->decimal('discount', 10, 2);
            $table->decimal('sub_total', 10, 2);
            $table->decimal('pay', 10, 2);
            $table->decimal('return', 10, 2);
            $table->enum('status', ['Completed'])->default('Completed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
