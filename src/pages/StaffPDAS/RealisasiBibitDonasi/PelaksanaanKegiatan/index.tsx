import React, { useState } from 'react';
import { 
  HiOutlineArrowRight, 
  HiOutlineEye, 
  HiOutlineDocumentText, 
  HiOutlineCloudArrowUp,
  HiOutlinePhoto
} from 'react-icons/hi2';
import toast from 'react-hot-toast'; 

import PreviewBastModal from './components/PreviewBastModal';
import RincianDanaModal from './components/RincianDanaModal';
import UploadBastModal from './components/UploadBastModal';

export type StatusKegiatan = 'Terkumpul' | 'Disalurkan' | 'Terealisasi';
type ModalType = 'previewBAST' | 'rincian' | 'uploadBAST' | null;

export interface DetailBibitDana {
  nama: string;
  jumlah: number;
  hargaSatuan: number;
}

export interface KegiatanData {
  idTransaksi: string;
  program: string;
  jumlahBibit: number;
  status: StatusKegiatan;
  namaDonatur: string;
  rincianBibit: DetailBibitDana[];
  bastUrl?: string | null; 
  buktiTanamUrl?: string | null; 
}

const mockData: KegiatanData[] = [
  { 
    idTransaksi: 'TRX-101', 
    program: 'Penghijauan Hulu Citarum', 
    jumlahBibit: 50, 
    status: 'Terkumpul',
    namaDonatur: 'Budi Santoso',
    bastUrl: null,
    buktiTanamUrl: null,
    rincianBibit: [
      { nama: 'Mahoni', jumlah: 30, hargaSatuan: 15000 },
      { nama: 'Sengon', jumlah: 20, hargaSatuan: 10000 }
    ]
  },
  { 
    idTransaksi: 'TRX-102', 
    program: 'Pemulihan Lahan Kritis Cisadane', 
    jumlahBibit: 100, 
    status: 'Disalurkan',
    namaDonatur: 'PT Alam Hijau',
    bastUrl: 'https://example.com/bast.pdf',
    buktiTanamUrl: null, // BAST sudah ada, tapi belum ditanam
    rincianBibit: [
      { nama: 'Trembesi', jumlah: 100, hargaSatuan: 20000 }
    ]
  },
  { 
    idTransaksi: 'TRX-103', 
    program: 'Hutan Kota Jabar', 
    jumlahBibit: 200, 
    status: 'Terealisasi', // Status otomatis karena bukti tanam sudah ditarik dari modul lain
    namaDonatur: 'Komunitas Bumi',
    bastUrl: 'https://example.com/bast.pdf',
    buktiTanamUrl: 'https://example.com/foto-tanam.jpg',
    rincianBibit: [
      { nama: 'Ketapang', jumlah: 200, hargaSatuan: 25000 }
    ]
  },
];

const stepperData = [
  { step: 1, title: 'Status "Terkumpul"', desc: 'Bibit tersedia dari dana donatur.', isActive: false },
  { step: 2, title: 'Upload BAST', desc: 'Serah terima bibit ke KTH. Status menjadi "Disalurkan".', isActive: true },
  { step: 3, title: 'Integrasi Modul Monitoring', desc: 'Sistem menarik bukti tanam dari modul rehabilitasi.', isActive: false },
  { step: 4, title: 'Status "Terealisasi"', desc: 'Proses donasi selesai secara End-to-End.', isActive: false },
];

const StatusBadge = ({ status }: { status: StatusKegiatan }) => {
  switch (status) {
    case 'Terealisasi':
      return <span className="px-4 py-1.5 rounded-full text-[11px] font-bold bg-[#e2f1e6] text-[#185325] whitespace-nowrap border border-[#C8E0CD]">Terealisasi</span>;
    case 'Disalurkan':
      return <span className="px-4 py-1.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 whitespace-nowrap border border-blue-200">Disalurkan</span>;
    default:
      return <span className="px-4 py-1.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600 whitespace-nowrap border border-gray-200">Terkumpul</span>;
  }
};

const PelaksanaanKegiatan: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedData, setSelectedData] = useState<KegiatanData | null>(null);

  const openModal = (type: ModalType, data: KegiatanData) => {
    setSelectedData(data);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedData(null);
  };

  return (
    <div className="relative flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      
      {/* HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Pelaksanaan Kegiatan (Donasi)</h1>
        <p className="text-sm md:text-base text-gray-600">
          Mendokumentasikan penyerahan bibit donasi ke Kelompok Tani Hutan (KTH).
        </p>
      </div>

      {/* STEPPER INFO */}
      <div className="bg-[#E6F4EA]/50 rounded-2xl p-5 md:p-6 shadow-sm border border-[#C8E6C9]">
        <h2 className="text-sm font-bold text-gray-800 mb-6">Mekanisme Status Penyaluran & Integrasi Sistem:</h2>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-2">
          {stepperData.map((item, index) => (
            <React.Fragment key={item.step}>
              <div className="flex flex-col items-center text-center max-w-50 w-full">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3 shadow-sm border-2 ${
                    item.isActive ? 'bg-[#185325] text-white border-[#185325]' : 'bg-white text-gray-400 border-gray-300'
                  }`}>
                  {item.step}
                </div>
                <h3 className={`text-xs font-bold mb-1 ${item.isActive ? 'text-[#185325]' : 'text-gray-500'}`}>{item.title}</h3>
                <p className="text-[10px] text-gray-500 leading-tight">{item.desc}</p>
              </div>
              {index < stepperData.length - 1 && (
                <div className="hidden md:flex text-gray-300"><HiOutlineArrowRight className="w-5 h-5" /></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* MAIN TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-225">
            <thead>
              <tr className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold border-b border-gray-200">
                <th className="px-6 py-4 whitespace-nowrap">ID Transaksi</th>
                <th className="px-6 py-4 whitespace-nowrap">Program / Lokasi</th>
                <th className="px-6 py-4 whitespace-nowrap">Jenis & Jumlah Bibit</th>
                <th className="px-6 py-4 whitespace-nowrap">Status Saat Ini</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Dokumen & Administrasi</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">{row.idTransaksi}</td>
                  
                  <td className="px-6 py-4">
                    <span className="block text-sm font-bold text-[#185325]">{row.program}</span>
                    <span className="block text-xs text-gray-500 mt-0.5">Oleh: {row.namaDonatur}</span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5 max-w-50">
                      {row.rincianBibit.map((bibit, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <span className="font-medium text-gray-700">{bibit.nama}</span>
                          <span className="font-bold text-[#2E7D32]">{bibit.jumlah} Btg</span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap align-middle">
                    <StatusBadge status={row.status} />
                  </td>

                  {/* KOLOM BARU: Dokumen & Administrasi */}
                  <td className="px-6 py-4 align-middle">
                    <div className="flex flex-col items-center justify-center gap-2 w-full max-w-40 mx-auto">
                      
                      {/* Logic BAST */}
                      {row.bastUrl ? (
                        <button 
                          onClick={() => openModal('previewBAST', row)}
                          className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-[#f0f9f3] border border-[#C8E0CD] hover:bg-[#e2f1e6] text-[#185325] text-[11px] font-bold rounded-lg transition-colors shadow-sm"
                        >
                          <HiOutlineDocumentText className="w-4 h-4" /> BAST Disetujui
                        </button>
                      ) : (
                        <button 
                          onClick={() => openModal('uploadBAST', row)}
                          className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-[#185325] hover:bg-[#123d1c] text-white text-[11px] font-bold rounded-lg transition-colors shadow-sm"
                        >
                          <HiOutlineCloudArrowUp className="w-4 h-4" /> Upload BAST
                        </button>
                      )}

                      {/* Logic Bukti Tanam (Otomatis) */}
                      {row.buktiTanamUrl ? (
                        <button 
                          onClick={() => toast.success('Membuka foto bukti tanam dari modul monitoring...')} // Bisa diganti buka modal image
                          className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-600 text-[11px] font-bold rounded-lg transition-colors shadow-sm"
                        >
                          <HiOutlinePhoto className="w-4 h-4" /> Bukti Penanaman
                        </button>
                      ) : (
                        <span className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-400 text-[10px] font-medium rounded-lg text-center leading-tight">
                          Menunggu integrasi data tanam
                        </span>
                      )}

                    </div>
                  </td>

                  {/* KOLOM AKSI: Hanya Ikon Mata */}
                  <td className="px-6 py-4 whitespace-nowrap align-middle">
                    <div className="flex items-center justify-center">
                      <button 
                        onClick={() => openModal('rincian', row)} 
                        title="Lihat Rincian Dana"
                        className="p-2 text-gray-400 hover:text-[#185325] hover:bg-[#f0f9f3] rounded-lg transition-colors"
                      >
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* MODALS */}
      <PreviewBastModal isOpen={activeModal === 'previewBAST'} onClose={closeModal} />
      <UploadBastModal isOpen={activeModal === 'uploadBAST'} onClose={closeModal} />
      <RincianDanaModal isOpen={activeModal === 'rincian'} onClose={closeModal} data={selectedData} /> 

    </div>
  );
};

export default PelaksanaanKegiatan;