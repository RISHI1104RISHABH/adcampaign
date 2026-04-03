const API="http://localhost:5000";
const user=JSON.parse(localStorage.getItem("user"));

welcome.innerText="Welcome "+user.name;

function showToast(msg){
const t=document.getElementById("toast");
t.innerText=msg;
t.classList.add("show");
setTimeout(()=>t.classList.remove("show"),2000);
}

function load(){
fetch(API+"/campaigns/"+user.id)
.then(res=>res.json())
.then(data=>{
total.innerText=data.length;
let html="";
data.forEach((c,i)=>{
html+=`
<tr style="animation-delay:${i*0.1}s">
<td>${c.name}</td>
<td>₹${c.budget}</td>
<td>${c.status}</td>
<td>
<button onclick="toggle(${c.id},'${c.status}')">🔁</button>
<button onclick="del(${c.id})">🗑️</button>
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
}).then(()=>{showToast("Created"); load();});
}

function del(id){
fetch(API+"/campaigns/"+id,{method:"DELETE"})
.then(()=>{showToast("Deleted"); load();});
}

function toggle(id,status){
const newStatus=status==="Active"?"Paused":"Active";
fetch(API+"/campaigns/"+id,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({status:newStatus})
}).then(()=>load());
}

load();
let active = 0;
let paused = 0;

data.forEach(c => {
  if (c.status === "Active") active++;
  else paused++;
});

document.getElementById("active").innerText = active;
document.getElementById("paused").innerText = paused;

function goDashboard(){
  window.location.href = "dashboard.html";
}
function openDash(){
  window.location.href = "dashboard.html";
}