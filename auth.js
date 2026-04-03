const API="http://localhost:5000";

function register(){
fetch(API+"/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
name:name.value,
email:email.value,
password:password.value
})
}).then(()=>location.href="login.html");
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
.then(user=>{
localStorage.setItem("user",JSON.stringify(user));
location.href="index.html";
});
}