const API_URL = import.meta.env.VITE_API_MASTER_URL;

export const getStaffDonasiDashboardAPI = async () => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/admin/dashboard`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Gagal mengambil data dashboard.');
    }

    return data.data; 
  } catch (error: any) {
    throw new Error(error.message || 'Gagal terhubung ke server.');
  }
};