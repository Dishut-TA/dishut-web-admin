import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineFunnel, HiOutlineEye } from 'react-icons/hi2';

type StatusRiwayat = 'Selesai' | 'Dihentikan';

interface RiwayatData {
  id: string;
  tanggal: string;
  namaProgram: string;
  kth: string;
  nominal: number;
  status: StatusRiwayat;
}

const mockRiwayat: RiwayatData[] = [
  {
    id: 'CSR-001',
    tanggal: '01/01/2025',
    namaProgram: 'Rehabilitasi Citarum',
    kth: 'KTH Rimba',
    nominal: 80000000,
    status: 'Selesai',
  },
  {
    id: 'CSR-002', 
    tanggal: '01/01/2025',
    namaProgram: 'Rehabilitasi Citarum',
    kth: 'KTH Rimba',
    nominal: 80000000,
    status: 'Dihentikan',
  }
];

const RiwayatPendanaan: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState<RiwayatData[]>(mockRiwayat);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', currency: 'IDR', maximumFractionDigits: 0 
    }).format(angka);
  };

  const getStatusBadge = (status: StatusRiwayat) => {
    switch (status) {
      case 'Selesai':
        return <span className="px-4 py-1.5 bg-[#DCECE0] text-[#185325] text-[11px] font-bold rounded-full whitespace-nowrap">Selesai</span>;
      case 'Dihentikan':
        return <span className="px-4 py-1.5 bg-red-600 text-white text-[11px] font-bold rounded-full whitespace-nowrap">Dihentikan</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex items-center justify-between mt-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Riwayat Pendanaan</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors shadow-sm">
          <HiOutlineFunnel className="w-5 h-5" /> Filter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">ID</th>
                <th className="px-6 py-4 whitespace-nowrap">Tanggal</th>
                <th className="px-6 py-4 whitespace-nowrap">Nama Program</th>
                <th className="px-6 py-4 whitespace-nowrap">KTH</th>
                <th className="px-6 py-4 whitespace-nowrap">Nominal Pendanaan</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                      {item.tanggal}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {item.namaProgram}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                      {item.kth}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">
                      {formatRupiah(item.nominal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                      <button 
                        title="Lihat Detail"
                        onClick={() => navigate(`/admin/csr/riwayat-pendanaan/detail/${item.id}`)}
                        className="p-1.5 text-gray-700 hover:text-[#185325] hover:bg-gray-200 border border-gray-400 rounded-full transition-colors cursor-pointer"
                      >
                        <HiOutlineEye className="w-4 h-4 stroke-2" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 text-sm bg-white">
                    Belum ada riwayat pendanaan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default RiwayatPendanaan;