import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineChevronLeft, 
  HiOutlineUserPlus, 
  HiOutlineTrash 
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const CreateInisiasiPenugasan: React.FC = () => {
  const navigate = useNavigate();
  const [anggotaTim, setAnggotaTim] = useState([{ id: 1, nama: '', peran: 'Ketua Tim' }]);
  const [nomorSurat, setNomorSurat] = useState('');
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const handleAddAnggota = () => {
    setAnggotaTim([...anggotaTim, { id: Date.now(), nama: '', peran: 'Anggota Tim' }]);
  };

  const handleRemoveAnggota = (id: number) => {
    setAnggotaTim(anggotaTim.filter(a => a.id !== id));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoadingPdf(true);
    const toastId = toast.loading('Membaca dokumen PDF...');

    try {
      const arrayBuffer = await file.arrayBuffer();
      // Konversi ArrayBuffer menjadi Uint8Array agar TypeScript dan PDF.js tidak error
      const typedArray = new Uint8Array(arrayBuffer); 
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
      
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      
      const text = textContent.items.map((item: any) => item.str).join(' ');
      
      const regex = /NOMOR\s*[:]?\s*([A-Z0-9.\/-]+)/i;
      const match = text.match(regex);

      if (match && match[1]) {
        setNomorSurat(match[1]);
        toast.success('Nomor surat berhasil diekstrak otomatis!', { id: toastId });
      } else {
        toast.error('Nomor surat tidak ditemukan, silakan isi manual.', { id: toastId });
      }
    } catch (error) {
      toast.error('Gagal memproses dokumen PDF.', { id: toastId });
    } finally {
      setIsLoadingPdf(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Surat Tugas berhasil diterbitkan! Notifikasi terkirim ke Staff PDAS.');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 animate-in fade-in duration-300">
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
                <input 
                  required 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileUpload}
                  disabled={isLoadingPdf}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#f0f9f3] file:text-[#185325] hover:file:bg-[#DCECE0] transition-colors" 
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Nomor Surat Tugas <span className="text-red-500">*</span></label>
                <input 
                  required 
                  type="text" 
                  value={nomorSurat}
                  onChange={(e) => setNomorSurat(e.target.value)}
                  placeholder="Contoh: ST.76/TKTRH/..." 
                  className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] focus:border-[#185325]" 
                />
                <p className="text-[10px] text-gray-400 mt-1.5">
                  *Terisi otomatis dari PDF, namun dapat disesuaikan manual.
                </p>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Tanggal Surat <span className="text-red-500">*</span></label>
                <input required type="date" className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] focus:border-[#185325]" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Pilih Program / Lokasi Rehabilitasi <span className="text-red-500">*</span></label>
                <select required defaultValue="" className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] bg-white">
                  <option value="" disabled>-- Pilih Program dari Modul Pelaksanaan --</option>
                  <option value="1">Rehabilitasi DAS PT. Jawa Satu Power - Kab. Garut</option>
                  <option value="2">Rehabilitasi DAS SKK Migas PT Pertamina EP - Kab. Majalengka</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Periode Evaluasi <span className="text-red-500">*</span></label>
                <select required defaultValue="" className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] bg-white">
                  <option value="" disabled>-- Pilih Tahap Evaluasi --</option>
                  <option value="P0">Penanaman Awal (P0)</option>
                  <option value="P1">Pemeliharaan I (P1)</option>
                  <option value="P2">Pemeliharaan II (P2)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Jenis Program <span className="text-red-500">*</span></label>
                <select required defaultValue="" className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] bg-white">
                  <option value="" disabled>-- Pilih Jenis --</option>
                  <option value="APBD">APBD</option>
                  <option value="CSR">CSR</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Periode Pelaksanaan Evaluasi (Mulai) <span className="text-red-500">*</span></label>
                <input required type="date" className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] focus:border-[#185325]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Periode Pelaksanaan Evaluasi (Selesai) <span className="text-red-500">*</span></label>
                <input required type="date" className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] focus:border-[#185325]" />
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
                    <select required defaultValue="" className="w-full px-4 py-2.5 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] bg-white">
                      <option value="" disabled>Pilih Staff...</option>
                      <option>Srie Resmita Dewi, SP., MP (srie@pdas.go.id)</option>
                      <option>Muhammad Caskadi (caskadi@pdas.go.id)</option>
                      <option>Andi Mansur, S.P (andi@pdas.go.id)</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/3">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Peran</label>
                    <select 
                      value={anggota.peran} 
                      onChange={(e) => {
                        const newTim = [...anggotaTim];
                        newTim[index].peran = e.target.value;
                        setAnggotaTim(newTim);
                      }} 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] bg-white font-semibold"
                    >
                      <option>Ketua Tim</option>
                      <option>Sekretaris Tim</option>
                      <option>Anggota Tim</option>
                    </select>
                  </div>
                  {index > 0 && (
                    <button type="button" onClick={() => handleRemoveAnggota(anggota.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors shrink-0 border border-transparent hover:border-red-200 active:scale-95">
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={handleAddAnggota} className="mt-4 px-4 py-2.5 border-2 border-dashed border-[#185325] text-[#185325] hover:bg-[#f0f9f3] text-xs font-bold rounded-full transition-colors flex items-center gap-2 active:scale-95">
                <HiOutlineUserPlus className="w-4 h-4" /> Tambah Personil Tim
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button type="submit" className="w-full md:w-auto px-10 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full shadow-sm transition-colors active:scale-95">
              Simpan & Terbitkan Penugasan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInisiasiPenugasan;