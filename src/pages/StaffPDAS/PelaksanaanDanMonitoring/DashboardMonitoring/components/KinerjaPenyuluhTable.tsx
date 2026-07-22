import React from 'react';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import MiniProgressBar from './MiniProgressBar';
import { performanceData } from '../../RekapMonitoring/data';

const KinerjaPenyuluhTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-5 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <HiOutlineUserGroup className="w-5 h-5 text-gray-800" />
        <h2 className="font-bold text-gray-800">Rekap Kinerja Penyuluh / Pelaksana</h2>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm text-left min-w-175">
          <thead className="text-[#3A4D3F] bg-[#DCECE0]">
            <tr>
              <th className="px-5 py-3.5 font-bold rounded-tl-lg whitespace-nowrap">Nama Pelaksana</th>
              <th className="px-5 py-3.5 font-bold whitespace-nowrap">Area Cakupan</th>
              <th className="px-5 py-3.5 font-bold whitespace-nowrap">Program Kegiatan</th>
              <th className="px-5 py-3.5 font-bold text-center whitespace-nowrap">Laporan Masuk</th>
              <th className="px-5 py-3.5 font-bold rounded-tr-lg whitespace-nowrap">Rata-rata</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-b border-gray-100">
            {performanceData.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">{item.nama}</td>
                <td className="px-5 py-4 font-medium text-gray-600 whitespace-nowrap">{item.area}</td>
                <td className="px-5 py-4 font-medium text-gray-600 whitespace-nowrap">{item.program}</td>
                <td className="px-5 py-4 text-center font-bold text-gray-800">{item.laporan}</td>
                <td className="px-5 py-4 min-w-30"><MiniProgressBar progress={item.avg} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KinerjaPenyuluhTable;