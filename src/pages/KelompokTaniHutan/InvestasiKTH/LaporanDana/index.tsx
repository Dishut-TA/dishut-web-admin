import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlineEye, HiOutlinePencilSquare, HiPlus } from 'react-icons/hi2';

type StatusLaporan = 'Disetujui' | 'Diperiksa' | 'Perbaikan';

interface LaporanDanaData {
  id: string;
  namaProyek: string;
  periode: string;
  totalKeluar: number;
  status: StatusLaporan;
}

const mockData: LaporanDanaData[] = [
  { id: 'CSR-001', namaProyek: 'Rehabilitasi Citarum', periode: 'Tahap 1', totalKeluar: 10000000, status: 'Disetujui' },
  { id: 'CSR-001', namaProyek: 'Rehabilitasi Citarum', periode: 'Tahap 1', totalKeluar: 10000000, status: 'Diperiksa' },
  { id: 'CSR-001', namaProyek: 'Rehabilitasi Citarum', periode: 'Tahap 1', totalKeluar: 10000000, status: 'Perbaikan' },
];

const LaporanDanaIndex: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<LaporanDanaData[]>(mockData);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  const renderStatusBadge = (status: StatusLaporan) => {
    switch (status) {
      case 'Disetujui':
        return <span className="px-4 py-1.5 bg-[#DCECE0] text-[#185325] rounded-full text-[11px] font-bold">Disetujui</span>;
      case 'Diperiksa':
        return <span className="px-4 py-1.5 bg-[#FDE68A] text-yellow-800 rounded-full text-[11px] font-bold">Diperiksa</span>;
      case 'Perbaikan':
        return <span className="px-4 py-1.5 bg-red-200 text-red-800 rounded-full text-[11px] font-bold">Perbaikan</span>;
      default:
        return <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[11px] font-bold">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Laporan Dana</h1>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari proyek..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#185325]"
            />
          </div>
          <button 
            onClick={() => navigate('/admin/kth/rehabilitasi/laporan-dana/create')}
            className="flex items-center gap-2 px-5 py-2 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap"
          >
            <HiPlus className="w-4 h-4" strokeWidth={2.5} /> Buat Laporan
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-200">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">ID</th>
                <th className="px-6 py-4 whitespace-nowrap">Nama Proyek</th>
                <th className="px-6 py-4 whitespace-nowrap">Periode</th>
                <th className="px-6 py-4 whitespace-nowrap">Total Keluar</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{item.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{item.namaProyek}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.periode}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{formatRupiah(item.totalKeluar)}</td>
                  <td className="px-6 py-4 text-center">{renderStatusBadge(item.status)}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    {item.status === 'Perbaikan' ? (
                      <button 
                        title="Revisi Laporan"
                        className="p-1.5 text-gray-500 hover:text-[#185325] hover:bg-[#DCECE0] rounded-full transition-colors"
                      >
                        <HiOutlinePencilSquare className="w-5 h-5" />
                      </button>
                    ) : (
                      <button 
                        title="Lihat Detail"
                        onClick={() => navigate(`/admin/kth/rehabilitasi/laporan-dana/detail/${item.id}`)}
                        className="p-1.5 text-gray-500 hover:text-[#185325] hover:bg-[#DCECE0] rounded-full transition-colors"
                      >
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                    )}
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

export default LaporanDanaIndex;