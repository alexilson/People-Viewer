const mysql = require("mysql2");
const queries = require("./helpers/queries.js")
const inquirer = require("inquirer");
const figlet = require("figlet");

// connect to db

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'pottspass',
      database: 'people_db'
    },
    console.log(`Connected to the people_db database.\n`)
  );

// welcome!

function welcome() {
    welcome_message = `People\n Viewer`
    figlet(welcome_message,
    {
        font: "Big Money-ne"
    },
    function (err, data) {
        if (err) {
            return console.dir(err);
        } else {
            console.log(data);
            main_menu();
        }
    });
}

function choiceArray(results, name_key, value_key) {
    const choices = results.map((row) => ({
        name: row[name_key],
        value: row[value_key]
    }))
    // console.log(choices)
    return choices
}

// database stuff


// db.query(queries.viewAllDepartments(), (err, results) => {
//     return console.log(results)
// });

// // db.query(queries.viewAllEmployees(), (err, results) => {
// //     return console.log(results)
// // });

// // db.query(queries.addDepartment(), "Holodeck Sanitation", (err, results) => {
// //     return console.table(results)
// // });

// // db.query(queries.viewAllDepartments(), (err, results) => {
// //     console.log(results)
// //     return console.table(results)
// // });

// // db.query(queries.addRole(), ["Panda Tamer", 12345, 3], (err, results) => {
// //     console.log(results)
// //     return console.table(results)
// // });

// db.query(queries.viewAllRoles(), (err, results) => {
//     return console.log(results)
// });

// // db.query(queries.addEmployee(), ["Beatrice", "Potts", 0, 3, 1], (err, results) => {
// //     console.log(results)
// //     return console.table(results)
// // });

// // db.query(queries.updateEmployeeRole(), [1, 26], (err, results) => {
// //     console.log(results)
// //     return console.table(results)
// // });

// // // close connection to db
// // db.end((err) => {
// //     if (err) {
// //         console.error('Error closing connection:', err);
// //     } else {
// //         console.log('Connection closed.');
// //     }
// // });


// // inquirer stuff

function main_menu() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: '\n\nMain Menu - Choose an option:\n\n',
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
                    name: 'Add A Department',
                    value: 'addDepartment'
                },
                {
                    name: 'Add A Role',
                    value: 'addRole'
                },
                {
                    name: 'Add An Employee',
                    value: 'addEmployee'
                },
                {
                    name: 'Update Employee Role',
                    value: 'updateEmployeeRole'
                },
                {
                    name: 'Quit',
                    value: 'quit'
                }
            ]
        }
    ])
    .then((answers) => {
        console.log(JSON.stringify(answers.choice, null, ' '));
        handle_menu_choice(answers);
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

        case 'addDepartment':
            return add_department_menu();
        
        case 'addRole':
            return add_role_menu();
        
        case 'addEmployee':
            return add_employee_menu();

        case 'updateEmployee':
            return update_employee();

        case 'quit':
            // close connection to db
            db.end((err) => {
                if (err) {
                    console.error('Error closing connection:', err);
                } else {
                    console.log('Connection closed.');
                }
            });
            return process.exit();
    }
}

function add_department_menu() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Give the new department a name:',
            name: 'department_name',
        }
    ])
    .then((answers) => {
        console.log(JSON.stringify(answers.department_name, null, ' '));
        db.query(queries.addDepartment(), answers.department_name, (err, results) => {
            console.table(results);
            return main_menu();
        })
    });
}

function add_role_menu() {

    db.query(queries.viewAllDepartments(), (err, results) => {
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'Give the new role a name:',
                name: 'role_name',
            },
            {
                type: 'input',
                message: 'Give the new role a salary:',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'Select the department for the new role:',
                name: 'department',
                choices: choiceArray(results, "Department Name", "Department ID")
            }
        ])
        .then((answers) => {
            db.query(queries.addRole(), [answers.role_name, answers.salary, answers.department], (err, results) => {
                console.table(results);
                return main_menu();
            })
        });
    })
}

function add_employee_menu() {
    db.query(queries.viewAllRoles(), (err, rolesResults) => {
        db.query(queries.viewAllEmployees(), (err, empsResults) => {
            const roleChoices = choiceArray(rolesResults, 'Job Title', 'Role ID');
            const managerChoices = choiceArray(empsResults, 'Name', 'ID');
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the employee first name?',
                    name: 'first_name',
                },
                {
                    type: 'input',
                    message: 'What is the employee last name?',
                    name: 'last_name',
                },
                {
                    type: 'list',
                    message: 'Should the last name come first?',
                    name: 'flip_name',
                    choices: [
                        {
                            name: "No",
                            value: 0
                        },
                        {
                            name: "Yes",
                            value: 1
                        }
                    ]
                },
                {
                    type: 'list',
                    message: 'Select the role for the new employee:',
                    name: 'role',
                    choices: roleChoices
                },
                {
                    type: 'list',
                    message: 'Select the manager for the new employee:',
                    name: 'manager',
                    choices: managerChoices
                }
            ])
            .then((answers) => {
                console.log(answers)
                db.query(queries.addEmployee(), [answers.first_name, answers.last_name, answers.flip_name, answers.role, answers.manager], (err, results) => {
                    console.table(results);
                    return main_menu();
                })
            })
        })
    })
}

function update_employee () {

}

welcome();