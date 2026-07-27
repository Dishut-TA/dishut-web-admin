import React, { useEffect, useState } from 'react';
import { 
  HiOutlineXMark, 
  HiOutlineMapPin, 
  HiOutlineListBullet,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineLockClosed,
  HiOutlineInformationCircle,
  HiOutlinePaperAirplane
} from 'react-icons/hi2';
import { PiPlant } from 'react-icons/pi';
import toast from 'react-hot-toast';

interface ModalTugaskanProps {
  isOpen: boolean;
  onClose: () => void;
  data: any | null; 
}

const ModalTugaskan: React.FC<ModalTugaskanProps> = ({ isOpen, onClose, data }) => {
  const [penyuluh, setPenyuluh] = useState('');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [batasWaktu, setBatasWaktu] = useState('');
  const [prioritas, setPrioritas] = useState('Sedang');
  const [catatan, setCatatan] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPenyuluh('');
      setTanggalMulai('');
      setBatasWaktu('');
      setPrioritas('Sedang');
      setCatatan('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !data) return null;

  const isValidasi = data.jenis === 'Validasi Lokasi';

  const theme = {
    color: isValidasi ? 'emerald' : 'purple',
    textMain: isValidasi ? 'text-emerald-700' : 'text-purple-700',
    textBadge: isValidasi ? 'text-emerald-600' : 'text-purple-600',
    bgBadge: isValidasi ? 'bg-emerald-50' : 'bg-purple-50',
    borderSection: isValidasi ? 'border-emerald-200' : 'border-purple-200',
    bgInfo: isValidasi ? 'bg-emerald-50' : 'bg-purple-50',
    btnDraftBorder: isValidasi ? 'border-emerald-600' : 'border-purple-600',
    btnDraftText: isValidasi ? 'text-emerald-600' : 'text-purple-600',
    btnDraftHover: isValidasi ? 'hover:bg-emerald-50' : 'hover:bg-purple-50',
    btnSubmitBg: isValidasi ? 'bg-emerald-600' : 'bg-purple-600',
    btnSubmitHover: isValidasi ? 'hover:bg-emerald-700' : 'hover:bg-purple-700',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Penugasan berhasil dikirim ke penyuluh!`);
    onClose();
  };

  const SummaryRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex text-sm">
      <span className="w-28 text-gray-500 shrink-0">{label}</span>
      <span className="mr-2 text-gray-500">:</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[95vh]">
        
        {/* Header Modals */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme.bgBadge} ${theme.textBadge}`}>
              {isValidasi ? <HiOutlineMapPin className="w-6 h-6" /> : <PiPlant className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Tugaskan {isValidasi ? 'Validasi Lokasi' : 'Pelaksanaan Kegiatan'}
              </h2>
              <span className={`inline-block mt-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${theme.bgBadge} ${theme.textBadge}`}>
                {isValidasi ? 'Validasi Lokasi' : 'Pelaksanaan Kegiatan'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <HiOutlineXMark className="w-6 h-6" />
          </button>
        </div>

        {/* Body Modals (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white space-y-6">
          
          {/* Section 1: Ringkasan Lokasi/Program */}
          <div className={`border rounded-2xl p-5 ${theme.borderSection}`}>
            <h3 className={`text-base font-bold flex items-center gap-2 mb-4 ${theme.textMain}`}>
              <HiOutlineListBullet className="w-5 h-5" /> 
              Ringkasan {isValidasi ? 'Lokasi' : 'Program'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {isValidasi ? (
                <>
                  <SummaryRow label="ID Referensi" value={data.ref || 'LOC-2026-0012'} />
                  <SummaryRow label="CDK" value="Cimanuk" />
                  <SummaryRow label="Lokasi Usulan" value={data.objek || 'Blok Cibodas'} />
                  <SummaryRow label="Desa / Kecamatan" value={data.lokasi || 'Desa Sukamaju / Kec. Rancabali'} />
                  <SummaryRow label="Sumber Lokasi" value="Analisis CPI" />
                  <SummaryRow label="Luas" value="12,5 Ha" />
                </>
              ) : (
                <>
                  <SummaryRow label="ID Program" value={data.ref || 'PRG-2026-0021'} />
                  <SummaryRow label="Jenis Kegiatan" value="Penanaman" />
                  <SummaryRow label="Nama Program" value={data.objek || 'Rehabilitasi DAS Cimanuk'} />
                  <SummaryRow label="Lokasi Program" value={data.lokasi || 'Desa Sukamaju / Kec. Rancabali'} />
                  <SummaryRow label="Sumber Dana" value="APBD" />
                  <SummaryRow label="Target Kegiatan" value="500 tanaman" />
                </>
              )}
            </div>
          </div>

          {/* Section 2: Pihak Terlibat (Khusus Pelaksanaan) */}
          {!isValidasi && (
            <div className={`border rounded-2xl p-5 ${theme.borderSection}`}>
              <h3 className={`text-base font-bold flex items-center gap-2 mb-4 ${theme.textMain}`}>
                <HiOutlineUsers className="w-5 h-5" /> Pihak Terlibat
              </h3>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">KTH Terlibat</label>
                <div className="relative">
                  <input 
                    disabled type="text" value="KTH Mekar Jaya" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed"
                  />
                  <HiOutlineLockClosed className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <p className="text-xs text-gray-400 mt-2">KTH sudah ditetapkan pada program.</p>
              </div>
            </div>
          )}

          {/* Section 3: Form Penugasan */}
          <div className={`border rounded-2xl p-5 ${theme.borderSection}`}>
            <h3 className={`text-base font-bold flex items-center gap-2 mb-5 ${theme.textMain}`}>
              <HiOutlineDocumentText className="w-5 h-5" /> Form Penugasan
            </h3>
            
            <form id="form-tugaskan" onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Penyuluh yang Ditugaskan <span className="text-red-500">*</span>
                  </label>
                  <select required value={penyuluh} onChange={e => setPenyuluh(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-gray-400 bg-white cursor-pointer">
                    <option value="" disabled>Pilih Penyuluh...</option>
                    <option value="Ahmad Fauzi">Ahmad Fauzi</option>
                    <option value="Rina Herlina">Rina Herlina</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {isValidasi ? 'Tanggal Validasi' : 'Tanggal Mulai'} <span className="text-red-500">*</span>
                  </label>
                  <input required type="date" value={tanggalMulai} onChange={e => setTanggalMulai(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-gray-400 text-gray-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Batas Waktu <span className="text-red-500">*</span>
                  </label>
                  <input required type="date" value={batasWaktu} onChange={e => setBatasWaktu(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-gray-400 text-gray-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Prioritas <span className="text-red-500">*</span>
                  </label>
                  <select value={prioritas} onChange={e => setPrioritas(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-gray-400 bg-white cursor-pointer">
                    <option value="Tinggi">Tinggi</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Catatan Penugasan</label>
                <textarea 
                  rows={3} value={catatan} onChange={e => setCatatan(e.target.value)}
                  placeholder={isValidasi ? "Lakukan verifikasi koordinat, kondisi lahan, akses lokasi, dan dokumentasi lapangan." : "Dampingi pelaksanaan penanaman sesuai target dan laporkan progres berkala."} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-gray-400" 
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                  Batal
                </button>
                <button type="button" className={`px-6 py-2.5 text-sm font-bold bg-white border ${theme.btnDraftBorder} ${theme.btnDraftText} ${theme.btnDraftHover} rounded-xl transition-colors cursor-pointer`}>
                  Simpan Draft
                </button>
                <button type="submit" className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white ${theme.btnSubmitBg} ${theme.btnSubmitHover} rounded-xl shadow-sm transition-colors cursor-pointer`}>
                  <HiOutlinePaperAirplane className="w-4 h-4 -rotate-45 mb-0.5" />
                  Kirim Penugasan
                </button>
              </div>
            </form>
          </div>

          {/* Alert Info Bottom */}
          <div className={`p-4 rounded-xl flex items-start gap-3 text-sm font-medium ${theme.bgInfo} ${theme.textMain}`}>
            <HiOutlineInformationCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              {isValidasi 
                ? "Penugasan ini ditujukan untuk validasi lapangan sebelum lokasi ditetapkan." 
                : "KTH sudah ditentukan, penyuluh ditugaskan untuk mendampingi pelaksanaan kegiatan."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalTugaskan;