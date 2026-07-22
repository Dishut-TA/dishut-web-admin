import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Jan', value: 200 },
  { month: 'Feb', value: 400 },
  { month: 'Mar', value: 550 },
  { month: 'Apr', value: 680 },
  { month: 'Mei', value: 780 },
  { month: 'Jun', value: 950 },
  { month: 'Juli', value: 920 },
  { month: 'Ags', value: 900 },
  { month: 'Sep', value: 880 },
  { month: 'Okt', value: 850 },
  { month: 'Nov', value: 930 },
  { month: 'Des', value: 940 },
];

const formatYAxis = (tickItem: number) => {
  if (tickItem >= 1000) return `${tickItem / 1000} M`;
  return `${tickItem} Jt`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-xl">
        <p className="font-bold text-slate-700 mb-1">{label}</p>
        <p className="text-sm font-semibold text-[#0ea5e9]">
          Donasi: {payload[0].value >= 1000 ? `${(payload[0].value / 1000).toFixed(2)} M` : `${payload[0].value} Jt`}
        </p>
      </div>
    );
  }
  return null;
};

const TrendDonasiChart: React.FC = () => {
  const [year, setYear] = useState('2025');

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Tren Donasi Terkumpul</h2>
          <p className="text-sm text-slate-500 mt-1">Perkembangan dana donasi yang terkumpul setiap bulan</p>
        </div>
        <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5">
          <span className="text-sm font-medium text-slate-600">Tahun:</span>
          <select 
            value={year} 
            onChange={(e) => setYear(e.target.value)}
            className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-end">
        <div className="w-full h-75 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#64748b' }} 
                tickFormatter={formatYAxis}
                domain={[0, 2000]}
                ticks={[100, 300, 500, 700, 900, 2000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ r: 4, stroke: '#0ea5e9', strokeWidth: 2, fill: '#ffffff' }}
                activeDot={{ r: 6, fill: '#0ea5e9', stroke: '#ffffff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-62.5 bg-[#dcfce7] p-5 rounded-2xl shrink-0">
          <p className="text-sm font-semibold text-[#166534] mb-1">Total Donasi Terkumpul<br/>Tahun {year}</p>
          <p className="text-2xl font-bold text-[#14532d] mt-2">Rp 3,45 M</p>
        </div>
      </div>
    </div>
  );
};

export default TrendDonasiChart;