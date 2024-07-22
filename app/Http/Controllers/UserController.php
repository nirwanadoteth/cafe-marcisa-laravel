<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            // 'name' => 'required|string|max:255',
            // 'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'username' => 'required|string|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => [Rule::enum(Role::class)],
        ]);

        User::create([
            // 'name' => $request->name,
            // 'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return redirect(route('users.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // Check current password if provided
        if ($request->current_password && !Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The provided password does not match your current password.'],
            ]);
        }

        // check if new password is same as old password
        if ($request->password && Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'password' => ['The new password must be different from the current password.'],
            ]);
        }

        // Validate input
        $validated = $request->validate([
            'username' => ['required', 'string', 'max:255', Rule::unique(User::class)->ignore($user->id)],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'role' => [Rule::enum(Role::class)],
        ]);

        // Update user details
        $user->update([
            'username' => $validated['username'],
            'role' => $validated['role'],
        ]);

        // Update password only if provided
        if ($validated['password']) {
            $user->update([
                'password' => Hash::make($validated['password']),
            ]);

            // Log the user out if they updated their own password
            if ($user->id === auth()->user()->id) {
                auth()->logout();

                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return redirect()->route('login');
            }
        }

        return redirect(route('users.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect(route('users.index'));
    }
}
