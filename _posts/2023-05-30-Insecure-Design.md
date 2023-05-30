## **OWASP Top 10 WebGoat- Insecure Design**

<ins>**Introduction**</ins>

*WebGoat* is a deliberately insecure web application maintained by *OWASP* designed to teach web application security lessons. More information including how to download and run WebGoat can be found here on the projects [GitHub](https://github.com/WebGoat/WebGoat).
This is post seven of a series where I will be doing WebGoats challenges to further my understanding of the OWASP Top 10 and web application security as a whole. I have started from the number 10 and am working my way backwards to number 1.

---

<ins> **\#4. Insecure Design** </ins>

Insecure design is a broad category representing different weaknesses expressed as "missing or ineffective control design" and It is not the source for all other Top 10 risk categories. There is a difference between insecure design and insecure implementation and they are differentiated for a reason, they have different root causes and steps for remediation. A secure design can still have implementation defects that lead to vulnerabilities and an insecure design can't be fixed by a perfect implementation, since by definition required security controls were never created.  

Secure design  is neither an add on or a tool that you can add to software, it is a culture and methodology that constantly evaluated threats and ensures that code is robustly designed and tested to prevent known attack methods. Threat modeling should be integrated into refinement sessions.  Changes in data flows and access control or other security controls should be noted. IN the user story development determine the correct flow and failure states, ensure they are well understood and agreed upon by responsible and impacted parties. Analyze assumptions and conditions for expected and failure flows to ensure they are still accurate. Determine how to validate the assumptions and enforce conditions needed for proper behaviors. Ensure all results are documents and learn from mistakes, off positive incentives to promote improvements.  

Secure software requires a secure development lifecycle, some form of secure design pattern, methodology, component library, tooling, and threat modeling. Security specialists should be involved from the beginning and throughout the entire lifecycle and maintenance of software projects. 

To help prevent Insecure Design flaws developers should: 

* Establish and use a secure development lifecycle, evaluate and design security and privacy related controls. 
* Establish and use a library of secure design patterns or ready to use components. 
* Use threat modeling for critical authentication, access controls, business logic, and key flows.  
* Integrate security language and controls into user stories. 
* Integrate plausibility checks at each tier of the application. 
* Write unit and integration tests to validate that all critical flows are resistant to the threat model. 
* Compile use cases and misuse cases for each tier of the application 
* Segregate tier layers on the system and network layers depending on the protection needs.  
* Segrgate tenants robustly be design throughout all tiers. 
* Limit resource consumption but users or the service.  

Without a solid security foundation most applications will suffer and require an endless stream of patches to keep them from being insecure. By accepting that security is a necessity from the get go developers can save time, money, and data breaches by incorporating security into the development cycle. 

---

<ins> **WebGoat Challenges** </ins>

There are no WebGoat challenges for this specific category. Since insecure design is such a broad category all attack scenarios can potentially be related to its principles. 

For example:  

* An online banking application using sequential and predictable customer account numbers as references for retrieving account details can allow an attacker to manipulate the account number parameter in the URL to access other customers account information. This is both an example of an Insecure Direct Object Reference and Insecure design.  
* An application using XML-based file uploads for data processing that does not properly validate or sanitize user-supplied XML input can lead to an attacker uploading malicious XML data containing an external entity reference. Can potentially be an example of a Security Misconfiguration and Insecure Design that leads to a Server-Side Request Forgery attack.

 These examples illustrate how insecure design decisions or missing security controls can manifest. By addressing insecure design principles and implementing appropriate security measures developers can enhance the overall security posture of their applications. 

 
