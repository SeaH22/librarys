import react from "react"

export default function Dashboard({books,users}){
    const totalBooks = books.reduce((sum,b) => sum + Number(b.quantity || 0), 0);
    const lowStockCount = books.filter((b) =>Number(b.quantity) < 2).length;
  
    return(
        <div className="page">
            <h2>Dashboard Overview</h2>

            <div className="dashboard-boxes">
                <div className="dashboard-box">
                    <h3>Total registered Books</h3>
                    <p>{books.length}</p>
                </div>
                <div className="dashboard-box">
                    <h3>Total copies in Stock</h3>
                    <p>{totalBooks}</p>
                </div>
                <div className="dashboard-box">
                    <h3>Total Users</h3>
                    <p>{users.length}</p>
            </div>
            <div className="dashboard-box">
                    <h3>Low Stock Items(&lt;2)</h3>
                    <p style ={{color: lowStockCount > 0 ? "red" : "black"}}>{lowStockCount}</p>
        </div>
    </div>

    <h3>Current Book Availability</h3>
    <table>
        <thead>
            <tr>
                 <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>ISBN</th>
                        <th>Stock quantity</th>
                        <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {books.map((book,index) =>{
                const isLowStock = Number(book.quantity) < 2;
                return(
                    <tr key ={index} className={isLowStock ?"low-stock" : ""}>
                       <td>{book.title}</td>
                       <td>{book.author}</td>
                       <td>{book.genre}</td>
                       <td>{book.isbn}</td>
                       <td>{book.quantity}</td>
                       <td>{isLowStock ? "Low Stock" : "Available"}</td>
                     </tr>
                );
            })}
        </tbody>
    </table>
 </div>
    );
}