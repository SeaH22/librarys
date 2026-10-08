import React,{useState} from "react";

export default function BookManagement({books, setBooks}){
   const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    quantity: "",
   });

   const handleAddBook = (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.quantity){
        alert("Please fill in Title,Author, and Quantity");
        return;
    }

    const newBook = {
        id: Date.now(),
        title: form.title.trim(),
        author: form.author.trim(),
        genre: form.genre.trim(),
        isbn: form.isbn.trim(),
        quantity: Math.max(0,parseInt(form.quantity) || 0),
    };

    setBooks((prev) => [...prev , newBook]);
    setForm({title: "",author: "",genre: "",isbn: "",quantity: ""});
   };

   const handleUpdate = (index) =>{
    const target = books[index];
    const title = prompt("Update Title:",target.title) ?? target.title;
    const author = prompt("Update Author:",target.author) ?? target.author;
    const genre = prompt("Update Genre:",target.genre) ?? target.genre;
    const isbn = prompt("Update ISBN:",target.isbn) ?? target.isbn;
    const qtyInput= prompt("Update Quantity:",target.quantity);
    const quantity = qtyInput !== null ? Math.max(0,parseInt(qtyInput) || 0) : target.quantity;

    const updated =[...books];
    updated[index] = {...target,title,author,genre,isbn,quantity};
    setBooks(updated);
   };

    const  handleDelete =(index) => {
        if(window.confirm("Are you sure you want to delete this book?")){
            setBooks((prev) => prev.filter((_,i) => i !== index));
        }
    };    
    
    return(
        <div className="page">
            <h2>Book Management</h2>

            <div className="form-box">
                <h3>Add New Book </h3>
                <form onSubmit={handleAddBook}>
                    <input
                    type="text"
                    placeholder="book Title"
                    value={form.title}
                    onChange={(e) => setForm({...form,title: e.target.value})}
                    />
                    <input
                    type="text"
                    placeholder="Author"
                    value={form.author}
                    onChange={(e) => setForm({...form,author: e.target.value})}
                    />
                    <input
                    type="text"
                    placeholder="Genre"
                    value={form.genre}
                    onChange={(e) => setForm({...form,genre: e.target.value})}
                    />
                    <input
                    type="text"
                    placeholder="ISBN"
                    value={form.isbn}
                    onChange={(e) => setForm({...form,isbn: e.target.value})}
                    />
                    <input
                    type="number"
                    placeholder="Initial Quantity"
                    value={form.title}
                    onChange={(e) => setForm({...form,quantity: e.target.value})}
                    />
                    <button type="submit">Add Book</button>
                </form>
            </div>

            <h3>Boo Inventory</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>ISBN</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((books,index) =>(
                        <tr key={books.id || index}>
                            <td>{books.title}</td>
                            <td>{books.author}</td>
                            <td>{books.genre}</td>
                            <td>{books.isbn}</td>
                            <td>{books.quantity}</td>
                            <td>
                                <button onClick={() => handleUpdate(index)} style={{marginRight: "5px"}}>
                                   Update 
                                </button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
