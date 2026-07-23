import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineCurrencyDollar } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { 
  createBibitAPI, 
  createSeedSpecificationAPI, 
  type BibitPayload 
} from '@/services/bibit.service';

const CreateBibit: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [namaBibit, setNamaBibit] = useState('');
  const [kategori, setKategori] = useState('Tanaman Kehutanan');
  const [sertifikasi, setSertifikasi] = useState('');
  
  // State Tunggal (Fixed)
  const [stokAwal, setStokAwal] = useState('');
  const [harga, setHarga] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!harga || !stokAwal) {
      toast.error('Pastikan stok awal dan harga bibit telah diisi.');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Menyimpan data master bibit...');

    try {
      const bibitPayload: BibitPayload = {
        kode: `S-${Math.floor(Math.random() * 10000)}`, 
        nama: namaBibit,
        jenis: "Kayu",
        kategori: kategori,
        deskripsi: sertifikasi || `Master data bibit ${namaBibit}`,
        status: "aktif"
      };

      const responseBibit = await createBibitAPI(bibitPayload);
      const newBibitId = responseBibit?.payload?.id || responseBibit?.data?.id || responseBibit?.id;

      if (!newBibitId) {
        throw new Error('Gagal mendapatkan ID Bibit dari server.');
      }

      toast.loading('Menyimpan stok dan harga...', { id: loadingToast });

      // Hanya membuat SATU spesifikasi (Harga & Stok Fixed)
      await createSeedSpecificationAPI({
        seed_id: newBibitId,
        min_height: 0, // Dikosongkan/0 karena instruksi fokus ke nominal tunggal tanpa rentang
        max_height: 0, 
        stock: Number(stokAwal),
        price: Number(harga)
      });

      toast.success('Master Data Bibit beserta harganya berhasil disimpan!', { id: loadingToast });
      navigate(-1);

    } catch (error: any) {
      toast.error(error.message, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm cursor-pointer"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tambah Master Bibit Baru</h1>
          <p className="text-sm text-gray-500">Definisikan informasi dasar, stok, dan harga per unit bibit.</p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden relative">
        <form onSubmit={handleSubmit}>
          
          <div className="p-8 space-y-8">
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

            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-[#185325] uppercase tracking-wider">Manajemen Harga & Stok</h3>
                <p className="text-xs text-gray-500 mt-1">Sesuai ketentuan, harga bersifat fixed (pasti) per 1 unit/batang bibit.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Stok Awal (Batang) <span className="text-red-500">*</span></label>
                  <input 
                    type="number" required value={stokAwal} onChange={e => setStokAwal(e.target.value)}
                    placeholder="Contoh: 1000" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all"
                  />
                </div>

                <div className="w-full relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Harga Per Batang (Rp) <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      <HiOutlineCurrencyDollar className="w-5 h-5" />
                    </div>
                    <input 
                      type="number" required value={harga} onChange={e => setHarga(e.target.value)}
                      placeholder="Contoh: 15000" className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-[#185325] focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
              Batal
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-8 py-3 rounded-xl bg-[#185325] hover:bg-[#123d1c] text-white font-bold transition-transform active:scale-95 shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Menyimpan...
                </>
              ) : 'Simpan Data Bibit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBibit;