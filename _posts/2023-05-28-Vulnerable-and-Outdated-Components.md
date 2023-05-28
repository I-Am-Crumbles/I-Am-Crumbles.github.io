## **OWASP Top 10 WebGoat - Vulnerable and Outdated Components**

<ins> **Introduction** </ins>

*WebGoat* is a deliberately insecure web application maintained by *OWASP* designed to teach web application security lessons. More information including how to download and run WebGoat can be found here on the projects [GitHub](https://github.com/WebGoat/WebGoat).
This is post five of a series where I will be doing WebGoats challenges to further my understanding of the OWASP Top 10 and web application security as a whole. I have started from the number 10 and am working my way backwards to number 1.

---

<ins> **\#6. Vulnerable and Outdated Components** </ins>

Web applications rely on components such as libraries and frameworks, these components are pieces of software that help developers avoid redundant work and provide needed functionality. Some attackers look for vulnerabilities in these components which they can then use to orchestrate attacks. Some of the more popular components are used on hundreds of thousands of websites that could potentially be vulnerable to attack should a vulnerability be found. 

A web application is likely vulnerable if: 

* The developers do not know the versions of all components they use on both client side and server side. This includes directly used components as well as dependencies.  
* The software is vulnerable, unsupported, or out of date. This includes Operating Systems, the applications server, database management systems, APIs, and all components, runtime environments and libraries. 
* Vulnerabilities are not scanned for regularly. 
* Patches and upgrades are not applied in a risk-based timely fashion. 
* Software developers do not test the compatibility of updated, upgraded, or patched libraries. 

---

<ins> **Open Source Software** </ins>

Modern applications are comprised of custom code and many pieces are open source. The developer is normally very knowledgeable about their custom code but less familiar with the potential risk of the libraries/components they use.  Open source software is obtained from many different repositories with different standards for quality, license information is often difficult to validate, and security information is scattered everywhere. Open source consumption in modern day applications has increased, as such so has the size of the attack vector. Automated tooling should be used to baselines open source consumption in an organizations applications.  

While component developers often offer security patches and updates to plug up known vulnerabilities web application developers don't always have the patched or most recent versions of components running on their applications.  To minimize risk developers should remove unused components from their projects, as well as ensuring that they receive components from a trusted source and ensure they are kept up to date. 

There should be a patch management process in place to: 

* Remove unused dependencies, unnecessary features, components, files, and documentation. 
* Continuously inventory versions of both client side and server side components and monitor trusted sources for vulnerabilities in said components. If the option exists subscribe to email alerts for security vulnerabilities related to components in use.  
* Only obtain components from official sources over secure links that are digitally signed. 
* Monitor for libraries and components that are unmaintained or do not create security patches for older versions. 
* Ensure an ongoing plan for monitoring and applying updates for the lifetime of the application. 

---

<ins> **WebGoat Challenges** </ins>

The Challenge for the Vulnerable and Outdated Components section requires the use of the Docker image of WebGoat, which I am not running.  

![Challenge](/docs/assets/images/webgoat/outdatedcomponents/challenge.png)

So instead I'll just talk about [CVE-2013-7285](https://nvd.nist.gov/vuln/detail/CVE-2013-7284) a little bit. This is quite an old vulnerability so I think the likelihood of finding it on a modern system is very low, however the point of this lesson is that people often don't update their components. 

In this vulnerability attackers are able to execute arbitrary code in a crafted request that won't be properly handled when deserialized.  The *PlRPC* Perl module implements *IDL-free RPCs*. It fails to achieve that goal because it uses *Storable*, which is known to be insecure when deserializing untrusted data. User name and password are transmitted using Storable, so code execution can happen before authentication.  

The CVSS wasn't updated to Version 3 for this vulnerability but on the Version 2 model it has a Base Score of 6.8.  

`Access Vector: Network/ Access Complexity: Medium / Authentication: None / Confidentiality: Partial/ Integrity: Partial / Availability: Partial.`  

That's really it for Vulnerable and Outdated Components when it comes to WebGoat.

