import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineChevronLeft, HiCheck, HiPrinter } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { getProgramApbdByIdAPI } from '@/services/program-apbd.service';
import { getProgramCsrByIdAPI } from '@/services/program-csr.service';

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(angka || 0));
};

const DetailRiwayatRehabilitasi: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Contoh id: "APBD-1" atau "CSR-5"

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (!id) return;

        // Pisahkan prefix (APBD/CSR) dengan ID angka aslinya
        const [source, sourceId] = id.split('-'); 
        let rawData = null;

        if (source === 'APBD') {
          const res = await getProgramApbdByIdAPI(sourceId);
          rawData = res.data || res.payload || res;
          // Normalisasi nama property APBD agar mirip dengan struktur data untuk UI
          setData({
            id: id,
            nama: rawData.nama_program,
            lokasi: rawData.kth?.desa_kelurahan ? `${rawData.kth.desa_kelurahan}, ${rawData.kth.kabupaten_kota}` : '-',
            kth: rawData.kth?.nama,
            pilihan_intervensi: rawData.pilihan_intervensi || '-',
            sumberDana: 'APBD',
            mitra: 'Dinas Kehutanan Jabar',
            luasLahan: `${rawData.target_luas_lahan} Ha`,
            danaDisalurkan: rawData.anggaran,
            danaDirealisasikan: 0, // Karena modul tracking rincian per-tahap belum ada di API, sementara set 0 atau asumsikan lunas jika selesai
            sisaDana: rawData.status === 'Selesai' ? 0 : rawData.anggaran,
            status: rawData.status,
          });
        } else if (source === 'CSR') {
          const res = await getProgramCsrByIdAPI(sourceId);
          rawData = res.data || res.payload || res;
          // Normalisasi nama property CSR
          setData({
            id: id,
            nama: rawData.nama_program,
            lokasi: rawData.lokasi || (rawData.kth?.desa_kelurahan ? `${rawData.kth.desa_kelurahan}, ${rawData.kth.kabupaten_kota}` : '-'),
            kth: rawData.kth?.nama,
            pilihan_intervensi: rawData.rekomendasi_intervensi || '-',
            sumberDana: 'CSR',
            mitra: rawData.rekomendasi_mitra || 'Seluruh Mitra CSR',
            luasLahan: `${rawData.target_luas_lahan} Ha`,
            danaDisalurkan: rawData.anggaran,
            danaDirealisasikan: 0, 
            sisaDana: rawData.status === 'Selesai' ? 0 : rawData.anggaran,
            status: rawData.status,
            catatan: rawData.catatan_staff || rawData.tanggapan_perusahaan
          });
        }
      } catch (error: any) {
        toast.error("Gagal memuat detail riwayat.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const getStatusColor = (status: string) => {
    const lowerStatus = status?.toLowerCase() || '';
    if (lowerStatus.includes('selesai')) return 'text-[#2E7D32]';
    if (lowerStatus.includes('berjalan') || lowerStatus.includes('aktif')) return 'text-orange-500';
    if (lowerStatus.includes('henti') || lowerStatus.includes('tolak')) return 'text-red-600';
    return 'text-gray-800';
  };

  const InfoRow = ({ label, value, isStatus = false }: { label: string, value: string, isStatus?: boolean }) => (
    <div className="grid grid-cols-[160px_20px_1fr] md:grid-cols-[200px_20px_1fr] mb-3 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-500">:</span>
      <span className={`font-semibold ${isStatus ? getStatusColor(value) : 'text-gray-800'}`}>{value}</span>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48 text-[#185325] font-bold">
        <span className="w-6 h-6 border-2 border-[#185325] border-t-transparent rounded-full animate-spin mr-3"></span> 
        Memuat detail program...
      </div>
    );
  }

  if (!data) return <div className="text-center text-gray-500 py-10">Data tidak ditemukan.</div>;

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 text-gray-800 px-4 sm:px-0 animate-in fade-in duration-300">
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
          {data.status === 'Selesai' ? 'Laporan Pendanaan Rehabilitasi' : 'Halaman Detail'}
        </h1>

        <div className="mb-8">
          <h3 className="text-base font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Informasi Program</h3>
          <InfoRow label="ID Program" value={data.id} />
          <InfoRow label="Nama Program" value={data.nama} />
          <InfoRow label="Lokasi" value={data.lokasi} />
          <InfoRow label="KTH Pengusul" value={data.kth} />
          <InfoRow label="Pilihan Intervensi" value={data.pilihan_intervensi} />
          <InfoRow label="Sumber Dana" value={data.sumberDana} />
          <InfoRow label="Mitra CSR" value={data.mitra} />
          <InfoRow label="Luas Lahan" value={data.luasLahan} />
          <InfoRow label="Dana Disalurkan" value={formatRupiah(data.danaDisalurkan)} />
          <InfoRow label="Dana Direalisasikan" value={formatRupiah(data.danaDirealisasikan)} />
          <InfoRow label="Sisa Dana" value={formatRupiah(data.sisaDana)} />
          <InfoRow label="Status" value={data.status} isStatus />
        </div>

        {/* ALASAN DIHENTIKAN / CATATAN */}
        {data.status.toLowerCase().includes('ditolak') && (
          <div className="mb-8">
            <h3 className="text-base font-bold text-red-700 mb-4 border-b border-red-100 pb-2">Alasan Program Ditolak / Dihentikan</h3>
            <p className="text-sm text-gray-700">{data.catatan || 'Program tidak memenuhi target atau ditolak oleh pihak terkait.'}</p>
          </div>
        )}

        {/* TABEL DETAIL & REKAP (Hanya Tampil Jika Status Selesai) */}
        {data.status === 'Selesai' && (
          <>
            {/* Karena rincian tahapan aktualnya diambil dari Laporan Dana, untuk sekarang di-mockup menyesuaikan struktur di desain */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Rekapitulasi Pelaksanaan</h3>
              <table className="w-full text-left text-sm mb-4">
                <thead className="border-y border-gray-200 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="py-3 font-semibold">KEGIATAN</th>
                    <th className="py-3 font-semibold">TANGGAL</th>
                    <th className="py-3 font-semibold">STATUS</th>
                    <th className="py-3 font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-b border-gray-200">
                  <tr>
                    <td className="py-3 text-gray-800">Pelaksanaan Keseluruhan</td>
                    <td className="py-3 text-gray-600">-</td>
                    <td className="py-3 text-[#2E7D32] font-semibold">Selesai</td>
                    <td className="py-3 text-[#2E7D32]"><HiCheck className="w-5 h-5 ml-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-6">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#185325] text-white font-semibold rounded-full hover:bg-[#123d1c] transition-colors active:scale-95 shadow-sm text-sm"
              >
                <HiPrinter className="w-5 h-5" /> Cetak Laporan
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default DetailRiwayatRehabilitasi;