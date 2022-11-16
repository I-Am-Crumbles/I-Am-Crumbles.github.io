## **Hack The Box - Weak RSA**

**Creator:** [alamot](https://app.hackthebox.com/users/179)

**Difficulty:** Easy

**Link:** [Weak RSA](https://app.hackthebox.com/challenges/6)

---


<ins> **Walkthrough** </ins>

This challenge is either a fairly complex math problem or running a python script depending on how it's approached. As I'm not good enough at math for something like this and just so happen to be pretty good at running python scripts I went with the latter.

I started the challenge by downloading the zip file, the password for which is convienently underneath the download link.

![Download File](/docs/assets/images/HTB/weakrsa/rsa01.png)

I used the *file* and *cat* commands to see what information I could find about the extracted files, reavealing that one of them was an *rsa public key*, and the other the encoded flag.

![Cat and File](/docs/assets/images/HTB/weakrsa/rsa02.png)

There is a tool that was written in python for the sake of decrypting ciphers in weak rsa public keys for *ctf* challenges called [RsaCtfTool](https://github.com/RsaCtfTool/RsaCtfTool).

From the readme: 

  >RSA multi attacks tool: uncipher data from weak public key and try to recover private key Automatic selction of best attack for given public key

It can be downloaded and installed by entering the following in the command line.

```
git clone https://github.com/Ganapati/RsaCtfTool.git && sudo apt-get install libgmp3-dev libmpc-dev 
```

![Install RsaCtfTool](/docs/assets/images/HTB/weakrsa/rsa03.png)

This tool does a lot. But for the purposes of this challenge what I'm interested in is the --uncipherfile switch which tells the tool to decrypt the cipher message hidden in the next file in the argument.

```
~/Documents/Hack_The_Box/Weak_RSA/RsaCtfTool/RsaCtfTool.py --publickey key.pub --uncipherfile flag.enc

```

To break that down more I'm locating the tool in the directory that it was installed in earlier and telling it to read the public key file *key.pub* and use it to decrypt the cipher hidden in the *flag.enc* file.

![Run the tool](/docs/assets/images/HTB/weakrsa/rsa04.png)

It took some time but eventually the flag was decrypted once the tool ran the *wiener method*. Which makes sense give what the text in the flag was.

![Flag](/docs/assets/images/HTB/weakrsa/rsa05.png)

Without getting into a bunch of math I don't understand myself that's all it takes!

![pwned](/docs/assets/images/HTB/weakrsa/rsa06.png)

---

<ins> **Final Thoughts** </ins>

The what method ...?

Taken from [wikipedia](https://en.wikipedia.org/wiki/Wiener%27s_attack)

> The **Wiener's attack**, named after cryptologist Michael J. Wiener, is a type of cryptographic attack against RSA. The attack uses the continued fraction method to expose the private key *d* when *d* is small.

Innuendos aside this was really simple thanks to a tool someone else wrote that was able to do all the real work for me. If I had to actually do the math portion I don't know that I would have figured it out.
