import { TABLE_BERJALAN_DATA } from '../data/mockData';

export default function TableBerjalan() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
         <h3 className="font-bold text-gray-900 text-sm">Program Berjalan</h3>
         <button className="text-xs font-bold text-green-700 hover:underline">Lihat Semua</button>
      </div>
      
      <div className="overflow-x-auto">
         <table className="w-full text-left text-xs whitespace-nowrap">
           <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
             <tr>
               <th className="py-3 pr-2">No</th>
               <th className="py-3 px-2">Program</th>
               <th className="py-3 px-2">Lokasi</th>
               <th className="py-3 px-2">Sumber</th>
               <th className="py-3 px-2">Tahap Kegiatan</th>
               <th className="py-3 px-2 text-center">Kategori</th>
               <th className="py-3 px-2 text-center">Progress Tahap</th>
               <th className="py-3 px-2 text-center">Terakhir Diperbarui</th>
               <th className="py-3 pl-2 text-center">Aksi</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-50">
             {TABLE_BERJALAN_DATA.map((row) => (
               <tr key={row.no} className="hover:bg-gray-50/50">
                 <td className="py-3 pr-2 text-gray-500">{row.no}</td>
                 <td className="py-3 px-2 font-medium text-gray-900">{row.program}</td>
                 <td className="py-3 px-2 text-gray-600">{row.lokasi}</td>
                 <td className="py-3 px-2 text-gray-600">{row.sumber}</td>
                 <td className="py-3 px-2 text-gray-600">{row.tahap}</td>
                 <td className="py-3 px-2 text-center">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${row.kategori === 'Pelaksanaan' ? 'text-green-700 bg-green-50' : 'text-blue-600 bg-blue-50'}`}>
                      {row.kategori}
                    </span>
                 </td>
                 <td className="py-3 px-2">
                   <div className="flex flex-col items-center gap-1 max-w-20 mx-auto">
                     <span className="font-bold text-[10px] text-gray-900">{row.progress}</span>
                     <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden shrink-0">
                        <div className={`h-full rounded-full ${row.kategori === 'Pelaksanaan' ? 'bg-green-600' : 'bg-blue-600'}`} style={{width: row.progress.replace(',', '.')}}></div>
                     </div>
                   </div>
                 </td>
                 <td className="py-3 px-2 text-center text-[10px] text-gray-500">{row.tanggal}</td>
                 <td className="py-3 pl-2 text-center">
                    <button className="px-3 py-1.5 bg-white border border-green-600 text-green-700 hover:bg-green-50 rounded-full font-bold text-[10px] shadow-sm transition-colors cursor-pointer">
                      Lihat Detail
                    </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
      </div>
    </div>
  );
}