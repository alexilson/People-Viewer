// const mysql = require("mysql2");
const inquirer = require("inquirer");
const figlet = require("figlet");
const queries = require("./helpers/queries.js");
const inquiries = require("./helpers/inquiries.js");

// connect to db

const db = queries.connect();

// display welcome message and main menu

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
            return main_menu();
        }
    });
}

// function for creating an array of choice options, takes in the output from a sql query and the fields where the name and value can be found

function choiceArray(results, name_key, value_key) {
    const choices = results.map((row) => ({
        name: row[name_key],
        value: row[value_key]
    }))
    return choices
};

// inquirer stuff

// display the main menu
function main_menu() {
    inquirer
    .prompt(inquiries.mainMenu)
    .then((answers) => {
        handle_menu_choice(answers);
    });
};

// switch case for all the main menu choices. It will either run the query and return to the main menu, or run a function for more prompts.
function handle_menu_choice (answers) {
    switch (answers.choice) {
        case 'viewAllEmployees':
            db.query(queries.viewAllEmployees(), (err, results) => {
                console.table(results)
                return main_menu();
            });
            // need to put a break here or it will the other queries
            break;
        
        case 'viewAllRoles':
            db.query(queries.viewAllRoles(), (err, results) => {
                console.table(results)
                return main_menu();
            });
            // need to put a break here or it will the other queries
            break;
        
        case 'viewAllDepartments':
            db.query(queries.viewAllDepartments(), (err, results) => {
                console.table(results)
                return main_menu();
            });
            // need to put a break here or it will the other queries
            break;

        case 'addDepartment':
            return add_department_menu();
        
        case 'addRole':
            return add_role_menu();
        
        case 'addEmployee':
            return add_employee_menu();

        case 'updateEmployeeRole':
            return update_employee_role();

        case 'updateEmployeeManager':
            return update_employee_manager();
        
        case 'viewUtilBudgetByDept':
            db.query(queries.viewUtilBudgetByDept(), (err, results) => {
                console.table(results);
                return main_menu();
            });
            // need to put a break here or it will the other queries
            break;
        

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
};

// prompts for the Add Department questions and then runs the update statement with the input and returns to main menu.
function add_department_menu() {
    inquirer
    .prompt(inquiries.addDeptMenu)
    .then((answers) => {
        db.query(queries.addDepartment(), answers.department_name, (err, results) => {
            console.table(results);
            return main_menu();
        })
    });
};

// queries the db for a list of departments, then prompts for creating a new role and uses the query results
// for a list of existing departments. Then it updates the database based on input and returns to main menu.
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
                // run the results through choiceArray to format for Inquirer
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
};

// queries the db for a list of roles and employees, then prompts for creating a new role and uses the query results
// for a list of roles and potential managers. Then it updates the database based on input and returns to main menu.
function add_employee_menu() {
    db.query(queries.viewAllRoles(), (err, rolesResults) => {
        // second query is nested inside the first
        db.query(queries.viewAllEmployees(), (err, empsResults) => {
            // assign both query results to variables after passing them through the choiceArray function to format them for Inquirer
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
                db.query(queries.addEmployee(), [answers.first_name, answers.last_name, answers.flip_name, answers.role, answers.manager], (err, results) => {
                    console.table(results);
                    return main_menu();
                })
            })
        })
    })
};

// queries the db for a list of roles and employees, then displays a list of existing employees from the query, then a list of 
// roles from the other query. Then it updates the database based on input and returns to main menu.
function update_employee_role() {
    db.query(queries.viewAllRoles(), (err, rolesResults) => {
        // nested query
        db.query(queries.viewAllEmployees(), (err, empsResults) => {
            // query results to Inquirer format
            const roleChoices = choiceArray(rolesResults, 'Job Title', 'Role ID');
            const empChoices = choiceArray(empsResults, 'Name', 'ID');
            inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Select the employee to update:',
                    name: 'employee',
                    choices: empChoices
                },
                {
                    type: 'list',
                    message: 'Select the role for the new employee:',
                    name: 'role',
                    choices: roleChoices
                }
            ])
            .then((answers) => {
                console.log(answers)
                db.query(queries.updateEmployeeRole(), [answers.role, answers.employee], (err, results) => {
                    console.table(results);
                    return main_menu();
                })
            })
        })
    })
};

// queries the db for a list of employees, then displays a list of current employees, then displays the same list as
// the choice for the new manager. Then it updates the database based on input and returns to main menu.
function update_employee_manager() {
    db.query(queries.viewAllEmployees(), (err, empsResults) => {
        const empChoices = choiceArray(empsResults, 'Name', 'ID');
        inquirer
        .prompt([
            {
                type: 'list',
                message: 'Select the employee to update:',
                name: 'employee',
                choices: empChoices
            },
            {
                type: 'list',
                message: 'Select the new manager for the employee:',
                name: 'manager',
                choices: empChoices
            }
        ])
        .then((answers) => {
            console.log(answers)
            db.query(queries.updateEmployeeManager(), [answers.manager, answers.employee], (err, results) => {
                console.table(results);
                return main_menu();
            })
        })
    })
};

module.exports = welcome;