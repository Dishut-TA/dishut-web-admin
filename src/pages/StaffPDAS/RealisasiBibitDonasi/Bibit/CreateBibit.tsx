import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlinePlus, HiOutlineTrash, HiOutlineCurrencyDollar } from 'react-icons/hi2';
import toast from 'react-hot-toast';

interface SpekHarga {
  id: number;
  tinggiMin: string;
  tinggiMax: string;
  harga: string;
}

const CreateBibit: React.FC = () => {
  const navigate = useNavigate();
  const [namaBibit, setNamaBibit] = useState('');
  const [kategori, setKategori] = useState('Tanaman Kehutanan');
  const [sertifikasi, setSertifikasi] = useState('');
  
  // State dinamis untuk spesifikasi tinggi dan harga
  const [spekHarga, setSpekHarga] = useState<SpekHarga[]>([
    { id: Date.now(), tinggiMin: '30', tinggiMax: '60', harga: '' }
  ]);

  const handleAddSpek = () => {
    setSpekHarga([...spekHarga, { id: Date.now(), tinggiMin: '', tinggiMax: '', harga: '' }]);
  };

  const handleRemoveSpek = (id: number) => {
    if (spekHarga.length === 1) {
      toast.error('Minimal harus ada 1 spesifikasi harga.');
      return;
    }
    setSpekHarga(spekHarga.filter(item => item.id !== id));
  };

  const handleChangeSpek = (id: number, field: keyof SpekHarga, value: string) => {
    setSpekHarga(spekHarga.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasEmptyFields = spekHarga.some(s => !s.harga || !s.tinggiMin);
    if (hasEmptyFields) {
      toast.error('Pastikan semua rentang tinggi dan harga telah diisi.');
      return;
    }
    toast.success('Master Data Bibit berhasil disimpan!');
    navigate(-1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tambah Master Bibit Baru</h1>
          <p className="text-sm text-gray-500">Definisikan harga bibit berdasarkan rentang tinggi tanaman.</p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden relative">
        <form onSubmit={handleSubmit}>
          
          <div className="p-8 space-y-8">
            {/* Informasi Dasar Bibit */}
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-6">
              <h3 className="text-sm font-bold text-[#185325] uppercase tracking-wider mb-2">Informasi Dasar</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nama Spesies / Bibit <span className="text-red-500">*</span></label>
                  <input 
                    required type="text" value={namaBibit} onChange={e => setNamaBibit(e.target.value)}
                    placeholder="Contoh: Sengon (Falcataria falcata)"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Bibit <span className="text-red-500">*</span></label>
                  <select 
                    value={kategori} onChange={e => setKategori(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer"
                  >
                    <option value="Tanaman Kehutanan">Tanaman Kehutanan (Kayu)</option>
                    <option value="MPTS / Buah">MPTS / Buah-buahan</option>
                    <option value="Tanaman Hias">Tanaman Hias / Ekologi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Status Sertifikasi</label>
                  <input 
                    type="text" value={sertifikasi} onChange={e => setSertifikasi(e.target.value)}
                    placeholder="Contoh: Sertifikat (TBT) atau Benih Sebar"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Dinamis Input: Tinggi & Harga */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#185325] uppercase tracking-wider">Spesifikasi Harga per Batang</h3>
                  <p className="text-xs text-gray-500 mt-1">Tambahkan rentang ukuran tinggi dan harganya. (Kosongkan 'Maks' jika ukuran lebih dari batas).</p>
                </div>
                <button 
                  type="button" onClick={handleAddSpek}
                  className="px-4 py-2 bg-emerald-50 text-[#185325] text-xs font-bold rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
                >
                  <HiOutlinePlus className="w-4 h-4" /> Tambah Ukuran
                </button>
              </div>

              <div className="space-y-4">
                {spekHarga.map((spek, index) => (
                  <div key={spek.id} className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 border border-gray-200 rounded-2xl bg-white shadow-sm group">
                    <span className="w-6 h-6 flex items-center justify-center bg-gray-100 text-gray-500 text-xs font-bold rounded-full shrink-0">
                      {index + 1}
                    </span>
                    
                    {/* Input Rentang Tinggi */}
                    <div className="flex-1 w-full grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Tinggi Min (cm)</label>
                        <input 
                          type="number" required value={spek.tinggiMin} onChange={e => handleChangeSpek(spek.id, 'tinggiMin', e.target.value)}
                          placeholder="30" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#185325]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Tinggi Maks (cm) <span className="lowercase font-normal text-gray-400">*opsional</span></label>
                        <input 
                          type="number" value={spek.tinggiMax} onChange={e => handleChangeSpek(spek.id, 'tinggiMax', e.target.value)}
                          placeholder="60" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#185325]"
                        />
                      </div>
                    </div>

                    {/* Input Harga */}
                    <div className="flex-1 w-full relative">
                      <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Harga Per Batang</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          <HiOutlineCurrencyDollar className="w-5 h-5" />
                        </div>
                        <input 
                          type="number" required value={spek.harga} onChange={e => handleChangeSpek(spek.id, 'harga', e.target.value)}
                          placeholder="2800" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-[#185325] focus:outline-none focus:border-[#185325]"
                        />
                      </div>
                    </div>

                    {/* Hapus Baris */}
                    <button 
                      type="button" onClick={() => handleRemoveSpek(spek.id)}
                      className="p-2.5 mt-5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      title="Hapus Spesifikasi"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm">
              Batal
            </button>
            <button type="submit" className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#185325] to-[#227a36] text-white font-bold transition-transform active:scale-95 shadow-md">
              Simpan Data Bibit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBibit;