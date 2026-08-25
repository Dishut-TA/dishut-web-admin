import React from 'react';
import { 
  HiOutlineClipboardDocumentList, 
  HiOutlineMapPin, 
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineBell,
  HiChevronRight,
  HiChevronLeft,
  HiOutlineArrowTrendingUp
} from 'react-icons/hi2';

const STATS_DATA = [
  { title: 'Total Penugasan Aktif', value: '6', sub: 'Penugasan', icon: <HiOutlineClipboardDocumentList />, color: 'text-gray-700', bg: 'bg-[#f0f9f3]', iconColor: 'text-emerald-700' },
  { title: 'Validasi Lokasi', value: '2', sub: 'Menunggu', subColor: 'text-orange-500', icon: <HiOutlineMapPin />, color: 'text-gray-700', bg: 'bg-orange-50', iconColor: 'text-orange-600' },
  { title: 'Pelaksanaan Berjalan', value: '3', sub: 'Program', subColor: 'text-emerald-600', icon: <HiOutlineUsers />, color: 'text-gray-700', bg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { title: 'Monitoring Belum Selesai', value: '2', sub: 'Program', subColor: 'text-blue-500', icon: <HiOutlineChartBar />, color: 'text-gray-700', bg: 'bg-blue-50', iconColor: 'text-blue-500' },
];

const PROGRAMS_DATA = [
  { id: 'PRG-2024-015', name: 'Rehabilitasi DAS Citarum Hulu', loc: 'Kab. Bandung Barat', stage: 'Validasi Lokasi', date: '25 Mei 2024', status: 'Perlu Validasi', action: 'Lanjutkan' },
  { id: 'PRG-2024-008', name: 'Agroforestry Cililin', loc: 'Kab. Bandung Barat', stage: 'Pelaksanaan', date: '30 Mei 2024', status: 'Berjalan', action: 'Lanjutkan' },
  { id: 'PRG-2024-011', name: 'Konservasi Mata Air Cisangkuy', loc: 'Kab. Sumedang', stage: 'Pelaksanaan', date: '15 Juni 2024', status: 'Berjalan', action: 'Lanjutkan' },
  { id: 'PRG-2024-003', name: 'Rehabilitasi Lahan Kritis Purwakarta', loc: 'Kab. Purwakarta', stage: 'Monitoring', date: '20 Mei 2024', status: 'Monitoring', action: 'Lihat Detail' },
  { id: 'PRG-2024-010', name: 'Penghijauan Cikole', loc: 'Kab. Lembang', stage: 'Monitoring', date: '10 Juni 2024', status: 'Monitoring', action: 'Lihat Detail' },
];

const AGENDA_DATA = [
  { date: '20', month: 'MEI', time: '09:00 - 12:00', title: 'Validasi Lokasi Rehabilitasi DAS Citarum Hulu', loc: 'Kab. Bandung Barat' },
  { date: '21', month: 'MEI', time: '10:00 - 14:00', title: 'Pelaksanaan Agroforestry Cililin', loc: 'Kab. Bandung Barat' },
  { date: '23', month: 'MEI', time: '09:00 - 12:00', title: 'Monitoring Lahan Kritis Purwakarta', loc: 'Kab. Purwakarta' },
  { date: '24', month: 'MEI', time: '13:00 - 16:00', title: 'Koordinasi Kelompok Tani', loc: 'Kec. Cisarua, Kab. Bandung Barat' },
];

const PROGRESS_DATA = [
  { title: 'Rehabilitasi DAS Citarum Hulu', id: 'PRG-2024-015', status: 'Perlu Validasi', percent: 20, color: 'bg-gray-200' },
  { title: 'Agroforestry Cililin', id: 'PRG-2024-008', status: 'Berjalan', percent: 65, color: 'bg-emerald-500' },
  { title: 'Konservasi Mata Air Cisangkuy', id: 'PRG-2024-011', status: 'Berjalan', percent: 55, color: 'bg-emerald-500' },
];

const UPDATES_DATA = [
  { text: 'Penugasan baru diberikan untuk program Rehabilitasi DAS Citarum Hulu.', time: '1 jam yang lalu', icon: <HiOutlineClipboardDocumentList className="text-orange-500 w-5 h-5" /> },
  { text: 'Validasi lokasi diperlukan untuk program Rehabilitasi DAS Citarum Hulu.', time: '3 jam yang lalu', icon: <HiOutlineMapPin className="text-orange-500 w-5 h-5" /> },
  { text: 'Monitoring program Rehabilitasi Lahan Kritis Purwakarta mendekati tenggat waktu.', time: '1 hari yang lalu', icon: <HiOutlineChartBar className="text-blue-500 w-5 h-5" /> },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Perlu Validasi': 'bg-orange-50 text-orange-600',
    'Berjalan': 'bg-emerald-50 text-emerald-600',
    'Monitoring': 'bg-blue-50 text-blue-600',
  };
  return (
    <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-md ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};

const ActionButton = ({ action }: { action: string }) => {
  const isLanjutkan = action === 'Lanjutkan';
  return (
    <button className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
      isLanjutkan 
        ? 'border-emerald-500 text-emerald-600 hover:bg-emerald-50' 
        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
    }`}>
      {action}
    </button>
  );
};

const DashboardPenyuluh: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 bg-[#f8faf9] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1 tracking-tight">
          Dashboard Penyuluh
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          Pantau tugas lapangan, validasi lokasi, pelaksanaan kegiatan, dan monitoring program.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS_DATA.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.iconColor} shrink-0`}>
              {React.cloneElement(stat.icon, { className: 'w-8 h-8' })}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">{stat.title}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <span className={`text-xs font-medium ${stat.subColor || 'text-gray-400'}`}>{stat.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabel Program Aktif (Full Width) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col w-full">
        <div className="p-5 border-b border-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-800 font-bold">
            <HiOutlineClipboardDocumentList className="w-5 h-5 text-emerald-600" />
            <h3>Program Aktif Saya</h3>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-5 py-3 font-semibold">No</th>
                <th className="px-5 py-3 font-semibold">ID Program</th>
                <th className="px-5 py-3 font-semibold">Nama Program</th>
                <th className="px-5 py-3 font-semibold">Lokasi</th>
                <th className="px-5 py-3 font-semibold">Tahap</th>
                <th className="px-5 py-3 font-semibold">Batas Waktu</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {PROGRAMS_DATA.map((prog, idx) => (
                <tr key={prog.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">{idx + 1}</td>
                  <td className="px-5 py-4 text-xs font-medium text-gray-500">{prog.id}</td>
                  <td className="px-5 py-4 font-medium text-gray-800">{prog.name}</td>
                  <td className="px-5 py-4 text-xs">{prog.loc}</td>
                  <td className="px-5 py-4 text-xs">{prog.stage}</td>
                  <td className="px-5 py-4 text-xs">{prog.date}</td>
                  <td className="px-5 py-4"><StatusBadge status={prog.status} /></td>
                  <td className="px-5 py-4"><ActionButton action={prog.action} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-500 mt-auto">
          <span>Menampilkan 1 - 5 dari 6 program</span>
          <div className="flex gap-1">
            <button className="p-1 rounded border border-gray-200 hover:bg-gray-50"><HiChevronLeft className="w-4 h-4" /></button>
            <button className="px-2.5 py-1 rounded bg-emerald-600 text-white font-medium">1</button>
            <button className="px-2.5 py-1 rounded border border-gray-200 hover:bg-gray-50 font-medium">2</button>
            <button className="p-1 rounded border border-gray-200 hover:bg-gray-50"><HiChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Bottom 4 Columns (Agenda, Progress, Pembaruan, Sebaran) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
        
        {/* 1. Agenda Section (Dipindahkan ke sini) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2 text-gray-800 font-bold">
              <HiOutlineCalendarDays className="w-5 h-5 text-emerald-600" />
              <h3>Agenda Terdekat</h3>
            </div>
          </div>
          
          <div className="space-y-4 flex-1">
            {AGENDA_DATA.map((agenda, idx) => (
              <div key={idx} className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex flex-col items-center justify-center min-w-10">
                  <span className="text-2xl font-bold text-emerald-600 leading-none">{agenda.date}</span>
                  <span className="text-[10px] font-bold text-gray-400 mt-1">{agenda.month}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-1 font-medium">
                    <HiOutlineClock className="w-3 h-3" /> {agenda.time}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1 leading-snug truncate">{agenda.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500 truncate">
                    <HiOutlineMapPin className="w-3.5 h-3.5 shrink-0" /> {agenda.loc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            Lihat Kalender <HiChevronRight className="w-3 h-3" />
          </button>
        </div>
        
        {/* 2. Progress Kegiatan */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-800 font-bold mb-5">
            <HiOutlineArrowTrendingUp className="w-5 h-5 text-emerald-600" />
            <h3>Progress Kegiatan</h3>
          </div>
          <div className="space-y-5">
            {PROGRESS_DATA.map((prog, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-1">
                  <div className="min-w-0 pr-2">
                    <h4 className="text-sm font-semibold text-gray-800 truncate">{prog.title}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">{prog.id}</p>
                  </div>
                  <StatusBadge status={prog.status} />
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${prog.color} rounded-full`} style={{ width: `${prog.percent}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-600">{prog.percent}%</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            Lihat Semua Progress <HiChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* 3. Pembaruan Terbaru */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-800 font-bold mb-5">
            <HiOutlineBell className="w-5 h-5 text-emerald-600" />
            <h3>Pembaruan Terbaru</h3>
          </div>
          <div className="space-y-4">
            {UPDATES_DATA.map((update, idx) => (
              <div key={idx} className="flex gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="mt-0.5">{update.icon}</div>
                <div>
                  <p className="text-sm text-gray-700 font-medium leading-snug">{update.text}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{update.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            Lihat Semua Notifikasi <HiChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* 4. Sebaran Penugasan Aktif (Map Mockup) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col">
          <div className="flex items-center gap-2 text-gray-800 font-bold mb-4">
            <HiOutlineMapPin className="w-5 h-5 text-emerald-600" />
            <h3>Sebaran Penugasan</h3>
          </div>
          
          <div className="flex-1 bg-gray-50/50 rounded-xl border border-gray-100 relative overflow-hidden flex items-center justify-center min-h-50">
             {/* Mockup Map */}
             <div className="absolute inset-0 opacity-10 bg-bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-600 via-transparent to-transparent"></div>
             
             {/* Titik Lokasi */}
             <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
               <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md shadow-emerald-200">2</div>
               <span className="text-[10px] font-medium text-gray-600 mt-1">Bekasi</span>
             </div>
             <div className="absolute top-1/3 right-1/3 flex flex-col items-center">
               <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md shadow-emerald-200">1</div>
               <span className="text-[10px] font-medium text-gray-600 mt-1">Subang</span>
             </div>
             <div className="absolute bottom-1/3 left-1/3 flex flex-col items-center">
               <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md shadow-emerald-200">2</div>
               <span className="text-[10px] font-medium text-gray-600 mt-1">Bandung Barat</span>
             </div>
             <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center">
               <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md shadow-emerald-200">1</div>
               <span className="text-[10px] font-medium text-gray-600 mt-1">Sumedang</span>
             </div>
             
             {/* Legend */}
             <div className="absolute bottom-3 left-4 flex gap-4 text-[10px] font-medium text-gray-500">
               <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-600"></span> Lokasi Penugasan</div>
             </div>
          </div>

          <button className="mt-4 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            Lihat Peta Lengkap <HiChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default DashboardPenyuluh;