## **Hack The Box - Getting Started**

**Creator:** 

**Difficulty:** Easy

**Link:** 

---


<ins> **Introduction** </ins>

*Getting Started* is an Easy Level system and is meant to be the first *blackbox* machine someone following the *Penetration Tester* Learning path would encounter. As such I was not able to obtain creator information, a direct link to the machine, or it's info card. Although I can register a guess who the creator was based on a username found on the system.
In this challenge I gain a foothold by exploiting [CVE-2019-11321](https://nvd.nist.gov/vuln/detail/CVE-2019-11231). From there I'm able to obtain root access using the *www-data* users sudo privileges over the *php* command that can be found on [GTFO Bins](https://gtfobins.github.io/gtfobins/php/#sudo).
