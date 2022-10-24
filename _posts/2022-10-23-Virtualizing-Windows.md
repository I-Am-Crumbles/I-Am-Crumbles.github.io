## **Creating a Windows10 Machine using Oracle's Virtualbox**




<ins>**Dowload and Install Virtualbox**</ins>

There are many Hypervisors but for the sake of this walkthrough we will be using Oracle's Virtualbox as it's free. 

[Virtualbox Download Link](https://www.oracle.com/virtualization/technologies/vm/downloads/virtualbox-downloads.html)

Once you have downloaded and installed the file relevant to your Operating System upon opening it you will be greeted by a screen that looks similar to this one.

![Virtualbox Main Menu](/docs/assets/images/winvm1022/Vm01.png)

We will be coming back to this in just a moment but for now the next thing you will need to do is download a Windows 10 ISO file. If you're like me and you're wondering what the ISO is .iso stands for geeksforgeeks has this to say. 

  >The file system standard is under the name ISO 9660, where the former term is used as the extension .iso for CD/DVD disk image files. But, ISO files represented with the .iso extension isn’t mandatory, as ISO files with file extensions such as .img, .udf also exists.



---

<ins>**Windows10 and Microsoft's Creation Tool**</ins>

We need a Windows 10 ISO file and unfortunately Microsoft won't let you just download the ISO file directly. You have to instead download their creation tool found here 
[Microsoft Creation Tool](https://www.microsoft.com/en-us/software-download/windows10) 

Once you download and install the creation tool you will be asked to pick some options upon running. These options are pretty basic but we will go through them below. 

The first screen you are greeted with will give you a choice to either install windows 10 on your current PC or "Create installation media(USB flash drive, DVD, or ISO file) for another PC". We want to download Windows as an ISO file so select "Create Installation media"

![Installation Media Selection](/docs/assets/images/winvm1022/VM02.png)

After clicking next you will be greeted with the language, Operating system edition, and Architecture options, you will also have the option to "Use the recommended options for this PC".  

Once you have selected your options and hit next you will be asked if you want to  download your Windows 10 file onto a  USB flash drive or as an ISO file. Select ISO file and click next.

![ISO Media Selection](/docs/assets/images/winvm1022/vm03.png)

On the final screen you will select the file location you want to save the ISO file to and then the creation tool will "perform clean up before exiting". 



---

<ins>**Creating Your Virtual Machine**</ins>

Most of the work here will be because while pretty self-explanatory Microsoft's Windows 10 installation process is just kind of annoying. But there are a few options related to Virtualbox so we will go over that first. 

After opening Virtualbox at the very top you should see a button that says "New" clicking that will bring up the following menu 

![New VM Options](/docs/assets/images/winvm1022/vm04.png)

You can name the machine whatever you want and Virtualbox will do it's best to guess the type and version of it based on that, but you will want to make sure you set these options to match your ISO file you have downloaded. You can also set the file location that your virtual machine will be installed to on your hardware but Virtualbox will set it where it should go by default so it's up to you if you want to change it.



---

<ins>**Memory and Disc Space Allocation**</ins>

After clicking Next at the bottom you will be greeted by the memory allocation screen. 

![Memory Allocation](/docs/assets/images/winvm1022/vm05.png)

This will heavily depend on your hardware's resources and personal preferences. Virtualbox recommends you allocate at least 2gb of RAM. Personally for these "throw away" Virtual Machines I like to allocate around 4gb as I just find anything less than that to be too slow. Some Virtual Machines have minimum requirements that are higher, and I'm sure others would have no problem running on 1gb. The main limiting factor here will be your personal resources and how you wish to distribute them throughout your home lab network.  

Once you have worked that out the next page will ask you to select your hard disk options. Like the previous step this will heavily depend on your resources. First we want to select "Create a Virtual Hard disk" from the list of options.

![Create Virtual Hard Disk](/docs/assets/images/winvm1022/vm06.png)

Then you will have to pick the Hard disk file type. These options are going to depend on your personal goals for your home lab project but for the most part the "VDI" option will be fine. 

![Hard Disk Type](/docs/assets/images/winvm1022/vm07.png)

After that it will ask you if you want to set a fixed amount of storage space for your Virtual Machine or allow it to Dynamically allocate space as needed. Personally I set a fixed dedicated amount of space to my Virtual Machines, just in case something goes wrong there will only be so much hard disk space it can eat up, but I'm sure in the vast majority of cases dynamic allocation will be just fine. For the sake of a small project like what I'll be using this particular Virtual Machine for 50gb is more than enough, but this is once again one of those things that will depend on your hardware's available resources. 

![Disk Space Allocation](/docs/assets/images/winvm1022/vm08.png)

Click create and that's it! You should now see your Machine pop up on the left hand side of the VirtualBox Manager. 



---

<ins>**Adding the Windows10 Disk Image to the New Virtual Machine**</ins>

The first time you launch your Machine from the manager you will be greeted with this screen that asks you to install the disc image.

![Startup Disk Selection](/docs/assets/images/winvm1022/vm09.png)

Odds are your Windows 10 ISO file won't appear in the pull down menu, so you will need to add the option yourself by clicking the folder with an arrow on the right hand side of the pulldown menu.

![Add an ISO File](/docs/assets/images/winvm1022/vm10.png)

On this screen you will need to click "Add" and select the Windows 10 ISO file from your downloads folder (or wherever you saved the file earlier). 

![Select ISO from Downloads Folder](/docs/assets/images/winvm1022/vm11.png)

The file should now show up under the "Not Attached" tree on the previous screen. Make sure you click on it to select it then click choose. You should now be back to the "Select Startup Disc" screen, but with your Windows10 image as an option in the drop down menu. Make sure it is selected and click Start. 

That's it! Your reward is you will now get to go through Microsoft's Windows 10 installation process.

![Windows10 Installation Startup Screen](/docs/assets/images/winvm1022/vm12.png)



---

<ins>**Final Notes**</ins>

They are going to want you to create or use an existing email to associate with the installation of Windows 10. It will also ask you to link said account to a secondary e-mail or phone number. Personally I view these small project machines as "throw aways" meaning they are meant to be deleted once my project is complete and the use for them is finished. So I generate new throw away emails for this process rather than associate my Windows 10 account from my hardware or personal phone number with it. That choice is yours though. 

I will be referencing this guide in future projects that require the installation of Virtual Machines. I will not be making a separate guide for every Operating system however. The process is incredibly similar outside of possibly a few requirements specific to the individual OS.



---

<ins>**References**</ins>

\* [geeksforgeeks](https://www.geeksforgeeks.org/iso-full-form/)

