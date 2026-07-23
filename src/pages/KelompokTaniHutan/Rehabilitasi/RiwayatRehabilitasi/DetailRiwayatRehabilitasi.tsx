import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineChevronLeft, HiCheck, HiPrinter } from 'react-icons/hi2';

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
};

const DetailRiwayatRehabilitasi: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const data = useMemo(() => {
    const isSelesai = id === 'CSR-001';
    const isDihentikan = id === 'CSR-002';
    const isBerjalan = id === 'APBD-001';

    return {
      id: id || 'CSR-001',
      nama: 'Rehabilitasi Citarum',
      lokasi: 'Bandung Barat',
      kth: 'KTH Rimba',
      sumberDana: isBerjalan ? 'APBD' : 'CSR',
      mitra: isBerjalan ? 'Dinas Kehutanan Jabar' : 'PT. Alfamart',
      luasLahan: '120 Ha',
      danaDisalurkan: isSelesai ? 75000000 : 100000000,
      danaDirealisasikan: isSelesai ? 75000000 : 80000000,
      sisaDana: isSelesai ? 0 : 20000000,
      status: isSelesai ? 'Selesai' : isDihentikan ? 'Dihentikan' : 'Sedang Berjalan',
      
      tahap1: 'Selesai',
      tahap2: isSelesai ? 'Selesai' : isDihentikan ? 'Program dihentikan pada tahap ini' : 'Selesai',
      tahap3: isSelesai ? 'Selesai' : isDihentikan ? 'Program dihentikan pada tahap ini' : 'Sedang Berjalan',
    };
  }, [id]);

  const getStatusColor = (status: string) => {
    if (status === 'Selesai') return 'text-[#2E7D32]';
    if (status === 'Sedang Berjalan') return 'text-orange-500';
    if (status.includes('dihentikan') || status === 'Dihentikan') return 'text-red-600';
    return 'text-gray-800';
  };

  const InfoRow = ({ label, value, isStatus = false }: { label: string, value: string, isStatus?: boolean }) => (
    <div className="grid grid-cols-[160px_20px_1fr] md:grid-cols-[200px_20px_1fr] mb-3 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-500">:</span>
      <span className={`font-semibold ${isStatus ? getStatusColor(value) : 'text-gray-800'}`}>{value}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 text-gray-800 px-4 sm:px-0">
      <div>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-semibold hover:text-[#2E7D32] transition-colors cursor-pointer"
        >
          <HiOutlineChevronLeft className="w-4 h-4 stroke-2" /> Kembali
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
          {data.status === 'Selesai' ? 'Laporan Riwayat Rehabilitasi' : 'Halaman Detail'}
        </h1>

        <div className="mb-8">
          <h3 className="text-base font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Informasi Program</h3>
          <InfoRow label="ID" value={data.id} />
          <InfoRow label="Nama Program" value={data.nama} />
          <InfoRow label="Lokasi" value={data.lokasi} />
          {data.status === 'Selesai' && <InfoRow label="KTH" value={data.kth} />}
          <InfoRow label="Sumber Dana" value={data.sumberDana} />
          <InfoRow label="Mitra" value={data.mitra} />
          <InfoRow label="Luas Lahan" value={data.luasLahan} />
          <InfoRow label="Dana Disalurkan" value={formatRupiah(data.danaDisalurkan)} />
          <InfoRow label="Dana Direalisasikan" value={formatRupiah(data.danaDirealisasikan)} />
          <InfoRow label="Sisa Dana" value={formatRupiah(data.sisaDana)} />
          <InfoRow label="Status" value={data.status} isStatus />
        </div>

        {/* Progress Tahapan */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Progress Tahapan</h3>
          <InfoRow label="Persiapan Lahan" value={data.tahap1} isStatus />
          <InfoRow label="Pembibitan & Penanaman" value={data.tahap2} isStatus />
          <InfoRow label="Perawatan & Pemeliharaan" value={data.tahap3} isStatus />
        </div>

        {/* ALASAN DIHENTIKAN (Hanya Tampil Jika Status Dihentikan) */}
        {data.status === 'Dihentikan' && (
          <div className="mb-8">
            <h3 className="text-base font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Alasan Program Dihentikan</h3>
            <p className="text-sm text-gray-700">Program tidak memenuhi target rehabilitasi sesuai ketentuan</p>
          </div>
        )}

        {/* TABEL DETAIL & REKAP (Hanya Tampil Jika Status Selesai) */}
        {data.status === 'Selesai' && (
          <>
            {/* Tahap 1 */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Tahap 1 - Persiapan Lahan</h3>
              <table className="w-full text-left text-sm mb-4">
                <thead className="border-y border-gray-200 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="py-3 font-semibold">KEGIATAN</th>
                    <th className="py-3 font-semibold">TANGGAL</th>
                    <th className="py-3 font-semibold">NOMINAL</th>
                    <th className="py-3 font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-b border-gray-200">
                  <tr>
                    <td className="py-3 text-gray-800">Pembersihan Lahan</td>
                    <td className="py-3 text-gray-600">01/01/2024</td>
                    <td className="py-3 text-gray-600">{formatRupiah(8000000)}</td>
                    <td className="py-3 text-[#2E7D32]"><HiCheck className="w-5 h-5 ml-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-800">Pengolahan Tanah</td>
                    <td className="py-3 text-gray-600">01/01/2024</td>
                    <td className="py-3 text-gray-600">{formatRupiah(12000000)}</td>
                    <td className="py-3 text-[#2E7D32]"><HiCheck className="w-5 h-5 ml-auto" /></td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-800 font-bold mb-1">Subtotal Tahap 1</p>
              <p className="text-sm text-gray-600">{formatRupiah(20000000)}</p>
            </div>

            {/* Tahap 2 */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Tahap 2 - Pembibitan & Penanaman</h3>
              <table className="w-full text-left text-sm mb-4">
                <thead className="border-y border-gray-200 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="py-3 font-semibold">KEGIATAN</th>
                    <th className="py-3 font-semibold">TANGGAL</th>
                    <th className="py-3 font-semibold">NOMINAL</th>
                    <th className="py-3 font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-b border-gray-200">
                  <tr>
                    <td className="py-3 text-gray-800">Pembelian Bibit</td>
                    <td className="py-3 text-gray-600">01/01/2024</td>
                    <td className="py-3 text-gray-600">{formatRupiah(25000000)}</td>
                    <td className="py-3 text-[#2E7D32]"><HiCheck className="w-5 h-5 ml-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-800">Penanaman</td>
                    <td className="py-3 text-gray-600">01/01/2024</td>
                    <td className="py-3 text-gray-600">{formatRupiah(15000000)}</td>
                    <td className="py-3 text-[#2E7D32]"><HiCheck className="w-5 h-5 ml-auto" /></td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-800 font-bold mb-1">Subtotal Tahap 2</p>
              <p className="text-sm text-gray-600">{formatRupiah(40000000)}</p>
            </div>

            {/* Tahap 3 */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Tahap 3 - Perawatan & Pemeliharaan</h3>
              <table className="w-full text-left text-sm mb-4">
                <thead className="border-y border-gray-200 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="py-3 font-semibold">KEGIATAN</th>
                    <th className="py-3 font-semibold">TANGGAL</th>
                    <th className="py-3 font-semibold">NOMINAL</th>
                    <th className="py-3 font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-b border-gray-200">
                  <tr>
                    <td className="py-3 text-gray-800">Pemupukan</td>
                    <td className="py-3 text-gray-600">01/01/2024</td>
                    <td className="py-3 text-gray-600">{formatRupiah(10000000)}</td>
                    <td className="py-3 text-[#2E7D32]"><HiCheck className="w-5 h-5 ml-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-800">Pengendalian Gulma</td>
                    <td className="py-3 text-gray-600">01/01/2024</td>
                    <td className="py-3 text-gray-600">{formatRupiah(5000000)}</td>
                    <td className="py-3 text-[#2E7D32]"><HiCheck className="w-5 h-5 ml-auto" /></td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-800 font-bold mb-1">Subtotal Tahap 3</p>
              <p className="text-sm text-gray-600">{formatRupiah(15000000)}</p>
            </div>

            {/* Rekapitulasi & Cetak */}
            <div className="bg-[#DCECE0]/50 rounded-xl p-6 mt-10">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Rekapitulasi</h3>
              <div className="border-b border-gray-300 pb-4 mb-4">
                <InfoRow label="Tahap 1" value={formatRupiah(20000000)} />
                <InfoRow label="Tahap 2" value={formatRupiah(40000000)} />
                <InfoRow label="Tahap 3" value={formatRupiah(15000000)} />
              </div>
              <InfoRow label="Total Realisasi" value={formatRupiah(75000000)} />
              
              <div className="flex justify-end mt-6">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#185325] text-white font-semibold rounded-full hover:bg-[#123d1c] transition-colors active:scale-95 shadow-sm text-sm"
                >
                  <HiPrinter className="w-5 h-5" /> Cetak Laporan
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default DetailRiwayatRehabilitasi;