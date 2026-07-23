import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineEye } from 'react-icons/hi2';

const PendanaanCSR: React.FC = () => {
  const navigate = useNavigate();

  const mockData = [
    { id: 'CSR-001', judul: 'Reboisasi Hulu Sungai DAS', anggaran: 'Rp300.000.000', status: 'Menunggu Verifikasi' },
    { id: 'CSR-002', judul: 'Penghijauan Lahan Kritis', anggaran: 'Rp150.000.000', status: 'Mencari Mitra CSR' },
    { id: 'CSR-003', judul: 'Pembangunan Kebun Bibit', anggaran: 'Rp500.000.000', status: 'Disetujui' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Pengajuan Pendanaan CSR</h1>
          <p className="text-sm text-gray-500">Daftar usulan program rehabilitasi pendanaan mitra</p>
        </div>
        <div className="flex gap-4">
            <div className="relative w-full sm:w-64">
                <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="Cari Proposal.." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-[#185325] focus:border-[#185325] outline-none" />
            </div>
            <button 
                onClick={() => navigate('/admin/kth/rehabilitasi/pendanaan-csr/create')}
                className="bg-[#185325] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#113d1b] transition-colors"
            >
                <HiOutlinePlus /> Ajukan Pendanaan CSR
            </button>
        </div>
      </div>

      <div className="bg-[#E8F5E9] rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Judul Program</th>
              <th className="px-6 py-4">Anggaran Diajukan</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {mockData.map((item) => (
              <tr key={item.id} className="border-t border-gray-100">
                <td className="px-6 py-4 font-bold text-sm text-gray-700">{item.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.judul}</td>
                <td className="px-6 py-4 text-sm font-bold text-[#185325]">{item.anggaran}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    item.status === 'Disetujui' ? 'bg-green-100 text-green-700' : 
                    item.status === 'Mencari Mitra CSR' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4"><HiOutlineEye className="w-5 h-5 text-gray-500 cursor-pointer" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendanaanCSR;