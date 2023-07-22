## **PortSwigger - Blind SQLi With Time Delays**

It is often possible to exploit a blind SQLi vulnerability by triggering time delays conditionally. Because SQL queries are generally processed synchronously by the application delaying the execution of a query will also delay the HTTP response. This allows an attacker to infer the truth of the injected condition based on the time taken for the response to be received. It should also be noted that the techniques for triggering a time delay are highly specific to the type of database being used. 

---

**Lab**

*Blind SQL Injection With Time Delays*

![lab1](/docs/assets/images/portswigger/sqli/blindsqli/withtimedelays/td01.png)

According to the challenge the application performs a SQL query containing the value of the tracking cookie generated in the request. The challenge is to exploit a vulnerability within that query to cause a 10 second delay in the applications response.  

To start this challenge off I needs to capture a request containing the *Tracking Cookie* and send it to the Burp Suite's *repeater* for modification and testing. 

![repeater](/docs/assets/images/portswigger/sqli/blindsqli/withtimedelays/td02.png)

*PortSwigger* offers a [SQL Injection Cheat Sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet) that contains several payloads for the various databases that a web application may be running. One section contains a series of payloads to trigger an *unconditional time delay*. 

![Time Delays](/docs/assets/images/portswigger/sqli/blindsqli/withtimedelays/td03.png)

I can modify these payloads with each databases concatenation operator so that it is included when the applications sends the SQL query for the *Tracking Cookie*. For example *Oracle* uses the `||` operator for string concatenation so the query would look like this: 

`TrackingId=teIHm3UDb2mzJfjB' || dbms_pipe.receive_message(('a'),10)--` 

![oracle](/docs/assets/images/portswigger/sqli/blindsqli/withtimedelays/td04.png)

Since the web application responded as normal and there was no delay I can assume the database is not *Oracle* for now. I can continue to test the payloads for each database until I have a match. In the case of *Microsoft* a `+` is used as the concatenation operator. 

`TrackingId=teIHm3UDb2mzJfjB' + WAITFOR DELAY '0:0:10'--` 

![microsoft](/docs/assets/images/portswigger/sqli/blindsqli/withtimedelays/td05.png)

The application responds as normal the Lab is still not solved. This time when I test for *PostgreSQL* I'll need to remove the `SELECT` statement from the query as I will be concatenating onto a query that is already using it to query the database for the *TrackingId*. 

`TrackingId=teIHm3UDb2mzJfjB' || pg_sleep(10)--` 

![postgresql](/docs/assets/images/portswigger/sqli/blindsqli/withtimedelays/td06.png)

This time the web application had a delay in its response and the lab is now marked as *solved*. Meaning that I'm able to verify that I am working with a *PostgreSQL* database and the web application is vulnerable to Blind SQLi with time delays. 

![solved](/docs/assets/images/portswigger/sqli/blindsqli/withtimedelays/td07.png)

---

**Lab**

*Blind SQL Injection With Time Delays and Information Retrieval*

![lab2](/docs/assets/images/portswigger/sqli/blindsqli/withtimedelays/td08.png)





