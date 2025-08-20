import axiosInstance from "../api/axios";

export class AuthService {
  login = async () => {};
  expressInterest = async () => {};
  uploadDocs = async (id, payload, type) => {
    const formData = new FormData();
    try {
      formData.append("image", payload);
      await axiosInstance.post(`/users/${id}/${type}`, formData);
    } catch (err) {}
  };
}
