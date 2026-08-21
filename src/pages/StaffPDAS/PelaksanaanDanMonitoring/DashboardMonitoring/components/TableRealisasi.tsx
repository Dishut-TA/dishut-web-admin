import { HiOutlineTrophy } from 'react-icons/hi2';
import { TABLE_REALISASI_DATA } from '../data/mockData';

export default function TableRealisasi() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
           <HiOutlineTrophy className="w-5 h-5 text-green-700" />
           Program dengan Realisasi Tertinggi
        </h3>
        <button className="text-xs font-bold text-green-700 hover:underline">Lihat Semua</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
            <tr>
              <th className="px-6 py-4">No</th>
              <th className="px-6 py-4">Program</th>
              <th className="px-6 py-4">Lokasi</th>
              <th className="px-6 py-4">Sumber</th>
              <th className="px-6 py-4 text-right">Target (Pohon)</th>
              <th className="px-6 py-4 text-right">Realisasi (Pohon)</th>
              <th className="px-6 py-4 text-right">Persentase</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {TABLE_REALISASI_DATA.map((row) => (
              <tr key={row.no} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 text-gray-500">{row.no}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{row.program}</td>
                <td className="px-6 py-4 text-gray-600">{row.lokasi}</td>
                <td className="px-6 py-4 text-gray-600">{row.sumber}</td>
                <td className="px-6 py-4 text-right font-medium">{row.target}</td>
                <td className="px-6 py-4 text-right font-medium">{row.realisasi}</td>
                <td className="px-6 py-4 text-right font-bold text-green-700">{row.persentase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}