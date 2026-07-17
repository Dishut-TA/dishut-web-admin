import { useState } from 'react';
import { Search } from 'lucide-react';
import { HiOutlineEye } from 'react-icons/hi2';

import DetailDonaturModal from './components/DetailDonaturModal';
import VerifikasiDonaturModal from './components/VerifikasiDonaturModal';
import type { DonaturData, StatusType } from '@/utils/interface'; // Sesuaikan

const mockData: DonaturData[] = [
  { 
    idTransaksi: 'TRX-101', 
    namaDonatur: 'Ahmad Rifai', 
    program: 'Penghijauan Hulu Citarum', 
    jumlahBibit: 50, 
    status: 'Terealisasi',
    rincianBibit: [
      { nama: 'Mahoni', jumlah: 30, hargaSatuan: 15000 },
      { nama: 'Sengon', jumlah: 20, hargaSatuan: 10000 }
    ]
  },
  { 
    idTransaksi: 'TRX-102', 
    namaDonatur: 'PT Hijau Bersama', 
    program: 'Pemulihan Lahan Kritis Cisadane', 
    jumlahBibit: 500, 
    status: 'Menunggu Verifikasi',
    rincianBibit: [
      { nama: 'Trembesi', jumlah: 500, hargaSatuan: 25000 }
    ]
  },
];

const StatusBadge = ({ status }: { status: StatusType }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Menunggu Verifikasi':
        return 'bg-[#F2C94C] text-gray-800';
      case 'Terealisasi':
      case 'Disalurkan':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

const DataDonatur = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDetailDonatur, setSelectedDetailDonatur] = useState<DonaturData | null>(null);
  const [selectedVerifDonatur, setSelectedVerifDonatur] = useState<DonaturData | null>(null);

  // Filter Search
  const filteredData = mockData.filter(donatur => 
    donatur.idTransaksi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donatur.namaDonatur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            Data Donasi
          </h1>

        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari ID transaksi/nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#DCECE0]/30 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-sm text-sm text-gray-700"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200">
            <thead>
              <tr className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold">
                <th className="px-6 py-4 whitespace-nowrap">ID Transaksi</th>
                <th className="px-6 py-4 whitespace-nowrap">Nama Donatur</th>
                <th className="px-6 py-4 whitespace-nowrap">Program</th>
                <th className="px-6 py-4 whitespace-nowrap">Jenis Bibit</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Jumlah (Total)</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi (Verifikasi)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">{row.idTransaksi}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">{row.namaDonatur}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{row.program}</td>
                  
                  <td className="px-6 py-4 max-w-50">
                    <div className="flex flex-wrap gap-1.5">
                      {row.rincianBibit?.map((bibit, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded-md text-[11px] font-medium whitespace-nowrap shadow-sm"
                        >
                          {bibit.nama}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-[#2E7D32] text-center whitespace-nowrap">
                    {row.jumlahBibit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center gap-3">
                    
                    {row.status === 'Menunggu Verifikasi' ? (
                       <button 
                         onClick={() => setSelectedVerifDonatur(row)}
                         className="px-4 py-1.5 bg-[#185325] text-white text-xs font-bold rounded-full hover:bg-[#163f1f] transition-colors shadow-sm"
                       >
                         Verifikasi Data
                       </button>
                    ) : (
                      <button 
                        onClick={() => setSelectedDetailDonatur(row)}
                        title="Lihat Detail"
                        className="p-2 border-gray-200 rounded-lg text-gray-500 hover:text-[#2E7D32] hover:bg-green-50 transition-colors"
                      >
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DetailDonaturModal 
        isOpen={selectedDetailDonatur !== null}
        onClose={() => setSelectedDetailDonatur(null)}
        donatur={selectedDetailDonatur}
      />

      <VerifikasiDonaturModal 
        isOpen={selectedVerifDonatur !== null}
        onClose={() => setSelectedVerifDonatur(null)}
        donatur={selectedVerifDonatur}
        onTerima={() => {
            console.log("Donasi Diterima", selectedVerifDonatur?.idTransaksi);
            setSelectedVerifDonatur(null);
        }}
        onTolak={() => {
             console.log("Donasi Ditolak", selectedVerifDonatur?.idTransaksi);
             setSelectedVerifDonatur(null);
        }}
      />

    </div>
  );
};

export default DataDonatur;