import React from 'react';
import { 
  HiOutlineXMark,
  HiOutlineInformationCircle,
  HiOutlineMap,
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineCheckCircle
} from 'react-icons/hi2';

interface DetailRencanaPOModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SproutIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12M12 12C12 12 7 12 7 7C7 12 12 12 12 12ZM12 12C12 12 17 12 17 7C17 12 12 12 12 12Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 22H16" />
  </svg>
);

const LeafIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C12 2 4 6 4 12C4 18 12 22 12 22C12 22 20 18 20 12C20 6 12 2 12 2Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const DetailRencanaPOModal: React.FC<DetailRencanaPOModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-[#f8faf9] rounded-2xl shadow-xl w-full max-w-275 max-h-[95vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* HEADER MODAL */}
        <div className="px-6 py-5 bg-white border-b border-gray-100 flex items-start justify-between sticky top-0 z-10 rounded-t-2xl">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-700">
              <SproutIcon className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Detail Rencana Penanaman P0</h2>
              <p className="text-sm text-gray-500">Informasi rencana penanaman sebagai pembanding untuk monitoring.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-full transition-colors">
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineInformationCircle className="w-5 h-5 text-emerald-700" />
                <h3 className="text-sm font-bold text-emerald-800">Informasi Program</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
                <div className="flex"><span className="w-32 text-gray-500">ID Program</span><span className="font-semibold">: PRG-2026-0021</span></div>
                <div className="flex"><span className="w-32 text-gray-500">Jenis Kegiatan</span><span className="font-semibold">: Penanaman</span></div>
                <div className="flex"><span className="w-32 text-gray-500">Nama Program</span><span className="font-semibold">: Rehabilitasi DAS Cimanuk</span></div>
                <div className="flex"><span className="w-32 text-gray-500">Target Kegiatan</span><span className="font-semibold">: 500 tanaman</span></div>
                <div className="flex"><span className="w-32 text-gray-500">Lokasi Program</span><span className="font-semibold">: Desa Sukamaju, Kec. Rancabali</span></div>
                <div className="flex"><span className="w-32 text-gray-500">Tahun Program</span><span className="font-semibold">: 2026</span></div>
                <div className="flex"><span className="w-32 text-gray-500">Wilayah</span><span className="font-semibold">: Kab. Bandung</span></div>
                <div className="flex"><span className="w-32 text-gray-500">Deskripsi</span><span className="font-semibold pr-4 leading-relaxed">: Rehabilitasi lahan kritis di daerah hulu DAS Cimanuk.</span></div>
                <div className="flex"><span className="w-32 text-gray-500">Sumber Dana</span><span className="font-semibold">: APBD</span></div>
              </div>
            </div>
            <div className="h-full min-h-50">
              <div className="flex items-center gap-2 mb-3">
                <HiOutlineMap className="w-4 h-4 text-emerald-700" />
                <h3 className="text-xs font-bold text-emerald-800">Peta Lokasi Program</h3>
              </div>
              <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden relative border border-gray-200">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" alt="Peta" className="w-full h-full object-cover opacity-80" />
                {/* Mockup Polygon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="150" height="100" viewBox="0 0 150 100" fill="none">
                    <polygon points="10,10 140,20 120,90 30,80" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="10" cy="10" r="3" fill="white" stroke="#10b981" strokeWidth="1.5" />
                    <circle cx="140" cy="20" r="3" fill="white" stroke="#10b981" strokeWidth="1.5" />
                    <circle cx="120" cy="90" r="3" fill="white" stroke="#10b981" strokeWidth="1.5" />
                    <circle cx="30" cy="80" r="3" fill="white" stroke="#10b981" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="absolute top-2 right-2 bg-white rounded-md p-1.5 shadow-sm"><HiOutlineMap className="w-4 h-4 text-gray-700" /></div>
                <div className="absolute left-2 top-2 flex flex-col gap-1">
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-sm font-bold shadow-sm">+</div>
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-sm font-bold shadow-sm">-</div>
                </div>
              </div>
            </div>
          </div>

          {/* RENCANA PENANAMAN P0 (Cards) */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-5">
              <HiOutlineDocumentText className="w-5 h-5 text-emerald-700" />
              <h3 className="text-sm font-bold text-emerald-800">Rencana Penanaman P0 (Rencana Penanaman Awal)</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                <p className="text-xs text-gray-500 mb-2 font-medium">Periode</p>
                <p className="text-sm font-bold text-gray-900">P0 - Rencana Penanaman Awal</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex flex-col justify-center">
                <p className="text-xs text-gray-500 mb-2 font-medium">Periode Pelaksanaan</p>
                <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <HiOutlineCalendar className="w-4 h-4 text-emerald-600" /> 01 Jul 2026 - 31 Jul 2026
                </p>
              </div>
              <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-emerald-100 bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <HiOutlineCheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Total PU (Petak Ukur)</p>
                  <p className="text-base font-bold text-gray-900">10 PU <span className="text-[10px] font-normal text-gray-500">(Petak Ukur)</span></p>
                </div>
              </div>
              <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex flex-col justify-center">
                <p className="text-xs text-gray-500 mb-2 font-medium">Status</p>
                <div>
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-bold">
                    Siap Dilaksanakan
                  </span>
                </div>
              </div>
            </div>

            <h4 className="text-xs font-bold text-gray-800 mb-3">Ringkasan Target & Volume</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 border border-gray-100 rounded-xl flex items-center gap-3 shadow-sm">
                <SproutIcon className="w-8 h-8 text-emerald-600 opacity-80" />
                <div>
                  <p className="text-xl font-bold text-gray-900 leading-none">500</p>
                  <p className="text-[10px] text-gray-500 mt-1">Total Target Tanaman</p>
                </div>
              </div>
              <div className="p-4 border border-gray-100 rounded-xl flex items-center gap-3 shadow-sm">
                <HiOutlineMap className="w-8 h-8 text-emerald-600 opacity-80" />
                <div>
                  <p className="text-xl font-bold text-gray-900 leading-none">12,50 <span className="text-sm font-medium">Ha</span></p>
                  <p className="text-[10px] text-gray-500 mt-1">Luas Area Penanaman</p>
                </div>
              </div>
              <div className="p-4 border border-gray-100 rounded-xl flex items-center gap-3 shadow-sm">
                <LeafIcon className="w-8 h-8 text-emerald-600 opacity-80" />
                <div>
                  <p className="text-xl font-bold text-gray-900 leading-none">40</p>
                  <p className="text-[10px] text-gray-500 mt-1">Jenis Tanaman</p>
                </div>
              </div>
              <div className="p-4 border border-gray-100 rounded-xl flex items-center gap-3 shadow-sm">
                <UsersIcon className="w-8 h-8 text-emerald-600 opacity-80" />
                <div>
                  <p className="text-xl font-bold text-gray-900 leading-none">1</p>
                  <p className="text-[10px] text-gray-500 mt-1">KTH Terlibat</p>
                </div>
              </div>
            </div>

            {/* TABEL GANDA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tabel Sumber Daya */}
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3">Rencana Sumber Daya</h4>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-left text-xs text-gray-600">
                    <thead className="bg-gray-50 border-b border-gray-100 font-bold text-gray-900">
                      <tr>
                        <th className="px-4 py-3 text-center">No</th>
                        <th className="px-4 py-3">Sumber Daya</th>
                        <th className="px-4 py-3">Spesifikasi / Keterangan</th>
                        <th className="px-4 py-3 text-right">Jumlah</th>
                        <th className="px-4 py-3 text-center">Satuan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr><td className="px-4 py-3 text-center">1</td><td className="px-4 py-3 font-medium text-gray-800">Bibit Pohon</td><td className="px-4 py-3">Sesuai daftar jenis tanaman</td><td className="px-4 py-3 text-right font-medium">500</td><td className="px-4 py-3 text-center">batang</td></tr>
                      <tr><td className="px-4 py-3 text-center">2</td><td className="px-4 py-3 font-medium text-gray-800">Pupuk Organik</td><td className="px-4 py-3">Pupuk kandang / kompos</td><td className="px-4 py-3 text-right font-medium">250</td><td className="px-4 py-3 text-center">kg</td></tr>
                      <tr><td className="px-4 py-3 text-center">3</td><td className="px-4 py-3 font-medium text-gray-800">Ajir / Pancang</td><td className="px-4 py-3">Panjang 1 m</td><td className="px-4 py-3 text-right font-medium">500</td><td className="px-4 py-3 text-center">batang</td></tr>
                      <tr><td className="px-4 py-3 text-center">4</td><td className="px-4 py-3 font-medium text-gray-800">Mulsa</td><td className="px-4 py-3">Jerami / serasah</td><td className="px-4 py-3 text-right font-medium">250</td><td className="px-4 py-3 text-center">kg</td></tr>
                      <tr><td className="px-4 py-3 text-center">5</td><td className="px-4 py-3 font-medium text-gray-800">Tenaga Kerja</td><td className="px-4 py-3">Kegiatan tanam</td><td className="px-4 py-3 text-right font-medium">10</td><td className="px-4 py-3 text-center">HOK</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tabel Jenis Tanaman */}
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3">Jenis Tanaman yang Direncanakan</h4>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-left text-xs text-gray-600">
                    <thead className="bg-gray-50 border-b border-gray-100 font-bold text-gray-900">
                      <tr>
                        <th className="px-4 py-3 text-center">No</th>
                        <th className="px-4 py-3">Jenis Tanaman</th>
                        <th className="px-4 py-3 text-right">Jumlah (Batang)</th>
                        <th className="px-4 py-3 text-center">Persentase</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr><td className="px-4 py-3 text-center">1</td><td className="px-4 py-3 font-medium text-gray-800">Mahoni (Swietenia macrophylla)</td><td className="px-4 py-3 text-right">200</td><td className="px-4 py-3 text-center">40%</td></tr>
                      <tr><td className="px-4 py-3 text-center">2</td><td className="px-4 py-3 font-medium text-gray-800">Sengon (Falcataria moluccana)</td><td className="px-4 py-3 text-right">150</td><td className="px-4 py-3 text-center">30%</td></tr>
                      <tr><td className="px-4 py-3 text-center">3</td><td className="px-4 py-3 font-medium text-gray-800">Albasia (Paraserianthes falcataria)</td><td className="px-4 py-3 text-right">100</td><td className="px-4 py-3 text-center">20%</td></tr>
                      <tr><td className="px-4 py-3 text-center">4</td><td className="px-4 py-3 font-medium text-gray-800">Pete (Parkia speciosa)</td><td className="px-4 py-3 text-right">50</td><td className="px-4 py-3 text-center">10%</td></tr>
                    </tbody>
                    <tfoot className="bg-gray-50 font-bold text-gray-900 border-t border-gray-200">
                      <tr>
                        <td colSpan={2} className="px-4 py-3 text-right">Total</td>
                        <td className="px-4 py-3 text-right">500</td>
                        <td className="px-4 py-3 text-center">100%</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between sticky bottom-0 rounded-b-2xl">
          <div className="flex items-start gap-2 bg-[#f0f9f3] px-4 py-2.5 rounded-lg border border-[#DCECE0]">
            <HiOutlineInformationCircle className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-900">Keterangan</p>
              <p className="text-[11px] text-emerald-800 mt-0.5">Rencana Penanaman P0 digunakan sebagai data pembanding untuk monitoring periode berikutnya.</p>
            </div>
          </div>
          <button onClick={onClose} className="px-6 py-2 border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors">
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};

export default DetailRencanaPOModal;