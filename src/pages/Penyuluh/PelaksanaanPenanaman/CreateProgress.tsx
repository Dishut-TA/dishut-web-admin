import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  HiOutlineArrowLeft,
  HiOutlineDocumentText,
  HiOutlineMapPin,
  HiOutlineBookOpen,
  HiOutlineInformationCircle,
  HiOutlineCalendar,
  HiCheckCircle,
  HiChevronRight,
  HiOutlineEye,
  HiOutlineClock
} from 'react-icons/hi2';

// --- CUSTOM ICONS ---
const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 20.001c-1.25.687-2.78-.217-2.78-1.643V5.653z" />
  </svg>
);

const TargetIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
  </svg>
);

const PuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const SeedlingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0a4 4 0 10-8 0v4a4 4 0 008 0zm0 0a4 4 0 118 0v4a4 4 0 01-8 0z" />
  </svg>
);

// ==========================================
// 1. DATA MOCKUP LENGKAP
// ==========================================
const mockDatabase: Record<string, any> = {
  '1': {
    id: '1', status: 'Ditugaskan', idPenugasan: 'TGS-2026-021', idProgram: 'PRG-2026-0021',
    sumberLokasi: 'Analisis CPI', periodeMulai: '20 Jun 2026', periodeSelesai: '05 Jul 2026',
    namaProgram: 'Rehabilitasi DAS Cimanuk', lokasi: 'Desa Sukamukti, Kec. Pacet,\nKab. Cianjur',
    penyuluh: 'Rina Herlina, S.Hut.', kth: 'KTH Mekar Jaya', targetBibit: '500 bibit',
    luasArea: '10 Ha', rencanaKegiatan: 'Penanaman Mangrove', totalPu: '10 PU',
    estimasiPerPu: '±50 bibit', hasilValidasi: 'Sesuai', tanggalValidasi: '18 Jun 2026',
    koordinat: '-7.2145678, 107.8501234',
    kondisiUmum: 'Lokasi sesuai untuk kegiatan penanaman. Akses menuju lokasi tergolong memadai dan masyarakat sekitar mendukung rencana pelaksanaan kegiatan.',
    catatan: 'Penanaman direkomendasikan pada awal musim hujan agar pertumbuhan optimal. Area dinyatakan layak untuk pelaksanaan kegiatan.'
  },
  '2': {
    id: '2', status: 'Berjalan', idPenugasan: 'TGS-2026-018', idProgram: 'PRG-2026-0018',
    sumberLokasi: 'Proposal CSR', periodeMulai: '18 Jun 2026', periodeSelesai: '03 Jul 2026',
    namaProgram: 'Rehabilitasi DAS Cisangkuy', lokasi: 'Desa Mandalakasih, Kec. Pameungpeuk,\nKab. Garut',
    penyuluh: 'Ahmad Fauzi, SP', kth: 'KTH Lestari', targetBibit: '600 bibit',
    luasArea: '12 Ha', rencanaKegiatan: 'Penanaman Mangrove', totalPu: '12 PU',
    estimasiPerPu: '±50 bibit', hasilValidasi: 'Sesuai', tanggalValidasi: '15 Jun 2026',
    koordinat: '-7.6321456, 107.6587921',
    kondisiUmum: 'Kondisi lahan berpasir, perlu penyesuaian jenis bibit yang ditanam. Masyarakat antusias.',
    catatan: 'Telah divalidasi dan siap untuk dibentuk poligon PU.'
  },
  '4': {
    id: '4', status: 'Selesai', idPenugasan: 'TGS-2026-014', idProgram: 'PRG-2026-0012',
    sumberLokasi: 'Analisis CPI', periodeMulai: '01 Jun 2026', periodeSelesai: '15 Jun 2026',
    namaProgram: 'Rehabilitasi DAS Cidurian', lokasi: 'Desa Mekarsari, Kec. Ibun,\nKab. Bandung',
    penyuluh: 'Budi Santoso, S.Hut.', kth: 'KTH Suka Alam', targetBibit: '700 bibit',
    luasArea: '14 Ha', rencanaKegiatan: 'Penanaman Mangrove', totalPu: '14 PU',
    estimasiPerPu: '±50 bibit', hasilValidasi: 'Sesuai', tanggalValidasi: '28 Mei 2026',
    koordinat: '-7.102345, 107.452312',
    kondisiUmum: 'Lokasi telah ditanami seluruhnya sesuai dengan target PU.',
    catatan: 'Kegiatan penanaman selesai 100% tanpa kendala.'
  }
};

