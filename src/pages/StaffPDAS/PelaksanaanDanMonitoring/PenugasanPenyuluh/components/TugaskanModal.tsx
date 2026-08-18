import React, { useState } from 'react';
import { 
  HiOutlineXMark,
  HiOutlineMapPin,
  HiOutlineListBullet,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineEye,
  HiOutlineInformationCircle
} from 'react-icons/hi2';
import DetailRencanaPOModal from './DetailRencanaPOModal';

const SproutIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12M12 12C12 12 7 12 7 7C7 12 12 12 12 12ZM12 12C12 12 17 12 17 7C17 12 12 12 12 12Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 22H16" />
  </svg>
);

interface TugaskanModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any | null; 
}

const TugaskanModal: React.FC<TugaskanModalProps> = ({ isOpen, onClose, data }) => {
  const [formData, setFormData] = useState({
    penyuluh: '',
    tanggal: '',
    batasWaktu: '',
    prioritas: '',
    catatan: '',
    kth: 'kth1' // Default value for locked select
  });

  // State untuk mengontrol Modal Detail Rencana PO
  const [isDetailPOOpen, setIsDetailPOOpen] = useState(false);

  if (!isOpen || !data) return null;

  const isValidasi = data.jenisKegiatan === 'Validasi Lokasi';

  const handleSimpan = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Penugasan:", formData, "Tipe:", data.jenisKegiatan);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in-95 duration-200">
          
          {/* HEADER */}
          <div className="px-6 py-5 flex items-start justify-between sticky top-0 bg-white z-10">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600">
                {isValidasi ? <HiOutlineMapPin className="w-6 h-6" /> : <SproutIcon className="w-6 h-6" />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  {isValidasi ? 'Tugaskan Validasi Lokasi' : 'Tugaskan Pelaksanaan Kegiatan'}
                </h2>
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold border bg-emerald-50 text-emerald-600 border-emerald-100">
                  {data.jenisKegiatan}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
              <HiOutlineXMark className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSimpan} className="px-6 pb-6 space-y-6">
            
            {/* SECTION: RINGKASAN */}
            <div className="border border-emerald-100 rounded-xl overflow-hidden">
              <div className="px-5 py-3 flex items-center gap-2 border-b border-emerald-100 bg-emerald-50/30">
                <HiOutlineListBullet className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-emerald-700">
                  {isValidasi ? 'Ringkasan Lokasi' : 'Ringkasan Program'}
                </h3>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                {isValidasi ? (
                  <>
                    <div className="flex items-start"><span className="w-32 text-gray-500 shrink-0">ID Referensi</span><span className="font-bold text-gray-900">: LOC-2026-0012</span></div>
                    <div className="flex items-start"><span className="w-32 text-gray-500 shrink-0">CDK</span><span className="font-bold text-gray-900">: {data.wilayah}</span></div>
                    <div className="flex items-start"><span className="w-32 text-gray-500 shrink-0">Lokasi Usulan</span><span className="font-bold text-gray-900">: Blok Cibodas</span></div>
                    <div className="flex items-start"><span className="w-32 text-gray-500 shrink-0">Desa / Kecamatan</span><span className="font-bold text-gray-900 whitespace-pre-line">: {data.lokasi.replace('\n', ' ')}</span></div>
                    <div className="flex items-start"><span className="w-32 text-gray-500 shrink-0">Sumber Lokasi</span><span className="font-bold text-gray-900">: Analisis CPI</span></div>
                    <div className="flex items-start"><span className="w-32 text-gray-500 shrink-0">Luas</span><span className="font-bold text-gray-900">: 12.5 Ha</span></div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start"><span className="w-32 text-gray-500 shrink-0">ID Program</span><span className="font-bold text-gray-900">: PRG-2026-0021</span></div>
                    <div className="flex items-start"><span className="w-32 text-gray-500 shrink-0">Jenis Kegiatan</span><span className="font-bold text-gray-900">: Penanaman</span></div>
                    <div className="flex items-start"><span className="w-32 text-gray-500 shrink-0">Nama Program</span><span className="font-bold text-gray-900">: {data.program}</span></div>
                    <div className="flex items-start"><span className="w-32 text-gray-500 shrink-0">Lokasi Program</span><span className="font-bold text-gray-900 whitespace-pre-line">: {data.lokasi.replace('\n', ' ')}</span></div>
                    <div className="flex items-start"><span className="w-32 text-gray-500 shrink-0">Sumber Dana</span><span className="font-bold text-gray-900">: APBD</span></div>
                    <div className="flex items-start"><span className="w-32 text-gray-500 shrink-0">Target Kegiatan</span><span className="font-bold text-gray-900">: 500 tanaman</span></div>
                  </>
                )}
              </div>
            </div>

            {/* SECTION KHUSUS PELAKSANAAN: PIHAK TERLIBAT */}
            {!isValidasi && (
              <div className="border border-emerald-100 rounded-xl overflow-hidden">
                <div className="px-5 py-3 flex items-center gap-2 border-b border-emerald-100 bg-emerald-50/30">
                  <HiOutlineUserGroup className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-bold text-emerald-700">Pihak Terlibat</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">KTH Terlibat</label>
                    <select 
                      disabled
                      value={formData.kth} 
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed focus:outline-none"
                    >
                      <option value="kth1">KTH Tani Maju (Telah ditetapkan CPI)</option>
                    </select>
                    <p className="text-[11px] mt-2 font-medium text-emerald-700">KTH akan menerima informasi penugasan setelah disimpan.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Rencana / Periode Penanaman (PO)</label>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-900">PO - Rencana Penanaman Awal</p>
                        <p className="text-[11px] text-gray-500 mt-1">Target: 500 tanaman | Periode Pelaksanaan: 01 Jul 2026 - 31 Jul 2026</p>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setIsDetailPOOpen(true)}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-colors shrink-0"
                      >
                        <HiOutlineEye className="w-4 h-4" /> Lihat Detail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION: FORM PENUGASAN */}
            <div className="border border-emerald-100 rounded-xl overflow-hidden">
              <div className="px-5 py-3 flex items-center gap-2 border-b border-emerald-100 bg-emerald-50/30">
                <HiOutlineDocumentText className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-emerald-700">Form Penugasan</h3>
              </div>
              <div className="p-5 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Penyuluh yang Ditugaskan</label>
                    <select 
                      value={formData.penyuluh} onChange={(e) => setFormData({...formData, penyuluh: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-gray-700"
                    >
                      <option value="">-- Pilih Penyuluh --</option>
                      <option value="Ahmad">Ahmad Fauzi</option>
                      <option value="Siti">Siti Nurhaliza</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {isValidasi ? 'Tanggal Validasi' : 'Tanggal Mulai Pelaksanaan'}
                    </label>
                    <input 
                      type="date" 
                      value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-gray-700" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {isValidasi ? 'Batas Waktu Validasi' : 'Batas Waktu Pelaksanaan'}
                    </label>
                    <input 
                      type="date" 
                      value={formData.batasWaktu} onChange={(e) => setFormData({...formData, batasWaktu: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-gray-700" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Prioritas</label>
                    <select 
                      value={formData.prioritas} onChange={(e) => setFormData({...formData, prioritas: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-gray-700"
                    >
                      <option value="">-- Pilih Prioritas --</option>
                      <option value="Tinggi">Tinggi</option>
                      <option value="Sedang">Sedang</option>
                      <option value="Rendah">Rendah</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Catatan Penugasan (Opsional)</label>
                  <textarea 
                    value={formData.catatan} onChange={(e) => setFormData({...formData, catatan: e.target.value})}
                    placeholder={isValidasi ? "Contoh: Lakukan verifikasi koordinat, kondisi lahan, akses lokasi, dan dokumentasi lapangan." : "Contoh: Dampingi KTH dalam pelaksanaan penanaman sesuai target dan laporkan progres berkala."}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none text-gray-700"
                  ></textarea>
                </div>

                {/* Info Text Bawah */}
                <div className="px-4 py-3 rounded-lg flex items-start gap-2 border bg-emerald-50/50 border-emerald-100 text-emerald-700">
                  <HiOutlineInformationCircle className="w-5 h-5 shrink-0" />
                  <p className="text-xs font-medium pt-0.5">
                    {isValidasi 
                      ? 'Penugasan ini ditujukan untuk validasi lapangan sebelum lokasi ditetapkan.'
                      : 'Penyuluh bertugas mendampingi KTH dalam pelaksanaan penanaman sesuai rencana program.'}
                  </p>
                </div>

              </div>
            </div>

            {/* ACTIONS */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button type="button" onClick={onClose} className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors">
                Batal
              </button>
              <button type="submit" className="w-full sm:w-auto px-6 py-2.5 bg-[#1F7A4D] hover:bg-emerald-800 text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
                Kirim Penugasan
              </button>
            </div>

          </form>
        </div>
      </div>

      <DetailRencanaPOModal
        isOpen={isDetailPOOpen} 
        onClose={() => setIsDetailPOOpen(false)} 
      />
    </>
  );
};

export default TugaskanModal;