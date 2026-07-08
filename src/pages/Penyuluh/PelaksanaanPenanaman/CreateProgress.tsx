import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineMapPin, HiOutlineCloud, HiCheckCircle, HiPaperAirplane } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const InputProgresPage: React.FC = () => {
  const navigate = useNavigate();
//   const { id } = useParams();

  const [formData, setFormData] = useState({
    tanggal: '',
    totalBibit: '',
    koordinat: '',
    kondisi: '',
    kendala: ''
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);

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

  const handleKirimLaporan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tanggal || !formData.totalBibit || !formData.koordinat || !formData.kondisi) {
      toast.error('Mohon lengkapi seluruh kolom wajib (*)');
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
    <div className="flex flex-col gap-6 w-full mx-auto pb-12">
      
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#185325] transition-colors self-start">
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

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
        <form onSubmit={handleKirimLaporan} className="space-y-6">
          
          {/* Target Lokasi Tanam (Map Placeholder) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Target Lokasi Tanam</label>
            <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden relative border border-gray-300">
              {/* Dummy Image for Map */}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] text-gray-700 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Total Bibit Ditanam (Hari Ini) <span className="text-red-500">*</span></label>
              <input 
                type="number" 
                value={formData.totalBibit}
                onChange={(e) => setFormData({...formData, totalBibit: e.target.value})}
                placeholder="Contoh: 500"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Koordinat Aktual <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={formData.koordinat}
                  onChange={(e) => setFormData({...formData, koordinat: e.target.value})}
                  placeholder="Koordinat"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] bg-gray-50"
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
                placeholder="Cuaca, partisipasi, dll"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Kendala Lapangan</label>
              <input 
                type="text" 
                value={formData.kendala}
                onChange={(e) => setFormData({...formData, kendala: e.target.value})}
                placeholder="Kendala yang dihadapi"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Upload Foto Dokumentasi <span className="text-red-500">*</span></label>
              <div className="relative w-full">
                <input type="file" id="foto-dokumentasi" className="hidden" accept="image/*" />
                <label 
                  htmlFor="foto-dokumentasi" 
                  className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span>Pilih foto kegiatan...</span>
                  <HiOutlineCloud className="w-5 h-5 text-[#185325]" />
                </label>
              </div>
            </div>
          </div>

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
    </div>
  );
};

export default InputProgresPage;