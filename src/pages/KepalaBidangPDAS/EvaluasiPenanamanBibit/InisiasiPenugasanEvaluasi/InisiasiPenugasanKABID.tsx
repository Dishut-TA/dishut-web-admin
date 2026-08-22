import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineEye } from 'react-icons/hi2';
import { getPenugasanKabidAPI } from '@/services/evaluasi.service';
import toast from 'react-hot-toast';

const InisiasiPenugasanKABID: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dataPenugasan, setDataPenugasan] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPenugasanKabidAPI();
        setDataPenugasan(result);
      } catch (error: any) {
        toast.error(error.message || 'Gagal memuat data penugasan');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = dataPenugasan.filter((item) =>
    item.proyek?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lokasi?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inisiasi Penugasan Evaluasi</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola data dasar proyek dan terbitkan surat penugasan Tim Penilai.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari proyek..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-full text-sm focus:ring-[#185325] focus:border-[#185325] outline-none transition-colors shadow-sm" 
            />
          </div>
          <button 
            onClick={() => navigate('/admin/kabid/evaluasi/penugasan/create')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm whitespace-nowrap"
          >
            <HiOutlinePlus className="w-4 h-4 stroke-2" /> Buat Penugasan Baru
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-200">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Nama Proyek & Lokasi</th>
                <th className="px-6 py-4">Jenis Program</th>
                <th className="px-6 py-4 text-center">Luas (Ha)</th>
                <th className="px-6 py-4 text-center">Status Program</th>
                <th className="px-6 py-4 text-center">Status Surat Tugas</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                 <tr><td colSpan={6} className="text-center py-10 text-gray-500">Memuat data...</td></tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id_penugasan} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="font-bold text-gray-800">{item.proyek || item.nama_proyek}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.lokasi}</div>
                    </td>
                    <td className="px-6 py-5 text-left text-sm font-semibold text-gray-700">{item.jenis_program}</td>
                    <td className="px-6 py-5 text-center text-sm font-semibold text-gray-700">{item.luas || item.luas_ha}</td>
                    <td className="px-6 py-5 text-center">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#DCECE0] text-[#185325]">
                        {item.status_program}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-800">
                        {item.status_surat}
                      </span>
                    </td>
                    <td className="px-6 py-5 flex justify-center">
                      <button 
                        onClick={() => navigate(`/admin/kabid/evaluasi/penugasan/detail/${item.id_penugasan || item.id}`)}
                        title="Lihat Detail Penugasan"
                        className="p-2 text-gray-500 hover:text-[#185325] hover:bg-greenAdmin transition-colors rounded-full cursor-pointer"
                      >
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="text-center py-10 text-gray-500">Tidak ada data.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InisiasiPenugasanKABID;