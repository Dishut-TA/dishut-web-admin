import React from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { HiOutlineMapPin, HiOutlineCamera, HiOutlineArrowLeft, HiOutlinePaperAirplane, HiOutlineInformationCircle } from 'react-icons/hi2';
import { PiPlant, PiTree, PiLeaf } from 'react-icons/pi';
import type { ProgramData, ViewMode } from '../types';
import { MOCK_REKAP_DATA } from '../constants';

interface RekapViewProps {
  activeId: string;
  activeProgram: ProgramData;
  isTindakLanjut: boolean;
  setViewMode: (mode: ViewMode) => void;
  navigate: NavigateFunction;
}

export const RekapView: React.FC<RekapViewProps> = ({
  activeId,
  activeProgram,
  isTindakLanjut,
  setViewMode,
  navigate
}) => {
  const isAllComplete = MOCK_REKAP_DATA.every(row => row.status === 'Lengkap');
  const MOCK_REKAP_PENYULAMAN = [
    { pu: 'PU-01', perlu: 5, sudah: 2, belum: 3, bibit: 35, status: 'Lengkap', update: '27 Mei 2026 10:30' },
    { pu: 'PU-03', perlu: 7, sudah: 1, belum: 6, bibit: 50, status: 'Lengkap', update: '27 Mei 2026 10:40' },
    { pu: 'PU-04', perlu: 6, sudah: 3, belum: 3, bibit: 35, status: 'Lengkap', update: '27 Mei 2026 10:45' }
  ];

  return (
    <div className="min-h-screen bg-[#f8faf9] text-gray-800 font-sans w-full pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A] mb-1">
          Review & Kirim Hasil {isTindakLanjut ? `Penyulaman` : `Monitoring`}
        </h1>
        <p className="text-sm text-slate-500">
          Berikut adalah hasil {isTindakLanjut ? 'tindak lanjut penyulaman' : `monitoring ${activeProgram.periode}`} yang telah Anda input, dikelompokkan per Petak Ukur (PU) sebelum dikirim.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
          <div>
            <p className="text-[10px] text-slate-500 font-medium mb-1">ID Program</p>
            <p className="text-sm font-bold text-slate-900">{activeId}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-medium mb-1">Nama Program</p>
            <p className="text-sm font-bold text-slate-900">{activeProgram.nama}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-medium mb-1">Sumber Dana</p>
            <p className="text-sm font-bold text-slate-900">APBD</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-medium mb-1">Periode Monitoring</p>
            <p className="text-sm font-bold text-slate-900">{isTindakLanjut ? `Tindak Lanjut ${activeProgram.periode}` : `${activeProgram.periode}`}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-medium mb-1">Lokasi</p>
            <p className="text-sm font-bold text-slate-900 leading-snug whitespace-pre-line">{activeProgram.lokasi}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-medium mb-1">Ketua KTH</p>
            <p className="text-sm font-bold text-slate-900">Ahmad Fauzi</p>
          </div>
          <div className="col-span-2 md:col-span-3">
            <p className="text-[10px] text-slate-500 font-medium mb-1">Tanggal Monitoring</p>
            <p className="text-sm font-bold text-slate-900">27 Mei 2026</p>
          </div>
        </div>
        <div className="w-full md:w-[320px] h-32 bg-slate-100 rounded-lg relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600')] bg-cover bg-center border border-slate-200 shrink-0">
          <div className="absolute inset-0 bg-black/10"></div>
          {isTindakLanjut ? (
            <>
              <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-red-500 rounded-full border border-white shadow-md"></div>
              <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-green-500 rounded-full border border-white shadow-md"></div>
              <div className="absolute top-2/3 left-1/2 w-2 h-2 bg-orange-500 rounded-full border border-white shadow-md"></div>
            </>
          ) : (
            <>
              <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
              <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
              <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h3 className="text-sm font-bold text-[#0F172A] mb-4">Ringkasan {isTindakLanjut ? `Penyulaman ${activeProgram.periode}` : `Monitoring ${activeProgram.periode}`} (Per PU)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="border border-slate-100 bg-white rounded-xl p-4 shadow-sm flex items-center justify-center flex-col md:flex-row md:justify-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mb-2 md:mb-0"><HiOutlineMapPin className="w-5 h-5" /></div>
            <div className="text-center md:text-left">
              <p className="text-[10px] text-slate-500 font-semibold mb-0.5">Total PU</p>
              <h3 className="text-xl font-bold text-slate-900">{isTindakLanjut ? '3' : '5'}</h3>
            </div>
          </div>
          <div className="border border-slate-100 bg-white rounded-xl p-4 shadow-sm flex items-center justify-center flex-col md:flex-row md:justify-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mb-2 md:mb-0 ${isTindakLanjut ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
              <PiPlant className="w-5 h-5" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] text-slate-500 font-semibold mb-0.5">{isTindakLanjut ? 'Total Titik Perlu Disulam' : 'Total Tanaman'}</p>
              <h3 className="text-xl font-bold text-slate-900">{isTindakLanjut ? '18' : '2.530'}</h3>
            </div>
          </div>
          <div className="border border-slate-100 bg-white rounded-xl p-4 shadow-sm flex items-center justify-center flex-col md:flex-row md:justify-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mb-2 md:mb-0"><PiLeaf className="w-5 h-5" /></div>
            <div className="text-center md:text-left">
              <p className="text-[10px] text-slate-500 font-semibold mb-0.5">{isTindakLanjut ? 'Sudah Disulam' : 'Hidup'}</p>
              <h3 className="text-xl font-bold text-slate-900">{isTindakLanjut ? '6' : '2.200'}</h3>
            </div>
          </div>
          <div className="border border-slate-100 bg-white rounded-xl p-4 shadow-sm flex items-center justify-center flex-col md:flex-row md:justify-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mb-2 md:mb-0 ${isTindakLanjut ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'}`}>
              <PiTree className="w-5 h-5" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] text-slate-500 font-semibold mb-0.5">{isTindakLanjut ? 'Belum Disulam' : 'Mati'}</p>
              <h3 className="text-xl font-bold text-slate-900">{isTindakLanjut ? '12' : '180'}</h3>
            </div>
          </div>
          <div className="border border-slate-100 bg-white rounded-xl p-4 shadow-sm flex items-center justify-center flex-col md:flex-row md:justify-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mb-2 md:mb-0 ${isTindakLanjut ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'}`}>
              <PiPlant className="w-5 h-5" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] text-slate-500 font-semibold mb-0.5">{isTindakLanjut ? 'Total Bibit Sulam' : 'Perlu Perawatan'}</p>
              <h3 className="text-xl font-bold text-slate-900">{isTindakLanjut ? '120' : '150'}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Rekap {isTindakLanjut ? 'Penyulaman' : 'Monitoring'} per PU</h3>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full text-center text-xs">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3 px-4 text-left">PU</th>
                <th className="py-3 px-4">{isTindakLanjut ? 'Titik Perlu Disulam' : 'Jumlah Tanaman'}</th>
                <th className="py-3 px-4">{isTindakLanjut ? 'Sudah Disulam' : 'Hidup'}</th>
                <th className="py-3 px-4">{isTindakLanjut ? 'Belum Disulam' : 'Mati'}</th>
                <th className="py-3 px-4">{isTindakLanjut ? 'Bibit Sulam' : 'Perlu Perawatan'}</th>
                {!isTindakLanjut && <th className="py-3 px-4">Foto</th>}
                <th className="py-3 px-4">Status Kelengkapan</th>
                <th className="py-3 px-4">Update Terakhir</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {(isTindakLanjut ? MOCK_REKAP_PENYULAMAN : MOCK_REKAP_DATA).map((row: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-left font-bold text-slate-700">{row.pu}</td>
                  <td className={`py-3 px-4 font-bold ${isTindakLanjut ? 'text-red-500' : ''}`}>{isTindakLanjut ? row.perlu : row.total}</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">{isTindakLanjut ? row.sudah : `${row.hidup} (${row.pctHidup}%)`}</td>
                  <td className={`py-3 px-4 font-bold ${isTindakLanjut ? 'text-orange-500' : 'text-red-500'}`}>{isTindakLanjut ? row.belum : `${row.mati} (${row.pctMati}%)`}</td>
                  <td className={`py-3 px-4 font-bold ${isTindakLanjut ? 'text-blue-600' : 'text-orange-500'}`}>{isTindakLanjut ? `${row.bibit} bibit` : `${row.rawat} (${row.pctRawat}%)`}</td>
                  {!isTindakLanjut && <td className="py-3 px-4 text-slate-600 flex items-center justify-center gap-1.5"><HiOutlineCamera className="w-4 h-4"/> {row.foto}</td>}
                  <td className="py-3 px-4">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full font-bold text-[10px]">{row.status}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{row.update}</td>
                  <td className="py-3 px-4 text-center">
                    <button 
                      onClick={() => setViewMode('table')}
                      className="px-4 py-1.5 border border-[#008A4B] text-[#008A4B] bg-white rounded-full font-bold hover:bg-emerald-50 transition-colors text-xs cursor-pointer"
                    >
                      Tambah Data
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50/50 font-bold border-t-2 border-slate-200">
                <td className="py-4 px-4 text-left text-blue-700">Total</td>
                <td className={`py-4 px-4 font-bold ${isTindakLanjut ? 'text-red-500' : 'text-blue-700'}`}>{isTindakLanjut ? '18' : '2.530'}</td>
                <td className="py-4 px-4 text-emerald-600">{isTindakLanjut ? '6' : '2.200 (87%)'}</td>
                <td className={`py-4 px-4 font-bold ${isTindakLanjut ? 'text-orange-500' : 'text-red-500'}`}>{isTindakLanjut ? '12' : '180 (7%)'}</td>
                <td className={`py-4 px-4 font-bold ${isTindakLanjut ? 'text-blue-600' : 'text-orange-500'}`}>{isTindakLanjut ? '120 bibit' : '150 (6%)'}</td>
                {!isTindakLanjut && <td className="py-4 px-4 text-blue-700 flex items-center justify-center gap-1.5"><HiOutlineCamera className="w-4 h-4"/> 50</td>}
                <td className="py-4 px-4 text-slate-400">-</td>
                <td className="py-4 px-4 text-slate-400">-</td>
                <td className="py-4 px-4 text-slate-400">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#F0FDF4] border border-[#DCFCE7] p-4 rounded-lg flex items-center gap-3 text-sm text-emerald-800 font-medium mb-8">
        <HiOutlineInformationCircle className="w-5 h-5 text-emerald-600 shrink-0" />
        Klik "Tambah Data" pada baris PU yang ingin Anda lengkapi untuk membuka halaman {isTindakLanjut ? 'input hasil penyulaman' : 'Input Hasil Monitoring'}.
      </div>

      <div className="flex justify-between items-center z-40">
        <button onClick={() => navigate(-1)} className="px-6 py-2.5 border border-slate-300 text-slate-700 bg-white rounded-full text-sm font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer hover:bg-slate-50">
          <HiOutlineArrowLeft className="w-4 h-4 stroke-2" /> Kembali
        </button>
        <button 
          disabled={!isAllComplete} 
          onClick={() => navigate(-1)}
          className={`px-8 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm transition-colors ${isAllComplete ? 'bg-[#008A4B] text-white hover:bg-emerald-800 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          <HiOutlinePaperAirplane className="w-4 h-4 -rotate-45" /> Kirim Hasil {isTindakLanjut ? `Penyulaman ${activeProgram.periode}` : `Monitoring ${activeProgram.periode}`}
        </button>
      </div>
    </div>
  );
};