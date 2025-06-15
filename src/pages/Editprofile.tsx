import React, { useState, useRef, useEffect } from "react";
import "../css/editprofile.css";
import axios from "axios";

interface EditProfileProps {
  user: any;
  onCancel: () => void;
  onSave: (updatedUser: any) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  user,
  onCancel,
  onSave,
}) => {
  const [username, setUsername] = useState(user?.name ?? "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(user?.foto ?? "");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    const noChange =
      username === user?.name &&
      !oldPassword &&
      !newPassword &&
      !selectedFile;

    if (noChange) {
      alert("Tidak ada perubahan yang dilakukan.");
      return;
    }

    if (newPassword && newPassword.length < 6) {
      alert("Password baru minimal 6 karakter.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", username);
      if (oldPassword) formData.append("old_password", oldPassword);
      if (newPassword) formData.append("new_password", newPassword);
      if (selectedFile) {
        formData.append("foto_profile", selectedFile);
      }
      formData.append("_method", "PUT");

      const response = await axios.post(
        "https://apitugas3.xyz/api/user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profil berhasil diperbarui!");
      onSave(response.data.data);
    } catch (error: any) {
      console.error("Gagal update profil:", error.response?.data || error);
      alert(
        error.response?.data?.message ||
          "Gagal update profil. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-box">
      <h2>Edit Profile</h2>

      {/* Foto Profil + Ganti */}
      <img
        src={previewUrl || "/default-profile.png"}
        alt="Foto Profil"
        className="profile-img"
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
        title="Klik untuk ganti foto profil"
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        capture="user" // kamera depan, atau gunakan "environment" untuk belakang
        onChange={handleFileChange}
      />
      {selectedFile && (
        <small style={{ display: "block", marginBottom: "10px" }}>
          Foto dipilih: {selectedFile.name}
        </small>
      )}

      {/* Tombol ambil dari kamera/galeri */}
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
        <button
          type="button"
          onClick={handleImageClick}
          style={{
            padding: "6px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Ambil dari Kamera / Galeri
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password Lama"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password Baru"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={loading}
        />

        <div className="edit-buttons">
          <button
            type="button"
            className="btn-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Batal
          </button>
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? "Menyimpan..." : "Konfirmasi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
