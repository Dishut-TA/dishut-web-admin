import React from 'react';

interface MiniProgressBarProps {
  progress: number;
}

const MiniProgressBar: React.FC<MiniProgressBarProps> = ({ progress }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-gray-700 w-8">{progress}%</span>
      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden shrink-0">
        <div 
          className="h-full bg-[#185325] rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MiniProgressBar;