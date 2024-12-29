import React from 'react';
import { Play, Clock, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type WelcomeScreenProps = {
  onStartPractice: () => void;
};

export function WelcomeScreen({ onStartPractice }: WelcomeScreenProps) {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Ready to improve your interview skills?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <Clock className="h-8 w-8 text-indigo-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">30 Minutes</h3>
            <p className="text-sm text-gray-600">Average session duration</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <Star className="h-8 w-8 text-indigo-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Real-time Feedback</h3>
            <p className="text-sm text-gray-600">AI-powered analysis</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <Play className="h-8 w-8 text-indigo-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">5 Questions</h3>
            <p className="text-sm text-gray-600">Tailored to your experience</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onStartPractice}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Interview Practice
          </button>
        </div>
      </div>
    </div>
  );
}