import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineMapPin,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineEye,
  HiOutlinePencilSquare 
} from 'react-icons/hi2';

const MOCK_DATA = [
  { id: '1', desa: 'Cikole', kec: 'Lembang', pu: 100, luas: 10.00, intervensi: 'Rehabilitasi Vegetatif', status: 'Layak' },
  { id: '2', desa: 'Cibodas', kec: 'Lembang', pu: 80, luas: 8.00, intervensi: 'Rehabilitasi Vegetatif', status: 'Layak' },
  { id: '3', desa: 'Wangunsari', kec: 'Lembang', pu: 120, luas: 12.00, intervensi: 'Rehabilitasi Vegetatif', status: 'Menunggu' },
  { id: '4', desa: 'Suntenjaya', kec: 'Lembang', pu: 60, luas: 6.00, intervensi: 'Agroforestri', status: 'Menunggu' },
];

const RencanaRehabilitasiIndex: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  const filteredData = MOCK_DATA.filter(item => {
    const matchSearch = item.desa.toLowerCase().includes(searchTerm.toLowerCase()) || item.kec.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'Semua' || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: string) => {
    const baseStyle = "px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap inline-block";
    switch (status) {
      case 'Layak': 
        return <span className={`${baseStyle} bg-emerald-100 text-emerald-700`}>{status}</span>;
      case 'Tidak Layak': 
        return <span className={`${baseStyle} bg-red-100 text-red-700`}>{status}</span>;
      case 'Menunggu': 
        return <span className={`${baseStyle} bg-amber-100 text-amber-700`}>{status}</span>;
      default: 
        return <span className={`${baseStyle} bg-gray-100 text-gray-700`}>{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Rencana Rehabilitasi</h1>
        <p className="text-sm text-gray-500">Kelola rencana rehabilitasi berdasarkan hasil validasi lapangan.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <HiOutlineMapPin className="w-5 h-5 text-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Lokasi</span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-gray-800">32</h2>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <HiOutlineCheckCircle className="w-5 h-5 text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Layak</span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-gray-800">18</h2>
            <span className="text-xs text-emerald-600 font-bold mb-1 bg-emerald-50 px-2 py-0.5 rounded">Lokasi</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <HiOutlineXCircle className="w-5 h-5 text-red-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Tidak Layak</span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-gray-800">7</h2>
            <span className="text-xs text-red-600 font-bold mb-1 bg-red-50 px-2 py-0.5 rounded">Lokasi</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <HiOutlineClock className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Menunggu</span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-gray-800">7</h2>
            <span className="text-xs text-amber-600 font-bold mb-1 bg-amber-50 px-2 py-0.5 rounded">Lokasi</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mt-2">
        <div className="relative w-full md:w-80">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari desa atau kecamatan..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] focus:border-[#185325] outline-none transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#185325] cursor-pointer shadow-sm"
          >
            <option value="Semua">Status Kelayakan</option>
            <option value="Layak">Layak</option>
            <option value="Tidak Layak">Tidak Layak</option>
            <option value="Menunggu">Menunggu</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto w-full pb-4">
        <table className="w-full text-left border-collapse min-w-200">
          <thead className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold">
            <tr>
              <th className="px-6 py-4 rounded-tl-xl whitespace-nowrap">Lokasi</th>
              <th className="px-6 py-4 whitespace-nowrap">Petak Ukur</th>
              <th className="px-6 py-4 whitespace-nowrap">Intervensi</th>
              <th className="px-6 py-4 whitespace-nowrap">Status Kelayakan</th>
              <th className="px-6 py-4 rounded-tr-xl whitespace-nowrap text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => {
                const isLast = index === filteredData.length - 1;
                return (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className={`px-6 py-4 ${isLast ? 'rounded-bl-xl' : ''}`}>
                      <p className="font-bold text-gray-800 text-sm">{row.desa}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{row.kec}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800 text-sm">{row.pu} PU</p>
                      <p className="text-gray-500 text-xs mt-0.5">{row.luas.toFixed(2).replace('.', ',')} Ha</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{row.intervensi}</td>
                    <td className="px-6 py-4">{getStatusBadge(row.status)}</td>
                    <td className={`px-6 py-4 flex justify-center ${isLast ? 'rounded-br-xl' : ''}`}>
                      {/* KONDISIONAL TOMBOL BERDASARKAN STATUS */}
                      {row.status === 'Menunggu' ? (
                        <button 
                          onClick={() => navigate(`/admin/staff/analisis-cpi/rencana/detail/${row.id}`)}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-[#185325] hover:bg-[#123d1c] text-white rounded-full text-[11px] font-bold transition-all shadow-sm cursor-pointer active:scale-95"
                        >
                          <HiOutlinePencilSquare className="w-3.5 h-3.5" /> Lengkapi
                        </button>
                      ) : (
                        <button 
                          onClick={() => navigate(`/admin/staff/analisis-cpi/rencana/detail/${row.id}`)}
                          title="Lihat Detail"
                          className="inline-flex items-center justify-center p-2 border border-gray-300 text-gray-700 bg-white rounded-full hover:bg-gray-50 hover:text-[#185325] hover:border-[#185325] transition-all shadow-sm cursor-pointer"
                        >
                          <HiOutlineEye className="w-4 h-4 stroke-2" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 rounded-b-xl">
                  Data tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RencanaRehabilitasiIndex;