import React, { useState } from 'react';
import type { SummaryStats, CPIDataRow } from './types';
import DashboardHeader from './components/DashboardHeader';
import SummaryCards from './components/SummaryCards';
import MapSection from './components/MapSection';
import CPITable from './components/CPITable';

const DashboardCPISTAFF: React.FC = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false); 
  const [periode, setPeriode] = useState<string>('2021-2026');

  const mockStats: SummaryStats = {
    totalLuas: '281.500 Ha',
    totalKritis: '22,000 Ha',
    totalSangatKritis: '18,600 Ha',
    totalWilayahPrioritas: 58,
    luasWilayahPrioritas: '18.600 Ha',
    analisisTerakhir: '1 Januari 2021',
  };

  const mockTableData: CPIDataRow[] = [
    {
      id: '1',
      kabupaten: 'Kota Bandung',
      kecamatan: 'Coblong',
      desa: 'Sekeloa',
      statusLahan: 'Kritis',
      skorCPI: '3-5',
      rekomendasi: 'Agroforestry',
      statusVerifikasi: '-',
    },
    {
      id: '2',
      kabupaten: 'Kota Bandung',
      kecamatan: 'Coblong',
      desa: 'Dago', 
      statusLahan: 'Sangat Kritis',
      skorCPI: '1-5',
      rekomendasi: 'Agroforestry',
      statusVerifikasi: 'Lunak',
    }
  ];

  const handleApprove = (id: string) => {
    console.log('Approved row:', id);
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto animate-in fade-in duration-500">
      <DashboardHeader 
        isVerified={isVerified} 
        periode={periode} 
        setPeriode={setPeriode} 
      />
      
      <SummaryCards stats={mockStats} />
      
      <MapSection />
      
      <CPITable 
        data={mockTableData} 
        isVerified={isVerified} 
        onApprove={handleApprove} 
      />

      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsVerified(!isVerified)}
          className="bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg opacity-50 hover:opacity-100 transition-opacity"
        >
          Toggle Status Verifikasi (Dev Only)
        </button>
      </div>
    </div>
  );
};

export default DashboardCPISTAFF;