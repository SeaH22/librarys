import react from "react";

export default function Navbar({activeSection,setActiveSection,onLogout}){
  return(
    <nav>
    <button 
    className={activeSection === "dashboard" ? "active" :"" }
    onClick={() => setActiveSection("dashboard")}
    >
     Dashboard
     </button>
      <button
    className={activeSection === "books" ? "active" :"" }
    onClick={() => setActiveSection("books")}
    >
        Book Management
    </button>
     <button
     className={activeSection === "transactions" ? "active" :"" }
     onClick={() => setActiveSection("transactions")}
    >
        Transactions
    </button>
     <button
     className={activeSection === "users" ? "active" :"" }
     onClick={() => setActiveSection("users")}
    >
        User Management
     </button>
     {onLogout && (
        <button
        onClick={onLogout}
        style={{backgroundColor :"#000",color:" #ffffff",boderColor:"#ffffff"}}
    >
        Logout
        </button>
     )}
    </nav>
  ) ; 
}