## **PortSwigger - Blind SQLi With Conditional Responses**

In Blind SQLi the application does not return the results of the query or the details of any database errors within its responses. While Blind SQLi vulnerabilities can still be exploited to access unauthorized data the techniques involved are generally more difficult to perform.  

* You can change the logic of the query to trigger a detectable difference in the application's response depending on the truth of a single condition.
* You can trigger a time delay in the processing of the query based on a condition and infer truth of the condition based on the applications response time.
* You can trigger an out-of-band network interaction, for example placing the data into a DNS lookup for a domain that you control. This technique will often work in situations where others do not.

---

**Lab 1**

*Blind SQLi With Conditional Responses*

![lab1](/docs/assets/images/portswigger/sqli/blindsqli/conditionalresponses/cr01.png)
