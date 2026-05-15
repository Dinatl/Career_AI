<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatbotController extends Controller
{
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string'
        ]);

        $user = $request->user();

        // Save user message
        ChatMessage::create([
            'user_id' => $user->id,
            'role' => 'user',
            'message' => $request->message
        ]);

        $apiKey = env('GEMINI_API_KEY');
        if (!$apiKey) {
            return response()->json(['message' => 'Gemini API key is not configured in backend .env.'], 500);
        }

        try {
            $response = Http::post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
                'contents' => [
                    ['parts' => [['text' => "You are a professional Career AI Assistant. Answer concisely and professionally. Ensure formatting is clean. User says: " . $request->message]]]
                ]
            ]);

            if (!$response->successful()) {
                throw new \Exception("Gemini API Error: " . $response->body());
            }

            $json = $response->json();
            $aiResponse = $json['candidates'][0]['content']['parts'][0]['text'] ?? 'Sorry, I could not generate a response. Please try again.';
        } catch (\Exception $e) {
            return response()->json(['message' => "AI Connection Error: " . $e->getMessage()], 500);
        }

        $assistantMsg = ChatMessage::create([
            'user_id' => $user->id,
            'role' => 'assistant',
            'message' => $aiResponse
        ]);

        return response()->json($assistantMsg);
    }
}
