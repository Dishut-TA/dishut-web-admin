import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEye, HiOutlinePlus, HiOutlineFunnel } from 'react-icons/hi2';
import RiwayatProgresModal from './components/RiwayatProgressModal';

type StatusPelaksanaan = 'SIAP DILAKSANAKAN' | 'DALAM PELAKSANAAN';

interface ProgramData {
  id: string;
  namaProgram: string;
  target: string;
  mitraKTH: string;
  status: StatusPelaksanaan;
  riwayat: any[]; // Array data riwayat
}

const mockData: ProgramData[] = [
  {
    id: 'PGM-001',
    namaProgram: 'Agroforestri Mandiri',
    target: '-',
    mitraKTH: 'KTH Tani Maju',
    status: 'SIAP DILAKSANAKAN',
    riwayat: [] // Data kosong
  },
  {
    id: 'PGM-002',
    namaProgram: 'Reboisasi Gunung B',
    target: '-',
    mitraKTH: 'KTH Lestari',
    status: 'DALAM PELAKSANAAN',
    riwayat: [ // Ada data riwayat
      { id: 'RW-1', tanggal: '2026-07-01', bibitDitanam: 500, koordinat: '-6.21, 106.82', kondisi: 'Cerah, warga antusias', kendala: '-' }
    ]
  }
];

const PelaksanaanPenanamanIndex: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState<ProgramData[]>(mockData);
  
  // State Modal Riwayat
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramData | null>(null);

  const handleOpenRiwayat = (program: ProgramData) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: StatusPelaksanaan) => {
    if (status === 'SIAP DILAKSANAKAN') {
      return <span className="px-4 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-[11px] font-bold shadow-sm whitespace-nowrap">SIAP DILAKSANAKAN</span>;
    }
    return <span className="px-4 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-[11px] font-bold shadow-sm whitespace-nowrap">DALAM PELAKSANAAN</span>;
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Pelaksanaan Penanaman
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Koordinasikan dengan KTH dan laporkan progres penanaman di lapangan.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="px-4 py-1.5 bg-[#DCECE0] text-[#185325] rounded-full text-xs font-bold shadow-sm border border-[#C8E0CD]">
            Online
          </span>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm active:scale-95">
            <HiOutlineFunnel className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* --- TABEL --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-200">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Nama Program</th>
                <th className="px-6 py-4 whitespace-nowrap text-center w-32">Target</th>
                <th className="px-6 py-4 whitespace-nowrap">Mitra KTH</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center w-48">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">
                    {item.namaProgram}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center whitespace-nowrap">
                    {item.target}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-[#185325]">{item.mitraKTH}</span>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center gap-2 whitespace-nowrap">
                    <button 
                      onClick={() => navigate(`/admin/penyuluh/pelaksanaan-penanaman/create/${item.id}`)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#185325] text-[#185325] hover:bg-[#f0f9f3] text-xs font-bold rounded-full transition-colors active:scale-95 shadow-sm"
                    >
                      <HiOutlinePlus className="w-4 h-4" strokeWidth={2} /> Lapor Progres
                    </button>
                    <button 
                      title="Lihat Riwayat"
                      onClick={() => handleOpenRiwayat(item)}
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

      {/* Render Modal Terpisah */}
      <RiwayatProgresModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        namaProgram={selectedProgram?.namaProgram || ''}
        riwayat={selectedProgram?.riwayat || []}
      />

    </div>
  );
};

export default PelaksanaanPenanamanIndex;