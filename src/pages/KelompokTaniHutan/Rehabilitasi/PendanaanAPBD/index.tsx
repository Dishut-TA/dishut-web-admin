import React, { useState } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineEye } from 'react-icons/hi2';

const PendanaanAPBD: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockData = [
    { 
        id: '#PROP-APBD-001', 
        judul: 'Reboisasi Hulu Sungai DAS', 
        alokasi: 'Rp300.000.000', 
        status: 'Belum Mulai' 
    },
    { 
        id: '#PROP-APBD-002', 
        judul: 'Reboisasi Hulu Sungai DAS', 
        alokasi: 'Rp300.000.000', 
        status: 'Berjalan' 
    },
    { 
        id: '#PROP-APBD-003', 
        judul: 'Reboisasi Hulu Sungai DAS', 
        alokasi: 'Rp300.000.000', 
        status: 'Selesai' 
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Daftar Penugasan Program APBD</h1>
            <p className="text-sm text-gray-500">Daftar penugasan program rehabilitasi pendanaan APBD</p>
          </div>
        </div>
        
        <div className="relative w-full sm:w-72">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari Proposal.." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-gray-400 rounded-lg text-sm focus:ring-1 focus:ring-[#185325] focus:border-[#185325] outline-none transition-all" 
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Judul Program</th>
                <th className="px-6 py-4">Total Alokasi</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 font-bold text-gray-800 text-sm">{item.id}</td>
                  <td className="px-6 py-5 text-sm text-gray-700">{item.judul}</td>
                  <td className="px-6 py-5 text-sm font-bold text-[#185325]">{item.alokasi}</td>
                  
                  <td className="px-6 py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                      item.status === 'Belum Mulai' ? 'bg-gray-200 text-gray-700' : 
                      item.status === 'Berjalan' ? 'bg-orange-200 text-orange-800' : 
                      'bg-green-300 text-green-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  
                  <td className="px-6 py-5 flex justify-center items-center h-full">
                    {item.status === 'Belum Mulai' ? (
                      <button className="bg-[#185325] hover:bg-[#123d1c] text-white px-5 py-2 rounded-full text-xs font-bold transition-colors">
                        Konfirmasi
                      </button>
                    ) : (
                      <button className="text-gray-600 hover:text-[#185325] p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default PendanaanAPBD;