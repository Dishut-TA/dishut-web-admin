import React from 'react';

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorTheme: 'blue' | 'green' | 'orange' | 'red';
}

const DashboardStatCard: React.FC<DashboardStatCardProps> = ({ title, value, icon, colorTheme }) => {
  const themeStyles = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-5 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
      <div className={`p-3.5 rounded-xl ${themeStyles[colorTheme]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default DashboardStatCard;