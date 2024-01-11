## **eWPT Prep Labs - DNS Zone Transfer**

The goal of this lab is to answer a set of questions based on interactions with a DNS server being hosted for this challenge.

![lab1 intro](/docs/assets/images/ewpt/labs/dnszonetransfer/01.png)

**First question:** 

*How many A Records are present for witrap.com and its subdomains?* 

This can be solved with the use of the tool `dig`. However I first need to obtain the IP address of the DNS server for my lab. I can do this by entering the `ifconfig` command in the terminal and locating the IP address on the class C IP range used for local area networks, it generally begins with `192` in the first octet but can be a range of `192-223`. It's also likely the one on the `eth1` interface.  

![obtain IP address](/docs/assets/images/ewpt/labs/dnszonetransfer/02.png)

Now that I've identified the correct subnet I just need to increment the IP of my address by 1 and that's the location of the DNS server for this lab, `192.99.187.3`.  

With that I can use the `dig` command with the switch for DNS zone transfers, `axfr` which stands for Asynchronous Full Zone Transfer. I then indicate the hostname specified in the challenge `witrap.com` and direct the query with the at sign symbol `@` followed by the IP address of the DNS server. 

Once the command runs I just count the A records in the output and see the answer is `9`

`dig axfr witrap.com @192.99.187.3` 

![dig command](/docs/assets/images/ewpt/labs/dnszonetransfer/03.png)

---

**Second Question:** 

*What is the IP address of machine which supports LDAP over TCP on witrap.com?* 

This was also answered with the above command by observing the IP address for the `ldap` subdomain that was returned. Which was `192.168.62.111` 

![Second answer](/docs/assets/images/ewpt/labs/dnszonetransfer/04.png)

---

**Third Question:**

*Can you find the secret flag in TXT record of a subdomain of witrap.com?* 

Again this was answered by the first command by observing the `TXT` record that was returned for the `th3s3cr3tflag` subdomain which contains the flag `my_s3cr3t_fl4g`. 

![secret flag](/docs/assets/images/ewpt/labs/dnszonetransfer/05.png)

---

**Fourth Question:**

*What is the subdomain for which only reverse dns entry exists for witrap.com? witrap owns the ip address range: 192.168..* 

To answer this I just edit the first command I ran with the addition of the `-x` switch to indicate I'd like to do a reverse DNS lookup. I'm also going to substitute the hostname in the query for the partial IP address provided to me in question `192.168`. Then I can just compare the `subdomains` in the output of my two commands and the answer to the question is the only `subdomain` that will appear on the second list and not the first, `temp.witrap.com` 

`dig axfr -x 192.168 @192.99.187.3` 

![2nd dig command](/docs/assets/images/ewpt/labs/dnszonetransfer/06.png)

---

**Fifth Question:** 

*How many records are present in reverse zone for witrap.com (excluding SOA)? witrap owns the ip address range: 192.168.* 

The final question is answered simply by counting the records, excluding SOA, that were returned from the above command, which gives an answer of `12`. 

![fifth answer](/docs/assets/images/ewpt/labs/dnszonetransfer/07.png)

This solves the lab as only 2 of the questions needed to be submitted as flags to begin with. 

![Solved](/docs/assets/images/ewpt/labs/dnszonetransfer/08.png)
