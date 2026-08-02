import React, { useState } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineEye, HiOutlinePencil } from 'react-icons/hi2';
import ModalInputKTH from './components/ModalInputKTH'; 

const DataKTH: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tableData = [
    { id: 1, cdk: 'CDK WILAYAH V', kabupaten: 'Kab. Bandung', kecamatan: 'Batununggal', desa: 'Pagaden', namaKth: 'KTH Rimba', ketua: 'Asep', jenisUsaha: 'Agro' }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Data KTH</h1>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
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
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 font-semibold text-gray-700">{row.cdk}</td>
                  <td className="px-4 py-4 text-gray-600">{row.kabupaten}</td>
                  <td className="px-4 py-4 text-gray-600">{row.kecamatan}</td>
                  <td className="px-4 py-4 text-gray-600">{row.desa}</td>
                  <td className="px-4 py-4 font-semibold text-[#185325]">{row.namaKth}</td>
                  <td className="px-4 py-4 text-gray-600">{row.ketua}</td>
                  <td className="px-4 py-4 text-gray-600">{row.jenisUsaha}</td>
                  <td className="px-4 py-4 flex justify-center gap-3">
                    <button className="text-gray-400 hover:text-[#185325] transition-colors">
                      <HiOutlineEye className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-[#185325] transition-colors">
                      <HiOutlinePencil className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalInputKTH 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
};

export default DataKTH;