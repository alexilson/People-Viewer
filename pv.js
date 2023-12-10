const mysql = require("mysql2");
const queries = require("./helpers/queries.js")
const inquirer = require("inquirer");

// database stuff

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'pottspass',
      database: 'people_db'
    },
    console.log(`Connected to the people_db database.`)
  );

// db.query(queries.viewAllDepartments(), (err, results) => {
//     return console.log(results)
// });

// db.query(queries.viewAllRoles(), (err, results) => {
//     return console.log(results)
// });

// db.query(queries.viewAllEmployees(), (err, results) => {
//     return console.log(results)
// });

db.query(queries.addDepartment(), "Holodeck Sanitation", (err, results) => {
    return console.table(results)
});

db.query(queries.viewAllDepartments(), (err, results) => {
    console.log(results)
    return console.table(results)
});

db.query(queries.addEmployee(), ["Beatrice", "Potts", 0, 3, 1], (err, results) => {
    console.log(results)
    return console.table(results)
});

db.query(queries.updateEmployee(), [1, 26], (err, results) => {
    console.log(results)
    return console.table(results)
});

close connection to db
db.end((err) => {
    if (err) {
        console.error('Error closing connection:', err);
    } else {
        console.log('Connection closed.');
    }
});


// inquirer stuff

// inquirer
//     .prompt([
//         {
//             type: 'list',
//             message: 'Main Menu - Choose an option:\n',
//             name: 'test',
//             choices: [
//                 {
//                     name: 'View All Employees',
//                     value: 'viewAllEmployees'
//                 },
//                 {
//                     name: 'View All Roles',
//                     value: 'viewAllRoles'
//                 },
//                 {
//                     name: 'View All Departments',
//                     value: 'viewAllDepartments'
//                 },
//                 {
//                     name: 'Add An Employee',
//                     value: 'addEmployee'
//                 }
//             ]
//         }
//     ])
//     .then((answers) => {
//         console.log(JSON.stringify(answers, null, ' '));
//     });