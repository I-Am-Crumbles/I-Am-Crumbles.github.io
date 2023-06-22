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

![lab1](/docs/assets/images/portswigger/sqli/whatissqli/wsql01.png)

Once I start the lab I see that I'm now on a webpage with a few categories to browse products from. To get started on the challenge I set up Burp Suit so that I am logged into PortSwigger and have access to the labs traffic in the *proxy* tab so that I can intercept the traffic. 

![start burp](/docs/assets/images/portswigger/sqli/whatissqli/wsql02.png)

Clicking on the *Accessories* button to refine my search I see that it sends a GET request that has a parameter called *category* that is assigned to the value *Accessories* and if I forward the request the page loads all of the items I'm able to purchase in that category.  

![intercept](/docs/assets/images/portswigger/sqli/whatissqli/wsql03.png)

![accessories](/docs/assets/images/portswigger/sqli/whatissqli/wsql04.png)

I can test for *SQLi* vulnerabilities by modifying the *category* parameter to include a payload that attempts to exploit the WHERE clause of the SQL query. It should read `Accessories'+OR+1=1--` 

The `'` closes any opening string in the SQL query and the `+` is used as a URL encoding representation for spaces. The `OR` keyword is used to introduce a condition that will be evaluated `1=1`, this condition is always true is SQL as it compares the value of 1 to itself.  Finally `--` signifies a comment in SQL, everything after the double hyphen is ignored by the database engine meaning any remaining portion of the original query will be commented out. 

![test](/docs/assets/images/portswigger/sqli/whatissqli/wsql05.png)

Forwarding the request shows bunch of different results that weren't previously available to me and completes the labs challenge. 

![or 1=1](/docs/assets/images/portswigger/sqli/whatissqli/wsql06.png)

![fin](/docs/assets/images/portswigger/sqli/whatissqli/wsql07.png)

Alternatively the challenge can be solved without *Burp Suite* simply by modifying the *URL* to include the *SQLi* payload. 

![url1](/docs/assets/images/portswigger/sqli/whatissqli/wsql08.png)

![url2](/docs/assets/images/portswigger/sqli/whatissqli/wsql09.png)

![url3](/docs/assets/images/portswigger/sqli/whatissqli/wsql10.png)

---

**Lab 2**

*Login Bypass*

![lab2](/docs/assets/images/portswigger/sqli/whatissqli/wsql11.png)

For this lab I need to perform a SQLi attack that logs into the administrator user. Since the first account in a database is often an administrative user an SQL query can be exploited to log in as the that first user. Using the payload `' or 1=1 --` will cause the application to perform the query `SELECT * FROM users WHERE username = ' ' OR 1=1-- ' AND password = 'password'`. The double hyphen `--` represents a comment sequence and causes the password portion of the query to be ignored resulting in a bypass of the login. 

![login](/docs/assets/images/portswigger/sqli/whatissqli/wsql12.png)

If I look at the request in burp's interceptor I can see the URL encoded query being sent to the server and the  302 response code telling me the requested resource was found and it's identified my account as the *administrator* user. 

![request1](/docs/assets/images/portswigger/sqli/whatissqli/wsql13.png)

![request2](/docs/assets/images/portswigger/sqli/whatissqli/wsql14.png)

Switching back over to the web browser I can see that my username is now *administrator* and the Lab challenge is now marked as *solved*. 

![my account](/docs/assets/images/portswigger/sqli/whatissqli/wsql15.png)

![solved](/docs/assets/images/portswigger/sqli/whatissqli/wsql16.png)

---

**Lab 3**

*Filter Bypass Via XML Encoding*

![lab3](/docs/assets/images/portswigger/sqli/whatissqli/wsql17.png)

According to the challenge the vulnerability is in the *Check Stock* feature. So I navigate over to the first product page and used the *Check Stock* feature and intercept the request in Burp Suite. 

![checkstock](/docs/assets/images/portswigger/sqli/whatissqli/wsql18.png)

![request](/docs/assets/images/portswigger/sqli/whatissqli/wsql19.png)

I can see that the request is sending the *productID* and *storeID* parameters to the application in XML format. Sending that request to the repeater I am able to test probe the variables to see how the input is evaluated by the server. I see in the original request the servers response is *929 units*

![repeater](/docs/assets/images/portswigger/sqli/whatissqli/wsql20.png)

If I edit the productID parameter to have a value of `1+1` I can see that the servers response changes to 678 units, the same as if I had just looked up the 2nd productID in the table.  
![678 units](/docs/assets/images/portswigger/sqli/whatissqli/wsql21.png)

![edit 2](/docs/assets/images/portswigger/sqli/whatissqli/wsql22.png)

I can edit the request to try to figure out the number of columns expected by the query. By editing the *productID* parameter to contain an SQLi attack payload so that it reads `1 UNION SELECT NULL`.  

`UNION` operator is used to combine the results of two or more `SELECT` queries into a single result. The `SELECT` statement retrieves data from the database with `NULL` serving as a value placeholder, by doing so it should match the number of columns in the original query.  Unfortunately this lab has a *Web Application Firewall* set up to detect such an SQLi attack and I receive an *Attack Detected* error message. 

![select null](/docs/assets/images/portswigger/sqli/whatissqli/wsql23.png)

I can see in the request that the *Content-Type* parameter is set to *XML* So I can try to bypass the *WAF*  by obfuscating the payload using *Hexadecimal Entities*, which are a way to represent characters in *XML* using their *Unicode* code points.   

There is a tag-based conversion tool available as a Burp Suite extension called *Hackvertor*  that can be used to do this. After downloading and installing the Extension I just right click the payload, select `Extensions > Hackvertor > Encode > hex_entities` 

![hackvertor](/docs/assets/images/portswigger/sqli/whatissqli/wsql24.png)

With the payload now wrapped in tags the extension how to encode the payload in the request it reads like this `<@hex_entities>1 UNION SELECT NULL<@/hex_entities>`. Once I forward the request I no longer get the "Attack Detected" error message, but instead *0 units* is returned. This likely implies an error when the application tries to return more than one column.  

![0 units](/docs/assets/images/portswigger/sqli/whatissqli/wsql25.png)

I can work around this by editing the payload to concatenate the returned values to one column before it is returned in the response.  

`<@hex_entities> 1 UNION SELECT username || ':' || password FROM users <@/hex_entities>` 

This payload will fetch the *usernames* and *passwords* from the *users* database and concatenate them to one column separated by a colon character.  

![didn't work](/docs/assets/images/portswigger/sqli/whatissqli/wsql26.png)

Which also didn't work. After testing it a bit I found that the vulnerability actually existed within the <storeID> value and not the <productID> value that I originally tested against. Placing the payload into the *<storeID>* tags returns a list of usernames and passwords mixed into the response. 

``` 
wiener:4fgcgmdsfqrt9mghqt5q 
carlos:k0yonmq2plupkf7cdrkz 
955 units 
administrator:wzodfjx7p0n1bomzzbl5 
```

![storeID](/docs/assets/images/portswigger/sqli/whatissqli/wsql27.png)

Once I log into the administrator account within the lab using that password it completes the challenge. 

![Solved](/docs/assets/images/portswigger/sqli/whatissqli/wsql28.png)

