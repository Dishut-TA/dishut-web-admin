import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  HiOutlineBookmark,
  HiOutlineSquare3Stack3D,
  HiOutlineDocumentText,
  HiOutlineSparkles,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineMapPin,
  HiOutlineDocumentArrowDown,
  HiOutlineArrowPath,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineArrowLeft,
  HiPlay,
  HiCheckCircle,
  HiOutlineXMark,
  HiOutlineCamera,
  HiOutlineTrash,
  HiPaperAirplane
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

// ==========================================
// 1. DATA MOCKUP LENGKAP (Sesuai Tabel di index.tsx)
// ==========================================
const mockDatabase: Record<string, any> = {
  '1': {
    id: '1', status: 'Siap Dilaksanakan', idReferensi: 'ACT-2026-0001', jenisProgram: 'Donasi',
    namaProgram: 'Rehabilitasi Mangrove Karangsong', rencanaKegiatan: 'Penanaman Mangrove',
    tanggalRencana: '12 Juni 2026', pelaksana: 'Ahmad Fauzi (Staff PDAS)', lokasiSingkat: 'Desa Karangsong / Kec. Indramayu',
    tujuan: 'Pemulihan ekosistem pesisir dan penguatan kawasan mangrove', luasArea: '15 Ha', jumlahBibit: '12.000 bibit',
    estimasiPeserta: '35 orang', lokasiLengkap: 'Desa Karangsong, Kec. Indramayu, Kab. Indramayu, Jawa Barat',
    dokumen: [{ nama: 'Rencana Teknis Penanaman.pdf' }, { nama: 'Surat Tugas Penyuluh.pdf' }, { nama: 'Daftar Kebutuhan Bibit.xlsx' }]
  },
  '2': {
    id: '2', status: 'Berjalan', idReferensi: 'ACT-2026-0002', jenisProgram: 'APBD',
    namaProgram: 'Rehabilitasi DAS Cimanuk', rencanaKegiatan: 'Rehabilitasi Lahan Kritis',
    tanggalMulai: '10 Juni 2026', perkiraanSelesai: '20 Juni 2026', pelaksana: 'Siti Nurhaliza (Staff PDAS)', lokasiSingkat: 'Desa Rancabali / Kec. Rancabali',
    tujuan: 'Pencegahan erosi dan rehabilitasi lahan kritis DAS', luasArea: '20 Ha', jumlahBibit: '12.000 bibit',
    estimasiPeserta: '50 orang', lokasiLengkap: 'Desa Rancabali, Kec. Rancabali, Kab. Bandung, Jawa Barat',
    progress: { persentase: 35, tercapai: '4.200', target: '12.000' },
    dokumen: [{ nama: 'Rencana Teknis Penanaman.pdf' }, { nama: 'Daftar Kebutuhan Bibit.xlsx' }]
  },
  '3': {
    id: '3', status: 'Selesai', idReferensi: 'ACT-2026-0003', jenisProgram: 'CSR',
    namaProgram: 'Konservasi Mata Air Cisiuran', rencanaKegiatan: 'Konservasi Sumber Mata Air',
    tanggalMulai: '10 Juni 2026', tanggalSelesai: '20 Juni 2026', pelaksana: 'Dedi Kurniawan (Staff PDAS)', lokasiSingkat: 'Desa Cisarua / Kec. Pacet',
    tujuan: 'Menjaga debit air dan kelestarian sumber mata air warga', luasArea: '5 Ha', jumlahBibit: '12.000 bibit',
    estimasiPeserta: '25 orang', lokasiLengkap: 'Desa Cisarua, Kec. Pacet, Kab. Bandung, Jawa Barat',
    progress: { persentase: 100, tercapai: '12.000', target: '12.000' },
    dokumen: [{ nama: 'Laporan Akhir Kegiatan.pdf' }, { nama: 'Surat Tugas Penyuluh.pdf' }]
  },
  '4': {
    id: '4', status: 'Berjalan', idReferensi: 'ACT-2026-0004', jenisProgram: 'Donasi',
    namaProgram: 'Penghijauan Lahan Kritis Pangalengan', rencanaKegiatan: 'Penghijauan Area Kritis',
    tanggalMulai: '12 Juni 2026', perkiraanSelesai: '25 Juni 2026', pelaksana: 'Rina Marlina (Staff PDAS)', lokasiSingkat: 'Desa Pangalengan / Kec. Pangalengan',
    tujuan: 'Mengurangi potensi longsor dengan penghijauan vegetasi keras', luasArea: '10 Ha', jumlahBibit: '8.500 bibit',
    estimasiPeserta: '40 orang', lokasiLengkap: 'Desa Pangalengan, Kec. Pangalengan, Kab. Bandung, Jawa Barat',
    progress: { persentase: 60, tercapai: '5.100', target: '8.500' },
    dokumen: [{ nama: 'Rencana Teknis Penanaman.pdf' }, { nama: 'Surat Tugas Penyuluh.pdf' }]
  },
  '5': {
    id: '5', status: 'Siap Dilaksanakan', idReferensi: 'ACT-2026-0005', jenisProgram: 'APBD',
    namaProgram: 'Agroforestry Mandalakasih', rencanaKegiatan: 'Agroforestry Kopi',
    tanggalRencana: '15 Juni 2026', pelaksana: 'Agus Setiawan (Staff PDAS)', lokasiSingkat: 'Desa Mandalakasih / Kec. Pameungpeuk',
    tujuan: 'Pemberdayaan ekonomi warga melalui budidaya kopi di sela tegakan hutan', luasArea: '8 Ha', jumlahBibit: '5.000 bibit',
    estimasiPeserta: '20 orang', lokasiLengkap: 'Desa Mandalakasih, Kec. Pameungpeuk, Kab. Garut, Jawa Barat',
    dokumen: [{ nama: 'Rencana Teknis Penanaman.pdf' }, { nama: 'Daftar Kebutuhan Bibit.xlsx' }]
  },
  '6': {
    id: '6', status: 'Selesai', idReferensi: 'ACT-2026-0006', jenisProgram: 'CSR',
    namaProgram: 'Rehabilitasi Lahan Kritis Cisomang', rencanaKegiatan: 'Rehabilitasi Lahan Kritis',
    tanggalMulai: '01 Juni 2026', tanggalSelesai: '15 Juni 2026', pelaksana: 'Yudi Hartono (Staff PDAS)', lokasiSingkat: 'Desa Cisomang / Kec. Cikalong Wetan',
    tujuan: 'Perbaikan struktur tanah dan pencegahan pergerakan tanah', luasArea: '12 Ha', jumlahBibit: '9.000 bibit',
    estimasiPeserta: '45 orang', lokasiLengkap: 'Desa Cisomang, Kec. Cikalong Wetan, Kab. Bandung Barat, Jawa Barat',
    progress: { persentase: 100, tercapai: '9.000', target: '9.000' },
    dokumen: [{ nama: 'Laporan Akhir Penanaman.pdf' }, { nama: 'Dokumentasi Lapangan.pdf' }]
  },
  '7': {
    id: '7', status: 'Siap Dilaksanakan', idReferensi: 'ACT-2026-0007', jenisProgram: 'Donasi',
    namaProgram: 'Konservasi Sempadan Sungai Cibeetis', rencanaKegiatan: 'Penanaman Vegetasi Sempadan Sungai',
    tanggalRencana: '16 Juni 2026', pelaksana: 'Ahmad Fauzi (Staff PDAS)', lokasiSingkat: 'Desa Cibeetis / Kec. Ciwidey',
    tujuan: 'Mencegah abrasi sungai dan menjaga kualitas air', luasArea: '4 Ha', jumlahBibit: '3.000 bibit',
    estimasiPeserta: '15 orang', lokasiLengkap: 'Desa Cibeetis, Kec. Ciwidey, Kab. Bandung, Jawa Barat',
    dokumen: [{ nama: 'Rencana Teknis Penanaman.pdf' }]
  },
  '8': {
    id: '8', status: 'Berjalan', idReferensi: 'ACT-2026-0008', jenisProgram: 'APBD',
    namaProgram: 'Rehabilitasi Mangrove Muara Gembong', rencanaKegiatan: 'Penanaman Mangrove',
    tanggalMulai: '15 Juni 2026', perkiraanSelesai: '30 Juni 2026', pelaksana: 'Siti Nurhaliza (Staff PDAS)', lokasiSingkat: 'Desa Pantai Bakti / Kec. Muara Gembong',
    tujuan: 'Perluasan sabuk hijau pelindung pantai dan habitat satwa liar', luasArea: '25 Ha', jumlahBibit: '20.000 bibit',
    estimasiPeserta: '60 orang', lokasiLengkap: 'Desa Pantai Bakti, Kec. Muara Gembong, Kab. Bekasi, Jawa Barat',
    progress: { persentase: 20, tercapai: '4.000', target: '20.000' },
    dokumen: [{ nama: 'Rencana Teknis Penanaman.pdf' }, { nama: 'Daftar Kebutuhan Bibit.xlsx' }, { nama: 'Surat Tugas Penyuluh.pdf' }]
  }
};

