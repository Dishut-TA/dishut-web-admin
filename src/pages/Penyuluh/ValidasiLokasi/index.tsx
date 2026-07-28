import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineMapPin, 
  HiOutlineClock, 
  HiOutlineCheckCircle, 
  HiOutlineXCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineCalendar,
  HiOutlineArrowPath,
  HiOutlinePencilSquare,
  HiOutlineEye,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineDocumentText
} from 'react-icons/hi2';

interface TugasValidasi {
  id: string;
  sumber: string;
  lokasi: string;
  batasWaktu: string;
  sisaHari: string;
  sisaHariColor: string;
  status: 'Perlu Validasi' | 'Sesuai' | 'Tidak Sesuai';
  terakhirDiperbarui: string;
}

const mockData: TugasValidasi[] = [
  { id: 'TGS-2026-011', sumber: 'Analisis CPI', lokasi: 'Desa Mandalakasih, Kec. Pameungpeuk, Kab. Garut', batasWaktu: '18 Juni 2026', sisaHari: '(2 hari lagi)', sisaHariColor: 'text-red-500', status: 'Perlu Validasi', terakhirDiperbarui: '-' },
  { id: 'TGS-2026-012', sumber: 'Proposal CSR', lokasi: 'Desa Mekarjaya, Kec. Cikajang, Kab. Garut', batasWaktu: '20 Juni 2026', sisaHari: '(4 hari lagi)', sisaHariColor: 'text-red-500', status: 'Perlu Validasi', terakhirDiperbarui: '-' },
  { id: 'TGS-2026-009', sumber: 'Analisis CPI', lokasi: 'Desa Cisiuran, Kec. Pamulihan, Kab. Garut', batasWaktu: '22 Juni 2026', sisaHari: '(6 hari lagi)', sisaHariColor: 'text-orange-500', status: 'Sesuai', terakhirDiperbarui: '12 Juni 2026 09:15 WIB' },
  { id: 'TGS-2026-010', sumber: 'Analisis CPI', lokasi: 'Desa Cihawuk, Kec. Kertasari, Kab. Bandung', batasWaktu: '25 Juni 2026', sisaHari: '(9 hari lagi)', sisaHariColor: 'text-orange-500', status: 'Sesuai', terakhirDiperbarui: '10 Juni 2026 16:40 WIB' },
  { id: 'TGS-2026-007', sumber: 'Proposal CSR', lokasi: 'Desa Karangsong, Kab. Indramayu', batasWaktu: '30 Juni 2026', sisaHari: '(14 hari lagi)', sisaHariColor: 'text-orange-500', status: 'Sesuai', terakhirDiperbarui: '18 Juni 2026 10:05 WIB' },
  { id: 'TGS-2026-008', sumber: 'Analisis CPI', lokasi: 'Desa Sukalaksana, Kec. Cibatu, Kab. Garut', batasWaktu: '05 Juli 2026', sisaHari: '(19 hari lagi)', sisaHariColor: 'text-orange-500', status: 'Tidak Sesuai', terakhirDiperbarui: '15 Juni 2026 13:22 WIB' },
  { id: 'TGS-2026-013', sumber: 'Proposal CSR', lokasi: 'Desa Rancabango, Kec. Tarogong Kaler, Kab. Garut', batasWaktu: '08 Juli 2026', sisaHari: '(22 hari lagi)', sisaHariColor: 'text-orange-500', status: 'Perlu Validasi', terakhirDiperbarui: '-' },
];

const SUMMARY_CARDS = [
  { title: 'Total Lokasi Ditugaskan', value: '7', icon: <HiOutlineMapPin className="w-7 h-7" />, bg: 'bg-emerald-50', text: 'text-emerald-600' },
  { title: 'Belum Validasi', value: '2', icon: <HiOutlineClock className="w-7 h-7" />, bg: 'bg-orange-50', text: 'text-orange-500' },
  { title: 'Sesuai', value: '4', icon: <HiOutlineCheckCircle className="w-7 h-7" />, bg: 'bg-emerald-50', text: 'text-emerald-600' },
  { title: 'Tidak Sesuai', value: '1', icon: <HiOutlineXCircle className="w-7 h-7" />, bg: 'bg-red-50', text: 'text-red-500' },
];

const HISTORY_DATA = [
  { icon: <HiOutlinePencilSquare className="w-5 h-5 text-blue-500" />, title: 'Validasi lokasi diperbarui', desc: 'Rehabilitasi Mangrove Karangsong - status validasi diperbarui menjadi "Sesuai"', time: '18 Juni 2026, 10:05 WIB' },
  { icon: <HiOutlineClock className="w-5 h-5 text-orange-500" />, title: 'Penugasan baru diterima', desc: 'Anda menerima penugasan baru dari Analisis CPI di Desa Mandalakasih, Kec. Pameungpeuk, Kab. Garut', time: '17 Juni 2026, 14:30 WIB' },
  { icon: <HiOutlineCheckCircle className="w-5 h-5 text-emerald-500" />, title: 'Validasi lokasi disimpan', desc: 'Konservasi Mata Air Cisiuran - status validasi disimpan', time: '12 Juni 2026, 09:15 WIB' },
  { icon: <HiOutlineDocumentText className="w-5 h-5 text-blue-400" />, title: 'Dokumentasi diunggah', desc: 'Dokumentasi lokasi diunggah pada Rehabilitasi DAS Cimanuk', time: '10 Juni 2026, 16:40 WIB' },
];

const SumberBadge = ({ text }: { text: string }) => {
  const isCPI = text === 'Analisis CPI';
  return (
    <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-md ${isCPI ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'}`}>
      {text}
    </span>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Perlu Validasi': 'bg-orange-50 text-orange-600',
    'Sesuai': 'bg-emerald-50 text-emerald-600',
    'Tidak Sesuai': 'bg-red-50 text-red-600',
  };
  return (
    <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-md ${styles[status]}`}>
      {status}
    </span>
  );
};

const Header = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-1">Validasi Lokasi</h1>
  </div>
);

const SummaryCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {SUMMARY_CARDS.map((card, idx) => (
      <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className={`p-4 rounded-xl shrink-0 ${card.bg} ${card.text}`}>
          {card.icon}
        </div>
        <div>
          <p className="text-xs font-bold text-gray-500 mb-1">{card.title}</p>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            <span className="text-xs font-medium text-gray-400">Lokasi</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const FilterSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
    <div className="flex flex-col gap-1.5 md:col-span-1">
      <label className="text-xs font-bold text-gray-700">Pencarian Lokasi</label>
      <div className="relative">
        <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Cari berdasarkan lokasi..." className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
      </div>
    </div>
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-700">Sumber Lokasi</label>
      <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:border-emerald-500">
        <option>Semua Sumber</option>
      </select>
    </div>
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-700">Status Validasi</label>
      <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:border-emerald-500">
        <option>Semua Status</option>
      </select>
    </div>
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-700">Periode Penugasan</label>
      <div className="relative">
        <HiOutlineCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" defaultValue="01/01/2026 - 31/12/2026" className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500" />
      </div>
    </div>
    <div className="flex flex-col gap-1.5 justify-end">
      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors w-full">
        <HiOutlineArrowPath className="w-4 h-4" /> Reset
      </button>
    </div>
  </div>
);

const ValidasiTable = ({ data, navigate }: { data: TugasValidasi[], navigate: any }) => (
  <div className="overflow-x-auto mb-4">
    <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
      <thead className="text-xs text-[#3A4D3F] bg-[#DCECE0] border-y border-gray-100">
        <tr>
          <th className="px-4 py-3 font-semibold">No</th>
          <th className="px-4 py-3 font-semibold">ID Penugasan</th>
          <th className="px-4 py-3 font-semibold">Sumber Lokasi</th>
          <th className="px-4 py-3 font-semibold">Lokasi</th>
          <th className="px-4 py-3 font-semibold flex items-center gap-1">Batas Waktu Validasi</th>
          <th className="px-4 py-3 font-semibold text-center">Status Validasi</th>
          <th className="px-4 py-3 font-semibold">Terakhir Diperbarui</th>
          <th className="px-4 py-3 font-semibold text-center">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {data.map((item, idx) => (
          <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
            <td className="px-4 py-4">{idx + 1}</td>
            <td className="px-4 py-4 font-bold text-emerald-600">{item.id}</td>
            <td className="px-4 py-4"><SumberBadge text={item.sumber} /></td>
            <td className="px-4 py-4">
              <div className="max-w-50 whitespace-normal font-medium text-gray-800 leading-snug">
                {item.lokasi}
              </div>
            </td>
            <td className="px-4 py-4">
              <div className="font-medium text-gray-800">{item.batasWaktu}</div>
              <div className={`text-xs font-bold mt-0.5 ${item.sisaHariColor}`}>{item.sisaHari}</div>
            </td>
            <td className="px-4 py-4 text-center"><StatusBadge status={item.status} /></td>
            <td className="px-4 py-4 text-xs font-medium">{item.terakhirDiperbarui}</td>
            <td className="px-4 py-4 text-center">
              {item.status === 'Perlu Validasi' ? (
                <button 
                  onClick={() => navigate(`/admin/penyuluh/validasi-lokasi/create/${item.id}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-600 bg-white border border-emerald-500 rounded-md hover:bg-emerald-50 transition-colors"
                >
                  <HiOutlinePencilSquare className="w-4 h-4" /> Lakukan Validasi
                </button>
              ) : (
                <button 
                  onClick={() => navigate(`/admin/penyuluh/validasi-lokasi/detail/${item.id}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <HiOutlineEye className="w-4 h-4" /> Lihat Detail
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
  <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
    <span>Menampilkan 1 - 7 dari 7 data</span>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50"><HiChevronLeft className="w-4 h-4" /></button>
        <button className="px-3 py-1.5 rounded bg-emerald-600 text-white font-medium">1</button>
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

const HistorySection = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h3 className="text-base font-bold text-gray-800 mb-6">Riwayat Update Terbaru</h3>
    <div className="space-y-6">
      {HISTORY_DATA.map((history, idx) => (
        <div key={idx} className="flex gap-4">
          <div className="mt-0.5 p-2 rounded-full bg-gray-50 shrink-0">
            {history.icon}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-gray-800">{history.title}</h4>
            <p className="text-xs text-gray-500 font-medium mt-1">{history.desc}</p>
          </div>
          <div className="text-xs text-gray-400 font-medium whitespace-nowrap shrink-0">
            {history.time}
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6 text-center">
      <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center justify-center gap-1 mx-auto">
        Lihat Semua Riwayat <HiChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const ValidasiLokasi: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState<TugasValidasi[]>(mockData);

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 bg-[#f8faf9] min-h-screen">
      <Header />
      <SummaryCards />
      
      <div className="rounded-2xl flex flex-col">
        <FilterSection />
        <h3 className="text-base font-bold text-gray-800 mb-4">Daftar Validasi Lokasi</h3>
        <ValidasiTable data={data} navigate={navigate} />
        <Pagination />
      </div>

      <HistorySection />
    </div>
  );
};

export default ValidasiLokasi;