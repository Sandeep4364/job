import React from 'react';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PracticeSession } from './components/PracticeSession';
import { PracticeResults } from './components/PracticeResults';
import { FeedbackHistory } from './components/FeedbackHistory';
import { AuthPage } from './pages/AuthPage';
import { useAuth } from './contexts/AuthContext';
import { interviewQuestions } from './data/questions';

export default function App() {
  const [practiceMode, setPracticeMode] = React.useState<'inactive' | 'practicing' | 'completed'>('inactive');
  const [sessionResults, setSessionResults] = React.useState<any[]>([]);
  const [showHistory, setShowHistory] = React.useState(false);
  const { user, isLoading } = useAuth();

  const handleStartPractice = () => {
    setPracticeMode('practicing');
  };

  const handleCompletePractice = (results: any[]) => {
    setSessionResults(results);
    setPracticeMode('completed');
  };

  const handleStartNewSession = () => {
    setPracticeMode('practicing');
    setSessionResults([]);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Show auth page if user is not logged in
  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onShowHistory={() => setShowHistory(true)} />
      
      {practiceMode === 'inactive' && (
        <WelcomeScreen onStartPractice={handleStartPractice} />
      )}

      {practiceMode === 'practicing' && (
        <PracticeSession
          questions={interviewQuestions}
          onComplete={handleCompletePractice}
        />
      )}

      {practiceMode === 'completed' && (
        <PracticeResults
          results={sessionResults}
          onStartNewSession={handleStartNewSession}
        />
      )}

      {showHistory && (
        <FeedbackHistory onClose={() => setShowHistory(false)} />
      )}
    </div>
  );
}