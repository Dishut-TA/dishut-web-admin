import React from 'react';
import { 
  HiOutlineClipboardDocumentList, 
  HiOutlineChartBar, 
  HiOutlineCheckBadge,
  HiOutlineMapPin,
  HiOutlineCloudArrowUp,
  HiOutlineInformationCircle
} from 'react-icons/hi2';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

const STATS_DATA = [
  { title: 'Tugas Pelaksanaan', value: 2, icon: <HiOutlineClipboardDocumentList />, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Tugas Monitoring', value: 2, icon: <HiOutlineChartBar />, color: 'text-orange-600', bg: 'bg-orange-50' },
  { title: 'Program Selesai', value: 2, icon: <HiOutlineCheckBadge />, color: 'text-[#185325]', bg: 'bg-[#DCECE0]' },
];

const DONUT_DATA = [
  { name: 'Pelaksanaan', value: 2, color: '#3B82F6' },
  { name: 'Monitoring', value: 2, color: '#F59E0B' },
  { name: 'Selesai', value: 2, color: '#10B981' },
];

const BAR_DATA = [
  { name: 'Penanaman Sengon', hidup: 950, mati: 50, rusak: 0 },
  { name: 'Penghijauan Tol', hidup: 500, mati: 500, rusak: 0 },
];

const ACTIVE_TASKS = [
  { id: 1, title: 'Reboisasi Gunung B', kth: 'KTH Lestari', status: 'DALAM PELAKSANAAN', type: 'blue' },
  { id: 2, title: 'Penanaman Sengon APBD', kth: 'KTH Kayu Berkah', status: 'DALAM MONITORING', type: 'green' },
  { id: 3, title: 'Penghijauan Jalan Tol CSR', kth: 'KTH Jalan Tol', status: 'PERLU PERBAIKAN', type: 'red' },
];

const StatCard = ({ title, value, icon, color, bg }: any) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
    <div className={`p-4 rounded-2xl ${bg} ${color} shrink-0`}>
      {React.cloneElement(icon, { className: 'w-7 h-7' })}
    </div>
    <div>
      <p className="text-sm font-bold text-gray-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800 tracking-tight">{value}</h3>
    </div>
  </div>
);

const TaskBadge = ({ status, type }: { status: string, type: string }) => {
  const styles: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-[#f0f9f3] text-[#185325] border-[#DCECE0]',
    red: 'bg-red-50 text-red-700 border-red-100',
  };
  return (
    <span className={`px-3 py-1.5 text-[10px] font-bold rounded-full border shadow-sm tracking-wider uppercase ${styles[type]}`}>
      {status}
    </span>
  );
};

const DashboardPenyuluh: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">
          Dashboard Penyuluh Kehutanan
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          Ringkasan tugas penanaman dan monitoring Anda di lapangan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS_DATA.map((stat, idx) => <StatCard key={idx} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-base font-bold text-gray-800 mb-6">Distribusi Tugas</h3>
          <div className="flex-1 min-h-62.5">
            <ResponsiveContainer w-full h-full>
              <PieChart>
                <Pie data={DONUT_DATA} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value" stroke="none">
                  {DONUT_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-base font-bold text-gray-800 mb-6">Progres Monitoring (2 Tugas Terakhir)</h3>
          <div className="flex-1 min-h-62.5">
            <ResponsiveContainer w-full h-full>
              <BarChart data={BAR_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingTop: '20px' }} />
                <Bar dataKey="hidup" name="Hidup" fill="#10B981" radius={[6, 6, 0, 0]} maxBarSize={50} />
                <Bar dataKey="mati" name="Mati" fill="#EF4444" radius={[6, 6, 0, 0]} maxBarSize={50} />
                <Bar dataKey="rusak" name="Rusak" fill="#F59E0B" radius={[6, 6, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-800 mb-6">Tugas Aktif (Prioritas)</h3>
          <div className="space-y-4">
            {ACTIVE_TASKS.map((task) => (
              <div key={task.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gray-100 hover:border-[#185325]/30 hover:bg-[#f8fbf9] transition-all group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 text-gray-400 group-hover:bg-[#DCECE0] group-hover:text-[#185325] rounded-xl transition-colors">
                    <HiOutlineMapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-1">{task.title}</h4>
                    <p className="text-xs text-gray-500 font-medium">{task.kth}</p>
                  </div>
                </div>
                <div className="ml-14 sm:ml-0">
                  <TaskBadge status={task.status} type={task.type} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-base font-bold text-gray-800 mb-6">Informasi & Sinkronisasi</h3>
          <div className="bg-[#f0f9f3] border border-[#DCECE0] rounded-2xl p-5 mb-6 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-2 relative z-10">
              <div className="relative flex h-3 w-3 mt-0.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <h4 className="text-sm font-bold text-[#185325]">Sistem Online & Tersinkronisasi</h4>
            </div>
            <p className="text-xs text-gray-600 font-medium ml-6 relative z-10">
              Aplikasi berjalan normal. Semua laporan langsung terkirim ke server secara real-time.
            </p>
            <HiOutlineCloudArrowUp className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-500 opacity-5 pointer-events-none" />
          </div>

          <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3 text-gray-700 font-bold text-sm">
              <HiOutlineInformationCircle className="w-5 h-5 text-blue-500" />
              Panduan Pengisian:
            </div>
            <ul className="list-none space-y-2.5">
              {[
                'Pastikan GPS / Lokasi HP aktif saat pelaporan.',
                'Foto kondisi lapangan harus diambil langsung dan jelas (tidak blur).',
                'Jika ada tanaman rusak, wajib menambahkan catatan spesifik (hama/cuaca).'
              ].map((text, i) => (
                <li key={i} className="text-xs text-gray-600 font-medium flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPenyuluh;