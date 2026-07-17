import {
    HiOutlineHome, HiOutlineChartBar, HiOutlineComputerDesktop,
    HiOutlineGlobeAlt, HiOutlineArchiveBox, HiOutlineBookmark,
    HiOutlineUser, HiOutlineDocumentText, HiOutlineClock,
    HiOutlineChartPie, HiOutlineBanknotes, HiOutlineUsers,
    HiOutlineDocumentChartBar, HiOutlineMap, HiOutlinePresentationChartLine,
    HiOutlineEye, HiOutlineSparkles, HiOutlineMapPin
} from 'react-icons/hi2';
import { ROLES } from '@/utils/roles';
import { canManageAccounts } from '@/utils/rbac';

export const getSidebarMenus = (basePath: string, userRole: string, user: any) => {

    // Global Menu 
    const dashboard = {
        name: 'Dashboard',
        path: `${basePath}/dashboard`,
        icon: <HiOutlineHome className="w-5 h-5" />
    };

    const analisisCPI = {
        name: 'Analisis CPI',
        path: `${basePath}/analisis-cpi`,
        icon: <HiOutlineChartBar className="w-5 h-5" />
    };

    const menuManajemenAkun = {
        id: 'manajemen-akun',
        title: 'Manajemen Akun',
        icon: <HiOutlineUser className="w-5 h-5" />,
        items: [
            { name: 'Data Pengguna', path: `${basePath}/manajemen-akun/data-pengguna` },
            { name: 'Data Peran Pengguna', path: `${basePath}/manajemen-akun/data-peran-pengguna` },
            { name: 'Data Hak Akses', path: `${basePath}/manajemen-akun/data-hak-akses` },
        ],
    };

    const menuMonitoring = {
        id: 'monitoring',
        title: 'Pelaksanaan dan Monitoring Program',
        icon: <HiOutlineComputerDesktop className="w-5 h-5" />,
        items: [
            { name: 'Dashboard Pelaksanaan dan Monitoring', path: `${basePath}/monitoring/dashboard` },
            { name: 'Daftar Kegiatan', path: `${basePath}/monitoring/kegiatan` },
            { name: 'Verifikasi Monitoring', path: `${basePath}/monitoring/verifikasi` },
            { name: 'Rekap Monitoring', path: `${basePath}/monitoring/rekap` },
        ],
    };

    // Staff PDAS
    const staffMenus = {
        single: [dashboard, analisisCPI],
        accordion: [
            {
                id: 'donasi', title: 'Realisasi Bibit dan Donasi', icon: <HiOutlineArchiveBox className="w-5 h-5" />,
                items: [
                    { name: 'Dashboard Program', path: `${basePath}/donasi/dashboard` },
                    { name: 'Data Program', path: `${basePath}/donasi/program` },
                    { name: 'Data Donasi', path: `${basePath}/donasi/donatur` },
                    { name: 'Pelaksanaan Kegiatan', path: `${basePath}/donasi/pelaksanaan-kegiatan` },
                ],
            },
            {
                id: 'rehabilitasi', title: 'Rehabilitasi', icon: <HiOutlineBookmark className="w-5 h-5" />,
                items: [
                    { name: 'Program APBD', path: `${basePath}/rehabilitasi/program-apbd` },
                    { name: 'Validasi CSR', path: `${basePath}/rehabilitasi/program-csr` },
                    { name: 'Verifikasi Dana CSR', path: `${basePath}/rehabilitasi/verifikasi-dana-csr` },
                    { name: 'Monitoring dan Riwayat', path: `${basePath}/rehabilitasi/monitoring-riwayat` },
                ],
            },
            menuMonitoring,
            {
                id: 'evaluasi', title: 'Evaluasi Penanaman Bibit', icon: <HiOutlineGlobeAlt className="w-5 h-5" />,
                items: [
                    { name: 'Dashboard Evaluasi', path: `${basePath}/evaluasi/dashboard` },
                    // { name: 'Data Evaluasi', path: `${basePath}/evaluasi/data` },
                    { name: 'Penugasan Evaluasi', path: `${basePath}/evaluasi/penugasan` },
                    { name: 'Perhitungan Hasil Evaluasi', path: `${basePath}/evaluasi/hasil` },
                    { name: 'Laporan Evaluasi', path: `${basePath}/evaluasi/laporan` },
                    // { name: 'Tugas Masuk', path: `${basePath}/evaluasi/tugas-masuk` },
                ],
            },
            ...(canManageAccounts(user) ? [menuManajemenAkun] : [])
        ]
    };

    // Kabid PDAS & SUPERADMIN
    const kabidDanSuperadminMenus = {
        single: [dashboard, analisisCPI],
        accordion: [
            {
                id: 'donasi', title: 'Realisasi Bibit dan Donasi', icon: <HiOutlineArchiveBox className="w-5 h-5" />,
                items: [
                    { name: 'Dashboard Program', path: `${basePath}/donasi/dashboard` },
                    { name: 'Data Program', path: `${basePath}/donasi/program` },
                ],
            },
            {
                id: 'rehabilitasi', title: 'Rehabilitasi', icon: <HiOutlineBookmark className="w-5 h-5" />,
                items: [
                    { name: 'Program APBD', path: `${basePath}/rehabilitasi/program-apbd` },
                    { name: 'Validasi CSR', path: `${basePath}/rehabilitasi/validasi-csr` },
                    { name: 'Verifikasi Dana CSR', path: `${basePath}/rehabilitasi/verifikasi-dana-csr` },
                    { name: 'Riwayat Keputusan Validasi', path: `${basePath}/rehabilitasi/riwayat-keputusan` },
                ],
            },
            menuMonitoring,
            {
                id: 'evaluasi', title: 'Evaluasi Penanaman Bibit', icon: <HiOutlineGlobeAlt className="w-5 h-5" />,
                items: [
                    { name: 'Penugasan Evaluasi', path: `${basePath}/evaluasi/penugasan` },
                    { name: 'Validasi Data Evaluasi', path: `${basePath}/evaluasi/validasi-evaluasi` },
                    // { name: 'Verifikasi Laporan', path: `${basePath}/evaluasi/verifikasi-laporan` },
                    { name: 'Laporan Evaluasi', path: `${basePath}/evaluasi/laporan` },
                ],
            },
            ...(userRole === ROLES.KABID || canManageAccounts(user) ? [menuManajemenAkun] : [])
        ]
    };

    // CSR
    const csrMenus = {
        single: [
            dashboard,
            { name: 'Tinjau Proposal', path: `${basePath}/tinjau-proposal`, icon: <HiOutlineDocumentText className="w-5 h-5" /> },
            { name: 'Riwayat Proposal', path: `${basePath}/riwayat-proposal`, icon: <HiOutlineClock className="w-5 h-5" /> },
            { name: 'Monitoring Proyek', path: `${basePath}/monitoring-proyek`, icon: <HiOutlineChartPie className="w-5 h-5" /> },
            { name: 'Laporan Keuangan', path: `${basePath}/laporan-keuangan`, icon: <HiOutlineChartPie className="w-5 h-5" /> },
        ],
        accordion: []
    };

    // STAFF BUPM & KABID BUPM
    const bupmMenus = {
        single: [
            dashboard,
            { name: 'Data Investasi', path: `${basePath}/data-investasi`, icon: <HiOutlineBanknotes className="w-5 h-5" /> },
            { name: 'Data Investor', path: `${basePath}/data-investor`, icon: <HiOutlineUsers className="w-5 h-5" /> },
            { name: 'Laporan Proyek', path: `${basePath}/laporan-proyek`, icon: <HiOutlineDocumentChartBar className="w-5 h-5" /> },
        ],
        accordion: []
    };

    // PENYULUH
    const penyuluhMenus = {
        single: [
            dashboard,
            { name: 'Validasi Lokasi', path: `${basePath}/validasi-lokasi`, icon: <HiOutlineMapPin className="w-5 h-5" /> },
            { name: 'Pelaksanaan Penanaman', path: `${basePath}/pelaksanaan-penanaman`, icon: <HiOutlineSparkles className="w-5 h-5" /> },
            { name: 'Monitoring Lanjutan', path: `${basePath}/monitoring-lanjutan`, icon: <HiOutlineEye className="w-5 h-5" /> },
        ],
        accordion: []
    };

    // KELOMPOK TANI HUTAN (KTH)
    const kthMenus = {
        single: [dashboard],
        accordion: [
            {
                id: 'rehabilitasi-kth', title: 'Rehabilitasi', icon: <HiOutlineMap className="w-5 h-5" />,
                items: [
                    { name: 'Pendanaan CSR', path: `${basePath}/rehabilitasi/pendanaan-csr` },
                    { name: 'Pendanaan APBD', path: `${basePath}/rehabilitasi/pendanaan-apbd` },
                    // { name: 'Riwayat Pengajuan', path: `${basePath}/rehabilitasi/riwayat-pengajuan` },
                    { name: 'Update Progres', path: `${basePath}/rehabilitasi/update-progres` },
                    { name: 'Laporan Dana', path: `${basePath}/rehabilitasi/laporan-dana` },
                ],
            },
            {
                id: 'investasi-kth', title: 'Investasi', icon: <HiOutlinePresentationChartLine className="w-5 h-5" />,
                items: [
                    { name: 'Data Investasi', path: `${basePath}/investasi/data` },
                    { name: 'Persetujuan Investor', path: `${basePath}/investasi/persetujuan` },
                    { name: 'Data Investor', path: `${basePath}/investasi/investor` },
                    { name: 'Laporan Proyek', path: `${basePath}/investasi/laporan-proyek` },
                ],
            },
            {
                id: 'laporan-investasi-kth', title: 'Laporan Investasi', icon: <HiOutlineChartPie className="w-5 h-5" />,
                items: [
                    { name: 'Laporan Usaha', path: `${basePath}/laporan-investasi/usaha` },
                    { name: 'Laporan Keuangan', path: `${basePath}/laporan-investasi/keuangan` },
                    { name: 'Biaya Pengeluaran', path: `${basePath}/laporan-investasi/pengeluaran` },
                    { name: 'Biaya Pemasukan', path: `${basePath}/laporan-investasi/pemasukan` },
                ],
            },
        ]
    };

    const MENU_MAP: Record<string, { single: any[], accordion: any[] }> = {
        [ROLES.STAFF]: staffMenus,
        [ROLES.KABID]: kabidDanSuperadminMenus,
        [ROLES.SUPERADMIN]: kabidDanSuperadminMenus,
        [ROLES.CSR]: csrMenus,
        [ROLES.STAFFBUPM]: bupmMenus,
        [ROLES.KABIDBUPM]: bupmMenus,
        [ROLES.PENYULUH]: penyuluhMenus,
        [ROLES.KTH]: kthMenus,
    };

    return MENU_MAP[userRole] || MENU_MAP[ROLES.STAFF];
};