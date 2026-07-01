import React, { useState } from 'react';
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineEye, 
  HiOutlineCheckBadge,
  HiOutlineArrowDownTray 
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import type { ProgramData, StatusProgram } from '@/utils/interface';
import VerifikasiProgramModal from './components/VerifikasiProgramModal';
import ExportLaporanModal from './components/ExportLaporanModal';
import DetailProgramModal from '@/pages/StaffPDAS/RealisasiBibitDonasi/ProgramDonasi/components/DetailProgramModal';

const mockDataProgram: ProgramData[] = [
  { 
    id: '1', 
    nama: 'Penghijauan Hulu Citarum', 
    lokasi: 'Kab. Bandung', 
    jenisBibit: [{ nama: 'Mahoni', jumlah: 5000 }, { nama: 'Sengon', jumlah: 3500 }], 
    terkumpul: '8.500', 
    status: 'Aktif' 
  },
  { 
    id: '4', 
    nama: 'Penanaman Mangrove Pesisir Utara', 
    lokasi: 'Kab. Bekasi', 
    jenisBibit: [{ nama: 'Mangrove', jumlah: 2000 }], 
    terkumpul: '0', 
    status: 'Menunggu Verifikasi' 
  }
];

const getStatusBadge = (status: StatusProgram) => {
  const baseStyle = "px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap";
  switch (status) {
    case 'Aktif': return <span className={`${baseStyle} bg-[#2E7D32] text-white`}>Aktif</span>;
    case 'Selesai': return <span className={`${baseStyle} bg-gray-200 text-gray-600`}>Selesai</span>;
    case 'Menunggu Verifikasi': return <span className={`${baseStyle} bg-[#F2C94C] text-gray-800`}>Menunggu Verifikasi</span>;
    default: return null;
  }
};

const KabidProgramDonasi: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<ProgramData | null>(null);
  const [isVerifModalOpen, setIsVerifModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredData = mockDataProgram.filter(program => 
    program.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.lokasi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenVerifikasi = (program: ProgramData) => {
    setSelectedProgram(program);
    setIsVerifModalOpen(true);
  };

  const handleOpenDetail = (program: ProgramData) => {
    setSelectedProgram(program);
    setIsDetailModalOpen(true);
  };

  const handleSetuju = () => {
    toast.success('Program berhasil disetujui!');
    setIsVerifModalOpen(false);
  };

  const handleTolak = () => {
    toast.error('Pengajuan program ditolak.');
    setIsVerifModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Verifikasi Program Realisasi Bibit dan Donasi</h1>
          <p className="text-sm md:text-base text-gray-500">Tinjau dan setujui pembukaan program realisasi bibit dan donasi baru yang diajukan oleh Staff PDAS.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari program..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#DCECE0]/30 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-sm text-sm text-gray-700 shadow-sm"
            />
          </div>
          
          <button 
            onClick={() => setIsExportModalOpen(true)}
            className="bg-primary hover:bg-[#063727] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap active:scale-95"
          >
            <HiOutlineArrowDownTray className="w-5 h-5" strokeWidth={2} />
            Export Laporan
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200">
            <thead>
              <tr className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] font-bold uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 whitespace-nowrap">Nama Program</th>
                <th className="px-6 py-4 whitespace-nowrap">Lokasi</th>
                <th className="px-6 py-4 whitespace-nowrap">Jenis Bibit</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Terkumpul</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">{program.nama}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{program.lokasi}</td>
                    
                    {/* Render Jenis Bibit */}
                    <td className="px-6 py-4 max-w-62.5">
                      <div className="flex flex-wrap gap-1.5">
                        {program.jenisBibit.map((bibit: any, index: number) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded-md text-[11px] font-medium whitespace-nowrap shadow-sm"
                          >
                            {bibit.nama}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm font-bold text-[#2E7D32] text-center whitespace-nowrap">
                      {program.terkumpul}
                    </td>

                    <td className="px-6 py-4 text-center whitespace-nowrap">
                       {getStatusBadge(program.status)}
                    </td>
                    
                    <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                      {program.status === 'Menunggu Verifikasi' ? (
                        <button 
                          onClick={() => handleOpenVerifikasi(program)}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#185325] hover:bg-[#123d1c] text-white text-xs font-bold rounded-full transition-colors active:scale-95 shadow-sm"
                        >
                          <HiOutlineCheckBadge className="w-4 h-4" /> Verifikasi
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleOpenDetail(program)}
                          title="Lihat Detail"
                          className="p-1.5 text-gray-400 hover:text-[#2E7D32] hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <HiOutlineEye className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                    Program tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render Modals */}
      <VerifikasiProgramModal 
        isOpen={isVerifModalOpen} 
        onClose={() => setIsVerifModalOpen(false)} 
        program={selectedProgram}
        onSetuju={handleSetuju}
        onTolak={handleTolak}
      />

      <DetailProgramModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        program={selectedProgram}
      />

      <ExportLaporanModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

    </div>
  );
}

export default KabidProgramDonasi;