import React from 'react';
import { HiOutlineDocumentText, HiOutlinePencilSquare, HiOutlineMapPin } from 'react-icons/hi2';
import type { PetakUkur } from '../types';

interface TableDataPetakUkurProps {
  mockStatus: string;
  hasCalculated: boolean;
  dataPetakUkur: PetakUkur[];
  handleEdit: <K extends keyof PetakUkur>(index: number, field: K, value: PetakUkur[K]) => void;
  handleGetLocation: (idx: number) => void;
  hitungPersenPerPU: (rencana: number, tumbuh: number) => string;
}

const TableDataPetakUkur: React.FC<TableDataPetakUkurProps> = ({
  mockStatus,
  hasCalculated,
  dataPetakUkur,
  handleEdit,
  handleGetLocation,
  hitungPersenPerPU
}) => {
  return (
    <div className="mb-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
          <HiOutlineDocumentText className="w-5 h-5 text-[#185325]" />
          {mockStatus === 'HASIL TERVALIDASI' ? 'Lampiran Data Petak Ukur' : '1. Data Dasar & Realisasi Lapangan'}
        </h3>
        {!hasCalculated && (
          <span className="text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full flex items-center gap-1">
            <HiOutlinePencilSquare className="w-4 h-4" /> Sesuaikan data realisasi jika terdapat perubahan faktual.
          </span>
        )}
      </div>
      
      <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-[#DCECE0] text-[#3A4D3F] font-bold border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">Petak Ukur</th>
              <th className="px-4 py-3 text-center">Rencana <br/><span className="text-[10px] font-normal text-gray-400">Read-only</span></th>
              <th className="px-4 py-3 text-center text-[#185325]">Realisasi</th>
              <th className="px-4 py-3 text-center border-x border-gray-200">% Tumbuh</th>
              <th className="px-4 py-3 text-center text-[#185325]">Tinggi (cm)</th>
              <th className="px-4 py-3 text-[#185325]">Kondisi Lahan</th> 
              <th className="px-4 py-3 text-[#185325]">Titik Koordinat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dataPetakUkur.map((item, idx) => {
              const persen = hitungPersenPerPU(item.rencana, item.tumbuh);
              const isLulus = parseFloat(persen) >= 75;
              
              return (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold text-gray-700">{item.pu}</td>
                  
                  <td className="px-4 py-3 text-center bg-gray-50 text-gray-500 font-semibold border-r border-gray-100">
                    {item.rencana}
                  </td>
                  
                  <td className="px-4 py-2 text-center">
                    <input 
                      type="number" 
                      disabled={hasCalculated}
                      value={item.tumbuh}
                      onChange={(e) => handleEdit(idx, 'tumbuh', Number(e.target.value))}
                      className={`w-16 text-center py-1.5 border rounded-lg font-semibold focus:ring-2 focus:ring-[#185325]/20 focus:outline-none transition-colors ${hasCalculated ? 'bg-transparent border-transparent' : 'bg-white border-gray-300'}`}
                    />
                  </td>
                  
                  <td className="px-4 py-3 text-center border-x border-gray-100 bg-gray-50/30">
                    <span className={`font-bold ${isLulus ? 'text-[#00A859]' : 'text-red-500'}`}>{persen}%</span>
                  </td>
                  
                  <td className="px-4 py-2 text-center">
                    <input 
                      type="number"
                      step="0.1"
                      disabled={hasCalculated}
                      value={item.tinggi}
                      onChange={(e) => handleEdit(idx, 'tinggi', Number(e.target.value))}
                      className={`w-20 text-center py-1.5 border rounded-lg font-semibold focus:ring-2 focus:ring-[#185325]/20 focus:outline-none transition-colors ${hasCalculated ? 'bg-transparent border-transparent' : 'bg-white border-gray-300'}`}
                    />
                  </td>

                  <td className="px-4 py-2">
                    <select
                      disabled={hasCalculated}
                      value={item.kondisiLahan}
                      onChange={(e) => handleEdit(idx, 'kondisiLahan', e.target.value)}
                      className={`w-36 py-1.5 px-2 border rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#185325]/20 focus:outline-none transition-colors ${hasCalculated ? 'bg-transparent border-transparent text-gray-500 appearance-none' : 'bg-white border-gray-300 text-gray-700'}`}
                    >
                      <option value="Baik / Normal">Baik / Normal</option>
                      <option value="Banyak Gulma">Banyak Gulma</option>
                      <option value="Kering / Gersang">Kering / Gersang</option>
                      <option value="Tergenang Air">Tergenang Air</option>
                      <option value="Berbatu">Berbatu</option>
                      <option value="Rawan Longsor">Rawan Longsor</option>
                    </select>
                  </td>
                  
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <input 
                        type="text"
                        disabled={hasCalculated}
                        value={item.koordinat}
                        onChange={(e) => handleEdit(idx, 'koordinat', e.target.value)}
                        placeholder="Contoh: -6.123, 106.123"
                        className={`w-36 py-1.5 px-3 border rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#185325]/20 focus:outline-none transition-colors ${hasCalculated ? 'bg-transparent border-transparent text-gray-500' : 'bg-white border-gray-300 text-gray-700'}`}
                      />
                      {!hasCalculated && (
                        <button
                          type="button"
                          onClick={() => handleGetLocation(idx)}
                          className="p-1.5 bg-[#EBF8F1] text-[#185325] border border-[#C6EBD6] rounded-lg hover:bg-[#185325] hover:text-white transition-colors active:scale-95"
                        >
                          <HiOutlineMapPin className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDataPetakUkur;