import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineMagnifyingGlass,
  HiOutlineCalendar,
  HiOutlineArrowPath,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineChartBar,
  HiOutlineInformationCircle,
  HiOutlineDocumentMagnifyingGlass
} from 'react-icons/hi2';

// ==========================================
// 1. TYPES & MOCK DATA
// ==========================================
type StatusMonitoring = 'Siap Monitoring' | 'Dalam Monitoring' | 'Menunggu Evaluasi' | 'Perlu Tindak Lanjut' | 'Monitoring Selesai';

interface ProgramMonitoring {
  id: string;
  nama: string;
  lokasi: string;
  sumberDana: string;
  tanggalSelesai: string;
  penanggungJawab: string;
  status: StatusMonitoring;
}

const MOCK_DATA: ProgramMonitoring[] = [
  { id: 'PRG-2026-0028', nama: 'Rehabilitasi Mangrove Karangsong', lokasi: 'Desa Karangsong, Kec. Indramayu', sumberDana: 'APBD', tanggalSelesai: '15 Sep 2026', penanggungJawab: 'Ahmad Fauzi', status: 'Siap Monitoring' },
  { id: 'PRG-2026-0034', nama: 'Rehabilitasi Lahan Kritis Cikedung', lokasi: 'Desa Cikedung, Kec. Indramayu', sumberDana: 'APBD', tanggalSelesai: '22 Jun 2026', penanggungJawab: 'Rina Herdina', status: 'Dalam Monitoring' },
  { id: 'PRG-2026-0032', nama: 'Agroforestri Hutan Desa', lokasi: 'Desa Cibentis, Kec. Ciwaringin', sumberDana: 'APBD', tanggalSelesai: '20 Jun 2026', penanggungJawab: 'Siti Nurfatihah', status: 'Menunggu Evaluasi' },
  { id: 'PRG-2026-0029', nama: 'Rehabilitasi DAS Cimanuk', lokasi: 'Desa Margaluyu, Kec. Cikedung', sumberDana: 'CSR', tanggalSelesai: '18 Sep 2026', penanggungJawab: 'Ahmad Fauzi', status: 'Perlu Tindak Lanjut' },
  { id: 'PRG-2026-0038', nama: 'Pemulihan Daerah Tangkapan Air', lokasi: 'Desa Ciomas, Kec. Rancakalong', sumberDana: 'APBD', tanggalSelesai: '10 Jul 2026', penanggungJawab: 'Rina Herdina', status: 'Monitoring Selesai' },
  { id: 'PRG-2026-0039', nama: 'Penghijauan Bukit Cicunang', lokasi: 'Desa Pakuan, Kec. Banjar', sumberDana: 'CSR', tanggalSelesai: '25 Sep 2026', penanggungJawab: 'Siti Nurfatihah', status: 'Dalam Monitoring' },
  { id: 'PRG-2026-0031', nama: 'Rehabilitasi Mata Air', lokasi: 'Desa Cipendawa, Kec. Bandung Barat', sumberDana: 'APBD', tanggalSelesai: '28 Agu 2026', penanggungJawab: 'Dedi Kurniawan', status: 'Monitoring Selesai' },
  { id: 'PRG-2026-0035', nama: 'Konservasi Sempadan Sungai', lokasi: 'Desa Wanayasa, Kec. Cibitung', sumberDana: 'CSR', tanggalSelesai: '27 Sep 2026', penanggungJawab: 'Rina Herdina', status: 'Menunggu Evaluasi' },
];

const SUMMARY_CARDS = [
  { title: 'Siap Monitoring', value: '12', desc: 'Program siap dimonitoring', trend: '↑ 2 dari bulan lalu', icon: <HiOutlineDocumentMagnifyingGlass className="w-6 h-6 text-emerald-600" />, bgIcon: 'bg-emerald-100', textTrend: 'text-emerald-600 bg-emerald-50' },
  { title: 'Dalam Monitoring', value: '8', desc: 'Program dalam proses', trend: '↑ 1 dari bulan lalu', icon: <HiOutlineClock className="w-6 h-6 text-blue-600" />, bgIcon: 'bg-blue-100', textTrend: 'text-blue-600 bg-blue-50' },
  { title: 'Menunggu Evaluasi', value: '6', desc: 'Hasil monitoring menunggu evaluasi', trend: '↑ 1 dari bulan lalu', icon: <HiOutlineCheckCircle className="w-6 h-6 text-purple-600" />, bgIcon: 'bg-purple-100', textTrend: 'text-purple-600 bg-purple-50' },
  { title: 'Perlu Tindak Lanjut', value: '5', desc: 'Program perlu tindak lanjut', trend: '↑ 2 dari bulan lalu', icon: <HiOutlineExclamationTriangle className="w-6 h-6 text-orange-500" />, bgIcon: 'bg-orange-100', textTrend: 'text-orange-600 bg-orange-50' },
  { title: 'Monitoring Selesai', value: '14', desc: 'Program monitoring selesai', trend: '↑ 3 dari bulan lalu', icon: <HiOutlineCheckCircle className="w-6 h-6 text-emerald-600" />, bgIcon: 'bg-emerald-100', textTrend: 'text-emerald-600 bg-emerald-50' },
  { title: 'Total Program', value: '45', desc: 'APBD/CSR yang dimonitoring', trend: '', icon: <HiOutlineChartBar className="w-6 h-6 text-orange-500" />, bgIcon: 'bg-orange-100', textTrend: '' },
];

