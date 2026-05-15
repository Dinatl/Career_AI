import { useState, useEffect } from 'react';
import { FileText, CheckCircle, Briefcase, Heart, Loader2 } from 'lucide-react';
import api from '../lib/axios';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        setData(response.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
     return <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 text-primary-600 animate-spin" /></div>;
  }

  const user = data?.user || { name: 'User' };
  
  // Calculate dynamic stats
  const hasCV = (data?.educations?.length > 0 || data?.experiences?.length > 0) ? "Complete" : "Action Needed";
  const quizTaken = data?.quiz_results?.length > 0 ? "Analyzed" : "Pending";
  const favCount = data?.favorites?.length || 0;

  const SUMMARY_CARDS = [
    { title: "CV Status", value: hasCV, sub: "Based on saved profile", icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Quiz Results", value: quizTaken, sub: "AI Personality Assessment", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
    { title: "Suggested Jobs", value: "12", sub: "Matches found online", icon: Briefcase, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Favorites", value: favCount.toString(), sub: "Saved jobs in database", icon: Heart, color: "text-red-600", bg: "bg-red-100" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-gray-500 mt-1">Here is what's happening with your career journey today.</p>
        </div>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium shadow transition-all active:scale-95">
          Generate New CV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {SUMMARY_CARDS.map((card) => (
          <div key={card.title} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bg}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{card.value}</h3>
              <p className="text-sm text-gray-400 mt-1">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Details</h2>
            {data?.profile ? (
                <div className="text-gray-700 space-y-2">
                    <p><strong>Phone:</strong> {data.profile.phone}</p>
                    <p><strong>Address:</strong> {data.profile.address}</p>
                    <p><strong>Summary:</strong> {data.profile.summary}</p>
                </div>
            ) : (
                <p className="text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-200">No profile recorded yet. Head over to the CV Builder to start adding your details!</p>
            )}
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
             <h2 className="text-xl font-bold text-gray-900 mb-4">Latest Action</h2>
             <p className="text-gray-500">Connected to the CareerAI backend securely. Take the Career Quiz to unlock AI insights!</p>
        </div>
      </div>
    </div>
  );
}
