import React from 'react';
import { HiOutlineClock, HiOutlineCheckCircle } from 'react-icons/hi2';
import { historyData } from '../../RekapMonitoring/data';

const RiwayatMonitoringTimeline: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-5 md:p-6">
      <div className="flex items-center gap-2 mb-6">
        <HiOutlineClock className="w-5 h-5 text-gray-800" />
        <h2 className="font-bold text-gray-800">Riwayat Monitoring Terbaru (Global)</h2>
      </div>
      
      <div className="flex flex-col gap-4">
        {historyData.map((item) => (
          <div key={item.id} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#185325]/30 hover:bg-emerald-50/20 transition-all cursor-pointer">
            <div className="mt-1">
              <HiOutlineCheckCircle className={`w-6 h-6 ${item.status === 'Verified' ? 'text-[#185325]' : 'text-orange-500'}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-800">{item.title}</h3>
              <p className="text-xs font-medium text-gray-500 mt-1">{item.desc}</p>
            </div>
            <div>
              <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                item.status === 'Verified' ? 'bg-[#D5F0DE] text-[#185325]' : 'bg-orange-100 text-orange-700'
              }`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiwayatMonitoringTimeline;