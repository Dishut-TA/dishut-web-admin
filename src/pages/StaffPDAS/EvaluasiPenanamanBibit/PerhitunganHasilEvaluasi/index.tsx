import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlineEye } from 'react-icons/hi2';

const PerhitunganHasilEvaluasiStaff: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const mockData = [
    {
      id: 'EVAL-001',
      proyek: 'Rehabilitasi Lahan Kompensasi PT. Jawa Satu Power',
      noSurat: 'ST.76/TKTRH/DAS.04/2026',
      lokasi: 'Kab. Garut',
      periode: 'Pemeliharaan II (P2)',
      peran: 'Ketua Tim',
      status: 'SIAP DIHITUNG',
    },
    {
      id: 'EVAL-002',
      proyek: 'Rehabilitasi DAS PT Pertamina EP',
      noSurat: 'ST.12/TKTRH/DAS.04/2026',
      lokasi: 'Kab. Bogor',
      periode: 'Penanaman Awal (P0)', 
      peran: 'Anggota',
      status: 'HASIL TERVALIDASI',
    }
  ];

  const filteredData = mockData.filter((item) =>
    item.proyek.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.periode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Perhitungan Hasil Evaluasi</h1>
          <p className="text-sm text-gray-500 mt-1">Lakukan perhitungan persentase tumbuh dan tinjau visualisasi peta.</p>
        </div>
        <div className="relative w-full md:w-80">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Cari program atau periode..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-[#185325] outline-none shadow-sm" 
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-225">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Nama Program & No. Surat</th>
                <th className="px-6 py-4">Lokasi & Periode</th>
                <th className="px-6 py-4 text-center">Peran Anda</th>
                <th className="px-6 py-4 text-center">Status Dataset</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-bold text-gray-800">{item.proyek}</div>
                    <div className="text-xs font-semibold text-[#185325] mt-1">{item.noSurat}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-semibold text-gray-600">{item.lokasi}</div>
                    <div className="text-xs font-bold text-[#185325] bg-[#EBF8F1] border border-[#C6EBD6] px-2 py-0.5 rounded-full inline-block mt-1">
                      {item.periode}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center text-sm font-semibold text-gray-600">{item.peran}</td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'SIAP DIHITUNG' ? 'bg-[#FEF3C7] text-yellow-800 border border-yellow-200' : 'bg-emerald-50 text-[#185325] border border-emerald-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 flex justify-center">
                    <button 
                      onClick={() => navigate(`/admin/staff/evaluasi/hasil/detail/${item.id}`)}
                      title="Lihat Detail & Hitung"
                      className="p-2.5 text-gray-500 hover:text-[#185325] transition-colors border border-transparent"
                    >
                      <HiOutlineEye className="w-5 h-5" />
                    </button>
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

export default PerhitunganHasilEvaluasiStaff;