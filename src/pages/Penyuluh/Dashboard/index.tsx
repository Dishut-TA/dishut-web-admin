import React, { useState, useEffect } from 'react';
import { 
  HiOutlineClipboardDocumentList, 
  HiOutlineMapPin, 
  HiOutlineUsers,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { getMyPenugasanAPI } from '@/services/penugasan.service';

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Menunggu Penugasan': 'bg-gray-100 text-gray-600',
    'Menunggu Verifikasi': 'bg-orange-50 text-orange-600',
    'Berjalan': 'bg-emerald-50 text-emerald-600',
    'Selesai': 'bg-blue-50 text-blue-600',
    'Dihentikan': 'bg-red-50 text-red-600',
  };
  return (
    <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-md ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};

const ActionButton = ({ status }: { status: string }) => {
  const isLanjutkan = status === 'Berjalan' || status === 'Menunggu Verifikasi';
  return (
    <button className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
      isLanjutkan 
        ? 'border-emerald-500 text-emerald-600 hover:bg-emerald-50' 
        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
    }`}>
      {isLanjutkan ? 'Lanjutkan' : 'Lihat Detail'}
    </button>
  );
};

const DashboardPenyuluh: React.FC = () => {
  const [penugasans, setPenugasans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPenugasan = async () => {
      try {
        const res = await getMyPenugasanAPI();
        setPenugasans(res.data || []);
      } catch (error) {
        console.error('Failed to fetch penugasan', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPenugasan();
  }, []);

  const totalAktif = penugasans.filter(p => p.status === 'Berjalan' || p.status === 'Menunggu Verifikasi').length;
  const validasiMenunggu = penugasans.filter(p => (p.jenisKegiatan || p.jenis_kegiatan) === 'Validasi Lokasi' && p.status === 'Menunggu Verifikasi').length;
  const pelaksanaanBerjalan = penugasans.filter(p => (p.jenisKegiatan || p.jenis_kegiatan) === 'Pelaksanaan Penanaman' && p.status === 'Berjalan').length;
  const monitoringBelumSelesai = penugasans.filter(p => (p.jenisKegiatan || p.jenis_kegiatan) === 'Monitoring Program' && p.status !== 'Selesai' && p.status !== 'Dihentikan').length;

  const STATS_DATA = [
    { title: 'Total Penugasan Aktif', value: totalAktif.toString(), sub: 'Penugasan', icon: <HiOutlineClipboardDocumentList />, color: 'text-gray-700', bg: 'bg-[#f0f9f3]', iconColor: 'text-emerald-700' },
    { title: 'Validasi Lokasi', value: validasiMenunggu.toString(), sub: 'Menunggu', subColor: 'text-orange-500', icon: <HiOutlineMapPin />, color: 'text-gray-700', bg: 'bg-orange-50', iconColor: 'text-orange-600' },
    { title: 'Pelaksanaan Berjalan', value: pelaksanaanBerjalan.toString(), sub: 'Program', subColor: 'text-emerald-600', icon: <HiOutlineUsers />, color: 'text-gray-700', bg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { title: 'Monitoring Belum Selesai', value: monitoringBelumSelesai.toString(), sub: 'Program', subColor: 'text-blue-500', icon: <HiOutlineChartBar />, color: 'text-gray-700', bg: 'bg-blue-50', iconColor: 'text-blue-500' },
  ];

  const PROGRAMS_DATA = penugasans.slice(0, 5).map(p => {
    const detail = p.detail || p.penugasanable || {};
    const sourceType = p.source_type || p.penugasanable_type;
    const jenisK = p.jenisKegiatan || p.jenis_kegiatan || '-';
    const tglP = p.tanggalPenugasan || p.tanggal_penugasan;

    let programName = '-';
    let location = '-';
    if (sourceType === 'App\\Models\\DonationProgram') {
      programName = detail.name || '-';
      location = detail.location || '-';
    } else if (sourceType === 'App\\Models\\ProgramApbd' || sourceType === 'App\\Models\\ProgramCsr') {
      programName = detail.nama_program || '-';
      location = detail.lokasi || (detail.kth ? `${detail.kth.desa_kelurahan}, ${detail.kth.kabupaten_kota}` : '-');
    } else if (sourceType === 'App\\Models\\AnalysisResultZone') {
      programName = 'Validasi Lahan Kritis';
      location = detail.desa ? `${detail.desa}, ${detail.kabupaten}` : (detail.kabupaten || '-');
    }

    return {
      id: p.id,
      name: programName,
      loc: location,
      stage: jenisK,
      date: tglP ? new Date(tglP).toLocaleDateString('id-ID') : '-',
      status: p.status
    };
  });

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
                <h3 className="text-2xl font-bold text-gray-800">{isLoading ? '...' : stat.value}</h3>
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
                <th className="px-5 py-3 font-semibold">Tgl Penugasan</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-gray-500">Memuat data...</td>
                </tr>
              ) : PROGRAMS_DATA.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-gray-500">Belum ada penugasan</td>
                </tr>
              ) : PROGRAMS_DATA.map((prog, idx) => (
                <tr key={prog.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">{idx + 1}</td>
                  <td className="px-5 py-4 text-xs font-medium text-gray-500">{prog.id}</td>
                  <td className="px-5 py-4 font-medium text-gray-800">{prog.name}</td>
                  <td className="px-5 py-4 text-xs">{prog.loc}</td>
                  <td className="px-5 py-4 text-xs">{prog.stage}</td>
                  <td className="px-5 py-4 text-xs">{prog.date}</td>
                  <td className="px-5 py-4"><StatusBadge status={prog.status} /></td>
                  <td className="px-5 py-4"><ActionButton status={prog.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DashboardPenyuluh;