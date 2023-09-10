## **PortSwigger - Business Logic Vulnerabilities; Excessive Trust**


Business logic vulnerabilities are flaws in the design and implementation of an application that allow an attacker to elicit unintended behavior. This potentially enables attackers to manipulate legitimate functionality to achiever a malicious goal. These flaws are generally the result of failing to anticipate unusual application states that may occur and consequently failing to handle them safely. 

Business Logic simply refers to the set of rules that define how the application operates. As these rules aren't always directly related to a business, the associated vulnerabilities are also known as application logic vulnerabilities or simply logic flaws.  

Logic flaws are often invisible to people who aren't explicitly looking for them as they typically won't be exposed by normal use of the application. However an attacker may be able to exploit behavioral quirks by interacting with the application in ways that developers never intended. Broadly speaking the business rules dictate how the application should react when a given scenario occurs. This includes preventing users from doing things that will have a negative impact on the business or that simply don't make sense. 

Flaws in logic allow attackers to circumvent these rules. For example they might be able to complete a transaction without going through the intended purchase workflow. In other cases broken or non-existent validation of user supplied data might allow users to make arbitrary changes to transaction critical values or submit nonsensical input. By passing unexpected values into server side logic an attacker con potentially induce the application to do something it wasn't supposed to.  

Logic based vulnerabilities can be extremely diverse and are often unique to the application and its specific functionality. Identifying them often requires a certain amount of human knowledge, such as an understanding of the business domain or what goals an attacker might have in a given context. This makes them difficult to detect using automated vulnerability scanners. As result logic flaws are a great target for bug bounty hunters and manual testers in general. Examples of business logic flaws include: 

* Excessive Trust in Client-Side Controls - A fundamentally flawed assumption is that users will only interact with the application via the provided web interface. This is especially dangerous because it leads to the further assumption that client-side validation will prevent users from supplying malicious input. Accepting data at face value without performing proper integrity checks and server-side validation can allow an attacker to do damage with minimal effort. Exactly what they can do is dependent on the vulnerable functionality and what it is doing to controllable data but in the right context this kind of flaw can be devastating to both business related functionality and over all security to the web application.
* Failing to Handle Unconventional Input - One aim of application logic is to restrict user input to values that adhere to business rules, for example a customer should not be able to place an order for more of product than is in stock. To implement rules like this developers need to anticipate all possible scenarios and incorporate ways to handle them into the application logic.  Attackers will try submitting unconventional values such as exceptionally high or low numeric inputs, or abnormally long strings. By observing the applications response they will try and answer the following questions: 
  1. Are there any limits that are imposed on the data? 
  2. What happens when you reach those limits? 
  3. Is any transformation or normalization being performed on the users input?  
  4. Is there anything that may expose weak input validation that allows them to manipulate thew application in usual ways.

---

**Labs** 

*Excessive Trust In Client-Side Controls* 

![lab1 intro](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv01.png)

To start this lab off I'll need to log in with the provided credentials `wiener:peter` and send a request to put the *Lightweight l33t leather jacket* into my cart to the repeater. This is easily done by clicking *View details* to navigate to the product page and then clicking the *add to cart* button at the bottom. 

![view details](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv02.png)

![cart](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv03.png)

![cart request](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv04.png)

With the proper request in sent to the repeater I then empty the users cart so that I don't buy more than one Jacket. Then I just edit the *price* parameter to have a value of `100`. Forwarding the request will put the desired item into the users cart with a cost of *$1.00*.  

I then just need to refresh the page with the users cart to see the results. 

![total $1](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv05.png)

Clicking on place order will purchase the jacket with $1.00 of the users available store credit and complete the challenge for this lab. 

![lab1 solved](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv06.png)

---

*High-Level Logic Vulnerability*

![lab2 intro](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv07.png)

I'll start this lab off by logging in with the provided credentials and I can see that I again have $100 of store credit.  

![login wiener](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv08.png)

From there I'll navigate to the `l33t Leather Jacket` product page and add one to my cart. 

![add to cart](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv09.png)

I can observe from the request that I have the ability to manipulate the quantity of the product that's being added to the cart. 

![cart post request](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv10.png)

Since I know I want to actually buy a leather jacket to satisfy the challenge for this lab I will go to a second item in the listing and capture a request to add that to the cart and send it to the repeater. 

![second item to cart](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv11.png)

![second item repeater](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv12.png)

Then to verify that I have the ability to manipulate the quantity I increased it to `3` and forwarded the request. I can see that it worked by refreshing the cart in the web browser and seeing there are now `5` items in it, the 3 I just added and the 2 from before. 

![forward repeater](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv13.png)

![updated cart](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv14.png)

I can also manipulate the quantity so that it adds a negative amount of an item to the cart, by entering a quantity of `-5` and forwarding the request I can observe that the cart now has `1 l33t leather jacket` and `-1 real life photoshopping`. 

![repeater](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv15.png)

![cheaper cart](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv16.png)

I can also see that the current total `$1316.90` is $20.10 less than the original price of the jacket.  

If I further edit the request in the repeater to an extreme number like `-1000` I can observe that the cart total actually goes into a negative value. 

![request](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv17.png)

![updated cart again](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv18.png)

I can now attempt to place the order but the cart will generate an error `Cart total price cannot be less than zero`. This isn't really a problem though since I have $100 of store credit, so any positive total under $100 should work. 

![cart error](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv19.png)

A quantity of `-64` will result in the cart having a total of `$50.60` which is cheap enough to purchase with my store credit.  

![cart in range](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv20.png)

Placing the order marks the lab as solved. 

![lab2 solved](/docs/assets/images/portswigger/businesslogicvulns/excessivetrust/blv21.png)

---




 






















