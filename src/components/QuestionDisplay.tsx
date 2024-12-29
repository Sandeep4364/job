import React from 'react';
import { Question } from '../types/interview';

type QuestionDisplayProps = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
};

export function QuestionDisplay({ question, questionNumber, totalQuestions }: QuestionDisplayProps) {
  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className={`px-2 py-1 rounded text-sm font-medium ${
          question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
          question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </span>
      </div>
      <p className="text-lg font-medium text-gray-900">{question.text}</p>
      <p className="mt-2 text-sm text-gray-500">Category: {question.category}</p>
    </div>
  );
}