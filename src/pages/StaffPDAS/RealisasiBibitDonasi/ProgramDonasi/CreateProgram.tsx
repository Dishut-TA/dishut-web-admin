// File: src/pages/CreateProgram.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineArrowLeft, 
  HiOutlinePhoto,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineCurrencyDollar
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import ZoomableImagePreview from './components/ZoomableImagePreview';

// Import Services
import { getBibitsAPI, getSeedSpecificationsAPI } from '@/services/bibit.service';
import { createDonationProgramAPI, type DonationProgramPayload } from '@/services/program-donasi.service';

// Interface gabungan Bibit + Spesifikasi Harga
interface MergedBibitSpec {
  spec_id: number;
  bibit_nama: string;
  min_height: number;
  max_height: number;
  price: number;
}

const CreateProgram: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [namaProgram, setNamaProgram] = useState('');
  const [lokasiLahan, setLokasiLahan] = useState('');
  const [bibitOptions, setBibitOptions] = useState<MergedBibitSpec[]>([]);
  const [isFetchingBibit, setIsFetchingBibit] = useState(true);
  const [selectedSpecId, setSelectedSpecId] = useState('');
  const [daftarBibit, setDaftarBibit] = useState<MergedBibitSpec[]>([]);

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const [bibitRes, specRes] = await Promise.all([
          getBibitsAPI(),
          getSeedSpecificationsAPI()
        ]);

        const bibits = bibitRes.payload;
        const specs = specRes.payload;

        const mergedData: MergedBibitSpec[] = [];
        specs.forEach(spec => {
          const bibit = bibits.find(b => b.id === spec.seed_id);
          if (bibit) {
            mergedData.push({
              spec_id: spec.id,
              bibit_nama: bibit.nama,
              min_height: spec.min_height,
              max_height: spec.max_height,
              price: Number(spec.price)
            });
          }
        });

        setBibitOptions(mergedData);
      } catch (error) {
        toast.error('Gagal memuat daftar master bibit & harga.');
      } finally {
        setIsFetchingBibit(false);
      }
    };
    fetchMasterData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleTambahBibit = () => {
    if (!selectedSpecId) {
      toast.error('Pilih spesifikasi bibit dari dropdown terlebih dahulu.');
      return;
    }

    const bibitTarget = bibitOptions.find(b => b.spec_id.toString() === selectedSpecId);
    if (!bibitTarget) return;

    const isExist = daftarBibit.some(b => b.spec_id === bibitTarget.spec_id);
    if (isExist) {
      toast.error('Bibit dengan spesifikasi tersebut sudah ada di daftar.');
      return;
    }

    setDaftarBibit(prev => [...prev, bibitTarget]);
    setSelectedSpecId(''); 
    toast.success(`${bibitTarget.bibit_nama} ditambahkan ke daftar!`);
  };

  const handleHapusBibit = (spec_id: number) => {
    setDaftarBibit(prev => prev.filter(b => b.spec_id !== spec_id));
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (daftarBibit.length === 0) {
      toast.error('Silakan pilih minimal satu jenis bibit.');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Mengajukan program donasi...');

    try {
      // Backend saat ini hanya menerima 1 seed_specification_id
      // Kita kirim spec_id dari bibit pertama yang ada di daftar
      const payload: DonationProgramPayload = {
        analysis_result_id: null,
        kth_id: 1, 
        seed_specification_id: daftarBibit[0].spec_id, 
        name: namaProgram,
        location: lokasiLahan,
        total_seeds_collected: 0,
        total_seeds_realized: 0,
        status: "Active"
      };

      await createDonationProgramAPI(payload);

      toast.success('Program berhasil diajukan!', { id: loadingToast });
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
          className="p-2.5 text-[#009262] hover:bg-slate-50 hover:text-slate-900 transition-colors rounded-full"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Buat Program Baru</h1>
          <p className="text-sm text-slate-500 mt-1">Isi formulir di bawah ini untuk mengajukan program penanaman baru.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 md:p-8 space-y-8">
            <div>
              <label className="block text-base font-bold text-slate-800 mb-3">
                Foto Program / Lokasi <span className="text-red-500">*</span>
              </label>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
              {selectedImage ? (
                <ZoomableImagePreview src={selectedImage} onClear={clearImage} onChangeClick={triggerFileInput} />
              ) : (
                <div onClick={triggerFileInput} className="relative flex flex-col items-center justify-center w-full h-56 md:h-72 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer hover:bg-emerald-50 hover:border-[#009262] transition-colors group overflow-hidden bg-slate-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    <div className="p-4 bg-white shadow-sm border border-slate-100 text-[#009262] rounded-full mb-4 group-hover:scale-110 transition-transform">
                      <HiOutlinePhoto className="w-10 h-10" />
                    </div>
                    <p className="mb-2 text-base font-bold text-slate-700">Klik untuk mengunggah foto</p>
                    <p className="text-sm text-slate-500">Mendukung format PNG, JPG, atau WEBP (Maks. 2MB)</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-800 mb-2">Nama Program <span className="text-red-500">*</span></label>
                <input 
                  type="text" required value={namaProgram} onChange={e => setNamaProgram(e.target.value)}
                  placeholder="Contoh: Penanaman Hutan Lindung..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#009262]/20 focus:border-[#009262] transition-all shadow-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-800 mb-2">Pilih Lahan Kritis (Tervalidasi) <span className="text-red-500">*</span></label>
                <select 
                  required value={lokasiLahan} onChange={e => setLokasiLahan(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#009262]/20 focus:border-[#009262] transition-all cursor-pointer shadow-sm"
                >
                  <option value="" disabled>-- Pilih Area Lahan --</option>
                  <option value="Blok 1 Kertasari">Blok 1 Kertasari - 15.5 Ha (Proses Tanam)</option>
                  <option value="Blok Cisurupan">Blok Cisurupan - 8 Ha (Survei)</option>
                  <option value="Blue Water Tornado">Blue Water Tornado</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="mb-4">
                <label className="block text-base font-bold text-slate-800">1. Pilih Jenis Bibit dari Master Data <span className="text-red-500">*</span></label>
                <p className="text-sm text-slate-500 mt-1">Harga dan spesifikasi akan otomatis menyesuaikan dengan master data.</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3">
                <select 
                  value={selectedSpecId}
                  onChange={(e) => setSelectedSpecId(e.target.value)}
                  disabled={isFetchingBibit}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#009262]/20 focus:border-[#009262] transition-all shadow-sm cursor-pointer disabled:bg-slate-50 disabled:text-slate-400"
                >
                  <option value="">{isFetchingBibit ? 'Memuat data spesifikasi bibit...' : '-- Pilih Bibit & Spesifikasinya --'}</option>
                  {bibitOptions.map(spec => (
                    <option key={spec.spec_id} value={spec.spec_id}>
                      {spec.bibit_nama} (Tinggi: {spec.min_height}-{spec.max_height}cm) - {formatRupiah(spec.price)}
                    </option>
                  ))}
                </select>
                <button 
                  type="button"
                  onClick={handleTambahBibit}
                  disabled={isFetchingBibit || !selectedSpecId}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <HiOutlinePlus className="w-5 h-5" /> Tambah Bibit
                </button>
              </div>
            </div>

            {daftarBibit.length > 0 && (
              <div className="pt-6 border-t border-slate-100 animate-in fade-in zoom-in-95 duration-300">
                <div className="mb-4">
                  <label className="block text-base font-bold text-slate-800">2. Daftar Bibit Terpilih</label>
                </div>

                <div className="space-y-3">
                  {daftarBibit.map((item, index) => (
                    <div key={item.spec_id} className="flex items-center justify-between bg-slate-50 p-4 border border-slate-200 rounded-2xl">
                      
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 font-bold text-xs">
                          {index + 1}
                        </span>
                        <div>
                          <div className="font-bold text-slate-800">{item.bibit_nama}</div>
                          <div className="text-xs text-slate-500 mt-0.5">Spesifikasi Tinggi: {item.min_height}cm - {item.max_height}cm</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 justify-end">
                            <HiOutlineCurrencyDollar className="w-3 h-3" /> Harga Satuan
                          </div>
                          <div className="text-sm font-black text-[#009262]">{formatRupiah(item.price)}</div>
                        </div>

                        <button 
                          type="button"
                          onClick={() => handleHapusBibit(item.spec_id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          title="Hapus Bibit"
                        >
                          <HiOutlineTrash className="w-5 h-5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 md:gap-4">
            <button type="button" onClick={() => navigate(-1)} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition-colors shadow-sm">
              Batalkan
            </button>
            <button type="submit" disabled={isLoading} className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#009262] hover:bg-[#007a52] text-white font-bold transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isLoading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
              {isLoading ? 'Mengajukan...' : 'Ajukan Program Sekarang'}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default CreateProgram;