<?php

namespace App\Http\Controllers;

use App\Models\QuizResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class QuizController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'answers' => 'required|array',
        ]);

        $apiKey = env('GEMINI_API_KEY');
        if (!$apiKey) {
            return response()->json(['message' => 'Gemini API key missing. Check Laravel .env'], 500);
        }

        $answersStr = json_encode($request->answers);
        $prompt = "Analyze these career quiz answers array: $answersStr. Based on standard personality assessments, deduce what the career profile is. Respond ONLY with a compact simple JSON object matching this structure exactly (NO markdown formatting, NO backticks, NO extra text): {\"personality_type\": \"e.g. Strategic Analyst\", \"recommended_jobs\": [\"Job 1\", \"Job 2\", \"Job 3\"]}";

        try {
            $response = Http::post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
                'contents' => [['parts' => [['text' => $prompt]]]]
            ]);
            
            if (!$response->successful()) {
                throw new \Exception("Gemini API Error: " . $response->body());
            }

            $text = $response->json('candidates.0.content.parts.0.text');
            // Safely strip off formatting if AI includes ```json ```
            $text = str_replace(['```json', '```'], '', $text);
            $parsed = json_decode(trim($text), true);
            
            if (!$parsed || !isset($parsed['personality_type'])) {
                throw new \Exception("AI generated invalid JSON");
            }
            
            $personality = $parsed['personality_type'];
            $recommendedJobs = $parsed['recommended_jobs'] ?? [];
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to parse AI psychological analysis: ' . $e->getMessage()], 500);
        }

        $result = QuizResult::create([
            'user_id' => $request->user()->id,
            'personality_type' => $personality,
            'recommended_jobs' => $recommendedJobs,
            'score_data' => $request->answers,
        ]);

        return response()->json($result);
    }
}
