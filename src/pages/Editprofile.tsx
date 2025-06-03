import React, { useState, useRef } from 'react';
import '../css/editprofile.css';
import axios from 'axios';

interface EditProfileProps {
  user: any;
  onCancel: () => void;
  onSave: (updatedUser: any) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onCancel, onSave }) => {
  const [username, setUsername] = useState(user?.name ?? '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profilePic, setProfilePic] = useState<string>(user?.foto ?? '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('https://apitugas3.xyz/api/update-profile', {
        name: username,
        old_password: oldPassword,
        new_password: newPassword,
        foto: profilePic,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert('Profil berhasil diperbarui!');
      onSave(response.data.user); // Kirim data baru ke parent
    } catch (error) {
      console.error('Gagal update profil:', error);
      alert('Gagal update profil. Coba lagi.');
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
          <button type="button" className="btn-cancel" onClick={onCancel}>Batal</button>
          <button type="submit" className="btn-save">Konfirmasi</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
