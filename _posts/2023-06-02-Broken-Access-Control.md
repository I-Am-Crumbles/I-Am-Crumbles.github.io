## **OWASP Top 10 WebGoat - Broken Access Control**

<ins>**Introduction**</ins>

*WebGoat* is a deliberately insecure web application maintained by *OWASP* designed to teach web application security lessons. More information including how to download and run WebGoat can be found here on the projects [GitHub](https://github.com/WebGoat/WebGoat).
This is the tenth and final post of a series where I will be doing WebGoats challenges to further my understanding of the OWASP Top 10 and web application security as a whole. I have started from the number 10 and am working my way backwards to number 1.

---

<ins> **\#1. Broken Access Control** </ins>

Access Control refers to a system that controls access to information or functionality. Broken access controls allow attackers to bypass authorization and perform tasks as though they were privileged users. Failures typically lead to unauthorized information disclosure, modification, or destruction of all data or performing a business function outside the user's normal limits. Common access control vulnerabilities include: 

* Violation of the principle of least privilege or deny by default.  
* Bypassing access control checks by modifying the URL, internal application state, or HTML page. 
* Permitting viewing or editing of someone else's account by providing its unique identifier. 
* Accessing API with missing access controls for POST, PUT, and DELETE. 
* Elevation of privilege. 
* Metadata manipulation, such as replaying or tampering with a JSON Web Token, or a cookie or, hidden field. 
* Force browsing to authenticated pages as an unauthorized user or to privileged pages as a standard user. 

Access control is only effective in trusted server-side code or server-less API, where the attacker cannot modify the access control check or metadata: 

* With the exception of public resources deny by default policies should be implemented. 
* Implement access control mechanisms once and re-use them throughout the application including minimizing Cross-Origin Resource Sharing (CORS). 
* Model access controls should enforce record ownership rather than accepting that the user can create, read, update, or delete any record. 
* Unique application business limit requirements should be enforced by domain models. 
* Disable web server directory listing and ensure file metadata and backup files are not present within web roots. 
* Log access controls failures, alert admins when appropriate. 
* Rate limit API and controller access to minimize the harm from automated attack tooling. 
* Stateful session identifiers should be invalidated on the server after logout. Stateless tokens should be short-lived so that the window of opportunity for an attack is minimized

---

<ins> **WebGoat Challenges - Insecure Direct Object References** </ins> 

**Challenge 1** 
 
*Authenticate First, Abuse Authorization Later* 

![challenge1](/docs/assets/images/webgoat/bac/broken01.png)

To start things off I just need to login with the user name and password provided to me by the challenge.

![complete1](/docs/assets/images/webgoat/bac/broken02.png)

**Challenge 2** 

*Observing Differences & Behaviors* 

![challenge2](/docs/assets/images/webgoat/bac/broken03.png)

For this challenge I need to send the request to view the users profile by clicking the button. Then I can exam the *response* data in the *network tool* and compare the attributes to what the website displays. 

![view profile](/docs/assets/images/webgoat/bac/broken04.png)

![request](/docs/assets/images/webgoat/bac/broken05.png)

I can see that I have 2 additional attributes *role* and *userid*.  

![complete2](/docs/assets/images/webgoat/bac/broken06.png)

**Challenge 3** 

*Guessing & Predicting Patterns* 

![challenge3](/docs/assets/images/webgoat/bac/broken07.png)

If I go back and look at the previous request to view the profile in the *network tools* I can see the URL that the *GET* request was sent to.

![request3](/docs/assets/images/webgoat/bac/broken08.png)

That leaves me with `/WebGoat/IDOR/profile` since the challenge states I can ignore everything up to that point. To complete the challenge I just need to extend it to include the *userid* of the profile I want to view, which can also be viewed in the *response* tab of this particular request. 

![userid](/docs/assets/images/webgoat/bac/broken09.png)

Putting it all together I get `/WebGoat/IDOR/profile/2342384`. 

![complete3](/docs/assets/images/webgoat/bac/broken10.png)

**Challenge 4** 

*Playing with the Patterns* 

![challenge4](/docs/assets/images/webgoat/bac/broken11.png)

To start this challenge off I captured a request to view my own profile using *Burp Suite* and then sent it to the *repeater*. 

![send to repeater](/docs/assets/images/webgoat/bac/broken12.png)

![request4](/docs/assets/images/webgoat/bac/broken13.png)

If I modify the request to include the *userid* I found earlier so that the top line read `GET /WebGoat/IDOR/profile/2342384 HTTP/1.1`. I get a "Try Again" message. 

![modify request](/docs/assets/images/webgoat/bac/broken14.png)

The hint in the challenge says to try incrementing the *userid*, and that it won't be as simple as *+1* but it's pretty close. So I just manually incremented the field in the *repeater* until the challenge succeeded at `GET /WebGoat/IDOR/profile/2342388 HTTP/1.1`. 

![half complete](/docs/assets/images/webgoat/bac/broken15.png)

Now to edit the profile I've found for the second part of the challenge I need to modify the request a bit more. 

First the request needs to be changed from `GET` to `PUT`. Previous experience with WebGoat challenges also tells me I'll need to send the content as *JSON*, so I'll also need to edit the *Content-Type* of header to read `application/json`. 

![put](/docs/assets/images/webgoat/bac/broken16.png)

![content type](/docs/assets/images/webgoat/bac/broken17.png)

Then I just need to add the data I want to send in the `PUT` request using *JSON* formatting. I already have the fields the webpage will be expecting available to me in the *response* so I just changed their values as the challenge instructed. 

`{"role":1, "color":"red", "size":"large", "name":"Buffalo Bill", "userId":2342388}` 

![complete4](/docs/assets/images/webgoat/bac/broken18.png)

---

<ins> **WebGoat Challenges – Missing Function Level Access Control** </ins> 

**Challenge 1** 

*Relying on Obscurity* 

![challenge1](/docs/assets/images/webgoat/bac/broken19.png)

For this challenge I just need to inspect the page. Scrolling through it long enough I found a *class* *hidden-menu-item* which had a label of *Admin*. If I expand on it I can see the two hidden access-control links for *Users* and *Config*. 

![hidden menu](/docs/assets/images/webgoat/bac/broken20.png)

Completing the challenge gives me a hint that I'll need one of the links for the next challenge. 

![Complete1](/docs/assets/images/webgoat/bac/broken21.png)








