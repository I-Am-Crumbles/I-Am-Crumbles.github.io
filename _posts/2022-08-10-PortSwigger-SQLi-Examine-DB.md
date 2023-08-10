## **PortSwigger - SQLi Examining The Database**

When exploiting SQLi vulnerabilities it is often necessary to gather information about the database itself. This includes the type and version of the software and the contents of the database in terms of which tables and columns it contains.   

Different databases provide different ways to query their version. An attacker often needs to try different queries to find one that works allowing them to infer the type of database software in use 

Some queries used to determine the database and version for popular database types include: 

*Microsoft MYSQL* `SELECT @@version` 

*Oracle* `SELECT * FROM v$version` 

*PostgreSQL* `SELECT version ()` 

Most database types, with the exception of Oracle, have a set of views called *the information schema* which provide information about the database. You can query `FROM` `information_schema.tables` in a `SELECT` query. 

`SELECT * FROM information_schema.tables` 

The above query will  output a list of table names which can then be used to query `FROM` `information_schema.columns` to list column names for that individual table.  

`SELECT * FROM information_schema.columns WHERE table_name = 'Users'` 

This should output the columns in the specified table, *Users* in this case, and the data type of each column. 

---

On Oracle you can obtain the same information with slightly different queries for example you can query `all_tables` to list all of the tables. 

`SELECT * FROM all_tables` 

Then once you have the tables names you can list the columns from the specified tables by querying `all_tab_columns`. For example to query the columns in the *USERS* table:

`SELECT * FROM all_tab_columns WHERE table_name = 'USERS'`

---

**Labs**

*SQLi Attack, Querying The Database Type And Version On Oracle*

![lab1](/docs/assets/images/portswigger/sqli/examinedb/examinedb01.png)

![request](/docs/assets/images/portswigger/sqli/examinedb/examinedb02.png)

I can modify the *category* parameter to contain a query that determines the number of columns being returned by the query and which of those contain text data.I know from the challenge and hint that this is an Oracle database, and on Oracle databases every `SELECT` statement must specify a *table* to *SELECT `FROM`. Oracle has a built in table called `dual` which can be used for SQLi purposes.  `'abc','def'` is the text that will be returned in the respective columns from my query and since this is a *GET* request my query must be *URL Encoded*. 

`Accessories'+UNION+SELECT+'abc','def'+FROM+dual--` 

I can see from the applications response that two columns are returned and both contain text data. 

![number of columns](/docs/assets/images/portswigger/sqli/examinedb/examinedb03.png)

Now I just need to modify the query to `SELECT` the `BANNER` column `FROM` the `v$version` table. `NULL` is used to match the number of columns the web application expects to return. 

`Accessories'+UNION+SELECT+BANNER,+NULL+FROM+v$version--` 

![Select Banner](/docs/assets/images/portswigger/sqli/examinedb/examinedb04.png)

The query then returns all of the data in the v$version table of the oracle database in the web applications response verifying that this is indeed an *Oracle* database. 

``` 

Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production 

PL/SQL Release 11.2.0.2.0 - Production 

NLSRTL Version 11.2.0.2.0 - Production 

TNS for Linux: Version 11.2.0.2.0 - Production 

CORE 11.2.0.2.0 - Production  

``` 

![response](/docs/assets/images/portswigger/sqli/examinedb/examinedb05.png)

Triggering that response from the web application solves the challenge. 

![solved](/docs/assets/images/portswigger/sqli/examinedb/examinedb06.png)

---

*SQL Injection Attack, Querying The Database Type And Version On MySQL and Microsoft* 

![lab2](/docs/assets/images/portswigger/sqli/examinedb/examinedb07.png)

Like the previous lab I can modify the *Category* parameter to include a query that will verify the number of columns the web application expects is two. Since it is a *MySQL* database this time the syntax will be different having no need for the `FROM` portion of the previous query and using  the crunch symbol `#` to comment out any further portions of the query instead of a double hyphen `--`. Once again since this is a *GET* request I will need to url encode the spaces in the payload with plus signs `+`. 

`Accessories'+UNION+SELECT+'abc','def'#` 

Once again the web applications response verifies that there are two columns. 

![2 columns](/docs/assets/images/portswigger/sqli/examinedb/examinedb08.png)

Now I just need to modify the query to use the `@@version` MySQL system variable to display the version information in the first column and represent the second column with `NULL` 

`Accessories'+UNION+SELECT+@@version,+NULL#` 

![request](/docs/assets/images/portswigger/sqli/examinedb/examinedb09.png)

The web applications response then displays the version information, `8.0.33-0ubuntu0.20.04.4`, in the response solving the labs challenge. 

![response](/docs/assets/images/portswigger/sqli/examinedb/examinedb10.png)

![solved2](/docs/assets/images/portswigger/sqli/examinedb/examinedb11.png)

---
