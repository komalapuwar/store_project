import React from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ShieldCheck
} from "lucide-react";

import "../css/ProductCondition.css";


const ProductCondition = () => {


const conditions = [
 {
  id:1,
  product:"Nike Shoes",
  status:"Good",
  remarks:"New stock checked",
  checked:"Admin"
 },
 {
  id:2,
  product:"Leather Bag",
  status:"Damaged",
  remarks:"Broken zip",
  checked:"Manager"
 },
 {
  id:3,
  product:"Jacket",
  status:"Repair",
  remarks:"Need stitching",
  checked:"Admin"
 }
];


return (

<div className="page">


<div className="top">

<h1>Product Condition</h1>

<p>
Check damaged, repair and quality status of products.
</p>


<div className="actions">

<div className="search">
<Search size={18}/>
<input placeholder="Search product..."/>
</div>


<button className="add">
<Plus size={18}/>
Add Condition
</button>

</div>

</div>



<div className="card">


<table>

<thead>

<tr>
<th>ID</th>
<th>Product</th>
<th>Status</th>
<th>Remarks</th>
<th>Checked By</th>
<th>Action</th>
</tr>

</thead>



<tbody>

{
conditions.map(item=>(

<tr key={item.id}>

<td>{item.id}</td>

<td className="product">
<ShieldCheck size={20}/>
{item.product}
</td>


<td>

<span className={
item.status==="Good"
?"good":
item.status==="Damaged"
?"bad":"repair"
}>

{item.status}

</span>

</td>


<td>{item.remarks}</td>

<td>{item.checked}</td>


<td>

<button className="icon edit">
<Edit size={17}/>
</button>

<button className="icon delete">
<Trash2 size={17}/>
</button>

</td>


</tr>


))
}


</tbody>


</table>


</div>


</div>

)

}

export default ProductCondition;