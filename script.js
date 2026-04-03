const API="http://localhost:5000";
const user=JSON.parse(localStorage.getItem("user"));

welcome.innerText="Welcome "+user.name;

function load(){
fetch(API+"/campaigns/"+user.id)
.then(res=>res.json())
.then(data=>{
total.innerText=data.length;
let html="";
data.forEach(c=>{
html+=`
<tr>
<td>${c.name}</td>
<td>₹${c.budget}</td>
<td>${c.status}</td>
<td>
<button onclick="toggle(${c.id},'${c.status}')">Toggle</button>
<button onclick="del(${c.id})">Delete</button>
</td>
</tr>`;
});
table.innerHTML=html;
});
}

function create(){
fetch(API+"/campaigns",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
name:name.value,
budget:budget.value,
status:"Active",
user_id:user.id
})
}).then(load);
}

function del(id){
fetch(API+"/campaigns/"+id,{method:"DELETE"}).then(load);
}

function toggle(id,status){
const newStatus=status==="Active"?"Paused":"Active";
fetch(API+"/campaigns/"+id,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({status:newStatus})
}).then(load);
}

load();