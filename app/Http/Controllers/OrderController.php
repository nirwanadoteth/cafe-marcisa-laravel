<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Orders/Index", [
            // get all orders sorted by the created_at column in descending order
            'orders' => Order::with('products')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Orders/New', [
            'categories' => Category::all(),
            'products' => Product::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'products' => 'required|array',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $order = Order::create([
                'user_id' => Auth::user()->id,
                'customer_name' => $request->customer_name,
                'total_price' => 0, // This will be updated later
                'status' => 'Unpaid',
            ]);

            $totalPrice = 0;

            foreach ($request->products as $productData) {
                $product = Product::find($productData['product_id']);
                
                $quantity = $productData['quantity'];
                $price = $product->price * $quantity;

                $order->products()->attach($product->id, ['quantity' => $quantity, 'price' => $product->price]);
                $totalPrice += $price;
            }

            $order->update(['total_price' => $totalPrice]);
        });

        return redirect()->route('orders.index')->with('success', 'Order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return Inertia::render('Orders/Show', [
            'order' => Order::with('products')->findOrFail($order->id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        return Inertia::render('Orders/Edit', [
            'categories' => Category::all(),
            'products' => Product::all(),
            'order' => Order::findOrFail($order->id),
            // retrieve products related to the order and their quantities from the pivot table
            'orderProducts' => $order->products->map(function ($product) {
                return [
                    'product_id' => $product->id,
                    'quantity' => $product->pivot->quantity,
                ];
            }),
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'products' => 'required|array',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($request, $order) {
            $order->update([
                'total_price' => 0, // This will be updated later
            ]);

            $totalPrice = 0;

            foreach ($request->products as $productData) {
                $product = Product::find($productData['product_id']);
                
                $quantity = $productData['quantity'];
                $price = $product->price * $quantity;

                $order->products()->syncWithoutDetaching([$product->id => ['quantity' => $quantity, 'price' => $product->price]]);
                $totalPrice += $price;
            }

            $order->update(['total_price' => $totalPrice]);
        });

        return redirect()->route('orders.index')->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
