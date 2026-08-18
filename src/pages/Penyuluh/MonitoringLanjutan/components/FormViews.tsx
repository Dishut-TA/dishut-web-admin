import { 
  HiOutlineMapPin, HiOutlineCheckCircle, HiOutlineXCircle, 
  HiOutlineClock, HiOutlinePaperAirplane, 
  HiOutlineArrowLeft, HiCheckCircle
} from 'react-icons/hi2';
import { PiPlant } from 'react-icons/pi';
import { MOCK_REKAP_DATA, MOCK_TABLE_DATA, type MonitoringRow, type ViewMode } from '../constants';

interface BaseProps {
  activeId: string;
  activeProgram: any;
  isTindakLanjut: boolean;
}

export const RekapView = ({ activeId, activeProgram, isTindakLanjut, setViewMode, navigate }: BaseProps & { setViewMode: (v: ViewMode) => void, navigate: any }) => (
  <div className="min-h-screen bg-[#f8faf9] text-gray-800 font-sans w-full pb-24">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-1">
        Review & Kirim Hasil {isTindakLanjut ? 'Penyulaman P2' : `Monitoring ${activeProgram.badge}`}
      </h1>
      <p className="text-sm text-slate-500">Berikut adalah hasil {isTindakLanjut ? 'penyulaman P2' : `monitoring ${activeProgram.badge}`} yang telah Anda input, dikelompokkan per Petak Ukur (PU) sebelum dikirim.</p>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
        <div><p className="text-[10px] text-slate-500 font-medium mb-1">ID Program</p><p className="text-sm font-bold text-slate-900">{activeId}</p></div>
        <div><p className="text-[10px] text-slate-500 font-medium mb-1">Nama Program</p><p className="text-sm font-bold text-slate-900">{activeProgram.nama}</p></div>
        <div><p className="text-[10px] text-slate-500 font-medium mb-1">Sumber Dana</p><p className="text-sm font-bold text-slate-900">APBD</p></div>
        <div>
          <p className="text-[10px] text-slate-500 font-medium mb-1">Periode Monitoring</p>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-bold text-slate-900">{isTindakLanjut ? 'P2 - Tindak Lanjut P2' : activeProgram.periode}</p>
            {!isTindakLanjut && <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-200 rounded text-[10px] font-bold">{activeProgram.badge}</span>}
          </div>
        </div>
        <div><p className="text-[10px] text-slate-500 font-medium mb-1">Lokasi</p><p className="text-sm font-bold text-slate-900 leading-snug whitespace-pre-line">{activeProgram.lokasi}</p></div>
        <div><p className="text-[10px] text-slate-500 font-medium mb-1">Penyuluh</p><p className="text-sm font-bold text-slate-900">Ahmad Fauzi</p></div>
      </div>
      <div className="w-full md:w-[320px] h-32 bg-slate-100 rounded-lg relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600')] bg-cover bg-center border border-slate-200 shrink-0">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h3 className="text-sm font-bold text-[#0F172A] mb-4">Ringkasan {isTindakLanjut ? 'Penyulaman P2' : `Monitoring ${activeProgram.badge}`} (Per PU)</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="border border-slate-100 bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><HiOutlineMapPin className="w-5 h-5" /></div>
          <div><p className="text-[10px] text-slate-500 font-semibold mb-0.5">Total PU</p><h3 className="text-xl font-bold text-slate-900">5</h3></div>
        </div>
        <div className="border border-slate-100 bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><PiPlant className="w-5 h-5" /></div>
          <div><p className="text-[10px] text-slate-500 font-semibold mb-0.5">Total Tanaman</p><h3 className="text-xl font-bold text-slate-900">2.530</h3></div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-sm font-bold text-slate-900">Rekap per PU</h3></div>
      <div className="overflow-x-auto p-4">
        <table className="w-full text-center text-xs">
          <thead className="bg-[#F8FAFC] text-slate-600 font-bold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4 text-left">PU</th><th className="py-3 px-4">Jumlah Tanaman</th><th className="py-3 px-4">Hidup</th>
              <th className="py-3 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {MOCK_REKAP_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 text-left font-bold text-slate-700">{row.pu}</td>
                <td className="py-3 px-4">{row.total}</td>
                <td className="py-3 px-4 text-emerald-600 font-bold">{row.hidup}</td>
                <td className="py-3 px-4 text-center">
                  <button onClick={() => setViewMode('table')} className="px-4 py-1.5 border border-[#008A4B] text-[#008A4B] bg-white rounded font-bold hover:bg-emerald-50 transition-colors text-xs">Tambah Data</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="flex justify-center w-full gap-2 items-center text-center mx-auto z-40">
       <button onClick={() => navigate(-1)} className="px-6 py-2.5 w-full border border-slate-300 text-slate-700 bg-white rounded-full text-center mx-auto text-sm font-bold flex items-center justify-center gap-2 shadow-sm"><HiOutlineArrowLeft className="w-4 h-4" /> Kembali</button>
       <button className="px-6 py-2.5 w-full bg-[#008A4B] text-white rounded-full text-center mx-auto text-sm font-bold flex items-center justify-center gap-2 shadow-sm"><HiOutlinePaperAirplane className="w-4 h-4 -rotate-45" /> Kirim Hasil</button>
    </div>
  </div>
);

export const TableView = ({ handleBackToRekap, handleOpenForm }: BaseProps & { handleBackToRekap: () => void, handleOpenForm: (mode: 'input'|'edit', row: MonitoringRow) => void }) => (
  <div className="min-h-screen bg-[#f8faf9] text-gray-800 font-sans w-full pb-24">
    <div className="mb-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
        Tambah Data PU <span className="px-3 py-1 bg-white border border-blue-200 text-blue-700 text-sm rounded-md font-bold">PU-03</span>
      </h1>
      <button onClick={handleBackToRekap} className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg text-sm font-bold hover:bg-gray-50">
        <HiOutlineArrowLeft className="w-4 h-4" /> Kembali ke Rekap
      </button>
    </div>

    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
          <thead className="bg-gray-50/80 border-b border-gray-200 text-xs font-bold text-gray-900 tracking-wide text-center">
            <tr>
              <th className="px-4 py-4 text-left">No</th>
              <th className="px-4 py-4 text-left">ID Tanaman</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-center">
            {MOCK_TABLE_DATA.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-4 font-bold text-gray-900 text-left">{row.id}</td>
                <td className="px-4 py-4 font-bold text-gray-700 text-left">{row.idTanaman}</td>
                <td className="px-4 py-4">{row.status}</td>
                <td className="px-4 py-4 flex items-center justify-center gap-2">
                  {row.tinggiSaatMonitoring === '-' ? (
                    <button onClick={() => handleOpenForm('input', row)} className="px-3 py-1.5 border border-[#008A4B] text-[#008A4B] bg-white rounded font-bold hover:bg-emerald-50 transition-colors text-[10px]">Input Data</button>
                  ) : (
                    <button onClick={() => handleOpenForm('edit', row)} className="px-4 py-1.5 border border-[#008A4B] text-[#008A4B] bg-white rounded font-bold hover:bg-emerald-50 transition-colors text-[10px]">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export const InputEditView = ({ isEdit, selectedRow, handleBackToTable }: BaseProps & { isEdit: boolean, selectedRow: MonitoringRow | null, handleBackToTable: () => void }) => {
  const title = isEdit ? `Edit Data` : `Input Data`;
  return (
    <div className="min-h-screen bg-[#f8faf9] text-gray-800 font-sans w-full pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          {title} <span className="px-3 py-1 bg-white border border-emerald-200 text-emerald-700 text-sm rounded-md font-bold">PU-03</span>
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-3 gap-5 mb-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">ID Tanaman</label>
            <input type="text" disabled defaultValue={selectedRow?.idTanaman} className="w-full border border-gray-200 bg-gray-50 text-gray-500 rounded-lg p-2.5 text-sm font-medium" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 mb-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Status Tanaman <span className="text-red-500">*</span></label>
            <div className="flex gap-2 h-10.5">
               <button className="flex-1 border border-emerald-500 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 transition-colors"><HiOutlineCheckCircle className="w-4 h-4" /> Hidup</button>
               <button className="flex-1 border border-gray-200 text-gray-500 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 hover:bg-gray-50"><HiOutlineXCircle className="w-4 h-4" /> Mati</button>
            </div>
          </div>
          <div>
             <label className="block text-xs font-bold text-gray-700 mb-1.5">Tinggi <span className="text-red-500">*</span></label>
             <input type="number" defaultValue={isEdit ? '24' : ''} placeholder="cm" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:border-[#008A4B]" />
          </div>
        </div>
      </div>

      <div className="px-6 py-4 flex justify-center gap-2 z-40">
         <button onClick={handleBackToTable} className="px-5 py-2.5 border border-gray-300 text-gray-700 bg-white rounded-full w-full text-sm font-bold hover:bg-gray-50 flex items-center gap-2 justify-center"><HiOutlineArrowLeft className="w-4 h-4" /> Kembali</button>
         <button className="px-8 py-2.5 bg-[#008A4B] text-white rounded-full w-full text-sm font-bold hover:bg-emerald-800 flex items-center justify-center gap-2 shadow-sm"><HiCheckCircle className="w-5 h-5" /> Simpan</button>
      </div>
    </div>
  );
};

export const ReadOnlyView = ({ programStatus, navigate }: BaseProps & { programStatus: string, navigate: any }) => (
  <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans p-6 w-full pb-12">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-slate-900">Detail Hasil Monitoring</h1>
      <button onClick={() => navigate(-1)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 flex items-center gap-2">
        <HiOutlineArrowLeft className="w-4 h-4" /> Kembali
      </button>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start gap-4">
       <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 mt-1"><HiOutlineClock className="w-6 h-6 text-orange-500" /></div>
       <div>
         <h3 className="text-sm font-bold text-slate-500 mb-1">Status Program</h3>
         <h2 className="text-lg font-bold text-orange-600 mb-2">{programStatus}</h2>
         <p className="text-[11px] text-slate-600">Hasil monitoring telah dikirim dan sedang menunggu proses evaluasi.</p>
       </div>
    </div>
  </div>
);