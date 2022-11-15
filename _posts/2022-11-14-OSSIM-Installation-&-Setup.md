## **OSSIM Installation & Setup**


For this post I will be going through the installation of *AlienVault OSSIM* along with setting up a virtual network of machines connected to the *SIEM* for future project use 

Taken from [AT&T Cybersecurity](https://cybersecurity.att.com/products/ossim)

> AlienVault® OSSIM™, Open Source Security Information and Event Management (SIEM), provides you with a feature-rich open source SIEM complete with event collection, normalization and correlation. 


---

<ins>**Creating an OSSIM Virtual Machine**</ins>

The *OSSIM* ISO file can be found [Here](https://cybersecurity.att.com/products/ossim/download)

![Download ISO](/docs/assets/images/ossim/ossim01.png)

First I create a new virtual machine named OSSIM. Type is set to Linux and Version to Debian (64-bit) because that is the system that *AlienVault* is built on.

![Creat New Machine](/docs/assets/images/ossim/ossim02.png)

I have allocated 4gb of ram and created a VDI type virtual hard disk that has a fixed size of 50gb

![RAM Allocation](/docs/assets/images/ossim/ossim03.png)

![Create Virtual Hard Disk](/docs/assets/images/ossim/ossim04.png)

![50gb Space Allocation](/docs/assets/images/ossim/ossim05.png)

Next I enter the settings for the new OSSIM machine and go to storage, select the empty controller and click the disk icon next to where it says optical drive under Attributes. Select "Choose a disk file..." And then add the ISO file that was downloaded earlier. Making sure to select it and clicking on OK should now change The Controller from Empty to the ISO file downloaded earlier.

![OSSIM Settings](/docs/assets/images/ossim/ossim06.png)

![Add ISO](/docs/assets/images/ossim/ossim07.png)

![ISO Added](/docs/assets/images/ossim/ossim08.png)


---

<ins>**Creating a Host Only Network**</ins>

I created a new host only network specifically for uses related to this SIEM project. 

From the Virtualbox Manager select file > Host Network Manager.

![Host Network Manager](/docs/assets/images/ossim/ossim09.png)

A new window pops up with an option at the top that says "Create"

![Create](/docs/assets/images/ossim/ossim10.png)

Once the Netowrk was made the option to manually set the *IPv4 Address* and *Network Mask* was made available.

![Set IPV4](/docs/assets/images/ossim/ossim11.png)

Then I went into the settings of every virtual machine I plan to use in this project, including the new OSSIM one and Under "Network" set them to "Host Only Adapter" and selected #3, which was the one I just made.

![Set Adapter#3](/docs/assets/images/ossim/ossim12.png)


---

<ins>**Installing AlienVault**</ins>

The first time the OSSIM machine was started I was prompted with the AlienVault OSSIM installation process. 

![OSSIM Installation](/docs/assets/images/ossim/ossim13.png)

The machine went through the basic installation process of asking for various settings such as language, country, and keyboard configuration. 

![Options](/docs/assets/images/ossim/ossim14.png)

Eventually the network settings options came up. The IP address is set to one on the network set up earlier, the netmask and gateway should also match.

![Set IP](/docs/assets/images/ossim/ossim17.png)

![netmask](/docs/assets/images/ossim/ossim18.png)

![Gateway](/docs/assets/images/ossim/ossim19.png)

Then the Option to name the Network and and set the *root* password.

![Name](/docs/assets/images/ossim/ossim20.png)

![Root Password](/docs/assets/images/ossim/ossim21.png)

Afterwards the final option is to pick the Timezone and the installation process will finishes itself.

![Installing...](/docs/assets/images/ossim/ossim22.png)


---

<ins>**Configuring AlienVault**</ins>

The installation process was pretty long for me but it eventually completed and I was greeted with the console login screen. I was able to login with the root password created in the previous step.

![Root login](/docs/assets/images/ossim/ossim23.png)

From here it's possible to jailbreak the ISO and gain root access to the command line, they actually just let you do it in the settings. However I didn't feel I really needed to for anything at this point.

Instead I started another machine that was connected to the network and visited the web application being hosted by the OSSIM machine. Here I was able to set up the credentials for my admin account.

![Setup Admin Account](/docs/assets/images/ossim/ossim24.png)

Aftewards I was greeted by the host discovery wizzard. AlienVault also has the option to manually set everything up but for simplicity I used the wizzard. I first started all of the virutal machines I planned to connect to the network. Which consists of a Kali box to simulate an attack machine, a windows10 vm, an ubuntu vm, and the OSSIM vm I just set up.

This was moderately intense on my resources but doable while still allowing plenty for the host machine to function normally.

![VM's](/docs/assets/images/ossim/ossim26.png)

![Discovery Wizzard](/docs/assets/images/ossim/ossim25.png)

Then I ran the wizzard and let it discover my assets on the network. Which I was then able to put together in their own group.

![Discovered Assets](/docs/assets/images/ossim/ossim27.png)

![Custom Group](/docs/assets/images/ossim/ossim28.png)


---

<ins>**Final Thoughts**</ins>

Not a whole lot. This was as simple as installing any other disk image onto Virtualbox. This post was really just about documenting my process and to have a quick reference for future projects if needed. 





