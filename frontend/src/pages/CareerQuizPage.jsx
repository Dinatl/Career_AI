import { useState } from 'react';
import { Brain, Loader2 } from 'lucide-react';
import api from '../lib/axios';

const quizQuestions = [
  { text: 'When faced with a complex problem, you prefer to:', options: ['Analyze it methodically step by step.', 'Brainstorm creative out-of-the-box solutions.', 'Collaborate with a team to discuss ideas.', 'Look for established guidelines and protocols.'] },
  { text: 'Your ideal work environment is:', options: ['Quiet and structured', 'Dynamic and fast-paced', 'Interactive and social', 'Hands-on and practical'] }
];

export default function CareerQuizPage() {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSelect = async (option) => {
    const newAnswers = [...answers, option];
    
    if (currentIdx < quizQuestions.length - 1) {
      setAnswers(newAnswers);
      setCurrentIdx(currentIdx + 1);
    } else {
      setLoading(true);
      setError('');
      try {
        const response = await api.post('/quiz', { answers: newAnswers });
        setResult(response.data);
      } catch(err) {
        if (err.response?.status === 401) {
            setError("You must be logged in to save and analyze your results!");
        } else {
            setError(err.response?.data?.message || "Failed to fetch assessment results from backend.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-primary-100 rounded-full mb-6">
          <Brain className="w-12 h-12 text-primary-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Your Path</h1>
        <p className="text-xl text-gray-500">
          Take our AI-powered personality and skills assessment to find the careers that truly fit you.
        </p>
      </div>

      {!started ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
          <button onClick={() => setStarted(true)} className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg transition-all hover:scale-105 active:scale-95 w-full md:w-auto">
            Start the Assessment
          </button>
        </div>
      ) : loading ? (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
            <h2 className="text-xl font-semibold">Analyzing your profile via AI Backend...</h2>
        </div>
      ) : result ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
             <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Personality: {result.personality_type}</h2>
             <p className="text-gray-600 mb-6">Based on your responses, we've identified you as a {result.personality_type}. Here are your top career matches:</p>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {result.recommended_jobs?.map((job, i) => (
                    <div key={i} className="p-4 bg-primary-50 text-primary-700 rounded-xl font-semibold border border-primary-100">{job}</div>
                 ))}
             </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="mb-8">
            <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
              <span>Question {currentIdx + 1} of {quizQuestions.length}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary-600 rounded-full transition-all" style={{ width: `${((currentIdx) / quizQuestions.length) * 100}%`}}></div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{quizQuestions[currentIdx].text}</h2>
          
          <div className="space-y-4">
            {quizQuestions[currentIdx].options.map((option, i) => (
              <button onClick={() => handleSelect(option)} key={i} className="w-full text-left p-4 border border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all focus:ring-2 focus:ring-primary-500 outline-none">
                <span className="font-medium text-gray-700">{option}</span>
              </button>
            ))}
          </div>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
}
