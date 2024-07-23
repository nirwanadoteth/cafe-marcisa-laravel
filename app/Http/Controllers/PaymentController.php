<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Payments/Index', [
            'orders' => Order::where('status', 'Unpaid')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Order $order)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'pay' => 'required|numeric|min:0',
        ]);

        $order = Order::findOrFail($request->order_id);

        $subTotal = $this->calculateSubTotal($order);

        $payment = $this->createPayment($order, $request->pay, $subTotal);

        $order->update([
            'status' => 'Completed',
        ]);

        return redirect()->route('payments.index')->with('success', 'Payment has been successfully processed.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }

    /**
     * Process the payment.
     */
    public function process(Order $order)
    {
        return Inertia::render('Payments/Process', [
            'order' => Order::with('products')->findOrFail($order->id),
        ]);
    }

    /**
     * Calculate the sub-total amount for an order.
     *
     * @param  \App\Models\Order  $order
     * @return float
     */
    private function calculateSubTotal(Order $order)
    {
        $tax = $order->total_price * 0.1;
        $discount = 0;
        return $order->total_price + $tax - $discount;
    }

    /**
     * Create a new payment record.
     *
     * @param  \App\Models\Order  $order
     * @param  float  $pay
     * @param  float  $subTotal
     * @return \App\Models\Payment
     */
    private function createPayment(Order $order, $pay, $subTotal)
    {
        return Payment::create([
            'order_id' => $order->id,
            'total_price' => $order->total_price,
            'date' => now(),
            'tax' => $order->total_price * 0.1,
            'discount' => 0,
            'sub_total' => $subTotal,
            'pay' => $pay,
            'return' => $pay - $subTotal,
            'status' => 'Completed',
        ]);
    }
}
