## **Hack The Box - Getting Started**

**Creator:** 

**Difficulty:** Easy

**Link:** 

---


<ins> **Introduction** </ins>

*Getting Started* is an Easy Level system and is meant to be the first *blackbox* machine someone following the *Penetration Tester* Learning path would encounter. As such I was not able to obtain creator information, a direct link to the machine, or it's info card. Although I can register a guess who the creator was based on a username found on the system.
In this challenge I gain a foothold by exploiting [CVE-2019-11321](https://nvd.nist.gov/vuln/detail/CVE-2019-11231). From there I'm able to obtain root access using the *www-data* users sudo privileges over the *php* command that can be found on [GTFO Bins](https://gtfobins.github.io/gtfobins/php/#sudo).

I Normally start each machine with an *nmap* scan and this one was no exception. 

![nmap output](/docs/assets/images/HTB/gettingstarted/gettingstarted1.png)

Port 22/tcp open to ssh using OpenSSH 8.2p1 
Port 80/tcp open to http using Apache httpd 2.4.41

Neither one yielded any results initially with *searchsploit*. Navigating over to the webpages showed me what looked like an outline for a blog or something running *GetSimple* Content Managment System. This page contains a few links to documentation for *GetSimple* and some support forums. There are also some headers containing some content in a language I can't read, a list of features, and finally a link to *gettinstarted*. 

![searchsploit](/docs/assets/images/HTB/gettingstarted/gettingstarted2.png)

![webpage](/docs/assets/images/HTB/gettingstarted/gettingstarted3.png)

Navigating over to *gettingstarted* brings me to a server not found page. I noticed the ip_address in the url bar change itself into a hostname, which tells me I'll have to edit them into my */etc/hosts* file. Once I do that I'm able to load a webpage very similar to the one I was on before.

![404](/docs/assets/images/HTB/gettingstarted/gettingstarted4.png)

![etc hosts](/docs/assets/images/HTB/gettingstarted/gettingstarted5.png)

![webpage loaded](/docs/assets/images/HTB/gettingstarted/gettingstarted6.png)

I wasn't able to find a whole lot on the web page as it is. The next step for me was to run *gobuster* against the webserver. I started with a simple word list and got several hits. Three with a status code of 200, */index.php, /robots.txt, /sitemap.xml*, and five with a status code of 301 */theme, /plugs, /data, /backups, /admin*. 

`gobuster dir –u <target_ip> -w /usr/share/dirb/wordlists/common.txt`

![gobuster](/docs/assets/images/HTB/gettingstarted/gettingstarted7.png)

I spent some time navigating through these directories and seeing what information I could find from them. The */admin* directory redirected to a login page with a nonspecific error message, and inside of the */data* directory I was able to find an *api key* and what was likely the specific version of *GetSimple*, being *GetSimple 3.3.15* 

![admin login](/docs/assets/images/HTB/gettingstarted/gettingstarted10.png)

![nonspecific error](/docs/assets/images/HTB/gettingstarted/gettingstarted11.png)

![api key](/docs/assets/images/HTB/gettingstarted/gettingstarted8.png)

![GetSimple Version](/docs/assets/images/HTB/gettingstarted/gettingstarted9.png)

