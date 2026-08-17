import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import DetailDonaturModal from './components/DetailDonaturModal';
import DonasiToolbar from './components/DonasiToolbar';
import DonasiTable from './components/DonasiTable';
import type { DonaturData } from '@/utils/interface';
import { getDonationsAPI, updateDonationStatusAPI } from '@/services/donasi.service';
import VerifikasiDonaturModal from './components/VerifikasiDonaturModal';

const formatDonationData = (item: any): DonaturData => {
  const spec = item.seed?.specifications?.[0];
  const harga = spec ? Number(spec.price) : 0;

  return {
    id: item.id,
    idTransaksi: `TRX-${item.donor_id}`,
    idDonasi: `DNS-${item.id}`,
    namaDonatur: item.donor?.donor_name || 'Hamba Allah',
    program: item.donation_program?.name || 'Program Umum',
    jumlahBibit: item.seed_quantity || 0,
    status: item.seed_status || 'Menunggu Verifikasi',
    tanggalDonasi: item.created_at,
    proof_url: item.proof_url,
    rincianBibit: [{
      nama: item.seed?.nama || item.seed?.name || 'Bibit',
      jumlah: item.seed_quantity || 0,
      hargaSatuan: harga
    }],
  };
};

const DataDonasi: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [donationsData, setDonationsData] = useState<DonaturData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalDetail, setModalDetail] = useState<DonaturData | null>(null);
  const [modalVerif, setModalVerif] = useState<DonaturData | null>(null);
  // const [delete, setDelete] = useState<DonaturData | null>(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    setIsLoading(true);
    try {
      const response = await getDonationsAPI();
      const rawData = response.data || response.payload || [];
      const arrayData = Array.isArray(rawData) ? rawData : [rawData].filter(Boolean);
      
      setDonationsData(arrayData.map(formatDonationData));
    } catch (error: any) {
      toast.error('Gagal memuat data donasi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAction = async (status: 'Terkumpul' | 'Ditolak') => {
    if (!modalVerif) return;
    try {
      await updateDonationStatusAPI(modalVerif.id, status);
      toast.success(status === 'Terkumpul' ? "Donasi berhasil diverifikasi!" : "Donasi ditolak.");
      setModalVerif(null);
      fetchDonations(); 
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Gagal memproses donasi.`);
    }
  };

  const filteredData = donationsData.filter(donatur => 
    donatur.idTransaksi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donatur.namaDonatur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    console.log("tes hapus")
  }

  return (
    <div className="relative flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      
      <DonasiToolbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      <DonasiTable 
        data={filteredData} 
        isLoading={isLoading} 
        onVerify={(donatur) => setModalVerif(donatur)} 
        onViewDetail={(donatur) => setModalDetail(donatur)} 
        onDelete={() => handleDelete()}
      />

      <DetailDonaturModal 
        isOpen={modalDetail !== null}
        onClose={() => setModalDetail(null)}
        donatur={modalDetail}
      />

      <VerifikasiDonaturModal
        isOpen={modalVerif !== null}
        onClose={() => setModalVerif(null)}
        donatur={modalVerif}
        onTerima={() => handleVerifyAction('Terkumpul')}
        onTolak={() => handleVerifyAction('Ditolak')}
      />

    </div>
  );
};

export default DataDonasi;