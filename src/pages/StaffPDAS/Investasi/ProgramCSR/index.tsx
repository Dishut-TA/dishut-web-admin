import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlineArrowRight, HiOutlineXCircle, HiOutlineEye } from 'react-icons/hi2';

type StatusCSR = 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak';

interface CSRProposal {
  id: string;
  namaProgram: string;
  kth: string;
  anggaran: number;
  status: StatusCSR;
}

// --- MOCK DATA DISESUAIKAN DENGAN GAMBAR ---
const mockData: CSRProposal[] = [
  {
    id: 'CSR-001',
    namaProgram: 'Reboisasi Hulu Sungai DAS',
    kth: 'KTH Rimba',
    anggaran: 300000000,
    status: 'Menunggu Persetujuan'
  },
  {
    id: 'CSR-001', // ID dibuat sama sesuai gambar
    namaProgram: 'Reboisasi Hulu Sungai DAS',
    kth: 'KTH Rimba',
    anggaran: 300000000,
    status: 'Disetujui'
  },
  {
    id: 'CSR-001', // ID dibuat sama sesuai gambar
    namaProgram: 'Reboisasi Hulu Sungai DAS',
    kth: 'KTH Rimba',
    anggaran: 300000000,
    status: 'Ditolak'
  }
];

const ProgramCSRList: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState<CSRProposal[]>(mockData);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => 
    item.namaProgram.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kth.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format ke "Rp300.000.000" (Tanpa spasi sesuai gambar)
  const formatRupiah = (angka: number) => {
    return 'Rp' + angka.toLocaleString('id-ID');
  };

  const renderStatusBadge = (status: StatusCSR) => {
    switch (status) {
      case 'Menunggu Persetujuan':
        return <span className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-full text-[11px] font-bold whitespace-nowrap">Menunggu Persetujuan</span>;
      case 'Disetujui':
        return <span className="px-4 py-1.5 bg-[#81C784] text-white rounded-full text-[11px] font-bold whitespace-nowrap">Disetujui</span>;
      case 'Ditolak':
        return <span className="px-4 py-1.5 bg-red-600 text-white rounded-full text-[11px] font-bold whitespace-nowrap">Ditolak</span>;
      default:
        return null;
    }
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
              <tr className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold">
                <th className="px-6 py-4 whitespace-nowrap">ID</th>
                <th className="px-6 py-4 whitespace-nowrap">Nama Program</th>
                <th className="px-6 py-4 whitespace-nowrap">KTH</th>
                <th className="px-6 py-4 whitespace-nowrap">Anggaran Diajukan</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {item.namaProgram}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {item.kth}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#185325] whitespace-nowrap">
                      {formatRupiah(item.anggaran)}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {renderStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 flex justify-center items-center whitespace-nowrap h-full min-h-16">
                      {item.status === 'Menunggu Persetujuan' ? (
                        <button 
                          onClick={() => navigate(`/admin/staff/rehabilitasi/program-csr/verifikasi/${item.id}`)}
                          className="flex items-center gap-1.5 px-5 py-2 bg-[#185325] hover:bg-[#123d1c] text-white text-xs font-bold rounded-full transition-colors active:scale-95 shadow-sm cursor-pointer"
                        >
                          Tinjau Berkas <HiOutlineArrowRight className="w-4 h-4 stroke-2" />
                        </button>
                      ) : (
                        <button 
                          title="Lihat Detail"
                          onClick={() => navigate(`/admin/staff/rehabilitasi/program-csr/detail/${item.id}`)}
                          className="p-1.5 text-gray-700 hover:text-[#185325] hover:bg-gray-200 border border-gray-400 rounded-full transition-colors cursor-pointer"
                        >
                          <HiOutlineEye className="w-4 h-4 stroke-2" />
                        </button>
                      )}
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
                        Belum ada berkas usulan kemitraan swasta (CSR) yang diajukan.
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