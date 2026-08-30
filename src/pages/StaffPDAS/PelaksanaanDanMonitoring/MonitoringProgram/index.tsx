import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
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
import { getAllPenugasanAPI } from '@/services/penugasan.service';

const MonitoringProgram: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [penugasans, setPenugasans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPenugasan = async () => {
      try {
        const res = await getAllPenugasanAPI();
        setPenugasans(res.data || []);
      } catch (error) {
        console.error('Gagal mengambil data penugasan', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPenugasan();
  }, []);

  const formattedData = penugasans
    .filter((p: any) => p.jenisKegiatan !== 'Validasi Lokasi' && p.status !== 'Menunggu Penugasan')
    .sort((a: any, b: any) => b.id - a.id)
    .map((p: any) => {
      let programName = '-';
      let location = '-';
      let kthName = '-';
      
      const detail = p.detail || {};
      
      if (p.source_type === 'App\\Models\\DonationProgram') {
        programName = detail.name || '-';
        location = detail.location || '-';
        kthName = detail.kth?.name || '-';
      } else if (p.source_type === 'App\\Models\\ProgramApbd' || p.source_type === 'App\\Models\\ProgramCsr') {
        programName = detail.nama_program || '-';
        location = detail.lokasi || '-';
        kthName = detail.kth?.nama || '-';
      }

      const isSelesai = p.status === 'Selesai' || p.status === 'Dihentikan' || p.status === 'Monitoring Selesai';

      let displayStatus = p.status;
      if (p.status === 'Monitoring Selesai') {
        displayStatus = 'Selesai';
      } else if (['Selesai', 'Menunggu', 'Menunggu Penugasan', 'Berjalan'].includes(p.status)) {
        displayStatus = 'Siap Monitoring';
      }

      return {
        id: p.penugasan_id || p.id,
        program: programName,
        lokasi: location,
        kth: kthName,
        periodeLabel: p.jenisKegiatan,
        periodeDate: p.batasWaktu ? new Date(p.batasWaktu).toLocaleDateString('id-ID') : '-',
        status: displayStatus,
        ringkasanTitle: 'Sedang berjalan',
        ringkasanDesc: p.jenisKegiatan,
        tanggal: p.tanggalPenugasan ? new Date(p.tanggalPenugasan).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-',
        waktu: p.tanggalPenugasan ? new Date(p.tanggalPenugasan).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' : '-',
        tabStatus: p.status === 'Monitoring Selesai' ? 'berjalan' : (p.status === 'Selesai' ? 'berjalan' : (isSelesai ? 'selesai' : 'berjalan'))
      };
    });

  console.log("DEBUG formattedData in MonitoringProgram:", formattedData);

  const filteredData = formattedData.filter(item => {
    const matchesSearch = item.program.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = {
    siap: filteredData.filter(d => d.status === 'Siap Monitoring').length,
    berjalan: filteredData.filter(d => d.status === 'Berjalan').length,
    evaluasi: filteredData.filter(d => d.status === 'Menunggu Evaluasi').length,
    tindakLanjut: filteredData.filter(d => d.status === 'Tindak Lanjut').length,
    selesai: filteredData.filter(d => d.status === 'Selesai').length,
    dihentikan: filteredData.filter(d => d.status === 'Dihentikan').length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Berjalan':
      case 'Menunggu':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            {status}
          </span>
        );
      case 'Siap Monitoring':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            {status}
          </span>
        );
      case 'Menunggu Evaluasi':
      case 'Menunggu Verifikasi':
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
          <p className="text-sm text-slate-500">Halaman ini digunakan untuk memantau progres program rehabilitasi P0-P4 dan hasil evaluasinya.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <PiPlant className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Siap Monitoring</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">{stats.siap}</span>
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
              <span className="text-2xl font-bold text-slate-900">{stats.berjalan}</span>
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
              <span className="text-2xl font-bold text-slate-900">{stats.evaluasi}</span>
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
              <span className="text-2xl font-bold text-slate-900">{stats.tindakLanjut}</span>
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
              <span className="text-2xl font-bold text-slate-900">{stats.selesai}</span>
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
              <span className="text-2xl font-bold text-slate-900">{stats.dihentikan}</span>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-slate-700 placeholder:text-slate-400 bg-white" 
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:flex gap-3 items-center">
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
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">Memuat data...</td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">Tidak ada data program</td>
                </tr>
              ) : currentData.map((row, index) => (
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
          <span>Menampilkan {currentData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–{Math.min(currentPage * itemsPerPage, filteredData.length)} dari {filteredData.length} data</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                <HiChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#008A4B] text-white font-semibold text-xs shadow-sm">
                {currentPage}
              </button>
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                <HiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MonitoringProgram;