// ==========================================
// 2. KOMPONEN MODAL FORM INPUT PROGRESS
// ==========================================
interface FotoProgres { id: string; file: File; preview: string; keterangan: 'Sebelum' | 'Sesudah'; }

const InputProgressModal = ({ isOpen, onClose, namaProgram }: { isOpen: boolean, onClose: () => void, namaProgram: string }) => {
  const [formData, setFormData] = useState({ tanggal: '', totalBibit: '', koordinat: '', kondisi: '', kendala: '' });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [fotos, setFotos] = useState<FotoProgres[]>([]);

  if (!isOpen) return null;

  const handleGetLocation = () => {
    if (!("geolocation" in navigator)) { toast.error('GPS tidak didukung browser ini.'); return; }
    setIsGettingLocation(true);
    const loading = toast.loading('Mencari koordinat...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData(prev => ({ ...prev, koordinat: `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}` }));
        toast.success('Koordinat didapatkan!', { id: loading });
        setIsGettingLocation(false);
      },
      () => { toast.error('Gagal mendapatkan lokasi.', { id: loading }); setIsGettingLocation(false); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(7), file, preview: URL.createObjectURL(file), keterangan: 'Sebelum' as const
      }));
      setFotos(prev => [...prev, ...newFiles]);
    }
    e.target.value = ''; 
  };

  const handleRemoveFoto = (id: string) => setFotos(prev => prev.filter(f => f.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tanggal || !formData.totalBibit || !formData.koordinat || !formData.kondisi) {
      toast.error('Lengkapi semua kolom wajib!'); return;
    }
    if (fotos.length === 0) { toast.error('Minimal unggah 1 foto!'); return; }
    toast.success('Progress berhasil dilaporkan!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Input Progress: <span className="text-emerald-600">{namaProgram}</span></h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Dokumentasi Lapangan <span className="text-red-500">*</span></label>
            <div className="relative w-full mb-4">
              <input type="file" multiple id="foto-upload" className="hidden" accept="image/*" onChange={handleFotoChange} />
              <label htmlFor="foto-upload" className="flex flex-col items-center justify-center w-full py-6 bg-emerald-50/50 border-2 border-dashed border-emerald-200 rounded-xl cursor-pointer hover:bg-emerald-50 transition-all">
                <HiOutlineCamera className="w-8 h-8 text-emerald-600 mb-2" />
                <span className="text-sm font-bold text-gray-800">Klik untuk memilih foto</span>
              </label>
            </div>
            {fotos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {fotos.map((foto) => (
                  <div key={foto.id} className="relative rounded-xl overflow-hidden border border-gray-200 group h-32">
                    <img src={foto.preview} className="w-full h-full object-cover" alt="Preview" />
                    <button type="button" onClick={() => handleRemoveFoto(foto.id)} className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal <span className="text-red-500">*</span></label>
              <input type="date" value={formData.tanggal} onChange={e => setFormData({...formData, tanggal: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Total Bibit (Hari Ini) <span className="text-red-500">*</span></label>
              <input type="number" value={formData.totalBibit} onChange={e => setFormData({...formData, totalBibit: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Koordinat Aktual <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <input type="text" value={formData.koordinat} onChange={e => setFormData({...formData, koordinat: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-emerald-500" />
                <button type="button" onClick={handleGetLocation} disabled={isGettingLocation} className="px-3 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-100 hover:bg-emerald-100 shrink-0">
                  <HiOutlineMapPin className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Kondisi Lapangan <span className="text-red-500">*</span></label>
              <input type="text" value={formData.kondisi} onChange={e => setFormData({...formData, kondisi: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Kendala (Opsional)</label>
            <input type="text" value={formData.kendala} onChange={e => setFormData({...formData, kendala: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500" />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 shadow-sm flex items-center gap-2">
              <HiPaperAirplane className="w-4 h-4 -rotate-45" /> Kirim Progress
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 3. KOMPONEN HALAMAN DETAIL UTAMA
// ==========================================
const InputProgresPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Ambil data berdasarkan ID (fallback ke '1' / Siap Dilaksanakan jika ID tidak valid)
  const activeId = id && mockDatabase[id] ? id : '1'; 
  const data = mockDatabase[activeId];

  // Helper Styles Dinamis
  const getBadgeStyle = () => {
    if (data.status === 'Siap Dilaksanakan') return 'bg-blue-50 text-blue-600 border-blue-200';
    if (data.status === 'Berjalan') return 'bg-orange-50 text-orange-600 border-orange-200';
    return 'bg-emerald-50 text-emerald-600 border-emerald-200';
  };

  const getJenisProgramStyle = (jenis: string) => {
    if (jenis === 'Donasi') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    if (jenis === 'APBD') return 'bg-blue-50 text-blue-700 border-blue-100';
    if (jenis === 'CSR') return 'bg-orange-50 text-orange-700 border-orange-100';
    return 'bg-gray-50 text-gray-700 border-gray-100';
  };

  const getTimelineStatus = (step: number) => {
    if (data.status === 'Selesai') return 'done'; // Semua hijau
    if (data.status === 'Siap Dilaksanakan') return step === 1 ? 'current-blue' : 'pending';
    if (data.status === 'Berjalan') {
      if (step <= 2) return 'done';
      if (step === 3) return 'current-blue';
      return 'warning-orange';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 bg-[#f8faf9] min-h-screen">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Detail Pelaksanaan Kegiatan</h1>
      </div>

      {/* TOP CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-8">
        {/* Kiri */}
        <div className="flex-1 space-y-4 md:border-r border-gray-100 md:pr-8">
          <div className="flex items-center gap-4">
            <HiOutlineBookmark className="w-5 h-5 text-gray-400" />
            <div className="flex-1 flex justify-between items-center text-sm">
              <span className="text-gray-500">ID Referensi</span>
              <span className="font-bold text-gray-900">:<span className="ml-4">{data.idReferensi}</span></span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <HiOutlineSquare3Stack3D className="w-5 h-5 text-gray-400" />
            <div className="flex-1 flex justify-between items-center text-sm">
              <span className="text-gray-500">Jenis Program</span>
              <div className="flex-1 text-right flex justify-start ml-2 w-40">
                :<span className={`ml-4 px-2.5 py-0.5 border text-xs font-bold rounded ${getJenisProgramStyle(data.jenisProgram)}`}>
                  {data.jenisProgram}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <HiOutlineDocumentText className="w-5 h-5 text-gray-400" />
            <div className="flex-1 flex justify-between items-center text-sm">
              <span className="text-gray-500">Nama Program</span>
              <span className="font-bold text-gray-900">:<span className="ml-4">{data.namaProgram}</span></span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <HiOutlineSparkles className="w-5 h-5 text-gray-400" />
            <div className="flex-1 flex justify-between items-center text-sm">
              <span className="text-gray-500">Rencana Kegiatan</span>
              <span className="font-bold text-gray-900">:<span className="ml-4">{data.rencanaKegiatan}</span></span>
            </div>
          </div>
        </div>

        {/* Kanan */}
        <div className="flex-1 space-y-4 pt-4 md:pt-0">
          <div className="mb-6">
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 border rounded-lg text-sm font-bold ${getBadgeStyle()}`}>
              {data.status === 'Berjalan' && <HiOutlineClock className="w-5 h-5" />}
              {data.status === 'Siap Dilaksanakan' && <HiOutlineCalendar className="w-5 h-5" />}
              {data.status === 'Selesai' && <HiOutlineCheckCircle className="w-5 h-5" />}
              {data.status}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <HiOutlineCalendar className="w-5 h-5 text-gray-400 shrink-0" />
            <div className="flex-1 flex flex-col gap-2 text-sm">
              {data.status === 'Siap Dilaksanakan' ? (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Tanggal Rencana</span>
                  <span className="font-bold text-gray-900">:<span className="ml-4">{data.tanggalRencana}</span></span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Tanggal Mulai</span>
                    <span className="font-bold text-gray-900">:<span className="ml-4">{data.tanggalMulai}</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">{data.status === 'Selesai' ? 'Tanggal Selesai' : 'Perkiraan Selesai'}</span>
                    <span className="font-bold text-gray-900">:<span className="ml-4">{data.perkiraanSelesai || data.tanggalSelesai}</span></span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4">
            <HiOutlineUser className="w-5 h-5 text-gray-400 shrink-0" />
            <div className="flex-1 flex justify-between items-center text-sm">
              <span className="text-gray-500">Pelaksana</span>
              <span className="font-bold text-gray-900">:<span className="ml-4">{data.pelaksana}</span></span>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <HiOutlineMapPin className="w-5 h-5 text-gray-400 shrink-0" />
            <div className="flex-1 flex justify-between items-center text-sm">
              <span className="text-gray-500">Lokasi</span>
              <span className="font-bold text-gray-900">:<span className="ml-4">{data.lokasiSingkat}</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KOLOM KIRI */}
        <div className="space-y-6">
          {/* Info Kegiatan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-6">Informasi Kegiatan</h3>
            <div className="space-y-4 text-sm divide-y divide-gray-50">
              {[
                { label: 'Nama Program', val: data.namaProgram },
                { label: 'Jenis Program', val: <span className={`px-2 py-0.5 border text-xs font-bold rounded ${getJenisProgramStyle(data.jenisProgram)}`}>{data.jenisProgram}</span> },
                { label: 'Rencana Kegiatan', val: data.rencanaKegiatan },
                { label: 'Tujuan', val: data.tujuan },
                { label: 'Luas Area', val: data.luasArea },
                { label: 'Jumlah Bibit', val: data.jumlahBibit },
                { label: 'Estimasi Peserta', val: data.estimasiPeserta },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-start py-2.5 first:pt-0 last:pb-0">
                  <span className="text-gray-500 w-1/3">{item.label}</span>
                  <span className="text-gray-800 font-medium w-2/3 text-left">:<span className="ml-4">{item.val}</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* Jadwal Pelaksanaan / Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-6">Jadwal Pelaksanaan</h3>
            <div className="relative pl-4 space-y-8 border-l-2 border-gray-100 ml-4">
              
              {[
                { step: 1, title: 'Persiapan Lapangan', date: '10 Juni 2026', icon: <HiOutlineDocumentText className="w-5 h-5" /> },
                { step: 2, title: 'Distribusi Bibit', date: '11 Juni 2026', icon: <HiOutlineSparkles className="w-5 h-5" /> },
                { step: 3, title: 'Pelaksanaan Penanaman', date: '12 Juni 2026', icon: <HiOutlineCheckCircle className="w-5 h-5" /> },
                { step: 4, title: 'Monitoring Awal', date: '19 Juni 2026', icon: <HiOutlineClock className="w-5 h-5" /> },
              ].map((item, i) => {
                const status = getTimelineStatus(item.step);
                let colorClass = 'bg-white border-gray-300 text-gray-400';
                let textClass = 'text-gray-500';
                
                if (status === 'done') { colorClass = 'bg-emerald-600 border-emerald-600 text-white'; textClass = 'text-gray-900 font-medium'; }
                else if (status === 'current-blue') { colorClass = 'bg-blue-50 border-blue-500 text-blue-600'; textClass = 'text-blue-700 font-bold'; }
                else if (status === 'warning-orange') { colorClass = 'bg-white border-orange-400 text-orange-500'; textClass = 'text-gray-900 font-medium'; }

                return (
                  <div key={i} className="relative flex items-center justify-between">
                    <div className={`absolute -left-6.25 w-3 h-3 rounded-full border-2 ${status === 'done' ? 'bg-emerald-600 border-emerald-600' : status === 'current-blue' ? 'bg-blue-600 border-blue-600' : status === 'warning-orange' ? 'bg-orange-400 border-white ring-2 ring-orange-400' : 'bg-gray-200 border-white ring-2 ring-gray-200'}`}></div>
                    
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl border ${colorClass} ${status === 'current-blue' ? 'bg-blue-50' : 'bg-white shadow-sm'}`}>
                         {status === 'done' ? <HiCheckCircle className="w-5 h-5 text-emerald-600" /> : item.icon}
                      </div>
                      <span className={`text-sm ${textClass}`}>{item.title}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><HiOutlineCalendar className="w-4 h-4" /> {item.date}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div className="space-y-6">
          {/* Info Lokasi (Map) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Informasi Lokasi</h3>
            <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200 mb-4">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" alt="Map Area" className="w-full h-full object-cover opacity-60" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 shadow-sm">
                {data.lokasiSingkat}
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <HiOutlineMapPin className="w-10 h-10 text-blue-600 drop-shadow-md fill-blue-100" />
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-600 font-medium">
              <HiOutlineMapPin className="w-5 h-5 shrink-0 text-gray-800" />
              {data.lokasiLengkap}
            </div>
          </div>

          {/* Dokumen & Lampiran */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Dokumen & Lampiran</h3>
            <div className="space-y-3">
              {data.dokumen.map((doc: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    {doc.nama.includes('pdf') ? (
                       <div className="p-1.5 bg-red-100 text-red-600 rounded-md font-bold text-[10px]">PDF</div>
                    ) : (
                       <div className="p-1.5 bg-green-100 text-green-600 rounded-md font-bold text-[10px]">XLSX</div>
                    )}
                    <span className="text-sm font-medium text-gray-700">{doc.nama}</span>
                  </div>
                  <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors">
                    <HiOutlineDocumentArrowDown className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* AKSI TOMBOL */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Aksi</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              
              {data.status === 'Siap Dilaksanakan' && (
                <>
                  <button onClick={() => navigate(`/admin/penyuluh/pelaksanaan-penanaman/mulai/${data.id}`)}className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg shadow-sm">
                        <HiPlay className="w-5 h-5" /> Mulai Kegiatan
                      </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-sm font-bold rounded-lg">
                    <HiOutlineCalendar className="w-5 h-5" /> Ubah Jadwal
                  </button>
                </>
              )}

              {data.status === 'Berjalan' && (
                <>
                  <button onClick={() => setIsModalOpen(true)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg shadow-sm">
                    <HiPlay className="w-5 h-5" /> Input Progress
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-sm font-bold rounded-lg">
                    <HiOutlineCheckCircle className="w-5 h-5" /> Selesaikan Kegiatan
                  </button>
                </>
              )}

              {data.status === 'Selesai' && (
                <>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg shadow-sm">
                    <HiOutlineDocumentText className="w-5 h-5" /> Lihat Laporan
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-sm font-bold rounded-lg">
                    <HiOutlineCamera className="w-5 h-5" /> Lihat Dokumentasi
                  </button>
                </>
              )}

              <button onClick={() => navigate(-1)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-bold rounded-lg">
                <HiOutlineArrowLeft className="w-4 h-4" /> Kembali
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER BAWAH (Dinamis) */}
      <div className={`mt-6 rounded-2xl p-5 border flex flex-col md:flex-row items-center justify-between gap-6 ${data.status === 'Selesai' ? 'bg-emerald-50/50 border-emerald-200' : 'bg-[#f0f9f3] border-[#DCECE0]'}`}>
        
        <div className="flex items-start gap-3">
          {data.status === 'Selesai' ? (
             <HiCheckCircle className="w-7 h-7 text-emerald-600 shrink-0" />
          ) : (
             <HiOutlineArrowPath className="w-7 h-7 text-emerald-600 shrink-0" />
          )}
          <div>
            <h4 className="text-sm font-bold text-emerald-800">
              {data.status === 'Siap Dilaksanakan' ? 'Informasi Update Terakhir' : 'Informasi Update Terkini'}
            </h4>
            <p className="text-sm text-emerald-700 mt-1">
              {data.status === 'Siap Dilaksanakan' && 'Diperbarui oleh Ahmad Fauzi (Staff PDAS)'}
              {data.status === 'Berjalan' && 'Progress kegiatan sedang berjalan. Silakan input progress secara berkala.'}
              {data.status === 'Selesai' && 'Kegiatan telah selesai dilaksanakan dengan hasil sesuai rencana.'}
            </p>
          </div>
        </div>

        {data.status !== 'Siap Dilaksanakan' && (
          <div className="w-full md:w-1/3 flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold text-emerald-800">
              <span>Progress Kegiatan</span>
              <span>{data.progress?.persentase}% ({data.progress?.tercapai} / {data.progress?.target} bibit)</span>
            </div>
            <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${data.progress?.persentase}%` }}></div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 text-emerald-800 text-left md:text-right text-sm border-l border-emerald-200/50 pl-6 w-full md:w-auto">
          <HiOutlineCalendar className="w-5 h-5 opacity-70 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">16 Juni 2026, 09:45 WIB</p>
            <p className="opacity-80 text-xs mt-0.5">
               {data.status === 'Siap Dilaksanakan' ? 'Status kegiatan siap dilaksanakan.' : 
                data.status === 'Berjalan' ? 'Terakhir diinput oleh Ahmad Fauzi\nStatus kegiatan sedang berjalan.' : 
                'Kegiatan telah selesai dilaksanakan.\nStatus kegiatan telah selesai.'}
            </p>
          </div>
        </div>
      </div>

      <InputProgressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} namaProgram={data.namaProgram} />
    </div>
  );
};

export default InputProgresPage;