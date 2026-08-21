import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineCalendar, 
  HiOutlineMapPin, 
  HiChevronDown, 
  HiChevronUp, 
  HiOutlineInformationCircle,
  HiOutlineDocumentText
} from 'react-icons/hi2';
import { PiPlantFill, PiLeafFill } from 'react-icons/pi';

interface PenugasanRow {
  id: string;
  program: string;
  lokasi: string;
  jenisPenugasan: 'Penanaman' | 'Penyulaman';
  sumberProgram: string;
  periode: string;
  target: string;
  status: string;
  keterangan: string;
  rincian?: any;
}

const mockData: PenugasanRow[] = [
  {
    id: 'PRG-001',
    program: 'Rehabilitasi Lahan Desa Sukamaju',
    jenisPenugasan: 'Penanaman',
    sumberProgram: 'Donasi',
    lokasi: 'Desa Sukamaju, Kec. Cikalongwetan',
    periode: 'Mei - Jul 2025',
    target: '200 Pohon',
    status: 'Aktif',
    keterangan: 'Mulai Mei 2025\ns.d. Jul 2025',
    rincian: {
      targetTanaman: '200 Pohon',
      jenisTanaman: 'Mahoni, Trembesi',
      sumberBibit: 'KTH Lestari'
    }
  },
  {
    id: 'PRG-002',
    program: 'Rehabilitasi Lahan Desa Mandalasari',
    jenisPenugasan: 'Penyulaman',
    sumberProgram: 'CSR PT. Hijau Lestari',
    lokasi: 'Desa Mandalasari, Kec. Cipongkor',
    periode: 'Jun - Jul 2025',
    target: '50 Pohon',
    status: 'Aktif',
    keterangan: 'Mulai Jun 2025\ns.d. Jul 2025',
    rincian: {
      targetPenyulaman: '50 Pohon',
      alasan: 'Tanaman mati/rusak',
      jenisTanaman: 'Sama dengan awal tanam'
    }
  },
  {
    id: 'PRG-003',
    program: 'Rehabilitasi Lahan Desa Cikawaru',
    jenisPenugasan: 'Penanaman',
    sumberProgram: 'APBD',
    lokasi: 'Desa Cikawaru, Kec. Cikalongwetan',
    periode: 'Feb - Apr 2025',
    target: '150 Pohon',
    status: 'Aktif',
    keterangan: 'Mulai Feb 2025\ns.d. Apr 2025',
  }
];

const DashboardKTHPelaksanaan: React.FC = () => {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleNavigateDetail = (row: PenugasanRow) => {
    if (row.jenisPenugasan === 'Penanaman') {
      navigate(`/admin/kth-pelaksanaan/dashboard/penanaman/${row.id}`);
    } else {
      navigate(`/admin/kth-pelaksanaan/dashboard/penyulaman/${row.id}`);
    }
  };

  return (
    <div className="w-full mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#14532D]">Selamat Datang, KTH Lestari!</h1>
          <p className="text-sm text-gray-500 mt-1">Berikut ringkasan penugasan program rehabilitasi yang diberikan kepada KTH.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 flex items-center gap-2 text-sm font-semibold text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50">
          <HiOutlineCalendar className="w-4 h-4" />
          <span>01 Jan 2025 - 31 Mei 2025</span>
          <HiChevronDown className="w-4 h-4 text-gray-400 ml-2" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex gap-4 items-start mb-6">
            <div className="w-14 h-14 rounded-full bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center shrink-0">
              <PiPlantFill className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#16A34A] mb-1">Penugasan Penanaman</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-bold text-gray-900">2</h3>
                <span className="text-sm font-medium text-gray-500">Program</span>
              </div>
            </div>
          </div>
          <div className="bg-[#F0FDF4] text-[#16A34A] text-xs font-bold px-3 py-2.5 rounded-lg flex items-center gap-2 border border-[#DCFCE7]">
            <HiOutlineCalendar className="w-4 h-4" /> 1 Program Selesai
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex gap-4 items-start mb-6">
            <div className="w-14 h-14 rounded-full bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center shrink-0">
              <PiLeafFill className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#7C3AED] mb-1">Penugasan Penyulaman</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-bold text-gray-900">1</h3>
                <span className="text-sm font-medium text-gray-500">Program</span>
              </div>
            </div>
          </div>
          <div className="bg-[#F5F3FF] text-[#7C3AED] text-xs font-bold px-3 py-2.5 rounded-lg flex items-center gap-2 border border-[#EDE9FE]">
            <HiOutlineCalendar className="w-4 h-4" /> 0 Program Selesai
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex gap-4 items-start mb-6">
            <div className="w-14 h-14 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
              <HiOutlineMapPin className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2563EB] mb-1">Total Lokasi</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-bold text-gray-900">3</h3>
                <span className="text-sm font-medium text-gray-500">Lokasi</span>
              </div>
            </div>
          </div>
          <div className="bg-[#EFF6FF] text-[#2563EB] text-xs font-bold px-3 py-2.5 rounded-lg flex items-center gap-2 border border-[#DBEAFE]">
            <HiOutlineMapPin className="w-4 h-4" /> Di 2 Desa
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <HiOutlineDocumentText className="w-5 h-5 text-[#16A34A]" />
          <h2 className="font-bold text-gray-900 text-lg">Penugasan Terbaru</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 whitespace-nowrap">
            <thead className="bg-[#DCECE0]/50 text-[#3A4D3F] text-xs font-bold uppercase border-b border-gray-100">
              <tr>
                <th className="px-2 py-4 w-12 text-center">No.</th>
                <th className="px-2 py-4">Program</th>
                <th className="px-2 py-4">Jenis Penugasan</th>
                <th className="px-2 py-4">Sumber Program</th>
                <th className="px-2 py-4">Lokasi</th>
                <th className="px-2 py-4">Periode / Target</th>
                <th className="px-2 py-4">Status</th>
                <th className="px-2 py-4">Keterangan</th>
                <th className="px-2 py-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {mockData.map((row, index) => {
                const isExpanded = expandedRows.includes(row.id);
                const isPenanaman = row.jenisPenugasan === 'Penanaman';

                return (
                  <React.Fragment key={row.id}>
                    <tr 
                      onClick={() => toggleRow(row.id)} 
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${isExpanded ? 'bg-gray-50/50' : ''}`}
                    >
                      <td className="px-2 py-4 text-center">{index + 1}</td>
                      <td className="px-2 py-4 font-bold text-gray-900">{row.program}</td>
                      <td className="px-2 py-4">
                        <span className={`px-3 py-1.5 rounded-md text-[10px] font-bold ${
                          isPenanaman ? 'bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]' : 'bg-[#F5F3FF] text-[#7C3AED] border border-[#EDE9FE]'
                        }`}>
                          {row.jenisPenugasan}
                        </span>
                      </td>
                      <td className="px-2 py-4">{row.sumberProgram}</td>
                      <td className="px-2 py-4 whitespace-pre-line leading-relaxed">{row.lokasi.replace(', ', ',\n')}</td>
                      <td className="px-2 py-4 whitespace-pre-line leading-relaxed">
                        {row.periode}
                        <br/>
                        <span className="text-gray-500 font-normal">Target {row.target}</span>
                      </td>
                      <td className="px-2 py-4">
                        <span className="px-3 py-1.5 bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] rounded-md text-[10px] font-bold">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-2 py-4 whitespace-pre-line leading-relaxed text-gray-500 font-normal">
                        {row.keterangan}
                      </td>
                      <td className="px-2 py-4 text-right">
                        {isExpanded ? <HiChevronUp className="w-5 h-5 text-gray-400" /> : <HiChevronDown className="w-5 h-5 text-gray-400" />}
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {isExpanded && row.rincian && (
                      <tr className="bg-gray-50/30">
                        <td colSpan={9} className="px-6 pb-6 pt-2">
                          <div className={`rounded-xl border p-5 flex items-center justify-between gap-6 ${
                            isPenanaman ? 'bg-[#F0FDF4]/30 border-[#DCFCE7]' : 'bg-[#F5F3FF]/30 border-[#EDE9FE]'
                          }`}>
                            <div className="flex-1">
                              <p className={`text-[11px] font-bold mb-4 ${isPenanaman ? 'text-[#16A34A]' : 'text-[#7C3AED]'}`}>
                                Detail {row.jenisPenugasan}
                              </p>
                              <div className="flex gap-12">
                                <div className="flex gap-3">
                                  <div className={`mt-0.5 ${isPenanaman ? 'text-[#16A34A]' : 'text-[#7C3AED]'}`}>
                                    <HiOutlineCalendar className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-gray-900 mb-0.5">Target {isPenanaman ? 'Tanaman' : 'Penyulaman'}</p>
                                    <p className="text-xs text-gray-600 font-semibold">{row.rincian.targetTanaman || row.rincian.targetPenyulaman}</p>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <div className={`mt-0.5 ${isPenanaman ? 'text-[#16A34A]' : 'text-[#7C3AED]'}`}>
                                    <PiPlantFill className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-gray-900 mb-0.5">{isPenanaman ? 'Jenis Tanaman' : 'Alasan Penyulaman'}</p>
                                    <p className="text-xs text-gray-600 font-semibold">{row.rincian.jenisTanaman || row.rincian.alasan}</p>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <div className={`mt-0.5 ${isPenanaman ? 'text-[#16A34A]' : 'text-[#7C3AED]'}`}>
                                    <HiOutlineDocumentText className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-gray-900 mb-0.5">{isPenanaman ? 'Sumber Bibit' : 'Jenis Tanaman'}</p>
                                    <p className="text-xs text-gray-600 font-semibold">{row.rincian.sumberBibit || row.rincian.jenisTanaman}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNavigateDetail(row);
                              }}
                              className={`px-5 py-2.5 bg-white border rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-colors hover:bg-gray-50 ${
                                isPenanaman ? 'border-[#16A34A] text-[#16A34A]' : 'border-[#7C3AED] text-[#7C3AED]'
                              }`}
                            >
                              <HiOutlineDocumentText className="w-4 h-4" /> 
                              Lihat Detail {row.jenisPenugasan}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-[#F8FAFC] border-t border-gray-100 p-4 flex items-center gap-2 text-xs text-gray-500 font-medium">
          <HiOutlineInformationCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
          Data penugasan diupdate secara berkala. Pastikan melaksanakan kegiatan sesuai arahan penyuluh.
        </div>
      </div>
    </div>
  );
};

export default DashboardKTHPelaksanaan;