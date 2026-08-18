import React from 'react';
import { HiOutlineArrowPath } from 'react-icons/hi2';
import SummaryCards from './components/SummaryCards';
import MapMockup from './components/MapMockup';
import DonutChart from './components/DonutChart';
import BarChart from './components/BarChart';
import TableRealisasi from './components/TableRealisasi';
import TableBerjalan from './components/TableBerjalant';

const DashboardMonitoring: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#f8faf9] font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#1e293b] mb-2">Dashboard Pelaksanaan dan Monitoring</h2>
          <p className="text-sm text-gray-500">Ringkasan pelaksanaan Program Rehabilitasi DAS & Lahan.</p>
        </div>
        <div className="flex flex-col items-end pt-2">
          <p className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
            Data terakhir diperbarui: 11 Mei 2025 10:42 WIB 
            <HiOutlineArrowPath className="w-4 h-4 cursor-pointer hover:text-gray-700 transition-colors" />
          </p>
        </div>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <MapMockup />
        <DonutChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BarChart />
        <TableRealisasi />
      </div>

      <TableBerjalan />
      
    </div>
  );
}

export default DashboardMonitoring;