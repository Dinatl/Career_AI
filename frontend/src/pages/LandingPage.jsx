import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-primary-50 to-white min-h-screen">
      <div className="fixed top-0 right-0 p-6 flex gap-4">
        <Link to="/login" className="px-4 py-2 font-medium text-gray-700 hover:text-primary-600 transition-colors">Sign In</Link>
        <Link to="/register" className="px-4 py-2 font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">Sign Up</Link>
      </div>

      <div className="glass-panel p-12 rounded-3xl max-w-4xl w-full">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600 mb-6">
          Build your future with AI
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          CareerAI helps students and young graduates find their perfect path. Generate professional CVs, take our career quiz, and discover tailored job offers using AI.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/cv-builder" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 transition-all hover:scale-105 active:scale-95 inline-block">
            Create my CV
          </Link>
          <Link to="/jobs" className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 rounded-xl font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 inline-block">
            Discover my career path
          </Link>
        </div>
      </div>
    </div>
  );
}
