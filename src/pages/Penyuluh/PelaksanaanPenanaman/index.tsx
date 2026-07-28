import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineClipboardDocumentList, 
  HiOutlinePlayCircle, 
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiChevronRight,
  HiChevronLeft,
  HiOutlineCalendar,
  HiOutlineArrowPath
} from 'react-icons/hi2';

// ==========================================
// 1. INTERFACES & TYPES
// ==========================================
type StatusPelaksanaan = 'Siap Dilaksanakan' | 'Berjalan' | 'Selesai';
type JenisProgram = 'Donasi' | 'APBD' | 'CSR';

interface ProgramData {
  id: string;
  idReferensi: string;
  jenisProgram: JenisProgram;
  namaProgram: string;
  rencanaKegiatan: string;
  lokasi: string;
  pelaksana: string;
  tanggalRencana: string;
  status: StatusPelaksanaan;
}

// ==========================================
// 2. MOCK DATA
// ==========================================
const mockData: ProgramData[] = [
  { id: '1', idReferensi: 'ACT-2026-0001', jenisProgram: 'Donasi', namaProgram: 'Rehabilitasi Mangrove Karangsong', rencanaKegiatan: 'Penanaman Mangrove', lokasi: 'Desa Karangsong / Kec. Indramayu', pelaksana: 'Ahmad Fauzi\nStaff PDAS', tanggalRencana: '12 Juni 2026', status: 'Siap Dilaksanakan' },
  { id: '2', idReferensi: 'ACT-2026-0002', jenisProgram: 'APBD', namaProgram: 'Rehabilitasi DAS Cimanuk', rencanaKegiatan: 'Rehabilitasi Lahan Kritis', lokasi: 'Desa Rancabali / Kec. Rancabali', pelaksana: 'Siti Nurhaliza\nStaff PDAS', tanggalRencana: '13 Juni 2026', status: 'Berjalan' },
  { id: '3', idReferensi: 'ACT-2026-0003', jenisProgram: 'CSR', namaProgram: 'Konservasi Mata Air Cisiuran', rencanaKegiatan: 'Konservasi Sumber Mata Air', lokasi: 'Desa Cisarua / Kec. Pacet', pelaksana: 'Dedi Kurniawan\nStaff PDAS', tanggalRencana: '14 Juni 2026', status: 'Selesai' },
  { id: '4', idReferensi: 'ACT-2026-0004', jenisProgram: 'Donasi', namaProgram: 'Penghijauan Lahan Kritis Pangalengan', rencanaKegiatan: 'Penghijauan Area Kritis', lokasi: 'Desa Pangalengan / Kec. Pangalengan', pelaksana: 'Rina Marlina\nStaff PDAS', tanggalRencana: '14 Juni 2026', status: 'Berjalan' },
  { id: '5', idReferensi: 'ACT-2026-0005', jenisProgram: 'APBD', namaProgram: 'Agroforestry Mandalakasih', rencanaKegiatan: 'Agroforestry Kopi', lokasi: 'Desa Mandalakasih / Kec. Pameungpeuk', pelaksana: 'Agus Setiawan\nStaff PDAS', tanggalRencana: '15 Juni 2026', status: 'Siap Dilaksanakan' },
  { id: '6', idReferensi: 'ACT-2026-0006', jenisProgram: 'CSR', namaProgram: 'Rehabilitasi Lahan Kritis Cisomang', rencanaKegiatan: 'Rehabilitasi Lahan Kritis', lokasi: 'Desa Cisomang / Kec. Cikalong Wetan', pelaksana: 'Yudi Hartono\nStaff PDAS', tanggalRencana: '15 Juni 2026', status: 'Selesai' },
  { id: '7', idReferensi: 'ACT-2026-0007', jenisProgram: 'Donasi', namaProgram: 'Konservasi Sempadan Sungai Cibeetis', rencanaKegiatan: 'Penanaman Vegetasi Sempadan Sungai', lokasi: 'Desa Cibeetis / Kec. Ciwidey', pelaksana: 'Ahmad Fauzi\nStaff PDAS', tanggalRencana: '16 Juni 2026', status: 'Siap Dilaksanakan' },
  { id: '8', idReferensi: 'ACT-2026-0008', jenisProgram: 'APBD', namaProgram: 'Rehabilitasi Mangrove Muara Gembong', rencanaKegiatan: 'Penanaman Mangrove', lokasi: 'Desa Pantai Bakti / Kec. Muara Gembong', pelaksana: 'Siti Nurhaliza\nStaff PDAS', tanggalRencana: '16 Juni 2026', status: 'Berjalan' },
];

