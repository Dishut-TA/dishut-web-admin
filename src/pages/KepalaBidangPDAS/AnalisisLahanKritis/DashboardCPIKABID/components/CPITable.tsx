import React from 'react';
import type { CPIDataRow } from '../types';
import { HiOutlineEye } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

interface CPITableProps {
  data: CPIDataRow[];
  onApprove: (id: string) => void;
}

const CPITable: React.FC<CPITableProps> = ({ data }) => {
    const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="text-[#3A4D3F] bg-[#DCECE0] font-bold border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Kabupaten/Kota</th>
              <th className="px-6 py-4">Kecamatan</th>
              <th className="px-6 py-4">Desa</th>
              <th className="px-6 py-4 text-center">Status Lahan</th>
              <th className="px-6 py-4 text-center">Skor CPI</th>
              <th className="px-6 py-4 text-center">Rekomendasi Intervensi</th>
              <th className="px-6 py-4 text-center">Status Kelayakan</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-800">{row.kabupaten}</td>
                <td className="px-6 py-4 text-gray-600">{row.kecamatan}</td>
                <td className="px-6 py-4 text-gray-600">{row.desa}</td>
                <td className="px-6 py-4 text-center font-bold">
                  <span className={
                    row.statusLahan === 'Sangat Kritis' ? 'text-red-500' :
                    row.statusLahan === 'Kritis' ? 'text-yellow-500' : 'text-green-600'
                  }>
                    {row.statusLahan}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-800 font-medium">{row.skorCPI}</td>
                <td className="px-6 py-4 text-center text-[#185325] font-bold">{row.rekomendasi}</td>
                <td className="px-6 py-4 text-center text-[#185325] font-bold">{row.statusVerifikasi}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => navigate(`/admin/kabid/analisis-cpi/dashboard/detail/${row.id}`)} className="p-2 text-gray-500 hover:text-[#185325] hover:bg-[#EBF8F1] rounded-full transition-colors">
                    <HiOutlineEye className="w-5 h-5" />
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

export default CPITable;