## **eWPT Prep Labs - Directory Enumeration With Gobuster**

The purpose of this lab is to utilize the tool `gobuster` to brute force endpoints on a web application. 

![lab1 intro](/docs/assets/images/ewpt/labs/gobuster/01.png)

To do this I need to first run the `ifconfig` command and obtain the subnet that my lab is being hosted on. From there I just increment the last octet by one and that's the location of the web server I need to brute force directories on. 

![ifconfig](/docs/assets/images/ewpt/labs/gobuster/02.png)

With the IP address I can now utilize `gobuster` to enumerate endpoints. The `dir` switch tells gobuster I want to brute force directories, and the `-u` switch indicates which host I'd like to brute force, finally the `-w` switch indicates the file path to the wordlist I would like to use.  

`gobuster dir -u http://192.234.46.3 -w /usr/share/wordlists/dirb/common.txt` 

I can see that even with a simple wordlist this web application returns a number of directories, but there are a lot of them that responded with errors. 

![gobuster](/docs/assets/images/ewpt/labs/gobuster/03.png)

![gobuster2](/docs/assets/images/ewpt/labs/gobuster/04.png)

I can clean up the output a little bit by indicating which response codes I'd like gobuster to ignore with the `-b` switch. 

`gobuster dir -u http://192.234.46.3 -w /usr/share/wordlists/dirb/common.txt -b 404,403` 

![minus errors](/docs/assets/images/ewpt/labs/gobuster/05.png)

![minus errors 2](/docs/assets/images/ewpt/labs/gobuster/06.png)

Additionally I can dig a little bit deeper by telling gobuster which file types to look for with the `-x` switch, and to follow all of those redirects with the `-r` switch. 

`gobuster dir -u http://192.234.46.3 -w /usr/share/wordlists/dirb/common.txt -b 403,404 -x .txt,.php -r` 

![extensions and redirections](/docs/assets/images/ewpt/labs/gobuster/07.png)

![redirects](/docs/assets/images/ewpt/labs/gobuster/08.png)
