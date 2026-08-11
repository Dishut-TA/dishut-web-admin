import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineMagnifyingGlass,
  HiOutlineArrowRight
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { getProgramApbdsAPI } from '@/services/program-apbd.service';

const DaftarUsulanAPBD: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsulan = async () => {
      try {
        const response = await getProgramApbdsAPI();
        const sortedData = response.sort((a: any, b: any) => {
          if (a.status === 'Menunggu Persetujuan' && b.status !== 'Menunggu Persetujuan') return -1;
          if (a.status !== 'Menunggu Persetujuan' && b.status === 'Menunggu Persetujuan') return 1;
          return 0;
        });
        setData(sortedData);
      } catch (error: any) {
        toast.error(error.message || "Gagal memuat data usulan program");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsulan();
  }, []);

  const formatRupiah = (angka: number) => {
    if (!angka) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(angka));
  };

  const filteredData = data.filter(item => 
    item.nama_program?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.kth?.nama?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disetujui': 
        return <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[11px] font-bold">Disetujui</span>;
      case 'Ditolak': 
        return <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-[11px] font-bold">Ditolak</span>;
      case 'Menunggu Persetujuan': 
      default:
        return <span className="inline-block px-4 py-1.5 bg-[#FDE68A] text-yellow-800 rounded-full text-[11px] font-bold">Menunggu Persetujuan</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Data Usulan Program APBD
          </h1>
        </div>
        
        <div className="relative w-full sm:w-72">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari Program atau KTH..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-225">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">ID</th>
                <th className="px-6 py-4 whitespace-nowrap">NAMA PROGRAM</th>
                <th className="px-6 py-4 whitespace-nowrap">KTH PENERIMA</th>
                <th className="px-6 py-4 whitespace-nowrap">LOKASI</th>
                <th className="px-6 py-4 whitespace-nowrap">Anggaran</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <span className="inline-block w-6 h-6 border-2 border-[#185325] border-t-transparent rounded-full animate-spin"></span>
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-800">APBD-{item.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-800">{item.nama_program}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-700 whitespace-nowrap">
                      {item.kth?.nama || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {item.kth?.desa_kelurahan ? `${item.kth.desa_kelurahan}, ${item.kth.kabupaten_kota}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">
                      {formatRupiah(item.anggaran)}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                      <button 
                        onClick={() => navigate(`/admin/kabid/rehabilitasi/program-apbd/verifikasi/${item.id}`)}
                        className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#185325] text-[#185325] hover:bg-[#f0f9f3] text-xs font-bold rounded-full transition-colors"
                      >
                        Periksa Berkas <HiOutlineArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Tidak ada usulan program yang ditemukan.
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

export default DaftarUsulanAPBD;