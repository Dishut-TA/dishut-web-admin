export interface RegisterPayload {
  nama_pengguna: string;
  email: string;
  nip: string;
  kata_sandi: string;
  peran: string;
}

export interface LoginPayload {
  login: string; 
  kata_sandi: string;
}

export interface UpdateUserPayload {
  nama_pengguna: string;
  email: string;
  nip: string;
  kata_sandi?: string; 
  peran: string;
}

export interface PermissionType {
  id: number;
  nama: string;
  nama_penjaga: string;
  dibuat_pada: string;
  diperbarui_pada: string;
}

export interface RoleType {
  id: number;
  nama: string;
  nama_penjaga: string;
  izin?: PermissionType[];
  dibuat_pada: string;
  diperbarui_pada: string;
}

export interface ProfilDetail {
  id: number;
  nip: string | null;
  no_telp: string | null;
  tanggal_lahir: string | null;
  alamat: string | null;
  foto_profile: string | null;
}

export interface UserProfile {
  id: number;
  nama_pengguna: string;
  email: string;
  nip: string | null;
  peran: RoleType[];
  dibuat_pada: string;
  diperbarui_pada: string;
  profil?: ProfilDetail; 
  no_telp?: string | null;
  tanggal_lahir?: string | null;
  alamat?: string | null;
  foto_profile?: string | null;
}

export type StatusType = 'Terealisasi' | 'Disalurkan' | 'Terkumpul' | 'Menunggu Verifikasi';

export interface DetailBibitDana {
  nama: string;
  jumlah: number;
  hargaSatuan: number;
}

export interface DonaturData {
  idTransaksi: string;
  namaDonatur: string;
  program: string;
  jumlahBibit: number; 
  status: StatusType;
  rincianBibit: DetailBibitDana[];
  tanggalDonasi?: string; 
}

export type StatusProgram = 'Aktif' | 'Selesai' | 'Menunggu Verifikasi';

export interface DetailBibit {
  nama: string;
  jumlah: number;
  terealisasi: number; 
}

export interface ProgramData {
  id: string;
  nama: string;
  lokasi: string;
  jenisBibit: DetailBibit[]; 
  terkumpul: string | number;
  totalTerealisasi: string | number; 
  status: StatusProgram;
}

export type StatusKegiatan = 'Terkumpul' | 'Disalurkan' | 'Terealisasi';
export type ModalType = 'preview' | 'rincian' | 'upload' | null;

export interface DetailBibitDana {
  nama: string;
  jumlah: number;
  hargaSatuan: number;
}

export interface KegiatanData {
  idTransaksi: string;
  program: string;
  jumlahBibit: number;
  status: StatusKegiatan;
  namaDonatur: string;
  rincianBibit: DetailBibitDana[];
}

export interface PetakUkur {
  blok: string;
  target: number;
  tumbuh: number;
  rerataTinggi: number;
  persentase: number;
  status: 'Memenuhi' | 'Tidak Memenuhi';
}

export interface EvaluasiProgramData {
  id: string;
  namaPerusahaan: string;
  lokasi: string;
  luasLahan: number;
  jenisTanaman: string[];
  tglEvaluasi: string;
  hasilAkhir: {
    persentaseTotal: number;
    rerataTinggiTotal: number;
    statusKelulusan: 'BERHASIL' | 'TIDAK BERHASIL';
  };
  timPenilai: {
    ketua: string;
    pendamping: string[];
  };
  rincianPU: PetakUkur[];
}