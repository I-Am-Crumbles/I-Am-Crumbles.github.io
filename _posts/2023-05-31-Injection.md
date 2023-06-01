## **OWASP Top 10 WebGoat - Injection**

<ins>**Introduction**</ins>

*WebGoat* is a deliberately insecure web application maintained by *OWASP* designed to teach web application security lessons. More information including how to download and run WebGoat can be found here on the projects [GitHub](https://github.com/WebGoat/WebGoat).
This is post eight of a series where I will be doing WebGoats challenges to further my understanding of the OWASP Top 10 and web application security as a whole. I have started from the number 10 and am working my way backwards to number 1.

---

<ins> **\#3. Injection** </ins>

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

<ins> **WebGoat SQL Injection Challenges** </ins>

**Challenge 1**

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

**Challenge 1**

*Path Traversal While Uploading Files*

![challenge1](/docs/assets/images/webgoat/injection/inject16.png)

For this challenge I need to use path traversal to overwrite a file I upload onto the system. I start by uploading an image to see what happens. 

![upload](/docs/assets/images/webgoat/injection/inject17.png)

I get the file path to the image I uploaded. `home/crumbles/.webgoat-2023.4/PathTraversal/crumbles/test"`

I captured the image upload request in Burp Suite to better see what was going on. Inside the request I'm able to find the parameter where the file path for the uploaded image is created. I can see in my case it's assigned a *fullname* of *test*. 

![request1](/docs/assets/images/webgoat/injection/inject18.png)

If I send this request to the *repeater* I can edit the *fullname* parameter to change the file name. In this case to satisfy the challenge I edit `../` in front of the existing *test* *fullname*. In doing so I overwrite the existing *test* file on the system. 

![edit request](/docs/assets/images/webgoat/injection/inject19.png)

![congrats](/docs/assets/images/webgoat/injection/inject20.png)

**Challenge 2**

*Path Traversal While Uploading Files Continued*

![challenge2](/docs/assets/images/webgoat/injection/inject21.png)

In this challenge the developers have implemented a fix for the attack in the previous challenge and I need to find another work around. 

If I send the request back to the repeater and modify the *fullname* parameter like I did previously I see that the leading `../` gets dropped from the URL. 

![request2](/docs/assets/images/webgoat/injection/inject22.png)

Experimenting a little I'm able to learn that the fullname parameter will drop a leading `../` and `/`, but not a leading `.` or `..`.

![edit1](/docs/assets/images/webgoat/injection/inject23.png)

![edit2](/docs/assets/images/webgoat/injection/inject24.png)

![edit3](/docs/assets/images/webgoat/injection/inject25.png)

So if I edit the *fullname* parameter so that once it removes the `../` pattern I'm left with that pattern in the URL anyway it'll satisfy the challenge. It'll look like this `....//`  

![complete2](/docs/assets/images/webgoat/injection/inject26.png)

**Challenge 3**

*Path Traversal While Uploading Files Continued*


![challenge3](/docs/assets/images/webgoat/injection/inject27.png)

If I open up the *repeater* again and attempt the solution from the previous challenge I see that the fullname parameter no longer creates the filename, it's now created by the name of the image I uploaded.  

![request3](/docs/assets/images/webgoat/injection/inject28.png)

If I scroll back up through the request in the repeater I can find the file name parameter that I need to change. Like previously making the url display `../test` as the filename will satisfy the challenge.

![filename](/docs/assets/images/webgoat/injection/inject29.png)

![complete3](/docs/assets/images/webgoat/injection/inject30.png)

---

<ins> **WebGoat Cross Site Scripting Challenges** </ins>

**Challenge 1**

*Try It! Using Chrome or Firefox*

![challenge1](/docs/assets/images/webgoat/injection/inject31.png)

If I open up the inspector tools and head over to the *console* tab and insert the alert the challenge provided for me I can see it generates a pop up alert displaying my sessions cookie. 

![console1](/docs/assets/images/webgoat/injection/inject32.png)

![console2](/docs/assets/images/webgoat/injection/inject33.png)

Since the cookies are the same on each tab I complete the challenge manually. 

![complete1](/docs/assets/images/webgoat/injection/inject34.png)

**Challenge 2**

*Reflected XSS*

![challenge2](/docs/assets/images/webgoat/injection/inject35.png)

I start off this challenge by clicking the Purchase button at the bottom of the page and seeing what happens. 

![purchase](/docs/assets/images/webgoat/injection/inject36.png)

I can see I'm returned some information in a generated response. Outside of the error message related to the challenge I receive the credit card number used to make the purchase and the total of the price column. Since the only field I really have any control over in that regard is the *credit card number* field I entered the basic alert script `<script>alert()</script>` into it and click purchase. This time it causes the JavaScript to execute once the page loads the script instead of the credit card number. 

![complete2](/docs/assets/images/webgoat/injection/inject37.png)

**Challenge 3**

*DOM-Based XSS*

![challenge3](/docs/assets/images/webgoat/injection/inject38.png)

For this challenge I need to find the route for the test code that was left in from production. The challenge also states that I will have to check the JavaScript source. If I open the inspector window and select the debugger tab I can see a directory called *WebGoat/js*, digging through that I eventually find a file called *GoatRouter.js* which sounds like something that would contain a *base route* Looking through the code in this file I eventually find a *routes* function with a parameter named *test*. 

![debugger](/docs/assets/images/webgoat/injection/inject39.png)

So I can edit the *base route* provided in the sample to contain the *test* parameter instead of *lesson* and it will satisfy the challenge.   

`start.mvc#lesson/` becomes `start.mvc#test/` 

![complete3](/docs/assets/images/webgoat/injection/inject40.png)

**Challenge 4**

*DOM-BASED XSS Continued*

![challenge4](/docs/assets/images/webgoat/injection/inject41.png)

For this challenge I need to use the route I just found to reflect a parameter from the route without encoding to execute a function in WebGoat. The function for the challenge is provided to me. 

In my case the URL looks like this: 

`http://127.0.0.1:8080/WebGoat/start.mvc#lesson/CrossSiteScripting.lesson/10` 

![url](/docs/assets/images/webgoat/injection/inject42.png)

Opening a new tab I need to modify the url replacing everything after `lesson`. I know `lesson` will be replaced with `test` and then I need to replace the parameter in the next section of the url with a script that calls the function I was provided. `%3Cscript%3Ewebgoat.customjs.phoneHome()%3C%2Fscript%3E`. 

Putting it all together it looks like this: 

`http://127.0.0.1:8080/WebGoat/start.mvc#test/%3Cscript%3Ewebgoat.customjs.phoneHome()%3C%2Fscript%3E` 

![insert script](/docs/assets/images/webgoat/injection/inject43.png)

*1077798770* 

![complete4](/docs/assets/images/webgoat/injection/inject44.png)



