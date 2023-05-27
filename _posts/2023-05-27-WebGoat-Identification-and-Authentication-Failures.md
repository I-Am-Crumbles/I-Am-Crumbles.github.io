## **OWASP Top 10 WebGoat - Identification and Authentication Failures**

<ins> **Introduction** </ins>

*WebGoat* is a deliberately insecure web application maintained by *OWASP* designed to teach web application security lessons. More information including how to download and run WebGoat can be found here on the projects [GitHub](https://github.com/WebGoat/WebGoat).
This is post four of a series where I will be doing WebGoats challenges to further my understanding of the OWASP Top 10 and web application security as a whole. I have started from the number 10 and am working my way backwards to number 1.

---

<ins> **\#7. Identification and Authentication Failures** </ins>

Vulnerabilities in authentication systems can give attackers access to user accounts and even the ability to compromise the entire system using an admin account. For example an attacker can take a list containing thousands of known username/password combinations obtained during a data breach and use a script to try all of those combinations on a logins system to see if there are any that work. Failures in authentication can occur if an application: 

* Permits automated attacks where the attacker has a list of valid usernames and passwords, such as credential stuffing. 
* Permits brute force or other automated attacks. 
* Permits default, weak, or well-known passwords. 
* Uses weak or ineffective credential recover and forgot password processes, like knowledge based answers. 
* Uses plain text, encrypted, or weakly hashed passwords. 
* Has missing or ineffective multi-factor authentication. 
* Exposes session identifiers in the URL. 
* Reuses session identifiers after a successful login. 
* Does not correctly invalidate Session IDs  during logout or periods of inactivity. 

Identification and Authentication protection methods should include: 

* Implementation of multi-factor authentication wherever possible. 
* Weak password checks, such as testing new or changed passwords against the top 10,000 worst passwords list. 
* Aligning password length, complexity, and rotation policies with National Institute of Standards and Technology (NIST) current guidelines. 
* Ensuring registration, credential recovery, and API pathways are hardened against account enumeration attacks by using the same messages for all outcomes. 
* Limit or increasingly delay failed login attempts. Log all failures and alert administrators when credential stuffing, brute force, or other attacks are detected. 
* Use a server-side, secure, built-in sessions manager that generates a new random session ID after login. 
* Identifiers should not be in the URL, securely stored, and invalidated after logout and idle timeouts. 

---

<ins> **Phishing** </ins>

Credential theft is also an issue. Attackers steal user credentials through techniques like keylogging, database breaches and phishing.  

Phishing is a social engineering attack where an attacker attempts to deceive users into revealing their sensitive information like usernames, passwords, or other authentication credentials. There are many kinds of phishing attacks and as technologies evolve they only get more creative. Some common ones to look out for are: 

* Email Phishing: The most common form of phishing, this ty pe of attack uses tactics like phony hyperlinks to lure email recipients into sharing their personal information. Attackers will mimic legitimate entities such as Google, Amazon, or even a co-worker. 
* Malware Phishing: This type of attack involves planting malware disguised as a trustworthy attachment in an email. In some cases opening a malware attachment can bring down entire IT systems.  
* Spear Phishing: Most phishing attacks cast a wide net, spear phishing targets specific individuals by exploiting information gathered through research into their jobs and personal lives. These attacks are highly customized to the individual making them particularly effective. 
* Whaling: When attackers go after a high profile target like a business executive or politician. These scammers often conduct considerable research into their targets to find an opportune moment to steal login credentials or other sensitive information.  
* Smishing: A combination of SMS and Phishing, it involves sending text messages disguised as trustworthy communications from businesses like UPS or the bank. People are particularly vulnerable to SMS scams as text messages often come across as more personal. 
* Vishing: Attackers in fraudulent call centers attempt to trick people into providing sensitive information over the phone. In many cases the intention of these scams is to use social engineering to dupe victims into installing malware onto their devices. 

It is crucial to educate users about the threat and encourage them to be cautious while interacting with emails, websites, or messages that request sensitive information. Additionally organizations should implement multi-factor authentication and employ anti-phishing measures such as email filters and website verification mechanisms.  

---

<ins> **WebGoat Identification and Authentication Failures Challenges** </ins>

**Challenge 1**
*Authentication Bypasses*

![Challenge1](/docs/assets/images/webgoat/authfailures/auth01.png)

For this challenge I need to use a proxy to edit the POST data and remove the security questions. So I loaded up Burp Suite to capture the request.  

![load Burp](/docs/assets/images/webgoat/authfailures/auth02.png)

Then I navigate over to the webpage in Burp Suites web browser and turn intercept on so that I can capture the request. 

![Page in Burp](/docs/assets/images/webgoat/authfailures/auth03.png)

![burp request](/docs/assets/images/webgoat/authfailures/auth04.png)

According to the example scenario above the challenge I would just need to remove this highlighted part. That is not the case however.  

![edit request](/docs/assets/images/webgoat/authfailures/auth05.png)

![edit failed](/docs/assets/images/webgoat/authfailures/auth06.png)

The function that is used to verify that the secret questions have been answered requires two parameters to be passed to it so the challenge won't work exactly how it did in the example. However there is a flaw in functions logic where it will accept any two parameters and trigger a success if there is no answer stored in the database for the parameter to check against. So to solve this challenge I just need to change the names of the parameters being passed in the POST request. 

![rename params](/docs/assets/images/webgoat/authfailures/auth07.png)

Changing secQuestion0 and secQuestion1 to secQuestion2 and secQuestion3 respectively satisfied the requirements of the challenge and allows me to bypass MFA. 

![complete](/docs/assets/images/webgoat/authfailures/auth08.png)
---

**Challenge 2**
*Insecure Login*

![Challenge2](/docs/assets/images/webgoat/authfailures/auth09.png)

If I inspect the page and open the Network tab to analyze the network traffic I can see that I'm once again being spammed with requests from WebGoat. But if I click the login button I can filter through them for the POST request to see what happened. 

![Inspect 1](/docs/assets/images/webgoat/authfailures/auth10.png)

![Inspect 2](/docs/assets/images/webgoat/authfailures/auth11.png)

From there I can click the Request tab on the right hand side and see the parameters being passed to the request are Password: "BlackPearl" and username:"CaptainJack". 

![creds](/docs/assets/images/webgoat/authfailures/auth12.png)

Logging in with them satisfies the requirements of the challenge. 

![complete 2](/docs/assets/images/webgoat/authfailures/auth13.png)






