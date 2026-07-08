import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HiOutlineChevronLeft, 
  HiOutlineMapPin, 
  HiOutlineTrash, 
  HiOutlinePlus,
  HiOutlineCloud
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

interface TitikPengamatan {
  id: number;
  koordinat: string;
  hidup: number;
  mati: number;
  rusak: number;
  tinggi: string;
  catatan: string;
}

const FormMonitoringPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
//   const { id } = useParams();
  
  const isPerbaikanMode = new URLSearchParams(location.search).get('mode') === 'perbaikan';

  const [titikList, setTitikList] = useState<TitikPengamatan[]>([
    { id: 1, koordinat: '', hidup: 0, mati: 0, rusak: 0, tinggi: '', catatan: '' }
  ]);
  const [kesimpulan, setKesimpulan] = useState('');
  const [kendala, setKendala] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState<number | null>(null);

  const handleAddTitik = () => {
    setTitikList([...titikList, { 
      id: Date.now(), koordinat: '', hidup: 0, mati: 0, rusak: 0, tinggi: '', catatan: '' 
    }]);
  };

  const handleRemoveTitik = (idToRemove: number) => {
    if (titikList.length === 1) {
      toast.error('Minimal harus ada 1 titik pengamatan.');
      return;
    }
    setTitikList(titikList.filter(t => t.id !== idToRemove));
  };

  const handleChangeTitik = (id: number, field: keyof TitikPengamatan, value: any) => {
    setTitikList(titikList.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleAdjustNumber = (id: number, field: 'hidup'|'mati'|'rusak', amount: number) => {
    setTitikList(titikList.map(t => {
      if (t.id === id) {
        const newValue = Math.max(0, t[field] + amount); // Tidak boleh minus
        return { ...t, [field]: newValue };
      }
      return t;
    }));
  };

  const handleGetLocation = (id: number) => {
    if (!("geolocation" in navigator)) {
      toast.error('Browser tidak mendukung fitur GPS.');
      return;
    }
    setIsGettingLocation(id);
    const loadingToast = toast.loading('Mencari titik koordinat...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        handleChangeTitik(id, 'koordinat', `${lat}, ${lng}`);
        toast.success('Titik koordinat didapatkan!', { id: loadingToast });
        setIsGettingLocation(null);
      },
      () => {
        toast.error('Gagal mendapatkan lokasi. Pastikan izin GPS aktif.', { id: loadingToast });
        setIsGettingLocation(null);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isPerbaikanMode ? 'Laporan perbaikan berhasil dikirim!' : 'Laporan monitoring berkala berhasil dikirim!');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#185325] transition-colors self-start">
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
        
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          {isPerbaikanMode ? 'Lapor Perbaikan: ' : 'Input Data Monitoring: '} 
          <span className={isPerbaikanMode ? 'text-red-600' : 'text-[#185325]'}>
            Penghijauan Jalan Tol CSR
          </span>
        </h1>

        {isPerbaikanMode && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">
            <h3 className="text-sm font-bold text-red-800 mb-1">Instruksi Perbaikan:</h3>
            <p className="text-sm text-red-700">Segera lakukan penyulaman bibit mati dan intensifkan penyiraman.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-[#f4f7f9] border border-[#d6e0e6] rounded-2xl p-4 md:p-6">
            <h3 className="text-[#2b5a7a] font-bold mb-4">Daftar Titik Pengamatan</h3>
            
            <div className="space-y-6">
              {titikList.map((titik, index) => (
                <div key={titik.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative">
                  <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                    <span className="font-bold text-gray-800">Titik #{index + 1}</span>
                    <button 
                      type="button"
                      onClick={() => handleRemoveTitik(titik.id)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <HiOutlineTrash className="w-3.5 h-3.5" /> Hapus
                    </button>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Koordinat GPS <span className="text-red-500">*</span></label>
                      <div className="flex gap-2">
                        <input 
                          required
                          type="text" 
                          value={titik.koordinat}
                          onChange={(e) => handleChangeTitik(titik.id, 'koordinat', e.target.value)}
                          placeholder="Contoh: -6.21, 106.82"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] bg-gray-50"
                        />
                        <button 
                          type="button"
                          onClick={() => handleGetLocation(titik.id)}
                          disabled={isGettingLocation === titik.id}
                          className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 text-xs font-bold rounded-xl transition-colors shrink-0 disabled:opacity-50"
                        >
                          <HiOutlineMapPin className="w-4 h-4" /> Ambil GPS
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['hidup', 'mati', 'rusak'].map((status) => (
                        <div key={status}>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5 capitalize">{status}</label>
                          <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                            <button type="button" onClick={() => handleAdjustNumber(titik.id, status as any, -1)} className="px-3 py-2 bg-gray-50 hover:bg-gray-200 text-gray-600 font-bold border-r border-gray-300 transition-colors">-</button>
                            <input 
                              type="number" 
                              value={titik[status as keyof TitikPengamatan]}
                              onChange={(e) => handleChangeTitik(titik.id, status as keyof TitikPengamatan, parseInt(e.target.value) || 0)}
                              className="w-full py-2 text-center text-sm font-bold text-gray-800 outline-none"
                            />
                            <button type="button" onClick={() => handleAdjustNumber(titik.id, status as any, 1)} className="px-3 py-2 bg-gray-50 hover:bg-gray-200 text-gray-600 font-bold border-l border-gray-300 transition-colors">+</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">Rata-rata Tinggi (cm)</label>
                        <input 
                          type="text" 
                          value={titik.tinggi}
                          onChange={(e) => handleChangeTitik(titik.id, 'tinggi', e.target.value)}
                          placeholder="Cth: 150"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">Upload Foto Lokasi <span className="text-red-500">*</span></label>
                        <div className="relative w-full">
                          <input type="file" id={`foto-${titik.id}`} className="hidden" accept="image/*" />
                          <label 
                            htmlFor={`foto-${titik.id}`} 
                            className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            <span>Pilih foto...</span>
                            <HiOutlineCloud className="w-5 h-5 text-[#185325]" />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Catatan Kondisi Titik</label>
                      <input 
                        type="text" 
                        value={titik.catatan}
                        onChange={(e) => handleChangeTitik(titik.id, 'catatan', e.target.value)}
                        placeholder="Tumbuh subur, hama ulat, dll..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325]"
                      />
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <button 
              type="button" 
              onClick={handleAddTitik}
              className="w-full mt-6 py-3.5 border-2 border-dashed border-[#8eb5ce] bg-white hover:bg-[#eaf1f5] text-[#2b5a7a] text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <HiOutlinePlus className="w-5 h-5" /> Tambah Titik Pengamatan
            </button>
          </div>

          <div className="space-y-6 pt-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Kondisi Tanaman Secara Umum (Kesimpulan) <span className="text-red-500">*</span>
              </label>
              <textarea 
                required
                value={kesimpulan}
                onChange={(e) => setKesimpulan(e.target.value)}
                placeholder="Cth: Secara keseluruhan tumbuh baik..."
                className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Kendala Lapangan Secara Keseluruhan
              </label>
              <input 
                type="text"
                value={kendala}
                onChange={(e) => setKendala(e.target.value)}
                placeholder="Hama, cuaca ekstrem, dll..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325]"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button 
              type="submit"
              className={`w-full md:w-auto px-10 py-3.5 text-white cursor-pointer text-sm font-bold rounded-xl transition-colors shadow-sm ${
                isPerbaikanMode ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-tertiary'
              }`}
            >
              {isPerbaikanMode ? 'Kirim Laporan Perbaikan' : 'Kirim Data Monitoring Berkala'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FormMonitoringPage;