const ACTIVITIES = [
  { icon: <HiOutlineCheckCircle className="w-5 h-5 text-purple-500" />, text: 'Hasil monitoring Program Agroforestry Hutan Desa menunggu evaluasi.', time: '27 Mei 2026\n14:20 WIB', bg: 'bg-purple-50' },
  { icon: <HiOutlineExclamationTriangle className="w-5 h-5 text-orange-500" />, text: 'Program Rehabilitasi DAS Cimanuk perlu tindak lanjut.', time: '27 Mei 2026\n10:45 WIB', bg: 'bg-orange-50' },
  { icon: <HiOutlineCalendar className="w-5 h-5 text-blue-500" />, text: 'Pengajuan monitoring Program Rehabilitasi Mangrove Karangsong dimulai.', time: '26 Mei 2026\n16:45 WIB', bg: 'bg-blue-50' },
];

const getStatusStyles = (status: StatusMonitoring) => {
  switch (status) {
    case 'Siap Monitoring': return { badge: 'text-emerald-700 bg-emerald-50', btn: 'text-emerald-700 border-emerald-500 hover:bg-emerald-50', action: 'Mulai Monitoring' };
    case 'Dalam Monitoring': return { badge: 'text-blue-700 bg-blue-50', btn: 'text-blue-700 border-blue-500 hover:bg-blue-50', action: 'Lihat Progres' };
    case 'Menunggu Evaluasi': return { badge: 'text-purple-700 bg-purple-50', btn: 'text-purple-700 border-purple-500 hover:bg-purple-50', action: 'Tinjau Hasil' };
    case 'Perlu Tindak Lanjut': return { badge: 'text-orange-700 bg-orange-50', btn: 'text-orange-700 border-orange-500 hover:bg-orange-50', action: 'Tindak Lanjut' };
    case 'Monitoring Selesai': return { badge: 'text-emerald-700 bg-emerald-50', btn: 'text-emerald-700 border-emerald-500 hover:bg-emerald-50', action: 'Lihat Hasil' };
  }
};

const Header = () => (
  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1.5">Monitoring Program Rehabilitasi</h1>
      <p className="text-sm text-gray-500">Pantau dan kelola kegiatan rehabilitasi yang telah selesai dan siap untuk dimonitoring.</p>
    </div>
    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
      <HiOutlineArrowPath className="w-4 h-4" /> Riwayat Monitoring
    </button>
  </div>
);

const SummaryRow = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
    {SUMMARY_CARDS.map((card, idx) => (
      <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.bgIcon}`}>
            {card.icon}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-500 mb-1">{card.title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
          <p className="text-[10px] text-gray-400 mb-3 min-h-3.75">{card.desc}</p>
          {card.trend && (
            <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold ${card.textTrend}`}>
              {card.trend}
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
);

