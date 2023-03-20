## **Hack The Box - Getting Started**

**Creator:** [polarbearer](https://app.hackthebox.com/users/159204) & [C4rm310](https://app.hackthebox.com/users/undefined)

**Difficulty:** Easy

**Link:** [Squashed](https://app.hackthebox.com/machines/Squashed)

---


<ins> **Introduction** </ins>

![infocard](/docs/assets/images/HTB/squashed/Squashed.png)

*Squashed* is an easy level machine on hack the box. This machine involves exploiting the lack of authentication in the Network File System Protocol to access and enumerate the files on the remote server. From there I was able to identify the *UID* of the owner of the server directory, allowing me to impersonate them on my own host machine. 
Since the NFS protocol on this system lacks any sort of authentication I was able to upload a reverse shell onto the webserver. From there I'm able to gain access to the user *alex* as alex I'm able to use a cookie in the .Xauthority file to gain access to the X Window System as user *ross*.
Finally with access to the *X window* I'm able to take a screenshot of the user ross' display and send it to my host machine. The screenshot was of a *KeePassXC* Passwords file displaying the system root users password in plain text, which I used to switch from *alex* to *root* and get the system flag.

---


<ins> **Enumeration** </ins>

I start the machine off with an nmap version scan that I output to a file called services. From there I can see the following ports are open.

22/tcp ssh OpenSSH 8.2p1 

80/tcp http Apache httpd 2.4.41 

111/tcp rpcbind 2-4 (RPC #100000) 

2049/tcp nfs_acl 3 (RPC #100027) 

`nmap -sV -oA services <target_ip>`

![nmap output](/docs/assets/images/HTB/squashed/squashed01.png)

Starting with the 2 that I'm unfamiliar with myself. Port 111 is running *rpcbind* which is a service used to map *Remote Procedure Call (rpc)* program numbers to their corresponding network addresses. RPC is a protocol used to allow clients to call procedures on remote servers, and the (rpc #100000) is the RPC program number for the rpcbind. Nothing confusing about that, it seems that rpcbind itself isn't typically considered a high-risk service, but is just an indicator that the machine is running a service that relies on rpc. 

Port 2049 is running *nfs_acl* which is a component of the *Network File System* protocol, the 3 indicates that It's running version 3. Then again the RPC program number associated with the services is also display. The Network File system protocol allows a client to access files on a remote server as if they were located on the client's own machine. Nfs_acl provides access control functionality for NFS, allowing admins to define permissions for NFS clients on a per-file or directory basis. Unlike RPC this might be useful since broken access controls are so common.  

Running *searchsploit* against all of the service versions found so far yielded 0 results. 

Continuing along to enumerate the webserver I ran *whatweb* and seen that it gave me a status code 200. Along with that I see that the machine is running *JQuery 3.0.0*, which could be useful later.

`whatweb <target_ip>`

![whatweb output](/docs/assets/images/HTB/squashed/squashed02.png)

Navigating over to the webpage it's for "Built Better" Furniture. Everything clickable on the webpage just refreshes the top of the homepage. I then ran *gobuster* against a common wordlist to do some directory enumration but didn't really find much, I even switched it up to a larger wordlist and still didn't find anything useful.

![homepage](/docs/assets/images/HTB/squashed/squashed03.png)

`gobuster dir -u http://<target_ip> -w /usr/share/dirb/wordlists/common.txt >> gobuster.txt` 

![gobuster1](/docs/assets/images/HTB/squashed/squashed04.png)

`gobuster dir -u http://<target_ip> -w ~/Documents/SecLists/Discovery/Web-Content/directory-list-2.3-medium.txt >> gobuster2.txt `

![gobuster2](/docs/assets/images/HTB/squashed/squashed05.png)

With there not being a whole lot going on with the webserver this brings me back to the *nfs_acl* service my nmap scan picked up. I can enumerate *nfs* by using the `showmount -e <target_ip>` command. This displays two shares */home/ross* and */var/www/html*.

![enumerate shares](/docs/assets/images/HTB/squashed/squashed06.png)

I created new directories to mount the shares to called */tmp/mnt/ross* and */tmp/mnt/html* respectively. Starting with the */home/ross* share I use the command `sudo mount -t nfs <target_ip>:/home/ross /tmp/mnt/ross`. There wasn't a whole lot to find on this share except for a *keepass* file called *passwords.kbx*, but without the password for the file I can't decrypt it.

![make directories](/docs/assets/images/HTB/squashed/squashed07.png)

![mount the share](/docs/assets/images/HTB/squashed/squashed08.png)

![enumerate through the shares](/docs/assets/images/HTB/squashed/squashed09.png)

I tried to mount the other file share but even as a root user I don't have permissions to open the directory. What I can see that is that it's owned by *UID 2017* and the *www-data group*. 

`Sudo mount –t nfs <target_ip>:/var/www/html /tmp/mnt/html`

![mount the share](/docs/assets/images/HTB/squashed/squashed10.png)

---


<ins> **Gaining A Foothold** </ins>

NFS supports the use of linux file permissions to control access to shared directories and files. So if I can assume the identity of the share's owner I would in theory have the same permissions. 

I start by creating a new user on the host machine, since the *UID* will by default be the highest ID found in */etc/passwd* file plus 1 I will need to then manually assign them the UID of 2017 with the `usermod` command.

```
sudo useradd impostercrumbles

sudo usermod –u 2017 impostercrumbles
``` 

![create new user](/docs/assets/images/HTB/squashed/squashed11.png)

Switching over to the *impostercrumbles* user gave me a pretty terrible shell, so I used python to upgrade the *TTY* and if I use `ls –l` to view the file permissions I can see my imposter user is now the owner of the share I mounted from *NFS*. 

![imposter owner](/docs/assets/images/HTB/squashed/squashed12.png)

Now that I have access to the share that controls all of the files related to the webserver I can upload a payload to send myself a *php-reverse-shell*


