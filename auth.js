const API="http://localhost:5000";

function showToast(msg){
const t=document.getElementById("toast");
t.innerText=msg;
t.classList.add("show");
setTimeout(()=>t.classList.remove("show"),2000);
}

function togglePass(){
password.type=password.type==="password"?"text":"password";
}

function register(){
fetch(API+"/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
name:name.value,
email:email.value,
password:password.value
})
})
.then(()=>{showToast("Registered"); setTimeout(()=>location="login.html",1000);})
.catch(()=>showToast("Error"));
}

function login(){
fetch(API+"/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
email:email.value,
password:password.value
})
})
.then(res=>res.json())
.then(u=>{
localStorage.setItem("user",JSON.stringify(u));
showToast("Welcome");
setTimeout(()=>location="index.html",1000);
})
.catch(()=>showToast("Invalid"));
}