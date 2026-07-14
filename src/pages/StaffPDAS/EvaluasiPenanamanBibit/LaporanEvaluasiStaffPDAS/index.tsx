import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlineDocumentText } from 'react-icons/hi2';

const LaporanEvaluasiStaffPDAS: React.FC = () => {
  const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');

  const mockData = [
    {
      id: 'EVAL-001',
      proyek: 'Rehabilitasi Lahan Kompensasi PT. Jawa Satu Power',
      tanggalValidasi: '14 Juli 2026',
      status: 'DRAFT BELUM DIAJUKAN',
    },
    {
      id: 'EVAL-002',
      proyek: 'Rehabilitasi DAS PT Pertamina EP',
      tanggalValidasi: '10 Juli 2026',
      status: 'MENUNGGU PENGESAHAN KABID',
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Laporan Evaluasi Kondisi Penanaman</h1>
          <p className="text-sm text-gray-500 mt-1">Susun dan ajukan Berita Acara evaluasi akhir ke Kepala Bidang.</p>
        </div>
        <div className="relative w-full md:w-80">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="Cari program..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-[#185325] outline-none shadow-sm" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse min-w-200">
          <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
            <tr>
              <th className="px-6 py-4">Nama Program Tervalidasi</th>
              <th className="px-6 py-4 text-center">Tanggal Validasi Hasil</th>
              <th className="px-6 py-4 text-center">Status Pelaporan</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-5 font-bold text-gray-800">{item.proyek}</td>
                <td className="px-6 py-5 text-center text-sm font-medium text-gray-600">{item.tanggalValidasi}</td>
                <td className="px-6 py-5 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'DRAFT BELUM DIAJUKAN' ? 'bg-[#FEF3C7] text-yellow-800' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-5 flex justify-center">
                  {item.status === 'DRAFT BELUM DIAJUKAN' ? (
                    <button 
                      onClick={() => navigate(`/admin/staff/evaluasi/laporan/create/${item.id}`)}
                      className="flex items-center gap-1.5 px-4 py-2 border-2 border-[#185325] text-[#185325] hover:bg-[#f0f9f3] text-xs font-bold rounded-lg transition-colors shadow-sm"
                    >
                      <HiOutlineDocumentText className="w-4 h-4" /> Susun Laporan
                    </button>
                  ) : (
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-500 text-xs font-bold rounded-lg cursor-not-allowed">
                      Sedang Direview
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaporanEvaluasiStaffPDAS;