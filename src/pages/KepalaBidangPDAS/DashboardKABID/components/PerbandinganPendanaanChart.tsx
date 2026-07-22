import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell
} from 'recharts';

const data = [
  { name: 'APBD', value: 900, fill: '#86efac' }, // Light Green
  { name: 'CSR', value: 550, fill: '#85643a' },  // Brown
];

const formatYAxis = (tickItem: number) => {
  if (tickItem >= 1000) return `${tickItem / 1000} M`;
  return `${tickItem} Jt`;
};

const renderCustomBarLabel = ({ x, y, width, value }: any) => {
  return (
    <text x={x + width / 2} y={y - 10} fill="#334155" textAnchor="middle" fontSize={12} fontWeight="bold">
      Rp {value >= 1000 ? `${value / 1000} M` : `${value}Jt`}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-xl">
        <p className="font-bold text-slate-700 mb-1">Sumber: {label}</p>
        <p className="text-sm font-semibold text-slate-600">
          Total: Rp {payload[0].value >= 1000 ? `${(payload[0].value / 1000).toFixed(2)} M` : `${payload[0].value} Jt`}
        </p>
      </div>
    );
  }
  return null;
};

const PerbandinganPendanaanChart: React.FC = () => {
  const [year, setYear] = useState('2025');

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Perbandingan Sumber Pendanaan Rehabilitasi</h2>
          <p className="text-sm text-slate-500 mt-1">Perbandingan total pendanaan rehabilitasi berdasarkan sumber dana</p>
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
        <div className="w-full lg:w-2/3 h-62.5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }} barSize={60}>
              <XAxis dataKey="name" axisLine={true} tickLine={false} tick={{ fontSize: 13, fontWeight: 500, fill: '#64748b' }} dy={10} />
              <YAxis 
                axisLine={true} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#64748b' }} 
                tickFormatter={formatYAxis}
                domain={[0, 2000]}
                ticks={[100, 300, 500, 700, 900, 2000]}
              />
              <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList dataKey="value" content={renderCustomBarLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="text-xs font-bold text-slate-700">APBD</span>
                </div>
                <p className="text-base font-bold text-slate-800">Rp 900 Jt</p>
              </div>
              <span className="text-sm font-bold text-secondary">62%</span>
            </div>
            
            <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                  <span className="text-xs font-bold text-slate-700">CSR</span>
                </div>
                <p className="text-base font-bold text-slate-800">Rp 550 Jt</p>
              </div>
              <span className="text-sm font-bold text-secondary">38%</span>
            </div>
          </div>

          <div className="bg-[#dcfce7] p-4 rounded-xl border border-emerald-100 flex justify-between items-center">
            <span className="text-sm font-semibold text-primary">Total Pendanaan</span>
            <span className="text-lg font-black text-primary">Rp 1,45 M</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerbandinganPendanaanChart;