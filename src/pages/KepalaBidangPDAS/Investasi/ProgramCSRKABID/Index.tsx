import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineMagnifyingGlass,
  HiOutlineArrowRight
} from 'react-icons/hi2';

interface UsulanCSR {
  id: string;
  namaProgram: string;
  kthPengusul: string;
  lokasi: string;
  anggaran: number;
  status: 'Menunggu Validasi' | 'Direkomendasikan' | 'Ditolak';
}

const mockData: UsulanCSR[] = [
  {
    id: 'CSR-001',
    namaProgram: 'Rehabilitasi Lahan Subang',
    kthPengusul: 'KTH Rimba',
    lokasi: 'Desa Sukamulya',
    anggaran: 80000000,
    status: 'Menunggu Validasi'
  }
];

const DaftarUsulanCSR: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  const filteredData = mockData.filter(item => 
    item.namaProgram.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.kthPengusul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Daftar Proposal Mandiri KTH Terverifikasi Staff
          </h1>
        </div>
        
        <div className="relative w-full sm:w-72">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari Proposal..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-225">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Rencana Kemitraan</th>
                <th className="px-6 py-4 whitespace-nowrap">KTH Pengusul</th>
                <th className="px-6 py-4 whitespace-nowrap">Lokasi</th>
                <th className="px-6 py-4 whitespace-nowrap">Anggaran</th>
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
                        <span className="text-sm font-bold text-gray-800">{item.namaProgram}</span>
                        <span className="text-xs text-gray-400 mt-0.5">{item.id}</span>
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
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <span className="inline-block px-4 py-1.5 bg-[#FDE68A] text-yellow-800 rounded-full text-[11px] font-bold">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                      <button 
                        onClick={() => navigate(`/admin/kabid/rehabilitasi/validasi-csr/verifikasi/${item.id}`)}
                        className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#185325] text-[#185325] hover:bg-[#f0f9f3] text-xs font-bold rounded-full transition-colors"
                      >
                        Periksa Berkas <HiOutlineArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Tidak ada usulan proposal yang ditemukan.
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

export default DaftarUsulanCSR;