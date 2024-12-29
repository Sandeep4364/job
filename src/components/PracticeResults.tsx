import React from 'react';
import { FeedbackCard } from './FeedbackCard';
import { Download, RefreshCw } from 'lucide-react';
import { usePracticeHistory } from '../hooks/usePracticeHistory';

interface PracticeResultsProps {
  results: any[];
  onStartNewSession: () => void;
}

export function PracticeResults({ results, onStartNewSession }: PracticeResultsProps) {
  const { addSession } = usePracticeHistory();
  const overallScore = Math.round(
    results.reduce((acc, result) => acc + result.analysis.overall, 0) / results.length
  );

  React.useEffect(() => {
    // Save session when results are available
    if (results.length > 0) {
      addSession(results);
    }
  }, [results, addSession]);

  const downloadResults = () => {
    const data = JSON.stringify(results, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview-practice-results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Practice Session Complete</h2>
          <p className="mt-2 text-xl text-gray-600">Overall Score: {overallScore}%</p>
        </div>

        <div className="space-y-8">
          {results.map((result, index) => (
            <div key={index} className="border-t pt-8">
              <h3 className="text-xl font-semibold mb-4">
                Question {index + 1}: {result.question.text}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FeedbackCard
                  title="Response Quality"
                  score={result.analysis.response.score}
                  feedback={result.analysis.response.feedback}
                  icon={result.analysis.response.score >= 80 ? 'positive' : 'neutral'}
                />
                <FeedbackCard
                  title="Communication"
                  score={result.analysis.communication.score}
                  feedback={result.analysis.communication.feedback}
                  icon={result.analysis.communication.score >= 80 ? 'positive' : 'neutral'}
                />
                <FeedbackCard
                  title="Body Language"
                  score={result.analysis.bodyLanguage.score}
                  feedback={result.analysis.bodyLanguage.feedback}
                  icon={result.analysis.bodyLanguage.score >= 80 ? 'positive' : 'neutral'}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={onStartNewSession}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Start New Session
          </button>
          <button
            onClick={downloadResults}
            className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Results
          </button>
        </div>
      </div>
    </div>
  );
}