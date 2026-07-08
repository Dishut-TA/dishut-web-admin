import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineCloud, HiOutlineMapPin } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const CreateValidasi: React.FC = () => {
  const navigate = useNavigate();
//   const { id } = useParams();

  const [formData, setFormData] = useState({
    kondisiLahan: '',
    kondisiVegetasi: '',
    kendalaLapangan: '',
    koordinat: '',
    geotagging: '',
    catatan: ''
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
        toast.error('Gagal mendapatkan lokasi. Pastikan izin GPS / Lokasi aktif.', { id: loadingToast });
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kondisiLahan || !formData.koordinat) {
      toast.error('Mohon lengkapi kolom yang wajib diisi (*)');
      return;
    }
    toast.success('Data validasi lapangan berhasil dikirim!');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#185325] transition-colors self-start"
      >
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 relative">
        <h1 className="text-xl font-bold text-gray-800 mb-8 border-b border-gray-100 pb-4">
          Input Data Validasi: <span className="text-[#185325]">Lahan Kritis Desa C</span>
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Kondisi Lahan <span className="text-red-500">*</span>
              </label>
              <textarea 
                value={formData.kondisiLahan}
                onChange={(e) => setFormData({...formData, kondisiLahan: e.target.value})}
                placeholder="Deskripsikan kondisi lahan saat ini..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] resize-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Kondisi Vegetasi
              </label>
              <textarea 
                value={formData.kondisiVegetasi}
                onChange={(e) => setFormData({...formData, kondisiVegetasi: e.target.value})}
                placeholder="Deskripsikan vegetasi yang ada..."
                className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] resize-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Kendala Lapangan
              </label>
              <textarea 
                value={formData.kendalaLapangan}
                onChange={(e) => setFormData({...formData, kendalaLapangan: e.target.value})}
                placeholder="Contoh: Akses jalan sulit, kekurangan air..."
                className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] resize-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Titik Koordinat GPS <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={formData.koordinat}
                  onChange={(e) => setFormData({...formData, koordinat: e.target.value})}
                  placeholder="-6.2000, 106.8166"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all bg-gray-50"
                />
                <button 
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#DCECE0] hover:bg-[#C8E0CD] text-[#185325] text-sm font-bold rounded-xl transition-colors shrink-0 disabled:opacity-50"
                >
                  <HiOutlineMapPin className="w-5 h-5" /> Ambil GPS
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Data Geotagging
              </label>
              <input 
                type="text" 
                value={formData.geotagging}
                onChange={(e) => setFormData({...formData, geotagging: e.target.value})}
                placeholder="Data polygon / lokasi spesifik"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Upload Foto Lokasi <span className="text-red-500">*</span>
              </label>
              <div className="relative w-full">
                <input type="file" id="foto-upload" className="hidden" accept="image/*" />
                <label 
                  htmlFor="foto-upload" 
                  className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span>Pilih foto lapangan...</span>
                  <HiOutlineCloud className="w-5 h-5 text-[#185325]" />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Catatan Hasil Peninjauan
              </label>
              <textarea 
                value={formData.catatan}
                onChange={(e) => setFormData({...formData, catatan: e.target.value})}
                placeholder="Kesimpulan akhir dari peninjauan lapangan..."
                className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] resize-none transition-all"
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-6 border-t border-gray-100 flex justify-end">
            <button 
              type="submit"
              className="w-full md:w-auto px-10 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
            >
              Kirim Data Validasi Lapangan
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateValidasi;