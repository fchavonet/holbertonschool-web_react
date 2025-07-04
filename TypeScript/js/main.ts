interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: "Alice",
  lastName: "Dupont",
  age: 21,
  location: "Paris",
};

const student2: Student = {
  firstName: "Bob",
  lastName: "Martin",
  age: 23,
  location: "Toulouse",
};

const studentsList: Student[] = [student1, student2];

// Create the table.
const table: HTMLTableElement = document.createElement("table");
const headerRow = document.createElement("tr");
const headerName = document.createElement("th");
const headerLocation = document.createElement("th");

headerName.textContent = "First Name";
headerLocation.textContent = "Location";
headerRow.appendChild(headerName);
headerRow.appendChild(headerLocation);
table.appendChild(headerRow);

// Append students to table.
studentsList.forEach((student) => {
  const row = document.createElement("tr");
  const nameCell = document.createElement("td");
  const locationCell = document.createElement("td");

  nameCell.textContent = student.firstName;
  locationCell.textContent = student.location;

  row.appendChild(nameCell);
  row.appendChild(locationCell);
  table.appendChild(row);
});

document.body.appendChild(table);
