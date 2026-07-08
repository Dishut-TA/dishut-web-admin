import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineFunnel, HiOutlinePlus } from 'react-icons/hi2';

interface TugasValidasi {
  id: string;
  lokasi: string;
  sumber: string;
  rekomendasi: string;
  batasWaktu: string;
  status: 'DITUGASKAN' | 'SELESAI';
}

const mockData: TugasValidasi[] = [
  {
    id: 'VAL-001',
    lokasi: 'Lahan Kritis Desa C',
    sumber: 'Analisis CPI',
    rekomendasi: 'Reboisasi',
    batasWaktu: '2026-07-20',
    status: 'DITUGASKAN'
  }
];

const ValidasiLokasi: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState<TugasValidasi[]>(mockData);

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Tugas Validasi Lapangan
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Lakukan peninjauan lokasi dan lengkapi data hasil validasi berikut.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm active:scale-95">
          <HiOutlineFunnel className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-200">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Lokasi</th>
                <th className="px-6 py-4 whitespace-nowrap">Sumber / Rekomendasi</th>
                <th className="px-6 py-4 whitespace-nowrap">Batas Waktu</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">
                    {item.lokasi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-gray-600">{item.sumber}</span>
                      <span className="text-xs text-gray-400 italic">{item.rekomendasi}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600 whitespace-nowrap">
                    {item.batasWaktu}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className="px-3 py-1 bg-[#FEF3C7] text-yellow-800 rounded-full text-[11px] font-bold uppercase tracking-wider">
                      {item.status}
                    </span>
                  </td>
                  <td className="mx-auto whitespace-nowrap">
                    <button 
                      onClick={() => navigate(`/admin/penyuluh/validasi-lokasi/create/${item.id}`)}
                      className="flex items-center mx-auto gap-1.5 text-sm cursor-pointer font-bold text-gray-800 hover:text-[#185325] transition-colors"
                    >
                      <HiOutlinePlus className="w-4 h-4 stroke-2" /> Input Validasi
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

export default ValidasiLokasi;