import React, { useState } from "react";

export default function UserManagement({ users, setUsers, onLoginSuccess, isLoggedIn }) {
  const [loginForm, setLoginForm] = useState({ name: "", id: "" });
  const [loginMessage, setLoginMessage] = useState({ text: "", isError: false });

  const [userForm, setUserForm] = useState({
    name: "",
    membershipID: "",
    role: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const name = loginForm.name.trim();
    const id = loginForm.id.trim();

    if (!name || !id) {
      setLoginMessage({ text: "Please enter both Name and Membership ID.", isError: true });
      return;
    }

    const foundUser = users.find(
      (u) => u.name.toLowerCase() === name.toLowerCase() && u.membershipID === id
    );

    if (foundUser) {
      setLoginMessage({ text: "Login successful! Redirecting...", isError: false });
      setTimeout(() => {
        onLoginSuccess(foundUser);
      }, 400);
    } else {
      setLoginMessage({
        text: "User not found. Check credentials or ask an admin to add you below.",
        isError: true,
      });
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const { name, membershipID, role } = userForm;

    if (!name.trim() || !membershipID.trim() || !role.trim()) {
      alert("Please fill in all user fields.");
      return;
    }

    const newUser = {
      name: name.trim(),
      membershipID: membershipID.trim(),
      role: role.trim(),
    };

    setUsers((prev) => [...prev, newUser]);
    setUserForm({ name: "", membershipID: "", role: "" });
    alert("User added successfully!");
  };

  const editUser = (index) => {
    const targetUser = users[index];
    const newName = prompt("Enter new name:", targetUser.name);
    const newID = prompt("Enter new membership ID:", targetUser.membershipID);
    const newRole = prompt("Enter new role:", targetUser.role);

    if (newName !== null && newID !== null && newRole !== null) {
      const updatedUsers = [...users];
      updatedUsers[index] = {
        name: newName.trim(),
        membershipID: newID.trim(),
        role: newRole.trim(),
      };
      setUsers(updatedUsers);
    }
  };

  const deleteUser = (index) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="page">
      {!isLoggedIn ? (
        <div className="form-box" style={{ maxWidth: "500px", margin: "40px auto" }}>
          <h2>System Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="User Name (e.g. Admin)"
              value={loginForm.name}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Membership ID (e.g. ADM001)"
              value={loginForm.id}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, id: e.target.value }))
              }
            />
            <button type="submit" style={{ width: "100%" }}>Login</button>
          </form>
          {loginMessage.text && (
            <p
              style={{
                color: loginMessage.isError ? "red" : "green",
                marginTop: "12px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {loginMessage.text}
            </p>
          )}
        </div>
      ) : (
        <>
          <h2>User Management Page</h2>
          <div className="form-box">
            <h3>Add New User</h3>
            <form onSubmit={handleAddUser}>
              <input
                type="text"
                placeholder="Full Name"
                value={userForm.name}
                onChange={(e) =>
                  setUserForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Membership ID (e.g. MEM101)"
                value={userForm.membershipID}
                onChange={(e) =>
                  setUserForm((prev) => ({ ...prev, membershipID: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Role (e.g. Student, Admin, Staff)"
                value={userForm.role}
                onChange={(e) =>
                  setUserForm((prev) => ({ ...prev, role: e.target.value }))
                }
              />
              <button type="submit">Add User</button>
            </form>
          </div>

          <h3>Registered Users List</h3>
          {users.length === 0 ? (
            <p>No users registered yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Membership ID</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.membershipID}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        onClick={() => editUser(index)}
                        style={{ marginRight: "5px" }}
                      >
                        Update
                      </button>
                      <button onClick={() => deleteUser(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}