import React, { useState } from "react";
import "./ProductManagement.css";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  LayoutDashboard,
  Users,
  Package,
  Boxes,
  AlertTriangle,
  ShieldCheck,
  Truck,
  FileText,
  Settings,
  LogOut,
  Menu,
  Search,
  Bell,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Eye,
  
} from "lucide-react";

export default function ProductManagement() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Coca Cola",
      category: "Beverage",
      price: 120,
      stock: 45,
      status: "Available",
    },
    {
      id: 2,
      name: "Oreo Biscuit",
      category: "Snacks",
      price: 60,
      stock: 22,
      status: "Available",
    },
    {
      id: 3,
      name: "Milk 1L",
      category: "Dairy",
      price: 95,
      stock: 10,
      status: "Low Stock",
    },
    {
      id: 4,
      name: "Rice 25kg",
      category: "Grocery",
      price: 1800,
      stock: 8,
      status: "Low Stock",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Available",
  });

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      name: "Manage Users",
      icon: Users,
      path: "/manage-users",
    },
    {
      name: "Products",
      icon: Package,
      path: "/products",
    },
    {
      name: "Inventory",
      icon: Boxes,
      path: "/inventory",
    },
    {
      name: "Low Stock",
      icon: AlertTriangle,
      path: "/low-stock",
    },
    {
      name: "Condition",
      icon: ShieldCheck,
      path: "/condition",
    },
    {
      name: "Suppliers",
      icon: Truck,
      path: "/suppliers",
    },
    {
      name: "Reports",
      icon: FileText,
      path: "/reports",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const filteredProducts = products.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pm-container">

      {/* Sidebar */}

      <aside className={`pm-sidebar ${sidebarOpen ? "open" : ""}`}>

        <div className="pm-logo">

          <ShoppingBag size={24} />

          <div>

            <h2>SMS</h2>

            <span>Store Management</span>

          </div>

        </div>

        <nav>

          {navItems.map((item) => {

            const Icon = item.icon;

            return (

              <button
                key={item.name}
                className="pm-nav-btn"
                onClick={() => navigate(item.path)}
              >

                <Icon size={18} />

                <span>{item.name}</span>

              </button>

            );

          })}

        </nav>

        <button
          className="pm-nav-btn logout"
          onClick={() => navigate("/login")}
        >

          <LogOut size={18} />

          Logout

        </button>

      </aside>

      {/* Main */}

      <div className="pm-main">

        {/* Header */}

        <header className="pm-header">

          <div className="pm-header-left">

            <button
              className="pm-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >

              <Menu size={22} />

            </button>

            <div className="pm-search">

              <Search size={18} />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

          <div className="pm-header-right">

            <button className="pm-bell">

              <Bell size={20} />

            </button>

            <div className="pm-profile">

              <img
                src="https://i.pravatar.cc/100"
                alt="Admin"
              />

              <div>

                <h4>Admin</h4>

                <span>Administrator</span>

              </div>

              <ChevronDown size={16} />

            </div>

          </div>

        </header>

                {/* Page Header */}

        <div className="pm-page-header">

          <div>

            <h1>Product Management</h1>

            <p>Manage all products available in your store.</p>

          </div>

        </div>

        {/* Statistics */}

        <div className="pm-stats">

          <div className="pm-stat-card">

            <Package size={28} />

            <div>

              <h2>{products.length}</h2>

              <span>Total Products</span>

            </div>

          </div>

          <div className="pm-stat-card">

            <Boxes size={28} />

            <div>

              <h2>
                {products.filter((p) => p.status === "Available").length}
              </h2>

              <span>Available</span>

            </div>

          </div>

          <div className="pm-stat-card">

            <AlertTriangle size={28} />

            <div>

              <h2>
                {products.filter((p) => p.status === "Low Stock").length}
              </h2>

              <span>Low Stock</span>

            </div>

          </div>

        </div>

        {/* Content */}

        <div className="pm-content">

          {/* Add Product */}

          <div className="pm-form-card">

            <h2>Add Product</h2>

            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  category: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  stock: e.target.value,
                })
              }
            />

            <select
              value={newProduct.status}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  status: e.target.value,
                })
              }
            >
              <option>Available</option>
              <option>Low Stock</option>
            </select>

            <button
              className="pm-save-btn"
              onClick={() => {
                if (
                  !newProduct.name ||
                  !newProduct.category ||
                  !newProduct.price ||
                  !newProduct.stock
                ) {
                  alert("Please fill all fields.");
                  return;
                }

                setProducts([
                  ...products,
                  {
                    id: products.length + 1,
                    ...newProduct,
                  },
                ]);

                setNewProduct({
                  name: "",
                  category: "",
                  price: "",
                  stock: "",
                  status: "Available",
                });

                alert("Product Added Successfully");
              }}
            >
              <Plus size={18} />

              Add Product

            </button>

          </div>

                    {/* Product Table */}

          <div className="pm-table-card">

            <div className="pm-table-header">

              <h2>Product List</h2>

            </div>

            <table className="pm-table">

              <thead>

                <tr>

                  <th>ID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.map((product) => (

                  <tr key={product.id}>

                    <td>{product.id}</td>

                    <td>

                      <div className="pm-product-name">

                        <Package size={18} />

                        {product.name}

                      </div>

                    </td>

                    <td>{product.category}</td>

                    <td>Rs. {product.price}</td>

                    <td>{product.stock}</td>

                    <td>

                      <span
                        className={
                          product.status === "Available"
                            ? "pm-status available"
                            : "pm-status low"
                        }
                      >
                        {product.status}
                      </span>

                    </td>

                    <td>

                      <button
                        className="pm-icon-btn"
                        onClick={() =>
                          alert(
                            `Product Details\n\nName: ${product.name}\nCategory: ${product.category}\nPrice: Rs. ${product.price}\nStock: ${product.stock}`
                          )
                        }
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        className="pm-icon-btn edit"
                        onClick={() =>
                          alert("Edit feature will be added later.")
                        }
                      >
                        <Edit size={17} />
                      </button>

                      <button
                        className="pm-icon-btn delete"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Delete "${product.name}" ?`
                            )
                          ) {
                            setProducts(
                              products.filter(
                                (item) => item.id !== product.id
                              )
                            );
                          }
                        }}
                      >
                        <Trash2 size={17} />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}