USE people_db;

INSERT INTO department (name) VALUES
("Command"),
("Security"),
("Engineering"),
("Science"),
("Medical"),
("Helm");

INSERT INTO role (title, salary, department_id) VALUES
("Captain", 250000.00, 1),
("Executive Officer", 175000.00, 1),
("Chief of Security", 150000.00, 2),
("Chief of Engineering", 150000.00, 3),
("Chief Science Officer", 150000.00, 4),
("Chief Medical Officer", 200000.00, 5),
("Ship Pilot", 75000.00, 6),
("Security Officer", 75000.00, 2),
("Engineer", 75000.00, 3),
("Scientist", 75000.00, 4),
("Nurse", 75000.00, 5),
("Navigation Robot", 0.00, 6),
("Communication Officer", 75000.00, 1);

INSERT INTO employee (first_name, last_name, flip_name, role_id, manager_id) VALUES
("James", "Kirk", 0, 1, null),
("Christopher", "Pike", 0, 1, null),
("Jean Luc", "Picard", 0, 1, null),
("Benjamin", "Sisko", 0, 1, null),
("Katherine", "Janeway", 0, 1, null),
("Jonathan", "Archer", 0, 1, null),
("Carol", "Freeman", 0, 1, null),
("Una", "Chin-Riley", 0, 2, 2),
("William", "Riker", 0, 2, 3),
("Spock", null, 0, 5, 1),
("Nerys", "Kira", 1, 2, 4),
("Chakotay", null, 0, 2, 5),
("Jack", "Ransom", 0, 2, 7),
("Worf", "Son of Mogh", 0, 3, 3),
("Odo", "", 0, 3, 4),
("Tuvok", null, 0, 3, 5),
("Malcolm", "Reed", 0, 3, 6),
("Drazon", "Shaxs", 1, 3, 7),
("Montgomery", "Scott", 0, 4, 1),
("Pelia", null, 0, 4, 2),
("Geordi", "LeForge", 0, 4, 3),
("Miles", "O'Brien", 0, 4, 4),
("Belana", "Torres", 0, 4, 5),
("Travis", "Tucker", 0, 4, 6),
("Andy", "Billups", 0, 4, 7);
