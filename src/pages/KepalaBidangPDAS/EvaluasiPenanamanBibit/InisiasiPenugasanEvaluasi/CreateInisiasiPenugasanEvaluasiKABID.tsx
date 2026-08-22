import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineUserPlus, HiOutlineTrash } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import * as pdfjsLib from 'pdfjs-dist';
import { getProgramsReadyAPI, postPenugasanAPI } from '@/services/evaluasi.service'; 

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const CreateInisiasiPenugasan: React.FC = () => {
  const navigate = useNavigate();
  const [programsReady, setProgramsReady] = useState<any[]>([]);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);
  const [fileSurat, setFileSurat] = useState<File | null>(null);
  const [nomorSurat, setNomorSurat] = useState('');
  const [tanggalSurat, setTanggalSurat] = useState('');
  const [idProgram, setIdProgram] = useState('');
  const [periodeEvaluasi, setPeriodeEvaluasi] = useState('');
  const [jenisProgram, setJenisProgram] = useState('');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalAkhir, setTanggalAkhir] = useState('');
  const [anggotaTim, setAnggotaTim] = useState([{ id: 1, id_user: '', peran: 'Ketua Tim' }]);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const result = await getProgramsReadyAPI();
        setProgramsReady(result);
      } catch (error: any) {
        toast.error(error.message || 'Gagal memuat daftar program.');
      } finally {
        setIsLoadingPrograms(false);
      }
    };
    fetchPrograms();
  }, []);

  const handleAddAnggota = () => {
    setAnggotaTim([...anggotaTim, { id: Date.now(), id_user: '', peran: 'Anggota Tim' }]);
  };

  const handleRemoveAnggota = (id: number) => {
    setAnggotaTim(anggotaTim.filter(a => a.id !== id));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileSurat(file);
    setIsLoadingPdf(true);
    const toastId = toast.loading('Membaca dokumen PDF...');

    try {
      const arrayBuffer = await file.arrayBuffer();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileSurat) return toast.error('Harap unggah surat tugas (PDF).');

    setIsSubmitting(true);
    const loadingToast = toast.loading('Menerbitkan penugasan...');

    try {
      const formData = new FormData();
      formData.append('file_surat_tugas', fileSurat);
      formData.append('nomor_surat', nomorSurat);
      formData.append('tanggal_surat', tanggalSurat);
      formData.append('id_program', idProgram);
      formData.append('periode_evaluasi', periodeEvaluasi);
      formData.append('jenis_program', jenisProgram);
      formData.append('tanggal_pelaksanaan_mulai', tanggalMulai);
      formData.append('tanggal_pelaksanaan_selesai', tanggalAkhir);
      
      const timPenilaiPayload = anggotaTim.map(a => ({ id_user: a.id_user, peran: a.peran }));
      formData.append('tim_penilai', JSON.stringify(timPenilaiPayload));

      await postPenugasanAPI(formData);
      
      toast.success('Surat Tugas berhasil diterbitkan! Notifikasi terkirim ke Staff.', { id: loadingToast });
      navigate(-1);
    } catch (error: any) {
      toast.error(error.message || 'Gagal menerbitkan penugasan.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 animate-in fade-in duration-300">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#185325] self-start transition-colors">
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
        <div className="border-b border-gray-100 pb-5 mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Buat Penugasan Evaluasi Baru</h1>
          <p className="text-sm text-gray-500 mt-1">Upload surat tugas dari kementerian dan tunjuk Tim Penilai.</p>
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
                  disabled={isLoadingPdf || isSubmitting}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325]" 
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Tanggal Surat <span className="text-red-500">*</span></label>
                <input required type="date" value={tanggalSurat} onChange={(e)=>setTanggalSurat(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325]" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Pilih Program / Lokasi Rehabilitasi <span className="text-red-500">*</span></label>
                <select required value={idProgram} onChange={(e)=>setIdProgram(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] bg-white">
                  <option value="" disabled>{isLoadingPrograms ? 'Memuat Program...' : '-- Pilih Program dari Modul Pelaksanaan --'}</option>
                  {programsReady.map((prog: any) => (
                    <option key={prog.id_program} value={prog.id_program}>
                      {prog.nama_program} - {prog.lokasi} ({prog.jenis_program})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Periode Evaluasi <span className="text-red-500">*</span></label>
                <select required value={periodeEvaluasi} onChange={(e)=>setPeriodeEvaluasi(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] bg-white">
                  <option value="" disabled>-- Pilih Tahap Evaluasi --</option>
                  <option value="P0">Penanaman Awal (P0)</option>
                  <option value="P1">Pemeliharaan I (P1)</option>
                  <option value="P2">Pemeliharaan II (P2)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Jenis Program <span className="text-red-500">*</span></label>
                <select required value={jenisProgram} onChange={(e)=>setJenisProgram(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] bg-white">
                  <option value="" disabled>-- Pilih Jenis --</option>
                  <option value="APBD">APBD</option>
                  <option value="CSR">CSR</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Periode Pelaksanaan Evaluasi (Mulai) <span className="text-red-500">*</span></label>
                <input required type="date" value={tanggalMulai} onChange={(e)=>setTanggalMulai(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Periode Pelaksanaan Evaluasi (Selesai) <span className="text-red-500">*</span></label>
                <input required type="date" value={tanggalAkhir} onChange={(e)=>setTanggalAkhir(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325]" />
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
                    <select 
                      required 
                      value={anggota.id_user}
                      onChange={(e) => {
                        const newTim = [...anggotaTim];
                        newTim[index].id_user = e.target.value;
                        setAnggotaTim(newTim);
                      }}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-full text-sm focus:ring-1 focus:ring-[#185325] bg-white"
                    >
                      <option value="" disabled>Pilih Staff...</option>
                      {/* TODO: Idealnya ini ditarik dari API Get Staff. Sementara dilist manual ID-nya */}
                      <option value="user-srie">Srie Resmita Dewi, SP., MP (srie@pdas.go.id)</option>
                      <option value="user-caskadi">Muhammad Caskadi (caskadi@pdas.go.id)</option>
                      <option value="user-andi">Andi Mansur, S.P (andi@pdas.go.id)</option>
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
                    <button type="button" onClick={() => handleRemoveAnggota(anggota.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors shrink-0">
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={handleAddAnggota} className="mt-4 px-4 py-2.5 border-2 border-dashed border-[#185325] text-[#185325] hover:bg-[#f0f9f3] text-xs font-bold rounded-full transition-colors flex items-center gap-2">
                <HiOutlineUserPlus className="w-4 h-4" /> Tambah Personil Tim
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button disabled={isSubmitting} type="submit" className="w-full md:w-auto px-10 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full shadow-sm transition-colors active:scale-95 disabled:opacity-70">
              {isSubmitting ? 'Memproses...' : 'Simpan & Terbitkan Penugasan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInisiasiPenugasan;