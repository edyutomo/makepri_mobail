import React, { useState, useRef } from "react";
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
  const [profilePic, setProfilePic] = useState<string>(user?.foto ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfilePic(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", username);
      formData.append("old_password", oldPassword);
      formData.append("new_password", newPassword);
      if (selectedFile) {
        formData.append("foto", selectedFile);
      }

      const response = await axios.put(
        "https://apitugas3.xyz/api/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profil berhasil diperbarui!");
      onSave(response.data.user);
    } catch (error: any) {
      console.error("Gagal update profil:", error.response?.data || error);
      alert(
        error.response?.data?.message ||
          "Gagal update profil. Silakan coba lagi."
      );
    }
  };

  return (
    <div className="edit-profile-box">
      <h2>Edit Profile</h2>
      <img
        src={profilePic}
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
        onChange={handleFileChange}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password Lama"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password Baru"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div className="edit-buttons">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Batal
          </button>
          <button type="submit" className="btn-save">
            Konfirmasi
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
