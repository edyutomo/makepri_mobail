import React, { useState } from 'react';
import '../css/editprofile.css';

interface EditProfileProps {
  onCancel: () => void;
  onSave: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ onCancel, onSave }) => {
  const [username, setUsername] = useState('Administrator');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validasi dan simpan data di sini
    onSave();
  };

  return (
    <div className="edit-profile-box">
      <h2>Edit</h2>
      <img
        src="https://via.placeholder.com/100"
        alt="Profile"
        className="profile-img"
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
