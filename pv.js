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

// db.query(queries.viewAllEmployees(), (err, results) => {
//     return console.log(results)
// });

// db.query(queries.addDepartment(), "Holodeck Sanitation", (err, results) => {
//     return console.table(results)
// });

// db.query(queries.viewAllDepartments(), (err, results) => {
//     console.log(results)
//     return console.table(results)
// });

// db.query(queries.addRole(), ["Panda Tamer", 12345, 3], (err, results) => {
//     console.log(results)
//     return console.table(results)
// });

// db.query(queries.viewAllRoles(), (err, results) => {
//     return console.log(results)
// });

// db.query(queries.addEmployee(), ["Beatrice", "Potts", 0, 3, 1], (err, results) => {
//     console.log(results)
//     return console.table(results)
// });

// db.query(queries.updateEmployeeRole(), [1, 26], (err, results) => {
//     console.log(results)
//     return console.table(results)
// });

// // close connection to db
// db.end((err) => {
//     if (err) {
//         console.error('Error closing connection:', err);
//     } else {
//         console.log('Connection closed.');
//     }
// });


// inquirer stuff

function main_menu() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'Main Menu - Choose an option:\n',
            name: 'choice',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'viewAllEmployees'
                },
                {
                    name: 'View All Roles',
                    value: 'viewAllRoles'
                },
                {
                    name: 'View All Departments',
                    value: 'viewAllDepartments'
                },
                {
                    name: 'Add An Employee',
                    value: 'addEmployee'
                },
                {
                    name: 'Add A Role',
                    value: 'addRole'
                },
                {
                    name: 'Update Employee Role',
                    value: 'updateEmployeeRole'
                }
            ]
        }
    ])
    .then((answers) => {
        console.log(JSON.stringify(answers.choice, null, ' '));
        handle_menu_choice(answers);
        // switch (answers.choice) {
        //     case 'viewAllEmployees':
        //         db.query(queries.viewAllEmployees(), (err, results) => {
        //             console.table(results)
        //             return main_menu();
        //         });
        //         break;
            
        //     case 'viewAllRoles':
        //         db.query(queries.viewAllRoles(), (err, results) => {
        //             console.table(results)
        //             return main_menu();
        //         });
        //         break;
            
        //     case 'viewAllDepartments':
        //         db.query(queries.viewAllDepartments(), (err, results) => {
        //             console.table(results)
        //             return main_menu();
        //         });
        //         break;
            
        //     case 'addEmployee':
        //         // run query for role list
        //         // run query for manager list
        //         return add_employee_menu(role_list, manager_list);
        // }
        // return main_menu();
    });
}

function handle_menu_choice (answers) {
    switch (answers.choice) {
        case 'viewAllEmployees':
            db.query(queries.viewAllEmployees(), (err, results) => {
                console.table(results)
                return main_menu();
            });
            break;
        
        case 'viewAllRoles':
            db.query(queries.viewAllRoles(), (err, results) => {
                console.table(results)
                return main_menu();
            });
            break;
        
        case 'viewAllDepartments':
            db.query(queries.viewAllDepartments(), (err, results) => {
                console.table(results)
                return main_menu();
            });
            break;
        
        case 'addEmployee':
            // run query for role list
            // run query for manager list
            return add_employee_menu(role_list, manager_list);
    }
    // return main_menu();
}

function add_employee_menu() {

}

main_menu();

// what other inquirer menus will I need?

// add Employee
// Enter employee first name: Input
// Enter employee last name: Input
// Does the last name come first? List: True or False
// Select the new employee's role: List: output from Roles query
// Select the new employee's manager: List: output from Managers query

// add Role

// add Department

// update Employee

// inquirer
//     .prompt([
//         {
//             type: 'list',
//             message: 'Main Menu - Choose an option:\n',
//             name: 'choice',
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
//                 },
//                 {
//                     name: 'Add A Role',
//                     value: 'addRole'
//                 },
//                 {
//                     name: 'Update Employee Role',
//                     value: 'updateEmployeeRole'
//                 }
//             ]
//         }
//     ])
//     .then((answers) => {
//         console.log(JSON.stringify(answers.choice, null, ' '));
//         switch (answers.choice) {
//             case 'viewAllDepartments':
//                 db.query(queries.viewAllDepartments(), (err, results) => {
//                     return console.log(results)
//                 });
//         }
//     });