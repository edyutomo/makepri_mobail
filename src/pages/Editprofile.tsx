import React, { useState, useRef, useEffect } from "react";
import "../css/editprofile.css";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import { cameraOutline, saveOutline, closeOutline } from "ionicons/icons";

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
    <div className="edit-profile-container fade-in">
      <div className="edit-profile-card slide-up">
        <h2 className="edit-profile-title">Edit Profil</h2>

        {/* Foto Profil */}
        <div className="profile-image-container">
          <img
            src={previewUrl || "/default-profile.png"}
            alt="Foto Profil"
            className="profile-image hover-grow"
            onClick={handleImageClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            className="file-input"
            accept="image/*"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <p className="file-selected">File dipilih: {selectedFile.name}</p>
          )}
          <button 
            type="button" 
            className="change-photo-btn hover-scale"
            onClick={handleImageClick}
          >
            <IonIcon icon={cameraOutline} className="btn-icon" />
            Ganti Foto
          </button>
        </div>

        {/* Form Edit */}
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label>Nama Pengguna</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password Lama</label>
            <input
              type="password"
              placeholder="Kosongkan jika tidak ingin mengubah"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password Baru</label>
            <input
              type="password"
              placeholder="Minimal 6 karakter"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn hover-scale"
              onClick={onCancel}
              disabled={loading}
            >
              <IonIcon icon={closeOutline} className="btn-icon" />
              Batal
            </button>
            <button 
              type="submit" 
              className="save-btn hover-scale"
              disabled={loading}
            >
              <IonIcon icon={saveOutline} className="btn-icon" />
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;