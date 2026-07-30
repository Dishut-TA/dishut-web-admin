import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiPlus, HiOutlineCloud, HiOutlineCalendarDays } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const CreateLaporanKeuangan = () => {
    const navigate = useNavigate();
    const [isAgreed, setIsAgreed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAgreed) return;
        toast.success("Laporan keuangan berhasil dibuat dan dikirim!");
        navigate(-1);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto pb-20 animate-in fade-in duration-300">
            <div className="flex flex-col gap-4">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors w-fit"
                >
                    <HiOutlineChevronLeft className="w-4 h-4 stroke-2" /> Kembali
                </button>
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Buat Laporan Keuangan</h1>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-10 flex flex-col gap-8">
                <div className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nama Proyek</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] bg-white cursor-pointer shadow-sm">
                            <option value="">Pilih proyek</option>
                            <option value="1">Ekowisata Kebun Stroberi</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Periode</label>
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <input type="text" placeholder="Januari 2026" className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] shadow-sm" />
                                <HiOutlineCalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                            <span className="text-gray-400 font-bold">-</span>
                            <div className="relative flex-1">
                                <input type="text" placeholder="Juni 2026" className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] shadow-sm" />
                                <HiOutlineCalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <h2 className="text-sm font-bold text-gray-800">Transaksi Pendapatan</h2>
                    </div>
                    <button type="button" className="w-fit flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full hover:bg-emerald-100 transition-colors">
                        <HiPlus className="w-3.5 h-3.5" /> Tambah
                    </button>
                    <div className="overflow-x-auto mt-2">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="text-gray-500 font-bold border-b-2 border-gray-200">
                                <tr>
                                    <th className="py-3 pr-4">Tanggal</th>
                                    <th className="py-3 px-4">Keterangan</th>
                                    <th className="py-3 px-4">Nominal</th>
                                    <th className="py-3 pl-4 text-center">Dokumen</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                                <tr>
                                    <td className="py-3 pr-4">01/01/2024</td>
                                    <td className="py-3 px-4">Tiket Masuk</td>
                                    <td className="py-3 px-4">Rp. 25.000.000</td>
                                    <td className="py-3 pl-4 text-center">
                                        <button type="button" className="p-1.5 text-gray-500 hover:text-blue-600 rounded transition-colors"><HiOutlineCloud className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-2">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <h2 className="text-sm font-bold text-gray-800">Transaksi Pengeluaran</h2>
                    </div>
                    <button type="button" className="w-fit flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full hover:bg-emerald-100 transition-colors">
                        <HiPlus className="w-3.5 h-3.5" /> Tambah
                    </button>
                    <div className="overflow-x-auto mt-2">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="text-gray-500 font-bold border-b-2 border-gray-200">
                                <tr>
                                    <th className="py-3 pr-4">Tanggal</th>
                                    <th className="py-3 px-4">Keterangan</th>
                                    <th className="py-3 px-4">Nominal</th>
                                    <th className="py-3 pl-4 text-center">Dokumen</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                                <tr>
                                    <td className="py-3 pr-4">01/01/2024</td>
                                    <td className="py-3 px-4">Perawatan</td>
                                    <td className="py-3 px-4">Rp. 25.000.000</td>
                                    <td className="py-3 pl-4 text-center">
                                        <button type="button" className="p-1.5 text-gray-500 hover:text-blue-600 rounded transition-colors"><HiOutlineCloud className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-[#EBF8F1] border border-[#C6EBD6] rounded-2xl p-6 mt-4 flex flex-col gap-2 shadow-sm text-sm font-bold text-gray-800">
                    <div className="grid grid-cols-[150px_10px_1fr] items-center"><span>Total Pendapatan</span><span>:</span><span>Rp 25.000.000</span></div>
                    <div className="grid grid-cols-[150px_10px_1fr] items-center"><span>Total Pengeluaran</span><span>:</span><span>Rp 10.000.000</span></div>
                    <div className="grid grid-cols-[150px_10px_1fr] items-center mt-2 mb-2"><span>Laba Bersih</span><span>:</span><span>Rp 15.000.000</span></div>
                    
                    <div className="grid grid-cols-[150px_10px_1fr] items-center"><span>Hak KTH 60%</span><span>:</span><span>Rp 9.000.000</span></div>
                    <div className="grid grid-cols-[150px_10px_1fr] items-center"><span>Hak Investor 40%</span><span>:</span><span>Rp 6.000.000</span></div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group mt-2">
                    <input
                        type="checkbox"
                        className="mt-1 appearance-none w-5 h-5 border-2 border-emerald-600 rounded bg-white checked:bg-emerald-600 checked:border-emerald-600 transition-colors cursor-pointer shrink-0 relative flex items-center justify-center after:content-[''] after:absolute after:hidden checked:after:block after:w-1.5 after:h-2.5 after:border-white after:border-r-2 after:border-b-2 after:rotate-45 after:mb-0.5"
                        checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)}
                    />
                    <span className="text-sm font-bold text-gray-700 leading-relaxed">
                        Dengan ini saya menyatakan bahwa laporan dibuat dengan sebenar-benarnya
                    </span>
                </label>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={!isAgreed}
                        className={`px-8 py-3 w-full text-white text-sm font-bold rounded-full transition-all shadow-sm ${
                            isAgreed
                                ? 'bg-[#185325] hover:bg-[#123d1c] cursor-pointer'
                                : 'bg-gray-300 cursor-not-allowed text-gray-500'
                        }`}
                    >
                        Buat Laporan Keuangan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateLaporanKeuangan;