import React, { useState, useEffect } from 'react';
import { 
  HiOutlineEye,
  HiOutlineMagnifyingGlass,
  HiOutlineMapPin,
  HiOutlineArrowPath,
  HiOutlineFunnel,
  HiOutlineUserPlus,
} from 'react-icons/hi2';
import ModalBuatPenugasan from './components/CreatePenugasanModal';
import TugaskanModal from './components/TugaskanModal';
import { useNavigate } from 'react-router-dom';

type JenisKegiatan = 'Validasi Lokasi' | 'Pelaksanaan Penanaman';
type StatusPenugasan = 'Menunggu Penugasan' | 'Ditugaskan' | 'Berjalan' | 'Menunggu Verifikasi' | 'Selesai';

interface PenugasanData {
  id: string;
  program: string;
  lokasi: string;
  jenisKegiatan: JenisKegiatan;
  wilayah: string;
  rencanaPeriode: string;
  penyuluh: string;
  status: StatusPenugasan;
  tanggalPenugasan: string;
  source_type: string;
  penugasan_id?: string;
}

const SproutIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12M12 12C12 12 7 12 7 7C7 12 12 12 12 12ZM12 12C12 12 17 12 17 7C17 12 12 12 12 12Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 22H16" />
  </svg>
);

const PenugasanPenyuluh: React.FC = () => {
  const [penugasanData, setPenugasanData] = useState<PenugasanData[]>([]);
  const [, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTugaskanModalOpen, setIsTugaskanModalOpen] = useState(false);
  const [selectedPenugasan, setSelectedPenugasan] = useState<PenugasanData | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchPenugasan = async () => {
      try {
        const token = localStorage.getItem('token');
        const API_URL = import.meta.env.VITE_API_PELAKSANAAN_URL || 'http://127.0.0.1:8000/api';
        const res = await fetch(`${API_URL}/penugasan`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        });
        const json = await res.json();
        setPenugasanData(json.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPenugasan();
  }, [refreshKey]);
  const navigate = useNavigate(); 

  const getStatusStyle = (status: StatusPenugasan) => {
    switch (status) {
      case 'Menunggu Penugasan': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Ditugaskan': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Berjalan': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Menunggu Verifikasi': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'Selesai': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleTugaskan = (item: PenugasanData) => {
    setSelectedPenugasan(item);
    setIsTugaskanModalOpen(true);
  };

  // Navigasi ke Halaman Detail sambil MENGIRIMKAN STATUS
  const handleBukaDetail = (item: PenugasanData) => {
    const targetId = item.penugasan_id || item.id;
    navigate(`/admin/staff/monitoring/penugasan-pelaksanaan/detail/${targetId}`, { 
      state: { 
        status: item.status,
        jenisKegiatan: item.jenisKegiatan,
        data: item
      } 
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-8 bg-[#f8faf9] min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Penugasan Kegiatan</h1>
          <p className="text-sm text-gray-500">Kelola penugasan penyuluh untuk kegiatan validasi lokasi dan pelaksanaan penanaman.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        
        {/* TABS */}
        <div className="flex gap-6 px-6 border-b border-gray-100 pt-4 overflow-x-auto whitespace-nowrap">
          {['Semua', 'Validasi Lokasi', 'Pelaksanaan Penanaman'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold transition-colors border-b-2 cursor-pointer ${activeTab === tab ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FILTERS */}
        <div className="p-5 flex flex-col xl:flex-row gap-4 border-b border-gray-100 items-center justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full xl:flex-1">
            <div className="relative">
              <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Cari program, lokasi, atau penyuluh..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 bg-white appearance-none cursor-pointer">
              <option>Semua Wilayah</option>
            </select>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 bg-white appearance-none cursor-pointer">
              <option>Semua Status</option>
            </select>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 bg-white appearance-none cursor-pointer">
              <option>Semua Penyuluh</option>
            </select>
          </div>
          
          <div className="flex items-center gap-3 w-full xl:w-auto shrink-0 justify-end">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer">
              <HiOutlineArrowPath className="w-4 h-4" /> Reset
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer">
              <HiOutlineFunnel className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-gray-600 min-w-250 xl:min-w-full">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-4 py-4 whitespace-nowrap">No</th>
                <th className="px-4 py-4 whitespace-nowrap">Program</th>
                <th className="px-4 py-4 whitespace-nowrap">Lokasi</th>
                <th className="px-4 py-4 whitespace-nowrap">Jenis Kegiatan</th>
                <th className="px-4 py-4 whitespace-nowrap">Wilayah</th>
                <th className="px-4 py-4 whitespace-nowrap">Rencana/Periode</th>
                <th className="px-4 py-4 whitespace-nowrap">Penyuluh</th>
                <th className="px-4 py-4 whitespace-nowrap">Status</th>
                <th className="px-4 py-4 whitespace-nowrap">Tanggal Penugasan</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {penugasanData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 text-xs">{index + 1}</td>
                  <td className="px-4 py-4 text-gray-900 font-medium min-w-45 leading-snug">{item.program}</td>
                  <td className="px-4 py-4 text-xs min-w-40 leading-snug text-gray-600">{item.lokasi}</td>
                  <td className="px-4 py-4">
                    {item.jenisKegiatan === 'Validasi Lokasi' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 whitespace-nowrap">
                        <HiOutlineMapPin className="w-3.5 h-3.5" /> Validasi Lokasi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 whitespace-nowrap">
                        <SproutIcon className="w-3.5 h-3.5" /> Pelaksanaan Penanaman
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-xs whitespace-nowrap">{item.wilayah}</td>
                  <td className="px-4 py-4 text-xs whitespace-pre-line text-gray-500 leading-snug min-w-30">{item.rencanaPeriode}</td>
                  <td className="px-4 py-4 text-xs font-medium text-gray-700 whitespace-nowrap">{item.penyuluh}</td>
                  <td className="px-4 py-4">                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap ${getStatusStyle(item.status)}`}>
                      {item.status}

                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500 whitespace-nowrap">{item.tanggalPenugasan}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-3 whitespace-nowrap">
                      
                      {item.status === 'Menunggu Penugasan' && (
                        <button 
                          onClick={() => handleTugaskan(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#008A4B] hover:bg-emerald-800 text-white text-[11px] font-bold rounded-full transition-colors shadow-sm cursor-pointer"
                        >
                          <HiOutlineUserPlus className="w-3.5 h-3.5" /> Tugaskan
                        </button>
                      )}

                      {(item.status === 'Berjalan' || item.status === 'Menunggu Verifikasi' || item.status === 'Selesai' || item.status === 'Ditugaskan') && (
                        <button 
                          onClick={() => handleBukaDetail(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-[11px] font-bold rounded-full transition-colors shadow-sm cursor-pointer"
                        >
                          <HiOutlineEye className="w-3.5 h-3.5" /> Detail
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalBuatPenugasan isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <TugaskanModal 
        isOpen={isTugaskanModalOpen} 
        onClose={() => setIsTugaskanModalOpen(false)} 
        data={selectedPenugasan} 
        onSuccess={() => {
          setIsTugaskanModalOpen(false);
          setRefreshKey(prev => prev + 1);
        }}
      />

    </div>
  );
};

export default PenugasanPenyuluh;
