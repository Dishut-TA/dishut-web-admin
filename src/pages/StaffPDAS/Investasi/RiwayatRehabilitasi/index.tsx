import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineAdjustmentsHorizontal,
  HiOutlineEye
} from 'react-icons/hi2';

const mockData = [
  {
    id: 'CSR-001',
    nama: 'Rehabilitasi Citarum',
    pendanaan: 'CSR',
    mitra: 'PT. Alfamart',
    anggaran: 80000000,
    status: 'Selesai'
  },
  {
    id: 'CSR-002',
    nama: 'Rehabilitasi Citarum',
    pendanaan: 'CSR',
    mitra: 'PT. Alfamart',
    anggaran: 80000000,
    status: 'Dihentikan'
  },
  {
    id: 'APBD-001',
    nama: 'Rehabilitasi Citarum',
    pendanaan: 'APBD',
    mitra: 'Dinas Kehutanan Jabar',
    anggaran: 80000000,
    status: 'Sedang Berjalan'
  }
];

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
};

const RiwayatRehabilitasiSTAFF: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Selesai':
        return 'text-[#2E7D32]';
      case 'Sedang Berjalan':
        return 'text-orange-500';
      case 'Dihentikan':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Riwayat Program Rehabilitasi
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari Program.." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#185325] focus:border-[#185325] outline-none transition-all shadow-sm" 
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-transparent text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-semibold transition-colors border border-gray-300 shadow-sm">
            <HiOutlineAdjustmentsHorizontal className="w-5 h-5" /> Filter
          </button>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Nama Program</th>
                <th className="px-6 py-4">Pendanaan</th>
                <th className="px-6 py-4">Mitra</th>
                <th className="px-6 py-4">Anggaran</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {mockData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">{item.id}</td>
                  <td className="px-6 py-4 text-gray-700">{item.nama}</td>
                  <td className="px-6 py-4 text-gray-700">{item.pendanaan}</td>
                  <td className="px-6 py-4 text-gray-700">{item.mitra}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{formatRupiah(item.anggaran)}</td>
                  <td className="px-6 py-4 text-center font-bold">
                    <span className={getStatusStyle(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center items-center">
                    <button 
                      onClick={() => navigate(`/admin/staff/rehabilitasi/riwayat-rehabilitasi/detail/${item.id}`)}
                      className="text-gray-500 hover:text-[#185325] p-1.5 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      <HiOutlineEye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default RiwayatRehabilitasiSTAFF;