const SUMMARY_CARDS = [
  { title: 'Siap Dilaksanakan', value: '18', icon: <HiOutlineClipboardDocumentList className="w-8 h-8" />, bg: 'bg-blue-50', text: 'text-blue-600' },
  { title: 'Berjalan', value: '24', icon: <HiOutlinePlayCircle className="w-8 h-8" />, bg: 'bg-orange-50', text: 'text-orange-500' },
  { title: 'Selesai', value: '15', icon: <HiOutlineCheckCircle className="w-8 h-8" />, bg: 'bg-emerald-50', text: 'text-emerald-600' },
];

// ==========================================
// 3. MICRO COMPONENTS (Atoms & Molecules)
// ==========================================
const JenisProgramBadge = ({ jenis }: { jenis: JenisProgram }) => {
  const styles: Record<JenisProgram, string> = {
    'Donasi': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'APBD': 'bg-blue-50 text-blue-700 border-blue-100',
    'CSR': 'bg-orange-50 text-orange-700 border-orange-100',
  };
  return (
    <span className={`px-2.5 py-1 text-[11px] font-bold rounded border ${styles[jenis]}`}>
      {jenis}
    </span>
  );
};

const StatusBadge = ({ status }: { status: StatusPelaksanaan }) => {
  // PERBAIKAN: Menggunakan React.ReactNode untuk mengatasi error namespace 'JSX'
  const styles: Record<StatusPelaksanaan, { color: string, icon: React.ReactNode }> = {
    'Siap Dilaksanakan': { color: 'bg-blue-50 text-blue-600 border-blue-100', icon: <HiOutlineClipboardDocumentList className="w-3.5 h-3.5" /> },
    'Berjalan': { color: 'bg-orange-50 text-orange-600 border-orange-100', icon: <HiOutlinePlayCircle className="w-3.5 h-3.5" /> },
    'Selesai': { color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: <HiOutlineCheckCircle className="w-3.5 h-3.5" /> },
  };
  const { color, icon } = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-md border ${color}`}>
      {icon} {status}
    </span>
  );
};

// ==========================================
// 4. MACRO COMPONENTS (Organisms)
// ==========================================
const Header = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-1">Pelaksanaan Kegiatan</h1>
  </div>
);

const SummaryCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {SUMMARY_CARDS.map((card, idx) => (
      <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
        <div className={`p-4 rounded-xl shrink-0 ${card.bg} ${card.text}`}>
          {card.icon}
        </div>
        <div>
          <p className="text-xs font-bold text-gray-500 mb-1">{card.title}</p>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{card.value}</h3>
            <span className="text-xs font-medium text-gray-400">Kegiatan</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const FilterSection = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
    <div className="flex flex-col gap-1.5 md:col-span-1">
      <label className="text-xs font-bold text-gray-700">Jenis Program</label>
      <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:border-emerald-500">
        <option>Semua Jenis Program</option>
      </select>
    </div>
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-700">Tanggal Kegiatan</label>
      <div className="relative">
        <input type="text" defaultValue="01/01/2026 - 31/12/2026" className="w-full pl-3 pr-9 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500" />
        <HiOutlineCalendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
    </div>
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-700">Status Kegiatan</label>
      <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:border-emerald-500">
        <option>Semua Status</option>
      </select>
    </div>
    <div className="flex flex-col gap-1.5 justify-end">
      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto ml-auto">
        <HiOutlineArrowPath className="w-4 h-4" /> Reset
      </button>
    </div>
  </div>
);

const KegiatanTable = ({ data, navigate }: { data: ProgramData[], navigate: any }) => (
  <div className="overflow-x-auto mb-4">
    <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
      <thead className="text-[11px] text-gray-900 bg-gray-50 border-y border-gray-100 font-bold uppercase tracking-wider">
        <tr>
          <th className="px-4 py-4">No</th>
          <th className="px-4 py-4">ID Referensi</th>
          <th className="px-4 py-4">Jenis Program</th>
          <th className="px-4 py-4">Nama Program</th>
          <th className="px-4 py-4">Rencana Kegiatan</th>
          <th className="px-4 py-4">Lokasi</th>
          <th className="px-4 py-4">Pelaksana</th>
          <th className="px-4 py-4">Tanggal Rencana</th>
          <th className="px-4 py-4">Status</th>
          <th className="px-4 py-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {data.map((item, idx) => (
          <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
            <td className="px-4 py-4">{idx + 1}</td>
            <td className="px-4 py-4 font-bold text-gray-700">{item.idReferensi}</td>
            <td className="px-4 py-4"><JenisProgramBadge jenis={item.jenisProgram} /></td>
            <td className="px-4 py-4">
              <div className="max-w-50 whitespace-normal font-bold text-gray-800 leading-snug">
                {item.namaProgram}
              </div>
            </td>
            <td className="px-4 py-4 font-medium text-gray-800">{item.rencanaKegiatan}</td>
            <td className="px-4 py-4">
              <div className="max-w-45 whitespace-normal text-xs text-gray-600 leading-snug">
                {item.lokasi}
              </div>
            </td>
            <td className="px-4 py-4">
              <div className="text-xs whitespace-pre-line text-gray-800 font-medium">
                {item.pelaksana}
              </div>
            </td>
            <td className="px-4 py-4 text-xs font-bold text-gray-700">{item.tanggalRencana}</td>
            <td className="px-4 py-4"><StatusBadge status={item.status} /></td>
            <td className="px-4 py-4 text-center">
              <button 
                onClick={() => navigate(`/admin/penyuluh/pelaksanaan-penanaman/create/${item.id}`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-600 bg-white border border-emerald-500 rounded-md hover:bg-emerald-50 transition-colors"
              >
                <HiOutlineEye className="w-4 h-4" /> Lihat Detail
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Pagination = () => (
  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 mt-4">
    <span>Menampilkan 1 - 8 dari 57 data</span>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50"><HiChevronLeft className="w-4 h-4" /></button>
        <button className="px-3 py-1.5 rounded bg-emerald-600 text-white font-medium">1</button>
        <button className="px-3 py-1.5 rounded hover:bg-gray-50 font-medium">2</button>
        <button className="px-3 py-1.5 rounded hover:bg-gray-50 font-medium">3</button>
        <span>...</span>
        <button className="px-3 py-1.5 rounded hover:bg-gray-50 font-medium">8</button>
        <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50"><HiChevronRight className="w-4 h-4" /></button>
      </div>
      <div className="flex items-center gap-2">
        <span>Tampilkan</span>
        <select className="border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none">
          <option>10</option>
        </select>
        <span>data per halaman</span>
      </div>
    </div>
  </div>
);

const UpdateBanner = () => (
  <div className="mt-6 bg-[#f0f9f3] rounded-xl p-4 border border-[#DCECE0] flex items-center justify-between">
    <div className="flex items-center gap-3">
      <HiOutlineArrowPath className="w-5 h-5 text-emerald-600 shrink-0" />
      <div>
        <h4 className="text-sm font-bold text-emerald-800">Informasi Update Terakhir</h4>
        <p className="text-xs text-emerald-600 mt-0.5">Diperbarui oleh Ahmad Fauzi (Staff PDAS)</p>
      </div>
    </div>
    <div className="flex items-center gap-2 text-emerald-800 text-right text-xs">
      <HiOutlineCalendar className="w-5 h-5 opacity-70" />
      <div>
        <p className="font-bold">16 Juni 2026, 09:45 WIB</p>
        <p className="opacity-80">Data kegiatan diperbarui.</p>
      </div>
    </div>
  </div>
);

// ==========================================
// 5. MAIN PAGE COMPONENT
// ==========================================
const PelaksanaanPenanamanIndex: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState<ProgramData[]>(mockData);
  

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 bg-[#f8faf9] min-h-screen">
      <Header />
      <SummaryCards />
      <FilterSection />
      
      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-gray-900">Daftar Kegiatan</h3>
          <p className="text-sm text-gray-500 mt-1">Daftar kegiatan program di lapangan beserta status pelaksanaannya.</p>
        </div>
        
        <KegiatanTable data={data} navigate={navigate} />
        <Pagination />
      </div>

      <UpdateBanner />
    </div>
  );
};

export default PelaksanaanPenanamanIndex;