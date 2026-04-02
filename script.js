const API = "http://localhost:5000";
const user = JSON.parse(localStorage.getItem("user"));

document.getElementById("welcome").innerText = "Welcome " + user.name;

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

function loadCampaigns() {
  fetch(API + "/campaigns/" + user.id)
    .then(res => res.json())
    .then(data => {
      let html = "";
      data.forEach(c => {
        html += `
          <tr>
            <td>${c.name}</td>
            <td>${c.page}</td>
            <td>${c.budget}</td>
            <td>${c.status}</td>
            <td><button onclick="deleteCampaign(${c.id})">Delete</button></td>
          </tr>
        `;
      });
      document.getElementById("campaignTable").innerHTML = html;
    });
}

function createCampaign() {
  const name = document.getElementById("name").value;
  const page = document.getElementById("page").value;
  const budget = document.getElementById("budget").value;

  fetch(API + "/campaigns", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name,
      page,
      budget,
      status: "Active",
      user_id: user.id
    })
  }).then(() => loadCampaigns());
}

function deleteCampaign(id) {
  fetch(API + "/campaigns/" + id, { method: "DELETE" })
    .then(() => loadCampaigns());
}

loadCampaigns();