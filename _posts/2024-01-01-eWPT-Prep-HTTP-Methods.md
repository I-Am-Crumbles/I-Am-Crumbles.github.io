## **eWPT Prep labs - HTTP Method Enumeration**

The goal of this lab is to enumerate the HTTP methods allowed by a by a web application. 

![lab1 intro](/docs/assets/images/ewpt/labs/httpmethodenum/01.png)

Burpsuite wasn't on the desktop of the test lab, but I was able to locate it with the `which` command then I just navigate to `/usr/bin` and start it up by entering `burpsuite` in the command line. 

![which burp](/docs/assets/images/ewpt/labs/httpmethodenum/02.png)

With Burp up and running the next thing to do is to enter `ifconfig` into the terminal and obtain the IP address for the web application to test for this lab. It's simply the host IP but changing the `2` in the final octet to a `3`. 

![ifconfig](/docs/assets/images/ewpt/labs/httpmethodenum/03.png)

![webpage](/docs/assets/images/ewpt/labs/httpmethodenum/04.png)

With in the history tab in Burp I can see a `GET /` request, which is the HTTP request to the home page, that I sent to the repeater. I forwarded the request just to demonstrate that the server does respond with a `200 OK`. 

![GET](/docs/assets/images/ewpt/labs/httpmethodenum/05.png)

Next I can just replace `GET` within the request line so that it reads `OPTIONS` and forward the request. The server will return all of the allowed HTTP methods in the response for the home directory. In this case it is `GET, HEAD, OPTIONS`.  

![OPTIONS](/docs/assets/images/ewpt/labs/httpmethodenum/06.png)

I can confirm this by changing the request line to read `HEAD` and noting the servers `200 OK` response. 

![head](/docs/assets/images/ewpt/labs/httpmethodenum/07.png)

Similarly if I try to send a `POST` request the server returns a `405 Method Not allowed` response.  

![POSt denied](/docs/assets/images/ewpt/labs/httpmethodenum/08.png)

There is a `/login.php` endpoint that does support POST requests though, this can be seen by sending an OPTIONS request to the endpoint. 

![Options login](/docs/assets/images/ewpt/labs/httpmethodenum/09.png)

It can also be verified with the credentials provided in the labs description by simply changing the query line to a `POST` request, and adding a line in the request body with the parameters `name=john&password=password`. Forwarding the request to the server returns a `302 Found` response, indicating I was likely redirected upon successful login. 

![POST login](/docs/assets/images/ewpt/labs/httpmethodenum/10.png)

These request methods can also be enumerated from the command line with the `curl` command. Using the `-X` switch, followed by the desired method, and the request URL. Additionally the `-v` switch will be needed to include the servers response in the curl output. 

For example: 

`curl –X OPTIONS 192.210.212.3 -v` 

![curl 1](/docs/assets/images/ewpt/labs/httpmethodenum/11.png)

`curl –X OPTIONS 192.210.213.3/login.php -v` 

![curl 2](/docs/assets/images/ewpt/labs/httpmethodenum/12.png)
