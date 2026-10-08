import React, { useState } from "react";

export default function Transactions({ books, setBooks, transactions, setTransactions }) {
  const [selectedBookId, setSelectedBookId] = useState("");
  const [amount, setAmount] = useState("");

  const handleStockAction = (type) => {
    if (!selectedBookId) {
      alert("Please select a book.");
      return;
    }
    const qty = parseInt(amount, 10);
    if (!qty || qty <= 0) {
      alert("Please enter a valid quantity greater than 0.");
      return;
    }

    const bookIndex = books.findIndex((b) => String(b.id) === String(selectedBookId));
    if (bookIndex === -1) return;

    const targetBook = books[bookIndex];

    if (type === "BORROW" && targetBook.quantity < qty) {
      alert(`Cannot deduct stock. Only ${targetBook.quantity} copy/copies available.`);
      return;
    }

    const newQuantity =
      type === "ADD" ? targetBook.quantity + qty : targetBook.quantity - qty;

    const updatedBooks = [...books];
    updatedBooks[bookIndex] = { ...targetBook, quantity: newQuantity };
    setBooks(updatedBooks);

    const logEntry = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      bookTitle: targetBook.title,
      type: type === "ADD" ? "Stock Added" : "Book Borrowed",
      amount: qty,
      remainingStock: newQuantity,
    };

    setTransactions((prev) => [logEntry, ...prev]);
    setAmount("");
  };

  return (
    <div className="page">
      <h2>Stock & Availability Transactions</h2>

      <div className="form-box">
        <h3>Record Transaction</h3>
        <select
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
        >
          <option value="">-- Select Book --</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} (Available: {b.quantity})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={() => handleStockAction("ADD")}>
            + Add Stock
          </button>
          <button type="button" onClick={() => handleStockAction("BORROW")}>
            - Deduct Stock (Borrow)
          </button>
        </div>
      </div>

      <h3>Transaction Log</h3>
      {transactions.length === 0 ? (
        <p>No transactions recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Book Title</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Remaining Stock</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
                <td>{tx.bookTitle}</td>
                <td>{tx.type}</td>
                <td>{tx.amount}</td>
                <td>{tx.remainingStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}