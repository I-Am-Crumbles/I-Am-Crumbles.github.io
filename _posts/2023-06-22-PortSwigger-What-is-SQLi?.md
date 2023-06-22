## **PortSwigger - What is SQL Injection?**

SQL Injection or *SQLi* is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database. This generally allows an attacker to view, modify, or delete data that they are not normally able to retrieve. In some situations an attacker can escalate an SQLi attack to compromise the server or other back-end infrastructure. 
 
**Common SQLi examples:** 

* *Retrieving Hidden Data* – Attackers modify a SQL query to return additional results.
* *Subverting Application Logic* – Attackers can change a query to interfere with the applications processes.
* *UNION Attacks* - Attackers retrieve data from different database tables.
* *Examining The Database* - Attackers extract information about the version and structure of the database.
* *Blind SQL Injection* - Results of a query the attacker controls are not returned in the applications response.

**Testing For SQLi Vulnerabilities**

SQL injection is usually detected using automated tools such as *sqlmap* and other web vulnerability scanners but can also be tested for manually by using a set of tests against every entry point in the application such as:

* Submit the single quote character `'` and look for errors or other anomalies.
* Submit some SQL specific syntax that evaluates to the original value and to a different value looking for differences in the application response.
* Submit Boolean conditions such as `OR 1=1` and `OR 1=2` and look for differences in the applications responses.
* Submit payloads designed to trigger time delays when executed and look for difference in time taken for the applications response. 

SQL injection attacks can be performed using any controllable input that is processed as a SQL query. Since some websites take input in *JSON* or *XML* format and use it to query that database these different formats can provide alternative ways to obfuscate attacks that are otherwise blocked by defense mechanisms such as *Web Application Firewalls (WAFs)*. Since weak implementations of WAFs often just look for common keywords within the request simply encoding or escaping characters in those prohibited keywords can allow them to be bypassed.  

Most SQL injection vulnerabilities are within the *WHERE* clause of a *SELECT* query but SQLi can occur at any location within the query and within different query types. The most common other locations are: 

* Within updated values in *UPDATE* statements or the *WHERE* clause.
* Within inserted values in *INSERT* statements.
* Table or Column names in *SELECT* statements.
* Within the *ORDER BY* clause in *SELECT* statements.

---

**Lab 1**

*WHERE Clause Vulnerability*

![lab1](/docs/assets/images/portswigger/sqli/whatissqli/wsqli01.png)
