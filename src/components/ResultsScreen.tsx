import React from 'react';
import { CheckCircle, Phone, Mail, User, ExternalLink } from 'lucide-react';

interface ResultsScreenProps {
  score: number;
  visas: string[];
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, visas, contactInfo }) => {
  const isEligible = score > 50;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="quiz-card animate-slide-in text-center max-w-lg">
        {/* Score Display */}
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
              isEligible ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              <CheckCircle className={`w-10 h-10 ${
                isEligible ? 'text-green-600' : 'text-yellow-600'
              }`} />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-4 text-primary">
            Ваш результат
          </h1>
          
          <div className="bg-blue-500 text-white rounded-2xl p-6 mb-6">
            <div className="text-4xl font-bold mb-2">
              {score}%
            </div>
            <div className="text-lg">
              Ваши шансы на получение визы
            </div>
          </div>
        </div>

        {/* Visa Recommendations */}
        <div className="mb-8 text-left">
          <h2 className="text-lg font-semibold mb-4 text-primary">
            Рекомендуемые типы виз:
          </h2>
          
          {visas.includes('Нету подходящих виз') ? (
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-gray-600 mb-2">
                😔 Нету подходящих виз
              </div>
              <div className="text-sm text-gray-500">
                Но не расстраивайтесь! Наши специалисты помогут найти альтернативные варианты.
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {visas.map((visa, index) => (
                <div key={index} className="bg-highlight rounded-xl p-4 border border-yellow-200">
                  <div className="font-semibold text-primary">
                    {visa}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Confirmation */}
        <div className="bg-blue-50 rounded-xl p-4 mb-8 text-left">
          <div className="text-sm text-secondary">
            <div className="font-semibold mb-3 text-primary">Ваши контактные данные:</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {contactInfo.name}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {contactInfo.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {contactInfo.email}
              </div>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="bg-secondary text-white rounded-2xl p-6">
          <div className="text-3xl mb-4">🎉</div>
          <div className="font-semibold mb-4 text-lg">
            Спасибо за ваши ответы!
          </div>
          <div className="text-sm mb-4 opacity-90">
            📞 Мы свяжемся с вами в ближайшее время, чтобы сообщить, какая виза вам больше подходит.
          </div>
          <div className="text-sm mb-6 opacity-90">
            🎁 А пока присоединяйтесь к нашей группе:
          </div>
          <a
            href="https://t.me/NMD_consulting_com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-secondary px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Telegram
            <ExternalLink className="w-4 h-4" />
          </a>
          <div className="text-sm mt-4 opacity-90">
            💼 Получите скидку $50 на консультацию с адвокатом!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;