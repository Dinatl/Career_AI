import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CVBuilderPage from './pages/CVBuilderPage';
import CareerQuizPage from './pages/CareerQuizPage';
import JobBoardPage from './pages/JobBoardPage';
import CoverLetterPage from './pages/CoverLetterPage';
import SettingsPage from './pages/SettingsPage';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/cv-builder" element={<CVBuilderPage />} />
            <Route path="/quiz" element={<CareerQuizPage />} />
            <Route path="/jobs" element={<JobBoardPage />} />
            <Route path="/cover-letter" element={<CoverLetterPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
        <ChatbotWidget />
      </div>
    </Router>
  );
}

export default App;
