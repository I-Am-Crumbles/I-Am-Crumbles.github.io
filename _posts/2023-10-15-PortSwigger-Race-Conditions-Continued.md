## **PortSwigger - Race Conditions Continued**

Some frameworks attempt to prevent accidental data corruption by using some form of request locking. For example PHP's native session handler module only processes one request per session at a time.  It's extremely important for an attacker to spot this kind of behavior as it can otherwise mask trivially exploitable vulnerabilities. If all requests are being processed sequentially an attacker may try sending each of them using a different session token. 

Many applications create objects in multiple steps, which may introduce a temporary middle state in which the object is exploitable. This kind of behavior paves the way for exploits whereby the attacker injects an input value that returns something matching the uninitialized database value.  

Sometimes the techniques for delivering requests with precise timing can still reveal the presence of other vulnerabilities even if race conditions do not exist. For example when high-resolution timestamps are used instead of cryptographically secure random strings to generate security tokens. A password reset token that is only randomized using a timestamp may make it possible to trigger two password resets for two different users which both use the same token if the requests are timed so that they generate the same timestamp. 

---

**Labs**

*Partial Construction Race Conditions*

![lab1 intro](/docs/assets/images/portswigger/raceconditionscontinued/rcc01.png)

To start this lab off I navigated over to the `/registration` page and attempted to create a new user so I could observe the functionality in burp suite. 

![lab1 login](/docs/assets/images/portswigger/raceconditionscontinued/rcc02.png)

![check email message](/docs/assets/images/portswigger/raceconditionscontinued/rcc03.png)

Unfortunately the email client I have access to is not related to `@ginandjuice.shop` so I can't receive the registration link.

![email client](/docs/assets/images/portswigger/raceconditionscontinued/rcc04.png)

In the burp history tab I can observe that there is a suspicious request sent to `GET /resources/static/users.js` during the registration process. This request generates a response from the server that indicates it was fetching a script that generates a form for a confirmation page, presumably the one the link in the email will eventually send me to. I can see that ultimately this will be a `POST /confirm?`  the `?` indicates that the `token` generated on line 50 will be a part of the query string for the generated page. 

![resources/static/users](/docs/assets/images/portswigger/raceconditionscontinued/rcc05.png)

I can forward any request that has a matching `HOST` and `phpsessionId` to the repeater and edit the query string to send a request to this confirmation page to test the web applications behavior.  

For example if I send a request to `POST /confirm?token=1` request to the server I can see the server responds with a message `"Incorrect token: 1"` where `1` is the arbitrary value I selected for a token I don't have. 

![/confirm token](/docs/assets/images/portswigger/raceconditionscontinued/rcc06.png)

If I remove the token parameter altogether, `POST /confirm`, I get an error message telling me that it's missing. 

![token missing](/docs/assets/images/portswigger/raceconditionscontinued/rcc07.png)

Finally if I submit a token with an equivalent of a null value, `POST /confirm?token[]=`, I can view that the server responds with a response `"Incorrect token: Array"`. 

![incorrect token array](/docs/assets/images/portswigger/raceconditionscontinued/rcc08.png)

This means there is likely a temporary sub-state in which `null` is a valid token for confirming the users registration and a small race window exists between when a request is submitted to register a user and when the newly generated registration token is actually stored in the database. 

If I send the `POST /register` request I generated earlier to the repeater and forward it to the server I can observe that it responds with a message that `An account already exists with that username`. Indicating that the server is storing accounts that haven't been fully registered yet. 

![POST /register](/docs/assets/images/portswigger/raceconditionscontinued/rcc09.png)

I'm going to create a group containing the `POST /register` request and the `POST /confirm?token=1` request. 

![create a group](/docs/assets/images/portswigger/raceconditionscontinued/rcc10.png)

No matter how I send the group request, whether in `separate connections` or `single-packet attack) the server consistently responds much slower to the `POST /register` request than the `POST /confirm?token=1` request. 

![slower1](/docs/assets/images/portswigger/raceconditionscontinued/rcc11.png)

![slower2](/docs/assets/images/portswigger/raceconditionscontinued/rcc12.png)

What I need is for the server to begin creating the pending user in the database, then compare the token I send in the confirmation request before the process is complete. Since the confirmation response is always processed much faster I need to delay it so that it falls in the race window. 

I can do this with the `Turbo Intruder` extension. I'll send the `POST /register` request to the Turbo intruder extension directly from the repeater.  

![/register](/docs/assets/images/portswigger/raceconditionscontinued/rcc13.png)

Within the turbo intruder I'm going to edit the end of the `POST /register` request up top so that the `username` parameter has the `%s` payload position marker for a value. From there I'm going to select `example/race-single-packet-attack.py` from the pulldown menu to generate a default script for the attack.  

On line 10 I'm going to add a `confirmationReq` variable and assign it to the entire contents of the `POST /confirm?token[]=` request I experimented with earlier. The `POST` request needs to be wrapped in a comment block with an empty line at the end as pictured below 

![Turbo intruder](/docs/assets/images/portswigger/raceconditionscontinued/rcc14.png)

Additionally starting on what was now line 29 I added the following code block  

``` 

for attempt in range(20): 
        currentAttempt = str(attempt) 
        username = 'impostercrumbles' +  currentAttempt 
        engine.queue(target.req, username, gate=currentAttempt) 

        for i in range(50): 
            engine.queue(confirmationReq, gate=currentAttempt) 

```

This will create a loop that queues a single registration request user a new username for each attempt and set the `gate` argument to match the current itteration. Then the nested loop will queue a large number of confirmation requests for each attempt  that should also use the same release gate. 

Then I edited what was on line 39 so that it now reads `engine.openGate(currentAttempt)` which will open the gate for all requests in each attempt at the same time. 

![Edit python script](/docs/assets/images/portswigger/raceconditionscontinued/rcc15.png)

If I run the attack I can see that there are several `200` responses with a blank payload. These are the `/POST /confirm?token[]=` requests that were successfully processed during the race window. Luckily the server responds with a `Account registration for user impostercrumbles3 is successful!` message. Indicating to me which accounts were actually registered. 

![run attack](/docs/assets/images/portswigger/raceconditionscontinued/rcc16.png)

Since the password was static across all of the attacks I simply need to login with any of the successful usernames in the step above and I can view an account page with access to the admin panel. In my case I used `impostercrumbles3:password`. 

![login](/docs/assets/images/portswigger/raceconditionscontinued/rcc17.png)

If I navigate over to that `Admin panel` I have the option to `delete carlos` and doing so solves the lab. 

![delete carlos](/docs/assets/images/portswigger/raceconditionscontinued/rcc18.png)

![lab1 solved](/docs/assets/images/portswigger/raceconditionscontinued/rcc19.png)


