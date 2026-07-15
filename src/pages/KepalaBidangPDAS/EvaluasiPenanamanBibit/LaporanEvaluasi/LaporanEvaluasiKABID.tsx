import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlineCheckBadge } from 'react-icons/hi2';

const LaporanEvaluasiKABID: React.FC = () => {
  const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');

  const mockData = [
    {
      id: 'EVAL-001',
      proyek: 'Rehabilitasi Lahan Kompensasi PT. Jawa Satu Power',
      tim: 'Srie Resmita Dkk',
      status: 'MENUNGGU PENGESAHAN',
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pengesahan Laporan Evaluasi</h1>
          <p className="text-sm text-gray-500 mt-1">Review Berita Acara dari Tim Penilai dan terbitkan dokumen final (PDF).</p>
        </div>
        <div className="relative w-full md:w-80">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="Cari laporan..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-[#185325] outline-none" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse min-w-200">
          <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
            <tr>
              <th className="px-6 py-4">Nama Program Rehabilitasi</th>
              <th className="px-6 py-4 text-center">Tim Penyusun</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-5 font-bold text-gray-800">{item.proyek}</td>
                <td className="px-6 py-5 text-center text-sm font-medium text-gray-600">{item.tim}</td>
                <td className="px-6 py-5 text-center">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FEF3C7] text-yellow-800">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-5 flex justify-center">
                  <button 
                    onClick={() => navigate(`/admin/kabid/evaluasi/laporan/create/${item.id}`)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#185325] hover:bg-[#123d1c] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                  >
                    <HiOutlineCheckBadge className="w-4 h-4" /> Tinjau & Sahkan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaporanEvaluasiKABID;