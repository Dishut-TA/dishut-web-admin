import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineCurrencyDollar } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { 
  getBibitsAPI,
  createSeedSpecificationAPI,
  type BibitResponseData 
} from '@/services/bibit.service';

const CreateBibit: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); 
  const [bibitList, setBibitList] = useState<BibitResponseData[]>([]);
  const [selectedBibitId, setSelectedBibitId] = useState<string>('');
  const [kategori, setKategori] = useState('');
  const [tinggiBibit, setTinggiBibit] = useState('30-60 cm');
  const [stokAwal, setStokAwal] = useState('');
  const [harga, setHarga] = useState('');

  useEffect(() => {
    const fetchMasterBibit = async () => {
      try {
        const res = await getBibitsAPI(1); 
        setBibitList(res.payload);
        
        if (res.payload.length > 0) {
          const firstBibit = res.payload[0];
          setSelectedBibitId(firstBibit.id.toString());
          setKategori(firstBibit.kategori);
        }
      } catch (error) {
        toast.error("Gagal memuat data master bibit.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchMasterBibit();
  }, []);

  const getTinggiOptions = (kat: string) => {
    if (kat.includes('Buah') || kat.includes('MPTS')) {
      return ['70-100 cm', '> 100 cm'];
    }
    return ['30-60 cm', '61-100 cm', '> 100 cm'];
  };

  const handleBibitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idStr = e.target.value;
    setSelectedBibitId(idStr);
    
    const bibitTerpilih = bibitList.find(b => b.id.toString() === idStr);
    if (bibitTerpilih) {
      const kat = bibitTerpilih.kategori;
      setKategori(kat);
      
      const validOptions = getTinggiOptions(kat);
      if (!validOptions.includes(tinggiBibit)) {
        setTinggiBibit(validOptions[0]); 
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBibitId || !harga || !stokAwal) {
      toast.error('Pastikan semua form telah diisi.');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Menyimpan spesifikasi varian bibit...');

    try {
      let min_height = 0;
      let max_height = 0;
      if (tinggiBibit === '30-60 cm') { min_height = 30; max_height = 60; }
      else if (tinggiBibit === '61-100 cm') { min_height = 61; max_height = 100; }
      else if (tinggiBibit === '70-100 cm') { min_height = 70; max_height = 100; }
      else if (tinggiBibit === '> 100 cm') { min_height = 101; max_height = 0; }

      await createSeedSpecificationAPI({
        seed_id: Number(selectedBibitId),
        min_height: min_height, 
        max_height: max_height, 
        stock: Number(stokAwal),
        price: Number(harga)
      });

      toast.success('Spesifikasi bibit berhasil ditambahkan ke inventaris!', { id: loadingToast });
      navigate(-1);
    } catch (error: any) {
      toast.error(error.message, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="w-full text-center py-20 text-gray-500 font-bold animate-pulse">Memuat referensi bibit...</div>;
  }

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
          <h1 className="text-2xl font-bold text-gray-800">
            Tambah Spesifikasi Varian Bibit
          </h1>
          <p className="text-sm text-gray-500">
            Pilih master bibit dan definisikan spesifikasi ukuran, stok awal, serta harganya.
          </p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden relative">
        <form onSubmit={handleSubmit}>
          
          <div className="p-8 space-y-8">
            
            <div className="bg-greenAdmin p-6 rounded-2xl space-y-6">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Referensi Master Bibit</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Nama Bibit <span className="text-red-500">*</span></label>
                  <select 
                    required
                    value={selectedBibitId} 
                    onChange={handleBibitChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm transition-all cursor-pointer font-bold"
                  >
                    {bibitList.map(bibit => (
                      <option key={bibit.id} value={bibit.id}>
                        {bibit.nama} {bibit.deskripsi ? `(${bibit.deskripsi})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kategori (Auto-fill)</label>
                  <input 
                    disabled
                    type="text" 
                    value={kategori}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* INPUT SPESIFIKASI */}
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-[#185325] uppercase tracking-wider">Manajemen Ukuran, Harga & Stok</h3>
                <p className="text-xs text-gray-500 mt-1">Satu varian ukuran (tinggi bibit) merepresentasikan satu SKU / varian unik.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="w-full">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tinggi Bibit <span className="text-red-500">*</span></label>
                  <select 
                    value={tinggiBibit} onChange={e => setTinggiBibit(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-[#185325] focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer"
                  >
                    {getTinggiOptions(kategori).map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Stok Tersedia <span className="text-red-500">*</span></label>
                  <input 
                    type="number" required value={stokAwal} onChange={e => setStokAwal(e.target.value)}
                    placeholder="Contoh: 1000" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all"
                  />
                </div>

                <div className="w-full relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Harga Per Batang <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      <HiOutlineCurrencyDollar className="w-5 h-5" />
                    </div>
                    <input 
                      type="number" required value={harga} onChange={e => setHarga(e.target.value)}
                      placeholder="15000" className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-[#185325] focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all"
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
              ) : 'Simpan Spesifikasi Bibit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBibit;