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
