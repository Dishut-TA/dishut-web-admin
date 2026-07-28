import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineArrowLeft,
  HiOutlineInformationCircle,
  HiOutlineBookOpen,
  HiOutlineCamera,
  HiOutlineMapPin,
  HiOutlineArrowsUpDown,
  HiEllipsisVertical,
  HiArrowRight,
  HiOutlineCalendar,
  HiOutlineBookmark
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

// --- MOCK DATA ---
const DAFTAR_TANAMAN = [
  {
    id: 1,
    nama: 'Mangrove Rhizophora apiculata',
    kategori: 'Rhizophora',
    jumlah: '1 Batang',
    lat: '6.841234° S',
    long: '107.567890° E',
    waktu: '16 Jun 2026, 09:15',
    status: 'Tersimpan',
    foto: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    nama: 'Mangrove Avicennia marina',
    kategori: 'Avicennia',
    jumlah: '1 Batang',
    lat: '6.841567° S',
    long: '107.568234° E',
    waktu: '16 Jun 2026, 09:18',
    status: 'Tersimpan',
    foto: 'https://images.unsplash.com/photo-1517409259503-467ce424eb06?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    nama: 'Mangrove Sonneratia alba',
    kategori: 'Sonneratia',
    jumlah: '1 Batang',
    lat: '6.841890° S',
    long: '107.568678° E',
    waktu: '16 Jun 2026, 09:21',
    status: 'Tersimpan',
    foto: 'https://images.unsplash.com/photo-1542282811-943ef1a977c3?q=80&w=200&auto=format&fit=crop'
  }
];

