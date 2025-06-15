import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../css/TambahTransaksi.css";

function TambahTransaksi() {
  const history = useHistory();
  const [kategori, setKategori] = useState([]);
  const [dompet, setDompet] = useState([]);
  const [form, setForm] = useState({
    tanggal: "",
    kategori: "",
    dompet: "",
    jumlah: "",
    keterangan: "",
  });

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get("https://apitugas3.xyz/api/kategori", { headers })
      .then(res => setKategori(res.data.data))
      .catch(err => console.error("Gagal ambil kategori:", err));

    axios.get("https://apitugas3.xyz/api/dompet", { headers })
      .then(res => setDompet(res.data.data))
      .catch(err => console.error("Gagal ambil dompet:", err));
  }, []);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const simpanTransaksi = () => {
    if (!form.tanggal || !form.kategori || !form.jumlah) {
      alert("Tanggal, kategori, dan jumlah wajib diisi.");
      return;
    }

    const data = {
      tanggal: form.tanggal,
      kategori_id: form.kategori,
      dompet_id: form.dompet || null,
      jumlah: form.jumlah,
      keterangan: form.keterangan,
    };

    axios.post("https://apitugas3.xyz/api/transaksi", data, { headers })
      .then(() => {
        alert("Transaksi berhasil ditambahkan!");
        history.push("/transaksi");
      })
      .catch((err) => {
        console.error("Gagal simpan transaksi:", err.response?.data);
        alert("Gagal simpan transaksi.");
      });
  };

  return (
    <div className="container-transaksi">
      <div className="card-transaksi">
        <h2 className="transaksi-title">Tambah Transaksi</h2>

        <div>
          <label>Tanggal:</label>
          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={handleChangeForm}
            className="input-full"
          />
        </div>

        <div>
          <label>Kategori:</label>
          <select
            name="kategori"
            value={form.kategori}
            onChange={handleChangeForm}
            className="input-full"
          >
            <option value="">-- Pilih Kategori --</option>
            {kategori.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama}
              </option>
            ))}
          </select>

          {/* Tombol Edit Kategori */}
          <button
            className="button-edit-kategori"
            onClick={() => history.push("/kategori")}
          >
            ✎ Edit Kategori
          </button>
        </div>

        <div>
          <label>Dompet:</label>
          <select
            name="dompet"
            value={form.dompet}
            onChange={handleChangeForm}
            className="input-full"
          >
            <option value="">-- Pilih Dompet --</option>
            {dompet.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Jumlah:</label>
          <input
            type="number"
            name="jumlah"
            value={form.jumlah}
            onChange={handleChangeForm}
            className="input-full"
          />
        </div>

        <div>
          <label>Keterangan:</label>
          <input
            type="text"
            name="keterangan"
            value={form.keterangan}
            onChange={handleChangeForm}
            className="input-full"
          />
        </div>

        <div className="button-group">
          <button className="button-primary" onClick={simpanTransaksi}>
            Simpan
          </button>
          <button
            className="button-secondary"
            onClick={() => history.push("/transaksi")}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

export default TambahTransaksi;
