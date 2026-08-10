import React, { useState, useEffect, useMemo } from 'react';
import { 
  HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineEye, 
  HiOutlinePencil, HiOutlineChevronLeft, HiOutlineChevronRight 
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import ModalInputKTH from './components/ModalInputKTH'; 
import { getKthsAPI, type KthResponseData } from '@/services/kth.service';

const DataKTH: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCdk, setSelectedCdk] = useState('');
  const [selectedKabupaten, setSelectedKabupaten] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState<KthResponseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; 

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getKthsAPI();
      setTableData(data);
    } catch (error: any) {
      toast.error(error.message || 'Gagal memuat data KTH');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const safeTableData = Array.isArray(tableData) ? tableData : [];

  const kabupatenOptions = useMemo(() => {
    const list = safeTableData.map(item => item.kabupaten_kota).filter(Boolean);
    return Array.from(new Set(list));
  }, [safeTableData]);

  const filteredData = safeTableData.filter(row => {
    const matchesSearch = 
      row?.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row?.cdk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row?.kabupaten_kota?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCdk = selectedCdk ? row?.cdk === selectedCdk : true;
    const matchesKabupaten = selectedKabupaten ? row?.kabupaten_kota === selectedKabupaten : true;

    return matchesSearch && matchesCdk && matchesKabupaten;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCdk, selectedKabupaten]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Data KTH</h1>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select
            value={selectedCdk}
            onChange={(e) => setSelectedCdk(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 text-xs rounded-full px-4 py-2.5 outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] cursor-now-allowed sm:cursor-pointer shadow-sm"
          >
            <option value="">Semua CDK</option>
            <option value="CDK WILAYAH I">CDK WILAYAH I</option>
            <option value="CDK WILAYAH II">CDK WILAYAH II</option>
            <option value="CDK WILAYAH III">CDK WILAYAH III</option>
            <option value="CDK WILAYAH IV">CDK WILAYAH IV</option>
            <option value="CDK WILAYAH V">CDK WILAYAH V</option>
          </select>

          <select
            value={selectedKabupaten}
            onChange={(e) => setSelectedKabupaten(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 text-xs rounded-full px-4 py-2.5 outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] cursor-now-allowed sm:cursor-pointer shadow-sm"
          >
            <option value="">Semua Kabupaten/Kota</option>
            {kabupatenOptions.map((kab, idx) => (
              <option key={idx} value={kab}>{kab}</option>
            ))}
          </select>

          <div className="relative w-full sm:w-56">
            <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari KTH..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] focus:border-[#185325] outline-none transition-colors shadow-sm" 
            />
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm active:scale-95 whitespace-nowrap"
          >
            <HiOutlinePlus className="w-4 h-4 stroke-2" /> Tambah KTH
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-center text-sm whitespace-nowrap">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 font-bold">Cabang Dinas Kehutanan</th>
                <th className="px-4 py-4 font-bold">Kab/Kota</th>
                <th className="px-4 py-4 font-bold">Kecamatan</th>
                <th className="px-4 py-4 font-bold">Desa/Kelurahan</th>
                <th className="px-4 py-4 font-bold">Nama Kelompok</th>
                <th className="px-4 py-4 font-bold">Ketua Kelompok</th>
                <th className="px-4 py-4 font-bold">Jenis Usaha</th>
                <th className="px-4 py-4 font-bold">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-gray-500 font-medium animate-pulse">Memuat data...</td>
                </tr>
              ) : currentRows.length > 0 ? (
                currentRows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-gray-700">{row.cdk}</td>
                    <td className="px-4 py-4 text-gray-600">{row.kabupaten_kota}</td>
                    <td className="px-4 py-4 text-gray-600">{row.kecamatan}</td>
                    <td className="px-4 py-4 text-gray-600">{row.desa_kelurahan}</td>
                    <td className="px-4 py-4 font-semibold text-[#185325]">{row.nama}</td>
                    <td className="px-4 py-4 text-gray-600">{row.ketua}</td>
                    <td className="px-4 py-4 text-gray-600">{row.jenis_usaha}</td>
                    <td className="px-4 py-4 flex justify-center gap-3">
                      <button className="text-gray-400 hover:text-[#185325] transition-colors">
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-[#185325] transition-colors">
                        <HiOutlinePencil className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-gray-500 font-medium">Tidak ada data KTH yang sesuai dengan filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && filteredData.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 px-6 border-t border-gray-100 bg-gray-50/50 gap-4 text-xs text-gray-600">
            <div>
              Menampilkan <span className="font-bold text-gray-800">{indexOfFirstRow + 1}</span> sampai <span className="font-bold text-gray-800">{Math.min(indexOfLastRow, filteredData.length)}</span> dari <span className="font-bold text-gray-800">{filteredData.length}</span> data KTH
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-bold text-gray-700"
              >
                <HiOutlineChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-3 py-1.5 font-bold text-[#185325] bg-[#EBF8F1] rounded-full border border-[#DCECE0]">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-bold text-gray-700"
              >
                <HiOutlineChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ModalInputKTH 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData} 
      />

    </div>
  );
};

export default DataKTH;