import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlinePlus,
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
  HiOutlineClipboardDocumentList,
  HiOutlineClock,
  HiOutlineArrowPath,
  HiOutlineCheckCircle,
  HiOutlineMinusCircle,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi2';
import { PiPlant } from 'react-icons/pi';

// --- MOCK DATA ---
const MOCK_PROGRAMS = [
  { 
    id: 'PRG-2026-0007', 
    program: 'Rehabilitasi Mangrove Karangsong', 
    lokasi: 'Desa Karangsong, Kec. Indramayu', 
    kth: 'KTH Karangsong Lestari', 
    periodeLabel: 'P2', 
    periodeDate: '10 Mei - 27 Mei 2026', 
    status: 'Siap Monitoring', 
    ringkasanTitle: 'P2 aktif', 
    ringkasanDesc: 'Siap penanaman tahap kedua', 
    tanggal: '10 Mei 2026', 
    waktu: '14:25 WIB' 
  },
  { 
    id: 'PRG-2026-0012', 
    program: 'Rehabilitasi DAS Citarum Hulu', 
    lokasi: 'Kec. Lembang, Kab. Bandung Barat', 
    kth: 'KTH Lembang Hijau', 
    periodeLabel: 'P3', 
    periodeDate: '01 Jul - 20 Jul 2026', 
    status: 'Berjalan', 
    ringkasanTitle: 'Pertumbuhan 62%', 
    ringkasanDesc: 'Monitoring P3 berjalan', 
    tanggal: '12 Jul 2026', 
    waktu: '09:40 WIB' 
  },
  { 
    id: 'PRG-2026-0018', 
    program: 'Rehabilitasi Lahan Kritis Sumedang', 
    lokasi: 'Kec. Sumedang Selatan, Kab. Sumedang', 
    kth: 'KTH Bukit Lestari', 
    periodeLabel: 'P1', 
    periodeDate: '27 Mei - 12 Jun 2026', 
    status: 'Menunggu Evaluasi', 
    ringkasanTitle: 'Evaluasi P1', 
    ringkasanDesc: 'Menunggu evaluasi penyuluh', 
    tanggal: '27 Mei 2026', 
    waktu: '16:18 WIB' 
  },
  { 
    id: 'PRG-2026-0023', 
    program: 'Rehabilitasi DAS Cipunagara', 
    lokasi: 'Kec. Subang, Kab. Subang', 
    kth: 'KTH Cipunagara Makmur', 
    periodeLabel: 'P2', 
    periodeDate: '10 Jun - 27 Jun 2026', 
    status: 'Tindak Lanjut', 
    ringkasanTitle: 'Perlu penyulaman', 
    ringkasanDesc: 'Tanaman mati 12%', 
    tanggal: '25 Jun 2026', 
    waktu: '11:05 WIB' 
  },
  { 
    id: 'PRG-2026-0029', 
    program: 'Rehabilitasi DAS Cimanuk', 
    lokasi: 'Kec. Garut Kota, Kab. Garut', 
    kth: 'KTH Cimanuk Sejahtera', 
    periodeLabel: 'P4', 
    periodeDate: '01 Sep - 15 Sep 2026', 
    status: 'Selesai', 
    ringkasanTitle: 'Selesai', 
    ringkasanDesc: 'Keberhasilan 92%', 
    tanggal: '15 Sep 2026', 
    waktu: '10:30 WIB' 
  },
  { 
    id: 'PRG-2026-0031', 
    program: 'Rehabilitasi Pesisir Indramayu', 
    lokasi: 'Kec. Cantigi, Kab. Indramayu', 
    kth: 'KTH Pesisir Mandiri', 
    periodeLabel: 'P1', 
    periodeDate: '05 Mei - 20 Mei 2026', 
    status: 'Dihentikan', 
    ringkasanTitle: 'Dihentikan', 
    ringkasanDesc: 'Tidak memenuhi kriteria lokasi', 
    tanggal: '18 Mei 2026', 
    waktu: '08:55 WIB' 
  },
];

