const API_URL = import.meta.env.VITE_API_MASTER_URL;

export const uploadDataGIS = async (formData: FormData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Sesi telah habis, silakan login kembali.");

    const response = await fetch(`${API_URL}/projects/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: formData,
    });

    const responseText = await response.text();

    if (responseText.trim().startsWith('<')) {
      throw new Error('Gagal terhubung ke API: Server mengembalikan halaman HTML. Cek endpoint atau parameter payload.');
    }

    const responseData = JSON.parse(responseText);

    if (!response.ok) {
      let errorMessage = responseData?.message || 'Terjadi kesalahan saat mengunggah data.';
      if (responseData.errors) {
        const errorDetails = Object.values(responseData.errors).flat().join(', ');
        errorMessage = `${errorMessage} Detail: ${errorDetails}`;
      }

      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error: any) {
    throw new Error(error.message || 'Gagal mengunggah data GIS');
  }
};