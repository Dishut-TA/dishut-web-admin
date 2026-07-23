import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlineEye, HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';

type StatusVerifikasi = 'Menunggu Verifikasi' | 'Terverifikasi';

interface DataVerifikasi {
  id: string;
  namaProgram: string;
  tahap: string;
  sumberDana: string;
  danaDisalurkan: number;
  danaDirealisasikan: number;
  status: StatusVerifikasi;
}

const mockData: DataVerifikasi[] = [
  {
    id: 'CSR-001',
    namaProgram: 'Rehabilitasi Citarum',
    tahap: 'Tahap 1',
    sumberDana: 'CSR',
    danaDisalurkan: 100000000,
    danaDirealisasikan: 20000000,
    status: 'Menunggu Verifikasi'
  },
  {
    id: 'CSR-001',
    namaProgram: 'Rehabilitasi Citarum',
    tahap: 'Tahap 1',
    sumberDana: 'CSR',
    danaDisalurkan: 100000000,
    danaDirealisasikan: 20000000,
    status: 'Terverifikasi'
  },
  {
    id: 'APBD-001',
    namaProgram: 'Rehabilitasi Citarum',
    tahap: 'Tahap 1',
    sumberDana: 'APBD',
    danaDisalurkan: 100000000,
    danaDirealisasikan: 20000000,
    status: 'Terverifikasi'
  }
];

const VerifikasiDanaCSR: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState<DataVerifikasi[]>(mockData);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => 
    item.namaProgram.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatRupiah = (angka: number) => {
    return 'Rp ' + angka.toLocaleString('id-ID');
  };

  const renderStatusBadge = (status: StatusVerifikasi) => {
    switch (status) {
      case 'Menunggu Verifikasi':
        return <span className="px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap bg-[#FDE68A] text-yellow-800">Menunggu Verifikasi</span>;
      case 'Terverifikasi':
        return <span className="px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap bg-[#DCECE0] text-[#185325]">Terverifikasi</span>;
      default:
        return <span className="px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap bg-gray-100 text-gray-600">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Verifikasi Dana
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari Proyek.." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#185325] transition-all text-sm text-gray-700 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-transparent text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-semibold transition-colors border border-gray-300 shadow-sm">
            <HiOutlineAdjustmentsHorizontal className="w-5 h-5" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold border-b border-gray-200">
                <th className="px-6 py-4 whitespace-nowrap">ID</th>
                <th className="px-6 py-4 whitespace-nowrap">Nama Program</th>
                <th className="px-6 py-4 whitespace-nowrap">Tahap</th>
                <th className="px-6 py-4 whitespace-nowrap">Sumber Dana</th>
                <th className="px-6 py-4 whitespace-nowrap">Dana Disalurkan</th>
                <th className="px-6 py-4 whitespace-nowrap">Dana Direalisasikan</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {item.namaProgram}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {item.tahap}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {item.sumberDana}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {formatRupiah(item.danaDisalurkan)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {formatRupiah(item.danaDirealisasikan)}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {renderStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                    <button 
                      onClick={() => navigate(`/admin/staff/rehabilitasi/verifikasi-dana-csr/detail/${item.id}`)}
                      className="p-1.5 text-gray-600 hover:text-[#185325] border border-transparent hover:border-[#185325] rounded-full transition-all cursor-pointer"
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

export default VerifikasiDanaCSR;