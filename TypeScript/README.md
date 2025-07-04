<img height="50" align="right" src="https://raw.githubusercontent.com/fchavonet/fchavonet/main/assets/images/logo-holberton_school.png" alt="Holberton School logo">

# Typescript

## 🔖 Table of contents

<details>
    <summary>
        CLICK TO ENLARGE 😇
    </summary>
    📄 <a href="#description">Description</a>
    <br>
    🎓 <a href="#objectives">Objectives</a>
    <br>
    📋 <a href="#requirements">Requirements</a>
    <br>
    📝 <a href="#instructions">Instructions</a>
    <br>
    🔨 <a href="#tech-stack">Tech stack</a>
    <br>
    📂 <a href="#files-description">Files description</a>
    <br>
    💻 <a href="#installation_and_how_to_use">Installation and how to use</a>
    <br>
    ♥️ <a href="#thanks">Thanks</a>
    <br>
    👷 <a href="#authors">Authors</a>
</details>

## 📄 <span id="description">Description</span>

This repository contains several exercises written in TypeScript to practice basic and advanced features of the language. From type annotations to namespaces, declaration merging, class-based OOP, and DOM manipulation, the goal was to gain confidence using TypeScript in real-world scenarios.

## 🎓 <span id="objectives">Objectives</span>

At the end of this project, I had to be able to explain to anyone, **without the help of Google** :

- Basic types in Typescript.
- Interfaces, Classes, and functions.
- How to work with the DOM and Typescript.
- Generic types.
- How to use namespaces.
- How to merge declarations.
- How to use an ambient Namespace to import an external library.
- Basic nominal typing with Typescript.

## 📋 <span id="requirements">Requirements</span>

- All my files will be transpiled on Ubuntu 18.04.
- My TS scripts will be checked with `jest` (version 24.9.* ).
- A `README.md` file, at the root of the folder of the project, is mandatory.
- My code should use the `.ts` extension when possible.
- The Typescript compiler should not show any warning or error when compiling your code.

## 📝 <span id="instructions">Instructions</span>

<details>
    <summary>
        <b>0. Creating an interface for a student</b>
    </summary>
    <br>

Copy the following configuration files (provided above) into the `task_0` directory: `package.json`, `.eslintrc.js`, `tsconfig.json`, `webpack.config.js`.

Write your code in the `js/main.ts` file:

- Write an interface named `Student` that accepts the following elements:
    - `firstName`: string.
    - `lastName`: string.
    - `age`: number.
    - `location`: string.
- Create 2 students variables called `student1` and `student2` and store them into an array named `studentsList`.
- Using Vanilla Javascript, render a table and for each elements in the array, append a new row to the table.
- Each row should contain the first name of the student and the location.

**Requirements:**

- When running, Webpack should return `No type errors found`.
- Every variable should use TypeScript when possible.

#
**Repo:**
- GitHub repository: `holbertonschool-web_react`.
- Directory: `TypeScript`.
- File: `task_0/js/main.ts`, `task_0/package.json`, `task_0/.eslintrc.js`, `task_0/tsconfig.json`, `task_0/webpack.config.js`.
<hr>
</details>

<details>
    <summary>
        <b>1. Let's build a Teacher interface</b>
    </summary>
    <br>

Create a directory `task_1` and copy these configuration files into this folder: `package.json`, `tsconfig.json`, `webpack.config.js`.

Write your code in the `js/main.ts` file:

- Write an interface named `Teacher` that accepts the following elements:
  
    - `firstName`: string - can only be set during initialization of an object of this interface.
    - `lastName`: string - can only be set during initialization of an object of this interface.
    - `fullTimeEmployee`: boolean.
    - `yearsOfExperience`: number - optional.
    - `location`: string.
    - Add the possibility to add any attribute to the `Teacher` object like `contract(boolean)` without specifying the name of the attribute:
        - Property should be a string.
        - Type of this property can be anything.

**Requirements:**

When running, Webpack should return No type errors found.
Every variable should use TypeScript when possible.

**Example:**

```bash
const teacher3: Teacher = {
  firstName: 'John',
  fullTimeEmployee: false,
  lastName: 'Doe',
  location: 'London',
  contract: false,
};

console.log(teacher3);

// should print
// Object
// contract: false
// firstName: "John"
// fullTimeEmployee: false
// lastName: "Doe"
// location: "London"
```

#
**Repo:**
- GitHub repository: `holbertonschool-web_react`.
- Directory: `TypeScript`.
- File: `task_1/js/main.ts`, `task_1/webpack.config.js`, `task_1/tsconfig.json`, `task_1/package.json`.
<hr>
</details>

<details>
    <summary>
        <b>2. Extending the Teacher class</b>
    </summary>
    <br>

Write an interface named `Directors` that extends `Teacher`. It requires an attribute named `numberOfReports(number)`.

**Example:**

```bash
const director1: Directors = {
  firstName: 'John',
  lastName: 'Doe',
  location: 'London',
  fullTimeEmployee: true,
  numberOfReports: 17,
};
console.log(director1);

// should print
// Object
// firstName: "John"
// fullTimeEmployee: true
// lastName: "Doe"
// location: "London"
// numberOfReports: 17
```

#
**Repo:**
- GitHub repository: `holbertonschool-web_react`.
- Directory: `TypeScript`.
- File: `task_1/js/main.ts`.
<hr>
</details>

<details>
    <summary>
        <b>3. Printing teachers</b>
    </summary>
    <br>

Write a function `printTeacher`:

- It accepts two arguments `firstName` and `lastName`.
- It returns the first letter of the firstName and the full lastName.
- Example: `printTeacher("John", "Doe") -> J. Doe`.

Write an interface for the function named `printTeacherFunction`.

#
**Repo:**
- GitHub repository: `holbertonschool-web_react`.
- Directory: `TypeScript`.
- File: `task_1/js/main.ts`.
<hr>
</details>

<details>
    <summary>
        <b>4. Writing a class</b>
    </summary>
    <br>

Write a Class named `StudentClass`:

- The constructor accepts `firstName(string)` and `lastName(string)` arguments.
- The class has a method named `workOnHomework` that return the string `Currently working`.
- The class has a method named `displayName`. It returns the firstName of the student.
- The constructor of the class should be described through an Interface.
- The class should be described through an Interface.

**Requirements:**

- You can reuse the Webpack configuration from the previous exercise to compile the code.
- When running `npm run build`, no TypeScript error should be displayed.
- Every variable should use TypeScript when possible.

#
**Repo:**
- GitHub repository: `holbertonschool-web_react`.
- Directory: `TypeScript`.
- File: `task_1/js/main.ts`.
<hr>
</details>

<details>
    <summary>
        <b>5. Advanced types Part. 1</b>
    </summary>
    <br>

Create the `DirectorInterface` interface with the 3 expected methods:

- `workFromHome()` returning a string.
- `getCoffeeBreak()` returning a string.
- `workDirectorTasks()` returning a string.
  
Create the `TeacherInterface` interface with the 3 expected methods:

- `workFromHome()` returning a string.
- `getCoffeeBreak()` returning a string.
- `workTeacherTasks()` returning a string.
  
Create a class `Director` that will implement `irectorInterface`:

- `workFromHome` should return the string `Working from home`.
- `getCoffeeBreak` should return the string `Getting a coffee break`.
- `workDirectorTasks` should return the string `Getting to director tasks`.

Create a class `Teacher` that will implement `TeacherInterface`:

`workFromHome` should return the string `Cannot work from home`.
`getCoffeeBreak` should return the string `Cannot have a break`.
`workTeacherTasks` should return the string `Getting to work`.

Create a function ``createEmployee with the following requirements:

- It can return either a `Director` or a `Teacher` instance
- It accepts 1 arguments:
    - `salary` (either number or string)
- If `salary` is a number and less than 500 - It should return a new Teacher. Otherwise it should return a `Director`.

**Expected result:**

```bash
console.log(createEmployee(200));
Teacher
console.log(createEmployee(1000));
Director
console.log(createEmployee('$500'));
Director
```

#
**Repo:**
- GitHub repository: `holbertonschool-web_react`.
- Directory: `TypeScript`.
- File: `task_2/js/main.ts`, `task_2/webpack.config.js`, `task_2/tsconfig.json`, `task_2/package.json`.
<hr>
</details>

<details>
    <summary>
        <b>6. Creating functions specific to employees</b>
    </summary>
    <br>

Write a function `isDirector`:

- It accepts `employee` as an argument.
- It will be used as a type predicate and if the employee is a director.

Write a function `executeWork`:

- It accepts `employee` as an argument.
- If the employee is a Director, it will call `workDirectorTasks`.
- If the employee is a Teacher, it will call `workTeacherTasks`.

**Expected result:**

```bash
executeWork(createEmployee(200));
Getting to work
executeWork(createEmployee(1000));
Getting to director tasks
```

#
**Repo:**
- GitHub repository: `holbertonschool-web_react`.
- Directory: `TypeScript`.
- File: `task_2/js/main.ts`.
<hr>
</details>

<details>
    <summary>
        <b>7. String literal types</b>
    </summary>
    <br>

Write a String literal type named `Subjects` allowing a variable to have the value `Math` or `History` only. Write a function named `teachClass`:

- It takes `todayClass` as an argument.
- It will return the string `Teaching Math` if `todayClass` is `Math`.
- It will return the string `Teaching History` if `todayClass` is `History`.

Expected result:

```bash
teachClass('Math');
Teaching Math
teachClass('History');
Teaching History
```

#
**Repo:**
- GitHub repository: `holbertonschool-web_react`.
- Directory: `TypeScript`.
- File: `task_2/js/main.ts`.
<hr>
</details>

<details>
    <summary>
        <b>8. Ambient Namespaces</b>
    </summary>
    <br>

Create a directory called `task_3` and copy these configuration files into it: `package.json`, `webpack.config.js`, `tsconfig.json`.

The first part of will require that you build an `interface` and a `type`. Inside a file named `interface.ts`:

- Create a type `RowID` and set it equal to `number`.
- Create an interface `RowElement` that contains these 3 fields:
    - `firstName: string`.
    - `lastName: string`.
    - `age?: number`.

You are building the next part of the application architecture. The goal is to save the entities to a database. Because of time constraints, you can’t write a connector to the database, and you decided to download a library called `crud.js`. Copy this file into the `task_3/js` directory.

**Here it is:**

```bash
export function insertRow(row) {
  console.log('Insert row', row);
  return Math.floor(Math.random() * Math.floor(1000));
}

export function deleteRow(rowId) {
  console.log('Delete row id', rowId);
  return;
}

export function updateRow(rowId, row) {
  console.log(`Update row ${rowId}`, row);

  return rowId;
}
```

Write an ambient file within `task_3/js`, named `crud.d.ts` containing the type declarations for each crud function. At the top of the file import `RowID` and RowElement from `interface.ts`.

In `main.ts`:

- At the top of the file create a `triple slash directive` that includes all the dependencies from `crud.d.ts`.
- Import the `rowID` type and `rowElement` from `interface.ts`.
- Import everything from `crud.js` as `CRUD`.

Create an object called `row` with the type `RowElement` with the fields set to these values:

- `firstName: Guillaume`.
- `lastName: Salva`.
  
Create a `const` variable named `newRowID` with the type `RowID` and assign the value the `insertRow` command.

Next, create a `const` variable named `updatedRow` with the type `RowElement` and update `row` with an age field set to `23`.

Finally, call the `updateRow` and `deleteRow` commands.

**Expected result:**

```bash
const obj = {firstName: "Guillaume", lastName: "Salva"};
CRUD.insertRow(obj)
// Insert row {firstName: "Guillaume", lastName: "Salva"}

const updatedRow: RowElement = { firstName: "Guillaume", lastName: "Salva", age: 23 };
CRUD.updateRow(newRowID, updatedRow);
// Update row 125 {firstName: "Guillaume", lastName: "Salva", age: 23}

CRUD.deleteRow(125);
// Delete row id 125
```

**Requirements:**

- When running `npm run build`, no TypeScript error should be displayed.
- Every variable should use TypeScript when possible.
- The main file and the ambient file should both import the types defined in the interface file.
- You can easily test your ambient file by looking at the intellisense of your IDE when using the 3rd party functions.

#
**Repo:**
- GitHub repository: `holbertonschool-web_react`.
- Directory: `TypeScript`.
- File: `task_3/js/main.ts`, `task_3/js/interface.ts`, `task_3/js/crud.d.ts`.
<hr>
</details>

<details>
    <summary>
        <b>9. Namespace & Declaration merging</b>
    </summary>
    <br>

Create a new directory `task_4`:

In `task_4/js/subjects`:

Create a file `Teacher.ts` and write a `Teacher` interface in a namespace named `Subjects`:

- The interface requires `firstName` and `lastName` as string.

Create a `file Subject.ts` and write a `Subject` class in the same namespace named `Subjects`:

- The class has one attribute `teacher` that implements the `Teacher` interface.
- The class has one setter method `setTeacher` that accepts a `teacher` in argument (and as setter, set the instance attribute `teacher` with it)

Create a file `Cpp.ts` and make the following modifications in the same namespace:

- Using declaration merging, add a new optional attribute `experienceTeachingC` (number) to the `Teacher` interface.
- Create a class `Cpp` extending from `Subject`.
- Write a method named `getRequirements` that will return a string `Here is the list of requirements for Cpp`.
- Write a method named `getAvailableTeacher` that will return a string `Available Teacher: <first name of teacher>`.
- If the teacher doesn’t have any experience in teaching C, then the method should return a string `No available teacher`.

Create a file `React.ts` and write a `React Class` in the same namespace.:

- Add a new attribute `experienceTeachingReact?` (number) to the `Teacher` interface.
- In the class, write a method named `getRequirements` that will return a string `Here is the list of requirements for React`.
- Write a method named `getAvailableTeacher` that will return a string `Available Teacher: <first name of teacher>`.
- If the teacher doesn’t have any experience in teaching React, then the method should return a string `No available teacher`.

Create a file `Java.ts` and write a `Java Class` in the same namespace:

- Add a new attribute `experienceTeachingJava?` (number) to the `Teacher` interface.
- In the class, write a method named `getRequirements` that will return a string `Here is the list of requirements for Java`.
- Write a method named `getAvailableTeacher` that will return a string `Available Teacher: <first name of teacher>`.
- If the teacher doesn’t have any experience in teaching Java, then the method should return a string `No available teacher`.

#
**Repo:**
- GitHub repository: `holbertonschool-web_react`.
- Directory: `TypeScript`.
- File: `task_4/package.json`, `task_4/tsconfig.json`, `task_4/js/subjects/Cpp.ts`, `task_4/js/subjects/Java.ts`, `task_4/js/subjects/React.ts`, `task_4/js/subjects/Subject.ts`, `task_4/js/subjects/Teacher.ts`.
<hr>
</details>

<details>
    <summary>
        <b>10. Brand convention & Nominal typing</b>
    </summary>
    <br>

Create a directory `task_5` and copy these configuration files into the root of `task_5: package.json`, `tsconfig.json`, `webpack.config.js`.

Create two interfaces `MajorCredits` and `MinorCredits` in `task_5/js/main.ts`:

- Each interface defines a number named `credits`.
- Add a brand property to each interface in order to uniquely identify each of them.
  
Create two functions named `sumMajorCredits` and `sumMinorCredits` in `task_5/js/main.ts`:

- Each function takes two arguments `subject1` and `subject2`.
- `sumMajorCredits` returns `MajorCredits` value and `sumMinorCredits` returns `MinorCredits` value.
- Each function sums the credits of the two subjects.

#
**Repo:**
- GitHub repository: `holbertonschool-web_react`.
- Directory: `TypeScript`.
- File: `task_5/js/main.ts`, `task_5/package.json`, `task_5/webpack.config.js`, `task_5/tsconfig.json`.
<hr>
</details>

## 🔨 <span id="tech-stack">Tech stack</span>

<p align="left">
    <img src="https://img.shields.io/badge/HTML5-e34f26?logo=html5&logoColor=white&style=for-the-badge" alt="HTML5 badge">
    <img src="https://img.shields.io/badge/JAVASCRIPT-f7df1e?logo=javascript&logoColor=black&style=for-the-badge" alt="JavaScript badge">
    <img src="https://img.shields.io/badge/TYPESCRIPT-3178c6?logo=typescript&logoColor=white&style=for-the-badge" alt="TypeScript badge">
    <img src="https://img.shields.io/badge/NODE.JS-5fa04e?logo=node.js&logoColor=white&style=for-the-badge" alt="Node.js badge">
    <img src="https://img.shields.io/badge/GIT-f05032?logo=git&logoColor=white&style=for-the-badge" alt="Git badge">
    <img src="https://img.shields.io/badge/GITHUB-181717?logo=github&logoColor=white&style=for-the-badge" alt="GitHub badge">
    <img src="https://img.shields.io/badge/MARKDOWN-000000?logo=markdown&logoColor=white&style=for-the-badge" alt="Markdown badge">
    <img src="https://img.shields.io/badge/VS CODE-007acc?logo=data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIFRyYW5zZm9ybWVkIGJ5OiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4KPHN2ZyBmaWxsPSIjZmZmZmZmIiB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9Ii0wLjUgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KDTxnIGlkPSJTVkdSZXBvX2JnQ2FycmllciIgc3Ryb2tlLXdpZHRoPSIwIi8+Cg08ZyBpZD0iU1ZHUmVwb190cmFjZXJDYXJyaWVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KDTxnIGlkPSJTVkdSZXBvX2ljb25DYXJyaWVyIj4KDTxwYXRoIGQ9Im0xNy44NTggMjMuOTk4LTkuNzcxLTkuNDg0LTUuODY2IDQuNDY1LTIuMjIxLTEuMTE1di0xMS43MTlsMi4yMzQtMS4xMjEgNS44NyA0LjQ2OSA5Ljc0Ny05LjQ5MyA1LjU4NyAyLjIzOXYxOS41MzFsLTUuNTc5IDIuMjN6bS0uNTYzLTE2LjE4Ni01LjU3NyA0LjE3MyA1LjU4IDQuMjAyem0tMTQuNTA3IDEuNjg1djUuMDE2bDIuNzg3LTIuNTI1eiIvPgoNPC9nPgoNPC9zdmc+&logoColor=white&style=for-the-badge" alt="VS Code badge">
</p>

## 📂 <span id="files-description">File description</span>

| **FILE**    | **DESCRIPTION**                                                          |
| :---------: | ------------------------------------------------------------------------ |
| `task_0`    | Exercises 0 (See <a href="#instructions">instructions</a> section).      |
| `task_1`    | Exercises 1 to 5 (See <a href="#instructions">instructions</a> section). |
| `task_2`    | Exercises 5 to 7 (See <a href="#instructions">instructions</a> section). |
| `task_3`    | Exercises 8 (See <a href="#instructions">instructions</a> section).      |
| `task_4`    | Exercises 9 (See <a href="#instructions">instructions</a> section).      |
| `task_5`    | Exercises 10 (See <a href="#instructions">instructions</a> section).     |
| `README.md` | The README file you are currently reading 😉.                            |

## 💻 <span id="installation_and_how_to_use">Installation and how to use</span>

**Installation:**

1. Clone this repository:
    - Open your preferred Terminal.
    - Navigate to the directory where you want to clone the repository.
    - Run the following command:

```bash
git clone https://github.com/fchavonet/holbertonschool-web_react.git
```

2. Navigate to a specific task directory:

```bash
cd task_3
```

3. Install dependencies:

```bash
npm install
```

**How to use:**

1. Each task folder contains its own `main.ts`

2. Build the project:

```bash
npm run build
```

3. Open `dist/index.html` in your browser (if HTML output is involved), or check your console for `console.log()` results.

## ♥️ <span id="thanks">Thanks</span>

A big thank you to all my Holberton School peers for their help and support throughout these projects.

## 👷 <span id="authors">Authors</span>

**Fabien CHAVONET**
- GitHub: [@fchavonet](https://github.com/fchavonet)
