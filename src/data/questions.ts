import { Question } from '../types/quiz';

export const workQuestions: Question[] = [
  {
    id: 'education',
    text: 'Какой у вас уровень образования?',
    options: [
      { value: 'higher', text: 'Высшее (бакалавр, магистр, PhD)', points: 25 },
      { value: 'professional', text: 'Среднее профессиональное', points: 10 },
    ],
  },
  {
    id: 'job_offer',
    text: 'Есть ли у вас подтвержденное предложение работы от работодателя в США?',
    options: [
      { value: 'yes', text: 'Да', points: 25 },
      { value: 'no', text: 'Нет', points: 0 },
    ],
  },
  {
    id: 'experience',
    text: 'Каков ваш опыт работы в данной сфере?',
    options: [
      { value: 'more_5', text: 'Более 5 лет', points: 25 },
      { value: 'less_5', text: 'Менее 5 лет', points: 0 },
    ],
  },
  {
    id: 'awards',
    text: 'Обладали ли вы наградами, премиями или международным признанием за вашу профессиональную деятельность?',
    options: [
      { value: 'yes', text: 'Да', points: 15 },
      { value: 'no', text: 'Нет', points: 0 },
    ],
  },
];

export const businessQuestions: Question[] = [
  {
    id: 'investment_plan',
    text: 'Планируете ли вы инвестировать в бизнес в США?',
    options: [
      { value: 'yes', text: 'Да', points: 22.5 },
      { value: 'no', text: 'Нет', points: 0 },
    ],
  },
  {
    id: 'investment_amount',
    text: 'Какая сумма доступна для инвестиций?',
    options: [
      { value: 'less_100k', text: 'Менее $100,000', points: 0 },
      { value: '100k_500k', text: 'От $100,000 до $500,000', points: 15 },
      { value: 'more_500k', text: 'Более $500,000', points: 22.5 },
    ],
    condition: (answers) => answers.investment_plan === 'yes',
  },
  {
    id: 'existing_business',
    text: 'Есть ли у вас уже существующий бизнес за пределами США?',
    options: [
      { value: 'yes_more_year', text: 'Да, с более чем годом работы', points: 50 },
      { value: 'yes_less_year', text: 'Да, менее 1 года', points: 10 },
      { value: 'no', text: 'Нет', points: 0 },
    ],
  },
  {
    id: 'management_role',
    text: 'Вы занимаете руководящую должность в вашем бизнесе?',
    options: [
      { value: 'yes', text: 'Да', points: 0 },
      { value: 'no', text: 'Нет', points: 0 },
    ],
    condition: (answers) => answers.existing_business !== 'no',
  },
];