import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineFunnel, HiOutlineEye } from 'react-icons/hi2';

type StatusLaporan = 'Sedang Ditinjau' | 'Perlu Perbaikan' | 'Disetujui Dinas';

interface LaporanData {
  id: string;
  namaProyek: string;
  kthPelaksana: string;
  totalAnggaran: number;
  status: StatusLaporan;
}

const mockData: LaporanData[] = [
  { id: 'CSR-001', namaProyek: 'Rehabilitasi Citarum', kthPelaksana: 'KTH Rimba', totalAnggaran: 10000000, status: 'Sedang Ditinjau' },
  { id: 'CSR-002', namaProyek: 'Rehabilitasi Citarum', kthPelaksana: 'KTH Rimba', totalAnggaran: 10000000, status: 'Perlu Perbaikan' },
  { id: 'CSR-003', namaProyek: 'Rehabilitasi Citarum', kthPelaksana: 'KTH Rimba', totalAnggaran: 10000000, status: 'Disetujui Dinas' },
];

const LaporanKeuanganIndex: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState<LaporanData[]>(mockData);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  const renderStatusBadge = (status: StatusLaporan) => {
    switch (status) {
      case 'Sedang Ditinjau':
        return <span className="px-4 py-1.5 bg-[#FDE68A] text-yellow-800 rounded-full text-[11px] font-bold shadow-sm whitespace-nowrap">{status}</span>;
      case 'Perlu Perbaikan':
        return <span className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-[11px] font-bold shadow-sm whitespace-nowrap">{status}</span>;
      case 'Disetujui Dinas':
        return <span className="px-4 py-1.5 bg-[#DCECE0] text-[#185325] rounded-full text-[11px] font-bold shadow-sm whitespace-nowrap">{status}</span>;
      default:
        return <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[11px] font-bold">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Laporan Keuangan
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm active:scale-95">
          <HiOutlineFunnel className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-225">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">ID</th>
                <th className="px-6 py-4 whitespace-nowrap">Nama Proyek</th>
                <th className="px-6 py-4 whitespace-nowrap">KTH Pelaksana</th>
                <th className="px-6 py-4 whitespace-nowrap">Total Anggaran</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center w-24">Aksi</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-100">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-700 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">
                    {item.namaProyek}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#185325] whitespace-nowrap">
                    {item.kthPelaksana}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">
                    {formatRupiah(item.totalAnggaran)}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {renderStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                    <button 
                      title="Lihat Detail"
                      onClick={() => navigate(`/admin/csr/laporan-keuangan/detail/${item.id}`)}
                      className="p-1.5 text-gray-500 hover:text-[#185325] hover:bg-[#DCECE0] rounded-full transition-colors"
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

export default LaporanKeuanganIndex;