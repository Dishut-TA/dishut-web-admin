import React from 'react';
import { HiOutlineXMark, HiOutlineMapPin, HiOutlineInformationCircle, HiOutlineCamera, HiOutlineLockClosed, HiEllipsisVertical, HiOutlineListBullet } from 'react-icons/hi2';
import { PiPlant } from 'react-icons/pi';

interface Props {
  item: any;
  onClose: () => void;
}

const EditDataModal: React.FC<Props> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center p-5 sm:p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Edit Hasil Monitoring</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <HiOutlineXMark className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8 custom-scrollbar">
          
          {/* Header Data Mini */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-6 text-[11px] mb-6">
            <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">ID Program</span><span className="font-bold text-gray-800">PRG-2026-0088</span></div>
            <div className="flex flex-col gap-1 col-span-2 md:col-span-1 lg:col-span-2"><span className="text-gray-500 font-medium">Nama Program</span><span className="font-bold text-gray-800">Rehabilitasi Mangrove Karangsong</span></div>
            <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Sumber Dana</span><span className="font-bold text-gray-800">APBD</span></div>
            <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Periode Monitoring</span><span className="font-bold text-gray-800">2 dari 4</span></div>
            <div className="flex flex-col gap-1 col-span-2 md:col-span-2"><span className="text-gray-500 font-medium">Lokasi</span><span className="font-bold text-gray-800">Desa Karangsong, Kec. Indramayu</span></div>
            <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Target Tanaman</span><span className="font-bold text-gray-800">2.500 pohon</span></div>
            <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">ID Tanaman</span><span className="font-bold text-gray-800">{item?.id || 'PRG26-0088-001'}</span></div>
            <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Jenis Tanaman</span><span className="font-bold text-gray-800">{item?.jenis || 'Rhizophora mucronata'}</span></div>
          </div>

          <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3 flex gap-3 items-center mb-4">
            <HiOutlineInformationCircle className="w-5 h-5 text-[#00A859] shrink-0" />
            <p className="text-xs font-bold text-[#185325]">Koordinat lokasi tanaman telah diambil saat penanaman dan tidak dapat diubah.</p>
          </div>

          {/* Locked Coordinate */}
          <div className="w-full sm:w-100 border border-gray-200 bg-gray-50 rounded-xl p-3 flex items-center gap-3 mb-8">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100"><HiOutlineMapPin className="w-4 h-4 text-gray-500"/></div>
            <div className="flex-1">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Koordinat Terkunci</p>
              <p className="text-xs font-bold text-gray-700">6.841232° S, 107.564891° E</p>
            </div>
            <HiOutlineLockClosed className="w-4 h-4 text-gray-400 shrink-0 mx-2" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Form Edit (Left Side) */}
            <div className="flex-1 flex flex-col gap-6">
              <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Data Monitoring Tanaman</h3>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Kondisi Tanaman <span className="text-red-500">*</span></label>
                  <select className="w-full text-sm p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white mb-2"><option>Sehat</option></select>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 border border-emerald-500 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5"><div className="w-2 h-2 rounded-full border border-emerald-500 relative"><div className="absolute inset-0.5 bg-emerald-500 rounded-full"></div></div> Sehat</button>
                    <button className="flex-1 py-1.5 border border-gray-200 text-orange-500 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5"><div className="w-2 h-2 rounded-full border border-orange-500"></div> Perlu Perawatan</button>
                    <button className="flex-1 py-1.5 border border-gray-200 text-red-500 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5"><div className="w-2 h-2 rounded-full border border-red-500"></div> Mati / Rusak</button>
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

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2">Status Tanaman <span className="text-red-500">*</span></label>
                <div className="flex gap-3 w-64">
                  <button className="flex-1 py-2 border border-emerald-500 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-emerald-500 relative"><div className="absolute inset-0.5 bg-emerald-500 rounded-full"></div></div> Hidup</button>
                  <button className="flex-1 py-2 border border-gray-200 text-gray-500 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-gray-300"></div> Mati</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-2">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col">
                  <label className="text-xs font-bold text-gray-800 block mb-0.5">Foto Sebelum (Pelaksanaan) <span className="text-red-500">*</span></label>
                  <p className="text-[10px] text-gray-500 font-medium mb-3">Dari pelaksanaan</p>
                  <div className="flex-1 rounded-lg overflow-hidden relative mb-3 border border-gray-200">
                    <img src={item?.imgAwal || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&q=80"} className="w-full h-32 object-cover" alt="Before" />
                  </div>
                  <p className="text-[9px] font-bold text-gray-500 flex items-center gap-1.5"><HiOutlineMapPin className="w-3.5 h-3.5"/> 12 Mei 2025 • 09:15 WIB</p>
                </div>
                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex flex-col">
                  <label className="text-xs font-bold text-gray-800 block mb-0.5">Foto Monitoring Terbaru <span className="text-red-500">*</span></label>
                  <p className="text-[10px] text-gray-500 font-medium mb-3">Foto terbaru saat monitoring</p>
                  <div className="flex-1 rounded-lg overflow-hidden relative mb-3 border border-gray-200 group">
                    <img src={item?.imgBaru || "https://images.unsplash.com/photo-1511497584788-876760111969?w=300&q=80"} className="w-full h-32 object-cover transition-transform group-hover:scale-105" alt="After" />
                    <button className="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-gray-800 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 hover:bg-white flex items-center gap-1.5"><HiOutlineCamera className="w-3.5 h-3.5"/> Ganti Foto</button>
                  </div>
                  <p className="text-[9px] font-bold text-gray-500 flex items-center gap-1.5"><HiOutlineMapPin className="w-3.5 h-3.5"/> 16 Jun 2026 • 10:32 WIB</p>
                </div>
              </div>

              <div className="mt-2">
                <label className="text-xs font-bold text-gray-800 block mb-2">Catatan Monitoring</label>
                <div className="relative">
                  <textarea rows={3} className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none" defaultValue="Tanaman tumbuh dengan baik, daun hijau segar. Tidak ada serangan hama. Area sekitar bersih."></textarea>
                  <span className="absolute bottom-2 right-3 text-[9px] font-bold text-gray-400">89 / 500</span>
                </div>
              </div>

            </div>

            {/* Sidebar Riwayat (Right Side) */}
            <div className="w-full lg:w-95 shrink-0 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Riwayat Monitoring</h3>
              
              <div className="flex flex-col gap-3 overflow-y-auto max-h-120 pr-2 custom-scrollbar">
                
                {/* Item Riwayat 1 */}
                <div className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm items-center hover:bg-gray-50 transition-colors">
                  <img src="https://images.unsplash.com/photo-1511497584788-876760111969?w=100&q=80" className="w-16 h-16 rounded-lg object-cover border border-gray-200" alt="Thumb"/>
                  <div className="flex-1 grid grid-cols-[50px_10px_1fr] gap-y-1 text-[10px] font-medium text-gray-500">
                    <span>Tinggi</span><span>:</span><span className="font-bold text-gray-800">33 cm</span>
                    <span>Kondisi</span><span>:</span><span className="font-bold text-emerald-600 flex items-center gap-1"><PiPlant className="w-3 h-3"/> Sehat</span>
                    <span>Status</span><span>:</span><span className="font-bold text-[#185325] flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Hidup</span>
                  </div>
                  <div className="text-right text-[9px] text-gray-400 font-medium flex flex-col justify-between h-full py-1">
                    <p>26 Jun 2026<br/>09:12 WIB</p>
                    <button className="text-gray-400 hover:text-gray-800 self-end"><HiEllipsisVertical className="w-4 h-4"/></button>
                  </div>
                </div>

                {/* Item Riwayat 2 */}
                <div className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm items-center hover:bg-gray-50 transition-colors">
                  <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&q=80" className="w-16 h-16 rounded-lg object-cover border border-gray-200" alt="Thumb"/>
                  <div className="flex-1 grid grid-cols-[50px_10px_1fr] gap-y-1 text-[10px] font-medium text-gray-500">
                    <span>Tinggi</span><span>:</span><span className="font-bold text-gray-800">20 cm</span>
                    <span>Kondisi</span><span>:</span><span className="font-bold text-emerald-600 flex items-center gap-1"><PiPlant className="w-3 h-3"/> Sehat</span>
                    <span>Status</span><span>:</span><span className="font-bold text-[#185325] flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Hidup</span>
                  </div>
                  <div className="text-right text-[9px] text-gray-400 font-medium flex flex-col justify-between h-full py-1">
                    <p>26 Jun 2026<br/>09:01 WIB</p>
                    <button className="text-gray-400 hover:text-gray-800 self-end"><HiEllipsisVertical className="w-4 h-4"/></button>
                  </div>
                </div>

                {/* Item Riwayat 3 */}
                <div className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm items-center hover:bg-gray-50 transition-colors">
                  <img src="https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=100&q=80" className="w-16 h-16 rounded-lg object-cover border border-gray-200" alt="Thumb"/>
                  <div className="flex-1 grid grid-cols-[50px_10px_1fr] gap-y-1 text-[10px] font-medium text-gray-500">
                    <span>Tinggi</span><span>:</span><span className="font-bold text-gray-800">14 cm</span>
                    <span>Kondisi</span><span>:</span><span className="font-bold text-orange-500 flex items-center gap-1"><PiPlant className="w-3 h-3"/> Perlu Perawatan</span>
                    <span>Status</span><span>:</span><span className="font-bold text-[#185325] flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Hidup</span>
                  </div>
                  <div className="text-right text-[9px] text-gray-400 font-medium flex flex-col justify-between h-full py-1">
                    <p>16 Jun 2026<br/>08:15 WIB</p>
                    <button className="text-gray-400 hover:text-gray-800 self-end"><HiEllipsisVertical className="w-4 h-4"/></button>
                  </div>
                </div>

                {/* Item Riwayat 4 */}
                <div className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm items-center hover:bg-gray-50 transition-colors">
                  <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&q=80" className="w-16 h-16 rounded-lg object-cover border border-gray-200" alt="Thumb"/>
                  <div className="flex-1 grid grid-cols-[50px_10px_1fr] gap-y-1 text-[10px] font-medium text-gray-500">
                    <span>Tinggi</span><span>:</span><span className="font-bold text-gray-800">12 cm</span>
                    <span>Kondisi</span><span>:</span><span className="font-bold text-orange-500 flex items-center gap-1"><PiPlant className="w-3 h-3"/> Perlu Perawatan</span>
                    <span>Status</span><span>:</span><span className="font-bold text-[#185325] flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Hidup</span>
                  </div>
                  <div className="text-right text-[9px] text-gray-400 font-medium flex flex-col justify-between h-full py-1">
                    <p>12 Jun 2026<br/>08:12 WIB</p>
                    <button className="text-gray-400 hover:text-gray-800 self-end"><HiEllipsisVertical className="w-4 h-4"/></button>
                  </div>
                </div>

              </div>

              <button className="w-full py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-sm mt-2">
                <HiOutlineListBullet className="w-4 h-4"/> Lihat Riwayat Lengkap
              </button>
            </div>

          </div>
        </div>

        {/* Footer Modal */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between rounded-b-2xl shrink-0">
          <button onClick={onClose} className="px-8 py-2.5 bg-white border border-gray-300 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">Batal</button>
          <button className="px-8 py-2.5 bg-[#185325] text-white text-xs font-bold rounded-xl hover:bg-[#123d1c] transition-colors shadow-sm flex items-center justify-center gap-2">Simpan Perubahan</button>
        </div>

      </div>
    </div>
  );
};

export default EditDataModal;