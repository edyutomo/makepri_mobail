import React, { useState } from 'react';
import '../css/trspengeluaran.css';

const TrsPengeluaran = () => {
  const [transactions, setTransactions] = useState([
    { category: 'Makanan', amount: 'Rp 50.000' },
    { category: 'Transport', amount: 'Rp 20.000' },
    { category: 'Rumah', amount: 'Rp 100.000' },
    { category: 'Lain - Lain', amount: 'Rp 30.000' }
  ]);

  return (
    <div className="container">
      <header>
        <h1>Transaksi Pengeluaran</h1>
        <div className="search-bar">
          <input type="text" placeholder="Cari transaksi..." />
        </div>
      </header>

      <div className="transaction-list">
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <span>{transaction.category}</span>
            <span>{transaction.amount}</span>
          </div>
        ))}
      </div>

      <div className="add-transaction">
        <button>+</button>
      </div>
    </div>
  );
};

export default TrsPengeluaran;
