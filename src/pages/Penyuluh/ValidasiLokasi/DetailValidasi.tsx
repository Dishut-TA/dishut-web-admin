import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  HiChevronRight,
  HiOutlineArrowLeft,
  HiCheckCircle,
  HiXCircle,
  HiOutlinePencilSquare,
  HiOutlineClock
} from 'react-icons/hi2';

// ==========================================
// 1. DATA MOCKUP (Disesuaikan dengan ID di tabel index.tsx)
// ==========================================
const mockDatabase: Record<string, any> = {
  // Contoh Data: SESUAI (Sama dengan tabel baris no 3)
  'TGS-2026-009': {
    id: 'TGS-2026-009',
    statusValidasi: 'Sesuai',
    sumberLokasi: 'Analisis CPI',
    lokasi: 'Desa Cisiuran, Kec. Pamulihan, Kab. Garut',
    batasWaktu: '22 Juni 2026',
    sisaHari: '(6 hari lagi)',
    sisaHariColor: 'text-orange-500',
    idProgram: 'PRG-2026-009',
    tanggalPenugasan: '05 Juni 2026',
    petugasPenugasan: 'Staff PDAS',
    periodePenugasan: '01/01/2026 - 31/12/2026',
    tanggalValidasi: '12 Juni 2026',
    deskripsi: 'Lokasi sesuai dengan penugasan. Kondisi akses baik dan layak untuk dilanjutkan ke tahap pelaksanaan kegiatan.',
    akurasi: '3.2 m',
    catatan: 'Tidak ada catatan tambahan.',
    lintang: '-7.7245678',
    bujur: '107.8501234',
    validator: 'Imas Rohmayati, S.P., M.P.',
    jabatan: 'Penyuluh Kehutanan Ahli Madya',
    foto: [
      'https://placehold.co/400x300/185325/ffffff?text=Jalan+Akses',
      'https://placehold.co/400x300/185325/ffffff?text=Plang+Lokasi',
      'https://placehold.co/400x300/185325/ffffff?text=Kondisi+Lahan'
    ]
  },
  // Contoh Data: TIDAK SESUAI (Disesuaikan dengan tabel baris no 6)
  'TGS-2026-008': {
    id: 'TGS-2026-008',
    statusValidasi: 'Tidak Sesuai',
    sumberLokasi: 'Analisis CPI',
    lokasi: 'Desa Sukalaksana, Kec. Cibatu, Kab. Garut',
    batasWaktu: '05 Juli 2026',
    sisaHari: '(19 hari lagi)',
    sisaHariColor: 'text-orange-500',
    idProgram: 'PRG-2026-012',
    tanggalPenugasan: '07 Juni 2026',
    petugasPenugasan: 'Staff PDAS',
    periodePenugasan: '01/01/2026 - 31/12/2026',
    tanggalValidasi: '12 Juni 2026',
    deskripsi: 'Lokasi yang ditemukan di lapangan tidak sesuai dengan lokasi yang ditugaskan atau tidak layak untuk dilanjutkan.',
    akurasi: '14.7 m',
    catatan: 'Akses menuju lokasi sangat sulit dilalui kendaraan. Koordinat berbeda cukup jauh dari yang ditugaskan dan kondisi lahan tidak sesuai untuk kegiatan.',
    lintang: '-7.3124578',
    bujur: '108.1124032',
    validator: 'Imas Rohmayati, S.P., M.P.',
    jabatan: 'Penyuluh Kehutanan Ahli Madya',
    foto: [
      'https://placehold.co/400x300/7f1d1d/ffffff?text=Jalan+Rusak',
      'https://placehold.co/400x300/7f1d1d/ffffff?text=Plang+Lokasi',
      'https://placehold.co/400x300/7f1d1d/ffffff?text=Lahan+Kering'
    ]
  }
};

