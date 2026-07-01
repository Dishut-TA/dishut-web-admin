import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlinePlus, 
  HiOutlineEye, 
  HiOutlinePencil, 
  HiOutlineTrash,
  HiOutlineXCircle
} from 'react-icons/hi2';

type StatusProgram = 'Draft' | 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak';

interface ProgramAPBD {
  id: string;
  nama: string;
  lokasi: string;
  anggaran: number;
  luasLahan: number;
  status: StatusProgram;
}

// --- MOCK DATA ---
const mockData: ProgramAPBD[] = [
  {
    id: 'PRG-001',
    nama: 'Rehabilitasi Lahan Kritis Citarum',
    lokasi: 'Hulu Citarum - Blok 1',
    anggaran: 120000000,
    luasLahan: 15,
    status: 'Menunggu Persetujuan'
  },
  {
    id: 'PRG-002',
    nama: 'Pemulihan Ekosistem Cisadane',
    lokasi: 'DAS Cisadane Hilir',
    anggaran: 85000000,
    luasLahan: 8,
    status: 'Disetujui'
  }
];

const ProgramAPBDList: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState<ProgramAPBD[]>(mockData);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  const getStatusBadge = (status: StatusProgram) => {
    const baseStyle = "px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap";
    switch (status) {
      case 'Disetujui': 
        return <span className={`${baseStyle} bg-[#2E7D32] text-white`}>Disetujui</span>;
      case 'Menunggu Persetujuan': 
        return <span className={`${baseStyle} bg-[#F2C94C] text-gray-800`}>Menunggu Persetujuan</span>;
      case 'Ditolak': 
        return <span className={`${baseStyle} bg-red-100 text-red-600`}>Ditolak</span>;
      case 'Draft': 
        return <span className={`${baseStyle} bg-gray-200 text-gray-600`}>Draft</span>;
      default: 
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Program APBD
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            Daftar program rehabilitasi yang dicanangkan dan dibuat langsung oleh Staff PDAS.
          </p>
        </div>

        <button 
          onClick={() => navigate('/admin/staff/rehabilitasi/program-apbd/create')} 
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm active:scale-95 whitespace-nowrap"
        >
          <HiOutlinePlus className="w-5 h-5" strokeWidth={2.5} />
          Rancang Program APBD Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200">
            <thead>
              <tr className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold">
                <th className="px-6 py-4 whitespace-nowrap">Nama Program Kerja</th>
                <th className="px-6 py-4 whitespace-nowrap">Lokasi Prioritas</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Anggaran</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Target (Ha)</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-800">{item.nama}</span>
                        <span className="text-xs text-gray-500">{item.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.lokasi}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800 text-right whitespace-nowrap">
                      {formatRupiah(item.anggaran)}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#2E7D32] text-center whitespace-nowrap">
                      {item.luasLahan} Ha
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button title="Lihat Detail" className="p-1.5 text-gray-400 hover:text-[#2E7D32] transition-colors">
                          <HiOutlineEye className="w-5 h-5" />
                        </button>
                        {item.status !== 'Disetujui' && (
                          <>
                            <button title="Edit" className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                              <HiOutlinePencil className="w-5 h-5" />
                            </button>
                            <button title="Hapus" className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                              <HiOutlineTrash className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <div className="p-4 bg-gray-50 rounded-full mb-3 border border-gray-100">
                        <HiOutlineXCircle className="w-8 h-8 text-[#185325]" />
                      </div>
                      <p className="text-base font-bold text-gray-800">Belum Ada Program APBD Terdaftar</p>
                      <p className="text-sm mt-1 max-w-md mx-auto">
                        Silakan rancang dan buat program rehabilitasi APBD baru berbasis penunjukan wilayah koordinat kritis dari Modul CPI.
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

export default ProgramAPBDList;