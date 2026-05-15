import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { Download, CheckCircle } from 'lucide-react';

const STEPS = ['Personal Info', 'Education', 'Experience', 'Skills', 'Preview & Download'];

export default function CVBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const cvRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', summary: '',
    degree: '', school: '', year: '',
    jobTitle: '', company: '', duration: '', jobDesc: '',
    skills: ''
  });

  const handleDownload = () => {
    const element = cvRef.current;
    if (!element) return;
    const opt = {
      margin: 0.5,
      filename: `${formData.fullName.replace(/\s+/g, '_') || 'My'}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">CV Builder</h1>
        <p className="text-gray-500 mt-1">Complete the steps below to generate and download your professional PDF CV.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEPS.map((step, idx) => (
            <span key={step} className={`text-sm font-medium hidden sm:block ${idx <= currentStep ? 'text-primary-600' : 'text-gray-400'}`}>
              {step}
            </span>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary-600 transition-all duration-500" style={{ width: `${((currentStep) / (STEPS.length - 1)) * 100}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[500px]">
        {currentStep === 0 && (
          <div className="space-y-4 animate-in fade-in">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 shadow-sm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 shadow-sm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 shadow-sm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Address Location</label><input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 shadow-sm" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label><textarea rows="4" value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 shadow-sm"></textarea></div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Education Background</h2>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Degree / Certification</label><input type="text" value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} placeholder="e.g. BSc Computer Science" className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 shadow-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">School / University</label><input type="text" value={formData.school} onChange={e => setFormData({...formData, school: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 shadow-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label><input type="text" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 shadow-sm" /></div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Work Experience</h2>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label><input type="text" value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 shadow-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Company</label><input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 shadow-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Duration</label><input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="Jan 2022 - Present" className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 shadow-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Description / Responsibilities</label><textarea rows="4" value={formData.jobDesc} onChange={e => setFormData({...formData, jobDesc: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 shadow-sm"></textarea></div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Core Skills</h2>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label><textarea rows="4" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} placeholder="e.g. JavaScript, React, Leadership, Project Management" className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 shadow-sm"></textarea></div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="animate-in fade-in">
             <div className="flex justify-between items-center mb-6">
                <div>
                   <h2 className="text-2xl font-bold flex items-center gap-2"><CheckCircle className="text-green-500" /> Ready to Download</h2>
                   <p className="text-gray-500">Review your generated CV layout below.</p>
                </div>
                <button onClick={handleDownload} className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-lg flex items-center gap-2 font-medium transition-all active:scale-95">
                  <Download className="w-5 h-5"/> Save as PDF
                </button>
             </div>

             {/* Hidden Printable Area Container */}
             <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 overflow-x-auto shadow-inner">
               <div ref={cvRef} className="bg-white p-10 w-[800px] mx-auto text-gray-800 font-sans shadow-md border border-gray-200" style={{minHeight: "1056px"}}>
                  <h1 className="text-4xl font-bold text-gray-900 border-b-2 border-primary-600 pb-2 mb-4 uppercase tracking-tight">{formData.fullName || 'YOUR NAME'}</h1>
                  <div className="flex gap-4 text-sm text-gray-600 mb-8 font-medium">
                     <span>{formData.email || 'email@example.com'}</span> |
                     <span>{formData.phone || '+1 234 567 890'}</span> |
                     <span>{formData.address || 'City, Country'}</span>
                  </div>

                  {formData.summary && (
                     <div className="mb-8">
                       <h2 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">Professional Summary</h2>
                       <p className="text-gray-700 leading-relaxed">{formData.summary}</p>
                     </div>
                  )}

                  <div className="mb-8">
                     <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-200 pb-1">Experience</h2>
                     <div>
                        <div className="flex justify-between font-bold text-lg text-gray-900">
                           <span>{formData.jobTitle || 'Job Title'}</span>
                           <span className="text-primary-600">{formData.duration || 'Duration'}</span>
                        </div>
                        <div className="text-gray-600 font-medium text-md mb-2">{formData.company || 'Company Name'}</div>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{formData.jobDesc || 'Job responsibilities and achievements go here.'}</p>
                     </div>
                  </div>

                  <div className="mb-8">
                     <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-200 pb-1">Education</h2>
                     <div className="flex justify-between font-bold text-lg text-gray-900">
                           <span>{formData.degree || 'Degree Name'}</span>
                           <span className="text-primary-600">{formData.year || 'Graduation Year'}</span>
                     </div>
                     <div className="text-gray-600 font-medium">{formData.school || 'University Name'}</div>
                  </div>

                  <div className="mb-8">
                     <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-200 pb-1">Skills</h2>
                     <div className="flex flex-wrap gap-2 mt-2">
                        {(formData.skills ? formData.skills.split(',') : ['Skill 1', 'Skill 2', 'Skill 3']).map((skill, i) => (
                           <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium border border-gray-200">{skill.trim()}</span>
                        ))}
                     </div>
                  </div>
               </div>
             </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button 
          onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl disabled:opacity-50 hover:bg-gray-50 transition-all font-medium active:scale-95"
        >
          Back
        </button>
        <button 
          onClick={() => setCurrentStep(s => Math.min(STEPS.length - 1, s + 1))}
          disabled={currentStep === STEPS.length - 1}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl disabled:opacity-50 hover:bg-primary-700 transition-all font-medium active:scale-95 shadow-md flex items-center justify-center min-w-[120px]"
        >
          {currentStep === STEPS.length - 2 ? 'Generate CV' : 'Next Step'}
        </button>
      </div>
    </div>
  );
}
