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
            'current_user' => auth()->user(),
            'user' => User::orderBy('Username')->get(),
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
            'Username' => 'required|string|max:50|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'Role' => [Rule::enum(Role::class)],
        ]);

        User::create([
            // 'name' => $request->name,
            // 'email' => $request->email,
            'Username' => $request->Username,
            'Password' => Hash::make($request->password),
            'Role' => $request->Role,
        ]);

        return redirect(route('user.index'));
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
        // Check current Password if provided
        if ($request->current_password && !Hash::check($request->current_password, $user->Password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Password yang dimasukkan salah.'],
            ]);
        }

        // check if new Password is same as old Password
        if ($request->password && Hash::check($request->password, $user->Password)) {
            throw ValidationException::withMessages([
                'password' => ['Password baru tidak boleh sama dengan password lama.'],
            ]);
        }

        // Validate input
        $validated = $request->validate([
            'Username' => ['required', 'string', 'max:50', Rule::unique(User::class)->ignore($user->Id_User, 'Id_User')],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'Role' => [Rule::enum(Role::class)],
        ]);

        // Update user details
        $user->update([
            'Username' => $validated['Username'],
            'Role' => $validated['Role'],
        ]);

        // Update Password only if provided
        if ($validated['password']) {
            $user->update([
                'Password' => Hash::make($validated['password']),
            ]);

            // Log the user out if they updated their own Password
            if ($user->Id_User === auth()->user()->getAuthIdentifier()) {
                auth()->logout();

                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return redirect()->route('login');
            }
        }

        return redirect(route('user.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect(route('user.index'));
    }
}