// ==========================================
// 2. KOMPONEN HALAMAN DETAIL UTAMA
// ==========================================
const InputProgresPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Ambil data berdasarkan ID (fallback ke '1' jika tidak ada)
  const activeId = id && mockDatabase[id] ? id : '1';
  const data = mockDatabase[activeId];

  // Helper Warna Status Badge Atas
  const getBadgeStyle = (status: string) => {
    if (status === 'Ditugaskan') return 'bg-yellow-50 text-yellow-600';
    if (status === 'Berjalan') return 'bg-blue-50 text-blue-600';
    if (status === 'Selesai') return 'bg-emerald-50 text-emerald-600';
    return 'bg-slate-50 text-slate-600';
  };

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen font-sans text-slate-800 pb-24">

      <div className="max-w-[1600px] mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Detail Penugasan Pelaksanaan</h1>
          <p className="text-sm text-slate-500">Periksa informasi penugasan dan hasil validasi lokasi sebelum memulai pelaksanaan kegiatan.</p>
        </div>

        {/* TOP BANNER */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 py-5 px-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-x divide-slate-100">
            <div>
              <p className="text-xs text-slate-500 mb-2">Status Penugasan</p>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${getBadgeStyle(data.status)}`}>
                <HiCheckCircle className="w-4 h-4" /> {data.status}
              </span>
            </div>
            <div className="pl-6">
              <p className="text-xs text-slate-500 mb-2">ID Penugasan</p>
              <p className="text-base font-bold text-slate-900">{data.idPenugasan}</p>
            </div>
            <div className="pl-6">
              <p className="text-xs text-slate-500 mb-2">ID Program</p>
              <p className="text-base font-bold text-slate-900">{data.idProgram}</p>
            </div>
            <div className="pl-6">
              <p className="text-xs text-slate-500 mb-2">Sumber Lokasi</p>
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-600">{data.sumberLokasi}</span>
            </div>
            <div className="pl-6">
              <p className="text-xs text-slate-500 mb-2">Periode Pelaksanaan</p>
              <p className="text-sm font-bold text-slate-900">{data.periodeMulai} – {data.periodeSelesai}</p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* KOLOM KIRI (Informasi Utama) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Informasi Penugasan */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-emerald-800 flex items-center gap-2 mb-6">
                <HiOutlineDocumentText className="w-5 h-5 text-[#008A4B]" /> Informasi Penugasan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-6">
                <div>
                  <p className="text-xs text-slate-500 mb-1 font-medium">Program</p>
                  <p className="text-sm font-bold text-slate-900">{data.namaProgram}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 font-medium">KTH</p>
                  <p className="text-sm font-bold text-slate-900">{data.kth}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 font-medium">Rencana Kegiatan</p>
                  <p className="text-sm font-bold text-slate-900">{data.rencanaKegiatan}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 font-medium">Lokasi Penugasan</p>
                  <p className="text-sm font-bold text-slate-900 leading-snug whitespace-pre-line">{data.lokasi}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 font-medium">Target Bibit</p>
                  <p className="text-sm font-bold text-slate-900">{data.targetBibit}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 font-medium">Total PU</p>
                  <p className="text-sm font-bold text-slate-900">{data.totalPu}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 font-medium">Penyuluh</p>
                  <p className="text-sm font-bold text-slate-900">{data.penyuluh}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 font-medium">Luas Area</p>
                  <p className="text-sm font-bold text-slate-900">{data.luasArea}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 font-medium">Estimasi per PU</p>
                  <p className="text-sm font-bold text-slate-900">{data.estimasiPerPu}</p>
                </div>
              </div>
            </div>

            {/* Ringkasan Hasil Validasi Lokasi */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-emerald-800 flex items-center gap-2 mb-6">
                <HiCheckCircle className="w-5 h-5 text-[#008A4B]" /> Ringkasan Hasil Validasi Lokasi
              </h2>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-5">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-xs text-slate-500 mb-1 font-medium">Hasil Validasi</p>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                        <HiCheckCircle className="w-4 h-4" /> {data.hasilValidasi}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1 font-medium">Tanggal Validasi</p>
                      <p className="text-sm font-bold text-slate-900 mt-1.5">{data.tanggalValidasi}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium">Koordinat Lokasi</p>
                    <p className="text-sm font-bold text-slate-900">{data.koordinat}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium">Kondisi Umum Lokasi</p>
                    <p className="text-xs font-medium text-slate-600 leading-relaxed">
                      {data.kondisiUmum}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium">Catatan Validasi</p>
                    <p className="text-xs font-medium text-slate-600 leading-relaxed">
                      {data.catatan}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-64 shrink-0">
                  <p className="text-xs text-slate-500 mb-2 font-medium">Dokumentasi Lokasi</p>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=150" alt="Dokumentasi 1" className="w-full h-20 object-cover rounded-md border border-slate-200" />
                    <img src="https://images.unsplash.com/photo-1621360841013-c76831f13885?q=80&w=150" alt="Dokumentasi 2" className="w-full h-20 object-cover rounded-md border border-slate-200" />
                    <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=150" alt="Dokumentasi 3" className="w-full h-20 object-cover rounded-md border border-slate-200" />
                  </div>
                  <button className="text-xs font-bold text-[#008A4B] hover:underline flex items-center gap-1">
                    Lihat semua foto (3) <HiChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Lokasi di Peta */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-emerald-800 flex items-center gap-2 mb-4">
                <HiOutlineMapPin className="w-5 h-5 text-[#008A4B]" /> Lokasi di Peta
              </h2>
              <div className="w-full h-56 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200">
                <img src="/api/placeholder/800/300" alt="Map View" className="w-full h-full object-cover" />

                {/* Mock Map Controls */}
                <div className="absolute right-4 top-4 flex flex-col gap-2">
                  <div className="bg-white rounded shadow-sm flex flex-col overflow-hidden">
                    <button className="p-2 border-b border-gray-100 hover:bg-gray-50 text-gray-700 font-bold">+</button>
                    <button className="p-2 hover:bg-gray-50 text-gray-700 font-bold">-</button>
                  </div>
                  <button className="bg-white p-2 rounded shadow-sm hover:bg-gray-50">
                    <TargetIcon className="w-4 h-4 text-gray-700" />
                  </button>
                </div>

                {/* Mock Polygon & Pin */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* Placeholder hexagon polygon */}
                  <svg width="120" height="80" viewBox="0 0 120 80" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60">
                    <polygon points="20,10 100,10 110,40 90,70 30,70 10,40" fill="#008A4B" stroke="#ffffff" strokeWidth="2" strokeDasharray="4" />
                  </svg>
                  <div className="w-8 h-8 bg-emerald-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center relative z-10 -mt-4">
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* KOLOM KANAN (Sidebar) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Ringkasan Target */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2 mb-6">
                <TargetIcon className="w-5 h-5 text-[#008A4B]" /> Ringkasan Target
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3 text-slate-600">
                    <PuIcon className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium">Total PU</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{parseInt(data.totalPu)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3 text-slate-600">
                    <SeedlingIcon className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium">Target Bibit</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{parseInt(data.targetBibit)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3 text-slate-600">
                    <HiOutlineClock className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium">Perkiraan per PU</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">50 bibit</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <div className="flex items-center gap-3 text-slate-600">
                    <HiOutlineCalendar className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium">Deadline</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{data.periodeSelesai}</span>
                </div>
              </div>
            </div>

            {/* Panduan Singkat */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2 mb-4">
                <HiOutlineBookOpen className="w-5 h-5 text-[#008A4B]" /> Panduan Singkat
              </h3>
              <ul className="text-xs text-slate-600 space-y-4 list-disc pl-4 font-medium leading-relaxed">
                <li>Periksa kembali informasi penugasan.</li>
                <li>Pastikan lokasi hasil validasi sesuai kondisi lapangan.</li>
                <li>Lanjutkan ke pembentukan poligon PU sebelum input realisasi.</li>
                <li>Siapkan dokumentasi pelaksanaan kegiatan.</li>
              </ul>
            </div>

            {/* Informasi */}
            <div className="bg-[#eff6ff] rounded-xl p-5 border border-[#bfdbfe]">
              <div className="flex gap-3 mb-2">
                <HiOutlineInformationCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <h4 className="text-sm font-bold text-blue-900">Informasi</h4>
              </div>
              <p className="text-xs text-blue-800 leading-relaxed font-medium pl-8">
                Pelaksanaan kegiatan dimulai dengan pembentukan poligon PU sebagai dasar pencatatan realisasi per area kerja.
              </p>
            </div>

          </div>
        </div>
      </div>
      <div className="flex justify-end items-end gap-4 z-40 mt-6">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 rounded-full flex items-center gap-2 shadow-sm transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Kembali ke Daftar
        </button>

        {/* Tombol Aksi */}
        <div className="flex items-center justify-center gap-3">
          {data.status === 'Ditugaskan' && (
            <button
              onClick={() =>
                navigate('/admin/penyuluh/pelaksanaan-penanaman/input-data')
              }
              className="px-6 py-2.5 bg-[#008A4B] text-white font-bold text-sm hover:bg-emerald-800 rounded-full w-full flex items-center gap-2 shadow-sm transition-colors"
            >
              <PlayIcon className="w-4 h-4" />
              Mulai Pelaksanaan
            </button>
          )}

          {data.status === 'Berjalan' && (
            <button
              onClick={() =>
                navigate('/admin/penyuluh/pelaksanaan-penanaman/input-data')
              }
              className="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 rounded-full w-full flex items-center gap-2 shadow-sm transition-colors"
            >
              <PlayIcon className="w-4 h-4" />
              Lanjutkan Pelaksanaan
            </button>
          )}

          {data.status === 'Selesai' && (
            <button
              onClick={() =>
                navigate('/admin/penyuluh/pelaksanaan-penanaman/input-data')
              }
              className="px-6 py-2.5 bg-white border border-[#008A4B] text-[#008A4B] font-bold text-sm hover:bg-emerald-50 rounded-full flex items-center gap-2 shadow-sm transition-colors"
            >
              <HiOutlineEye className="w-4 h-4 stroke-2" />
              Lihat Detail Laporan
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default InputProgresPage;