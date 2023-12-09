const mysql = require("mysql2");
const queries = require("./queries.js")

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
    return console.log(results)
});

db.query(queries.viewAllDepartments(), (err, results) => {
    return console.log(results)
});