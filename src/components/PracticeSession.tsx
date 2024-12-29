import React, { useState, useEffect } from 'react';
import { useSpeechToText } from '../hooks/useSpeechToText';
import { useInterviewAnalysis } from '../hooks/useInterviewAnalysis';
import { Question } from '../types/interview';
import { Mic, MicOff, SkipForward } from 'lucide-react';

interface PracticeSessionProps {
  questions: Question[];
  onComplete: (results: any) => void;
}

export function PracticeSession({ questions, onComplete }: PracticeSessionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const { isListening, transcript, startListening, stopListening } = useSpeechToText();
  const { analyzeInterview } = useInterviewAnalysis();

  const currentQuestion = questions[currentQuestionIndex];

  const handleStartAnswer = () => {
    setStartTime(Date.now());
    startListening();
  };

  const handleStopAnswer = async () => {
    if (!startTime) return;
    
    stopListening();
    const duration = (Date.now() - startTime) / 1000;
    
    const analysis = analyzeInterview(
      transcript,
      duration,
      [], // Video frames would come from webcam
      currentQuestion.category
    );

    const result = {
      question: currentQuestion,
      answer: transcript,
      duration,
      analysis
    };

    setSessionResults(prev => [...prev, result]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(sessionResults);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <p className="text-lg text-gray-700">{currentQuestion.text}</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            {currentQuestion.category}
          </span>
        </div>

        <div className="space-y-6">
          {transcript && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Your Answer:</h3>
              <p className="text-gray-700">{transcript}</p>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <button
              onClick={isListening ? handleStopAnswer : handleStartAnswer}
              className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                isListening
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-5 h-5 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 mr-2" />
                  Start Recording
                </>
              )}
            </button>

            {!isListening && currentQuestionIndex < questions.length - 1 && (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="flex items-center px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50"
              >
                <SkipForward className="w-5 h-5 mr-2" />
                Skip Question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}