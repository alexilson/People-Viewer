class Inquiries {
    constructor() {
        // inquirer prompt object for the Main Menu
        this.mainMenu = [
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
                        name: 'Update Employee Manager',
                        value: 'updateEmployeeManager'
                    },
                    {
                        name: 'View Total Utilization By Department',
                        value: 'viewUtilBudgetByDept'
                    },
                    {
                        name: 'Quit',
                        value: 'quit'
                    }
                ]
            }
        ];

        // inquirer prompt object for the Add Department menu
        this.addDeptMenu = [
            {
                type: 'input',
                message: 'Give the new department a name:',
                name: 'department_name',
            }
        ];

    }
}

module.exports = new Inquiries;