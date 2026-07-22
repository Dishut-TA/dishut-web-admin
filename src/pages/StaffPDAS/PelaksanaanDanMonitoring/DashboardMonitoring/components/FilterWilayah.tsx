import React from 'react';
import { HiOutlineFunnel } from 'react-icons/hi2';

const FilterWilayah: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-5 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <HiOutlineFunnel className="w-5 h-5 text-gray-800" />
        <h2 className="font-bold text-gray-800">Filter Wilayah Rekapitulasi</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['CDK Wilayah', 'Kota/Kabupaten', 'Kecamatan', 'Desa/Kelurahan'].map((label) => (
          <div key={label} className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-500">{label}</label>
            <select className="w-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] cursor-pointer">
              <option>Semua</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterWilayah;