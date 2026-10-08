const KEYS = {
  BOOKS: "books",
  USERS: "users",
  TRANSACTIONS: "transactions",
};

// Default initial data if localStorage is empty
const defaultUsers = [
  { name: "Admin", membershipID: "ADM001", role: "Admin" },
  { name: "John Doe", membershipID: "MEM101", role: "Student" },
];

const defaultBooks = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", isbn: "9780743273565", quantity: 5 },
  { id: 2, title: "1984", author: "George Orwell", genre: "Dystopian", isbn: "9780451524935", quantity: 1 },
];

export const getStoredData = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage`, error);
    return fallback;
  }
};

export const saveStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage`, error);
  }
};

export const loadBooks = () => getStoredData(KEYS.BOOKS, defaultBooks);
export const saveBooks = (books) => saveStoredData(KEYS.BOOKS, books);

export const loadUsers = () => getStoredData(KEYS.USERS, defaultUsers);
export const saveUsers = (users) => saveStoredData(KEYS.USERS, users);

export const loadTransactions = () => getStoredData(KEYS.TRANSACTIONS, []);
export const saveTransactions = (transactions) => saveStoredData(KEYS.TRANSACTIONS, transactions);