const MonitoringProgram: React.FC = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Siap Monitoring':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {status}
          </span>
        );
      case 'Berjalan':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            {status}
          </span>
        );
      case 'Menunggu Evaluasi':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            {status}
          </span>
        );
      case 'Tindak Lanjut':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            {status}
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {status}
          </span>
        );
      case 'Dihentikan':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-700">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
            {status}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto bg-[#F8FAFC] min-h-screen font-sans text-slate-800">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Monitoring Program Rehabilitasi</h1>
          <p className="text-sm text-slate-500">Halaman ini digunakan untuk memantau progres program rehabilitasi P0–P4 dan hasil evaluasinya.</p>
        </div>
        <button className="px-4 py-2.5 bg-[#008A4B] hover:bg-[#00753f] text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm shrink-0">
          <HiOutlinePlus className="w-4 h-4 stroke-[2.5]" /> Buat Penugasan Monitoring
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <PiPlant className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Siap Monitoring</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">16</span>
              <span className="text-xs text-slate-500 font-normal">program</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <HiOutlineClipboardDocumentList className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Berjalan</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">9</span>
              <span className="text-xs text-slate-500 font-normal">program</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <HiOutlineClock className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Menunggu Evaluasi</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">7</span>
              <span className="text-xs text-slate-500 font-normal">program</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <HiOutlineArrowPath className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Tindak Lanjut</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">5</span>
              <span className="text-xs text-slate-500 font-normal">program</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <HiOutlineCheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Selesai</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">24</span>
              <span className="text-xs text-slate-500 font-normal">program</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <HiOutlineMinusCircle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Dihentikan</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">3</span>
              <span className="text-xs text-slate-500 font-normal">program</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
        <div className="relative flex-1 min-w-50">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari program / lokasi / KTH" 
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-slate-700 placeholder:text-slate-400 bg-white" 
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:flex gap-3 items-center">
          <div className="w-full lg:w-44">
            <label className="block text-[10px] font-medium text-slate-500 mb-1 lg:hidden">Status Monitoring</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 bg-white text-slate-700 cursor-pointer">
              <option>Semua Status</option>
            </select>
          </div>

          <div className="w-full lg:w-40">
            <label className="block text-[10px] font-medium text-slate-500 mb-1 lg:hidden">Periode</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 bg-white text-slate-700 cursor-pointer">
              <option>Semua Periode</option>
            </select>
          </div>

          <div className="w-full lg:w-44">
            <label className="block text-[10px] font-medium text-slate-500 mb-1 lg:hidden">Kabupaten</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 bg-white text-slate-700 cursor-pointer">
              <option>Semua Kabupaten</option>
            </select>
          </div>

          <div className="w-full lg:w-36">
            <label className="block text-[10px] font-medium text-slate-500 mb-1 lg:hidden">Tahun</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 bg-white text-slate-700 cursor-pointer">
              <option>Semua Tahun</option>
            </select>
          </div>

          <button className="px-4 py-2 bg-white border border-[#008A4B] text-[#008A4B] hover:bg-emerald-50 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0 h-9.5 mt-auto">
            <HiOutlineFunnel className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Daftar Program Monitoring</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 min-w-250">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-6 font-semibold">Program</th>
                <th className="py-3.5 px-6 font-semibold">Lokasi / KTH</th>
                <th className="py-3.5 px-6 font-semibold">Periode Aktif</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold">Ringkasan</th>
                <th className="py-3.5 px-6 font-semibold">Tanggal Terakhir</th>
                <th className="py-3.5 px-6 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PROGRAMS.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-900 mb-0.5">{row.program}</p>
                    <p className="text-xs text-slate-400">ID: {row.id}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-slate-800 mb-0.5">{row.lokasi}</p>
                    <p className="text-xs text-slate-400">{row.kth}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-slate-800 mb-0.5">{row.periodeLabel}</p>
                    <p className="text-xs text-slate-400">{row.periodeDate}</p>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(row.status)}
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-slate-800 mb-0.5">{row.ringkasanTitle}</p>
                    <p className="text-xs text-slate-400">{row.ringkasanDesc}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-slate-800 mb-0.5">{row.tanggal}</p>
                    <p className="text-xs text-slate-400">{row.waktu}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        className="px-3 py-1.5 bg-white border border-[#008A4B] text-[#008A4B] hover:bg-emerald-50 text-xs font-semibold rounded-lg transition-colors"
                        onClick={() => navigate(`/admin/staff/monitoring/verifikasi/detail/${row.id}`, { state: { status: row.status } })}
                      >
                        Lihat Progres
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* PAGINATION */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white text-sm text-slate-500">
          <span>Menampilkan 1–6 dari 6 data</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
                <HiChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#008A4B] text-white font-semibold text-xs shadow-sm">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
                <HiChevronRight className="w-4 h-4" />
              </button>
            </div>
            <select className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none bg-white text-slate-700 cursor-pointer">
              <option>10 / halaman</option>
              <option>20 / halaman</option>
              <option>50 / halaman</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MonitoringProgram;