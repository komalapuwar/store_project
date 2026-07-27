import React, { useState } from "react";
import "./ManageUsers.css";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserPlus,
  Search,
  Bell,
  Menu,
  ChevronDown,
  Edit,
  Trash2,
  Home,
  Package,
  Boxes,
  FileText,
  Truck,
  LogOut
} from "lucide-react";



export default function ManageUsers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [users,setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@gmail.com",
      role: "Manager",
      status: "Active",
    },
    {
      id: 2,
      name: "Emma Watson",
      email: "emma@gmail.com",
      role: "Supplier",
      status: "Active",
    },
    {
      id: 3,
      name: "David Lee",
      email: "david@gmail.com",
      role: "Manager",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Sophia Brown",
      email: "sophia@gmail.com",
      role: "Supplier",
      status: "Active",
    },
  ]);

  const [newUser, setNewUser] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "Manager",
});

const handleSaveUser = () => {
  if (
        !newUser.name ||
        !newUser.email ||
        !newUser.password ||
        !newUser.confirmPassword
    ) {
        alert("Please fill in all fields.");
        return;
    }


    if(newUser.password !== newUser.confirmPassword){
        alert("Passwords do not match");
        return;
    }

    const user = {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "Active"
    };

    setUsers([...users,user]);

    setNewUser({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "Manager",
});

    alert("User Added Successfully");
};

  return (
    <div className="manage-users">

      {/* Sidebar */}

      <aside className="sidebar">

        <div className="logo">
          <h2>SMS</h2>
          <span>Store Management</span>
        </div>

        <ul>

          <li><Home size={18}/> Dashboard</li>

          <li className="active"><Users size={18}/> Manage Users</li>

          <li><Package size={18}/> Products</li>

          <li><Boxes size={18}/> Inventory</li>

          <li><Truck size={18}/> Suppliers</li>

          <li><FileText size={18}/> Reports</li>

          <li><LogOut size={18}/> Logout</li>

        </ul>

      </aside>

      {/* Main */}

      <div className="main">

        {/* Header */}

        <header className="header">

          <div className="header-left">

            <Menu size={22}/>

            <div className="search-box">

              <Search size={18}/>

              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />

            </div>

          </div>

          <div className="header-right">

            <Bell size={20}/>

            <div className="profile">

              <img
                src="https://i.pravatar.cc/100"
                alt=""
              />

              <span>Admin</span>

              <ChevronDown size={18}/>

            </div>

          </div>

        </header>

        {/* Page Title */}

        <div className="page-title">

          <div>

            <h1>Manage Users</h1>

            <p>Manage all registered users of the system.</p>

          </div>

          <button className="add-btn">

            <UserPlus size={18}/>

            Add User

          </button>

        </div>

        {/* Statistics */}

        <div className="stats">

          <div className="card">
            <h4>Total Users</h4>
            <h2>125</h2>
          </div>

          <div className="card">
            <h4>Managers</h4>
            <h2>18</h2>
          </div>

          <div className="card">
            <h4>Suppliers</h4>
            <h2>32</h2>
          </div>

          <div className="card">
            <h4>Admins</h4>
            <h2>4</h2>
          </div>

        </div>

        {/* Content */}

        <div className="content">

          {/* Table */}

          <div className="table-card">

            <table>

              <thead>

                <tr>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Role</th>

                  <th>Status</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {users.map((user)=>(
                  <tr key={user.id}>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>{user.role}</td>

                    <td>

                      <span
                        className={
                          user.status==="Active"
                          ? "status active-status"
                          : "status inactive-status"
                        }
                      >
                        {user.status}
                      </span>

                    </td>

                    <td>

                      <button className="icon-btn">

                        <Edit size={16}/>

                      </button>

                      <button className="icon-btn delete">

                        <Trash2 size={16}/>

                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* Add User Form */}

          <div className="form-card">

            <h3>Add New User</h3>

            <input type="text"
            placeholder="Full Name"
            value={newUser.name}
            onChange={(e)=>
              setNewUser({...newUser,name:e.target.value})
              }
              />

            <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e)=>
            setNewUser({...newUser,email:e.target.value})
            }
            />

            <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e)=>
              setNewUser({...newUser,password:e.target.value})
              }
              />

              <input
              type="password"
              placeholder="Confirm Password"
              value={newUser.confirmPassword}
              onChange={(e)=>
              setNewUser({...newUser,confirmPassword:e.target.value})
              }
              />

            <select
            value={newUser.role}
            onChange={(e)=>
            setNewUser({...newUser,role:e.target.value})
            }
            >
           <option>Manager</option>
           <option>Supplier</option>
           <option>Admin</option>
           </select>

            <button
            className="save-btn"
            onClick={handleSaveUser}
            >
              Save User
              </button>



          </div>

        </div>

      </div>

    </div>
  );
}