const FiltersAndTabs = () => (
  <div className="mb-6">
    {/* Tabs */}
    <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto whitespace-nowrap">
      {['Semua', 'Siap Monitoring', 'Dalam Monitoring', 'Menunggu Evaluasi', 'Perlu Tindak Lanjut', 'Monitoring Selesai'].map((tab, i) => (
        <button key={i} className={`pb-3 text-sm font-bold transition-colors border-b-2 ${i === 0 ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
          {tab}
        </button>
      ))}
    </div>

    {/* Filters Grid */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="relative md:col-span-1">
        <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Cari program..." className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500" />
      </div>
      <div>
        <label className="block text-[10px] font-bold text-gray-500 mb-1">Jenis Program</label>
        <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg appearance-none bg-white"><option>Semua</option></select>
      </div>
      <div>
        <label className="block text-[10px] font-bold text-gray-500 mb-1">Sumber Dana</label>
        <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg appearance-none bg-white"><option>Semua</option></select>
      </div>
      <div>
        <label className="block text-[10px] font-bold text-gray-500 mb-1">Lokasi Program</label>
        <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg appearance-none bg-white"><option>Semua</option></select>
      </div>
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <label className="block text-[10px] font-bold text-gray-500 mb-1">Periode Selesai</label>
          <input type="text" placeholder="Pilih periode" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
          <HiOutlineCalendar className="absolute right-3 bottom-2.5 w-4 h-4 text-gray-400" />
        </div>
        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-1 text-sm font-bold text-gray-700 shrink-0">
          <HiOutlineArrowPath className="w-4 h-4" /> Reset
        </button>
      </div>
    </div>
  </div>
);

const ActionButton = () => {
  return (
    <button className="px-3 py-1.5 text-[11px] font-bold rounded-md border border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-colors shadow-sm">
      Lihat Detail
    </button>
  );
};

const DataTable = ({ navigate }: { navigate: any }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
      <thead className="text-[11px] text-[#3A4D3F] bg-[#DCECE0] border-y border-gray-100 font-bold uppercase tracking-wider">
        <tr>
          <th className="px-4 py-4">No</th>
          <th className="px-4 py-4">ID Program</th>
          <th className="px-4 py-4">Nama Program</th>
          <th className="px-4 py-4">Lokasi Program</th>
          <th className="px-4 py-4">Sumber Dana</th>
          <th className="px-4 py-4">Tanggal Selesai</th>
          <th className="px-4 py-4">Penanggung Jawab</th>
          <th className="px-4 py-4">Status</th>
          <th className="px-4 py-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {MOCK_DATA.map((item, idx) => {
          const style = getStatusStyles(item.status);
          return (
            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-4 text-xs">{idx + 1}</td>
              <td className="px-4 py-4 font-bold text-gray-700 text-xs">{item.id}</td>
              <td className="px-4 py-4 font-bold text-gray-800 text-xs w-48 whitespace-normal leading-snug">{item.nama}</td>
              <td className="px-4 py-4 text-xs w-40 whitespace-normal leading-snug">{item.lokasi}</td>
              <td className="px-4 py-4 text-xs">{item.sumberDana}</td>
              <td className="px-4 py-4 text-xs font-medium">{item.tanggalSelesai}</td>
              <td className="px-4 py-4 text-xs flex items-center gap-1.5 mt-1.5"><HiOutlineUserIcon /> {item.penanggungJawab}</td>
              <td className="px-4 py-4">
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md ${style?.badge}`}>{item.status}</span>
              </td>
              <td className="px-4 py-4">
                <div onClick={() => navigate(`/admin/penyuluh/monitoring-program/detail/${item.id}`)} className="cursor-pointer inline-block">
          <ActionButton />
        </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// Helper icon component for table
const HiOutlineUserIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const RightSidebar = () => (
  <div className="space-y-6">
    {/* Ringkasan Status Program */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-bold text-gray-900 mb-6">Ringkasan Status Program</h3>
      <div className="flex items-center gap-6">
        <div className="relative w-28 h-28 shrink-0 rounded-full border-12 border-gray-100" style={{
           background: 'conic-gradient(#059669 0% 31%, #2563eb 31% 49%, #9333ea 49% 62%, #f97316 62% 73%, #10b981 73% 100%)'
        }}>
          {/* Inner circle mask for donut hole */}
          <div className="absolute inset-0 m-auto w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center">
            <span className="text-xs text-gray-500 font-bold">Total</span>
            <span className="text-2xl font-bold text-gray-900">45</span>
          </div>
        </div>
        <div className="flex-1 space-y-2 text-[10px] font-medium text-gray-600">
          <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-600"></div> Siap Monitoring</span> <span>12 (27%)</span></div>
          <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Dalam Monitoring</span> <span>8 (18%)</span></div>
          <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-600"></div> Menunggu Evaluasi</span> <span>6 (13%)</span></div>
          <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Perlu Tindak Lanjut</span> <span>5 (11%)</span></div>
          <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Monitoring Selesai</span> <span>14 (31%)</span></div>
        </div>
      </div>
    </div>

    {/* Tren Status Program */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-bold text-gray-900 mb-1">Tren Status Program <span className="text-gray-400 font-normal text-xs">(6 Bulan Terakhir)</span></h3>
      
      {/* Mockup Line Chart SVG */}
      <div className="w-full h-40 mt-4 relative">
        <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible">
          {/* Y Axis Guides */}
          {[0, 10, 20, 30, 40, 50].map((val, i) => (
            <g key={i}>
              <text x="0" y={150 - (i * 30)} className="text-[10px] fill-gray-400" dominantBaseline="middle">{val}</text>
              <line x1="20" y1={150 - (i * 30)} x2="400" y2={150 - (i * 30)} stroke="#f3f4f6" strokeWidth="1" />
            </g>
          ))}
          {/* X Axis Labels */}
          {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'].map((month, i) => (
            <text key={i} x={40 + (i * 68)} y="165" className="text-[10px] fill-gray-400" textAnchor="middle">{month}</text>
          ))}
          
          {/* Lines & Points */}
          <polyline points="40,90 108,60 176,50 244,30 312,20 380,10" fill="none" stroke="#10b981" strokeWidth="2" />
          <polyline points="40,120 108,115 176,115 244,110 312,95 380,90" fill="none" stroke="#2563eb" strokeWidth="2" />
          <polyline points="40,140 108,140 176,140 244,140 312,135 380,125" fill="none" stroke="#f97316" strokeWidth="2" />
          
          {[
            [40,90],[108,60],[176,50],[244,30],[312,20],[380,10]
          ].map((pt, i) => <circle key={`g-${i}`} cx={pt[0]} cy={pt[1]} r="3" fill="#10b981" />)}
          {[
            [40,120],[108,115],[176,115],[244,110],[312,95],[380,90]
          ].map((pt, i) => <circle key={`b-${i}`} cx={pt[0]} cy={pt[1]} r="3" fill="#2563eb" />)}
          {[
            [40,140],[108,140],[176,140],[244,140],[312,135],[380,125]
          ].map((pt, i) => <circle key={`o-${i}`} cx={pt[0]} cy={pt[1]} r="3" fill="#f97316" />)}
        </svg>
      </div>

      <div className="flex justify-center gap-4 mt-6 text-[10px] font-medium text-gray-600">
        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Selesai</span>
        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Dalam Monitoring</span>
        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Perlu Tindak Lanjut</span>
      </div>
    </div>

    {/* Aktivitas Terbaru */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-bold text-gray-900 mb-5">Aktivitas Terbaru</h3>
      <div className="space-y-4">
        {ACTIVITIES.map((act, i) => (
          <div key={i} className="flex gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${act.bg}`}>
              {act.icon}
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-800 leading-snug">{act.text}</p>
            </div>
            <div className="text-[10px] text-gray-400 text-right whitespace-pre-line shrink-0 leading-tight">
              {act.time}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Info Banner */}
    <div className="bg-[#f0f9f3] rounded-xl p-4 flex items-start gap-3 border border-[#DCECE0]">
      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
        <HiOutlineInformationCircle className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs font-bold text-emerald-800 mb-1.5 leading-snug">Pastikan setiap program dimonitoring sesuai jadwal dan dilengkapi dengan data yang akurat.</p>
        <button className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 hover:text-emerald-700">Pelajari lebih lanjut <span>→</span></button>
      </div>
    </div>
  </div>
);

// ==========================================
// 4. MAIN PAGE
// ==========================================
const MonitoringProgramRehabilitasi: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8faf9] pb-12 w-full max-w-[1600px] mx-auto">
      <Header />
      <SummaryRow />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri - Tabel (Lebar ~70%) */}
        <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <FiltersAndTabs />
          <DataTable navigate={navigate} />
          
          {/* Pagination */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100 mt-4">
            <span>Menampilkan 1 - 8 dari 45 data</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select className="border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none"><option>10 / halaman</option></select>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50"><span className="px-1">&lt;</span></button>
                <button className="px-3 py-1.5 rounded bg-emerald-600 text-white font-medium">1</button>
                <button className="px-3 py-1.5 rounded hover:bg-gray-50 border border-transparent font-medium">2</button>
                <button className="px-3 py-1.5 rounded hover:bg-gray-50 border border-transparent font-medium">3</button>
                <span className="px-2">...</span>
                <button className="px-3 py-1.5 rounded hover:bg-gray-50 border border-transparent font-medium">5</button>
                <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50"><span className="px-1">&gt;</span></button>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan - Sidebar Chart (Lebar ~30%) */}
        <div className="lg:col-span-4">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default MonitoringProgramRehabilitasi;