CREATE TABLE departments (
 	dept_no VARCHAR(30) PRIMARY KEY,
 	dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE employees (
	emp_no INT PRIMARY KEY,
	birth_date DATE,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	gender VARCHAR(1),
	hire_date DATE
);

CREATE TABLE dept_emp (
 	emp_no INT REFERENCES employees(emp_no),
 	dept_no VARCHAR(30) NOT NULL REFERENCES departments(dept_no),
 	from_date DATE,
	to_date DATE
);

CREATE TABLE dept_manager (
	dept_no VARCHAR(30) NOT NULL REFERENCES departments(dept_no),
	emp_no INT REFERENCES employees(emp_no),
	from_date DATE,
	to_date DATE
);

CREATE TABLE salaries (
	emp_no INT REFERENCES employees(emp_no),
	salary INT,
	from_date DATE,
	to_date DATE
);

CREATE TABLE titles (
	emp_no INT REFERENCES employees(emp_no),
	title VARCHAR(30),
	from_date DATE,
	to_date DATE
);

SELECT * FROM departments;
SELECT * FROM dept_emp;
SELECT * FROM dept_manager;
SELECT * FROM employees;
SELECT * FROM salaries;
SELECT * FROM titles;

Once you have a complete database, do the following:

1. List the following details of each employee: employee number, last name, first name, gender, and salary.

SELECT e.emp_no, e.last_name, e.first_name, e.gender, s.salary 
FROM salaries AS s
INNER JOIN employees AS e ON
e.emp_no = s.emp_no;

2. List employees who were hired in 1986.

SELECT * from employees where hire_date BETWEEN '1986-01-01' AND '1986-12-31';

3. List the manager of each department with the following information: department number, department name, the 
managers employee number, last name, first name, and start and end employment dates.

SELECT d.dept_no, d.dept_name, dm.emp_no, e.last_name, e.first_name, dm.from_date, dm.to_date
FROM departments AS d
INNER JOIN dept_manager AS dm ON
dm.dept_no = d.dept_no
JOIN employees AS e ON
e.emp_no = dm.emp_no;

4. List the department of each employee with the following information: employee number, last name, first name,
 and department name.
 
SELECT e.emp_no, e.last_name, e.first_name, d.dept_name
FROM departments AS d
INNER JOIN dept_manager AS dm ON
dm.dept_no = d.dept_no
JOIN employees AS e ON
e.emp_no = dm.emp_no;

5. List all employees whose first name is "Hercules" and last names begin with "B."

SELECT * FROM employees WHERE first_name = 'Hercules' AND last_name like 'B%';

6. List all employees in the Sales department, including their employee number, last name, first name, and
 department name.

SELECT e.emp_no, e.last_name, e.first_name, d.dept_name
FROM departments AS d
INNER JOIN dept_manager AS dm ON
dm.dept_no = d.dept_no
JOIN employees AS e ON
e.emp_no = dm.emp_no
WHERE d.dept_name = 'Sales';

7. List all employees in the Sales and Development departments, including their employee number, last name,
 first name, and department name.
 
SELECT e.emp_no, e.last_name, e.first_name, d.dept_name
FROM departments AS d
INNER JOIN dept_manager AS dm ON
dm.dept_no = d.dept_no
JOIN employees AS e ON
e.emp_no = dm.emp_no
WHERE d.dept_name = 'Sales' OR d.dept_name = 'Development';

8. In descending order, list the frequency count of employee last names, i.e., how many employees share each
 last name.
 
SELECT last_name, COUNT(*) AS frequency
FROM employees
GROUP BY last_name
ORDER BY frequency DESC;