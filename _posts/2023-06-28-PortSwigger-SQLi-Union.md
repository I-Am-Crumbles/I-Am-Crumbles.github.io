## **PortSwigger - SQLi UNION Attacks**

The *UNION* keyword can be used to retrieve data from multiple tables where an application is vulnerable to SQLi and the results of the query are returned within the response. The *UNION* keyword lets you execute one or more additional *SELECT* queries and append the results to the original.  

For a UNION query to work two key requirements must be met. 

* The individual queries must return the same number of columns.
* The data types in each column must be compatible between the individual queries.

**Determining The Required Number Of Columns**

There are two effect methods to determine how many columns are being returned from the original query.  

The first method is to inject a series of *ORDER BY* clauses and increment the specified column index until an error occurs. This modifies the original query and orders the results by different columns in the result set. The column in an *ORDER BY* clause can be referenced by index so the name doesn't need to be known, when the index exceeds the number of actual columns in the database it will return an error. While the application may return a generic error message or simply "no results found" detection of differences in the applications response can be used to infer how many columns are being returned.  

SQLi ORDER BY Payload Examples: 

``` 
' ORDER BY 1-- 
' ORDER BY 2-- 
' ORDER BY 3-- 
etc... 
```

The second method involves submitting a series of UNION SELECT payloads specifying a different number of *NULL* values, if the number of nulls does not match the number of columns the database will return an error, which again can be a generic error or "no results" message. When the number of *nulls* does match the number of columns the database returns an additional row in the result set. The effect of the resulting HTTP response depends on the applications code.  

SQLi UNION SELECT Payload Examples:

``` 
' UNION SELECT NULL-- 
' UNION SELECT NULL,NULL-- 
' UNION SELECT NULL,NULL,NULL-- 
etc..
```

**Finding Columns With A Useful Data Type**

Generally speaking the interesting data that attackers want to retrieve will be in string form. So you need to find one or more columns in the original query results whose data type is compatible with string data. The *UNION SELECT NULL* payloads can be modified with a string value  into each column in turn. If the data type of a column is not compatible with string data the query will cause a database error. If an error does not occur and the response contains some additional content include the injected string value then that column is suitable for retrieving string data. 

For Example:

``` 
'UNION SELECT 'a', NULL,NULL,NULL--  
'UNION SELECT NULL,NULL,"a",NULL--  
'UNION SELECT NULL,NULL,NULL,"a"--  
etc... 
```

When you have determined the number of columns returned by the original query and found which hold string data interesting data may be retrieved. The table and column names will be required and all modern databases provide ways of examining the database structure to determine what tables and columns it contains. 

**Retrieving Multiple Values Withing A Single Column**

If the query only returns a single column you can still easily retrieve multiple values together within this single column by concatenating the values together by a separator that lets you distinguish the combined values. Although different databases will use different syntax to perform string concatenation a basic example would look like:  

`'UNION SELECT username | | ":" | | password FROM users--` 

This uses the double pipe sequence which is a string concatenation operator for *Oracle* databases. The query will combine the values of the *username* and *password* fields separated by a colon and return them in a single column within the response.  

---

**Lab 1**

*SQLi UNION Attack - Determining The Number of Columns Returned By the Query*

![lab1](/docs/assets/images/portswigger/sqli/union/union01.png)

To start the challenge off I load up the web page in the lab and then capture a request to filter the products by the *accessories category* and send that to the repeater.  

![Accessories](/docs/assets/images/portswigger/sqli/union/union02.png)

![Request](/docs/assets/images/portswigger/sqli/union/union03.png)

If I edit the category parameter to include a UNION SELECT payload with plus signs to represent URL encoded spaces I can see that the response now displays an error. 

`'+UNION+SELECT+NULL--` 

![error](/docs/assets/images/portswigger/sqli/union/union04.png)

The payload continues to generate an error until it's modified to contain three *NULL* values in the parameter. 

![NULL NULL NULL](/docs/assets/images/portswigger/sqli/union/union05.png)

This leads me to believe the number of columns returned by the query to be three. This can also be tested with the `'+ORDER+BY+1` payload and incrementing the numerical value each time. The order of the items returned in the response changes all the way until `'+ORDER+BY+4` where it errors. 

![order by 1](/docs/assets/images/portswigger/sqli/union/union06.png)

![order by 2](/docs/assets/images/portswigger/sqli/union/union07.png)

![order by 3](/docs/assets/images/portswigger/sqli/union/union08.png)

![order by 4](/docs/assets/images/portswigger/sqli/union/union09.png)

Lab 1 was completed during the testing when I sent the `'+UNION+SELECT+NULL,NULL,NULL--` payload.

![finish](/docs/assets/images/portswigger/sqli/union/union10.png)

---

**Lab 2**

*SQLi UNION Attack- Finding A Column Containing Text* 

![lab2](/docs/assets/images/portswigger/sqli/union/union11.png)

For this lab I need to use the information learned in the previous lab to make a specific value, "Kf52xt", appear within the query results. 

![string value](/docs/assets/images/portswigger/sqli/union/union12.png)

Modifying the *UNION SELECT* payload replacing the *NULL* value with the *Kf52xt* string each time I'm able to manually test the SQLi in the repeater until it returns the string as part of the table in the response. In this case replacing the second column completes the challenge. 

`'+UNION+SELECT+NULL,'Kf52xt',NULL--`  

![request](/docs/assets/images/portswigger/sqli/union/union13.png)

![solved](/docs/assets/images/portswigger/sqli/union/union14.png)

---

**Lab 3**

*SQLi UNION Attack – Retrieving Data From Other Tables* 

![lab3](/docs/assets/images/portswigger/sqli/union/union15.png)

For this lab I need to inject a SQL payload that leverages a UNION attack to retrieve all  data in the *username* and *password* columns within the database table called *users* and use that to log in as the *administrator* user. 

This time the vulnerability is found within the "All" search filter. Sending a request for that filter to the repeater and modifying it to contain a payload with the correct database and column names I'm able to retrieve the administrator password. 

`'+UNION+SELECT+username,+password+FROM+users--` 

*admnistrator:12l9bda4h22en8qb6ldv* 

![payload](/docs/assets/images/portswigger/sqli/union/union16.png)

Using that account information to log in solves the challenge. 

![solved](/docs/assets/images/portswigger/sqli/union/union17.png)

---

**Lab 4**

*SQLi UNION Attack - Retrieving Multiple Values In A Single Column* 

![lab4](/docs/assets/images/portswigger/sqli/union/union18.png)

For this lab I will again need to perform an SQL UNION attack to retrieve data from the *username* and *password* columns in the *users* database, except this time I need to concatenate the response values into a single column. 

I'll be using a request for the *Clothing Shoes and Accessories*filter that I sent to the repeater. 

![request](/docs/assets/images/portswigger/sqli/union/union19.png)

`'+UNION+SELECT+username||":"||password+FROM+users--` 

This payload attempts to extract the data from the *username* and *password* columns in the *users* database and concatenate them together separated by a colon symbol `:`. It didn't work though.

![payload](/docs/assets/images/portswigger/sqli/union/union20.png)

The previous payload failed because the column that returns string data is the second column, modifying the payload so that a *NULL* value represents the first column will cause the database to return the usernames and passwords in the response as I intended previously.

`'+UNION+SELECT+NULL,username||':'||password+FROM+users--` 

![works](/docs/assets/images/portswigger/sqli/union/union21.png)

Logging in with the account information *administrator:8qcekjih58c2qy724d12* completes the challenges.

![finish](/docs/assets/images/portswigger/sqli/union/union22.png)



