import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlineArrowRight, HiOutlineXCircle } from 'react-icons/hi2';

type StatusCSR = 'Menunggu Verifikasi' | 'Direvisi' | 'Diteruskan';

interface CSRProposal {
  id: string;
  rencanaKemitraan: string;
  kthPengusul: string;
  lokasi: string;
  anggaran: number;
  status: StatusCSR;
}

// --- MOCK DATA (Ubah menjadi [] untuk melihat Empty State) ---
const mockData: CSRProposal[] = [
  {
    id: 'CSR-001',
    rencanaKemitraan: 'Rehabilitasi Lahan Subang',
    kthPengusul: 'KTH Rimba',
    lokasi: 'Desa Sukamulya',
    anggaran: 80000000,
    status: 'Menunggu Verifikasi'
  },
  {
    id: 'CSR-002',
    rencanaKemitraan: 'Penanaman Pohon Pelindung DAS',
    kthPengusul: 'KTH Maju Jaya',
    lokasi: 'Desa Cikahuripan',
    anggaran: 120000000,
    status: 'Menunggu Verifikasi'
  }
];

const ProgramCSRList: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState<CSRProposal[]>(mockData);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => 
    item.rencanaKemitraan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kthPengusul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Program CSR
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            Pemeriksaan administratif usulan mandiri dari Kelompok Tani Hutan.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Cari Proposal..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all text-sm text-gray-700 shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-225">
            <thead>
              <tr className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold border-b border-gray-200">
                <th className="px-6 py-4 whitespace-nowrap">Rencana Kemitraan</th>
                <th className="px-6 py-4 whitespace-nowrap">KTH Pengusul</th>
                <th className="px-6 py-4 whitespace-nowrap">Lokasi</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Anggaran</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800">{item.rencanaKemitraan}</span>
                        <span className="text-xs text-gray-500">{item.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#185325] whitespace-nowrap">
                      {item.kthPengusul}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {item.lokasi}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800 text-right whitespace-nowrap">
                      {formatRupiah(item.anggaran)}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <span className="px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap bg-[#F2C94C]">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                      <button 
                        onClick={() => navigate(`/admin/staff/rehabilitasi/program-csr/verifikasi/${item.id}`)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#185325] text-[#185325] hover:bg-[#f0f9f3] text-xs font-bold rounded-full transition-colors active:scale-95 shadow-sm"
                      >
                        Periksa Berkas <HiOutlineArrowRight className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <div className="p-3 bg-green-50 border border-green-100 rounded-full mb-4">
                        <HiOutlineXCircle className="w-10 h-10 text-[#185325]" />
                      </div>
                      <p className="text-lg font-bold text-gray-800 mb-1">Tidak ada Data!</p>
                      <p className="text-sm max-w-md mx-auto">
                        Seluruh berkas usulan kemitraan swasta (CSR) telah diverifikasi oleh Staff.
                      </p>
                    </div>
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

export default ProgramCSRList;