const MulaiKegiatan: React.FC = () => {
  const navigate = useNavigate();
  
  // State form
  const [jenisTanaman, setJenisTanaman] = useState('');
  const [kondisiTanaman, setKondisiTanaman] = useState('');
  const [koordinat, setKoordinat] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleGetLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error('Browser Anda tidak mendukung GPS.');
      return;
    }
    setIsGettingLocation(true);
    const loading = toast.loading('Mencari titik lokasi...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setKoordinat(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`);
        toast.success('Lokasi berhasil didapatkan!', { id: loading });
        setIsGettingLocation(false);
      },
      () => {
        toast.error('Gagal mendapatkan lokasi. Pastikan GPS aktif.', { id: loading });
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSimpan = () => {
    toast.success('Data tanaman berhasil disimpan!');
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] pb-32">
      {/* HEADER UTAMA */}
      <div className="border-b border-gray-100">
        <div className="mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mulai Kegiatan</h1>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <HiOutlineArrowLeft className="w-4 h-4" strokeWidth={2} /> Kembali ke Daftar Pelaksanaan Kegiatan
          </button>
        </div>
      </div>

      <div className="mx-auto px-6 py-6 flex flex-col gap-6">
        
        {/* BANNER INFORMASI */}
        <div className="bg-[#f0f9f3] border border-[#DCECE0] rounded-xl p-4 flex items-start gap-3">
          <HiOutlineInformationCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 font-medium">
            Setiap tanaman wajib diinput dengan foto dan geotag (1 tanaman = 1 titik geotag). Pastikan lokasi sesuai dengan area rencana kegiatan.
          </p>
        </div>

        {/* KONTEN DUA KOLOM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* KOLOM KIRI: FORM INPUT */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            
            {/* Header Form */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Input Penanaman Tanaman</h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-500 text-emerald-600 text-xs font-bold rounded-lg hover:bg-emerald-50 transition-colors">
                <HiOutlineBookOpen className="w-4 h-4" /> Lihat Petunjuk
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-5">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-gray-700">Kemajuan Input</span>
                <span className="text-sm font-bold text-gray-900">0,6%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '0.6%' }}></div>
              </div>
              <p className="text-xs font-bold text-emerald-600">3 <span className="text-gray-400 font-medium">/ 500 tanaman</span></p>
            </div>

            <div className="px-6 pb-8">
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
                <h3 className="text-base font-bold text-gray-900 mb-5">Data Tanaman #4</h3>
                
                <div className="space-y-5">
                  {/* Jenis Tanaman */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Jenis Tanaman <span className="text-red-500">*</span></label>
                    <select 
                      value={jenisTanaman}
                      onChange={(e) => setJenisTanaman(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none"
                    >
                      <option value="" disabled>Pilih jenis tanaman</option>
                      <option value="Rhizophora">Mangrove Rhizophora apiculata</option>
                      <option value="Avicennia">Mangrove Avicennia marina</option>
                      <option value="Sonneratia">Mangrove Sonneratia alba</option>
                    </select>
                  </div>

                  {/* Kondisi Tanaman */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Kondisi Tanaman <span className="text-red-500">*</span></label>
                    <select 
                      value={kondisiTanaman}
                      onChange={(e) => setKondisiTanaman(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none"
                    >
                      <option value="" disabled>Pilih kondisi tanaman</option>
                      <option value="Sehat">Sehat</option>
                      <option value="Perlu Perawatan">Perlu Perawatan</option>
                      <option value="Mati/Rusak">Mati / Rusak</option>
                    </select>
                  </div>

                  {/* Foto & Map Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    {/* Foto Upload */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Foto Tanaman <span className="text-red-500">*</span></label>
                      <p className="text-[11px] text-gray-500 mb-2">Ambil foto tanaman dari jarak dekat (jelas).</p>
                      
                      <div className="w-full h-40 bg-white border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-emerald-400 transition-colors">
                        <HiOutlineCamera className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm font-bold text-gray-800">Ambil Foto</span>
                        <span className="text-[10px] text-gray-500 mt-1">atau klik untuk upload</span>
                        <span className="text-[10px] text-gray-400 mt-0.5">Format: JPG, JPEG, PNG<br/>Maks. 5MB</span>
                      </div>
                      <div className="flex items-start gap-1.5 mt-2 text-[10px] text-gray-500 font-medium">
                        <span className="text-yellow-500 shrink-0">💡</span>
                        <span>Pastikan foto jelas, tidak buram, dan menampilkan tanaman dengan baik.</span>
                      </div>
                    </div>

                    {/* Geotagging */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Lokasi / Geotag <span className="text-red-500">*</span></label>
                      <p className="text-[11px] text-gray-500 mb-2">Ambil titik lokasi tanaman.</p>
                      
                      <div className="w-full h-28 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-300 mb-2">
                        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <HiOutlineMapPin className="w-8 h-8 text-emerald-600 drop-shadow-md fill-emerald-100" />
                        </div>
                        {/* Map Controls Mockup */}
                        <div className="absolute right-2 top-2 flex flex-col gap-1">
                           <div className="w-6 h-6 bg-white rounded shadow flex items-center justify-center text-gray-600 text-sm font-bold cursor-pointer hover:bg-gray-50">+</div>
                           <div className="w-6 h-6 bg-white rounded shadow flex items-center justify-center text-gray-600 text-sm font-bold cursor-pointer hover:bg-gray-50">-</div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleGetLocation}
                        disabled={isGettingLocation}
                        className="w-full py-2 bg-white border border-emerald-500 text-emerald-600 text-sm font-bold rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        <HiOutlineMapPin className="w-4 h-4" /> {koordinat ? 'Perbarui Titik Lokasi' : 'Ambil Titik Lokasi'}
                      </button>
                      {koordinat && <p className="text-xs text-center text-emerald-700 mt-2 font-medium">{koordinat}</p>}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: LIST & SUMMARY */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Daftar Tanaman Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-gray-900">Daftar Tanaman (3)</h3>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors">
                  <HiOutlineArrowsUpDown className="w-4 h-4" /> Urutkan
                </button>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full cursor-pointer">Semua (3)</span>
                <span className="px-3 py-1 bg-white text-emerald-600 border border-emerald-200 text-xs font-semibold rounded-full cursor-pointer hover:bg-emerald-50">Rhizophora (1)</span>
                <span className="px-3 py-1 bg-white text-emerald-600 border border-emerald-200 text-xs font-semibold rounded-full cursor-pointer hover:bg-emerald-50">Avicennia (1)</span>
                <span className="px-3 py-1 bg-white text-emerald-600 border border-emerald-200 text-xs font-semibold rounded-full cursor-pointer hover:bg-emerald-50">Sonneratia (1)</span>
              </div>

              {/* List */}
              <div className="space-y-3 mb-4">
                {DAFTAR_TANAMAN.map((item, index) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-emerald-200 transition-colors relative">
                    <div className="w-6 h-6 rounded bg-[#f0f9f3] text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mr-4">
                        <h4 className="text-xs font-bold text-gray-900 leading-tight mb-1.5">{item.nama}</h4>
                        <button className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 rounded">
                          <HiEllipsisVertical className="w-5 h-5" />
                        </button>
                      </div>
                      <span className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded text-[10px] font-bold mb-2">
                        {item.kategori}
                      </span>
                      
                      <div className="flex gap-3">
                        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
                          <img src={item.foto} alt="Tanaman" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="text-[10px] text-gray-500 font-medium space-y-0.5">
                            <p>{item.jumlah}</p>
                            <p className="flex items-center gap-1"><span className="w-1 h-1 bg-emerald-500 rounded-full"></span> {item.status}</p>
                          </div>
                        </div>
                        <div className="text-[10px] text-gray-500 font-medium space-y-0.5 text-right flex flex-col items-end">
                            <p className="flex items-center gap-1"><HiOutlineMapPin className="w-3 h-3" /> {item.lat}</p>
                            <p className="flex items-center gap-1 pl-4">{item.long}</p>
                            <p className="flex items-center gap-1 text-gray-400 pt-0.5"><HiOutlineCalendar className="w-3 h-3" /> {item.waktu}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-2.5 bg-white border border-emerald-500 text-emerald-600 text-sm font-bold rounded-lg hover:bg-emerald-50 transition-colors">
                Lihat Semua Tanaman
              </button>
            </div>

            {/* Ringkasan Input Card */}
            <div className="bg-[#f8fbf9] rounded-2xl border border-blue-100 p-5">
              <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold">
                <HiOutlineBookOpen className="w-5 h-5" />
                <h3>Ringkasan Input</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-center divide-x divide-blue-100 mb-4">
                <div>
                  <p className="text-[10px] font-semibold text-gray-500 mb-1">Target</p>
                  <p className="text-lg font-bold text-gray-900 leading-none">500</p>
                  <p className="text-[10px] text-gray-400 mt-1">Tanaman</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-500 mb-1">Sudah Diinput</p>
                  <p className="text-lg font-bold text-gray-900 leading-none">3</p>
                  <p className="text-[10px] text-gray-400 mt-1">Tanaman</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-500 mb-1">Belum Diinput</p>
                  <p className="text-lg font-bold text-gray-900 leading-none">497</p>
                  <p className="text-[10px] text-gray-400 mt-1">Tanaman</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-500 mb-1">Kel. Geotag</p>
                  <p className="text-lg font-bold text-gray-900 leading-none">100%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Tervalidasi</p>
                </div>
              </div>
              
              <div className="flex items-start gap-1.5 text-[10px] text-blue-600 font-medium">
                <HiOutlineInformationCircle className="w-3.5 h-3.5 shrink-0" />
                <p>Pastikan semua tanaman memiliki foto dan geotag sebelum melanjutkan.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER ACTION STICKY */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 px-6 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-full md:w-auto px-8 py-3 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <button 
              onClick={handleSimpan}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border border-emerald-500 text-emerald-600 text-sm font-bold rounded-xl hover:bg-emerald-50 transition-colors"
            >
              <HiOutlineBookmark className="w-5 h-5" /> Simpan Tanaman
            </button>
            <button 
              onClick={handleSimpan}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border border-emerald-500 text-emerald-600 text-sm font-bold rounded-xl hover:bg-emerald-50 transition-colors"
            >
              <HiOutlineCamera className="w-5 h-5" /> Simpan & Tambah Foto Baru
            </button>
            <button 
              onClick={handleSimpan}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700 text-white text-sm font-bold rounded-xl hover:bg-emerald-800 transition-colors shadow-sm"
            >
              Simpan & Tambah Berikutnya <HiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MulaiKegiatan;