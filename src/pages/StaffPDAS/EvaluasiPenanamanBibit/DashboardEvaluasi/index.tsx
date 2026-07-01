import React from 'react';
import {
    HiOutlineCube,
    HiOutlineCheckCircle,
    HiOutlineExclamationTriangle,
    HiOutlineXCircle
} from 'react-icons/hi2';
import EvaluasiStatCard from './components/EvaluasiStatCard';
import PetaKegiatanEvaluasi from './components/PetaKegiatanEvaluasi';
import RingkasanStatus from './components/RingkasanStatus';

const DashboardEvaluasi: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">
                        Dashboard Evaluasi Penanaman
                    </h1>
                    <p className="text-sm text-gray-500">
                        Pantau ringkasan statistik dan sebaran hasil evaluasi keberhasilan tanam.
                    </p>
                </div>
            </div>
            
            {/* Stat Cards dengan Data Tersinkronisasi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                <EvaluasiStatCard
                    title="Total Target Bibit"
                    value="1.354"
                    icon={<HiOutlineCube className="w-6 h-6" />}
                    theme="blue"
                />
                <EvaluasiStatCard
                    title="Total Bibit Hidup"
                    value="1.165"
                    icon={<HiOutlineCheckCircle className="w-6 h-6" />}
                    theme="green"
                />
                <EvaluasiStatCard
                    title="Rata-Rata Persentase Tumbuh"
                    value="87.40%"
                    icon={<HiOutlineExclamationTriangle className="w-6 h-6" />}
                    theme="indigo"
                />
                <EvaluasiStatCard
                    title="Petak Ukur (PU) Gagal"
                    value="4 PU"
                    icon={<HiOutlineXCircle className="w-6 h-6" />}
                    theme="red"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <PetaKegiatanEvaluasi />
                <RingkasanStatus />
            </div>

        </div>
    );
};

export default DashboardEvaluasi;