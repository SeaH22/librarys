import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import BookManagement from "./pages/BookManagement";
import Transactions from "./pages/Transactions";
import UserManagement from "./pages/UserManagement";
import {
  loadBooks,
  saveBooks,
  loadUsers,
  saveUsers,
  loadTransactions,
  saveTransactions,
} from "./utils/localStorage";
import "./App.css";

export default function App() {
  const [books, setBooks] = useState(() => loadBooks());
  const [users, setUsers] = useState(() => loadUsers());
  const [transactions, setTransactions] = useState(() => loadTransactions());

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => { saveBooks(books); }, [books]);
  useEffect(() => { saveUsers(users); }, [users]);
  useEffect(() => { saveTransactions(transactions); }, [transactions]);

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setActiveSection("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <div>
      <header>
        <h1>Library Management System</h1>
        <p>
          {isAuthenticated
            ? `Logged in as: ${currentUser?.name} (${currentUser?.role})`
            : "Please log in to access the system"}
        </p>
      </header>

      {isAuthenticated && (
        <Navbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onLogout={handleLogout}
        />
      )}

      <main>
        {!isAuthenticated ? (
          <UserManagement
            users={users}
            setUsers={setUsers}
            onLoginSuccess={handleLoginSuccess}
            isLoggedIn={false}
          />
        ) : (
          <>
            {activeSection === "dashboard" && (
              <Dashboard books={books} users={users} />
            )}
            {activeSection === "books" && (
              <BookManagement books={books} setBooks={setBooks} />
            )}
            {activeSection === "transactions" && (
              <Transactions
                books={books}
                setBooks={setBooks}
                transactions={transactions}
                setTransactions={setTransactions}
              />
            )}
            {activeSection === "users" && (
              <UserManagement
                users={users}
                setUsers={setUsers}
                onLoginSuccess={handleLoginSuccess}
                isLoggedIn={true}
              />
            )}
          </>
        )}
      </main>

      <footer>
        <p>&copy; Library Management System</p>
        <p>
          Repository:{" "}
          <a
            href="https://github.com/SeaH22/library.git"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ffffff", textDecoration: "underline" }}
          >
            https://github.com/SeaH22/library.git
          </a>
        </p>
      </footer>
    </div>
  );
}