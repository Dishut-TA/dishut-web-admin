import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineChevronLeft, 
  HiOutlineMapPin, 
  HiCheckCircle, 
  HiPaperAirplane,
  HiOutlineCamera,
  HiOutlineTrash
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

// Interface untuk state foto multi-upload
interface FotoProgres {
  id: string;
  file: File;
  preview: string;
  keterangan: 'Sebelum' | 'Sesudah';
}

const InputProgresPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tanggal: '',
    totalBibit: '',
    koordinat: '',
    kondisi: '',
    kendala: ''
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  // State array untuk menyimpan banyak foto
  const [fotos, setFotos] = useState<FotoProgres[]>([]);

  const handleGetLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error('Browser perangkat Anda tidak mendukung fitur GPS.');
      return;
    }
    setIsGettingLocation(true);
    const loadingToast = toast.loading('Mencari titik koordinat...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        setFormData(prev => ({ ...prev, koordinat: `${lat}, ${lng}` }));
        toast.success('Titik koordinat berhasil didapatkan!', { id: loadingToast });
        setIsGettingLocation(false);
      },
      () => {
        toast.error('Gagal mendapatkan lokasi. Pastikan izin GPS aktif.', { id: loadingToast });
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Handler untuk mengunggah lebih dari 1 foto sekaligus
  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(7) + Date.now(),
        file: file,
        preview: URL.createObjectURL(file),
        keterangan: 'Sebelum' as const // Default keterangan
      }));
      
      setFotos(prev => [...prev, ...newFiles]);
    }
    // Reset nilai input file agar bisa memilih file yang sama lagi jika perlu
    e.target.value = ''; 
  };

  // Handler untuk mengubah keterangan (Sebelum/Sesudah)
  const handleChangeKeterangan = (id: string, value: 'Sebelum' | 'Sesudah') => {
    setFotos(prev => prev.map(foto => 
      foto.id === id ? { ...foto, keterangan: value } : foto
    ));
  };

  // Handler untuk menghapus foto dari daftar
  const handleRemoveFoto = (id: string) => {
    setFotos(prev => prev.filter(foto => foto.id !== id));
  };

  const handleKirimLaporan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tanggal || !formData.totalBibit || !formData.koordinat || !formData.kondisi) {
      toast.error('Mohon lengkapi seluruh kolom wajib (*)');
      return;
    }
    if (fotos.length === 0) {
      toast.error('Mohon unggah minimal 1 foto dokumentasi kegiatan.');
      return;
    }
    toast.success('Laporan progres berhasil dikirim!');
    navigate(-1);
  };

  const handleTandaiSelesai = () => {
    toast.success('Program penanaman telah ditandai selesai.');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 max-w-5xl">
      
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#185325] transition-colors self-start">
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

      {/* CARD 1: FORM INPUT PROGRES */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
        <div className="border-b border-gray-100 pb-5 mb-8">
          <h1 className="text-xl font-bold text-gray-800">
            Input Progres: <span className="text-[#185325]">Agroforestri Mandiri</span>
          </h1>
        </div>

        {/* Info Target Penanaman */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
          <h3 className="text-sm font-bold text-blue-800 mb-2">Target Penanaman (Jenis & Jumlah Bibit):</h3>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1 ml-1">
            <li>Kopi - 300 bibit</li>
            <li>Alpukat - 200 bibit</li>
          </ul>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleKirimLaporan} className="space-y-8">
          
          {/* DOKUMENTASI FOTO MULTIPLE UPLOAD */}
          <div>
            <div className="mb-4">
              <h3 className="block text-base font-bold text-gray-800">Dokumentasi Foto Lapangan <span className="text-red-500">*</span></h3>
              <p className="text-sm text-gray-500 mt-1">Unggah foto dokumentasi. Anda dapat mengunggah beberapa foto sekaligus dan melabeli kondisinya (Sebelum/Sesudah).</p>
            </div>
            
            {/* Area Dropzone Utama */}
            <div className="relative w-full mb-6">
              <input 
                type="file" 
                multiple
                id="foto-upload" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFotoChange}
              />
              <label 
                htmlFor="foto-upload" 
                className="flex flex-col items-center justify-center w-full py-8 bg-[#EEF1EB]/40 border-2 border-dashed border-[#185325]/30 rounded-2xl cursor-pointer hover:bg-[#EEF1EB] hover:border-[#185325] transition-all"
              >
                <div className="p-3 bg-white shadow-sm text-[#185325] rounded-full mb-3">
                  <HiOutlineCamera className="w-8 h-8" />
                </div>
                <span className="text-sm font-bold text-gray-800">Klik untuk memilih foto</span>
                <span className="text-xs text-gray-500 mt-1 font-medium">Bisa memilih lebih dari satu foto sekaligus</span>
              </label>
            </div>

            {/* Grid Preview Foto yang Diunggah */}
            {fotos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {fotos.map((foto) => (
                  <div key={foto.id} className="border border-gray-200 rounded-2xl p-3 bg-gray-50 relative group">
                    {/* Tombol Hapus */}
                    <button 
                      type="button"
                      onClick={() => handleRemoveFoto(foto.id)}
                      className="absolute top-4 right-4 p-1.5 bg-white/90 backdrop-blur text-gray-500 hover:text-red-500 rounded-lg shadow-sm transition-colors opacity-0 group-hover:opacity-100 z-10"
                      title="Hapus Foto"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                    
                    {/* Preview Gambar */}
                    <div className="w-full h-32 md:h-40 rounded-xl overflow-hidden mb-3 border border-gray-200">
                      <img src={foto.preview} alt="Preview Lapangan" className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Select Status Sebelum/Sesudah */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Keterangan Foto
                      </label>
                      <select
                        value={foto.keterangan}
                        onChange={(e) => handleChangeKeterangan(foto.id, e.target.value as 'Sebelum' | 'Sesudah')}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325]"
                      >
                        <option value="Sebelum">Keadaan Sebelum</option>
                        <option value="Sesudah">Keadaan Sesudah</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* Form Isian Lainnya */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Target Lokasi Tanam</label>
            <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden relative border border-gray-300">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" alt="Map Area" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <HiOutlineMapPin className="w-10 h-10 text-red-600 drop-shadow-md" />
                <span className="bg-white/90 text-xs font-bold px-3 py-1 rounded-full mt-2 shadow-sm text-gray-800">Poligon Target Lokasi</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tanggal Pelaksanaan <span className="text-red-500">*</span></label>
              <input 
                type="date" 
                value={formData.tanggal}
                onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] text-gray-700 bg-white shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Total Bibit Ditanam (Hari Ini) <span className="text-red-500">*</span></label>
              <input 
                type="number" 
                value={formData.totalBibit}
                onChange={(e) => setFormData({...formData, totalBibit: e.target.value})}
                placeholder="Contoh: 500"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Koordinat Aktual <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={formData.koordinat}
                  onChange={(e) => setFormData({...formData, koordinat: e.target.value})}
                  placeholder="Koordinat GPS..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] bg-gray-50 shadow-sm"
                />
                <button 
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                  className="flex items-center justify-center gap-1.5 px-4 py-3 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 text-xs font-bold rounded-xl transition-colors shrink-0 disabled:opacity-50"
                >
                  <HiOutlineMapPin className="w-4 h-4" /> Ambil GPS
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Kondisi Lapangan <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={formData.kondisi}
                onChange={(e) => setFormData({...formData, kondisi: e.target.value})}
                placeholder="Contoh: Cuaca cerah, warga antusias..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] shadow-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Kendala Lapangan</label>
              <input 
                type="text" 
                value={formData.kendala}
                onChange={(e) => setFormData({...formData, kendala: e.target.value})}
                placeholder="Kendala yang dihadapi (kosongkan jika tidak ada)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] shadow-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 mt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button 
              type="button"
              onClick={handleTandaiSelesai}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00A859] hover:bg-[#008f4c] text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
            >
              <HiCheckCircle className="w-5 h-5" /> Tandai Penanaman Selesai
            </button>
            
            <button 
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
            >
              <HiPaperAirplane className="w-4 h-4 -rotate-45 mb-0.5" /> Kirim Laporan Progres
            </button>
          </div>
        </form>
      </div>

      {/* CARD 2: RIWAYAT MONITORING (Timeline) */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
        <h2 className="text-xl font-bold text-gray-800 mb-8">Riwayat Monitoring</h2>

        <div className="relative py-4 overflow-hidden">
          {/* Garis Vertikal Tengah */}
          <div className="absolute left-5.25 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#C5E1A5] md:-translate-x-1/2"></div>

          <div className="space-y-8">
            
            {/* Item 1: Kanan pada Desktop */}
            <div className="relative flex flex-col md:flex-row items-center w-full">
              <div className="hidden md:block md:w-1/2 md:pr-10"></div>
              
              <div className="absolute left-3.5 md:left-1/2 w-4 h-4 bg-white border-2 border-[#185325] rounded-full transform md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 z-10"></div>
              
              <div className="w-full md:w-1/2 pl-14 md:pl-10">
                <div className="bg-[#EEF1EB] rounded-xl p-5 shadow-sm border border-[#DCECE0]">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800 text-sm md:text-base">Update Kondisi Tanaman</h4>
                    <span className="text-[10px] md:text-xs text-gray-500 ml-4 font-medium whitespace-nowrap">Hari ini, 09:30</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Kondisi tanaman sehat, namun butuh penambalan di beberapa spot karena hama.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 2: Kiri pada Desktop */}
            <div className="relative flex flex-col md:flex-row items-center w-full">
              <div className="w-full md:w-1/2 pl-14 md:pl-0 md:pr-10">
                <div className="bg-[#EEF1EB] rounded-xl p-5 shadow-sm border border-[#DCECE0]">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800 text-sm md:text-base">Pengecekan Rutin</h4>
                    <span className="text-[10px] md:text-xs text-gray-500 ml-4 font-medium whitespace-nowrap">2 hari yang lalu</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Tidak ada kendala berarti. Cuaca mendukung proses penyiraman alami.
                  </p>
                </div>
              </div>

              <div className="absolute left-3.5 md:left-1/2 w-4 h-4 bg-white border-2 border-[#185325] rounded-full transform md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 z-10"></div>
              
              <div className="hidden md:block md:w-1/2 pl-10"></div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default InputProgresPage;