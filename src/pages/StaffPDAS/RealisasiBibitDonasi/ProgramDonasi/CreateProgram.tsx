import React, { useState, useRef } from 'react';
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

const BIBIT_OPTIONS = [
  'Mahoni', 'Sengon', 'Trembesi', 'Mangrove', 'Pucuk Merah', 'Beringin'
];

// Interface untuk data bibit yang dipilih beserta spesifikasinya
interface BibitTerpilih {
  id: string;
  nama: string;
  tinggi: number | '';
  harga: number;
}

const CreateProgram: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [daftarBibit, setDaftarBibit] = useState<BibitTerpilih[]>([]);
  const [namaBibitBaru, setNamaBibitBaru] = useState('');

  // --- PLACEHOLDER LOGIKA HARGA ---
  // Nanti fungsi ini tinggal diubah sesuai dokumen spesifikasi harga yang Anda miliki
  const hitungHarga = (tinggi: number | '') => {
    if (tinggi === '' || tinggi <= 0) return 0;
    if (tinggi <= 50) return 15000;  // Contoh: <= 50cm = Rp 15.000
    if (tinggi <= 100) return 35000; // Contoh: 51-100cm = Rp 35.000
    return 75000;                    // Contoh: > 100cm = Rp 75.000
  };

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

  // Fungsi untuk toggle (centang) bibit bawaan
  const toggleBibitDefault = (namaBibit: string) => {
    const isExist = daftarBibit.some(b => b.nama === namaBibit);
    
    if (isExist) {
      setDaftarBibit(prev => prev.filter(b => b.nama !== namaBibit));
    } else {
      setDaftarBibit(prev => [
        ...prev, 
        { id: Date.now().toString() + namaBibit, nama: namaBibit, tinggi: '', harga: 0 }
      ]);
    }
  };

  // Fungsi untuk menambahkan bibit kustom baru
  const handleTambahBibitBaru = () => {
    if (!namaBibitBaru.trim()) {
      toast.error('Nama bibit baru tidak boleh kosong.');
      return;
    }
    
    const isExist = daftarBibit.some(b => b.nama.toLowerCase() === namaBibitBaru.toLowerCase());
    if (isExist) {
      toast.error('Bibit tersebut sudah ada di dalam daftar.');
      return;
    }

    setDaftarBibit(prev => [
      ...prev, 
      { id: Date.now().toString(), nama: namaBibitBaru, tinggi: '', harga: 0 }
    ]);
    setNamaBibitBaru(''); // Reset input field
    toast.success(`${namaBibitBaru} berhasil ditambahkan!`);
  };

  // Fungsi untuk update tinggi tanaman & merubah harga secara otomatis
  const handleUpdateTinggi = (id: string, tinggiStr: string) => {
    const tinggiVal = tinggiStr === '' ? '' : Number(tinggiStr);
    const hargaBaru = hitungHarga(tinggiVal);

    setDaftarBibit(prev => prev.map(b => 
      b.id === id ? { ...b, tinggi: tinggiVal, harga: hargaBaru } : b
    ));
  };

  const handleHapusBibit = (id: string) => {
    setDaftarBibit(prev => prev.filter(b => b.id !== id));
  };

  // Format angka ke mata uang Rupiah
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (daftarBibit.length === 0) {
      toast.error('Silakan pilih atau tambahkan minimal satu jenis bibit.');
      return;
    }

    // Validasi apakah ada bibit yang belum diisi tingginya
    const isTinggiKosong = daftarBibit.some(b => b.tinggi === '' || b.tinggi <= 0);
    if (isTinggiKosong) {
      toast.error('Mohon isi spesifikasi tinggi tanaman untuk semua bibit yang dipilih.');
      return;
    }

    console.log("Submitting...", { daftarBibit, selectedImage });
    
    toast.success('Program berhasil diajukan!');
    navigate(-1); 
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 pb-12 max-w-5xl">
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
            
            {/* --- UPLOAD FOTO AREA --- */}
            <div>
              <label className="block text-base font-bold text-slate-800 mb-3">
                Foto Program / Lokasi <span className="text-red-500">*</span>
              </label>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/png, image/jpeg, image/webp" 
                onChange={handleImageChange} 
              />
              {selectedImage ? (
                <ZoomableImagePreview 
                  src={selectedImage} 
                  onClear={clearImage}
                  onChangeClick={triggerFileInput} 
                />
              ) : (
                <div 
                  onClick={triggerFileInput}
                  className="relative flex flex-col items-center justify-center w-full h-56 md:h-72 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer hover:bg-emerald-50 hover:border-[#009262] transition-colors group overflow-hidden bg-slate-50"
                >
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

            {/* --- INFO DASAR AREA --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-800 mb-2">Nama Program <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Penanaman Hutan Lindung..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#009262]/20 focus:border-[#009262] transition-all shadow-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-800 mb-2">Pilih Lahan Kritis (Tervalidasi) <span className="text-red-500">*</span></label>
                <select 
                  required
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#009262]/20 focus:border-[#009262] transition-all cursor-pointer shadow-sm"
                  defaultValue=""
                >
                  <option value="" disabled>-- Pilih Area Lahan --</option>
                  <option value="blok1">Blok 1 Kertasari - 15.5 Ha (Proses Tanam)</option>
                  <option value="cisurupan">Blok Cisurupan - 8 Ha (Survei)</option>
                </select>
              </div>
            </div>

            {/* --- SELEKSI JENIS BIBIT AREA --- */}
            <div className="pt-4 border-t border-slate-100">
              <div className="mb-4">
                <label className="block text-base font-bold text-slate-800">1. Pilih / Tambah Jenis Bibit <span className="text-red-500">*</span></label>
                <p className="text-sm text-slate-500 mt-1">Pilih dari opsi yang ada, atau tambahkan jenis bibit baru jika tidak tersedia.</p>
              </div>
              
              {/* Opsi Bibit Default */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {BIBIT_OPTIONS.map((bibit) => {
                  const isChecked = daftarBibit.some(b => b.nama === bibit);
                  return (
                    <label 
                      key={bibit} 
                      className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${
                        isChecked ? 'border-[#009262] bg-emerald-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 border-2 border-slate-300 rounded text-[#009262] focus:ring-[#009262]/20 cursor-pointer"
                        checked={isChecked}
                        onChange={() => toggleBibitDefault(bibit)}
                      />
                      <span className={`ml-3 font-semibold text-sm ${isChecked ? 'text-[#009262]' : 'text-slate-700'}`}>{bibit}</span>
                    </label>
                  );
                })}
              </div>

              {/* Input Tambah Bibit Kustom */}
              <div className="flex flex-col md:flex-row gap-3">
                <input 
                  type="text" 
                  value={namaBibitBaru}
                  onChange={(e) => setNamaBibitBaru(e.target.value)}
                  placeholder="Ketik jenis bibit baru..."
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#009262] transition-all shadow-sm"
                />
                <button 
                  type="button"
                  onClick={handleTambahBibitBaru}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <HiOutlinePlus className="w-5 h-5" /> Tambah Bibit Baru
                </button>
              </div>
            </div>

            {/* --- SPESIFIKASI & HARGA AREA (Muncul jika ada bibit yang dipilih) --- */}
            {daftarBibit.length > 0 && (
              <div className="pt-6 border-t border-slate-100 animate-in fade-in zoom-in-95 duration-300">
                <div className="mb-4">
                  <label className="block text-base font-bold text-slate-800">2. Tentukan Spesifikasi Tinggi Tanaman</label>
                  <p className="text-sm text-slate-500 mt-1">Masukkan target tinggi (cm). Harga per satuan akan dihitung secara otomatis oleh sistem.</p>
                </div>

                <div className="space-y-4">
                  {daftarBibit.map((item, index) => (
                    <div key={item.id} className="flex flex-col md:flex-row items-center gap-4 bg-slate-50 p-4 border border-slate-200 rounded-2xl relative group">
                      
                      {/* Nomor & Nama */}
                      <div className="flex-1 w-full flex items-center gap-3">
                        <span className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 font-bold text-xs shrink-0">
                          {index + 1}
                        </span>
                        <div className="font-bold text-slate-800 text-base">{item.nama}</div>
                      </div>

                      {/* Input Tinggi */}
                      <div className="w-full md:w-48 relative">
                        <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Target Tinggi</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            min="1"
                            value={item.tinggi}
                            onChange={(e) => handleUpdateTinggi(item.id, e.target.value)}
                            placeholder="0"
                            className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-800 focus:outline-none focus:border-[#009262] transition-colors"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold pointer-events-none">cm</span>
                        </div>
                      </div>

                      {/* Display Harga Otomatis */}
                      <div className="w-full md:w-48 bg-white border border-slate-200 rounded-lg p-2.5 flex flex-col items-end shrink-0">
                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-0.5 flex items-center gap-1">
                          <HiOutlineCurrencyDollar className="w-3 h-3" /> Harga / Bibit
                        </label>
                        <span className={`text-sm font-black ${item.harga > 0 ? 'text-[#009262]' : 'text-slate-300'}`}>
                          {item.harga > 0 ? formatRupiah(item.harga) : 'Rp 0'}
                        </span>
                      </div>

                      {/* Tombol Hapus (Silang) */}
                      <button 
                        type="button"
                        onClick={() => handleHapusBibit(item.id)}
                        className="absolute md:relative right-2 top-2 md:right-auto md:top-auto p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Hapus Bibit"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>

                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 md:gap-4">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition-colors shadow-sm"
            >
              Batalkan
            </button>
            <button 
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#009262] hover:bg-[#007a52] text-white font-bold transition-all shadow-md active:scale-95"
            >
              Ajukan Program Sekarang
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default CreateProgram;