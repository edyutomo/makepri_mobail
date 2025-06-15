import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../css/TambahTransaksi.css";

function TambahTransaksi() {
  const history = useHistory();
  const [kategori, setKategori] = useState([]);
  const [dompet, setDompet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    const fetchData = async () => {
      try {
        const [kategoriRes, dompetRes] = await Promise.all([
          axios.get("https://apitugas3.xyz/api/kategori", { headers }),
          axios.get("https://apitugas3.xyz/api/dompet", { headers })
        ]);
        setKategori(kategoriRes.data.data);
        setDompet(dompetRes.data.data);
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
    <div className="tambah-transaksi-container">
      <div className="tambah-transaksi-card slide-in">
        <h2 className="tambah-transaksi-title">Tambah Transaksi Baru</h2>

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Memuat data...</p>
          </div>
        ) : (
          <>
            <div className="form-group">
              <label>Tanggal:</label>
              <input
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChangeForm}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Kategori:</label>
              <div className="select-with-button">
                <select
                  name="kategori"
                  value={form.kategori}
                  onChange={handleChangeForm}
                  className="form-input"
                >
                  <option value="">-- Pilih Kategori --</option>
                  {kategori.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.nama}
                    </option>
                  ))}
                </select>
                <button
                  className="edit-button hover-grow"
                  onClick={() => history.push("/kategori")}
                >
                  ✎ Edit
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Dompet:</label>
              <select
                name="dompet"
                value={form.dompet}
                onChange={handleChangeForm}
                className="form-input"
              >
                <option value="">-- Pilih Dompet --</option>
                {dompet.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nama}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Jumlah (Rp):</label>
              <input
                type="number"
                name="jumlah"
                value={form.jumlah}
                onChange={handleChangeForm}
                className="form-input"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Keterangan:</label>
              <input
                type="text"
                name="keterangan"
                value={form.keterangan}
                onChange={handleChangeForm}
                className="form-input"
                placeholder="Opsional"
              />
            </div>

            <div className="button-group">
              <button 
                className="primary-button hover-scale"
                onClick={simpanTransaksi}
              >
                Simpan Transaksi
              </button>
              <button 
                className="secondary-button hover-scale"
                onClick={() => history.push("/transaksi")}
              >
                Batalkan
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TambahTransaksi;