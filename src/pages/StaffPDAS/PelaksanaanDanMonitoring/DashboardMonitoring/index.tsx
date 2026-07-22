import React from 'react';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineCheckCircle,
  HiOutlinePresentationChartLine,
  HiOutlineExclamationCircle,
  HiOutlineClock,
  HiOutlineDocumentArrowDown,
  HiOutlineMapPin,
  HiOutlineUserGroup
} from 'react-icons/hi2';
import DashboardStatCard from './components/DashboardStatCard';
import FilterWilayah from './components/FilterWilayah';
import SebaranKegiatanChart from './components/SebaranKegiatanChart';
import DetailAgregatTable from './components/DetailAgregatTabel';
import KinerjaPenyuluhTable from './components/KinerjaPenyuluhTable';
import RiwayatMonitoringTimeline from './components/RiwayatMonitoringTimeline';
import { PiPlant } from 'react-icons/pi';

const DashboardMonitoring: React.FC = () => {
  const statsData = [
    {
      title: 'Jumlah Kegiatan',
      value: '6',
      colorTheme: 'blue' as const,
      icon: <HiOutlineClipboardDocumentList className="w-6 h-6" />
    },
    {
      title: 'Kegiatan Selesai',
      value: '1',
      colorTheme: 'green' as const,
      icon: <HiOutlineCheckCircle className="w-6 h-6" />
    },
    {
      title: 'Kegiatan Berjalan',
      value: '4',
      colorTheme: 'orange' as const,
      icon: <HiOutlinePresentationChartLine className="w-6 h-6" />
    },
    {
      title: 'Kegiatan Bermasalah',
      value: '1',
      colorTheme: 'red' as const,
      icon: <HiOutlineExclamationCircle className="w-6 h-6" />
    },
    {
      title: 'Total Laporan',
      value: '3',
      colorTheme: 'red' as const,
      icon: <HiOutlineExclamationCircle className="w-6 h-6" />
    },
    {
      title: 'Penyuluh Aktif',
      value: '5',
      colorTheme: 'blue' as const,
      icon: <HiOutlineUserGroup className="w-6 h-6" />
    },
    {
      title: 'Total Wilayah (CDK)',
      value: '3',
      colorTheme: 'green' as const,
      icon: <HiOutlineMapPin className="w-6 h-6" />
    },
    {
      title: 'Total Bibit Ditanam',
      value: '3.000',
      colorTheme: 'green' as const,
      icon: <PiPlant className="w-6 h-6" />
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-350 mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Dashboard Monitoring
          </h1>
          <p className="text-gray-500 text-sm">
            Ringkasan status kegiatan monitoring berbasis bukti
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] text-sm font-medium text-gray-600 whitespace-nowrap">
            <HiOutlineClock className="w-4 h-4 text-gray-400" />
            <span>Update terakhir: 28 April 2026</span>
          </div>
          <button className="bg-[#185325] hover:bg-[#123d1c] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-sm">
            <HiOutlineDocumentArrowDown className="w-5 h-5" />
            Ekspor Rekap
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsData.map((stat, index) => (
          <DashboardStatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            colorTheme={stat.colorTheme}
          />
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Peta Sebaran Kegiatan</h2>
          <p className="text-sm text-gray-500 font-medium">Visualisasi lokasi kegiatan berdasarkan koordinat laporan</p>
        </div>
        
        <div className="relative w-full h-100 md:h-125 lg:h-150 bg-[#EBF3FA]">
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-4 z-10 flex flex-col gap-3 text-xs font-bold text-gray-700">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-green-500 shadow-inner"></span> Berjalan
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-orange-400 shadow-inner"></span> Selesai
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-red-500 shadow-inner"></span> Bermasalah
            </div>
          </div>

          <div className="w-full h-full flex items-center justify-center">
             <span className="text-gray-400 font-bold text-sm border-2 border-dashed border-gray-300 px-6 py-3 rounded-xl">
               [Integrasi Komponen Peta GIS di Sini]
             </span>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 my-2" />

      <FilterWilayah />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SebaranKegiatanChart />
        <DetailAgregatTable />
      </div>

      <KinerjaPenyuluhTable />
      <RiwayatMonitoringTimeline />

    </div>
  );
}

export default DashboardMonitoring;