import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="quiz-card animate-slide-in text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-primary">
            Добро пожаловать!
          </h1>
          
          <p className="text-lg mb-4 text-secondary leading-relaxed">
            Хотите узнать, какие у вас шансы на получение визы в США?
          </p>
          
          <p className="text-secondary leading-relaxed">
            Пройдите короткий тест — это просто, интересно и займёт всего пару минут! 🎯
          </p>
        </div>
        
        <button
          onClick={onStart}
          className="btn-primary w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
        >
          Начать тест
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;