import React from 'react';
import { Briefcase, History, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type HeaderProps = {
  onShowHistory: () => void;
};

export function Header({ onShowHistory }: HeaderProps) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-indigo-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-white" />
            <span className="ml-2 text-white text-xl font-bold">InterviewAI</span>
          </div>
          {user && (
            <div className="flex items-center space-x-4">
              <button
                onClick={onShowHistory}
                className="flex items-center text-white hover:text-indigo-100"
              >
                <History className="h-5 w-5 mr-1" />
                History
              </button>
              <div className="flex items-center text-white">
                <User className="h-5 w-5 mr-1" />
                <span className="mr-4">{user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center text-white hover:text-indigo-100"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}