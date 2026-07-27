import React from 'react';
import { HiOutlineClock } from 'react-icons/hi2';
import MonitoringMainTable from './components/MonitoringMainTable';
import MonitoringSidebar from './components/MonitoringSidebar';
import MonitoringStatCards from './components/MonitoringStatCard';

const MonitoringProgram: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Monitoring Program</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau dan kelola kegiatan rehabilitasi yang telah selesai dan siap untuk dimonitoring.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer shrink-0">
          <HiOutlineClock className="w-5 h-5" /> Riwayat Monitoring
        </button>
      </div>

      <MonitoringStatCards />

      <div className="flex flex-col xl:flex-row gap-6 items-start w-full">
        <MonitoringMainTable />
        <MonitoringSidebar />
      </div>

    </div>
  );
};

export default MonitoringProgram;