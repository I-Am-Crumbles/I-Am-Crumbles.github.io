## **OWASP Top 10 WebGoat - Software and Data Integrity Failures**

<ins>**Introduction**</ins>

*WebGoat* is a deliberately insecure web application maintained by *OWASP* designed to teach web application security lessons. More information including how to download and run WebGoat can be found here on the projects [GitHub](https://github.com/WebGoat/WebGoat).
This is post three of a series where I will be doing WebGoats challenges to further my understanding of the OWASP Top 10 and web application security as a whole. I have started from the number 10 and am working my way backwards to number 1.

---

<ins> **\#8. Software and Data Integrity Failures** </ins>

Software and data integrity failures relate to code and infrastructure that does not protect against integrity violations. For example when an application relies upon plugs, libraries, or modules from untrusted sources, repositories, and content delivery networks. Many applications include auto-update functionality, where updates are downloaded without integrity verification and applied to the previously trusted application. Attackers could potentially upload their own updates to be distributed and run on all installations.  

 

**How to Prevent:** 

* Use digital signatures to verify the software or data is from the expected source and has not been altered.
* Ensure libraries and dependencies are using trusted repositories. Hosting an internal known-good repository of your own is also an option 
* Verify that software components do not contain known vulnerabilities through a software supply chain security tool. 
* Ensure that there is a review process for code and configuration changes to minimize the chance that malicious code could be introduced to the software pipeline 
* Ensure that unsigned or unencrypted serialized data is not sent to untrusted clients without some form of integrity check or digital signature to detect tampering. 
* Ensure that any Continuous Integration/Delivery pipelines have proper segregation, configuration, and access control to ensure the integrity of the code flowing through the build and deploy processes. 

---

<ins> **Insecure Deserialization** </ins>

Serialization is the process of converting an object or data structure into a format that can be easily stored, transmitted, or persisted. The serialized form is typically the binary representation of XML or JSON. Deserialization is the process of converting data that has been serialized back into its original form.  

 

During deserialization data is reconstructed and converted back into an object or data structure that can be used in memory. This process involves reading the serialized data and restoring the object's state, including its attributes, relationships, and any other relevant information. Deserialization is commonly used in various scenarios like: 
 
* Data storage and retrieval, Serialized is often stored in databases and later deserialized to retrieve the original object. 
* Serialized data can be transmitted between different processes or systems, allowing them to exchange information regardless of platform. 
* In distributed systems objects or data structures can be serialized and sent across network boundaries to invoke methods or perform remote operations in what's known as Remote procedure calls (RPC). 
* Deserialization can introduce security risks when the serialized data is untrusted or manipulated by malicious actors. Deserialization vulnerabilities can be exploited to execute arbitrary code or perform other unauthorized actions. 

---

<ins> **WebGoat Software and Data Integrity Failures Challenges** </ins>

![Challenge1](/docs/assets/images/webgoat/software_data_failures/challenge.png)

 

WebGoat has just one challenge related to Software and Data Integrity Failures and it's about Insecure Deserialization. In the challenge an input box receives a serialized string and then deserializes it. The challenge is to alter the object in order to delay the page response. 

Unfortunately I don't know enough about Java to solve this challenge. I tried to compile the following code to edit the serialized string to include a delay command but kept getting a "The serialization id does not match. Probably the version has been updated. Let's try again" No matter what I edit the version number to in my code it generates the same error though 

```
import java.io.*;
import java.time.LocalDateTime;
import java.util.Base64;

public class AttackSerialization {
    public static void main(String[] args) throws Exception {
        String taskName = "DelayTask";
        String taskAction = "Runtime.getRuntime().exec(\"/bin/bash -c 'sleep 5'\");";

        VulnerableTaskHolder taskHolder = new VulnerableTaskHolder(taskName, taskAction);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(outputStream);
        objectOutputStream.writeObject(taskHolder);
        objectOutputStream.flush();

        String serializedObject = Base64.getEncoder().encodeToString(outputStream.toByteArray());
        System.out.println(serializedObject);
    }
}

class VulnerableTaskHolder implements Serializable {
    private static final long serialVersionUID = 2L;

    private String taskName;
    private String taskAction;
    private LocalDateTime requestedExecutionTime;

    public VulnerableTaskHolder(String taskName, String taskAction) {
        super();
        this.taskName = taskName;
        this.taskAction = taskAction;
        this.requestedExecutionTime = LocalDateTime.now();
    }

    private void readObject(ObjectInputStream stream) throws Exception {
        stream.defaultReadObject();
        Runtime.getRuntime().exec(taskAction);
    }
}
```

```
rO0ABXNyABRWdWxuZXJhYmxlVGFza0hvbGRlcgAAAAAAAAAKAgADTAAWcmVxdWVzdGVkRXhlY3V0aW9uVGltZXQAGUxqYXZhL3RpbWUvTG9jYWxEYXRlVGltZTtMAAp0YXNrQWN0aW9udAASTGphdmEvbGFuZy9TdHJpbmc7TAAIdGFza05hbWVxAH4AAnhwc3IADWphdmEudGltZS5TZXKVXYS6GyJIsgwAAHhwdw4FAAAH5wUaEQIwAfQfG3h0ADRSdW50aW1lLmdldFJ1bnRpbWUoKS5leGVjKCIvYmluL2Jhc2ggLWMgJ3NsZWVwIDUnIik7dAAJRGVsYXlUYXNr`
```

![failed](/docs/assets/images/webgoat/software_data_failures/failed.png)


I tried for a long time to solve this one but I'll have to study more about how things work on the backend of a web application to get this one. I tried for a long time to solve this one but I'll have to study more about how things work on the backend of a web application to get this one. 
