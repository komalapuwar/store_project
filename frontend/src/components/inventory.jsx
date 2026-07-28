import React from "react";
import "./Inventory.css";

import {
  Menu,
  Search,
  Bell,
  UserCircle2,
  Package,
  CircleCheckBig,
  TriangleAlert,
  CircleX,
  ChevronDown,
  Eye,
  SquarePen,
  ShoppingCart,
  Truck,
  FileText,
  Clock,
  LogOut,
  Users,
  LayoutDashboard,
  Box,
  Send
} from "lucide-react";


const Inventory = () => {


const products = [
{
id:"P001",
name:"Coca-Cola 500ml",
category:"Drinks",
quantity:120,
min:20,
status:"In Stock",
date:"28 May 2025"
},
{
id:"P002",
name:"Lays Classic 52g",
category:"Snacks",
quantity:8,
min:15,
status:"Low Stock",
date:"28 May 2025"
},
{
id:"P003",
name:"Dettol Soap 75g",
category:"Personal Care",
quantity:0,
min:10,
status:"Out of Stock",
date:"27 May 2025"
},
{
id:"P004",
name:"Tide Washing Powder 1kg",
category:"Household",
quantity:35,
min:20,
status:"In Stock",
date:"28 May 2025"
},
{
id:"P005",
name:"Parle-G Biscuit 100g",
category:"Snacks",
quantity:6,
min:10,
status:"Low Stock",
date:"28 May 2025"
},
{
id:"P006",
name:"Sprite 500ml",
category:"Drinks",
quantity:58,
min:15,
status:"In Stock",
date:"28 May 2025"
},
{
id:"P007",
name:"Surf Excel 1kg",
category:"Household",
quantity:0,
min:5,
status:"Out of Stock",
date:"27 May 2025"
},
{
id:"P008",
name:"Pepsi 500ml",
category:"Drinks",
quantity:30,
min:15,
status:"In Stock",
date:"28 May 2025"
}
];


const lowStock=[
{
name:"Lays Classic 52g",
qty:8,
min:15
},
{
name:"Parle-G Biscuit 100g",
qty:6,
min:10
},
{
name:"Tide Washing Powder 1kg",
qty:35,
min:20
},
{
name:"Dettol Soap 75g",
qty:0,
min:10
}
];


return (

<div className="inventory-page">


{/* SIDEBAR */}

<aside className="sidebar">

<h2>
🛒 Store Management
<br/>
<span>System</span>
</h2>


<div className="menu-item">
<LayoutDashboard/> Dashboard
</div>


<div className="menu-item">
<Users/> Manage Users
</div>


<div className="menu-item">
<Box/> Product Management
</div>


<div className="menu-item active">
<Package/> Inventory
</div>


<div className="menu-item">
<TriangleAlert/> Low Stock Alert
</div>


<div className="menu-item">
<FileText/> Reports & Receipts
</div>


<div className="menu-item">
<LogOut/> Logout
</div>



<div className="admin-profile">

<UserCircle2/>

<div>
<b>Admin</b>
<p>admin@example.com</p>
</div>

</div>


</aside>





{/* MAIN CONTENT */}

<main className="main-content">


<header className="topbar">

<div>
<h1>Inventory</h1>

<p>
Dashboard / Inventory
</p>

</div>



<div className="header-right">


<div className="search-box">
<Search/>
<input placeholder="Search product..."/>
</div>


<Bell className="bell"/>


<UserCircle2 size={40}/>


<div>
<b>Admin</b>
<p>Administrator</p>
</div>


<ChevronDown/>

</div>

</header>
{/* SUMMARY CARDS */}

<section className="summary-cards">


<div className="summary-card">

<div className="card-icon purple">
<Package/>
</div>

<div>
<h3>Total Products</h3>
<h2>250</h2>
<p>All items in inventory</p>
</div>

</div>




<div className="summary-card">

<div className="card-icon green">
<CircleCheckBig/>
</div>

<div>
<h3>In Stock</h3>
<h2>185</h2>
<p>Sufficient quantity</p>
</div>

</div>





<div className="summary-card">

<div className="card-icon orange">
<TriangleAlert/>
</div>

<div>
<h3>Low Stock</h3>
<h2>32</h2>
<p>Reorder soon</p>
</div>

</div>





<div className="summary-card">

<div className="card-icon red">
<CircleX/>
</div>

<div>
<h3>Out of Stock</h3>
<h2>33</h2>
<p>Need to restock</p>
</div>

</div>


</section>






<div className="inventory-layout">



{/* PRODUCT TABLE SECTION */}

<section className="product-section">


<div className="filter-bar">


<div className="table-search">

<Search/>

<input 
placeholder="Search by product name or ID..."
/>

</div>




<select>

<option>
All Categories
</option>

</select>



<select>

<option>
All Status
</option>

</select>



<button className="update-btn">
+ Update Inventory
</button>


</div>





<table className="product-table">


<thead>

<tr>

<th>Product ID</th>

<th>Product Name</th>

<th>Category</th>

<th>Quantity</th>

<th>Min. Stock</th>

<th>Status</th>

<th>Last Updated</th>

<th>Action</th>


</tr>

</thead>



<tbody>


{
products.map((item)=>(

<tr key={item.id}>


<td>{item.id}</td>


<td>{item.name}</td>


<td>{item.category}</td>


<td>{item.quantity}</td>


<td>{item.min}</td>



<td>

<span 
className={
item.status === "In Stock"
? "status stock"
:
item.status === "Low Stock"
? "status low"
:
"status out"
}
>

{item.status}

</span>

</td>



<td>{item.date}</td>




<td className="actions">

<button>
<Eye size={17}/>
</button>


<button>
<SquarePen size={17}/>
</button>


</td>


</tr>


))

}



</tbody>


</table>





<div className="pagination">


<p>
Showing 1 to 8 of 250 entries
</p>


<div>

<button>
&lt;
</button>


<button className="active-page">
1
</button>


<button>
2
</button>


<button>
3
</button>


<button>
...
</button>


<button>
32
</button>


<button>
&gt;
</button>


</div>


</div>



</section>