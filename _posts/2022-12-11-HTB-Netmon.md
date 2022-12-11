## **Hack The Box - Netmon**

**Creator:**

**Difficulty:** Easy

**Link:**

---


<ins> **Introduction** </ins>

![Logo](/docs/assets/images/HTB/netmon/netnom01.png)

*Netnom* is the 6th challenge and the 3rd vulnerable machine in the Beginner Track on Hack the Box.

<ins> **Enumeration** </ins>

I start this machine by running the default nmap scan I usually run to enumerate for service versions, try to identify the operating system, and run a default set of scripts against the machine just to see if there are any other little details that can be squeezed out of it.

`nmap -sV -sC -O <target_ip>`

![nmap results](/docs/assets/images/HTB/netmon/netnom02.png)

![nmap results cont](/docs/assets/images/HTB/netmon/netnom03.png)

Looks like *ftp* traffic is open to default crednetials on port 21 wich may allow for a look at some of the stuff in the file system, this system is using *Microsoft ftpd*. 

Port 80 is open to *http* web traffic and is running *Indy httpd 18.1.37.13946* something called *Paessler PRTG bandwidth monitor* is also mentioned.

Port 135 is open to *rpc* traffic using *Microsfot Windows RPC (msrpc)*.

Both ports 139 and 445 are also open these are associated with an *smb* server and it looks like 139 is running *netbios-ssn* and 445 is running *microsoft-ds*.

There is also a message that says *nmap* couldn't actually identify the operating system but there is plenty in the output to suggest that it's *windows*.

I stared *nikto* and while it ran I used *searchsploit* to look for vulnerabilities on some of the information I had found in the *nmap* scan however I didn't really find a whole lot this way.

![nikto results](/docs/assets/images/HTB/netmon/netnom04.png)

---


<ins> **Exploring the File System** </ins>

As suggested by *nmap* I'm able to use the *ftp* command to log into the file server using the default credentials of *Anonymous* and a blank password.

![ftp](/docs/assets/images/HTB/netmon/netnom05.png)

I would spend a good amount of time digging through everything Anonymous had access to but it didn't take long to find the *user flag* for the challenge. It was found in the *Public* users directory. I used *get* to download it onto my local machine as I don't think ftp has access to run *cat*

![ftp public](/docs/assets/images/HTB/netmon/netnom06.png)

![user flag](/docs/assets/images/HTB/netmon/netnom07.png)

there was more on this file server but on my first pass through this was all I found that lead me to anything related to the challenge.

---


<ins> **The Webpage** </ins>

Proceeding with my *nmap* scan results I navigate to the webpage being hosted on port 80. I was greeted with a login page for *PRTG Network Monitor (NETMON)*. I tried several things on this page like sql injections, guessing default credentials and analyzing the requests and responses in *Burp*. Ultimately the most useful piece of info I was able to find was displayed right at the bottom of the page and that was the service version *PRTG Network Monitor 18.1.37.13946*.

![Webpage](/docs/assets/images/HTB/netmon/netnom08.png)

Using *searchsploit* for the specific version doesn't show me much but a DDOS attack, but eliminating the specific version from the parameter I am able to find a few more results.

![searchsploit prtg](/docs/assets/images/HTB/netmon/netnom09.png)

I was interested in the *remote code execution* exploit, although it displays a later version in *searchsploit* there is always a chance it worked earlier. I used *locate* find the file path to the script and navigated over to the directory containing it. From there I used *vim* to open the script file to see if there is any information about it in plaintext and luckily whoever wrote this particular script wrote it's usage syntax directly into the file. 

![locate](/docs/assets/images/HTB/netmon/netnom10.png)

![vim](/docs/assets/images/HTB/netmon/netnom11.png)

The script provides the default login credentials are *prtgadmin/prtgadmin* and I can see by the usage example I will need to provide a *cookie* from a sucessful login. If I can get that however the script should create a user on the system with admin privileges named *pentest* and set the password to *P3nT3st!*. I tried to log in to the web app to see if the default credentials work and they did not. 

![default fail](/docs/assets/images/HTB/netmon/netnom12.png)

---


<ins> **Back To The File Server** </ins>

I tried to enumerate the *smb* server but I wasn't able to do much with out the *Adminstrator* users credentials. I decided to go back to the file server and looked through it some more and was unfortunately stumped. I spent some time on google and was able to learn that *PRTG* has a specific location that it stores it's program data in and it's in one of those files that the information I'm looking for is contained. Using [kb.paessler.com](https://kb.paessler.com/en/topic/463-how-and-where-does-prtg-store-its-data) as a reference I'm able to learn that that location is *ProgramData/Paessler/PRTG Network Monitor* inside of that directory I was able to find 4 key files that could be downloaded to my system using `get` they are *PRTG Configuration.dat, PRTG Configuration.old.bak, PRTG Configuration.old, PRTG Graph Data Cache.dat*. 

![4 key files](/docs/assets/images/HTB/netmon/netnom13.png)

Now that the files are on my local machine I'm able to use `grep` to quickly search if those default credentials show up anywhere within these files. It does and even shows up in a format that looks like a login in the *PRTG Configuration.old.bak* file.

![default cred found](/docs/assets/images/HTB/netmon/netnom14.png)

I opened the file in *vim* and used it search feature to find the line containing the default login name `/prtgadmin`.

![vim cred](/docs/assets/images/HTB/netmon/netnom15.png)

I can see that the password is listed right there in plaintext as *PrTg@dmin2018* however when I tried to use it to log into the webpage it didn't work. I spent some moere time trying to look into what else I could do with this and ultimately just found the answer on google. The idea here is that the file with this plaintext password is an old backup and being the amazing *admin* that they are the person has updated their password, the other clue being that the machine was released in *2019* it can be guessed that the password is now *PrTg@dmin2019*, which is not something I would have thought to do before encountering it in this challenge. It is however the password and I'm able to login. Alternatively I imagine there are a few methods that could have been used to brute force this password.

![Login Successful](/docs/assets/images/HTB/netmon/netnom16.png)

