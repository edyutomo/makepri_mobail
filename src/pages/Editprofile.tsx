import React, { useState, useRef } from 'react';
import '../css/editprofile.css';
import logo from '../fto/makepri.png';

interface EditProfileProps {
  onCancel: () => void;
  onSave: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ onCancel, onSave }) => {
  const [username, setUsername] = useState('Administrator');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profilePic, setProfilePic] = useState<string>(logo); // state foto profil, awalnya logo
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Saat gambar diklik, trigger input file click
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Saat file dipilih, baca dan tampilkan preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (ev) => {
        if (ev.target?.result) {
          setProfilePic(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validasi dan simpan data di sini, termasuk foto profil (profilePic)
    onSave();
  };

  return (
    <div className="edit-profile-box">
      <h2>Edit Profile</h2>
      <img
        src={profilePic}
        alt="Foto Profil"
        className="profile-img"
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
        title="Klik untuk ganti foto profil"
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
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
