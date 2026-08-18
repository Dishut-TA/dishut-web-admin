import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineCheckCircle, 
  HiOutlineMagnifyingGlass,
  HiOutlineCalendar,
  HiOutlineEye,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDown,
  HiOutlineClipboardDocumentList,
  HiOutlineClipboardDocumentCheck,
  HiOutlineFunnel
} from 'react-icons/hi2';

// --- INTERFACES & MOCK DATA ---
interface TugasValidasi {
  id: string;
  sumber: string;
  lokasi: string;
  batasWaktu: string;
  sisaHari: string;
  sisaHariColor: string;
  status: 'Ditugaskan' | 'Selesai';
}

const mockData: TugasValidasi[] = [
  { 
    id: 'TGS-2026-011', 
    sumber: 'Analisis CPI', 
    lokasi: 'Desa Mandalakasih, Kec. Pameungpeuk, Kab. Garut', 
    batasWaktu: '18 Juni 2026', 
    sisaHari: '(2 hari lagi)', 
    sisaHariColor: 'text-red-500', 
    status: 'Ditugaskan', 
  },
  { 
    id: 'TGS-2026-012', 
    sumber: 'Proposal CSR', 
    lokasi: 'Desa Mekarjaya, Kec. Cikajang, Kab. Garut', 
    batasWaktu: '20 Juni 2026', 
    sisaHari: '(4 hari lagi)', 
    sisaHariColor: 'text-red-500', 
    status: 'Ditugaskan', 
  },
  { 
    id: 'TGS-2026-009', 
    sumber: 'Analisis CPI', 
    lokasi: 'Desa Cisurupan, Kec. Pamulihan, Kab. Garut', 
    batasWaktu: '22 Juni 2026', 
    sisaHari: '(6 hari lagi)', 
    sisaHariColor: 'text-orange-500', 
    status: 'Ditugaskan', 
  },
  { 
    id: 'TGS-2026-010', 
    sumber: 'Analisis CPI', 
    lokasi: 'Desa Cihawuk, Kec. Kertasari, Kab. Bandung', 
    batasWaktu: '25 Juni 2026', 
    sisaHari: '(9 hari lagi)', 
    sisaHariColor: 'text-orange-500', 
    status: 'Selesai', 
  },
  { 
    id: 'TGS-2026-008', 
    sumber: 'Analisis CPI', 
    lokasi: 'Desa Sukalaksana, Kec. Cibatu, Kab. Garut', 
    batasWaktu: '05 Juli 2026', 
    sisaHari: '(19 hari lagi)', 
    sisaHariColor: 'text-orange-500', 
    status: 'Selesai', 
  },
];

const SUMMARY_CARDS = [
  { title: 'Total Penugasan', sub: 'Semua penugasan validasi', value: '5', icon: <HiOutlineClipboardDocumentList className="w-8 h-8" />, bg: 'bg-blue-50', text: 'text-blue-600' },
  { title: 'Ditugaskan', sub: 'Belum mulai dikerjakan', value: '3', icon: <HiOutlineClipboardDocumentCheck className="w-8 h-8" />, bg: 'bg-yellow-50', text: 'text-yellow-600' },
  { title: 'Selesai', sub: 'Validasi telah diselesaikan', value: '2', icon: <HiOutlineCheckCircle className="w-8 h-8" />, bg: 'bg-emerald-50', text: 'text-emerald-500' },
];

