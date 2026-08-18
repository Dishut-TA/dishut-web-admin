import { 
  HiOutlineClipboardDocumentCheck, HiOutlineBookOpen, HiCheck 
} from 'react-icons/hi2';
import { PANDUAN_LIST, type ValidasiData } from '../data/mockData';

export const PageHeader = () => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-1">Validasi Lokasi Rehabilitasi</h1>
    <p className="text-sm text-gray-500">Lengkapi hasil validasi lokasi berdasarkan penugasan yang diberikan.</p>
  </div>
);

export const InfoItem = ({ icon: Icon, label, value, isBadge, badgeClass }: any) => (
  <div className="flex items-center gap-3">
    <Icon className="w-5 h-5 text-gray-400 shrink-0" />
    <div className="flex-1 flex items-center justify-between">
      <span className="text-sm text-gray-600 w-1/3">{label}</span>
      {isBadge ? (
        <div className="w-2/3">
          <span className={`px-3 py-1.5 text-xs font-bold rounded-md border ${badgeClass}`}>{value}</span>
        </div>
      ) : (
        <input type="text" readOnly value={value} className="w-2/3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none" />
      )}
    </div>
  </div>
);

export const RadioStatus = ({ label, value, current, onChange }: any) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <div className="relative flex items-center justify-center w-5 h-5">
      <input type="radio" name="statusValidasi" value={value} checked={current === value} onChange={onChange} className="peer opacity-0 absolute w-full h-full cursor-pointer" />
      <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-emerald-600"></div>
      <div className="absolute w-2.5 h-2.5 bg-emerald-600 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
    </div>
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

export const SidebarKanan = ({ data }: { data: ValidasiData }) => (
  <div className="w-full lg:w-72 space-y-6">
    {/* Ringkasan Status */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <h3 className="text-xs font-bold text-emerald-700 flex items-center gap-2 mb-5">
        <HiOutlineClipboardDocumentCheck className="w-4 h-4" /> Riwayat Proses Validasi
      </h3>
      <div className="relative pl-3 border-l-2 border-emerald-200 space-y-8 ml-2">
        <div className="relative">
          <div className="absolute -left-5.5 top-0 bg-emerald-600 rounded-full p-0.5"><HiCheck className="w-3 h-3 text-white"/></div>
          <p className="text-[11px] font-bold text-gray-800">Penugasan Diterima</p>
          <p className="text-[9px] text-gray-500 mt-0.5">{data.waktuPenugasan}</p>
        </div>
        <div className="relative">
          <div className="absolute -left-5.5 top-0 rounded-full p-0.5 border-[3px] border-emerald-600 bg-white">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
          </div>
          <p className="text-[11px] font-bold text-emerald-600">Validasi Sedang Dikerjakan</p>
          <p className="text-[9px] text-gray-500 mt-0.5">{data.waktuValidasiMulai || 'Hari ini'}</p>
        </div>
        <div className="relative">
          <div className="absolute -left-5.5 top-0 rounded-full p-1 border border-slate-300 bg-white">
            <div className="w-2 h-2 rounded-full bg-transparent"></div>
          </div>
          <p className="text-[11px] font-medium text-slate-500">Hasil Validasi Dikirim</p>
          <p className="text-[9px] text-slate-400 mt-0.5">—</p>
        </div>
      </div>
    </div>

    {/* Panduan Singkat */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 font-bold text-gray-800 mb-4">
        <HiOutlineBookOpen className="w-5 h-5 text-emerald-600" />
        <h2>Panduan Singkat</h2>
      </div>
      <ul className="space-y-3">
        {PANDUAN_LIST.map((text, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 shrink-0"></div>
            <span className="leading-relaxed">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);