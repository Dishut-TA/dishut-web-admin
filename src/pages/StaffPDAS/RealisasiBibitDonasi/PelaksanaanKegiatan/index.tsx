import React, { useState } from 'react';
import { 
  HiOutlineArrowRight, 
  HiOutlineEye, 
  HiOutlineDocumentText, 
  HiOutlineCloudArrowUp, 
  HiOutlineBanknotes 
} from 'react-icons/hi2';
import PreviewBastModal from './components/PreviewBastModal';
import RincianDanaModal from './components/RincianDanaModal';
import UploadBastModal from './components/UploadBastModal';

type StatusKegiatan = 'Terkumpul' | 'Disalurkan';
type ModalType = 'preview' | 'rincian' | 'upload' | null;

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
}

const mockData: KegiatanData[] = [
  { 
    idTransaksi: 'TRX-101', 
    program: 'Penghijauan Hulu Citarum', 
    jumlahBibit: 50, 
    status: 'Disalurkan',
    namaDonatur: 'Budi Santoso',
    rincianBibit: [
      { nama: 'Mahoni', jumlah: 30, hargaSatuan: 15000 },
      { nama: 'Sengon', jumlah: 20, hargaSatuan: 10000 }
    ]
  },
  { 
    idTransaksi: 'TRX-102', 
    program: 'Pemulihan Lahan Kritis Cisadane', 
    jumlahBibit: 100, 
    status: 'Terkumpul',
    namaDonatur: 'PT Alam Hijau',
    rincianBibit: [
      { nama: 'Trembesi', jumlah: 100, hargaSatuan: 20000 }
    ]
  },
];

const stepperData = [
  { step: 1, title: 'Status "Terkumpul"', desc: 'Bibit tersedia di pembibitan / vendor', isActive: false },
  { step: 2, title: 'Cek Draft BAST', desc: 'Staff mencetak draft Berita Acara Serah Terima', isActive: false },
  { step: 3, title: 'Penyerahan & TTD', desc: 'Bibit diserahkan ke KTH dan BAST ditandatangani', isActive: true },
  { step: 4, title: 'Upload Bukti BAST', desc: 'Upload BAST di sistem, Status menjadi "Disalurkan"', isActive: true },
];

const StatusBadge = ({ status }: { status: StatusKegiatan }) => {
  if (status === 'Disalurkan') {
    return <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-600 whitespace-nowrap">Disalurkan</span>;
  }
  return <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gray-200 text-gray-600 whitespace-nowrap">Terkumpul</span>;
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
      
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Pelaksanaan Kegiatan</h1>
        <p className="text-sm md:text-base text-gray-600">
          Mengumpulkan bibit dan dana kontribusi, lalu mendokumentasikan penyerahan kepada KTH.
        </p>
      </div>

      <div className="bg-[#E6F4EA] rounded-xl p-5 md:p-6 shadow-sm border border-[#C8E6C9]">
        <h2 className="text-sm font-bold text-gray-800 mb-6">Mekanisme Pelaksanaan & Penyerahan Bibit:</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
          {stepperData.map((item, index) => (
            <React.Fragment key={item.step}>
              <div className="flex flex-col items-center text-center max-w-50 w-full">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3 shadow-sm border-2 ${
                    item.isActive ? 'bg-primary text-white border-primary' : 'bg-white text-[#2E7D32] border-[#2E7D32]'
                  }`}>
                  {item.step}
                </div>
                <h3 className="text-xs font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-[10px] text-gray-600 leading-tight">{item.desc}</p>
              </div>
              {index < stepperData.length - 1 && (
                <div className="hidden md:flex text-[#81C784]"><HiOutlineArrowRight className="w-5 h-5" /></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200">
            <thead>
              <tr className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4 whitespace-nowrap">ID Transaksi</th>
                <th className="px-6 py-4 whitespace-nowrap">Program/Lokasi</th>
                
                {/* --- TAMBAHAN HEADER JENIS BIBIT --- */}
                <th className="px-6 py-4 whitespace-nowrap">Jenis Bibit</th>
                
                <th className="px-6 py-4 whitespace-nowrap text-center">Jumlah (Bibit)</th>
                <th className="px-6 py-4 whitespace-nowrap">Status Saat Ini</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">{row.idTransaksi}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{row.program}</td>
                  
                  {/* --- TAMBAHAN KONTEN JENIS BIBIT --- */}
                  <td className="px-6 py-4 max-w-62.5">
                    <div className="flex flex-wrap gap-1.5">
                      {row.rincianBibit.map((bibit, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded-md text-[11px] font-medium whitespace-nowrap shadow-sm"
                        >
                          {bibit.nama}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-[#2E7D32] text-center whitespace-nowrap">{row.jumlahBibit}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={row.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-2 w-full max-w-35 mx-auto">
                      
                      {row.status === 'Disalurkan' ? (
                        <>
                          <button 
                            onClick={() => openModal('preview', row)}
                            className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-[#DCECE0] hover:bg-[#C8E0CD] text-[#2E7D32] text-xs font-bold rounded transition-colors"
                          >
                            <HiOutlineEye className="w-4 h-4" /> Lihat BAST
                          </button>
                          <button 
                            onClick={() => openModal('rincian', row)} 
                            className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded transition-colors"
                          >
                            <HiOutlineBanknotes className="w-4 h-4" /> Rincian Dana
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => openModal('preview', row)}
                            className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded transition-colors"
                          >
                            <HiOutlineDocumentText className="w-4 h-4" /> Cetak Draft BAST
                          </button>
                          <button 
                            onClick={() => openModal('upload', row)}
                            className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-[#DCECE0] hover:bg-[#C8E0CD] text-[#2E7D32] text-xs font-bold rounded transition-colors"
                          >
                            <HiOutlineCloudArrowUp className="w-4 h-4" /> Upload BAST
                          </button>
                          <button 
                            onClick={() => openModal('rincian', row)} 
                            className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded transition-colors"
                          >
                            <HiOutlineBanknotes className="w-4 h-4" /> Rincian Dana
                          </button>
                        </>
                      )}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <PreviewBastModal isOpen={activeModal === 'preview'} onClose={closeModal} />
      <UploadBastModal isOpen={activeModal === 'upload'} onClose={closeModal} />
      <RincianDanaModal isOpen={activeModal === 'rincian'} onClose={closeModal} data={selectedData} /> 

    </div>
  );
};

export default PelaksanaanKegiatan;