import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Phone, Mail, User } from 'lucide-react';
import { ValidationError } from '../types/quiz';
import { validateContactForm } from '../utils/validation';

interface ContactFormProps {
  contactInfo: {
    phone: string;
    email: string;
    name: string;
  };
  onUpdate: (info: { phone: string; email: string; name: string }) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  contactInfo,
  onUpdate,
  onSubmit,
  onBack,
}) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm(contactInfo);
    
    if (validationErrors.length === 0) {
      onSubmit();
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    onUpdate({ ...contactInfo, [field]: value });
    // Clear specific field error when user starts typing
    setErrors(errors.filter(error => error.field !== field));
  };

  const getFieldError = (field: string) => {
    return errors.find(error => error.field === field)?.message;
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Контактная информация
        </h2>
        <p className="mb-8 text-secondary">
          Заполните форму, чтобы получить результат теста
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3 text-primary">
              <Phone className="w-4 h-4" />
              Номер телефона
            </label>
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+7 (999) 123-45-67"
              className={`form-input ${getFieldError('phone') ? 'error' : ''}`}
            />
            {getFieldError('phone') && (
              <p className="text-red-500 text-sm mt-2">{getFieldError('phone')}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3 text-primary">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="example@email.com"
              className={`form-input ${getFieldError('email') ? 'error' : ''}`}
            />
            {getFieldError('email') && (
              <p className="text-red-500 text-sm mt-2">{getFieldError('email')}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3 text-primary">
              <User className="w-4 h-4" />
              Фамилия и Имя
            </label>
            <input
              type="text"
              value={contactInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Иванов Иван"
              className={`form-input ${getFieldError('name') ? 'error' : ''}`}
            />
            {getFieldError('name') && (
              <p className="text-red-500 text-sm mt-2">{getFieldError('name')}</p>
            )}
          </div>
        </form>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-secondary hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </button>
        
        <button
          onClick={handleSubmit}
          className="btn-primary px-8 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          Получить результат
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ContactForm;