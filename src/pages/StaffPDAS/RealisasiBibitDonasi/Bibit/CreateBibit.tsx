import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineCurrencyDollar } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { 
  createBibitAPI, 
  updateBibitAPI,
  createSeedSpecificationAPI,
  getBibitByIdAPI,
  getSeedSpecificationsAPI,
  type BibitPayload 
} from '@/services/bibit.service';

const CreateBibit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false); 
  const [kodeBibit, setKodeBibit] = useState(''); 
  const [namaBibit, setNamaBibit] = useState('');
  const [kategori, setKategori] = useState('Tanaman Kehutanan');
  const [sertifikasi, setSertifikasi] = useState('');
  const [tinggiBibit, setTinggiBibit] = useState('30–60 cm');
  const [stokAwal, setStokAwal] = useState('');
  const [harga, setHarga] = useState('');

  useEffect(() => {
    if (id) {
      fetchDataForEdit();
    }
  }, [id]);

  const fetchDataForEdit = async () => {
    setIsFetching(true);
    try {
      const [bibitRes, specsRes] = await Promise.all([
        getBibitByIdAPI(id as string),
        getSeedSpecificationsAPI()
      ]);

      const bibit = bibitRes.payload;
      setKodeBibit(bibit.kode);
      setNamaBibit(bibit.nama);
      setKategori(bibit.kategori);
      setSertifikasi(bibit.deskripsi); 

      const relatedSpecs = specsRes.payload.filter((s: any) => s.seed_id === bibit.id);
      if (relatedSpecs.length > 0) {
        const spec = relatedSpecs[0];
        setHarga(spec.price);
        setStokAwal(spec.stock.toString());
        
        if (spec.max_height === 0 || spec.min_height > 100) {
          setTinggiBibit('> 100 cm');
        } else {
          setTinggiBibit(`${spec.min_height}–${spec.max_height} cm`);
        }
      }
    } catch (error) {
      toast.error("Gagal memuat data bibit.");
    } finally {
      setIsFetching(false);
    }
  };

  const getTinggiOptions = (kat: string) => {
    if (kat === 'MPTS / Buah') {
      return ['70-100 cm', '> 100 cm'];
    }
    return ['30-60 cm', '61-100 cm', '> 100 cm'];
  };

  const handleKategoriChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newKategori = e.target.value;
    setKategori(newKategori);
    
    const validOptions = getTinggiOptions(newKategori);
    if (!validOptions.includes(tinggiBibit)) {
      setTinggiBibit(validOptions[0]); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id && (!harga || !stokAwal)) {
      toast.error('Pastikan stok awal dan harga bibit telah diisi.');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading(id ? 'Memperbarui data master bibit...' : 'Menyimpan data master bibit...');

    try {
      const bibitPayload: BibitPayload = {
        kode: id ? kodeBibit : `BBT-${Math.floor(1000 + Math.random() * 9000)}`, 
        nama: namaBibit,
        jenis: "Kayu",
        kategori: kategori,
        deskripsi: sertifikasi || `Master data bibit ${namaBibit}`,
        status: "aktif"
      };

      if (id) {
        await updateBibitAPI(id, bibitPayload);
        toast.success('Master Data Bibit berhasil diperbarui!', { id: loadingToast });
        navigate(-1);
      } else {
        let min_height = 0;
        let max_height = 0;
        if (tinggiBibit === '30-60 cm') { min_height = 30; max_height = 60; }
        else if (tinggiBibit === '61-100 cm') { min_height = 61; max_height = 100; }
        else if (tinggiBibit === '70-100 cm') { min_height = 70; max_height = 100; }
        else if (tinggiBibit === '> 100 cm') { min_height = 101; max_height = 0; }

        const responseBibit = await createBibitAPI(bibitPayload);
        const newBibitId = responseBibit?.payload?.id || responseBibit?.data?.id || responseBibit?.id;

        if (!newBibitId) throw new Error('Gagal mendapatkan ID Bibit dari server.');

        toast.loading('Menyimpan stok dan harga...', { id: loadingToast });

        await createSeedSpecificationAPI({
          seed_id: newBibitId,
          min_height: min_height, 
          max_height: max_height, 
          stock: Number(stokAwal),
          price: Number(harga)
        });

        toast.success('Master Data Bibit beserta harganya berhasil disimpan!', { id: loadingToast });
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(error.message, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="w-full text-center py-20 text-gray-500 font-bold">Memuat data bibit...</div>;
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
            {id ? 'Edit Master Bibit' : 'Tambah Master Bibit Baru'}
          </h1>
          <p className="text-sm text-gray-500">
            {id ? 'Perbarui informasi dasar master bibit.' : 'Definisikan informasi dasar, ukuran, stok, dan harga per unit bibit.'}
          </p>
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
                    value={kategori} onChange={handleKategoriChange}
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

            <div className={`bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-6 ${id ? 'opacity-60 grayscale-30%' : ''}`}>
              <div>
                <h3 className="text-sm font-bold text-[#185325] uppercase tracking-wider">Manajemen Ukuran, Harga & Stok</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {id ? '* Spesifikasi tinggi, stok dan harga tidak dapat diubah setelah varian terbuat.' : 'Satu varian ukuran (tinggi bibit) merepresentasikan satu SKU/Kode unik.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="w-full">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tinggi Bibit {!id && <span className="text-red-500">*</span>}</label>
                  <select 
                    disabled={!!id} 
                    value={tinggiBibit} onChange={e => setTinggiBibit(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-[#185325] focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    {getTinggiOptions(kategori).map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Stok Awal (Batang) {!id && <span className="text-red-500">*</span>}</label>
                  <input 
                    disabled={!!id} // Disabled if Edit
                    type="number" required={!id} value={stokAwal} onChange={e => setStokAwal(e.target.value)}
                    placeholder="Contoh: 1000" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="w-full relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Harga Per Batang {!id && <span className="text-red-500">*</span>}</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      <HiOutlineCurrencyDollar className="w-5 h-5" />
                    </div>
                    <input 
                      disabled={!!id} // Disabled if Edit
                      type="number" required={!id} value={harga} onChange={e => setHarga(e.target.value)}
                      placeholder="15000" className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-[#185325] focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
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
              ) : (id ? 'Perbarui Data Master' : 'Simpan Data Bibit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBibit;