import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiCheckCircle, HiExclamationCircle, HiOutlineArrowPath, HiOutlineXMark, HiOutlineCheck, HiXCircle } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const ProsesValidasiPenyuluh: React.FC = () => {
  const navigate = useNavigate();
  const [catatan, setCatatan] = useState('Perbedaan luasan melebihi toleransi 5%. Mohon Penyuluh melengkapi data batas lahan yang lebih akurat dan menambahkan foto kondisi lahan dari jarak dekat serta dokumen akses lokasi.');

  const handleAction = (action: string) => {
    toast.success(`Berhasil! Tindakan: ${action}`);
    navigate(-1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">Validasi Hasil Penyuluh</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-3 bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-6">Checklist Validasi</h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3.75 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-green-500 before:via-blue-300 before:to-gray-200">
            
            {[
              { label: 'Kelengkapan Data', status: 'ok' },
              { label: 'Kesesuaian Koordinat', status: 'ok' },
              { label: 'Kesesuaian Luas', status: 'warn' },
              { label: 'Dokumentasi Foto', status: 'ok' },
              { label: 'Catatan Lapangan', status: 'ok' }
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 
                  ${step.status === 'ok' ? 'bg-[#185325] text-white' : 'bg-blue-600 text-white'}`}
                >
                  {idx + 1}
                </div>
                <div className="flex-1 font-bold text-sm text-gray-700 flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                  {step.label}
                  {step.status === 'ok' ? (
                    <HiCheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <HiExclamationCircle className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-9 space-y-6">
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-bold text-gray-800">Perbandingan Data Awal vs Hasil Lapangan</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-gray-500 bg-gray-50 text-xs">
                    <tr>
                      <th className="px-4 py-3 font-bold">Aspek</th>
                      <th className="px-4 py-3 font-bold">Data Awal</th>
                      <th className="px-4 py-3 font-bold">Hasil Lapangan</th>
                      <th className="px-4 py-3 font-bold text-center">Kesesuaian</th>
                      <th className="px-4 py-3 font-bold">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">Koordinat</td>
                      <td className="px-4 py-3 text-gray-600">2.345678° S,<br/>138.765432° E</td>
                      <td className="px-4 py-3 text-gray-600">2.346123° S,<br/>138.766210° E</td>
                      <td className="px-4 py-3 text-center"><HiXCircle className="w-5 h-5 text-red-500 mx-auto" /></td>
                      <td className="px-4 py-3 text-gray-600">Selisih 93 m</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">Luas Lahan</td>
                      <td className="px-4 py-3 text-gray-600">125,50 Ha</td>
                      <td className="px-4 py-3 text-gray-600">118,40 Ha</td>
                      <td className="px-4 py-3 text-center"><HiXCircle className="w-5 h-5 text-red-500 mx-auto" /></td>
                      <td className="px-4 py-3 text-gray-600">Selisih 7,10 Ha (5,66%)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">Status Kekritisan</td>
                      <td className="px-4 py-3 text-gray-600">Kritis</td>
                      <td className="px-4 py-3 text-gray-600">Kritis</td>
                      <td className="px-4 py-3 text-center"><HiCheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="px-4 py-3 text-gray-600">Sesuai</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">Akses Lokasi</td>
                      <td className="px-4 py-3 text-gray-600">Sedang</td>
                      <td className="px-4 py-3 text-gray-600">Sulit</td>
                      <td className="px-4 py-3 text-center"><HiXCircle className="w-5 h-5 text-red-500 mx-auto" /></td>
                      <td className="px-4 py-3 text-gray-600">Perlu dicatat</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">Kondisi Lahan</td>
                      <td className="px-4 py-3 text-gray-600">Erosi ringan</td>
                      <td className="px-4 py-3 text-gray-600">Erosi ringan</td>
                      <td className="px-4 py-3 text-center"><HiCheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="px-4 py-3 text-gray-600">Sesuai</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full xl:w-64 bg-yellow-50/50 border border-yellow-200 rounded-2xl p-5 shadow-sm shrink-0">
              <h4 className="font-bold text-yellow-800 mb-3 text-sm">Data yang Harus Dilengkapi</h4>
              <p className="text-xs text-yellow-700 leading-relaxed mb-4">
                Terdapat data yang belum lengkap atau perlu dilengkapi oleh Penyuluh:
              </p>
              <ul className="list-disc pl-4 text-xs text-yellow-800 space-y-2 font-medium">
                <li>Luas lahan (jelas batas)</li>
                <li>Foto kondisi lahan (dekat)</li>
                <li>Dokumen pendukung akses lokasi</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
        <label className="block text-sm font-bold text-gray-800 mb-2">Catatan Validasi Staff PDAS <span className="text-red-500">*</span></label>
        <div className="relative mb-8">
          <textarea 
            rows={4}
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] resize-none text-gray-700 bg-gray-50"
          ></textarea>
          <span className="absolute bottom-3 right-4 text-xs text-gray-400">{catatan.length}/1000</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button 
              onClick={() => handleAction('Kembalikan untuk Perbaikan')}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-bold text-sm rounded-xl transition-all"
            >
              <HiOutlineArrowPath className="w-4 h-4 stroke-2" /> Kembalikan untuk Perbaikan
            </button>
            <button 
              onClick={() => handleAction('Tandai Tidak Sesuai')}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 font-bold text-sm rounded-xl transition-all"
            >
              <HiOutlineXMark className="w-4 h-4 stroke-2" /> Tandai Tidak Sesuai
            </button>
          </div>
          
          <button 
            onClick={() => handleAction('Setujui sebagai Tervalidasi')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95"
          >
            <HiOutlineCheck className="w-5 h-5 stroke-2" /> Setujui sebagai Tervalidasi
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProsesValidasiPenyuluh;