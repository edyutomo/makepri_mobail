import React, { useState } from 'react';
import '../css/trspendaptan.css';

const TrsPendapatan = () => {
  const [transactions, setTransactions] = useState([
    { date: '20/01/2025', category: 'Makanan', description: 'Makan Siang', amount: 'Rp 25.500' }
  ]);

  return (
    <div className="container">
      <header>
        <h1>Transaksi Pendapatan</h1>
        <div className="search-bar">
          <input type="text" placeholder="Cari transaksi..." />
        </div>
      </header>

      <div className="transaction-list">
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <span>{transaction.date}</span>
            <span>{transaction.category}</span>
            <span>{transaction.description}</span>
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

export default TrsPendapatan;
