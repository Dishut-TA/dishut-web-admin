import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlineEye, HiOutlineAdjustmentsHorizontal, HiPlus } from 'react-icons/hi2';

type StatusLaporan = 'Menunggu Verifikasi' | 'Revisi' | 'Terverifikasi';

interface LaporanDanaData {
  id: string;
  namaProgram: string;
  tahap: string;
  sumberDana: string;
  danaDisalurkan: number;
  danaDirealisasikan: number;
  status: StatusLaporan;
}

const mockData: LaporanDanaData[] = [
  { id: 'CSR-001', namaProgram: 'Rehabilitasi Citarum', tahap: 'Tahap 1', sumberDana: 'CSR', danaDisalurkan: 100000000, danaDirealisasikan: 20000000, status: 'Menunggu Verifikasi' },
  { id: 'CSR-001', namaProgram: 'Rehabilitasi Citarum', tahap: 'Tahap 1', sumberDana: 'CSR', danaDisalurkan: 100000000, danaDirealisasikan: 20000000, status: 'Revisi' },
  { id: 'CSR-001', namaProgram: 'Rehabilitasi Citarum', tahap: 'Tahap 1', sumberDana: 'CSR', danaDisalurkan: 100000000, danaDirealisasikan: 20000000, status: 'Terverifikasi' },
  { id: 'APBD-001', namaProgram: 'Rehabilitasi Citarum', tahap: 'Tahap 1', sumberDana: 'APBD', danaDisalurkan: 100000000, danaDirealisasikan: 20000000, status: 'Terverifikasi' },
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
      case 'Terverifikasi':
        return <span className="px-4 py-1.5 bg-[#DCECE0] text-[#185325] rounded-full text-[11px] font-bold whitespace-nowrap">Terverifikasi</span>;
      case 'Menunggu Verifikasi':
        return <span className="px-4 py-1.5 bg-[#FDE68A] text-yellow-800 rounded-full text-[11px] font-bold whitespace-nowrap">Menunggu Verifikasi</span>;
      case 'Revisi':
        return <span className="px-4 py-1.5 bg-red-200 text-red-800 rounded-full text-[11px] font-bold whitespace-nowrap">Revisi</span>;
      default:
        return <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[11px] font-bold whitespace-nowrap">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Laporan Dana</h1>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari proyek.." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#185325]"
            />
          </div>
          <button 
            onClick={() => navigate('/admin/kth/rehabilitasi/laporan-dana/create')}
            className="flex items-center gap-2 px-5 py-2 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer"
          >
            <HiPlus className="w-5 h-5" strokeWidth={2.5} /> Buat Laporan
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-transparent text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-semibold transition-colors border border-gray-300 shadow-sm cursor-pointer">
            <HiOutlineAdjustmentsHorizontal className="w-5 h-5" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-200">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">ID</th>
                <th className="px-6 py-4 whitespace-nowrap">Nama Program</th>
                <th className="px-6 py-4 whitespace-nowrap">Tahap</th>
                <th className="px-6 py-4 whitespace-nowrap">Sumber Dana</th>
                <th className="px-6 py-4 whitespace-nowrap">Dana Disalurkan</th>
                <th className="px-6 py-4 whitespace-nowrap">Dana Direalisasikan</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.namaProgram}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.tahap}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.sumberDana}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{formatRupiah(item.danaDisalurkan)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{formatRupiah(item.danaDirealisasikan)}</td>
                  <td className="px-6 py-4 text-center">{renderStatusBadge(item.status)}</td>
                  <td className="px-6 py-4 flex justify-center items-center">
                    <button 
                      title="Lihat Detail"
                      // Simulasi pengiriman ID agar halaman detail bisa beda-beda tampilannya (hanya untuk testing UI)
                      onClick={() => navigate(`/admin/kth/rehabilitasi/laporan-dana/detail/${index}`)}
                      className="p-1.5 text-gray-600 hover:text-[#185325] border border-transparent hover:border-[#185325] rounded-full transition-all cursor-pointer"
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

export default LaporanDanaIndex;