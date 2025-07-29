import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizQuestion from './components/QuizQuestion';
import ContactForm from './components/ContactForm';
import ResultsScreen from './components/ResultsScreen';
import ProgressBar from './components/ProgressBar';
import { QuizState, Question } from './types/quiz';
import { workQuestions, businessQuestions } from './data/questions';
import { calculateScore, getRecommendedVisas } from './utils/visaLogic';
import { Briefcase, Rocket } from 'lucide-react';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 0,
    path: null,
    answers: {},
    contactInfo: {
      phone: '',
      email: '',
      name: '',
    },
    score: 0,
    visas: [],
    completed: false,
  });

  const handleStart = () => {
    setQuizState(prev => ({ ...prev, currentStep: 1 }));
  };

  const handlePathSelection = (path: 'work' | 'business') => {
    setQuizState(prev => ({
      ...prev,
      path,
      currentStep: 2,
      answers: { ...prev.answers, path },
    }));
  };

  const getCurrentQuestions = (): Question[] => {
    if (!quizState.path) return [];
    
    const questions = quizState.path === 'work' ? workQuestions : businessQuestions;
    return questions.filter(q => !q.condition || q.condition(quizState.answers));
  };

  const handleAnswer = (questionId: string, value: string) => {
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
    }));
  };

  const handleNext = () => {
    const currentQuestions = getCurrentQuestions();
    const isLastQuestion = quizState.currentStep - 2 >= currentQuestions.length - 1;
    
    if (isLastQuestion) {
      // Move to contact form
      setQuizState(prev => ({ ...prev, currentStep: 100 }));
    } else {
      setQuizState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const handleBack = () => {
    if (quizState.currentStep === 100) {
      // From contact form back to last question
      const currentQuestions = getCurrentQuestions();
      setQuizState(prev => ({ ...prev, currentStep: currentQuestions.length + 1 }));
    } else if (quizState.currentStep === 2) {
      // From first question back to path selection
      setQuizState(prev => ({ ...prev, currentStep: 1 }));
    } else {
      setQuizState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handleContactUpdate = (info: { phone: string; email: string; name: string }) => {
    setQuizState(prev => ({ ...prev, contactInfo: info }));
  };

  const handleContactSubmit = () => {
    const questions = quizState.path === 'work' ? workQuestions : businessQuestions;
    const score = calculateScore(quizState.answers, questions);
    const visas = getRecommendedVisas(quizState.path!, quizState.answers);
    
    // Send data to Make.com webhook
    const webhookData = {
      contactInfo: quizState.contactInfo,
      answers: quizState.answers,
      score,
      visas,
      path: quizState.path!
    };
    
    // Debug: Log the data being sent to Make.com
    console.log('Sending quiz data to Make.com:', JSON.stringify(webhookData, null, 2));
    
    // Send data to Make.com webhook
    fetch('https://hook.us2.make.com/ngsaf6xny31vpii27pddxxcqjc8vyts7', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData)
    }).catch(error => {
      console.error('Failed to send to Make.com:', error);
      // Continue with showing results even if webhook fails
    });
    
    setQuizState(prev => ({
      ...prev,
      score,
      visas,
      completed: true,
      currentStep: 200,
    }));
  };

  // Render welcome screen
  if (quizState.currentStep === 0) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  // Render results screen
  if (quizState.completed) {
    return (
      <ResultsScreen
        score={quizState.score}
        visas={quizState.visas}
        contactInfo={quizState.contactInfo}
      />
    );
  }

  // Render contact form
  if (quizState.currentStep === 100) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="quiz-card">
          <ContactForm
            contactInfo={quizState.contactInfo}
            onUpdate={handleContactUpdate}
            onSubmit={handleContactSubmit}
            onBack={handleBack}
          />
        </div>
      </div>
    );
  }

  // Render path selection
  if (quizState.currentStep === 1) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="quiz-card animate-slide-in">
          <ProgressBar current={1} total={getCurrentQuestions().length + 2} />
          
          <h2 className="text-xl font-semibold mb-8 text-primary">
            Какова ваша основная цель?
          </h2>
          
          <div className="space-y-4 mb-8">
            <button
              onClick={() => handlePathSelection('work')}
              className="btn-option w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white text-primary font-medium"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <span>Работа по найму</span>
              </div>
            </button>
            
            <button
              onClick={() => handlePathSelection('business')}
              className="btn-option w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white text-primary font-medium"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Rocket className="w-6 h-6 text-purple-600" />
                </div>
                <span>Развитие бизнеса</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render quiz questions
  const currentQuestions = getCurrentQuestions();
  const questionIndex = quizState.currentStep - 2;
  const currentQuestion = currentQuestions[questionIndex];

  if (!currentQuestion) return null;

  const totalSteps = currentQuestions.length + 2; // +2 for path selection and contact form

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="quiz-card">
        <ProgressBar current={quizState.currentStep} total={totalSteps} />
        
        <QuizQuestion
          question={currentQuestion}
          selectedAnswer={quizState.answers[currentQuestion.id] || null}
          onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={quizState.currentStep > 1}
        />
      </div>
    </div>
  );
};

export default App;