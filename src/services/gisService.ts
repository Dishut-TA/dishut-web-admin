const API_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadDataGIS = async (formData: FormData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Sesi telah habis, silakan login kembali.");

    const response = await fetch(`${API_URL}/projects/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    const responseText = await response.text();

    if (responseText.trim().startsWith('<')) {
      throw new Error('Gagal terhubung ke API: Server mengembalikan halaman HTML.');
    }

    const responseData = JSON.parse(responseText);

    if (!response.ok) {
      throw new Error(responseData?.message || 'Terjadi kesalahan saat mengunggah data.');
    }

    return responseData;
  } catch (error: any) {
    throw new Error(error.message || 'Gagal mengunggah data GIS');
  }
};