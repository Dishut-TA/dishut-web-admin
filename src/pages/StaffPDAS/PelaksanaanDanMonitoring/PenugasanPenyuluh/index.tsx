import React, { useState, useEffect } from 'react';
import { 
  HiOutlineUsers, 
  HiOutlineClipboardDocumentList, 
  HiOutlineCalendarDays, 
  HiOutlineClock,
  HiOutlinePlus,
  HiOutlineArrowDownTray,
  HiOutlineEllipsisVertical,
  HiXMark
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

// ==========================================
// MOCK DATA
// ==========================================
const mockStats = [
  { title: 'Total Penyuluh', value: '24', desc: 'Penyuluh aktif', icon: HiOutlineUsers, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { title: 'Total Penugasan', value: '18', desc: 'Penugasan aktif', icon: HiOutlineClipboardDocumentList, color: 'text-blue-600', bg: 'bg-blue-100' },
  { title: 'Penugasan Selesai', value: '12', desc: 'Selesai bulan ini', icon: HiOutlineCalendarDays, color: 'text-orange-500', bg: 'bg-orange-100' },
  { title: 'Penugasan Mendatang', value: '6', desc: 'Akan datang', icon: HiOutlineClock, color: 'text-purple-600', bg: 'bg-purple-100' },
];

const mockTableData = [
  { id: 1, penyuluh: 'Andi Permana', wilayah: 'DAS Cimanuk', lokasi: 'Hulu DAS Cimanuk', tanggal: '24/06/2025', periode: '20 Mei 2025', status: 'Tugas' },
  { id: 2, penyuluh: 'Siti Nurhaliza', wilayah: 'DAS Citarum', lokasi: 'Hulu DAS Citarum', tanggal: '24/06/2025', periode: '20 Mei 2025', status: 'Tugas' },
  { id: 3, penyuluh: 'Dedi Kurniawan', wilayah: 'DAS Ciujung', lokasi: 'Bandung', tanggal: '24/06/2025', periode: '20 Mei 2025', status: 'Selesai' },
  { id: 4, penyuluh: 'Rina Marlina', wilayah: 'DAS Ciliwung', lokasi: 'Bogor', tanggal: '23/06/2025', periode: '20 Mei 2025', status: 'Selesai' },
  { id: 5, penyuluh: 'Agus Setiawan', wilayah: 'DAS Citarum', lokasi: 'Purwakarta', tanggal: '23/06/2025', periode: '20 Mei 2025', status: 'Dalam Proses' },
  { id: 6, penyuluh: 'Budi Santoso', wilayah: 'DAS Ciujung', lokasi: 'Serang', tanggal: '22/06/2025', periode: '20 Mei 2025', status: 'Selesai' },
];

// ==========================================
// MODAL COMPONENT
// ==========================================
const ModalBuatPenugasan = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Penugasan baru berhasil dibuat!');
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Buat Penugasan Baru</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <HiXMark className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="form-penugasan" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Penyuluh</label>
              <select required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer">
                <option value="">Pilih Penyuluh</option>
                <option value="andi">Andi Permana</option>
                <option value="siti">Siti Nurhaliza</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Pilih Kategori Penugasan</label>
              <select required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer">
                <option value="">Pilih Kategori Penugasan</option>
                <option value="validasi">Validasi</option>
                <option value="pelaksanaan">Pelaksanaan</option>
                <option value="monitoring">Monitoring</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Wilayah PDAS</label>
              <select required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer">
                <option value="">Pilih Wilayah PDAS</option>
                <option value="cimanuk">DAS Cimanuk</option>
                <option value="citarum">DAS Citarum</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Lokasi Penugasan</label>
              <select required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer">
                <option value="">Pilih Lokasi / Kecamatan</option>
                <option value="hulu">Hulu DAS Cimanuk</option>
                <option value="bandung">Bandung</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Tanggal Penugasan</label>
                <input required type="date" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all text-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Periode Validasi</label>
                <input required type="date" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all text-gray-700" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Catatan</label>
              <textarea placeholder="Masukkan catatan penugasan (opsional)" rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all resize-none"></textarea>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
          <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors">
            Batal
          </button>
          <button type="submit" form="form-penugasan" disabled={isLoading} className="px-8 py-2.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-xl transition-all disabled:opacity-70">
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// MAIN COMPONENT
// ==========================================
const PenugasanPenyuluh: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper untuk warna status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Tugas': return 'bg-yellow-100 text-yellow-800';
      case 'Selesai': return 'bg-green-100 text-green-800';
      case 'Dalam Proses': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 px-4 sm:px-0">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Penugasan Penyuluh</h1>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 mb-0.5">{stat.title}</p>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <p className="text-[10px] text-gray-400 mt-1">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* TOOLBAR & FILTERS */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-auto flex-1">
          <select className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#185325] bg-white cursor-pointer">
            <option>Semua Penyuluh</option>
          </select>
          <select className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#185325] bg-white cursor-pointer">
            <option>Semua Wilayah PDAS</option>
          </select>
          <select className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#185325] bg-white cursor-pointer">
            <option>Semua Status</option>
          </select>
          <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#185325] bg-white text-gray-500" />
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
            <HiOutlineArrowDownTray className="w-4 h-4" /> Ekspor
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
          >
            <HiOutlinePlus className="w-4 h-4" strokeWidth={2.5} /> Buat Penugasan Baru
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#DCECE0]/40 text-[#3A4D3F] text-xs font-bold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-center">No</th>
                <th className="px-6 py-4">Penyuluh</th>
                <th className="px-6 py-4">Wilayah PDAS</th>
                <th className="px-6 py-4">Lokasi Penugasan</th>
                <th className="px-6 py-4">Tanggal Penugasan</th>
                <th className="px-6 py-4">Periode Validasi</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockTableData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-center text-sm font-bold text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{item.penyuluh}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.wilayah}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.lokasi}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.tanggal}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.periode}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-md text-[11px] font-bold ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                      <HiOutlineEllipsisVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
          <span className="text-sm text-gray-500">Menampilkan 1 - 6 dari 24 data</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50">&laquo;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#185325] text-white font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">4</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50">&raquo;</button>
          </div>
          <div className="hidden md:block">
            <select className="px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600 outline-none">
              <option>10 / halaman</option>
            </select>
          </div>
        </div>
      </div>

      {/* COMPONENT MODAL */}
      <ModalBuatPenugasan isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
};

export default PenugasanPenyuluh;