import React, { useState, useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import type { Option } from './AnimatedSelect';
import AnimatedSelect from './AnimatedSelect';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalBuatPenugasan: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [penyuluh, setPenyuluh] = useState('');
  const [kategori, setKategori] = useState('');
  const [jenisProgram, setJenisProgram] = useState('');
  const [wilayah, setWilayah] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [periode, setPeriode] = useState('');
  const [catatan, setCatatan] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setPenyuluh(''); setKategori(''); setJenisProgram(''); 
      setWilayah(''); setLokasi(''); setTanggal(''); 
      setPeriode(''); setCatatan('');
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (jenisProgram === 'apbd') {
      setWilayah('cimanuk');
      setLokasi('hulu');
    } else if (jenisProgram === 'csr') {
      setWilayah('citarum');
      setLokasi('purwakarta');
    } else if (jenisProgram === 'donasi') {
      setWilayah('ciujung');
      setLokasi('serang');
    } else {
      // Kosongkan jika belum memilih program
      setWilayah('');
      setLokasi('');
    }
  }, [jenisProgram]);

  const penyuluhOptions: Option[] = [
    { value: 'andi', label: 'Andi Permana', badgeText: '2/5 Tugas', badgeColor: 'bg-blue-100 text-blue-700' },
    { value: 'budi', label: 'Budi Santoso', badgeText: '1/5 Tugas', badgeColor: 'bg-blue-100 text-blue-700' },
    { value: 'siti', label: 'Siti Nurhaliza', disabled: true, badgeText: 'Penuh (5/5 Tugas)', badgeColor: 'bg-red-100 text-red-700' }, // Contoh Disable karena overload
  ];

  const programOptions: Option[] = [
    { value: 'apbd', label: 'APBD - Rehabilitasi DAS Cimanuk' },
    { value: 'csr', label: 'CSR - Penghijauan Citarum Harum' },
    { value: 'donasi', label: 'Donasi - Penanaman Mangrove' },
  ];

  const kategoriOptions: Option[] = [
    { value: 'validasi', label: 'Validasi Lokasi' },
    { value: 'pelaksanaan', label: 'Pelaksanaan Kegiatan' },
    { value: 'monitoring', label: 'Monitoring / Evaluasi' },
  ];

  const wilayahOptions: Option[] = [
    { value: 'cimanuk', label: 'DAS Cimanuk' },
    { value: 'citarum', label: 'DAS Citarum' },
    { value: 'ciujung', label: 'DAS Ciujung' },
  ];

  const lokasiOptions: Option[] = [
    { value: 'hulu', label: 'Hulu DAS Cimanuk (Garut)' },
    { value: 'purwakarta', label: 'Kabupaten Purwakarta' },
    { value: 'serang', label: 'Kabupaten Serang' },
    { value: 'bandung', label: 'Bandung Raya' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Penugasan baru berhasil dibuat!');
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl w-full max-w-xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-gray-800">Buat Penugasan Baru</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <HiXMark className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form id="form-penugasan" onSubmit={handleSubmit} className="space-y-6">
            <AnimatedSelect
              label="Pilih Penyuluh Pelaksana"
              placeholder="Pilih Penyuluh"
              options={penyuluhOptions}
              value={penyuluh}
              onChange={setPenyuluh}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <AnimatedSelect 
                label="Kategori Penugasan"
                placeholder="Pilih Kategori"
                options={kategoriOptions}
                value={kategori}
                onChange={setKategori}
                required
              />
              
              <AnimatedSelect 
                label="Jenis Program"
                placeholder="Pilih Program"
                options={programOptions}
                value={jenisProgram}
                onChange={setJenisProgram}
                required
              />
            </div>

            <div className="bg-secondary/50 p-4 rounded-xl space-y-5">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-2">
                Detail Lokasi <span className="text-[10px] font-medium normal-case bg-secondary px-2 py-0.5 rounded text-black">(Terisi Otomatis)</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <AnimatedSelect 
                  label="Wilayah PDAS"
                  placeholder="Pilih Wilayah"
                  options={wilayahOptions}
                  value={wilayah}
                  onChange={setWilayah}
                  required
                />

                <AnimatedSelect 
                  label="Lokasi / Kecamatan"
                  placeholder="Pilih Lokasi"
                  options={lokasiOptions}
                  value={lokasi}
                  onChange={setLokasi}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Tanggal Penugasan</label>
                <input required type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all text-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Periode Validasi</label>
                <input required type="date" value={periode} onChange={e => setPeriode(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all text-gray-700" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Catatan (Opsional)</label>
              <textarea value={catatan} onChange={e => setCatatan(e.target.value)} placeholder="Masukkan catatan atau instruksi khusus..." rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all resize-none bg-white"></textarea>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-2xl z-10">
          <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors">
            Batal
          </button>
          <button type="submit" form="form-penugasan" disabled={isLoading} className="px-8 py-2.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-xl transition-all disabled:opacity-70 flex items-center gap-2 shadow-lg shadow-[#185325]/20">
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : null}
            {isLoading ? 'Menyimpan...' : 'Simpan Penugasan'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModalBuatPenugasan;