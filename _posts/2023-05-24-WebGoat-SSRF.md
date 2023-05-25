## **OWASP Top 10 WebGoat - SSRF**

<ins> **Introduction** </ins>

*WebGoat* is a deliberately insecure web application maintained by *OWASP* designed to teach web application security lessons. More information including how to download and run WebGoat can be found here on the projects [GitHub](https://github.com/WebGoat/WebGoat).
This is post one of a series where I will be doing WebGoats challenges to further my understanding of the OWASP Top 10 and web application security as a whole. I will be starting from the number 10 and working my way backwards to number 1.

---


<ins> **\#10. Server-Side Request Forgery** </ins>

The Server-Side Request Forgery (SSRF) category focuses on features related to user convenience. *SSRF* flaws happen when web applications fetch user-requested remote resources without validating the *URL*. 
Applications commonly fetch URLs to enable easier task switching for end users, often keeping them in the application while providing access to additional features through the fetched URL. SSRF flaws allow an attacker to make the application send crafted requests even when protected by a firewall, VPN, or other type of access control list.

Application layer protection methods should include:

* Data input sanitization, validation, and filtering.

* Disabling HTTP redirection at the Server level.

* Ensuring server responses received conform to expected results. Raw responses from the server should never be sent to the client.

Network layer protection methods include:

* Segmenting remote resource access functionality.

* Enforcing deny by default firewall or ACL rules.

WebGoat divides the Server-Side Request Forgery challenges into two categories. CSRF and SSRF.

---


<ins> **Cross-Site Request Forgery** </ins>

Cross-Site Request Forgery (CSRF), also known as *one-click attack* or *session riding* is a type of exploit of a web application where unauthorized commands are transmitted from a user that the website trusts. *CSRF* exploits the trust that a site has in a user's web browser. 

Common characterstics of a CSRF attack are:

* It involves sites that rely on a user's identity and exploits the sites trust in that identity. 

* It tricks the user's browser into sending requests to a target site and involves HTTP requests that have side effects. 


Web applications that perform actions based on input from trusted on authenticated users without requiring the user to authorize the specific action are at risk. If a user were authenticated by a cookie saved in their web browser they could unknowingly send an http request to a site that trusts the user and cause an unwanted action. CSRF attacks target state-changing requests with exploiting a GET request being the simplest CSRF attack to perform. 
---
**WebGoat CSRF Challenge 1**

![Challenge1](/docs/assets/images/webgoat/ssrf/csrf01.png)

The challenge here is to simulate clicking the *Submit Query* button while logged in as my created user but not from the web browser I am logged into for the challenge. 

I start the challenge by clicking *Submit Query* to see what the button even does. Once I do I see it loads to a different webpage that tells me my request appears to have come from the original host. 

![Click button](/docs/assets/images/webgoat/ssrf/csrf02.png)

If I inspect this page and refresh it I can see from the *Network* tab that the request being sent was a *POST* request. I can also see my users *cookie*.

![Request](/docs/assets/images/webgoat/ssrf/csrf03.png)

With this information I can use `curl` to pass my *cookie* to the */basic-get-flag* page in a *POST* request. 

`curl -X POST -b "JSESSIONID=q54uZG0kOjx6x0eoZfSPKWc_A3PO4f0j-BSHE7Lu" http://127.0.0.1:8080/WebGoat/csrf/basic-get-flag `

![curl post](/docs/assets/images/webgoat/ssrf/csrf04.png)

It worked. The website sends me back a flag and a message congratulating me on passing the challenge. 

![flag1](/docs/assets/images/webgoat/ssrf/csrf05.png)
---
**WebGoat CSRF Challenge 2**









