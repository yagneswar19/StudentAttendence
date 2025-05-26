let students = ["Yagnesh", "Shiva", "Surya", "Midhun"];
let dates = [];

let tableBody = document.getElementById("tableBody");
let headerRow = document.getElementById("headerRow");

// Handle all input events on tableBody (event delegation)
tableBody.addEventListener("input", (e) => {
  if (e.target.tagName === "INPUT") {
    let input = e.target;
    let val = input.value.toUpperCase();
    if (!["P", "A", "L"].includes(val)) {
      input.value = "";
      input.className = "";
      return;
    }
    input.value = val;
    input.className = val === "P" ? "present" : val === "A" ? "absent" : "late";

    let rowIndex = input.closest("tr").rowIndex - 1;
    calculatePercentage(rowIndex);
  }
});

function createInput(cell) {
  let input = document.createElement("input");
  input.maxLength = 1;
  input.style.width = "25px";
  cell.appendChild(input);
}

function calculatePercentage(index) {
  let row = tableBody.rows[index];
  let count = 0;
  for (let i = 1; i <= dates.length; i++) {
    let input = row.cells[i]?.querySelector("input");
    if (input) {
      let val = input.value.toUpperCase();
      if (val === "P" || val === "L") count++;
    }
  }
  let perc = dates.length ? Math.round((count / dates.length) * 100) : 0;
  row.cells[dates.length + 1].textContent = perc + "%";
}

function renderStudent(name) {
  let row = tableBody.insertRow();
  row.insertCell().textContent = name;

  for (let i = 0; i < dates.length; i++) {
    createInput(row.insertCell());
  }

  row.insertCell().textContent = "0%";

  let actionCell = row.insertCell();
  let btn = document.createElement("button");
  btn.textContent = "X";
  btn.className = "delete-btn";
  btn.addEventListener("click", () => {
    tableBody.deleteRow(row.rowIndex);
    updateAllPercentages();
  });
  actionCell.appendChild(btn);
}

function addStudent() {
  let name = document.getElementById("studentNameInput").value.trim();
  if (name) {
    students.push(name);
    renderStudent(name);
    document.getElementById("studentNameInput").value = "";
  } else {
    alert("Enter name.");
  }
}

function addDate() {
  let dateVal = document.getElementById("datePicker").value;
  if (!dateVal) return alert("Select a date.");
  let formatted = new Date(dateVal).toLocaleDateString('en-IN');
  if (dates.includes(formatted)) return alert("Date exists.");
  dates.push(formatted);

  let newHeader = document.createElement("th");
  newHeader.textContent = formatted;
  headerRow.insertBefore(newHeader, headerRow.children[headerRow.children.length - 2]);

  for (let i = 0; i < tableBody.rows.length; i++) {
    createInput(tableBody.rows[i].insertCell(dates.length));
  }

  updateAllPercentages();
  document.getElementById("datePicker").value = "";
}

function updateAllPercentages() {
  for (let i = 0; i < tableBody.rows.length; i++) {
    calculatePercentage(i);
  }
}

students.forEach(renderStudent);
