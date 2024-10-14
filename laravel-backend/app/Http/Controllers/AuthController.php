<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request){
        $validateData = $request->validate([
            'name'=> 'required|max:60',
            'email'=> 'email|required|unique:users',
            'password'=> 'required|confirmed'
        ]);

        $validatedData['password'] = Hash::make($request->password);

        $user = User::create($validatedData);

        $acessToken = $user->createToken('authToken')->accessToken;

        return response(['user' => $user, 'access_token' => $acessToken]);

        }


        public function login(Request $request){
            $loginData = $request->validate([
                'email'=> 'email|required',
                'password '=>'required'
            ]);

            if (!auth()->attempt($loginData)) {
                return response (['message'=> 'Invalid Credentials. Please try again']);
            }

            $accessToken = auth()->user()->accessToken('authToken')->accessToken;
            return response (['user'=>auth()->user(), 'access_token'=>$accessToken]);
        }
}
