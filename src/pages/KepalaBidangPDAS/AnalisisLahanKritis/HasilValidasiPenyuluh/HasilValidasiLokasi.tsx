import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEye } from 'react-icons/hi2'; 

const HasilValidasiLokasi: React.FC = () => {
  const navigate = useNavigate();

  // MOCK DATA: Status disederhanakan menjadi 2 jenis saja
  const mockData = [
    { id: 1, lokasi: 'Hulu DAS Sungai Mamberamo', sumber: 'Analisis CPI', penyuluh: 'Siti Nurhaliza', tanggal: '20 Mei 2025 10:23', status: 'Sudah Validasi' },
    { id: 2, lokasi: 'Bukit Harapan Jaya', sumber: 'Proposal CSR', penyuluh: 'Budi Santoso', tanggal: '19 Mei 2025 16:45', status: 'Belum Validasi' },
    { id: 3, lokasi: 'Lereng Gunung Nusa Indah', sumber: 'Analisis CPI', penyuluh: 'Andi Wijaya', tanggal: '19 Mei 2025 09:12', status: 'Sudah Validasi' },
    { id: 4, lokasi: 'DAS Way Seputih Hulu', sumber: 'Analisis CPI', penyuluh: 'Rina Marlina', tanggal: '18 Mei 2025 14:30', status: 'Belum Validasi' },
    { id: 5, lokasi: 'Bukit Sumber Makmur', sumber: 'Proposal CSR', penyuluh: 'Agus Setiawan', tanggal: '17 Mei 2025 11:05', status: 'Sudah Validasi' },
    { id: 6, lokasi: 'Hutan Lindung Sungai Batu', sumber: 'Analisis CPI', penyuluh: 'Siti Nurhaliza', tanggal: '16 Mei 2025 13:20', status: 'Belum Validasi' },
  ];

  // UPDATE STYLE: Warna badge disesuaikan dengan 2 status baru
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Sudah Validasi': return 'bg-emerald-50 text-[#185325] border border-emerald-200';
      case 'Belum Validasi': return 'bg-orange-50 text-orange-600 border border-orange-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Hasil Validasi Lokasi</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola dan tinjau hasil verifikasi lapangan dari para penyuluh.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#DCECE0]/50 text-[#3A4D3F] text-xs font-bold uppercase border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Nama Lokasi</th>
                <th className="px-6 py-4">Sumber Lokasi</th>
                <th className="px-6 py-4">Penyuluh</th>
                <th className="px-6 py-4">Tanggal Kirim</th>
                <th className="px-6 py-4 text-center">Status Data</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{item.lokasi}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.sumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.penyuluh}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.tanggal}</td>
                  
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 flex justify-center items-center">
                    {/* LOGIKA KONDISI TOMBOL AKSI */}
                    {item.status === 'Sudah Validasi' ? (
                      <button 
                        onClick={() => navigate(`/admin/kabid/analisis-cpi/hasil-validasi-lokasi/detail/${item.id}`)}
                        title="Lihat Detail Validasi"
                        className="p-2 text-gray-500 hover:text-[#185325] hover:bg-[#EBF8F1] rounded-lg transition-colors active:scale-95"
                      >
                        <HiOutlineEye className="w-5 h-5 stroke-2" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => navigate(`/admin/kabid/analisis-cpi/hasil-validasi-lokasi/detail/${item.id}`)}
                        className="px-5 py-2 bg-[#185325] hover:bg-[#123d1c] text-white text-xs font-bold rounded-full transition-all shadow-sm active:scale-95 flex items-center justify-center"
                      >
                        Validasi
                      </button>
                    )}
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

export default HasilValidasiLokasi;