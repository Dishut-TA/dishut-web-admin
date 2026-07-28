import React from 'react';
import { HiOutlineXMark, HiOutlineMapPin, HiOutlineInformationCircle, HiOutlineCamera, HiOutlineLockClosed } from 'react-icons/hi2';
import { PiClockCounterClockwise } from 'react-icons/pi';

interface Props {
  item: any;
  onClose: () => void;
}

const InputDataModal: React.FC<Props> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Input Hasil Monitoring</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <HiOutlineXMark className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
          
          {/* Stepper Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center text-[10px] font-bold text-gray-400">
              <span className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-100 mr-2">1</span> Informasi Program
              <div className="w-12 h-px bg-gray-200 mx-3"></div>
              <span className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-600 text-white mr-2 shadow-sm shadow-emerald-200">2</span> <span className="text-emerald-600">Input Monitoring</span>
              <div className="w-12 h-px bg-gray-200 mx-3"></div>
              <span className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-100 mr-2">3</span> Dokumentasi & Catatan
              <div className="w-12 h-px bg-gray-200 mx-3"></div>
              <span className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-100 mr-2">4</span> Review & Kirim
            </div>
          </div>

          <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3 flex gap-3 items-center mb-6">
            <HiOutlineInformationCircle className="w-5 h-5 text-[#00A859] shrink-0" />
            <p className="text-xs font-bold text-[#185325]">Setiap tanaman memiliki 1 geotag. Input monitoring membandingkan foto saat pelaksanaan dengan kondisi terkini tanaman.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Form Left Side */}
            <div className="flex-1 flex flex-col gap-6">
              <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-2">Data Monitoring Tanaman #4</h3>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Jenis Tanaman <span className="text-red-500">*</span></label>
                  <select className="w-full text-sm p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"><option>Rhizophora mucronata</option></select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Kondisi Tanaman <span className="text-red-500">*</span></label>
                  <select className="w-full text-sm p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white mb-2"><option>Sehat</option></select>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 border border-emerald-500 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5"><div className="w-2 h-2 rounded-full border border-emerald-500 relative"><div className="absolute inset-0.5 bg-emerald-500 rounded-full"></div></div> Sehat</button>
                    <button className="flex-1 py-1.5 border border-gray-200 text-orange-500 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5"><div className="w-2 h-2 rounded-full border border-orange-500"></div> Perlu Perawatan</button>
                    <button className="flex-1 py-1.5 border border-gray-200 text-red-500 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5"><div className="w-2 h-2 rounded-full border border-red-500"></div> Mati / Rusak</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Status Tanaman <span className="text-red-500">*</span></label>
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 border border-emerald-500 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-emerald-500 relative"><div className="absolute inset-0.5 bg-emerald-500 rounded-full"></div></div> Hidup</button>
                    <button className="flex-1 py-3 border border-gray-200 text-gray-500 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-gray-300"></div> Mati</button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Tinggi Tanaman <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="number" defaultValue="45" className="w-full text-sm p-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">cm</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col">
                  <label className="text-xs font-bold text-gray-800 block mb-0.5">Foto Sebelum</label>
                  <p className="text-[10px] text-gray-500 font-medium mb-3">Dari pelaksanaan</p>
                  <div className="flex-1 rounded-lg overflow-hidden relative mb-2">
                    <img src={item?.imgAwal || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&q=80"} className="w-full h-28 object-cover" alt="Before" />
                  </div>
                  <p className="text-[9px] font-bold text-gray-500 flex items-center gap-1.5"><HiOutlineMapPin className="w-3.5 h-3.5"/> 12 Mei 2025 • 09:15 WIB</p>
                </div>
                <div className="border border-emerald-500 bg-[#F8FBF9] rounded-xl p-4 flex flex-col border-dashed cursor-pointer hover:bg-emerald-50 transition-colors">
                  <label className="text-xs font-bold text-gray-800 block mb-0.5">Foto Monitoring <span className="text-red-500">*</span></label>
                  <p className="text-[10px] text-gray-500 font-medium mb-3">Foto terbaru saat monitoring</p>
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <HiOutlineCamera className="w-8 h-8 text-emerald-600 mb-2" />
                    <span className="text-xs font-bold text-emerald-700">Ambil Foto</span>
                    <span className="text-[10px] text-gray-500 mt-1">atau klik untuk upload</span>
                    <span className="text-[9px] text-gray-400 font-medium mt-2">Format: JPG, JPEG, PNG<br/>Maks. 5MB</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Koordinat Geotag (Terkunci) <HiOutlineLockClosed className="inline w-3 h-3 text-gray-500"/></label>
                  <p className="text-[10px] text-gray-500 font-medium mb-2 leading-relaxed">Koordinat diambil saat tahap pelaksanaan penanaman. Tidak dapat diubah pada tahap monitoring.</p>
                  <div className="relative">
                    <HiOutlineMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                    <input type="text" value="-6.123456, 106.789012" className="w-full text-sm pl-9 pr-10 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 font-medium outline-none" readOnly />
                    <HiOutlineLockClosed className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Catatan Monitoring</label>
                  <p className="text-[10px] text-gray-500 font-medium mb-2">Tuliskan catatan tambahan jika diperlukan.</p>
                  <div className="relative">
                    <textarea rows={3} className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none" defaultValue="Tanaman tumbuh dengan baik, daun hijau segar. Tidak ada serangan hama. Area sekitar bersih."></textarea>
                    <span className="absolute bottom-2 right-3 text-[9px] font-bold text-gray-400">89 / 500</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar Right */}
            <div className="w-full lg:w-72 shrink-0 flex flex-col gap-5">
              <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-5 flex flex-col h-70">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Riwayat</h3>
                <div className="flex-1 bg-white border border-gray-200 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-6 shadow-sm">
                  <PiClockCounterClockwise className="w-10 h-10 text-gray-300 mb-3" />
                  <p className="text-xs font-bold text-gray-800 mb-1">Belum ada riwayat monitoring</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">Riwayat monitoring akan muncul setelah data monitoring disimpan.</p>
                </div>
              </div>
              <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-5">
                <h3 className="text-sm font-bold text-emerald-900 mb-4">Ringkasan Input</h3>
                <div className="space-y-3 text-xs font-medium">
                  <div className="flex justify-between"><span className="text-gray-600">Target</span><span className="font-bold text-gray-800">500 tanaman</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Sudah Diinput</span><span className="font-bold text-emerald-600">3 tanaman</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Belum Diinput</span><span className="font-bold text-orange-500">497 tanaman</span></div>
                  <div className="w-full h-1.5 bg-white rounded-full mt-2 overflow-hidden border border-emerald-100"><div className="bg-emerald-500 h-full w-[2%] rounded-full"></div></div>
                  <div className="flex justify-between pt-1"><span className="text-gray-600">Kel. Geotag</span><span className="font-bold text-emerald-600">100% Tervalidasi</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Modal */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-2xl">
          <button className="flex items-center gap-2 text-xs font-bold text-emerald-600 border border-emerald-200 bg-white px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors">
            Butuh Bantuan? Lihat Panduan
          </button>
          <div className="flex gap-3 w-full sm:w-auto">
            <button onClick={onClose} className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">Batal</button>
            <button className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-emerald-500 text-emerald-700 text-xs font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-sm flex items-center justify-center gap-2">Simpan Monitoring</button>
            <button className="flex-1 sm:flex-none px-6 py-2.5 bg-[#185325] text-white text-xs font-bold rounded-xl hover:bg-[#123d1c] transition-colors shadow-sm flex items-center justify-center gap-2">Simpan & Tambah Berikutnya <span>→</span></button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InputDataModal;