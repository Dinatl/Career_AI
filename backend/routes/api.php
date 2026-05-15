<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\CVController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\CoverLetterController;
use App\Http\Controllers\ChatbotController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/jobs', [JobController::class, 'index']);
    Route::get('/jobs/{job}', [JobController::class, 'show']);
    
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites/{job}', [FavoriteController::class, 'store']);
    Route::delete('/favorites/{job}', [FavoriteController::class, 'destroy']);
    
    Route::get('/cv/export', [CVController::class, 'export']);
    
    Route::post('/quiz', [QuizController::class, 'store']);
    
    Route::post('/cover-letter', [CoverLetterController::class, 'generate']);
    
    Route::post('/chat', [ChatbotController::class, 'chat']);
});
