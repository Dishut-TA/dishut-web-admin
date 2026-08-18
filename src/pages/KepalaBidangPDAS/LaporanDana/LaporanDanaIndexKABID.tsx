import React, { useState, useEffect } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { getLaporanDanasAPI } from '@/services/laporan-dana.service';

const LaporanDanaIndexKABID: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getLaporanDanasAPI();
        
        // Mengurutkan dari yang terbaru (menunggu verifikasi biasanya di atas)
        const sortedData = response.sort((a: any, b: any) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        setData(sortedData);
      } catch (error: any) {
        toast.error(error.message || "Gagal memuat daftar laporan dana.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(angka || 0));
  };

  const renderStatusBadge = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('terverifikasi') || s.includes('disetujui')) {
      return <span className="px-4 py-1.5 bg-[#DCECE0] text-[#185325] rounded-full text-[11px] font-bold whitespace-nowrap">{status}</span>;
    }
    if (s.includes('revisi') || s.includes('perbaikan')) {
      return <span className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-[11px] font-bold whitespace-nowrap">{status}</span>;
    }
    return <span className="px-4 py-1.5 bg-[#FDE68A] text-yellow-800 rounded-full text-[11px] font-bold whitespace-nowrap">{status}</span>;
  };

  const filteredData = data.filter((item) => 
    item.nama_program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sumber_dana.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 px-4 sm:px-0 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
        <h1 className="text-xl md:text-[26px] font-bold text-gray-900">Laporan Dana</h1>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari proyek.." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-semibold transition-colors shadow-sm cursor-pointer">
            <HiOutlineAdjustmentsHorizontal className="w-5 h-5" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-250">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">ID</th>
                <th className="px-6 py-4 whitespace-nowrap">Nama Program</th>
                <th className="px-6 py-4 whitespace-nowrap">Tahap</th>
                <th className="px-6 py-4 whitespace-nowrap">Sumber Dana</th>
                <th className="px-6 py-4 whitespace-nowrap">Dana Disalurkan</th>
                <th className="px-6 py-4 whitespace-nowrap">Dana Direalisasikan</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500 font-medium">
                    <span className="inline-block w-5 h-5 border-2 border-t-transparent border-gray-400 rounded-full animate-spin mb-2"></span>
                    <br />Memuat data...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">
                      {item.sumber_dana}-{String(item.program_id).padStart(3, '0')}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-800 whitespace-nowrap">
                      {item.nama_program}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-700 whitespace-nowrap">
                      {item.tahap}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-700 whitespace-nowrap">
                      {item.sumber_dana}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-800 whitespace-nowrap">
                      {formatRupiah(item.dana_disalurkan)}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-800 whitespace-nowrap">
                      {formatRupiah(item.dana_direalisasikan)}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {renderStatusBadge(item.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500 font-medium">
                    Tidak ada laporan dana yang tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LaporanDanaIndexKABID;