import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Filter, Loader2 } from 'lucide-react';
import api from '../lib/axios';

export default function JobBoardPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (searchQuery = '') => {
    setLoading(true);
    try {
      const response = await api.get(`/jobs?search=${searchQuery}`);
      // Assuming Laravel paginated response structure
      setJobs(response.data.data || []);
    } catch (err) {
      if (err.response) {
          setError(`Backend Error ${err.response.status}: ${err.response.data.message || 'Failed to fetch jobs'}`);
      } else {
          setError('Failed to load jobs from backend. Make sure your local Laravel server is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Suggestions</h1>
        <p className="text-gray-500 mt-1">Discover opportunities customized to your profile loaded live from the backend database.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search job titles or keywords..." 
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
        <button type="submit" className="px-6 py-3 bg-primary-600 border border-primary-600 text-white font-medium rounded-xl flex items-center gap-2 hover:bg-primary-700 active:scale-95 transition-all">
          Search
        </button>
      </form>

      {loading ? (
         <div className="py-20 flex justify-center text-primary-600"><Loader2 className="w-8 h-8 animate-spin" /></div>
      ) : error ? (
         <div className="p-4 bg-red-50 text-red-600 rounded-xl">{error}</div>
      ) : jobs.length === 0 ? (
         <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-100 shadow-sm">No jobs found in the database yet. Add some to your backend Laravel models!</div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all group">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center font-bold text-xl uppercase">
                  {job.company.substring(0,2)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{job.title}</h3>
                  <div className="flex gap-3 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 flex-wrap">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{job.domain}</span>
                <button className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium hover:bg-primary-100 ml-2 shadow-sm transition-all active:scale-95">
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
