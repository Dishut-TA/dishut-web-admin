import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineChevronLeft, 
  HiOutlineUserPlus, 
  HiOutlineTrash 
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

const CreateInisiasiPenugasan: React.FC = () => {
  const navigate = useNavigate();
  const [anggotaTim, setAnggotaTim] = useState([{ id: 1, nama: '', peran: 'Ketua Tim' }]);

  const handleAddAnggota = () => {
    setAnggotaTim([...anggotaTim, { id: Date.now(), nama: '', peran: 'Anggota' }]);
  };

  const handleRemoveAnggota = (id: number) => {
    setAnggotaTim(anggotaTim.filter(a => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Surat Tugas berhasil diterbitkan! Notifikasi terkirim ke Staff PDAS.');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#185325] self-start transition-colors">
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
        <div className="border-b border-gray-100 pb-5 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Buat Penugasan Evaluasi Baru</h1>
            <p className="text-sm text-gray-500 mt-1">Upload surat tugas dari kementerian dan tunjuk Tim Penilai.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-[#185325] uppercase tracking-wider mb-2">1. Metadata Surat Tugas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Upload Scan Surat Tugas (PDF) <span className="text-red-500">*</span></label>
                <input required type="file" accept=".pdf" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#f0f9f3] file:text-[#185325] hover:file:bg-[#DCECE0]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Nomor Surat Tugas <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="Contoh: ST.76/TKTRH/..." className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#185325] focus:border-[#185325]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Tanggal Surat <span className="text-red-500">*</span></label>
                <input required type="date" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#185325] focus:border-[#185325]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Pilih Program / Lokasi Rehabilitasi <span className="text-red-500">*</span></label>
                <select required className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#185325] bg-white">
                  <option value="" disabled selected>-- Pilih Program --</option>
                  <option>Rehabilitasi DAS PT. Jawa Satu Power - Kab. Garut</option>
                  <option>Rehabilitasi DAS SKK Migas PT Pertamina EP - Kab. Majalengka</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Periode Evaluasi <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="Contoh: Tahun 2026 (Tahap Penilaian Akhir)" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#185325] focus:border-[#185325]" />
              </div>
            </div>
          </div>

          <div className="space-y-5 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold text-[#185325] uppercase tracking-wider mb-2">2. Susunan Tim Penilai (Staff PDAS)</h3>
            
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 md:p-6 space-y-4">
              {anggotaTim.map((anggota, index) => (
                <div key={anggota.id} className="flex flex-col sm:flex-row gap-3 items-end">
                  <div className="w-full">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Nama & Email Staff PDAS</label>
                    <select required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#185325] bg-white">
                      <option value="" disabled selected>Pilih Staff...</option>
                      <option>Srie Resmita Dewi, SP., MP (srie@pdas.go.id)</option>
                      <option>Muhammad Caskadi (caskadi@pdas.go.id)</option>
                      <option>Andi Mansur, S.P (andi@pdas.go.id)</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/3">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Peran</label>
                    <select value={anggota.peran} onChange={(e) => {
                      const newTim = [...anggotaTim];
                      newTim[index].peran = e.target.value;
                      setAnggotaTim(newTim);
                    }} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#185325] bg-white font-semibold">
                      <option>Ketua Tim</option>
                      <option>Sekretaris Tim</option>
                      <option>Anggota Tim</option>
                    </select>
                  </div>
                  {index > 0 && (
                    <button type="button" onClick={() => handleRemoveAnggota(anggota.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0 border border-transparent hover:border-red-200">
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={handleAddAnggota} className="mt-4 px-4 py-2.5 border-2 border-dashed border-[#185325] text-[#185325] hover:bg-[#f0f9f3] text-xs font-bold rounded-xl transition-colors flex items-center gap-2">
                <HiOutlineUserPlus className="w-4 h-4" /> Tambah Personil Tim
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button type="submit" className="w-full md:w-auto px-10 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-xl shadow-sm transition-colors">
              Simpan & Terbitkan Penugasan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInisiasiPenugasan;