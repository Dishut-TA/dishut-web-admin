import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlinePlus,
  HiOutlineArrowDownTray,
  HiOutlineEye
} from 'react-icons/hi2';
import { mockStats, mockTableData } from './data';
import ModalBuatPenugasan from './components/CreatePenugasanModal';

const PenugasanPenyuluh: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Berjalan': return 'bg-yellow-100 text-yellow-800';
      case 'Selesai': return 'bg-green-100 text-green-800';
      case 'Dalam Proses': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 px-4 sm:px-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Penugasan Penyuluh</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 mb-0.5">{stat.title}</p>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <p className="text-[10px] text-gray-400 mt-1">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-4 mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-auto flex-1">
          <select className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#185325] bg-white cursor-pointer">
            <option>Semua Wilayah PDAS</option>
          </select>
          <select className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#185325] bg-white cursor-pointer">
            <option>Semua Status</option>
          </select>
          <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#185325] bg-white text-gray-500" />
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
            <HiOutlineArrowDownTray className="w-4 h-4" /> Ekspor
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
          >
            <HiOutlinePlus className="w-4 h-4" strokeWidth={2.5} /> Buat Penugasan Baru
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#DCECE0]/40 text-[#3A4D3F] text-xs font-bold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-center">No</th>
                <th className="px-6 py-4">Penyuluh</th>
                <th className="px-6 py-4">Wilayah CDK</th>
                <th className="px-6 py-4">Lokasi Penugasan</th>
                <th className="px-6 py-4">Tanggal Mulai Pelaksanaan</th>
                <th className="px-6 py-4">Periode Validasi</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockTableData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-center text-sm font-bold text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{item.penyuluh}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.wilayah}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.lokasi}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.tanggal}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.periode}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-md text-[11px] font-bold ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center">
                    <button 
                      onClick={() => navigate(`/admin/staff/monitoring/penugasan-pelaksanaan/detail/${item.id}`)}
                      className="p-2 text-gray-400 hover:text-[#185325] hover:bg-[#DCECE0] rounded-xl transition-all"
                      title="Lihat Detail"
                    >
                      <HiOutlineEye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
          <span className="text-sm text-gray-500">Menampilkan 1 - 6 dari 24 data</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50">&laquo;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#185325] text-white font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">4</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50">&raquo;</button>
          </div>
          <div className="hidden md:block">
            <select className="px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600 outline-none">
              <option>10 / halaman</option>
            </select>
          </div>
        </div>
      </div>

      <ModalBuatPenugasan isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
};

export default PenugasanPenyuluh;