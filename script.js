const students = ["Yagnesh", "Shiva", "Surya", "Midhun"];
const dates = [];

const tableBody = document.getElementById("tableBody");
const headerRow = document.getElementById("headerRow");

function createInput(cell, studentIndex) {
  const input = document.createElement("input");
  input.maxLength = 1;
  input.style.width = "25px";
  input.addEventListener("input", () => {
    const val = input.value.toUpperCase();
    if (!["P", "A", "Y"].includes(val)) {
      input.value = "";
      input.className = "";
      return;
    }
    input.value = val;
    input.className = val === "P" ? "present" : val === "A" ? "absent" : "late";
    calculatePercentage(cell.parentElement.rowIndex - 1);
  });
  cell.appendChild(input);
}

function calculatePercentage(index) {
  const row = tableBody.rows[index];
  let count = 0;
  for (let i = 1; i <= dates.length; i++) {
    const input = row.cells[i]?.querySelector("input");
    if (input) {
      const val = input.value.toUpperCase();
      if (val === "P" || val === "Y") count++;
    }
  }
  const perc = dates.length ? Math.round((count / dates.length) * 100) : 0;
  row.cells[dates.length + 1].textContent = perc + "%";
}

function renderStudent(name) {
  const row = tableBody.insertRow();
  row.insertCell().textContent = name;

  for (let i = 0; i < dates.length; i++) {
    createInput(row.insertCell(), row.rowIndex);
  }

  row.insertCell().textContent = "0%";

  const actionCell = row.insertCell();
  const btn = document.createElement("button");
  btn.textContent = "X";
  btn.className = "delete-btn";
  btn.onclick = () => {
    tableBody.deleteRow(row.rowIndex);
    updateAllPercentages();
  };
  actionCell.appendChild(btn);
}

function addStudent() {
  const name = document.getElementById("studentNameInput").value.trim();
  if (name) {
    students.push(name);
    renderStudent(name);
    document.getElementById("studentNameInput").value = "";
  } else {
    alert("Enter name.");
  }
}

function addDate() {
  const dateVal = document.getElementById("datePicker").value;
  if (!dateVal) return alert("Select a date.");
  const formatted = new Date(dateVal).toLocaleDateString('en-IN');
  if (dates.includes(formatted)) return alert("Date exists.");
  dates.push(formatted);

  const newHeader = document.createElement("th");
  newHeader.textContent = formatted;
  headerRow.insertBefore(newHeader, headerRow.children[headerRow.children.length - 2]);

  for (let i = 0; i < tableBody.rows.length; i++) {
    createInput(tableBody.rows[i].insertCell(dates.length), i);
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