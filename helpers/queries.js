const mysql = require("mysql2");

class Queries {

    connect() {
        return mysql.createConnection(
            {
              host: 'localhost',
              user: 'root',
              password: 'pottspass',
              database: 'people_db'
            },
            console.log(`Connected to the people_db database.\n`)
          );
    }
    
    viewAllDepartments() {
        return `
        SELECT
            name AS "Department Name",
            id AS "Department ID"
        FROM 
            department
        `;
    }

    viewAllRoles() {
        return `
        SELECT
            role.title AS "Job Title",
            role.id AS "Role ID",
            department.name AS "Department",
            role.salary AS "Salary"
        FROM 
            role
        JOIN 
            department ON role.department_id = department.id
        `;
    }

    viewAllEmployees() {
        return `
        SELECT
            employee.id AS "ID", 
            IF (
                employee.flip_name = 1,
                CONCAT(employee.last_name, " ", employee.first_name),
                IF (
                    employee.last_name IS NULL OR employee.last_name = "",
                    employee.first_name,
                    CONCAT(employee.first_name, " ", employee.last_name)
                )
            ) AS "Name",
            role.title AS "Job Title",
            department.name AS "Department Name",
            role.salary AS "Salary",
            manager.first_name AS "Manager First Name",
            manager.last_name AS "Manager Last Name"
        FROM 
            employee
        LEFT JOIN 
            employee AS manager ON employee.manager_id = manager.id
        JOIN 
            role ON employee.role_id = role.id
        JOIN 
            department on role.department_id = department.id
        `;
    }

    addDepartment() {
        return `
        INSERT INTO 
            department (name) 
        VALUES 
            (?)
        `;
    }

    addRole() {
        return `
        INSERT INTO 
            role (title, salary, department_id)    
        VALUES 
            (?, ?, ?);
        `;
    }

    addEmployee() {
        return `
        INSERT INTO 
            employee (first_name, last_name, flip_name, role_id, manager_id) 
        VALUES 
            (?, ?, ?, ?, ?)
        `;
    }

    updateEmployeeRole() {
        return `
        UPDATE 
            employee
        SET 
            role_id = ?
        WHERE 
            id = ?
        `;
    }

    updateEmployeeManager() {
        return `
        UPDATE 
            employee
        SET 
            manager_id = ?
        WHERE 
            id = ?
        `;
    }

    viewUtilBudgetByDept() {
        return `
        SELECT
            department.name AS "Department Name",
            SUM(role.salary) AS "Total Utilized"
        FROM
            department
        LEFT JOIN
            role ON department.id = role.department_id
        RIGHT JOIN
            employee ON role.id = employee.role_id
        GROUP BY
            (department.name)
        `;
    }
}

module.exports = new Queries;