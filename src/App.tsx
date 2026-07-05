import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import CustomToaster from "./components/CustomToaster";
import PageLoader from "./components/PageLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/RoleGuard";
import { ROLE_REDIRECTS, ROLES } from "./utils/roles";
import DashboardKTH from "./pages/KelompokTaniHutan/Dashboard";
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
const CreateEvaluasi = lazy(() => import("./pages/StaffPDAS/EvaluasiPenanamanBibit/DataEvaluasi/CreateEvaluasi"));
const StaffTugasEvaluasi = lazy(() => import("./pages/StaffPDAS/EvaluasiPenanamanBibit/TugasMasuk"));
const AnalisisLahanKritis = lazy(() => import("./pages/StaffPDAS/AnalisisLahanKritis"));
const DashboardMonitoring = lazy(() => import("./pages/StaffPDAS/PelaksanaanDanMonitoring/DashboardMonitoring"));
const DaftarKegiatan = lazy(() => import("./pages/StaffPDAS/PelaksanaanDanMonitoring/DaftarKegiatan"));
const VerifikasiMonitoring = lazy(() => import("./pages/StaffPDAS/PelaksanaanDanMonitoring/VerifikasiMonitoring"));
const RekapMonitoring = lazy(() => import("./pages/StaffPDAS/PelaksanaanDanMonitoring/RekapMonitoring"));
const DashboardEvaluasi = lazy(() => import("./pages/StaffPDAS/EvaluasiPenanamanBibit/DashboardEvaluasi"));
const DataEvaluasi = lazy(() => import("./pages/StaffPDAS/EvaluasiPenanamanBibit/DataEvaluasi"));
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
const KabidVerifikasiBAP = lazy(() => import("./pages/KepalaBidangPDAS/EvaluasiPenanamanBibit/VerifikasiLaporan"));
const KabidPenugasan = lazy(() => import("./pages/KepalaBidangPDAS/EvaluasiPenanamanBibit/Penugasan"));
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
                  <Route path="rehabilitasi/monitoring-riwayat" element={<MonitoringRiwayatList />} />

                  {/* Monitoring */}
                  <Route path="monitoring/dashboard" element={<DashboardMonitoring />} />
                  <Route path="monitoring/kegiatan" element={<DaftarKegiatan />}/>
                  <Route path="monitoring/verifikasi" element={<VerifikasiMonitoring />} />
                  <Route path="monitoring/rekap" element={<RekapMonitoring />} />

                  {/* Evaluasi */}
                  <Route path="evaluasi/dashboard" element={<DashboardEvaluasi />} />
                  <Route path="evaluasi/data" element={<DataEvaluasi />} />
                  <Route path="evaluasi/data/create" element={<CreateEvaluasi />} />
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
                  <Route path="rehabilitasi/program-csr" element={<DaftarUsulanCSR />} />
                  <Route path="rehabilitasi/program-csr/verifikasi/:id" element={<VerifikasiCSR />} />
                  <Route path="rehabilitasi/riwayat-keputusan" element={<RiwayatKeputusan />} />

                  <Route path="evaluasi/penugasan" element={<KabidPenugasan />} />
                  <Route path="evaluasi/verifikasi-laporan" element={<KabidVerifikasiBAP />} />

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