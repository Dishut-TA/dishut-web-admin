import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import CustomToaster from "./components/CustomToaster";
import PageLoader from "./components/PageLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/RoleGuard";
import { ROLE_REDIRECTS, ROLES } from "./utils/roles";
import DashboardKTH from "./pages/KelompokTaniHutan/Dashboard";
import DashboardCSR from "./pages/CSR/DashboardCSR";
import TinjauProposal from "./pages/CSR/TinjauProposal";
import DetailTinjauProposal from "./pages/CSR/TinjauProposal/DetailTinjauProposal";
import RiwayatProposal from "./pages/CSR/RiwayatProposal";
import MonitoringProyek from "./pages/CSR/MonitoringProyek";
import DashboardStaffBUPM from "./pages/StaffBUPM/Dashboard";
import DataInvestasi from "./pages/StaffBUPM/DataInvestasi";
import DetailInvestasi from "./pages/StaffBUPM/DataInvestasi/DetailInvestasi";
import DataInvestorIndex from "./pages/StaffBUPM/DataInvestor";
import DetailInvestor from "./pages/StaffBUPM/DataInvestor/DetailInvestor";
import LaporanProyekIndex from "./pages/StaffBUPM/LaporanProyek";
import DashboardKABIDBUPM from "./pages/KepalaBidangBUPM/Dashboard";
import DataInvestasiKABIDBUPM from "./pages/KepalaBidangBUPM/DataInvestasi";
import DetailInvestasiKABIDBUPM from "./pages/KepalaBidangBUPM/DataInvestasi/DetailInvestasiKABIDBUPM";
import DataInvestorIndexKABIDBUPM from "./pages/KepalaBidangBUPM/DataInvestor";
import DetailInvestorKABIDBUPM from "./pages/KepalaBidangBUPM/DataInvestor/DetailInvestor";
import LaporanProyekIndexKABIDBUPM from "./pages/KepalaBidangBUPM/LaporanProyek";
import AjukanProgramCSR from "./pages/KelompokTaniHutan/Rehabilitasi/PendanaanCSR/AjukanProgramCSR";
import RiwayatPengajuan from "./pages/KelompokTaniHutan/Rehabilitasi/RiwayatPengajuan";
import UpdateProgres from "./pages/KelompokTaniHutan/Rehabilitasi/UpdateProgress";
import DataInvestasiKTH from "./pages/KelompokTaniHutan/DataInvestasiKTH/DataInvestasi";
import CreateInvestasi from "./pages/KelompokTaniHutan/DataInvestasiKTH/Create";
import PersetujuanInvestasi from "./pages/KelompokTaniHutan/InvestasiKTH/PersetujuanInvestasi";
import DetailPersetujuan from "./pages/KelompokTaniHutan/InvestasiKTH/PersetujuanInvestasi/DetailPersetujuan";
import DataInvestorIndexKTH from "./pages/KelompokTaniHutan/DataInvestorKTH";
import DetailInvestorKTH from "./pages/KelompokTaniHutan/DataInvestorKTH/DetailInvestor";
import LaporanProyekIndexKTH from "./pages/KelompokTaniHutan/InvestasiKTH/LaporanProyekKTH";
import CreateLaporanProyek from "./pages/KelompokTaniHutan/InvestasiKTH/LaporanProyekKTH/CreateLaporanProyek";
import CreateLaporanUsaha from "./pages/KelompokTaniHutan/InvestasiKTH/LaporanInvestasi/LaporanUsaha/CreateLaporanUsaha";
import LaporanUsaha from "./pages/KelompokTaniHutan/InvestasiKTH/LaporanInvestasi/LaporanUsaha";
import LaporanKeuangan from "./pages/KelompokTaniHutan/InvestasiKTH/LaporanInvestasi/LaporanKeuangan";
import CreateLaporanKeuangan from "./pages/KelompokTaniHutan/InvestasiKTH/LaporanInvestasi/LaporanKeuangan/CreateLaporanKeuangan";
import CreateLaporanBiayaPengeluaran from "./pages/KelompokTaniHutan/InvestasiKTH/LaporanInvestasi/LaporanBiayaPengeluaran/CreateLaporanBiayaPengeluaran";
import BiayaPengeluaranIndex from "./pages/KelompokTaniHutan/InvestasiKTH/LaporanInvestasi/LaporanBiayaPengeluaran";
import BiayaPemasukanIndex from "./pages/KelompokTaniHutan/InvestasiKTH/LaporanInvestasi/LaporanBiayaPemasukan";
import BiayaPemasukanCreate from "./pages/KelompokTaniHutan/InvestasiKTH/LaporanInvestasi/LaporanBiayaPemasukan/CreateBiayaPemasukan";
import DetailVerifikasiDanaCSRKABID from "./pages/KepalaBidangPDAS/VerifikasiDanaCSR/DetailVerifikasiDanaCSRKKABID";
import VerifikasiDanaCSRKABID from "./pages/KepalaBidangPDAS/VerifikasiDanaCSR";
import VerifikasiDanaCSR from "./pages/StaffPDAS/Investasi/VerifikasiDanaCSRSTAFF";
import DetailVerifikasiDanaCSR from "./pages/StaffPDAS/Investasi/VerifikasiDanaCSRSTAFF/DetailVerifikasiDanaCSR";
import LaporanKeuanganIndex from "./pages/CSR/LaporanKeuanganCSR";
import DetailLaporanKeuangan from "./pages/CSR/LaporanKeuanganCSR/DetailLaporanKeuanganCSR";
import LaporanDanaIndex from "./pages/KelompokTaniHutan/InvestasiKTH/LaporanDana";
import CreateLaporanDana from "./pages/KelompokTaniHutan/InvestasiKTH/LaporanDana/CreateLaporanDana";
import DetailLaporanDana from "./pages/KelompokTaniHutan/InvestasiKTH/LaporanDana/DetailLaporanDana";
import ValidasiLokasi from "./pages/Penyuluh/ValidasiLokasi";
import CreateValidasi from "./pages/Penyuluh/ValidasiLokasi/CreateValidasi";
import DashboardPenyuluh from "./pages/Penyuluh/Dashboard";
import PelaksanaanPenanamanIndex from "./pages/Penyuluh/PelaksanaanPenanaman";
import InputProgresPage from "./pages/Penyuluh/PelaksanaanPenanaman/CreateProgress";
import MonitoringLanjutanIndex from "./pages/Penyuluh/MonitoringLanjutan";
import FormMonitoringPage from "./pages/Penyuluh/MonitoringLanjutan/FormMonitoringPage";
import DetailInvestasiKTH from "./pages/KelompokTaniHutan/DataInvestasiKTH/DetailInvestasiKTH";
import InputEvaluasi from "./pages/StaffPDAS/EvaluasiPenanamanBibit/Penugasan/InputEvaluasi";
import CreateInisiasiPenugasanEvaluasiKABID from "./pages/KepalaBidangPDAS/EvaluasiPenanamanBibit/InisiasiPenugasanEvaluasi/CreateInisiasiPenugasanEvaluasiKABID";
import DataEvaluasiIndex from "./pages/StaffPDAS/EvaluasiPenanamanBibit/DataEvaluasi/DataEvaluasiIndex";
import DraftLaporanIndividu from "./pages/StaffPDAS/EvaluasiPenanamanBibit/DataEvaluasi/DraftLaporanIndividu";
import PenugasanEvaluasiSTAFFPDAS from "./pages/StaffPDAS/EvaluasiPenanamanBibit/Penugasan";
// import CreatePengesahanLaporanKabid from "./pages/KepalaBidangPDAS/EvaluasiPenanamanBibit/LaporanEvaluasi/CreatePengesahanLaporanKabid";
// import PengesahanLaporanKABID from "./pages/KepalaBidangPDAS/EvaluasiPenanamanBibit/LaporanEvaluasi";
import CreatePenugasanEvaluasiStaffPDAS from "./pages/StaffPDAS/EvaluasiPenanamanBibit/Penugasan/InputEvaluasi";
import InisiasiPenugasanEvaluasiKABID from "./pages/KepalaBidangPDAS/EvaluasiPenanamanBibit/InisiasiPenugasanEvaluasi";
import DetailInisiasiPenugasan from "./pages/KepalaBidangPDAS/EvaluasiPenanamanBibit/InisiasiPenugasanEvaluasi/DetailInisiasiPenugasanEvaluasiKABID";
import PerhitunganHasilEvaluasiStaff from "./pages/StaffPDAS/EvaluasiPenanamanBibit/PerhitunganHasilEvaluasi";
import DetailPerhitunganHasilEvaluasiStaff from "./pages/StaffPDAS/EvaluasiPenanamanBibit/PerhitunganHasilEvaluasi/DetailPerhitunganHasilEvaluasiStaff";
import ValidasiDataEvaluasiKABID from "./pages/KepalaBidangPDAS/EvaluasiPenanamanBibit/ValidasiDataEvaluasi";
import DetailEvaluasiDataEvaluasiKABID from "./pages/KepalaBidangPDAS/EvaluasiPenanamanBibit/ValidasiDataEvaluasi/DetailValidasiDataEvaluasiKABID";
import LaporanEvaluasiStaffPDAS from "./pages/StaffPDAS/EvaluasiPenanamanBibit/LaporanEvaluasiStaffPDAS";
import CreateLaporanEvaluasiStaffPDAS from "./pages/StaffPDAS/EvaluasiPenanamanBibit/LaporanEvaluasiStaffPDAS/CreateLaporanEvaluasiStaffPDAS";
import LaporanEvaluasiKABID from "./pages/KepalaBidangPDAS/EvaluasiPenanamanBibit/LaporanEvaluasi/LaporanEvaluasiKABID";
import PengesahanLaporanEvaluasiKabid from "./pages/KepalaBidangPDAS/EvaluasiPenanamanBibit/LaporanEvaluasi/PengesahanLaporanEvaluasiKabid";
import PendanaanCSR from "./pages/KelompokTaniHutan/Rehabilitasi/PendanaanCSR";
import PendanaanAPBD from "./pages/KelompokTaniHutan/Rehabilitasi/PendanaanAPBD";
import IndexBibit from "./pages/StaffPDAS/RealisasiBibitDonasi/Bibit";
import CreateBibit from "./pages/StaffPDAS/RealisasiBibitDonasi/Bibit/CreateBibit";
import DetailBibit from "./pages/StaffPDAS/RealisasiBibitDonasi/Bibit/DetailBibit";
import PenugasanPenyuluh from "./pages/StaffPDAS/PelaksanaanDanMonitoring/PenugasanPenyuluh";
import HasilValidasiPenyuluh from "./pages/StaffPDAS/PelaksanaanDanMonitoring/HasilValidasiPenyuluh";
import DetailHasilValidasi from "./pages/StaffPDAS/PelaksanaanDanMonitoring/HasilValidasiPenyuluh/DetailHasilValidasi";
import ProsesValidasiPenyuluh from "./pages/StaffPDAS/PelaksanaanDanMonitoring/HasilValidasiPenyuluh/ProsesHasilValidasiPenyuluh";
const Login = lazy(() => import("./pages/Authentication/Login"));
const DashboardLayout = lazy(() => import("./components/layout/DashboardLayout"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Staff PDAS Import
const DashboardStaffPDAS = lazy(() => import("./pages/StaffPDAS/DashboardStaffPDAS"));
const ProgramAPBDList = lazy(() => import("./pages/StaffPDAS/Investasi/ProgramAPBD"));
const CreateProgramAPBD = lazy(() => import("./pages/StaffPDAS/Investasi/ProgramAPBD/CreateProgram"));
const ProgramCSRList = lazy(() => import("./pages/StaffPDAS/Investasi/ProgramCSR"));
const VerifikasiBerkasCSR = lazy(() => import("./pages/StaffPDAS/Investasi/ProgramCSR/VerifikasiBerkas"));
const MonitoringRiwayatList = lazy(() => import("./pages/StaffPDAS/Investasi/MonitoringRiwayat"));
// const CreateEvaluasi = lazy(() => import("./pages/StaffPDAS/EvaluasiPenanamanBibit/DataEvaluasi/CreateEvaluasi"));
const StaffTugasEvaluasi = lazy(() => import("./pages/StaffPDAS/EvaluasiPenanamanBibit/TugasMasuk"));
const AnalisisLahanKritis = lazy(() => import("./pages/StaffPDAS/AnalisisLahanKritis"));
const DashboardMonitoring = lazy(() => import("./pages/StaffPDAS/PelaksanaanDanMonitoring/DashboardMonitoring"));
const DaftarKegiatan = lazy(() => import("./pages/StaffPDAS/PelaksanaanDanMonitoring/DaftarKegiatan"));
const VerifikasiMonitoring = lazy(() => import("./pages/StaffPDAS/PelaksanaanDanMonitoring/VerifikasiMonitoring"));
const RekapMonitoring = lazy(() => import("./pages/StaffPDAS/PelaksanaanDanMonitoring/RekapMonitoring"));
const DashboardEvaluasi = lazy(() => import("./pages/StaffPDAS/EvaluasiPenanamanBibit/DashboardEvaluasi"));
// const DataEvaluasi = lazy(() => import("./pages/StaffPDAS/EvaluasiPenanamanBibit/DataEvaluasi"));
const DashboardProgramStaff = lazy(() => import("./pages/StaffPDAS/RealisasiBibitDonasi/Dashboard"));
const ProgramDonasiStaff = lazy(() => import("./pages/StaffPDAS/RealisasiBibitDonasi/ProgramDonasi"));
const CreateProgram = lazy(() => import("./pages/StaffPDAS/RealisasiBibitDonasi/ProgramDonasi/CreateProgram"));
const DataDonatur = lazy(() => import("./pages/StaffPDAS/RealisasiBibitDonasi/DataDonatur"));
const PelaksanaanKegiatan = lazy(() => import("./pages/StaffPDAS/RealisasiBibitDonasi/PelaksanaanKegiatan"));
const PelaporanData = lazy(() => import("./pages/StaffPDAS/RealisasiBibitDonasi/PelaporanData"));

// Kabid Import
const DashboardKabid = lazy(() => import("./pages/KepalaBidangPDAS/DashboardKABID"));
const DashhboardProgramKabid = lazy(() => import("./pages/KepalaBidangPDAS/RealisasiBibitDonasi/DashboardProgramKabid"));
const DataProgramKabid = lazy(() => import("./pages/KepalaBidangPDAS/RealisasiBibitDonasi/DataProgram"));
const DataPengguna = lazy(() => import("./pages/KepalaBidangPDAS/ManajemenAkun/DataPengguna"));
const DetailPengguna = lazy(() => import("./pages/KepalaBidangPDAS/ManajemenAkun/DataPengguna/DetailPengguna"));
const DataPeranPengguna = lazy(() => import("./pages/KepalaBidangPDAS/ManajemenAkun/DataPeranPengguna"));
const DetailRole = lazy(() => import("./pages/KepalaBidangPDAS/ManajemenAkun/DataPeranPengguna/components/DetailRole"));
const DataHakAkses = lazy(() => import("./pages/KepalaBidangPDAS/ManajemenAkun/DataHakAkses"));
const DetailHakAkses = lazy(() => import("./pages/KepalaBidangPDAS/ManajemenAkun/DataHakAkses/components/DetailHakAkses"));
// const KabidVerifikasiBAP = lazy(() => import("./pages/KepalaBidangPDAS/EvaluasiPenanamanBibit/VerifikasiLaporan"));
// const KabidPenugasan = lazy(() => import("./pages/KepalaBidangPDAS/EvaluasiPenanamanBibit/Penugasan"));
const DaftarUsulanAPBD = lazy(() => import("./pages/KepalaBidangPDAS/Investasi/ProgramUsulanAPBDKABID"));
const VerifikasiAPBD = lazy(() => import("./pages/KepalaBidangPDAS/Investasi/ProgramUsulanAPBDKABID/VerifikasiAPBD"));
const DaftarUsulanCSR = lazy(() => import("./pages/KepalaBidangPDAS/Investasi/ProgramCSRKABID/Index"));
const VerifikasiCSR = lazy(() => import("./pages/KepalaBidangPDAS/Investasi/ProgramCSRKABID/VerifikasiCSR"));
const RiwayatKeputusan = lazy(() => import("./pages/KepalaBidangPDAS/Investasi/RiwayatKeputusan"));

const RoleBasedRedirect = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return <Navigate to="/admin/login" replace />;

  try {
    const userData = JSON.parse(userStr);
    const roleName = userData?.peran?.[0]?.nama?.trim().toLowerCase();

    return <Navigate to={ROLE_REDIRECTS[roleName] || "/admin/login"} replace />;
  } catch (e) {
    return <Navigate to="/admin/login" replace />;
  }
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<RoleBasedRedirect />} />
              <Route path="profile" element={<Profile />} />

              {/* Staff PDAS */}
              <Route element={<RoleGuard allowedRoles={[ROLES.STAFF]} />}>
                <Route path="staff">
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardStaffPDAS />} />

                  {/* CPI */}
                  <Route path="analisis-cpi" element={<AnalisisLahanKritis />} />

                  {/* Donasi */}
                  <Route path="donasi/bibit" element={<IndexBibit />} />
                  <Route path="donasi/bibit/create" element={<CreateBibit />} />
                  <Route path="donasi/bibit/detail/:id" element={<DetailBibit />} />
                  <Route path="donasi/dashboard" element={<DashboardProgramStaff />} />
                  <Route path="donasi/program" element={<ProgramDonasiStaff />} />
                  <Route path="donasi/program/create" element={<CreateProgram />} />
                  <Route path="donasi/donatur" element={<DataDonatur />} />
                  <Route path="donasi/pelaksanaan-kegiatan" element={<PelaksanaanKegiatan />} />
                  <Route path="donasi/pelaporan-data" element={<PelaporanData />} />

                  {/* Rehabilitasi / Investasi */}
                  <Route path="rehabilitasi/program-apbd" element={<ProgramAPBDList />} />
                  <Route path="rehabilitasi/program-apbd/create" element={<CreateProgramAPBD />} />
                  <Route path="rehabilitasi/program-csr" element={<ProgramCSRList />} />
                  <Route path="rehabilitasi/program-csr/verifikasi/:id" element={<VerifikasiBerkasCSR />} />
                  <Route path="rehabilitasi/verifikasi-dana-csr" element={<VerifikasiDanaCSR />} />
                  <Route path="rehabilitasi/verifikasi-dana-csr/detail/:id" element={<DetailVerifikasiDanaCSR />} />
                  <Route path="rehabilitasi/monitoring-riwayat" element={<MonitoringRiwayatList />} />

                  {/* Monitoring */}
                  <Route path="monitoring/dashboard" element={<DashboardMonitoring />} />
                  <Route path="monitoring/penugasan-penyuluh" element={<PenugasanPenyuluh />} />
                  <Route path="monitoring/hasil-validasi-penyuluh/" element={<HasilValidasiPenyuluh />} />
                  <Route path="monitoring/hasil-validasi-penyuluh/detail/:id" element={<DetailHasilValidasi />} />
                  <Route path="monitoring/hasil-validasi-penyuluh/proses/:id" element={<ProsesValidasiPenyuluh />} />
                  <Route path="monitoring/kegiatan" element={<DaftarKegiatan />} />
                  <Route path="monitoring/verifikasi" element={<VerifikasiMonitoring />} />
                  <Route path="monitoring/rekap" element={<RekapMonitoring />} />

                  {/* Evaluasi */}
                  <Route path="evaluasi/dashboard" element={<DashboardEvaluasi />} />
                  <Route path="evaluasi/data" element={<DataEvaluasiIndex />} />
                  <Route path="evaluasi/hasil" element={<PerhitunganHasilEvaluasiStaff />} />
                  <Route path="evaluasi/hasil/detail/:id" element={<DetailPerhitunganHasilEvaluasiStaff />} />
                  <Route path="evaluasi/data/create/:id" element={<InputEvaluasi />} />
                  <Route path="evaluasi/laporan" element={<LaporanEvaluasiStaffPDAS />} />
                  <Route path="evaluasi/laporan/create/:id" element={<CreateLaporanEvaluasiStaffPDAS />} />
                  <Route path="evaluasi/laporan-individu" element={<DraftLaporanIndividu />} />
                  <Route path="evaluasi/penugasan" element={<PenugasanEvaluasiSTAFFPDAS />} />
                  <Route path="evaluasi/penugasan/create/:id" element={<CreatePenugasanEvaluasiStaffPDAS />} />
                  <Route path="evaluasi/tugas-masuk" element={<StaffTugasEvaluasi />} />
                </Route>
              </Route>

              {/* KABID PDAS */}
              <Route element={<RoleGuard allowedRoles={[ROLES.KABID, ROLES.SUPERADMIN]} />}>
                <Route path="kabid">
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardKabid />} />

                  <Route path="analisis-cpi" element={<AnalisisLahanKritis />} />

                  <Route path="donasi/dashboard" element={<DashhboardProgramKabid />} />
                  <Route path="donasi/program" element={<DataProgramKabid />} />

                  <Route path="rehabilitasi/program-apbd" element={<DaftarUsulanAPBD />} />
                  <Route path="rehabilitasi/program-apbd/verifikasi/:id" element={<VerifikasiAPBD />} />
                  <Route path="rehabilitasi/validasi-csr" element={<DaftarUsulanCSR />} />
                  <Route path="rehabilitasi/validasi-csr/verifikasi/:id" element={<VerifikasiCSR />} />
                  <Route path="rehabilitasi/verifikasi-dana-csr" element={<VerifikasiDanaCSRKABID />} />
                  <Route path="rehabilitasi/verifikasi-dana-csr/detail/:id" element={<DetailVerifikasiDanaCSRKABID />} />
                  <Route path="rehabilitasi/riwayat-keputusan" element={<RiwayatKeputusan />} />

                  <Route path="evaluasi/penugasan" element={<InisiasiPenugasanEvaluasiKABID />} />
                  <Route path="evaluasi/penugasan/create" element={<CreateInisiasiPenugasanEvaluasiKABID />} />
                  <Route path="evaluasi/penugasan/detail/:id" element={<DetailInisiasiPenugasan />} />
                  <Route path="evaluasi/validasi-evaluasi" element={<ValidasiDataEvaluasiKABID />} />
                  <Route path="evaluasi/validasi-evaluasi/detail/:id" element={<DetailEvaluasiDataEvaluasiKABID />} />
                  <Route path="evaluasi/validasi-evaluasi/detail/:id" element={<DetailEvaluasiDataEvaluasiKABID />} />
                  <Route path="evaluasi/laporan" element={<LaporanEvaluasiKABID />} />
                  <Route path="evaluasi/laporan/create/:id" element={<PengesahanLaporanEvaluasiKabid />} />

                  {/* blm fixx */}
                  {/* <Route path="evaluasi/laporan" element={<PengesahanLaporanKABID />} />
                  <Route path="evaluasi/laporan/:id" element={<CreatePengesahanLaporanKabid />} />
                  <Route path="evaluasi/laporan/:id" element={<CreatePengesahanLaporanKabid />} />
                  <Route path="evaluasi/verifikasi-laporan" element={<KabidVerifikasiBAP />} /> */}
                  {/* blm fixx */}

                  <Route path="manajemen-akun/data-pengguna" element={<DataPengguna />} />
                  <Route path="manajemen-akun/data-pengguna/detail/:id" element={<DetailPengguna />} />
                  <Route path="manajemen-akun/data-peran-pengguna" element={<DataPeranPengguna />} />
                  <Route path="manajemen-akun/data-peran-pengguna/detail/:id" element={<DetailRole />} />
                  <Route path="manajemen-akun/data-hak-akses" element={<DataHakAkses />} />
                  <Route path="manajemen-akun/data-hak-akses/detail/:id" element={<DetailHakAkses />} />
                </Route>
              </Route>

              {/* KTH */}
              <Route element={<RoleGuard allowedRoles={[ROLES.KTH]} />}>
                <Route path="kth">
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardKTH />} />
                  <Route path="rehabilitasi/pendanaan-csr" element={<PendanaanCSR />} />
                  <Route path="rehabilitasi/pendanaan-csr/create" element={<AjukanProgramCSR />} />
                  <Route path="rehabilitasi/pendanaan-apbd" element={<PendanaanAPBD />} />
                  <Route path="rehabilitasi/riwayat-pengajuan" element={<RiwayatPengajuan />} />
                  <Route path="rehabilitasi/update-progres" element={<UpdateProgres />} />
                  <Route path="rehabilitasi/laporan-dana" element={<LaporanDanaIndex />} />
                  <Route path="rehabilitasi/laporan-dana/create" element={<CreateLaporanDana />} />
                  <Route path="rehabilitasi/laporan-dana/detail/:id" element={<DetailLaporanDana />} />
                  <Route path="investasi/data" element={<DataInvestasiKTH />} />
                  <Route path="investasi/data/create" element={<CreateInvestasi />} />
                  <Route path="investasi/data/detail/:id" element={<DetailInvestasiKTH />} />
                  <Route path="investasi/persetujuan" element={<PersetujuanInvestasi />} />
                  <Route path="investasi/persetujuan/detail/:id" element={<DetailPersetujuan />} />
                  <Route path="investasi/investor" element={<DataInvestorIndexKTH />} />
                  <Route path="investasi/investor/detail/:id" element={<DetailInvestorKTH />} />
                  <Route path="investasi/laporan-proyek" element={<LaporanProyekIndexKTH />} />
                  <Route path="investasi/laporan-proyek/create" element={<CreateLaporanProyek />} />
                  <Route path="laporan-investasi/usaha" element={<LaporanUsaha />} />
                  <Route path="laporan-investasi/usaha/create" element={<CreateLaporanUsaha />} />
                  <Route path="laporan-investasi/keuangan" element={<LaporanKeuangan />} />
                  <Route path="laporan-investasi/keuangan/create" element={<CreateLaporanKeuangan />} />
                  <Route path="laporan-investasi/pengeluaran" element={<BiayaPengeluaranIndex />} />
                  <Route path="laporan-investasi/pengeluaran/create" element={<CreateLaporanBiayaPengeluaran />} />
                  <Route path="laporan-investasi/pemasukan" element={<BiayaPemasukanIndex />} />
                  <Route path="laporan-investasi/pemasukan/create" element={<BiayaPemasukanCreate />} />
                </Route>
              </Route>

              {/* CSR */}
              <Route element={<RoleGuard allowedRoles={[ROLES.CSR]} />}>
                <Route path="csr">
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardCSR />} />
                  <Route path="tinjau-proposal" element={<TinjauProposal />} />
                  <Route path="tinjau-proposal/detail/:id" element={<DetailTinjauProposal />} />
                  <Route path="riwayat-proposal" element={<RiwayatProposal />} />
                  <Route path="monitoring-proyek" element={<MonitoringProyek />} />
                  <Route path="laporan-keuangan" element={<LaporanKeuanganIndex />} />
                  <Route path="laporan-keuangan/detail/:id" element={<DetailLaporanKeuangan />} />
                </Route>
              </Route>

              {/* Staff BUPM */}
              <Route element={<RoleGuard allowedRoles={[ROLES.STAFFBUPM]} />}>
                <Route path="staff/bupm">
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardStaffBUPM />} />
                  <Route path="data-investasi" element={<DataInvestasi />} />
                  <Route path="data-investasi/konfirmasi/:id" element={<DetailInvestasi />} />
                  <Route path="data-investasi/detail/:id" element={<DetailInvestasi />} />
                  <Route path="data-investor" element={<DataInvestorIndex />} />
                  <Route path="data-investor/detail/:id" element={<DetailInvestor />} />
                  <Route path="laporan-proyek" element={<LaporanProyekIndex />} />
                </Route>
              </Route>

              {/* Kabid BUPM */}
              <Route element={<RoleGuard allowedRoles={[ROLES.KABIDBUPM]} />}>
                <Route path="kabid/bupm">
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardKABIDBUPM />} />
                  <Route path="data-investasi" element={<DataInvestasiKABIDBUPM />} />
                  <Route path="data-investasi/validasi/:id" element={<DetailInvestasiKABIDBUPM />} />
                  <Route path="data-investasi/detail/:id" element={<DetailInvestasiKABIDBUPM />} />
                  <Route path="data-investor" element={<DataInvestorIndexKABIDBUPM />} />
                  <Route path="data-investor/detail/:id" element={<DetailInvestorKABIDBUPM />} />
                  <Route path="laporan-proyek" element={<LaporanProyekIndexKABIDBUPM />} />
                </Route>
              </Route>

              {/* Penyuluh */}
              <Route element={<RoleGuard allowedRoles={["penyuluh"]} />}>
                <Route path="penyuluh">
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardPenyuluh />} />
                  <Route path="validasi-lokasi" element={<ValidasiLokasi />} />
                  <Route path="validasi-lokasi/create/:id" element={<CreateValidasi />} />
                  <Route path="pelaksanaan-penanaman" element={<PelaksanaanPenanamanIndex />} />
                  <Route path="pelaksanaan-penanaman/create/:id" element={<InputProgresPage />} />
                  <Route path="monitoring-lanjutan" element={<MonitoringLanjutanIndex />} />
                  <Route path="monitoring-lanjutan/form/:id" element={<FormMonitoringPage />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <CustomToaster />
    </BrowserRouter>
  );
}

export default App;