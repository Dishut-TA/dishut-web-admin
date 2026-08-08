import React, { useState, useEffect } from 'react';
import { 
  HiOutlineDocumentText, 
  HiOutlineCloudArrowUp,
  HiOutlinePhoto,
  HiOutlineEye
} from 'react-icons/hi2';
import toast from 'react-hot-toast'; 
import axios from 'axios';
import PreviewBastModal from './components/PreviewBastModal';
import UploadBastModal from './components/UploadBastModal';
import RincianDanaModal from './components/RincianDanaModal';

export type StatusKegiatan = 'Terkumpul' | 'Disalurkan' | 'Terealisasi';
type ModalType = 'previewBAST' | 'rincian' | 'uploadBAST' | null;

export interface DetailBibitDana {
  nama: string;
  jumlah: number;
  hargaSatuan: number;
}

export interface KegiatanData {
  id: number;
  idTransaksi: string;
  idDonasi: string;
  program: string;
  jumlahBibit: number;
  status: StatusKegiatan;
  namaDonatur: string;
  rincianBibit: DetailBibitDana[];
  bastUrl?: string | null; 
  buktiTanamUrl?: string | null; 
}

export const StatusBadge = ({ status }: { status: StatusKegiatan }) => {
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
  const [kegiatanList, setKegiatanList] = useState<KegiatanData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDonations = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/donations', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const rawData = response.data.payload || response.data.data || response.data;
      const list = Array.isArray(rawData) ? rawData : [rawData];

      const mappedData: KegiatanData[] = list.map((item: any) => {
        const firstSpec = item.seed?.specifications?.[0];
        const hargaSatuan = firstSpec ? Number(firstSpec.price) : 15000;

        const seedStatus = item.seed_status; // 'Pending', 'Terkumpul', 'Ditolak', dll.
        const hasBast = Boolean(item.bast_url || item.bast_path);
        const hasProof = Boolean(item.proof_url || item.proof_path);

        // 🧠 LOGIKA PENENTUAN STATUS YANG TEPAT:
        let status: StatusKegiatan = 'Terkumpul';

        if (seedStatus === 'Pending' || seedStatus === 'Menunggu Verifikasi') {
          status = 'Terkumpul'; // Atau status pending/menunggu
        } else if (hasBast && hasProof) {
          status = 'Terealisasi';
        } else if (hasBast) {
          status = 'Disalurkan';
        } else {
          status = 'Terkumpul'; // Default jika sudah diverifikasi admin tapi belum di-upload BAST
        }

        return {
          id: item.id,
          idTransaksi: `TRX-${item.id}`,
          idDonasi: `DNS-${item.id}`,
          program: item.donation_program?.name || 'Program Penghijauan',
          namaDonatur: item.donor?.donor_name || 'Hamba Allah',
          jumlahBibit: item.seed_quantity || 0,
          status: status, // Status otomatis sinkron dengan BAST & Bukti Tanam
          bastUrl: item.bast_url || (item.bast_path ? `http://127.0.0.1:8000/storage/${item.bast_path}` : null),
          buktiTanamUrl: item.proof_url || (item.proof_path ? `http://127.0.0.1:8000/storage/${item.proof_path}` : null),
          rincianBibit: [
            {
              nama: item.seed?.nama || 'Bibit Tanaman',
              jumlah: item.seed_quantity || 0,
              hargaSatuan: hargaSatuan
            }
          ]
        };
      });

      setKegiatanList(mappedData);
    } catch (error) {
      toast.error('Gagal memuat data pelaksanaan kegiatan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const openModal = (type: ModalType, data: KegiatanData) => {
    setSelectedData(data);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedData(null);
    fetchDonations(); 
  };

  return (
    <div className="relative flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Pelaksanaan Kegiatan (Donasi)</h1>
        <p className="text-sm md:text-base text-gray-600">
          Mendokumentasikan penyerahan bibit donasi ke Kelompok Tani Hutan (KTH).
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-225">
            <thead>
              <tr className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold border-b border-gray-200">
                <th className="px-6 py-4 whitespace-nowrap">ID Donasi</th>
                <th className="px-6 py-4 whitespace-nowrap">Nama Donatur</th>
                <th className="px-6 py-4 whitespace-nowrap">Program</th>
                <th className="px-6 py-4 whitespace-nowrap">Jenis & Jumlah Bibit</th>
                <th className="px-6 py-4 whitespace-nowrap">Status Saat Ini</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Dokumen Administrasi</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Rincian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500 font-medium">
                    Memuat data kegiatan...
                  </td>
                </tr>
              ) : kegiatanList.length > 0 ? (
                kegiatanList.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">{row.idDonasi}</td>
                    
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {row.namaDonatur}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#185325] whitespace-nowrap">
                      {row.program}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 max-w-50">
                        {row.rincianBibit.map((bibit, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="font-medium text-gray-700">{bibit.nama}</span>
                            <span className="font-bold text-[#2E7D32]">{bibit.jumlah} Batang</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap align-middle">
                      <StatusBadge status={row.status} />
                    </td>

                    <td className="px-6 py-4 align-middle">
                      <div className="flex flex-col items-center justify-center gap-2 w-full max-w-40 mx-auto">
                        {row.bastUrl ? (
                          <a 
                            href={row.bastUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-[#f0f9f3] border border-[#C8E0CD] hover:bg-[#e2f1e6] text-[#185325] text-[11px] font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
                          >
                            <HiOutlineDocumentText className="w-4 h-4" /> BAST Disimpan
                          </a>
                        ) : (
                          <button 
                            onClick={() => openModal('uploadBAST', row)}
                            className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-[#185325] hover:bg-[#123d1c] text-white text-[11px] font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
                          >
                            <HiOutlineCloudArrowUp className="w-4 h-4" /> Upload BAST
                          </button>
                        )}

                        {row.buktiTanamUrl ? (
                          <a 
                            href={row.buktiTanamUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-600 text-[11px] font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
                          >
                            <HiOutlinePhoto className="w-4 h-4" /> Bukti Penanaman
                          </a>
                        ) : (
                          <span className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-400 text-[10px] font-medium rounded-lg text-center leading-tight">
                            Menunggu integrasi data tanam
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap align-middle">
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => openModal('rincian', row)} 
                          title="Lihat Rincian Dana"
                          className="p-2 text-gray-400 hover:text-[#185325] hover:bg-[#f0f9f3] rounded-lg transition-colors cursor-pointer"
                        >
                          <HiOutlineEye className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                    Belum ada data pelaksanaan kegiatan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <PreviewBastModal isOpen={activeModal === 'previewBAST'} onClose={closeModal} />
      <UploadBastModal 
        isOpen={activeModal === 'uploadBAST'} 
        onClose={closeModal} 
        donationId={selectedData ? selectedData.id : null} 
      />
      <RincianDanaModal isOpen={activeModal === 'rincian'} onClose={closeModal} data={selectedData} /> 
    </div>
  );
};

export default PelaksanaanKegiatan;