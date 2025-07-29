import { ValidationError } from '../types/quiz';

export const validateContactForm = (contactInfo: { phone: string; email: string; name: string }): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Phone validation
  if (!contactInfo.phone) {
    errors.push({ field: 'phone', message: 'Номер телефона обязателен' });
  } else if (!contactInfo.phone.startsWith('+')) {
    errors.push({ field: 'phone', message: 'Номер должен начинаться с +' });
  } else if (!/^\+[1-9]\d{1,14}$/.test(contactInfo.phone)) {
    errors.push({ field: 'phone', message: 'Неверный формат номера телефона' });
  }

  // Email validation
  if (!contactInfo.email) {
    errors.push({ field: 'email', message: 'Email обязателен' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
    errors.push({ field: 'email', message: 'Неверный формат email' });
  }

  // Name validation
  if (!contactInfo.name) {
    errors.push({ field: 'name', message: 'Фамилия и Имя обязательны' });
  } else if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(contactInfo.name)) {
    errors.push({ field: 'name', message: 'Имя должно содержать только буквы' });
  }

  return errors;
};