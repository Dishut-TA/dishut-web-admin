import React, { useState } from 'react';
import { HiOutlineClock } from 'react-icons/hi2';
import ModalDetailPenugasan from './components/ModalDetailPenugasan';
import TabSemuaPenugasan from './components/TabSemuaPenugasan';
import TabValidasiLokasi from './components/TabValidasiLokasi';
import TabPelaksanaanKegiatan from './components/TabPelaksanaanKegiatan';
import ModalTugaskan from './components/TugaskanModal';

const PenugasanPenyuluh: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Semua Penugasan');
  const [isTugaskanOpen, setIsTugaskanOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const handleAction = (type: 'tugaskan' | 'detail', data: any) => {
    setSelectedData(data);
    if (type === 'tugaskan') setIsTugaskanOpen(true);
    if (type === 'detail') setIsDetailOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Penugasan Penyuluh</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola penugasan penyuluh untuk validasi lokasi lapangan maupun usulan rehabilitasi.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
          <HiOutlineClock className="w-4 h-4" /> Riwayat Penugasan
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col mt-2">
        <div className="flex border-b border-gray-100 px-6 pt-2">
          {['Semua Penugasan', 'Validasi Lokasi', 'Pelaksanaan Kegiatan'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-4 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === tab ? 'border-[#185325] text-[#185325]' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-gray-50/30">
          {activeTab === 'Semua Penugasan' && <TabSemuaPenugasan onAction={handleAction} />}
          {activeTab === 'Validasi Lokasi' && <TabValidasiLokasi onAction={handleAction} />}
          {activeTab === 'Pelaksanaan Kegiatan' && <TabPelaksanaanKegiatan onAction={handleAction} />}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
          <span className="text-sm text-gray-500 font-medium">Menampilkan 1 - 8 dari 24 data</span>
          <div className="flex items-center gap-4">
            <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 outline-none font-medium cursor-pointer">
              <option>10 / halaman</option>
            </select>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 cursor-pointer">&laquo;</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#185325] text-white font-bold shadow-sm cursor-pointer">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium cursor-pointer">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 cursor-pointer">&raquo;</button>
            </div>
          </div>
        </div>
      </div>

      <ModalTugaskan isOpen={isTugaskanOpen} onClose={() => setIsTugaskanOpen(false)} data={selectedData} />
      <ModalDetailPenugasan isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} data={selectedData} />

    </div>
  );
};

export default PenugasanPenyuluh;