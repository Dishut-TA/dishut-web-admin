import React from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineMapPin, HiOutlineClock, HiOutlineUserPlus, HiOutlineDocumentText, HiOutlineCalendar } from 'react-icons/hi2';
import { PiPlant, PiLeaf, PiTree } from 'react-icons/pi';
import type { ProgramData } from '../types';

interface ReadOnlyViewProps {
  activeId: string;
  activeProgram: ProgramData;
  programStatus: string;
  navigate: NavigateFunction;
}

export const ReadOnlyView: React.FC<ReadOnlyViewProps> = ({
  activeId,
  activeProgram,
  programStatus,
  navigate
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans w-full pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-2xl font-bold text-slate-900">Detail Hasil Monitoring P2</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-orange-50 text-orange-700 border-orange-200">
              {programStatus}
            </span>
          </div>
          <p className="text-sm text-slate-500">Halaman ini hanya menampilkan hasil monitoring. Proses evaluasi dilakukan oleh Tim Evaluasi pada modul evaluasi.</p>
        </div>
        <button onClick={() => navigate(-1)} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer shadow-sm">
          <HiOutlineArrowLeft className="w-4 h-4 stroke-2" /> Kembali
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col lg:flex-row gap-6">
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
              <div><p className="text-[10px] text-slate-500 font-semibold mb-1">Nama Program</p><p className="text-xs font-bold text-slate-900">{activeProgram.nama}</p></div>
              <div><p className="text-[10px] text-slate-500 font-semibold mb-1">KTH</p><p className="text-xs font-bold text-slate-900">KTH Karangsong Lestari</p></div>
              <div className="hidden md:block"></div>
              <div><p className="text-[10px] text-slate-500 font-semibold mb-1">ID Program</p><p className="text-xs font-bold text-slate-900">{activeId}</p></div>
              <div><p className="text-[10px] text-slate-500 font-semibold mb-1">Penyuluh</p><p className="text-xs font-bold text-slate-900">Ahmad Fauzi</p></div>
              <div className="hidden md:block"></div>
              <div><p className="text-[10px] text-slate-500 font-semibold mb-1">Jenis Program</p><p className="text-xs font-bold text-slate-900">Rehabilitasi Mangrove</p></div>
              <div><p className="text-[10px] text-slate-500 font-semibold mb-1">Periode Monitoring</p><p className="text-xs font-bold text-slate-900">P2</p></div>
              <div className="hidden md:block"></div>
              <div><p className="text-[10px] text-slate-500 font-semibold mb-1">Lokasi</p><p className="text-xs font-bold text-slate-900 leading-snug whitespace-pre-line">{activeProgram.lokasi}</p></div>
              <div><p className="text-[10px] text-slate-500 font-semibold mb-1">Tanggal Monitoring</p><p className="text-xs font-bold text-slate-900">22 Mei 2026</p></div>
              <div className="hidden md:block"></div>
              <div><p className="text-[10px] text-slate-500 font-semibold mb-1">Luas Area</p><p className="text-xs font-bold text-slate-900">25,40 Ha</p></div>
              <div><p className="text-[10px] text-slate-500 font-semibold mb-1">Sumber Dana</p><p className="text-xs font-bold text-slate-900">APBD</p></div>
            </div>
            <div className="w-full lg:w-64 h-32 shrink-0">
               <div className="w-full h-full bg-slate-100 rounded-lg relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400')] bg-cover bg-center border border-slate-200">
                  <div className="absolute inset-0 flex items-center justify-center"><HiOutlineMapPin className="w-6 h-6 text-green-500 drop-shadow" /></div>
               </div>
               <button className="text-[10px] font-bold text-blue-600 mt-2 flex items-center gap-1 hover:text-blue-700 cursor-pointer">Lihat di Peta <HiOutlineMapPin className="w-3 h-3"/></button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Ringkasan Hasil Monitoring P2</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="border border-emerald-100 bg-emerald-50/30 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                 <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2"><PiPlant className="w-4 h-4"/></div>
                 <p className="text-[9px] text-slate-500 font-semibold leading-tight mb-1">Persentase Keberhasilan</p>
                 <h3 className="text-xl font-bold text-slate-900">92,01%</h3>
                 <span className="text-[9px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold mt-1.5">Baik</span>
              </div>
              <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                 <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-2"><PiLeaf className="w-4 h-4"/></div>
                 <p className="text-[9px] text-slate-500 font-semibold leading-tight mb-1">Jumlah Tanaman Hidup</p>
                 <h3 className="text-xl font-bold text-slate-900">13.210</h3>
                 <p className="text-[9px] text-slate-400 mt-0.5">Batang</p>
              </div>
              <div className="border border-orange-100 bg-orange-50/30 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                 <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-2"><PiTree className="w-4 h-4"/></div>
                 <p className="text-[9px] text-slate-500 font-semibold leading-tight mb-1">Jumlah Tanaman Mati</p>
                 <h3 className="text-xl font-bold text-slate-900">1.150</h3>
                 <p className="text-[9px] text-slate-400 mt-0.5">Batang</p>
              </div>
              <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                 <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-2"><HiOutlineMapPin className="w-4 h-4"/></div>
                 <p className="text-[9px] text-slate-500 font-semibold leading-tight mb-1">Jumlah Titik Geotag</p>
                 <h3 className="text-xl font-bold text-slate-900">118</h3>
                 <p className="text-[9px] text-slate-400 mt-0.5">Titik</p>
              </div>
              <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                 <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 border border-amber-100 flex items-center justify-center mb-2"><HiOutlineDocumentText className="w-4 h-4"/></div>
                 <p className="text-[9px] text-slate-500 font-semibold leading-tight mb-1">Dokumentasi</p>
                 <h3 className="text-xl font-bold text-slate-900">36</h3>
                 <p className="text-[9px] text-slate-400 mt-0.5">Foto</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Data Hasil Monitoring P2</h3>
            </div>
            <div className="overflow-x-auto p-2">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-[10px] text-slate-500 font-bold border-b border-slate-200">
                  <tr><th className="py-3 px-4">Indikator</th><th className="py-3 px-4">Target (P0)</th><th className="py-3 px-4">Hasil P2</th><th className="py-3 px-4">Perubahan</th><th className="py-3 px-4">Persentase</th><th className="py-3 px-4">Keterangan</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr><td className="py-3.5 px-4 text-slate-800">Total Tanaman</td><td className="py-3.5 px-4">15.000 Batang</td><td className="py-3.5 px-4">14.360 Batang</td><td className="py-3.5 px-4 text-slate-600">-640</td><td className="py-3.5 px-4">95,73%</td><td className="py-3.5 px-4"><span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded font-bold text-[9px]">Baik</span></td></tr>
                  <tr><td className="py-3.5 px-4 text-slate-800">Tanaman Hidup</td><td className="py-3.5 px-4">13.860 Batang</td><td className="py-3.5 px-4">13.210 Batang</td><td className="py-3.5 px-4 text-slate-600">-650</td><td className="py-3.5 px-4">92,01%</td><td className="py-3.5 px-4"><span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded font-bold text-[9px]">Baik</span></td></tr>
                  <tr><td className="py-3.5 px-4 text-slate-800">Tanaman Mati</td><td className="py-3.5 px-4">990 Batang</td><td className="py-3.5 px-4">1.150 Batang</td><td className="py-3.5 px-4 text-red-500">+160</td><td className="py-3.5 px-4">7,99%</td><td className="py-3.5 px-4"><span className="text-orange-700 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded font-bold text-[9px]">Perlu Perhatian</span></td></tr>
                  <tr><td className="py-3.5 px-4 text-slate-800">Persentase Hidup</td><td className="py-3.5 px-4">93,33%</td><td className="py-3.5 px-4">92,01%</td><td className="py-3.5 px-4 text-slate-600">-1,32%</td><td className="py-3.5 px-4">92,01%</td><td className="py-3.5 px-4"><span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded font-bold text-[9px]">Baik</span></td></tr>
                  <tr><td className="py-3.5 px-4 text-slate-800">Titik Geotag</td><td className="py-3.5 px-4">120 Titik</td><td className="py-3.5 px-4">118 Titik</td><td className="py-3.5 px-4 text-slate-600">-2</td><td className="py-3.5 px-4">98,33%</td><td className="py-3.5 px-4"><span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded font-bold text-[9px]">Baik</span></td></tr>
                  <tr><td className="py-3.5 px-4 text-slate-800">Dokumentasi</td><td className="py-3.5 px-4">48 Foto</td><td className="py-3.5 px-4">36 Foto</td><td className="py-3.5 px-4 text-slate-600">-12</td><td className="py-3.5 px-4">75,00%</td><td className="py-3.5 px-4"><span className="text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded font-bold text-[9px]">Cukup</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="text-sm font-bold text-slate-900 mb-4">Peta Lokasi Monitoring</h3>
               <div className="h-40 bg-gray-100 rounded-lg relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600')] bg-cover bg-center border border-slate-200">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <HiOutlineMapPin className="w-5 h-5 text-red-500 absolute top-1/4 left-1/4" />
                    <HiOutlineMapPin className="w-5 h-5 text-green-500 absolute top-1/3 left-1/2" />
                    <HiOutlineMapPin className="w-5 h-5 text-green-500 absolute top-1/2 left-1/3" />
                    <HiOutlineMapPin className="w-5 h-5 text-orange-500 absolute bottom-1/3 right-1/4" />
                  </div>
               </div>
               <button className="text-[10px] font-bold text-blue-600 mt-3 flex items-center gap-1 hover:text-blue-700 cursor-pointer">Lihat di Peta <HiOutlineMapPin className="w-3 h-3"/></button>
             </div>
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="text-sm font-bold text-slate-900 mb-4">Dokumentasi Foto</h3>
               <div className="grid grid-cols-4 gap-2 mb-3">
                 {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="bg-slate-200 rounded-lg h-16 bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=150')] bg-cover border border-slate-200"></div>)}
               </div>
               <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer mt-2">Lihat semua dokumentasi (36 foto) &rarr;</button>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="text-sm font-bold text-slate-900 mb-3">Catatan Penyuluh</h3>
               <p className="text-[11px] text-slate-600 leading-relaxed mb-5">
                 Sebagian tanaman mengalami kerusakan akibat pasang tinggi dan abrasi. Telah dilakukan penggantian tanaman mati pada beberapa titik. Kondisi umum baik dan pertumbuhan tanaman stabil.
               </p>
               <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                 <HiOutlineDocumentText className="w-6 h-6 text-blue-500 shrink-0" />
                 <div className="flex-1">
                   <p className="text-[11px] font-bold text-blue-700 leading-tight mb-0.5 truncate">Laporan_Monitoring_P2_Karangsong.pdf</p>
                 </div>
                 <span className="text-[10px] font-medium text-slate-400 shrink-0">(1,2 MB)</span>
               </div>
             </div>
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="text-sm font-bold text-slate-900 mb-4">Riwayat Monitoring</h3>
               <table className="w-full text-left text-[11px]">
                 <thead className="bg-[#F8FAFC] text-slate-500 font-bold border-b border-slate-200">
                   <tr><th className="py-2.5 px-3">Periode</th><th className="py-2.5 px-3">Tanggal Monitoring</th><th className="py-2.5 px-3">Penyuluh</th><th className="py-2.5 px-3">Persentase</th><th className="py-2.5 px-3">Status</th></tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                   <tr><td className="py-3 px-3">P0</td><td className="py-3 px-3">10 Mei 2026</td><td className="py-3 px-3">Ahmad Fauzi</td><td className="py-3 px-3">93,33%</td><td className="py-3 px-3"><span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold text-[9px]">Selesai</span></td></tr>
                   <tr><td className="py-3 px-3">P1</td><td className="py-3 px-3">27 Mei 2026</td><td className="py-3 px-3">Ahmad Fauzi</td><td className="py-3 px-3">90,25%</td><td className="py-3 px-3"><span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold text-[9px]">Selesai</span></td></tr>
                   <tr><td className="py-3 px-3 font-bold text-slate-900">P2</td><td className="py-3 px-3 font-bold text-slate-900">22 Mei 2026</td><td className="py-3 px-3 font-bold text-slate-900">Ahmad Fauzi</td><td className="py-3 px-3 font-bold text-slate-900">92,01%</td><td className="py-3 px-3"><span className="text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100 font-bold text-[9px] whitespace-nowrap">Menunggu Evaluasi</span></td></tr>
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center">
            <h3 className="text-sm font-bold text-slate-500 mb-5 text-left border-b border-slate-100 pb-3 w-full">Status Program</h3>
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mb-4">
               <HiOutlineClock className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-orange-600 mb-3 leading-none">Menunggu Evaluasi</h2>
            <p className="text-[11px] text-slate-500 leading-relaxed px-2">Hasil monitoring telah dikirim dan sedang menunggu proses evaluasi oleh Tim Evaluasi.</p>
          </div>

          <div className="bg-[#F0F6FF] rounded-xl shadow-sm border border-[#BFDBFE] p-5">
             <div className="flex items-start gap-3">
               <HiOutlineUserPlus className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
               <div>
                 <h3 className="text-sm font-bold text-blue-900 mb-1.5">Informasi Lanjutan</h3>
                 <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                   Tindak lanjut program akan ditentukan pada modul evaluasi oleh Staff PDAS Tim Evaluasi.
                 </p>
               </div>
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">Ringkasan Status</h3>
            </div>
            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-[100px_10px_1fr] items-start"><span className="text-slate-500 font-medium flex items-center gap-2"><HiOutlineCalendar className="w-4 h-4"/> Periode</span><span className="text-slate-500">:</span><span className="text-slate-900 font-semibold">P2</span></div>
              <div className="grid grid-cols-[100px_10px_1fr] items-start"><span className="text-slate-500 font-medium flex items-center gap-2"><HiOutlineUserPlus className="w-4 h-4"/> KTH</span><span className="text-slate-500">:</span><span className="text-slate-900 font-semibold">KTH Karangsong Lestari</span></div>
              <div className="grid grid-cols-[100px_10px_1fr] items-start"><span className="text-slate-500 font-medium flex items-center gap-2"><HiOutlineUserPlus className="w-4 h-4"/> Penyuluh</span><span className="text-slate-500">:</span><span className="text-slate-900 font-semibold">Ahmad Fauzi</span></div>
              <div className="grid grid-cols-[100px_10px_1fr] items-start"><span className="text-slate-500 font-medium flex items-center gap-2"><HiOutlineDocumentText className="w-4 h-4"/> Kabupaten</span><span className="text-slate-500">:</span><span className="text-slate-900 font-semibold">Indramayu</span></div>
              <div className="grid grid-cols-[100px_10px_1fr] items-start"><span className="text-slate-500 font-medium flex items-center gap-2"><HiOutlineMapPin className="w-4 h-4"/> Luas Area</span><span className="text-slate-500">:</span><span className="text-slate-900 font-semibold">25,40 Ha</span></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">Timeline Program</h3>
            </div>
            <div className="p-5 space-y-6">
              <div className="flex gap-4 relative">
                <div className="absolute left-2.75 top-7 bottom-6 w-0.5 bg-emerald-200"></div>
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 z-10 shadow-sm"><HiOutlineArrowLeft className="w-4 h-4 text-white rotate-180 stroke-2" /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-0.5"><p className="text-[11px] font-bold text-slate-900">P0 - Penanaman Awal</p><span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Selesai</span></div>
                  <p className="text-[10px] text-slate-500">10 Mei 2026</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="absolute left-2.75 top-7 bottom-6 w-0.5 bg-emerald-200"></div>
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 z-10 shadow-sm"><HiOutlineArrowLeft className="w-4 h-4 text-white rotate-180 stroke-2" /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-0.5"><p className="text-[11px] font-bold text-slate-900">P1 - Monitoring P1</p><span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Selesai</span></div>
                  <p className="text-[10px] text-slate-500">27 Mei – 12 Jun 2026</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="absolute left-2.75 top-7 bottom-6 w-0.5 bg-gray-200"></div>
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center shrink-0 z-10 shadow-sm"><HiOutlineClock className="w-4 h-4 text-white stroke-2" /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-0.5"><p className="text-[11px] font-bold text-slate-900">P2 - Monitoring P2 (Aktif)</p><span className="text-[9px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 border border-orange-200 rounded whitespace-nowrap">Menunggu Evaluasi</span></div>
                  <p className="text-[10px] text-slate-500">22 Mei – 27 Mei 2026</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="absolute left-2.75 top-7 bottom-6 w-0.5 bg-gray-200"></div>
                <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shrink-0 z-10"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-0.5"><p className="text-[11px] font-bold text-gray-500">P3 - Monitoring P3</p><span className="text-[9px] font-bold text-gray-500">Menunggu</span></div>
                  <p className="text-[10px] text-gray-400">Jul 2026</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shrink-0 z-10"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-0.5"><p className="text-[11px] font-bold text-gray-500">P4 - Monitoring P4</p><span className="text-[9px] font-bold text-gray-500">Menunggu</span></div>
                  <p className="text-[10px] text-gray-400">Sep 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};