import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm mb-3 text-secondary">
        <span className="font-medium">Прогресс</span>
        <span>{current} из {total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full progress-fill"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: '#3b82f6',
            '--progress-width': `${percentage}%`
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
};

export default ProgressBar;