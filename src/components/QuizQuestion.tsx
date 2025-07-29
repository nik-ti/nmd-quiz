import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Question } from '../types/quiz';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswer: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswer,
  onNext,
  onBack,
  canGoBack,
}) => {
  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-8 text-primary leading-relaxed">
          {question.text}
        </h2>
        
        <div className="space-y-4">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className={`btn-option w-full p-4 text-left rounded-xl border-2 font-medium transition-all ${
                selectedAnswer === option.value
                  ? 'selected'
                  : 'border-gray-200 hover:border-gray-300 bg-white text-primary'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                  selectedAnswer === option.value
                    ? 'border-white bg-white'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === option.value && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </div>
                <span className="flex-1">{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${
            canGoBack
              ? 'text-secondary hover:bg-gray-50'
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </button>
        
        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className="btn-primary px-8 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          Далее
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;