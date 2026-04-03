const data = [
  {
    name: "Car Offer",
    budget: 9000,
    start: "2026-03-26",
    end: "2026-04-11",
    status: "active",
    img: "https://via.placeholder.com/60"
  },
  {
    name: "Car Campaign",
    budget: 435453,
    start: "2026-04-03",
    end: "2026-04-08",
    status: "paused",
    img: "https://via.placeholder.com/60"
  },
  {
    name: "Clothes Sale",
    budget: 5000,
    start: "2026-03-27",
    end: "2026-03-19",
    status: "completed",
    img: "https://via.placeholder.com/60"
  }
];

function loadTable() {
  let html = "";

  data.forEach((d, i) => {
    html += `
      <tr>
        <td><img src="${d.img}" width="60"></td>
        <td>${d.name}</td>
        <td>₹${d.budget}</td>
        <td>${d.start}</td>
        <td>${d.end}</td>
        <td class="${d.status}">${d.status}</td>
        <td>
          <button class="edit" onclick="edit(${i})">✏</button>
          <button class="delete" onclick="del(${i})">🗑</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("tableData").innerHTML = html;
}

function del(i) {
  data.splice(i, 1);
  loadTable();
}

function edit(i) {
  alert("Edit feature coming soon!");
}

loadTable();
function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
function savePage() {

  const name = document.getElementById("pname").value;
  const budget = document.getElementById("pbudget").value;
  const start = document.getElementById("pstart").value;
  const end = document.getElementById("pend").value;
  const status = document.getElementById("pstatus").value;

  if (!name || !budget || !start || !end) {
    alert("Fill all fields!");
    return;
  }

  data.push({
    name,
    budget,
    start,
    end,
    status,
    img: "https://via.placeholder.com/60"
  });

  closeModal();
  loadTable();
}