const SumberBadge = ({ text }: { text: string }) => {
  const isCPI = text === 'Analisis CPI';
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded ${isCPI ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-500'}`}>
      {text}
    </span>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Ditugaskan': 'bg-yellow-50 text-yellow-600',
    'Selesai': 'bg-emerald-50 text-emerald-600',
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded ${styles[status]}`}>
      {status}
    </span>
  );
};

const Header = () => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-slate-900 mb-1">Validasi Lokasi</h1>
    <p className="text-sm font-medium text-slate-500">
      Daftar penugasan validasi lokasi yang diberikan kepada Anda.
    </p>
  </div>
);

const SummaryCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    {SUMMARY_CARDS.map((card, idx) => (
      <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
        <div className={`p-3 rounded-lg shrink-0 ${card.bg} ${card.text}`}>
          {card.icon}
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-0.5">
            <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
          </div>
          <p className="text-sm font-bold text-slate-800">{card.title}</p>
          <p className="text-[11px] font-medium text-slate-400">{card.sub}</p>
        </div>
      </div>
    ))}
  </div>
);

const FilterSection = () => (
  <div className="flex flex-col md:flex-row gap-4 mb-6 mt-2">
    <div className="relative flex-1">
      <input 
        type="text" 
        placeholder="Cari ID penugasan, lokasi, desa, CDK..." 
        className="w-full pl-4 pr-10 py-2.5 text-sm font-medium border border-slate-200 rounded-lg focus:outline-none focus:border-[#008A4B]" 
      />
      <HiOutlineMagnifyingGlass className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
    </div>

    <div className="relative w-full md:w-56">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500">Status</div>
      <select className="w-full pl-14 pr-8 py-2.5 text-sm font-semibold border border-slate-200 rounded-lg appearance-none bg-white focus:outline-none focus:border-[#008A4B]">
        <option>Semua</option>
      </select>
      <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>

    <div className="relative w-full md:w-64">
      <div className="absolute left-10 top-1.5 text-[10px] font-medium text-slate-400">Periode Penugasan</div>
      <HiOutlineCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <select className="w-full pl-10 pr-8 pt-4 pb-1 text-sm font-semibold border border-slate-200 rounded-lg appearance-none bg-white focus:outline-none focus:border-[#008A4B]">
        <option>Semua Periode</option>
      </select>
      <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>

    <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#008A4B] text-white text-sm font-semibold rounded-lg hover:bg-emerald-800 transition-colors shadow-sm">
      <HiOutlineFunnel className="w-4 h-4" /> Filter
    </button>
  </div>
);

const ValidasiTable = ({ data, navigate }: { data: TugasValidasi[], navigate: any }) => (
  <div className="overflow-x-auto">
    <div className="px-4 py-3 border-b border-slate-100">
      <h3 className="text-sm font-bold text-slate-800">Daftar Validasi Lokasi</h3>
    </div>
    <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
      <thead className="text-xs text-slate-800 bg-slate-50 border-b border-slate-200">
        <tr>
          <th className="px-4 py-4 font-bold">No</th>
          <th className="px-4 py-4 font-bold">ID Penugasan</th>
          <th className="px-4 py-4 font-bold">Sumber Lokasi</th>
          <th className="px-4 py-4 font-bold">Lokasi</th>
          <th className="px-4 py-4 font-bold">Batas Waktu Validasi</th>
          <th className="px-4 py-4 font-bold">Status</th>
          <th className="px-4 py-4 font-bold text-center">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {data.map((item, idx) => (
          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-4 py-4">{idx + 1}</td>
            <td className="px-4 py-4 font-semibold text-[#008A4B]">{item.id}</td>
            <td className="px-4 py-4"><SumberBadge text={item.sumber} /></td>
            <td className="px-4 py-4">
              <div className="max-w-62.5 whitespace-normal font-medium text-slate-800 leading-relaxed">
                {item.lokasi}
              </div>
            </td>
            <td className="px-4 py-4">
              <div className="font-medium text-slate-800">{item.batasWaktu}</div>
              <div className={`text-xs font-semibold mt-0.5 ${item.sisaHariColor}`}>{item.sisaHari}</div>
            </td>
            <td className="px-4 py-4"><StatusBadge status={item.status} /></td>
            <td className="px-4 py-4 text-center">
              {item.status === 'Ditugaskan' && (
                <button 
                  onClick={() => navigate(`/admin/penyuluh/validasi-lokasi/detail/${item.id}`, { state: { status: item.status } })}
                  className="inline-flex items-center justify-between w-36 px-4 py-2 text-xs font-bold text-white bg-[#008A4B] rounded-lg hover:bg-emerald-800 transition-colors shadow-sm"
                >
                  Mulai Validasi <HiChevronRight className="w-4 h-4 stroke-2" />
                </button>
              )}
              {item.status === 'Selesai' && (
                <button 
                  onClick={() => navigate(`/admin/penyuluh/validasi-lokasi/detail/${item.id}`, { state: { status: item.status } })}
                  className="inline-flex items-center justify-center gap-1.5 w-36 px-4 py-2 text-xs font-bold text-[#008A4B] bg-white border border-[#008A4B] rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <HiOutlineEye className="w-4 h-4 stroke-2" /> Lihat Detail
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Pagination = () => (
  <div className="flex items-center justify-between text-xs text-slate-500 px-4 py-4 border-t border-slate-100">
    <span className="font-medium">Menampilkan 1 - 5 dari 5 data</span>
    <div className="flex items-center gap-2">
      <button className="p-1.5 rounded-md border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 disabled:opacity-50"><HiChevronLeft className="w-4 h-4" /></button>
      <button className="px-3 py-1.5 rounded-md bg-[#008A4B] text-white font-semibold">1</button>
      <button className="p-1.5 rounded-md border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 disabled:opacity-50"><HiChevronRight className="w-4 h-4" /></button>
    </div>
  </div>
);

const ValidasiLokasi: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState<TugasValidasi[]>(mockData);

  return (
    <div className="w-full mx-auto pb-12 bg-[#F8FAFC] min-h-screen font-sans">
      <Header />
      <SummaryCards />
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col p-4">
        <FilterSection />
        <div className="border border-slate-200 rounded-lg overflow-hidden mt-2">
          <ValidasiTable data={data} navigate={navigate} />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default ValidasiLokasi;