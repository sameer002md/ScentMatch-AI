import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});


// ==========================================
// ADD JWT TOKEN TO EVERY REQUEST
// ==========================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ==========================================
// GET ALL PERFUMES
// ==========================================

export const getAllPerfumes = async () => {
  const response = await api.get(
    "/api/perfumes"
  );

  return response.data;
};


// ==========================================
// KEEP getPerfumes FOR OTHER COMPONENTS
// ==========================================

export const getPerfumes = async () => {
  const response = await api.get(
    "/api/perfumes"
  );

  return response.data;
};


// ==========================================
// GET PERFUME BY ID
// ==========================================

export const getPerfumeById = async (id) => {
  const response = await api.get(
    `/api/perfumes/${id}`
  );

  return response.data;
};


// ==========================================
// ALIAS FOR COMPATIBILITY
// ==========================================

export const getPerfume =
  getPerfumeById;


// ==========================================
// ADD PERFUME WITH IMAGE - ADMIN
// ==========================================

export const addPerfume = async (
  perfumeData
) => {

  const response = await api.post(

    "/api/perfumes",

    perfumeData,

    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }

  );

  return response.data;
};


// ==========================================
// UPDATE PERFUME - ADMIN
// ==========================================

export const updatePerfume = async (
  id,
  perfumeData
) => {

  const response = await api.put(
    `/api/perfumes/${id}`,
    perfumeData
  );

  return response.data;
};


// ==========================================
// DELETE PERFUME - ADMIN
// ==========================================

export const deletePerfume = async (
  id
) => {

  const response = await api.delete(
    `/api/perfumes/${id}`
  );

  return response.data;
};


// ==========================================
// EXPORT API
// ==========================================

export default api;