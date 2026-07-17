import React, { useState, useEffect } from "react";
import { HiXMark, HiOutlineCamera } from "react-icons/hi2";
import { updateUser } from "@/services/authService";
import { getAllRoles } from "@/services/rbac.service";

import type { RoleType, UpdateUserPayload, UserProfile } from "@/utils/interface";
import ConfirmAlert from "@/components/ConfirmAlert";
import { ToastError, ToastLoading, ToastSuccess } from "@/utils/toastHelper";
import { updatePegawaiFormData } from "@/services/pegawai/pegawai.service";

interface EditAkunModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userData: UserProfile | null;
}

const EditAkunModal: React.FC<EditAkunModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  userData,
}) => {
  const [formData, setFormData] = useState<UpdateUserPayload>({
    nama_pengguna: "",
    email: "",
    nip: "",
    kata_sandi: "",
    peran: "",
  });
  
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchRoles = async () => {
        setIsLoadingRoles(true);
        try {
          const data = await getAllRoles();
          setRoles(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoadingRoles(false);
        }
      };
      fetchRoles();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && userData) {
      setFormData({
        nama_pengguna: userData.nama_pengguna,
        email: userData.email,
        nip: userData.nip || "",
        kata_sandi: "",
        peran: userData.peran && userData.peran.length > 0 ? userData.peran[0].nama : "" 
      });
      setFotoPreview((userData.profil)?.foto_profile || null);
      setFotoFile(null); 
    }
  }, [isOpen, userData]);

  if (!isOpen || !userData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAlertOpen(true);
  };

  const executeSubmit = async () => {
    setIsAlertOpen(false);
    setIsLoading(true);
    const loadingId = ToastLoading("Memperbarui data akun & profil...");

    try {
      const userPayload: any = {
        nama_pengguna: formData.nama_pengguna,
        email: formData.email,
        peran: formData.peran,
      };
      if (formData.kata_sandi) {
        userPayload.kata_sandi = formData.kata_sandi;
      }
      
      await updateUser(userData.id, userPayload);
      const pegawaiFormData = new FormData();
      pegawaiFormData.append("nip", formData.nip || "");
      
      if (fotoFile) {
        pegawaiFormData.append("foto_profile", fotoFile);
      }
      
      pegawaiFormData.append("_method", "PUT"); 

      await updatePegawaiFormData(userData.id, pegawaiFormData);

      ToastSuccess("Akun & Profil berhasil diperbarui!", loadingId);
      onSuccess();
      onClose();
    } catch (err: any) {
      ToastError(err.message || "Gagal memperbarui data", loadingId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
          
          <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 shrink-0">
            <h2 className="text-xl font-bold text-slate-800">Edit Pengguna</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto no-scrollbar">
            
            {/* AREA UPLOAD FOTO PROFILE */}
            <div className="flex flex-col items-center justify-center mb-2">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 shadow-sm group bg-slate-50">
                {fotoPreview ? (
                  <img src={fotoPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <HiOutlineCamera className="w-8 h-8" />
                  </div>
                )}
                
                <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <HiOutlineCamera className="w-6 h-6 text-white" />
                  <input 
                    type="file" 
                    accept="image/jpeg, image/png, image/webp" 
                    className="hidden" 
                    onChange={handlePhotoChange} 
                  />
                </label>
              </div>
              <span className="text-xs font-semibold text-slate-500 mt-2">Klik foto untuk mengubah</span>
            </div>

            {/* FIELD INPUT LAINNYA */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Pengguna</label>
              <input
                type="text"
                name="nama_pengguna"
                value={formData.nama_pengguna}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">NIP</label>
              <input
                type="text"
                name="nip"
                value={formData.nip}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Peran (Role)</label>
              <select
                name="peran"
                value={formData.peran}
                onChange={handleChange}
                required
                disabled={isLoadingRoles}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] disabled:opacity-60 cursor-pointer"
              >
                <option value="" disabled>{isLoadingRoles ? "Memuat role..." : "Pilih peran akun"}</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.nama}>{role.nama.replace(/_/g, " ").toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Kata Sandi Baru <span className="font-normal text-slate-400">(Opsional)</span>
              </label>
              <input
                type="password"
                name="kata_sandi"
                value={formData.kata_sandi}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Kosongkan jika tidak diubah"
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-slate-100 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 active:scale-95 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-[#144a18] shadow-lg shadow-[#185325]/20 active:scale-95 transition-all disabled:opacity-50"
              >
                {isLoading ? "Menyimpan..." : "Perbarui Akun"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmAlert
        isOpen={isAlertOpen}
        title="Perbarui Akun?"
        message={`Simpan perubahan untuk pengguna "${userData.nama_pengguna}"?`}
        isDanger={false}
        isLoading={isLoading}
        onConfirm={executeSubmit}
        onCancel={() => setIsAlertOpen(false)}
      />
    </>
  );
};

export default EditAkunModal;