import React from 'react';
import { HiOutlineTableCells } from 'react-icons/hi2';
import MiniProgressBar from './MiniProgressBar';
import { aggregateData } from '../../RekapMonitoring/data';

const DetailAgregatTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-5 md:p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <HiOutlineTableCells className="w-5 h-5 text-gray-800" />
        <h2 className="font-bold text-gray-800">Detail Agregat Wilayah</h2>
      </div>
      <div className="overflow-x-auto flex-1 custom-scrollbar">
        <table className="w-full text-sm text-left">
          <thead className="text-[#3A4D3F] bg-[#DCECE0]">
            <tr>
              <th className="px-4 py-3 font-bold rounded-tl-lg whitespace-nowrap">Wilayah</th>
              <th className="px-4 py-3 font-bold text-center whitespace-nowrap">Total Laporan</th>
              <th className="px-4 py-3 font-bold rounded-tr-lg whitespace-nowrap">AVG Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-b border-gray-100">
            {aggregateData.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5 font-bold text-gray-700 whitespace-nowrap">{item.wilayah}</td>
                <td className="px-4 py-3.5 text-center font-bold text-gray-800">{item.total}</td>
                <td className="px-4 py-3.5"><MiniProgressBar progress={item.avg} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailAgregatTable;