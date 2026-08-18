import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineAdjustmentsHorizontal,
  HiOutlineEye
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { getProgramApbdsAPI } from '@/services/program-apbd.service';
import { getProgramCsrsAPI } from '@/services/program-csr.service';

const RiwayatRehabilitasiKABID: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllPrograms = async () => {
      setIsLoading(true);
      try {
        // Fetch dari kedua API secara paralel
        const [apbdRes, csrRes] = await Promise.all([
          getProgramApbdsAPI().catch(() => []),
          getProgramCsrsAPI().catch(() => [])
        ]);

        // Mapping Data APBD
        const mappedApbd = apbdRes.map((item: any) => ({
          id: `APBD-${String(item.id).padStart(3, '0')}`,
          dbId: `APBD-${item.id}`,
          nama: item.nama_program,
          pendanaan: 'APBD',
          mitra: 'Dinas Kehutanan Jabar',
          anggaran: Number(item.anggaran) || 0,
          status: item.status,
          created_at: item.created_at
        }));

        // Mapping Data CSR
        const mappedCsr = csrRes.map((item: any) => ({
          id: `CSR-${String(item.id).padStart(3, '0')}`,
          dbId: `CSR-${item.id}`,
          nama: item.nama_program,
          pendanaan: 'CSR',
          mitra: item.rekomendasi_mitra || 'PT. Mitra CSR',
          anggaran: Number(item.anggaran) || 0,
          status: item.status,
          created_at: item.created_at
        }));

        // Gabungkan dan urutkan
        const combinedData = [...mappedApbd, ...mappedCsr].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setData(combinedData);
      } catch (error) {
        toast.error("Gagal memuat data riwayat program.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPrograms();
  }, []);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  const getStatusStyle = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('selesai')) return 'text-[#185325]';
    if (s.includes('berjalan') || s.includes('aktif')) return 'text-orange-500';
    if (s.includes('dihentikan') || s.includes('ditolak')) return 'text-red-600';
    return 'text-gray-600';
  };

  const filteredData = data.filter((item) => 
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 px-4 sm:px-0 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-[26px] font-bold text-gray-900">
            Riwayat Program Rehabilitasi
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari Program.." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#185325] focus:border-[#185325] outline-none transition-all shadow-sm" 
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-semibold transition-colors border border-gray-300 shadow-sm cursor-pointer">
            <HiOutlineAdjustmentsHorizontal className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap min-w-250">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Nama Program</th>
                <th className="px-6 py-4">Pendanaan</th>
                <th className="px-6 py-4">Mitra</th>
                <th className="px-6 py-4">Anggaran</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-medium">
                    <span className="inline-block w-5 h-5 border-2 border-t-transparent border-gray-400 rounded-full animate-spin mb-2"></span>
                    <br />Memuat data...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.dbId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{item.nama}</td>
                    <td className="px-6 py-4 text-gray-700">{item.pendanaan}</td>
                    <td className="px-6 py-4 text-gray-700">{item.mitra}</td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{formatRupiah(item.anggaran)}</td>
                    <td className="px-6 py-4 text-center font-bold">
                      <span className={getStatusStyle(item.status)}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center items-center">
                      <button 
                        onClick={() => navigate(`/admin/kabid/rehabilitasi/riwayat-rehabilitasi/detail/${item.dbId}`)}
                        className="text-gray-500 hover:text-[#185325] p-1.5 rounded-full hover:bg-[#DCECE0] transition-colors cursor-pointer"
                      >
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-medium">
                    Program tidak ditemukan.
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

export default RiwayatRehabilitasiKABID;