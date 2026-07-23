import React from 'react';
import SummaryCard from './components/SummaryCard'; 
import GrowthChart from './components/GrowthChart'; 

const DashboardProgramKabid: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">Dashboard Realisasi Bibit dan Donasi</h1>
        <p className="text-sm md:text-base text-slate-500">Ringkasan performa dan laporan realisasi penghijauan.</p>
      </div>

      {/* Grid diubah menjadi 2 kolom agar dua card tampil proporsional dan penuh */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <SummaryCard 
          title="Total Donasi Diterima" 
          value="Rp 10.375.000" 
          subtext="+15% dari bulan lalu" 
        />
        <SummaryCard 
          title="Total Bibit Terealisasi" 
          value="1.250" 
          subtext="Pohon Ditanam" 
        />
      </div>

      <GrowthChart />

    </div>
  );
}

export default DashboardProgramKabid;