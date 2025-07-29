export const getRecommendedVisas = (path: 'work' | 'business', answers: Record<string, string>): string[] => {
  const visas: string[] = [];

  if (path === 'work') {
    // H-1B — если есть высшее образование и job offer
    if (answers.education === 'higher' && answers.job_offer === 'yes') {
      visas.push('H-1B');
    }

    // O-1 — если были награды
    if (answers.awards === 'yes') {
      visas.push('O-1');
    }

    // EB-2 NIW — если высшее + 5+ лет опыта
    if (answers.education === 'higher' && answers.experience === 'more_5') {
      visas.push('EB-2 NIW');
    }

    // EB-3 — если среднее образование + job offer
    if (answers.education === 'professional' && answers.job_offer === 'yes') {
      visas.push('EB-3');
    }
  } else if (path === 'business') {
    // E-2 — если инвестиции от $100k
    if (answers.investment_amount === '100k_500k' || answers.investment_amount === 'more_500k') {
      visas.push('E-2');
    }

    // L-1A — если бизнесу более 1 года + управляющий
    if (answers.existing_business === 'yes_more_year' && answers.management_role === 'yes') {
      visas.push('L-1A');
    }

    // EB-5 — если инвестиции > $500k
    if (answers.investment_amount === 'more_500k') {
      visas.push('EB-5');
    }
  }

  return visas.length > 0 ? visas : ['Нету подходящих виз'];
};

export const calculateScore = (answers: Record<string, string>, questions: any[]): number => {
  let totalPoints = 0;
  
  for (const question of questions) {
    const answer = answers[question.id];
    if (answer) {
      const option = question.options.find((opt: any) => opt.value === answer);
      if (option) {
        totalPoints += option.points;
      }
    }
  }
  
  // Cap at 90%
  return Math.min(totalPoints, 90);
};