// ==========================================
// 2. KOMPONEN HALAMAN
// ==========================================
const DetailValidasi: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mengambil ID dari URL, jika tidak ada/tidak cocok, default ke TGS-2026-009
  const activeId = id || 'TGS-2026-009'; 
  const data = mockDatabase[activeId] || mockDatabase['TGS-2026-009'];

  // Variabel Dinamis Warna & Icon Berdasarkan Status
  const isSesuai = data.statusValidasi === 'Sesuai';
  const statusColors = {
    bgLight: isSesuai ? 'bg-emerald-50' : 'bg-red-50',
    textMain: isSesuai ? 'text-emerald-600' : 'text-red-600',
    borderLight: isSesuai ? 'border-emerald-100' : 'border-red-100',
    Icon: isSesuai ? HiCheckCircle : HiXCircle,
    badgeSrc: data.sumberLokasi === 'Analisis CPI' ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-50 text-indigo-600' 
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 bg-[#f8faf9] min-h-screen">
      
      {/* Header & Breadcrumb */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Detail Validasi Lokasi</h1>
      </div>

      {/* Card 1: Ringkasan Atas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        
        <div className="pr-6">
          <p className="text-xs font-bold text-gray-500 mb-2">Status Validasi</p>
          <div className={`inline-flex items-center gap-2 px-4 py-2 ${statusColors.bgLight} ${statusColors.textMain} ${statusColors.borderLight} border rounded-lg font-bold text-sm uppercase tracking-wide`}>
            <statusColors.Icon className="w-5 h-5" />
            {data.statusValidasi}
          </div>
        </div>

        <div className="pt-4 md:pt-0 md:px-6">
          <p className="text-xs font-bold text-gray-500 mb-1">ID Penugasan</p>
          <p className="font-bold text-gray-900 text-base">{data.id}</p>
        </div>

        <div className="pt-4 md:pt-0 md:px-6">
          <p className="text-xs font-bold text-gray-500 mb-2">Sumber Lokasi</p>
          <span className={`px-3 py-1 text-xs font-bold rounded-md ${statusColors.badgeSrc}`}>
            {data.sumberLokasi}
          </span>
        </div>

        <div className="pt-4 md:pt-0 md:px-6 flex-1">
          <p className="text-xs font-bold text-gray-500 mb-1">Lokasi</p>
          <p className="font-bold text-gray-900 text-sm leading-snug">{data.lokasi}</p>
        </div>

        <div className="pt-4 md:pt-0 pl-0 md:pl-6">
          <p className="text-xs font-bold text-gray-500 mb-1">Batas Waktu Validasi</p>
          <p className="font-bold text-gray-900 text-sm">{data.batasWaktu}</p>
          <p className={`text-xs font-bold mt-0.5 ${data.sisaHariColor}`}>{data.sisaHari}</p>
        </div>
      </div>

      {/* Card 2: Informasi Penugasan */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-6">Informasi Penugasan</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-bold text-gray-500 mb-1">ID Program</p>
            <p className="font-bold text-gray-900 text-sm">{data.idProgram}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 mb-1">Tanggal Penugasan</p>
            <p className="font-bold text-gray-900 text-sm">{data.tanggalPenugasan}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 mb-1">Petugas Penugasan</p>
            <p className="font-bold text-gray-900 text-sm">{data.petugasPenugasan}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 mb-1">Periode Penugasan</p>
            <p className="font-bold text-gray-900 text-sm">{data.periodePenugasan}</p>
          </div>
        </div>
      </div>

      {/* Card 3: Hasil Validasi Lokasi */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-6">Hasil Validasi Lokasi</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Kiri */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-bold text-gray-800 mb-1">Tanggal Validasi</p>
              <p className="text-sm text-gray-600">{data.tanggalValidasi}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 mb-1">Deskripsi Hasil Validasi</p>
              <p className="text-sm text-gray-600 leading-relaxed">{data.deskripsi}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 mb-2">Akurasi (meter)</p>
              <input type="text" readOnly value={data.akurasi} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 mb-1">Catatan (Opsional)</p>
              <p className="text-sm text-gray-600 leading-relaxed">{data.catatan}</p>
            </div>
          </div>

          {/* Kanan */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <p className="text-xs font-bold text-gray-800">Koordinat Lokasi</p>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Lintang</p>
                    <input type="text" readOnly value={data.lintang} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Bujur</p>
                    <input type="text" readOnly value={data.bujur} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none" />
                  </div>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-800 mb-1">Validator</p>
                  <p className="text-sm font-bold text-gray-900">{data.validator}</p>
                  <p className="text-xs text-gray-500">{data.jabatan}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 mb-2">Status Validasi</p>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-md ${statusColors.bgLight} ${statusColors.textMain}`}>
                    <statusColors.Icon className="w-3.5 h-3.5" /> {data.statusValidasi}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-800 mb-3">Dokumentasi Lokasi</p>
              <div className="flex flex-wrap gap-4 mb-3">
                {data.foto.map((src: string, idx: number) => (
                  <div key={idx} className="w-40 h-28 rounded-lg overflow-hidden border border-gray-200">
                    <img src={src} alt={`Dokumentasi ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                Lihat semua foto ({data.foto.length}) <HiChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Card 4: Riwayat Update */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-6">Riwayat Update</h2>
        
        <div className="relative pl-3">
          <div className="absolute left-5.25 top-4 bottom-4 w-0.5 bg-gray-200"></div>

          <div className="relative flex gap-4 mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white ${isSesuai ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
               <statusColors.Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Validasi Dinyatakan {data.statusValidasi}</h4>
                <p className="text-xs text-gray-500 mt-1">{isSesuai ? 'Lokasi dinyatakan sesuai dengan penugasan.' : 'Lokasi tidak sesuai atau tidak layak untuk dilanjutkan.'}</p>
                <p className="text-xs text-gray-400 mt-1">{data.validator} (Penyuluh)</p>
              </div>
              <p className="text-xs text-gray-500 font-medium whitespace-nowrap">{data.tanggalValidasi}, 09:25 WIB</p>
            </div>
          </div>

          <div className="relative flex gap-4 mb-8">
            <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0 z-10 border-4 border-white">
               <HiOutlinePencilSquare className="w-4 h-4" />
            </div>
            <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Validasi Lokasi Dilakukan</h4>
                <p className="text-xs text-gray-500 mt-1">Data validasi lokasi telah diisi dan disimpan.</p>
                <p className="text-xs text-gray-400 mt-1">{data.validator} (Penyuluh)</p>
              </div>
              <p className="text-xs text-gray-500 font-medium whitespace-nowrap">12 Juni 2026, 09:10 WIB</p>
            </div>
          </div>

          <div className="relative flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 z-10 border-4 border-white">
               <HiOutlineClock className="w-4 h-4" />
            </div>
            <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Penugasan Diterima</h4>
                <p className="text-xs text-gray-500 mt-1">Anda menerima penugasan lokasi dari {data.sumberLokasi}.</p>
                <p className="text-xs text-gray-400 mt-1">{data.validator} (Penyuluh)</p>
              </div>
              <p className="text-xs text-gray-500 font-medium whitespace-nowrap">{data.tanggalPenugasan}, 10:30 WIB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-2">
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <HiOutlineArrowLeft className="w-4 h-4" strokeWidth={2} /> Kembali ke Daftar
        </button>
      </div>

    </div>
  );
};

export default DetailValidasi;