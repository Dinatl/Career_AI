import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, FileText, CheckCircle, Search, MessageSquare, Menu, User, BookOpen, LogOut, Settings } from 'lucide-react';
import api from '../../lib/axios';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'CV Builder', path: '/cv-builder', icon: FileText },
  { name: 'Career Quiz', path: '/quiz', icon: CheckCircle },
  { name: 'Job Matching', path: '/jobs', icon: Search },
  { name: 'Cover Letter', path: '/cover-letter', icon: BookOpen },
];

export default function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
       await api.post('/logout');
    } catch (e) {
       console.error("Logout failed silently", e);
    }
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-20 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-primary-600 tracking-tight">CareerAI</h1>
        </div>
        <div className="flex-1 flex flex-col py-6 px-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary-50 text-primary-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            );
          })}
        </div>
        <div className="p-4 border-t border-gray-200 relative">
          
          {/* Profile Dropdown Menu */}
          {showMenu && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
              <NavLink to="/settings" onClick={() => setShowMenu(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4 text-gray-500" /> Account Settings
              </NavLink>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100">
                <LogOut className="w-4 h-4 text-red-500" /> Sign Out
              </button>
            </div>
          )}

          <button 
            onClick={() => setShowMenu(!showMenu)}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl transition-all ${showMenu ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50' }`}
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
               <User className="w-4 h-4" />
            </div>
            <span className="font-medium flex-1">My Profile</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
        <div className="flex justify-around items-center h-16">
          {NAV_ITEMS.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                    isActive ? 'text-primary-600' : 'text-gray-500'
                  }`
                }
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
