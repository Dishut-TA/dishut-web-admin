import React, { useState } from 'react';
import { HiOutlineFunnel } from 'react-icons/hi2';

interface RiwayatData {
  id: string;
  rencanaKemitraan: string;
  kthPengusul: string;
  lokasi: string;
  anggaran: number;
  status: 'Disetujui' | 'Ditolak' | 'Direvisi';
}

const mockRiwayat: RiwayatData[] = [
  {
    id: 'CSR-001',
    rencanaKemitraan: 'Rehabilitasi Lahan Subang',
    kthPengusul: 'KTH Rimba',
    lokasi: 'Desa Sukamulya',
    anggaran: 80000000,
    status: 'Disetujui',
  }
];

const RiwayatProposal: React.FC = () => {
  const [data] = useState<RiwayatData[]>(mockRiwayat);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', currency: 'IDR', maximumFractionDigits: 0 
    }).format(angka);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disetujui':
        return <span className="px-4 py-1.5 bg-[#185325] text-white text-[11px] font-bold rounded-full">Disetujui</span>;
      case 'Ditolak':
        return <span className="px-4 py-1.5 bg-red-100 text-red-700 text-[11px] font-bold rounded-full">Ditolak</span>;
      default:
        return <span className="px-4 py-1.5 bg-gray-200 text-gray-700 text-[11px] font-bold rounded-full">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      
      {/* Header & Filter */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Riwayat Proposal</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <HiOutlineFunnel className="w-5 h-5" /> Filter
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto w-full mt-2">
        <table className="w-full text-left border-collapse min-w-225">
          <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
            <tr>
              <th className="px-6 py-4 rounded-tl-xl whitespace-nowrap w-1/4">Rencana Kemitraan</th>
              <th className="px-6 py-4 whitespace-nowrap">KTH Pengusul</th>
              <th className="px-6 py-4 whitespace-nowrap">Lokasi</th>
              <th className="px-6 py-4 whitespace-nowrap">Anggaran</th>
              <th className="px-6 py-4 rounded-tr-xl whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/60 bg-white">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800">{item.rencanaKemitraan}</span>
                      <span className="text-xs text-gray-500 mt-0.5">{item.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-700 whitespace-nowrap">
                    {item.kthPengusul}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {item.lokasi}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">
                    {formatRupiah(item.anggaran)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm bg-white rounded-b-xl">
                  Belum ada riwayat proposal.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default RiwayatProposal;