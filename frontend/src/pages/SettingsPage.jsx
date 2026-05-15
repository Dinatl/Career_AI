import { useState } from 'react';
import { User, Lock, Bell, CheckCircle } from 'lucide-react';
import api from '../lib/axios';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [success, setSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences and personal information.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 space-y-2">
          {[{ id:'profile', icon: User, label: 'Profile' }, { id:'security', icon: Lock, label: 'Security' }, { id:'notifications', icon: Bell, label: 'Notifications' }].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[400px]">
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-6">
              <h2 className="text-xl font-semibold border-b border-gray-100 pb-4">Personal Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" defaultValue="Alex" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-primary-500 focus:border-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" defaultValue="Johnson" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-primary-500 focus:border-primary-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" defaultValue="alex@example.com" disabled className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 outline-none cursor-not-allowed" />
              </div>
              <div className="pt-4">
                <button type="submit" className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all shadow-sm">
                  Save Changes
                </button>
                {success && <span className="ml-4 text-green-600 text-sm font-medium animate-pulse"><CheckCircle className="w-4 h-4 inline mr-1" />Saved successfully!</span>}
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
               <h2 className="text-xl font-semibold border-b border-gray-100 pb-4">Security Settings</h2>
               <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-orange-800 text-sm">
                 Changing your password will sign you out of all active sessions across devices.
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full p-3 border border-gray-200 rounded-xl outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full p-3 border border-gray-200 rounded-xl outline-none" />
               </div>
               <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all shadow-sm mt-4">
                  Update Password
               </button>
            </div>
          )}

          {activeTab === 'notifications' && (
             <div className="space-y-6">
                <h2 className="text-xl font-semibold border-b border-gray-100 pb-4">Email Notifications</h2>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                    <div>
                        <p className="font-medium text-gray-800">Job Matches</p>
                        <p className="text-sm text-gray-500">Get notified when new jobs match your profile.</p>
                    </div>
                    <div className="w-12 h-6 bg-primary-600 rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between py-2">
                    <div>
                        <p className="font-medium text-gray-800">Security Alerts</p>
                        <p className="text-sm text-gray-500">Get emails about suspicious logins.</p>
                    </div>
                    <div className="w-12 h-6 bg-primary-600 rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                    </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
